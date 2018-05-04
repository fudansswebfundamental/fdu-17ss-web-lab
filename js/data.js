const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

var x = document.getElementsByClassName("flex-container justify")[0];
for (var i=0;i<4;i++)
{
  let item=document.createElement("div");
  item.className = 'item';

  let name=document.createTextNode(countries[i].name);
  let asd=document.createElement("h2");
  asd.appendChild(name);
  item.appendChild(asd);

  let content=document.createTextNode(countries[i].continent);
  item.appendChild(document.createElement("p").appendChild(content));

  let innerboxone=document.createElement("div");
  innerboxone.className = 'inner-box';
  let innerboxtwo=document.createElement("div");
  innerboxtwo.className = 'inner-box';

  x.appendChild(item);
  item.appendChild(innerboxone);
  item.appendChild(innerboxtwo);




  let cities=document.createTextNode("Cities");
  let cityul=document.createElement("ul");
  let city=document.createElement("h2");
  city.appendChild(cities);
  cityul.appendChild(city);
  innerboxone.appendChild(cityul);

  for(var j=0;j<countries[i].cities.length;j++)
  {
    let cityli=document.createElement("li");
    cityli.appendChild(document.createTextNode(countries[i].cities[j]));
    cityul.appendChild(cityli);
  }

  let pic=document.createTextNode("Popular photos");
  let picnote=document.createElement("h2");
  picnote.appendChild(pic);
  innerboxtwo.appendChild(picnote);

  for(var k=0;k<countries[i].photos.length;k++){
    let bigImg = document.createElement("img");
        bigImg.className = "photo"
        bigImg.src="images/" + countries[i].photos[k];
        innerboxtwo.appendChild(bigImg);
  }

  let button=document.createElement("button");
  button.appendChild(document.createTextNode("Visit"));
  item.appendChild(button);
}
