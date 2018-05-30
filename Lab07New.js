columnNumber = [];//记录每一个table的列数
tableContent = [];//记录表格的内容
tablesName = [];//记录表格的名字
tableRanking = 0;//记录一共有几个表格
rowRanking = 0;//记录正在运行的表格的第几行

//btCommit出现
function btCommitToShow(){
    let btCommit = document.getElementById("btCommit");
    btCommit.style.display = "inline-block";
}
//btCommit隐藏
function btCommitHidden(){
    let btCommit = document.getElementById("btCommit");
    btCommit.style.display = "none";
}
//显示两个input
function twoInputsToShow(){
    document.getElementById("inputTableName").style.display = "inline-block";
    document.getElementById("inputTableColumn").style.display = "inline-block";
}
//隐藏两个按钮并清除value
function twoInputsHidden(){
    document.getElementById("inputTableName").style.display = "none";
    document.getElementById("inputTableName").value = "";
    document.getElementById("inputTableColumn").style.display = "none";
    document.getElementById("inputTableColumn").value = "";
}

function createAttrs(columnNum){
    let divRows = document.getElementById("divRows");
    //删除前面无用的子节点
    while(divRows.firstChild){//所以divRows的子节点到底是怎么删除的。。。
        divRows.removeChild(divRows.firstChild);
    }
    let show = new Array(columnNum);
    for(let i = 0; i < columnNum; i++){
        let inputAttr = document.createElement("input");
        inputAttr.placeholder = "Attribute" + (i+1);
        inputAttr.status = i;
        show[i] = false;
        divRows.appendChild(inputAttr);
        inputAttr.onblur = function(){
            if(this.value){
                show[parseInt(this.status)] = true;
            }
            for(let k = 0; k < columnNum; k++){
                if((k === columnNum - 1) && show[columnNum - 1]){//所有input不为空时显示commit
                    btCommitToShow();
                }
                if(!show[k]){//一旦有空的地方就隐藏commit
                    btCommitHidden();
                    break;
                }
            }
        }
    }
}

//当用户填好column时展示attrs
function inputColumnOnBlur(){
    let inputTableColumn = document.getElementById("inputTableColumn");
    let regularTest = /[0-9]*/m;//这个正则表达式是错误的。
    inputTableColumn.onblur = function(){
        if(this.value >= 0 && regularTest.test(this.value)){
            btCommitHidden();
            createAttrs(this.value);
        }
    }
}

function clearRows(){
    let divRows = document.getElementById("divRows");
    while(divRows.firstChild){
        divRows.removeChild(divRows.firstChild);
    }
}

function createRows(currentTableRanking){
    let divRows = document.getElementById("divRows");
    for(let i = 0; i < columnNumber[currentTableRanking]; i++){
        let input = document.createElement("input");
        input.placeholder = tableContent[currentTableRanking][0][i];
        input.onblur = function(){
            btCommitToShow();//此处有一个bug就是：可以交全空白的。
        };
        divRows.appendChild(input);
    }
}

function createDeleteRows(){
    let divRows = document.getElementById("divRows");
    for(let i = 0; i < columnNumber[tableRanking - 1]; i++){
        let input = document.createElement("input");
        input.placeholder = tableContent[tableRanking - 1][0][i];
        input.onblur = function(){
            btCommitToShow();//此处有一个bug就是：可以交全空白的。
        };
        divRows.appendChild(input);
    }
}

function warning(){
    let warning = document.getElementById("warning");
    let p = document.createElement("p");
    p.innerText = "WARNING: You cannot undo this action!";
    warning.appendChild(p);
}

function clearWarning() {
    let warning = document.getElementById("warning");
    if(warning.firstChild){
        warning.removeChild(warning.firstChild);
    }
}

//对于每一次第一个select的onchange事件做出反应
function option0(){//select one
    clearWarning();
    btCommitHidden();
    twoInputsHidden();
}function option1(){//create a table
    clearWarning();
    twoInputsToShow();
    inputColumnOnBlur();
}function option2(currentTableRanking){//add row
    clearWarning();
    twoInputsHidden();
    btCommitHidden();
    clearRows();
    createRows(currentTableRanking);
}function option3(){
    clearWarning();
    twoInputsHidden();
    btCommitHidden();
    clearRows();
    createDeleteRows();
}function option4(){
    twoInputsHidden();
    btCommitToShow();
    clearRows();
    warning();
}

