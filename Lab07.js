arrayTableName = new Array();
arrayTableName[0] = "SELECT (default: last created)";
var arrayRowsNum = new Array();
var arrayColumnNum = new Array();

//btCommit出现
function btCommitToShow(){
    var btCommit = document.getElementById("btCommit");
    btCommit.style.display = "inline-block";
}
//btCommit隐藏
function btCommitHidden(){
    var btCommit = document.getElementById("btCommit");
    btCommit.style.display = "none";
    //btCommit.visibility = "hidden";
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

//两个input如果不为空就创造第一个select的表头
function checkIfTwoInputsBlank(tableRanking){
    var inputName = document.getElementById("inputTableName");
    var inputColumn = document.getElementById("inputTableColumn");
    inputName.onblur = function(){
        //check if the two inputs are filled with after the mouse on blur
        if((this.value !== "") && (inputColumn.value !== "")){//想用正则表达式表达一下正数,
            deleteDivRowsChildNodes();
            createAttrs(tableRanking, inputColumn.value);
        }
    };
    inputColumn.onblur = function(){
        if((this.value !== "") && (inputName.value !== "")){
            deleteDivRowsChildNodes();
            createAttrs(tableRanking, this.value);
        }
    };
}

function deleteDivRowsChildNodes(tableRanking){
    //除去多余的rows
    if(document.getElementById("div" + tableRanking) !== null){
        var lalala = document.getElementById("div" + tableRanking).childNodes.length;
        for(var i = 0; i < lalala; i++){
            document.getElementById("div" + tableRanking).removeChild(document.getElementById("divRows").childNodes[0]);
        }
    }

}

function hideDivRowsChildNodes(tableRanking){
    //隐藏上一个table创建出来的attrs的inputs
    if(document.getElementById("div" + tableRanking) !== null){
        var lalala = document.getElementById("div" + tableRanking);
        lalala.style.display = "none";
    }

}

//创造表头
function createAttrs(tableRanking, columnNum){
    var divRows = document.getElementById("divRows");
    var div = document.createElement("div");
    div.setAttribute("id", "div" + tableRanking);
    var show = new Array(columnNum);

    for(var i = 0; i < columnNum; i++){
        var input = document.createElement("input");
        input.placeholder = "Attribute";
        input.status = i;
        //input.setAttribute("id", tableRanking + "-0-" + i);//1-0-0; 1-0-1; 1-0-2 表头的id
        div.appendChild(input);
        show[i] = false;//所有的input是否填满
        input.onblur = function(){
            if(this.value === ""){
                show[parseInt(this.status)] = false;
            }else{
                show[parseInt(this.status)] = true;
            }
            for(var k = 0; k < columnNum; k++){
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

    divRows.appendChild(div);
}

//在第二个表中加表头
function addHeadSecondSelect(tableRanking){
    alert("78:add table head , tableRanking:" + tableRanking);
    var divTable = document.getElementById("divTable");//已经存在的
    var table = document.createElement("table");
    table.setAttribute("id", "table" + tableRanking);
    arrayTableName[tableRanking] = document.getElementById("inputTableName").value;//table1  存储表格名字
    arrayColumnNum[tableRanking] = document.getElementById("inputTableColumn").value;//存储表格列数

    var tr = document.createElement("tr");
    tr.setAttribute("id", "table" + tableRanking + "firstTr");
    var arrayTrs = new Array();

    for(var i = 0; i < document.getElementById("div" + tableRanking).childNodes.length; i++){
        var th = document.createElement("th");
        th.innerText = document.getElementById("div" + tableRanking).childNodes[i].value;
        arrayTrs[i] = th.innerText;
        th.setAttribute("id", "-" + tableRanking + "-0-" + i);//-1-0-0; -1-0-1; -1-0-2这是th的id
        tr.appendChild(th);
    }
    table.appendChild(tr);
    divTable.appendChild(table);
}

//添加第二个select的option
function addOptionSecondSelect(tableRanking){
    //alert("104: add option tableRanking"  + tableRanking);
    var select2 = document.getElementById("select2");
    var option = document.createElement("option");
    option.setAttribute("id", "secondSelectOption" + tableRanking);//为option创造id
    option.selected = "selected";
    option.innerText = document.getElementById("inputTableName").value;
    select2.appendChild(option);
}

//为上面的select创造row, 把attrs改成div
function createRows(tableRanking){
    var div = document.getElementById("div" + tableRanking);
    var attrs = div.childNodes;
    for(var i = 0; i < arrayColumnNum[tableRanking]; i++){//这里本来应该是attrs.length
        var input = document.createElement("input");
        input.placeholder = attrs[0].value;
        input.setAttribute("id", tableRanking + "-1-" + i);//1-1-0； 1-1-1
        div.removeChild(attrs[0]);
        div.appendChild(input);
        input.onblur = function(){
            btCommitToShow();
        }
    }
}

//为第二个select添加row
function addRowsSecondSelect(tableRanking){
    arrayRowsNum[tableRanking] = (arrayRowsNum[tableRanking] == undefined)? 1 : arrayRowsNum[tableRanking] + 1;
    var table = document.getElementById("table" + tableRanking);
    var tr = document.createElement("tr");
    alert("tableRanking: " + tableRanking);
    alert("arrayColumnNum[tableRanking] :" + arrayColumnNum[tableRanking]);
    for(var i = 0; i < arrayColumnNum[tableRanking]; i++){
        var td = document.createElement("td");
        td.setAttribute("id", "-" + tableRanking + "-" + table.childNodes.length + "-" + i);//-1-1-0; -1-1-1; -1-1-2
        td.innerText = document.getElementById("div" + tableRanking).childNodes[i].value;//1-1-0
        if(table.childNodes.length % 2 === 0){//背景变成浅灰色
            td.className = "odd";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

function deleteRowSecondSelect(tableRanking){
    var div = document.getElementById("div" + tableRanking);
    var inputValueToSearch = new Array();
    for(var i = 0; i < arrayColumnNum[tableRanking]; i++){
        //上面的select 的 input
        inputValueToSearch[i] = document.getElementById(tableRanking + "-1-" + i).value;
        alert(document.getElementById(tableRanking + "-1-" + i).value);
    }
    var toDeleteRowsSecondSelect = new Array(arrayRowsNum[tableRanking]);
    for(var k = 0; k < arrayRowsNum[tableRanking]; k++){
        toDeleteRowsSecondSelect[k] = true;//假定都可以删除
    }//一行一行进行比较
    alert(arrayColumnNum[tableRanking] + " arrayColumnNum[tableRanking]");
    alert(arrayRowsNum[tableRanking] + " arrayRowsNum[tableRanking]");
    for(var j = 0; j < arrayColumnNum[tableRanking]; j++){
        for(var q = 1; q <=  arrayRowsNum[tableRanking]; q++){
            if(inputValueToSearch[j] !== document.getElementById("-" + tableRanking + "-" + q + "-" + j).innerHTML){
                toDeleteRowsSecondSelect[j] = false;
                alert(j + "false");
            }
        }
    }
    for(var p = 0; p < toDeleteRowsSecondSelect.length; p++){
        alert("198");
        if(toDeleteRowsSecondSelect[p] === true){
            //删除这一行
            var table = document.getElementById("table" + tableRanking);
            alert("table.childNodes[p+1]: p+1:" + (p+1));
            alert("209删除行");
            table.removeChild(table.childNodes[p+1]);
            arrayRowsNum[tableRanking] = arrayRowsNum[tableRanking] - 1;
        }
    }
}


function option0(){//select one
    btCommitHidden();
    twoInputsHidden();
}
function option1(){//crete table
    // 第一个表格就是tableRanking === 1；
    var tableRanking = document.getElementById("divTable").childNodes.length + (1 - 3);//第一个table是1，第二个是2，依次类推
    hideDivRowsChildNodes(tableRanking);
    btCommitHidden();
    twoInputsToShow();//显示两个input，id是inputTableName和inputTableColumn
    checkIfTwoInputsBlank(tableRanking);
}
function option2(){//add row
    // 针对正在增加row的这个表格进行two inputs 的删除/隐藏
    twoInputsHidden();
    btCommitHidden();//隐藏commit按钮
    createRows(document.getElementById("divTable").childNodes.length - 3);
}
function option3(){//delete row
    var tableRanking = document.getElementById("divTable").childNodes.length - 3;
    btCommitToShow();
    twoInputsHidden();
    var attrs = document.getElementById("div" + tableRanking).childNodes;
    for(var i = 0; i < attrs.length; i++){
        attrs[i].value = "";//把input里面的值去掉只留下placeholder
    }

}
function option4(){//delete table

}

//对于第一个select的事件处理
function firstSelectEvents(){
    var select1 = document.getElementById("select1");
    var optionFirstSelect = select1.selectedIndex;//获取被选中的按钮0，请选择；1，选中；2，添加行；3，删除行；4，删除搜索得到的表格
    switch(optionFirstSelect){
        case 0://select one
            option0();
            break;
        case 1://create table
            option1();
            break;
        case 2://add rows
            option2();
            break;
        case 3:
            option3();
            break;
        case 4:
            btCommitToShow();
            break;
    }
}

//第一个select发生变化时应该进行的处理
document.getElementById("select1").onchange = function(){
    //对于事件的处理
    firstSelectEvents();
};

//当commit按钮被点击时
/**
 * 1.create table
 * 2.add row
 * 3.delete row
 * 4.delete
 */
document.getElementById("btCommit").onclick = function(){
    var optionFirstSelect = document.getElementById("select1").selectedIndex;//获取被选中的按钮0，请选择；1，选中；2，添加行；3，删除行；4，删除搜索得到的表格
    switch(optionFirstSelect){
        case 0:
            break;
        case 1://create table 时为第二个select添加option和head
            //清除上一个table的展示
            alert(document.getElementById("divTable").childNodes.length - 3);
            for(var i = 0; i < document.getElementById("divTable").childNodes.length - 3; i++){
                document.getElementById("divTable").childNodes[i + 3].style.display = "none";
            }
            addHeadSecondSelect(document.getElementById("divTable").childNodes.length + 1 - 3);
            addOptionSecondSelect(document.getElementById("divTable").childNodes.length - 3);//为什么divTable的孩子是4
            break;
        case 2://add row 时为第二个select添加row
            addRowsSecondSelect(document.getElementById("divTable").childNodes.length - 3);
            break;
        case 3://delete row时首先要进行匹配
            deleteRowSecondSelect(document.getElementById("divTable").childNodes.length - 3);
            break;
        case 4:
            break;
    }

};
