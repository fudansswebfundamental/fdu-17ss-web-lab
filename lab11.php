<?php error_reporting(0); ?>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <title>LRC 歌词编辑器</title>
<style>
    #lyric{
        overflow: scroll;
        height: 100px;
    }
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

    #lyric {
        width: 35%;
        height: 60%;
        border: 0;
        resize: none;
        font-size: large;
        line-height: 2em;
        text-align: center;
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
<form id="f_upload" enctype="multipart/form-data" action="uploadFile.php" method="post">
    <p>请上传音乐文件</p>

    <!--TODO: 在这里补充 html 元素，使 file_upload 上传后若为音乐文件，则可以直接播放-->
    <audio src="" autoplay controls="controls" id="musicPlayer" >
        Your browser does not support the audio element.
    </audio>
    <input type="file" name="file_upload" id="musicUpload" onchange="musicPlay()">
    <table>
        <tr><td>Title: <input type="text" id="musicName" name="musicName"></td><td>Artist: <input type="text" id="singer" name="singer"></td></tr>
        <tr><td colspan="2"><textarea name="edit_lyric" id="edit_lyric"></textarea></td></tr>
        <tr><td><input type="button" value="插入时间标签" id="insert" onclick="insertTag()"></td><td><input type="button" value="替换时间标签" id="replaceTag"></td></tr>
        <tr><td colspan="2" id="td_submit" onclick="writeInformation()"><input type="submit" value="Submit"></td></tr>
    </table>
</form>
</section>

<!--歌词展示部分-->
<section id="s_show" class="content" onclick="">
    <select id="selectMusic" onchange="chooseMusic()">
        <option value="0">请选择歌曲</option>
    <!--TODO: 在这里补充 html 元素，使点开 #d_show 之后这里实时加载服务器中已有的歌名-->
    <?php
    $files = scandir("upload/mp3");
    $k = 1;
    for ($i = 0;$i < count($files);$i++) {
        $name = basename($files[$i],".mp3");
        if ($name != "." && $name != "..") {
            echo "<option value=\"$k\" >$name</option>";
            $k++;
        }
    }
    ?>
    </select>

    <pre id="lyric">

    </pre>
    <audio autoplay controls="controls" id="musicShow" preload="auto">
        Your browser does not support the audio element.
    </audio>
    <br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;<button onclick="next()" >Next</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="pre()">Pre</button>
    <!--TODO: 在这里补充 html 元素，使选择了歌曲之后这里展示歌曲进度条，并且支持上下首切换-->
</section>
</body>
<script>
function next() {
    let Selection = document.getElementById("selectMusic");
    let index = Selection.selectedIndex;
    if (index == Selection.options.length - 1){
        alert("已是最后一首");
    }else {
        Selection.value = index + 1;
        chooseMusic();
    }
}
function pre() {
    let Selection = document.getElementById("selectMusic");
    let index = Selection.selectedIndex;
    if (index == 1){
        alert("已是第一首");
    }else {
        Selection.value = index - 1;
        chooseMusic();
    }
}
function writeInformation(){
    localStorage.setItem(document.getElementById("musicName").value(),)
}
// 界面部分
document.getElementById("d_edit").onclick = function () {click_tab("edit");};
document.getElementById("d_show").onclick = function () {click_tab("show");};

document.getElementById("d_show").click();

function click_tab(tag) {
    for (let i = 0; i < document.getElementsByClassName("tab").length; i++) document.getElementsByClassName("tab")[i].style.backgroundColor = "transparent";
    for (let i = 0; i < document.getElementsByClassName("content").length; i++) document.getElementsByClassName("content")[i].style.display = "none";

    document.getElementById("s_" + tag).style.display = "block";
    document.getElementById("d_" + tag).style.backgroundColor = "darkgray";
}

// Edit 部分
var edit_lyric_pos = 0;
var position = 0;
document.getElementById("edit_lyric").onmouseleave = function () {
    edit_lyric_pos = document.getElementById("edit_lyric").selectionStart;
    position = get_target_pos_getFirst();
};

