let count = countries.length;
let items = [];
let container = document.getElementById("container");
for(let i = 0 ; i < count ; i++){
    items[i] = document.createElement("div");
    items[i].classList.add("item");
    container.appendChild(items[i]);

    let name = document.createElement("h2");
    name.innerText = countries[i].name;
    items[i].append(name);

    let continent = document.createElement("p");
    continent.innerText = countries[i].continent;
    items[i].append(continent);

    let inner_box_1 = document.createElement("div");
    inner_box_1.classList.add("inner-box");
    items[i].append(inner_box_1);
    let cities = document.createElement("h3");
    cities.innerText = "Cities";
    inner_box_1.append(cities);

    let city_list = document.createElement("ul");
    inner_box_1.append(city_list);
    for(let j = 0 ; j < countries[i].cities.length ; j++){
        let city = document.createElement("li");
        city.innerText = countries[i].cities[j];
        city_list.append(city);
    }

    let inner_box_2 = document.createElement("div");
    inner_box_2.classList.add("inner-box");
    items[i].append(inner_box_2);
    let photos = document.createElement("h3");
    photos.innerText = "Popular Photos";
    inner_box_2.append(photos);

    for(let j = 0 ; j < countries[i].photos.length ; j++){
        let photo = document.createElement("img");
        photo.classList.add("photo");
        photo.setAttribute("src","images/" + countries[i].photos[j]);
        inner_box_2.append(photo);
    }
    let btVisit = document.createElement("button");
    btVisit.innerText = "Visit";
    items[i].append(btVisit);
}

