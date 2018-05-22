
//table对象的构造函数
function Table(tableName){
    this.tableName = tableName;
    this.colNumber = 0;
    this.ths=[];
    this.trs=[];
    this.rowNumber=0;
    for(let i=0;i<=10;i++){
        this.trs[i]=[];
    }
}

//tables表示table们组成的数组
let tables = [];

//dom
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');

let part1 = document.getElementById('part1');


let input2= document.createElement('input');
let input1= document.createElement('input');

let tempo = document.createElement('div');



let commitDeleteRow = document.createElement('input');
let commitDeleteTable= document.createElement('input');

let table = document.getElementsByTagName('table')[0];//整个页面只可能出现一个table

//表头元素个数
let attrNumber;

//表头元素形成的数组
let attrs = [attrNumber];

//换行元素
let br;

//增加行数元素数组
let addcols=[];

//删除行数元素数组
let deletecols=[];

//选取项目栏1时
select1.onchange = function() {
        let index = select1.selectedIndex;
        let item = select1.options[index].value;
        if(item==-1){
            selectOne();
        }
        if(item==1){
            createTable();
        }
        if(item==2){
            addRow();

        }
        if(item==3){
            deleteRow();
        }
        if(item==4){
            deleteTable();
        }
    };

//从下拉列表中选择一项开始，此函数无特定功能
function selectOne(){
    part1.innerHTML=null;
}

//创建新表格
function createTable(){
    part1.innerHTML=null;
    //换行
    let br = document.createElement('br');
    br.innerHTML = "<br/>";

    //第一个输入框
    input1.type='text';
    input1.placeholder='Table Name';
    input1.style.width='140px';
    part1.appendChild(input1);

    //第二个输入框
    input2.type='number';
    input2.placeholder='Column Number';
    input2.style.width='140px';
    part1.appendChild(input2);

    part1.appendChild(br);
}


//创建新表格过程中，输入数字显示相同数目的属性栏
input2.onchange = function showAttribute() {
    let commitTable = document.createElement('input');

    tempo.innerHTML='';

    //显示属性栏
    attrNumber = this.value;
        for (let i = 0; i < attrNumber; i++) {
            attrs[i] = document.createElement('input');
            attrs[i].type = 'text';
            attrs[i].name = 'inputAttr';
            attrs[i].placeholder = 'Attribute';
            attrs[i].style.width = 60 + 'px';
            part1.appendChild(tempo);
            tempo.appendChild(attrs[i]);
            // part1.appendChild(br);
        }
    attrs[attrs.length-1].onblur = function(){
        showCommit(commitTable);
    };

    commitTable.onclick = function(){

        let tableName = input1.value;
        let colNumber = input2.value;

        table.innerHTML="";
        let newOption = new Option(tableName);
        newOption.selected = true;

        select2.options.add(newOption);

        let tr = document.createElement('tr');
        table.appendChild(tr);

        let attrThs = [];
        let textTds = [];
        for (let i = 0; i < colNumber; i++) {
            attrThs[i] = document.createElement('th');
            textTds[i] = document.createTextNode(attrs[i].value);
            attrThs[i].appendChild(textTds[i]);
            tr.appendChild(attrThs[i]);
        }
        tables.push(new Table(tableName));
        tables[tables.length-1].colNumber=colNumber;
        for (let i = 0; i < attrs.length; i++) {
            tables[tables.length-1].ths[i] = attrs[i].value;
        }
        newOption.value = tables.length - 1 + "";
    };
};


//每次提交（照道理）就创建了一个新表格（对象）


//为当前表格增加一行新属性对应值
function addRow(){
    let commitNewRow = document.createElement('input');
    //删除前面的
    part1.innerHTML=null;
    //换行
     br = document.createElement('br');
    br.innerHTML = "<br/>";

    let  jiuming = tables[select2.selectedOptions[0].value].colNumber;

    for(let i = 0;i<jiuming;i++){
        addcols[i]=document.createElement('input');
        addcols[i].type='text';
        addcols[i].placeholder='Attr'+(i+1);
        addcols[i].style.width=(280/jiuming)+'px';
        part1.appendChild(addcols[i]);
        part1.appendChild(br);
    }
    addcols[addcols.length-1].onblur = function(){
        showCommit(commitNewRow);
    };
    //每次提交就创建了新的一行    deleteRow之后就无法增加新的一行？
    commitNewRow.onclick = function(){
        let currentCol=tables[select2.selectedOptions[0].value].colNumber;
        let tr = document.createElement('tr');
        table.appendChild(tr);

        let attrTds = [];
        let textTds = [];
        let temp = select2.selectedOptions[0].value;
        let temp2 = tables[temp].rowNumber;
        for(let i = 0;i<currentCol;i++){
            attrTds[i] = document.createElement('td');
            textTds[i] = document.createTextNode(addcols[i].value);
            tables[temp].trs[temp2][i]=addcols[i].value;//bug
            attrTds[i].appendChild(textTds[i]);
            tr.appendChild(attrTds[i]);
        }
        tables[select2.selectedOptions[0].value].rowNumber++;

    };

}



