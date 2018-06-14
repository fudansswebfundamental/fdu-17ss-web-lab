<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<title>LRC 歌词编辑器</title>
<style>
    nav ul {
        position: fixed;
        z-index: 99;
        right: 5%;
        border: 1px solid darkgray;
        border-radius: 5px;
        list-style:none;
        padding: 0;
    }

    .tab {
        padding: 1em;
        display: block;
    }

    .tab:hover {
        cursor: pointer;
        background-color: lightgray !important;
    }

    td {
        padding:0.2em;
    }

    textarea[name="edit_lyric"] {
        width: 100%;
        height: 50em;
    }

    input[type="button"] {
        width: 100%;
        height: 100%;
    }

    input[type="submit"] {
        width: 100%;
        height: 100%;
    }

    #td_submit {
        text-align: center;
    }

    select {
        display: block;
    }

    /*#lyric {*/
        /*width: 35%;*/
        /*height: 60%;*/
        /*border: 0;*/
        /*resize: none;*/
        /*font-size: large;*/
        /*line-height: 2em;*/
        /*text-align: center;*/
    /*}*/
    #lyric{
        overflow: hidden;
        width: 800px;
        height: 480px;
        box-shadow: 0 0 5px black;
        margin: 200px auto;

    }
    #lyric #words{
        cursor: default;
        transition: all 0.5s ease;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 20px;

    }

    #words li{
        height:40px;
        line-height: 40px;
    }
    .sel {
        font-weight: bold;
    }

    ul,li{
        margin:0;
        padding:0;
        list-style: none;
    }

</style>
</head>
<body>
    <nav><ul>
        <li id="d_edit" class="tab">Edit Lyric</li>
        <li id="d_show" class="tab">Show Lyric</li>
    </ul></nav>

<!--歌词编辑部分-->
<section id="s_edit" class="content">
<form id="f_upload" enctype="multipart/form-data" action="handleUpload.php" method="post">
    <p>请上传音乐文件</p>


    <audio controls id="audio_edit"></audio>

    <!--//请选择文件控件-->
    <input type="file" name="file_upload" onchange="loadMusic();">
    <table>
        <tr><td>Title: <input type="text"></td><td>Artist: <input type="text"></td></tr>
        <tr><td colspan="2"><textarea name="edit_lyric" id="edit_lyric"></textarea></td></tr>
        <tr><td><input type="button" id="insert_timetag" value="插入时间标签" onclick="insertTimeTag();"></td><td><input type="button" value="替换时间标签" onclick="replaceTimeTag();"></td></tr>
        <tr><td colspan="2" id="td_submit"><input type="submit" value="Submit"></td></tr>   
    </table>
</form>
</section>
<!--歌词展示部分-->
<section id="s_show" class="content">
    <select id="select_song" name="songName" onchange="move();">
        <option value="123">请选择歌曲</option>
        <?php include 'loadMusicOptions.php'; ?>
    </select>
    <audio controls id="audio_play"></audio></br>
    <button id="preButton" onclick="moveToPre();">
        上一首
    </button>

    <button id="proButton" onclick="moveToPro();">
        下一首
    </button>
    <div id="lyric" readonly="true">
        <ul id="words" style="margin-top: 240px"></ul>
    </div>




</section>
</body>
<script src="http://code.jquery.com/jquery-1.4.1.min.js"></script>
<script>

// 界面部分
document.getElementById("d_edit").onclick = function () {click_tab("edit");};
document.getElementById("d_show").onclick = function () {click_tab("show");};

document.getElementById("d_show").click();//？

let audio_edit = document.getElementById("audio_edit");
let audio_play = document.getElementById("audio_play");
let lyric = document.getElementById("lyric");
let lyric_edit = document.getElementById("edit_lyric");
//
// let selecteds = document.getElementsByName("songName")[0];
// let lyric_play = document.getElementById("words");
let wordEl = document.getElementById('words');
let marTop = parseInt(wordEl.style.marginTop);
let select_music = document.getElementById("select_song");
let lyricArray=[];
let count = 0;
let preButton = document.getElementById("preButton");
let proButton = document.getElementById("proButton");


//上传后若为音乐文件，则直接播放（若不是，则无法播放，但无须做判断啊？）