/////////////////////////////////////对于第一个select的事件处理////////////////////////////
function firstSelectEvents(){
    let select1 = document.getElementById("select1");
    let optionFirstSelect = select1.selectedIndex;//获取被选中的按钮0，请选择；1，选中；2，添加行；3，删除行；4，删除搜索得到的表格
    let currentTableRanking = document.getElementById("select2").selectedIndex - 1;//等于0就是默认值；
    alert("currentTableRanking:" + currentTableRanking );
    switch(optionFirstSelect){
        case 0://select one
            option0();
            break;
        case 1://create table
            option1();
            break;
        case 2://add rows
            if(currentTableRanking >= 0){
                option2(currentTableRanking);
            }
            break;
        case 3:
            option3();
            break;
        case 4:
            option4();
            break;
    }
}

////////////////////////////////////对于第二个select的事件处理/////////////
function secondSelectEvents(){
    let select2 = document.getElementById("select2");
    let optionSecondSelect = select2.selectedIndex;//获取被选中的按钮0，请选择；1，选中；2，添加行；3，删除行；4，删除搜索得到的表格
    clearSecondTableHead();//先把之前的给他整没了

    if(optionSecondSelect === 0){
        alert("选到0了，啥也不用干。");
    }else{
        let diJiGeBiaoGe = optionSecondSelect - 1;// 从[0,tableRanking);
        alert("表格第"+diJiGeBiaoGe+"个");//第（optionSecondSelect-1）个table,0,1,2,3,4,5

        let divTable = document.getElementById("divTable");
        let table = document.createElement("table");

        rowRanking = tableContent[diJiGeBiaoGe].length;//有多少行，
        for(let j = 0; j < rowRanking; j++){
            let tr = document.createElement("tr");
            for(let i = 0; i < columnNumber[diJiGeBiaoGe]; i++){
                let td = document.createElement("td");
                td.innerText = tableContent[diJiGeBiaoGe][rowRanking][i];
                if(rowRanking % 2 === 0){
                    td.className = "odd";
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        divTable.appendChild(table);
    }
}

////////////////////////////////////////以下是处理commit事件的函数//////////////////////////////////////////////////
//创造第二个表下方的表头
function createSecondTableHead(){
    rowRanking = 0;
    let divTable = document.getElementById("divTable");
    let table = document.createElement("table");
    let tr = document.createElement("tr");

    let inputs = document.getElementsByTagName("input");
    let inputTableColumn = document.getElementById("inputTableColumn");
    columnNumber.push(inputTableColumn.value);//将每一个table的列数存进去。
    let ths = [];//ths暂时没有做什么
    for(let i = 0; i < inputTableColumn.value; i++){
        let th = document.createElement("th");
        th.innerText = inputs[i+2].value;//第一个 input 是name，第二个是column，从第三个开始才是属性
        ths.push(inputs[i+2].value);//将属性的名字介绍进去。
        tr.appendChild(th);
    }
    //alert("tableRanking:" + tableRanking);
    tableContent.push([]);
    tableContent[tableRanking].push([]);
    tableContent[tableRanking][0] = ths;//把表头push进

    table.appendChild(tr);
    divTable.appendChild(table);
    tableRanking++; //此时tableRanking等于1
    //alert("rowRanking现在是：" + rowRanking);
}

//清除第二个表下方的表头
function clearSecondTableHead(){
    let divTable = document.getElementById("divTable");
    while(divTable.firstChild){
        divTable.removeChild(divTable.firstChild);
    }
}

function createSecondTableRows(){
    rowRanking++;//row加一；这是现在正在设置的行数
    tableContent[tableRanking - 1].push([]);
    tableContent[tableRanking - 1][rowRanking].push([]);
    let divRows = document.getElementById("divRows");
    let divTable = document.getElementById("divTable");

    let table = divTable.childNodes[tableRanking - 1];
    let tr = document.createElement("tr");
    for(let i = 0; i < columnNumber[tableRanking - 1]; i++){
        let td = document.createElement("td");
        td.innerText = divRows.childNodes[i].value;
        tableContent[tableRanking - 1][rowRanking][i] = divRows.childNodes[i].value;
        if(rowRanking % 2 === 0){
            td.className = "odd";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

//为第二个select设置新的option
function secondSelectOptionAdd(){
    let select2 = document.getElementById("select2");
    let option = document.createElement("option");
    let inputTableName = document.getElementById("inputTableName");
    tablesName.push(inputTableName);//从第一个表格开始，记录表格的名字
    option.innerText = inputTableName.value;//将option的名字变成输入值
    option.selected = "selected";
    select2.appendChild(option);
}

function searchAndDeleteRow(){
    let divRows = document.getElementById("divRows");
    let searchValues = [];
    let searchValuesTrue = [];
    for(let i = 0; i < columnNumber[tableRanking - 1]; i++){
        searchValues.push(divRows.childNodes[i].value);//这是输入的搜索值
        alert("搜索值：" + divRows.childNodes[i].value);
    }

    for(let i = 0; i < rowRanking; i++){//假设rowRanking=6，不包括表头
        searchValuesTrue.push(true);//假设全部可以删除
    }

    let count = 0;//从第一行开始
    do{
        for(let i = 0; i < columnNumber[tableRanking - 1]; i++){
            if(searchValues[i] !== "" &&
                tableContent[tableRanking - 1][count + 1][i] !== searchValues[i]){//假如搜索值不为空并且不匹配
                searchValuesTrue[count] = false;//不会被删除
                break;
            }
        }
        count++;
    }while(count < rowRanking);

    for(let i = rowRanking - 1; i >= 0; i--){//不包括表头
        alert("searchValuesTrue["+ i +"] = " +searchValuesTrue[i]);
    }

    for(let i = rowRanking - 1; i >= 0; i--){
        if(searchValuesTrue[i]){
            tableContent[tableRanking - 1].splice(i + 1, 1);//数组解决了
            alert("我删除了第" + (i + 1) + "行。");
            rowRanking--;
        }
    }alert("现在这个表格有" + rowRanking + "行。")
}

//删除第二个表格下面的table并展示出新的
function deleteShowedRows(){
    alert(rowRanking+"//////////////////////////////////////////////////////////////////////////");
    let divTable = document.getElementById("divTable");
    while(divTable.firstChild){
        divTable.removeChild(divTable.firstChild);
    }

    let table = document.createElement("table");
    for(let i = 0; i <= rowRanking; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < columnNumber[tableRanking - 1]; j++){
            if(i !== 0){//i===0
                let td = document.createElement("td");
                td.innerText = tableContent[tableRanking - 1][i][j];
                tr.appendChild(td);
            }else{
                let th = document.createElement("th");
                th.innerText = tableContent[tableRanking - 1][i][j];
                tr.appendChild(th);
            }
        }
        table.appendChild(tr);
    }
    divTable.appendChild(table);
}

//在第二个select中删除被选中option
function deleteTableOption(){
    let select2 = document.getElementById("select2");
    let tableToDelete = select2.selectedIndex;
    alert("tableToDelete:"+tableToDelete);
    alert("select2.children.length:"+select2.children.length);
    if(tableToDelete !== 0){
        select2.removeChild(select2.children[tableToDelete]);
        alert("删掉了此option");
    }
}
//在第二个select下面

//////////////////////////////////////////当commit按钮被点击时/////////////////////////////////////////
/**
 * 1.create table
 * 2.add row
 * 3.delete row
 * 4.delete
 */
document.getElementById("btCommit").onclick = function(){
    let optionFirstSelect = document.getElementById("select1").selectedIndex;//获得第一个select的状态
    switch(optionFirstSelect){
        case 1://create a table
            clearSecondTableHead();
            createSecondTableHead();
            secondSelectOptionAdd();
            break;
        case 2://add row
            createSecondTableRows();
            break;
        case 3://delete row
            searchAndDeleteRow();
            deleteShowedRows();
            break;
        case 4://delete table
            deleteTableOption();
            break;
        default://select one
            break;
    }
};

//第一个select发生变化时应该进行的处理
document.getElementById("select1").onchange = function(){
    firstSelectEvents();
};

//第二个select发生变化时应该进行的处理
document.getElementById("select2").onchange = function(){
    secondSelectEvents();
};









////////////////////////////等待删除的debug环节

document.getElementById("rowRankingTest").onclick = function(){
    alert(rowRanking);
};

document.getElementById("tableRankingTest").onclick = function(){
    alert(tableRanking);
};

document.getElementById("currentTableRankingTest").onclick = function(){
    alert(document.getElementById("select2").selectedIndex);
};