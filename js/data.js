const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

const divTotal=document.getElementsByTagName("div");

var divs=new Array(4);
var h2s=new Array(4);
var h3s=new Array(4);
var uls=new Array(4);

for(var i=0; i<4; i++){
	//城市标签（h3）
var cities=document.createElement("h3");
//var citiesContent=document.createTextNode("Cities");
//cities.appendChild(citiesContent);
cities.innerHTML="Cities";

//照片标签
var photosTag=document.createElement("h3");
//var photossContent=document.createTextNode("Popular Photos");
//photos.appendChild(photosContent);
photosTag.innerHTML="Popular Photos";

//按钮
var button=document.createElement("button");
button.innerHTML="visit";
	
	//创建一个div外围的
	divs[i]=document.createElement("div");
	divs[i].className='item';
	divTotal[0].appendChild(divs[i]);
	
	//加上国家（h3）和大洲（h3）
	h2s[i]=document.createElement("h2");
	h2s[i].innerHTML=countries[i].name;
	divs[i].appendChild(h2s[i]);
	
	h3s[i]=document.createElement("h3");
	h3s[i].innerHTML=countries[i].continent;
	divs[i].appendChild(h3s[i]);
	
	//创建第一个内部的div
	var divInner=document.createElement("div");
	divInner.className="inner-box";
	divInner.appendChild(cities);//加上“cities”标签
	
	//创建无序列表
	uls[i]=document.createElement("ul");
	
	//创建无序列表里的li
	for(var j=0; j<countries[i].cities.length; j++){
		var city=document.createElement("li");
		var cityContent=document.createTextNode(countries[i].cities[j]);
		city.appendChild(cityContent);
		uls[i].appendChild(city);
	}
	
	divInner.appendChild(uls[i]);
	
	//创建第二个内部的div
	var divInner2=document.createElement("div");
	divInner2.className="inner-box";		
	
	//创建第二个div里面的图片div
	var divPhotos=document.createElement("div");

	//创建divPhotoss图片
	var photoss=new Array();	
	for(var k=0; k<countries[i].photos.length; k++){		
		photoss[k]=document.createElement("img");
		photoss[k].className="photo";
		photoss[k].src="images/"+countries[i].photos[k];
		divPhotos.appendChild(photoss[k]);
	}	
	
	//加上photos
	divInner2.appendChild(photosTag);
	//加上图片
	divInner2.appendChild(divPhotos);
	divs[i].appendChild(divInner);
	divs[i].appendChild(divInner2);
	divs[i].appendChild(button);
}