function loadMusic() {
    //获得上传的音乐文件
    let music = document.getElementsByName("file_upload")[0].files[0];
    //创建读取文件的对象
    let reader = new FileReader();
    let musicFile;
    reader.onload=function(){
        // alert('开始读取音乐文件');
        musicFile=this.result;
        console.log(musicFile);
        // $("#audio").attr('src',musicFile);

        audio_edit.src = musicFile;

    };
    //读取
    reader.readAsDataURL(music);//选哪种

}

//点击后变换css
function click_tab(tag) {
    for (let i = 0; i < document.getElementsByClassName("tab").length; i++) document.getElementsByClassName("tab")[i].style.backgroundColor = "transparent";
    for (let i = 0; i < document.getElementsByClassName("content").length; i++) document.getElementsByClassName("content")[i].style.display = "none";

    document.getElementById("s_" + tag).style.display = "block";
    document.getElementById("d_" + tag).style.backgroundColor = "darkgray";
} 

// Edit 部分
var edit_lyric_pos = 0;
document.getElementById("edit_lyric").onmouseleave = function () {
    edit_lyric_pos = document.getElementById("edit_lyric").selectionStart;
};



function get_target_pos(n_pos) {
    let value = document.getElementById("edit_lyric").value;
    let pos = 0;
    if(n_pos===undefined) {pos = edit_lyric_pos;}
    else {
        for (let i = n_pos; i >= 0; i--) {
            if (value.charAt(i) === '\n') {
                pos = i + 1;
                break;
            }
        }
    }
    return pos;
}


// 选中光标所在行。
function get_target_line(n_pos) {
    let value = document.getElementById("edit_lyric").value; 
    let f_pos = get_target_pos(n_pos);//f是所在行数
    let l_pos = 0;

    for (let i = f_pos;; i++) {
        if (value.charAt(i) === '\n') {
            l_pos = i + 1;
            break;
        }
    }
    return [f_pos, l_pos];
}

//歌词时间标签插入效果
let timeTag = "";
function transformNum(num){
    if (num<10&&num>=0){
        num="0"+num;
    }
       return num;
}
function createTimeTag(){

    let currentSecond = audio_edit.currentTime;

    let minute = parseInt(currentSecond/60);//是否需要类型转换？需要
    minute=transformNum(minute);
    let second = (currentSecond - minute*60).toFixed(2);
    second = transformNum(second);
    let hour = parseInt(minute/60);//只能字符串转吗？
    hour = transformNum(hour);

    timeTag ="["+hour+":"+minute+":"+second+"]";

    return timeTag;

}
let txtLyric = document.getElementById("edit_lyric");
function insert_flg(str,flg,sn){
    let newstr = "";
    let i = 0;
    if(sn>0) {
        let tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
        i += sn;
        tmp = str.substring(i, i + sn);
        newstr += tmp;
    }
    else{
        newstr=flg+str;

    }
    return newstr;
}
function insertTimeTag(){
// let row = get_target_pos(txtLyric.selectionStart);
let currentTotalNum = txtLyric.selectionStart;
let currentRowNum = 0;//当前光标所在行数的字符数
for(let i=currentTotalNum-1;i>=0;i--){
    if(txtLyric.value.charAt(i)==='\n'){
        break;
    }else{
        currentRowNum++;
    }
}
txtLyric.value = insert_flg(txtLyric.value,createTimeTag(),txtLyric.selectionStart-currentRowNum);
}
function replaceTimeTag(){
    //把该行内的符合正则表达式的内容用新的时间标签替换
    //使用与插入同样的思路
    // /[\\[]\d+:\d+.\d+]/
    // txtLyric.value.replace();
    //得到该行开头的下标
    let currentTotalNum = txtLyric.selectionStart;
    let currentRowNum = 0;
    for(let i = currentTotalNum-1;i>=0;i--){
        if(txtLyric.value.charAt(i)==='\n'){
            break;
        }else{
            currentRowNum++;
        }
    }
    let row_index = currentTotalNum - currentRowNum;
    // //在该行检索正则表达式
     let thisRowBefore = txtLyric.value.substring(row_index,txtLyric.value.length);
    // //检索到之后替换；
    let thisRowAfter =   thisRowBefore.replace( /\[.*]/,createTimeTag());//
    txtLyric.value = txtLyric.value.replace(thisRowBefore,thisRowAfter);
}

