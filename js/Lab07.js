let container =document.getElementsByClassName('container');
let button = document.getElementsByClassName('LayButton');
let Table =[];

/*第一个表格*/
function TheFirstSelect(o){
	switch(o){
		case "SelectOne":
			container[0].innerHTML = '';
            button[0].innerHTML = '';
			break;
		case "CreateTable":
			container[0].innerHTML =
				'<input type="text" class="TableName" placeholder="Table Name">'+
				'<input type="number" class="ColumnsNum" placeholder="Columns Numbers" min="0" onchange="Creat(this.value)">';
			    showbutton();
			break;
		case "AddRow":
            container[0].innerHTML = '';
            button[0].innerHTML = '';
            break;
		case "DeleteRow":
            container[0].innerHTML = '';
            button[0].innerHTML = '';
			break;
		case "DeleteTable":
            container[0].innerHTML = '<p>WARNING: You cannot undo this action!</p>';
            button[0].innerHTML = '<input type="button" value="commit" class="commit">';
			break;
	}
}

function Creat(x) {
	let TableHead = document.getElementsByClassName('LayTH');
	if(TableHead[0] !==""){
   	TableHead[0].innerHTML ='';
	}
	else return;
	for (let i=0;i<x;i++){
		let TableTh = document.createElement('input');
		TableHead[0].appendChild(TableTh);
		TableTh.type='text';
		TableTh.classList.add('title');
		TableTh.placeholder = 'Attribute';
		}
}
function showbutton() {
	if(judge()){
       button[0].innerHTML = '<input type="button" value="commit" class="commit">';
   }
   	
   function judge() {
   	for (let i=0;i<document.getElementsByClassName('ColumnsNum')[0].value;i++){
   		let th = document.getElementsByClassName('title');
   		if(th[i].value ===""){return false}
   	}
   	if(document.getElementsByClassName('TableName')[0].value ===""){return false}
   	return true;
   }
}