//当有一个input框为空时的适配？
function deleteRow(){
    part1.innerHTML=null;
    //换行
    br = document.createElement('br');
    br.innerHTML = "<br/>";

    let  jiuming = tables[select2.selectedOptions[0].value].colNumber;

    for(let i = 0;i<jiuming;i++){
        deletecols[i]=document.createElement('input');
        deletecols[i].type='text';
        deletecols[i].placeholder='Attr'+(i+1);
        deletecols[i].style.width=(280/jiuming)+'px';
        part1.appendChild(deletecols[i]);
        part1.appendChild(br);
    }
    deletecols[deletecols.length-1].onblur = function(){
        showCommit(commitDeleteRow);
    };





    // //显示提交按钮
    // commitDeleteRow.type = 'button';
    // commitDeleteRow.value = 'commit';
    // commitDeleteRow.style.width='300px';
    // part1.appendChild(commitDeleteRow);
}
//bug:删除某一行后，数组下标发生变化？
commitDeleteRow.onclick = function(){
    let currentCol=tables[select2.selectedOptions[0].value].colNumber;

    largeloop:
    for(let j =tables[select2.selectedOptions[0].value].rowNumber-1; j>=0;j--) {

        smallloop:
        for (let i = 0; i < currentCol; i++) {

                if(deletecols[i].value==''){
                    continue smallloop;
                }

                if ((deletecols[i].value!=='')&&(deletecols[i].value == tables[select2.selectedOptions[0].value].trs[j][i])) {
                   continue smallloop;
                }
                else{
                    continue largeloop;
                }

            }

        document.getElementsByTagName("table")[0].deleteRow(j+1);
        tables[select2.selectedOptions[0].value].trs.splice(j,1);
        tables[select2.selectedOptions[0].value].rowNumber--;





    }
};

function deleteTable() {
    part1.innerHTML = "<lable style='color: red;font-size: 20px'>WARNING: You cannot undo this action!</lable>";

    let br = document.createElement('br');
    br.innerHTML = "<br/>";

    commitDeleteTable.type = 'button';
    commitDeleteTable.value = 'commit';
    commitDeleteTable.style.width='300px';
    part1.appendChild(br);
    part1.appendChild(commitDeleteTable);
}
commitDeleteTable.onclick = function(){
    table.innerHTML = "";

    if (select2.selectedOptions[0].value !== "SELECT(default: last created)") {
        select2.options.remove(select2.selectedIndex);
        delete tables[select2.selectedOptions[0].value];// delete的真正用法？
    }
    select2.options[1].selected=true;
    let index = select2.selectedIndex;
    let tableNum = select2.options[index].value;
    if(select2.options[index].value=="SELECT(default: last created"){
        return;
    }
    //显示所选择的表格(重新再写一遍生成表格的动态js)
    let realths=[];
    let realthTexts=[];
    let realtrs=[];

    for(let i = 0;tables[tableNum]!==undefined&&i<tables[tableNum].rowNumber+1;i++){
        realtrs[i] = document.createElement('tr');
        for(let j = 0;j<tables[tableNum].colNumber;j++) {
            if (i == 0) {
                realths[j] = document.createElement('th');
                realthTexts[j] = document.createTextNode(tables[tableNum].ths[j]);
                realths[j].appendChild(realthTexts[j]);
                realtrs[i].appendChild(realths[j]);
            }else {
                let realtdTexts = [];
                let realtds = [];
                realtds[j] = document.createElement('td');
                realtdTexts[j] = document.createTextNode(tables[tableNum].trs[i-1][j]);
                realtds[j].appendChild(realtdTexts[j]);
                realtrs[i].appendChild(realtds[j]);
            }
        }
        table.appendChild(realtrs[i]);
    }
};

select2.onchange=function(){
    table.innerHTML="";

    let index = select2.selectedIndex;
    let tableNum = select2.options[index].value;
    if(select2.options[index].value=="SELECT(default: last created"){
        return;
    }
    //显示所选择的表格(重新再写一遍生成表格的动态js)
    let realths=[];
    let realthTexts=[];
    let realtrs=[];

    for(let i = 0;tables[tableNum]!==undefined&&i<tables[tableNum].rowNumber+1;i++){
        realtrs[i] = document.createElement('tr');
        for(let j = 0;j<tables[tableNum].colNumber;j++) {
            if (i == 0) {
                realths[j] = document.createElement('th');
                realthTexts[j] = document.createTextNode(tables[tableNum].ths[j]);
                realths[j].appendChild(realthTexts[j]);
                realtrs[i].appendChild(realths[j]);
            }else {
                let realtdTexts = [];
                let realtds = [];
                realtds[j] = document.createElement('td');
                realtdTexts[j] = document.createTextNode(tables[tableNum].trs[i-1][j]);
                realtds[j].appendChild(realtdTexts[j]);
                realtrs[i].appendChild(realtds[j]);
            }
        }
        table.appendChild(realtrs[i]);
    }











};

function showCommit(commit){
    //显示提交按钮
    commit.type = 'button';
    commit.value = 'commit';
    commit.style.width='300px';
    part1.appendChild(commit);

}