function showLyric(){
    let lyrics = lyric.value;
    // console.log(lyrics);

    // let lyricData = [];//? /\[.*]/ lyrics.match(/\[.*]/);

    let lyricData = lyrics.match(/[^\r\n]+/g);
    // console.log(lyricData);
    // console.log(lyricData.length);

    // let lyricArray = new Map();



    for(let i = 0;i<lyricData.length;i++){
        let tmpTime = /\[.*]/.exec(lyricData[i]);
        // console.log(tmpTime);
        let tmpLyric = lyricData[i].split(/\[.*]/);//?
        // console.log(tmpLyric[0]);
        // console.log(tmpLyric[1]);
        if (tmpTime != null)
            lyricArray.push({time: formatTime(tmpTime+""), lyric: tmpLyric[1]});


    }
    for (let i = 0;i<lyricArray.length;i++){

        let lyricEl = document.createElement('li');
        lyricEl.innerHTML = lyricArray[i].lyric;
        wordEl.appendChild(lyricEl);
    }
    count=0;

//
// let audio = document.getElementById('audio');

}


//下拉框部分在无上一首歌时，使“上一首”按钮不可点击，“下一首”按钮同理。增加disable即可
function move(){
    lyric.value="";
    let selectedMusicIndex = select_music.selectedIndex;
    console.log(select_music.options[selectedMusicIndex].value);
    audio_play.src = "./"+select_music.options[selectedMusicIndex].value+".mp3";
    audio_play.play();
    let path = audio_play.src;
    console.log(path);
    ajax(path.slice(0,path.length-4)+".lrc");
    count=0;

    if(selectedMusicIndex===1){
        preButton.disabled=true;
    }else{
        preButton.disabled=false;
    }
    if(selectedMusicIndex===select_music.options.length-1){
        proButton.disabled=true;
    }else{
        proButton.disabled=false;
    }

}
function moveToPre() {
    let selectedMusicIndex = select_music.selectedIndex;
    if (selectedMusicIndex > 1) {
        // preButton.disabled = false;
        select_music[selectedMusicIndex - 1].selected = true;//??
        move();
        // }else{
        //     // preButton.disabled = true;
        // }


    }
}

function moveToPro(){
    let selectedMusicIndex = select_music.selectedIndex;
    let totalNum = select_music.options.length;
    if(selectedMusicIndex<=totalNum-1){
        // proButton.disabled = false;
        select_music[selectedMusicIndex+1].selected = true;//??
        move();
    }else{
        // proButton.disabled = true;
    }


}

let formatTime = function(time){
    let handled_time = time.slice(1,time.length-2);
    let h = handled_time.split(':')[0];
    let m = handled_time.split(':')[1];
    let s = handled_time.split(':')[2];
    let final_time = parseFloat(h)*3600+parseFloat(m)*60+parseFloat(s);
    // alert(final_time);
    return final_time;

};

function validTime(time,index) {

    if (index < lyricArray.length - 1) {
        if (time >= lyricArray[index].time && time <= lyricArray[index + 1].time) {
            return true;
        } else {
            return false;
        }
    } else {
        if (time <= audio_play.duration) {
            return true;
        } else {
            return false;
        }
    }
}

audio_play.ontimeupdate = function(){

    let time = audio_play.currentTime;
    if(!validTime(time,count)){
        count++;
    }
    wordEl.style.marginTop = (marTop-count*40)+"px";

    let li = wordEl.querySelectorAll('li');
    for(let i = 0;i<li.length;i++){
        li[i].removeAttribute('class');
    }

    li[count].setAttribute('class','sel');
    if(audio_play.ended){
        wordEl.style.marginTop = marTop+"px";
        count=0;
    }
};

audio_play.onseeked = function(){
    let cur_time = audio_play.currentTime;
    for(let _i = 0;_i <= lyricArray.length - 1;_i++){
        if (cur_time>=lyricArray[_i].time&&cur_time<=lyricArray[_i + 1].time)
            count = _i;
    }


};

function ajax(lyric_url){
    let xmlhttp;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    } else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function (lyric_url) {
        if (xmlhttp.readyState===4 && xmlhttp.status===200) {
            if(xmlhttp.responseText!==null){
            lyric.value = xmlhttp.responseText;
            showLyric();}else{
                lyric.value = "";
            }

        }
    };
    xmlhttp.open("GET",lyric_url,true);
    xmlhttp.send();

}




</script>
</html>