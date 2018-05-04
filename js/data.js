const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

const CI = 'Cities';
const PP = 'Popular Photos';
const VI = 'Visit';


function createItem(){

let big = document.getElementsByClassName("flex-container justify")[0];





    for(let i = 0;i<=3;i++) {
        function createInnerBox1(){
            document.write('<div class="inner-box">');
            document.write('<h3>'+CI+'</h3>');
            document.write('<ul>');
            for(let j = 0;j<countries[i].cities.length;j++){
                document.write('<li>'+countries[i].cities[j]+'</li>');
            }
            document.write('</ul>');
            document.write('</div>');
        }

        function createInnerBox2(){
             const base = "../images/";
            document.write('<div class="inner-box">');
            document.write('<h3>'+PP+'</h3>');
            for(let j = 0;j<countries[i].photos.length;j++){
                document.write('<img src="images/' + countries[i].photos[j] + '" class="photo">');
            }
            document.write('</div>');
        }



        document.write('<div class="item">');
        document.write('<h2>'+countries[i].name+'</h2>');
        document.write('<p>'+countries[i].continent+'</p>');
        createInnerBox1();
        createInnerBox2();
        document.write('<button>'+VI+'</button>');
        document.write('</div>');



    }

    let items = document.getElementsByClassName("item");
    for(let k = 0;k<items.length;k++){
        big.appendChild(items[k]);
    }

    }
    createItem();















