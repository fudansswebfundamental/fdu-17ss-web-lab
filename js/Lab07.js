var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var temp = document.getElementById("tableClass");
var attrCount = 0;
var selectOne = document.getElementById("selectOne");
var selectTwo = document.getElementById("selectTwo");
var tableArray = new Array(0);

selectOne.onchange = function () {
    selectTwo.onchange;
    one.style.display = "none";
    two.style.display = "none";
    two.innerHTML = "";
    document.getElementById("addNone").style.display = "none";
    document.getElementById("commitTwo").style.display = "none";
    three.style.display = "none";
    three.innerHTML = "";
    document.getElementById("commitThree").style.display = "none";
    four.style.display = "none";
    document.getElementById("commitFour").style.display = "none";

  if (selectOne.selectedIndex == 1) {
    let t1 = document.getElementsByTagName("input");
    for (let i1 = 0; i1 < t1.length; i1++) {
      t1[i1].value = "";
    }
    let att = document.getElementById("attr");
    let Attr = document.getElementById("cols");
    att.innerHTML = "";
    document.getElementById("attrNone").style.display = "none";
    one.style.display = "block";
    Attr.onchange = function(e) {
      att.innerHTML = "";
      if (Attr.value > 0 && document.getElementById("name").value != "") {
        document.getElementById("commitOne").style.display = "block";
        for (let i = 0; i < Attr.value; i++) {
          let newAtt = document.createElement("input");
          newAtt.type = "text";
          newAtt.placeholder = "Attr" + i;
          newAtt.className = "Attr" + " new" + i;
          att.appendChild(newAtt);
        }
        attrCount = Attr.value;
      } else {
        attrCount = 0;
        document.getElementById("commitOne").style.display = "none";
      }
    };
    document.getElementById("name").onchange = function(){
      att.innerHTML = "";
      if (Attr.value > 0 && document.getElementById("name").value != "") {
        document.getElementById("commitOne").style.display = "block";
        for (let i = 0; i < Attr.value; i++) {
          let newAtt = document.createElement("input");
          newAtt.type = "text";
          newAtt.placeholder = "Attr" + i;
          newAtt.className = "Attr" + " new" + i;
          att.appendChild(newAtt);
        }
        attrCount = Attr.value;
      } else {
        attrCount = 0;
        document.getElementById("commitOne").style.display = "none";
      }
    };
    document.getElementById("commitOne").onclick = function(e){
      let table = document.createElement("table");
      table.arry = new Array(attrCount);
      for(let i = 0; i < attrCount; i++){
        table.arry[i] = document.getElementsByClassName("new" + i)[0].value;
      }
      
      table.id = document.getElementById("name").value;
      table.Count = attrCount;
      table.rowCount = 0;
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      for (let i = 0; i < attrCount; i++) {
        if (table.arry[i] == ""){
          document.getElementById("attrNone").style.display = "block";
          return;
        }
        else{
          document.getElementById("attrNone").style.display = "none";
          let td = document.createElement("td");
          let att = document.createTextNode(table.arry[i]);
          td.appendChild(att);
          tr.appendChild(td);
        }
      }
      let option = document.createElement("option");
      selectTwo.appendChild(option);
      let ta = document.createTextNode(document.getElementById("name").value);
      option.appendChild(ta);
      option.selected = "selected";
      thead.appendChild(tr);
      table.appendChild(thead);
      temp.appendChild(table);
      tableArray.push(table);
      selectTwo.onchange();
      // document.getElementById("name").value("");
      // document.getElementsByClassName("new" + i)[0].value("");
      let t1 = document.getElementsByTagName("input");
      for (let i1 = 0; i1 < t1.length; i1++) {
          t1[i1].value = "";
        }
}
}

  if (selectOne.selectedIndex == 2){
    document.getElementById("commitTwo").style.display = "block";
    two.style.display = "block";
    let index = selectTwo.selectedIndex;
    if(index == 0)return;
    let text = selectTwo.options[index].text;
      for (let i = 0; i < tableArray[index-1].Count; i++) {
          let newAtt = document.createElement("input");
          newAtt.type = "text"; newAtt.placeholder = "Attr" + i;
          newAtt.className = "Attr ";
          newAtt.id = text + i;
          two.appendChild(newAtt);
        }
        document.getElementById("commitTwo").onclick = function (e) {
          let flag = 0;
          let changetable = tableArray[index - 1];
          tableArray[index - 1].rowCount++;
          let newRow = changetable.insertRow(tableArray[index - 1].rowCount);
          for (let k = 0; k < tableArray[index - 1].Count; k++) {
            if (document.getElementById(text + k).value == "") {
              flag++;
            }
          }
          for (let k = 0; k < tableArray[index - 1].Count; k++){
            if (flag != tableArray[index - 1].Count){
              let newCell = newRow.insertCell(k);
              newCell.innerText = document.getElementById(text + k).value;
              document.getElementById("addNone").style.display = "none";
            }
          }
          if (flag == tableArray[index - 1].Count){
            document.getElementById("addNone").style.display = "block";
            tableArray[index - 1].rowCount--;
          }
        }
  }


  if (selectOne.selectedIndex == 3) {
    document.getElementById("commitThree").style.display = "block";
    three.style.display = "block";
    let index = selectTwo.selectedIndex;
    if (index == 0) return;
        for (let i = 0; i < tableArray[index - 1].Count; i++) {
          let newAtt = document.createElement("input");
          newAtt.type = "text"; newAtt.placeholder = tableArray[index-1].arry[i];
          newAtt.className = "Attr ";
          newAtt.id = "tmp" + i;
          three.appendChild(newAtt);
        }
        document.getElementById("commitThree").onclick = function (e) {
          let deleteAll = 0;
          for (let j = 0; j < tableArray[index - 1].Count; j++) {
            if (document.getElementById("tmp" + j).value == "") {
              deleteAll++;
            }
          }
          if (deleteAll == tableArray[index - 1].Count){
            for (let j = 0; j < tableArray[index - 1].rowCount; j++) {
              tableArray[index - 1].deleteRow(1);
            }
            tableArray[index - 1].rowCount = 0;
            return;
          }
          
          let flag = 0;
          let changetable = tableArray[index - 1];
          let numb = changetable.rowCount;
          for (let k = 0; k < numb; k++) {
            let cells = tableArray[index - 1].Count;
            if (tableArray[index - 1].rowCount == 0){
              return;
            }
            for (let j = 0 ; j < cells; j++) {
              let data = changetable.rows[k+1].cells[j].innerHTML;
              if (document.getElementById("tmp" + j).value == data) {
                flag++;
              }
            }
            if (flag == cells) {
              changetable.deleteRow(k + 1);
              tableArray[index - 1].rowCount--;
              document.getElementById("commitThree").onclick();
              return;
            }
            flag = 0 ;
          }
        }
  }


  if (selectOne.selectedIndex == 4) {
    let index = selectTwo.selectedIndex;
    document.getElementById("commitFour").style.display = "block";
    four.style.display = "block";
    document.getElementById("commitFour").onclick = function (e) {
      selectTwo.onchange;
      if (index == 0 || tableArray.length == 0) {
        return;
      }
      let x = document.getElementById("selectTwo");
      let y = document.getElementById("tableClass");
      let text = selectTwo.options[x.selectedIndex].text;
      y.removeChild(y.childNodes[index - 1]);
      tableArray.splice(x.selectedIndex - 1, 1);
      x.remove(x.selectedIndex);
      document.getElementById("selectTwo").getElementsByTagName("option")[0].selected = "selected";
    }
    selectTwo.onchange;
  }
  }

selectTwo.onchange = function () {
  selectOne.onchange();
  let index = selectTwo.selectedIndex;
  let text = selectTwo.options[index].text;
  for (let j = 0; j < tableArray.length; j++) {
    tableArray[j].style.display = "none";
  }
  if(index == 0){
  }else{
    tableArray[index - 1].style.display = "inline-block";
  }
}