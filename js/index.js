function addClass(obj,classname){
	var old=obj.getAttribute("class");
	if(old==null){
		obj.setAttribute("class",classname);
	}else{
		if(old.match(classname)==null){
			// obj.setAttribute("class",classname)
			obj.setAttribute("class",old+" "+classname);
		}
	}
}
function removeClass(obj,classname){
	var old=obj.className;
	var arr=old.split(" ");
	function fil(num){
		return num!=classname;
	}
	var newArr=arr.filter(fil);
	var newClass=newArr.join(" ");
	obj.className=newClass;
}

var table=document.getElementsByTagName('table');
console.log(table)
for(var i=0;i<table.length;i++){
	var tr=table[i].getElementsByTagName('tr');
	for(var j=0;j<tr.length;j++){
		tr[j].onmouseenter=function(){
			console.log(this.getElementsByTagName('td')[0])
			addClass(this.getElementsByTagName('a')[0],"change")
			addClass(this.getElementsByTagName('td')[0],"change")
		}
		tr[j].onmouseleave=function(){
			removeClass(this.getElementsByTagName('a')[0],"change");
			removeClass(this.getElementsByTagName('td')[0],"change")
		}
	}
}