//logic
class Attribute {
    constructor(name,value){
        this.name = name;
        this.value = value;
        this.colNumber = 0;

    }
}

function Table(tableName){
    this.tableName = tableName;
    this.colNumber = 0;
    this.ths=new Array();
    this.trs=new Array();
    this.rowNumber=0;
    for(let i=0;i<=10;i++){
        this.trs[i]=new Array();
    }

}

let tables = [];

//dom
// THE FIRST PART
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');

let part1 = document.getElementById('part1');
let part2 = document.getElementById('part2');

let input2= document.createElement('input');
let input1= document.createElement('input');
let commitTable = document.createElement('input');
let commitNewRow = document.createElement('input');
let commitDeleteRow = document.createElement('input');
let commitDeleteTable= document.createElement('input');

let table = document.getElementsByTagName('table')[0];//当前只可能出现一个table

let attrNumber;
let attrs = [attrNumber];
let br;
let addcols=[];
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

    input2.type='text';
    input2.placeholder='Column Number';
    input2.style.width='140px';
    part1.appendChild(input2);
    part1.appendChild(br);




}

//每次提交（照道理）就创建了一个新表格（对象）
commitTable.onclick = function(){

    let tableName = input1.value;
    let colNumber = input2.value;
    for(let i = 0;i<tables.length;i++) {

        if (tables[i].tableName == tableName) {
            alert("已有相同表格！");
            return;
        }
    }
        table.innerHTML="";
        // attrs=[];
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

        // let newTable = new Table(tableName);
        // newTable.colNumber = colNumber;

        tables.push(new Table(tableName));
        tables[tables.length-1].colNumber=colNumber;
    for (let i = 0; i < attrs.length; i++) {
        tables[tables.length-1].ths[i] = attrs[i].value;
    }


        //newly add
        newOption.value = tables.length - 1 + "";


    // }
};

//为当前表格增加一行新属性对应值
function addRow(){
    //删除前面的
    part1.innerHTML=null;

    //获取当前表格（对象）重大bug（妈的
    // let k;
    // let currentTable = new TableClass();
    // let currentTableName = select2.selectedOptions[0].innerText;
    // for (k in tables){
    //     if(k.name==currentTableName){
    //         currentTable = k;
    //     }
    // }

    //换行
     br = document.createElement('br');
    br.innerHTML = "<br/>";

    // //显示属性栏 上面bug带来的恶劣影响
    // let wodema =currentTable.colNumber;
    let  jiuming = tables[select2.selectedOptions[0].value].colNumber;
    // alert(jiuming);

    for(let i = 0;i<jiuming;i++){
        addcols[i]=document.createElement('input');
        addcols[i].type='text';
        addcols[i].placeholder='Attr'+(i+1);
        addcols[i].style.width=(280/jiuming)+'px';
        part1.appendChild(addcols[i]);
        part1.appendChild(br);
    }
    //显示提交按钮
    commitNewRow.type = 'button';
    commitNewRow.value = 'commit';
    commitNewRow.style.width='300px';
    part1.appendChild(commitNewRow);




}

//每次提交就创建了新的一行
commitNewRow.onclick = function(){
    let currentCol=tables[select2.selectedOptions[0].value].colNumber;
    let tr = document.createElement('tr');
    table.appendChild(tr);

    let attrTds = [];
    let textTds = [];
    for(let i = 0;i<currentCol;i++){
        attrTds[i] = document.createElement('td');
        textTds[i] = document.createTextNode(addcols[i].value);
        tables[select2.selectedOptions[0].value].trs[tables[select2.selectedOptions[0].value].rowNumber][i]=addcols[i].value;
        attrTds[i].appendChild(textTds[i]);
        tr.appendChild(attrTds[i]);
    }
    tables[select2.selectedOptions[0].value].rowNumber++;

};


function deleteRow(){
    part1.innerHTML=null;
    //换行
    br = document.createElement('br');
    br.innerHTML = "<br/>";

    // let wodema =currentTable.colNumber;
    let  jiuming = tables[select2.selectedOptions[0].value].colNumber;

    for(let i = 0;i<jiuming;i++){
        deletecols[i]=document.createElement('input');
        deletecols[i].type='text';
        deletecols[i].placeholder='Attr'+(i+1);
        deletecols[i].style.width=(280/jiuming)+'px';
        part1.appendChild(deletecols[i]);
        part1.appendChild(br);
    }
    //显示提交按钮
    commitDeleteRow.type = 'button';
    commitDeleteRow.value = 'commit';
    commitDeleteRow.style.width='300px';
    part1.appendChild(commitDeleteRow);
}

commitDeleteRow.onclick = function(){
    let currentCol=tables[select2.selectedOptions[0].value].colNumber;

    for(let j = 0;j<tables[select2.selectedOptions[0].value].rowNumber;j++) {
        for (let i = 0; i < currentCol; i++) {
            if (deletecols[i].value ==tables[select2.selectedOptions[0].value].trs[j][i]){
                document.getElementsByTagName("table")[0].deleteRow(j+1);
                tables[select2.selectedOptions[0].value].ths.delete(j);
            }
                }

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
    }
    select2.options[select2.options.length-1].selected=true;
    let index = select2.selectedIndex;
    let tableNum = select2.options[index].value;
    if(select2.options[index].value=="SELECT(default: last created"){
        return;
    }
    //显示所选择的表格(重新再写一遍生成表格的动态js)
    let realths=[];
    let realthTexts=[];
    let realtrs=[];

    for(let i = 0;i<tables[tableNum].rowNumber+1;i++){
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


}


//输入数字显示相同数目的属性栏
input2.onblur = function showAttribute(){
    //换行
    let br = document.createElement('br');
    br.innerHTML = "<br/>";

    //显示属性栏
    attrNumber = this.value;

        attr = [];
    for(let i = 0;i<attrNumber;i++){
        attrs[i]=document.createElement('input');
        attrs[i].type='text';
        attrs[i].placeholder='Attribute';
        attrs[i].style.width=(280/attrNumber)+'px';
        part1.appendChild(attrs[i]);
        part1.appendChild(br);
    }
    //显示提交按钮
    commitTable.type = 'button';
    commitTable.value = 'commit';
    commitTable.style.width='300px';
    part1.appendChild(commitTable);
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

    for(let i = 0;i<tables[tableNum].rowNumber+1;i++){
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