// 获取所在行的初始位置。
function get_target_pos_getFirst() {
    return get_target_pos(edit_lyric_pos);
}

function get_target_pos(n_pos) {
    let value = document.getElementById("edit_lyric").value;
    let pos = 0;
    for (let i = n_pos; i >= 0; i--) {
        if (value.charAt(i) === '\n') {
            pos = i + 1;
            break;
        }
    }
    return pos;
}

/* HINT:
 * 已经帮你写好了寻找每行开头的位置，可以使用 get_target_pos()
 * 来获取第一个位置，从而插入相应的歌词时间。
 * 在 textarea 中，可以通过这个 DOM 节点的 selectionStart 和
 * selectionEnd 获取相对应的位置。
 *
 * TODO: 请实现你的歌词时间标签插入效果。
 */

function insertTag() {
    let insertValue = document.getElementById("edit_lyric");
    let time = document.getElementById("musicPlayer").currentTime.toFixed(2);
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time-hours*60)/60);
    let seconds = time - minutes * 60 - hours * 3600;
    let timeTag = "[" + hours + ":" + minutes + ":" + seconds.toFixed(2) +"]";
    insertValue.value = insertValue.value.substring(0, position) + timeTag + insertValue.value.substring(position, insertValue.value.length);
}

/* TODO: 请实现你的上传功能，需包含一个音乐文件和你写好的歌词文本。
 */

//获取读取我文件的File对象
function musicPlay() {
    var fileObj = document.getElementById("musicUpload");
    // 注意这里
    var src = window.URL.createObjectURL(fileObj.files[0]);
    document.getElementById("musicPlayer").src = src;
    document.getElementById("musicPlayer").play();
}

/* HINT:
 * 实现歌词和时间的匹配的时候推荐使用 Map class，ES6 自带。
 * 在 Map 中，key 的值必须是字符串，但是可以通过字符串直接比较。
 * 每一行行高可粗略估计为 40，根据电脑差异或许会有不同。
 * 当前歌词请以粗体显示。
 * 从第八行开始，当歌曲转至下一行的时候，需要调整滚动条，使得当前歌
 * 词保持在正中。
 *
 * TODO: 请实现你的歌词滚动效果。
 */
function chooseMusic() {
    let lrcShow = document.getElementById("lyric");
    let Selection = document.getElementById("selectMusic");
    let index = Selection.selectedIndex;
    let musicName = Selection.options[index].text;
    if (musicName == "请选择歌曲")
        document.getElementById("musicShow").src = "";
    else
        document.getElementById("musicShow").src = "upload/mp3/"+musicName+".mp3";

    let xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            lrcShow.innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","lab11_server.php?name="+musicName,false);
    xmlhttp.send();
    let medis = lrcShow.innerText;
    lrcShow.innerHTML="";
    let medises = medis.split("\n");

    for(let i= 0;i<medises.length;i++){
        let rows = medises[i];
        let t = rows.substring(rows.indexOf("[") + 1, rows.indexOf("]"));
        let time = parseInt(t.split(":")[0] * 3600) + parseInt(t.split(":")[1] * 60) + parseFloat(t.split(":")[2]);
        let lrc = rows.substring(rows.indexOf("]") + 1);

        let item=document.createElement("p");
        let name=document.createTextNode(lrc);
        item.appendChild(name);
        lrcShow.appendChild(item);
        item.setAttribute("time", time);
    }
    let flag = document.getElementsByTagName("p");

    // alert(flag[1].innerText);
    let audio = document.getElementById("musicShow");

    audio.ontimeupdate = function() {myFunction()};

    function myFunction() {
        console.log()
        for (let j = 1;j < flag.length ; j++) {

            if (Math.abs(audio.currentTime.toFixed(2) - flag[j].getAttribute('time')) < 0.5){
                if (j > 1){
                    flag[j - 1].style.fontWeight = "normal";
                    flag[j - 1].style.color = "grey";
                }
                if (j >= 6){
                    lrcShow.scrollBy(0,13);
                }
                flag[j].style.fontWeight = "bold";
                flag[j].style.color = "red";
        }
        }
    }
}


</script>
</html>
