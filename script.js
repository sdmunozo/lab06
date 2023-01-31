$(document).ready(function() {

// Start your code from here

// ApiKey: IWMZaLRYeZiaKXafou3Kcp7SsePG0tGl


var myImg = {
    'rating': "",
    'solid_img': "",
    'anim_img': ""
}

let response = []

let api_key = "IWMZaLRYeZiaKXafou3Kcp7SsePG0tGl"
let api_q = ""
let api_limit = 10

let queryURL = ""


let animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  function populateButtons(array){
    $("#animal-buttons").empty();

    array.forEach(element => {
    
    var a = $("<button>");
    a.text(element)
    a.addClass("animal-button")
    a.attr("data-type",element)
    $("#animal-buttons").append(a);
});
}

// La logica del click de cada boton para hacer la llamda al API
$("#animal-buttons").on("click", ".animal-button", function() {
    $("#animals").empty();
    let animal = $(this).text()
    checkAnimals(animal)
})

// La lógica del click de cada imagen para "intercambiar las urls"
$("#animals").on("click", '.cover' ,'button', fDelItem)

function fDelItem(){

    let ruta = $(this).get(0).src
    let i = 0
    
    do{
        if (ruta == response[i].solid_img)
        {
            $(this).attr("src", `${response[i].anim_img}`);
            i = response.length
        }

        if (ruta == response[i].anim_img)
        {
            $(this).attr("src", `${response[i].solid_img}`);
            i = response.length
        }
        i++
    }while(i < response.length)
}

// La lógica del formulario para agregar mas botones a la lista
$("#add-animal").on("click", function(e) {
    e.preventDefault();

    let animal = $("#animal-input").val().trim()
    animals.push(animal)
    populateButtons(animals);
    checkAnimals(animal)
})

function checkAnimals(animal) {

    response = [];
    api_q = animal
   // queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${api_q}&limit=${api_limit}&rating=${rating}`
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${api_q}&limit=${api_limit}`
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(respuesta){
        

        for (let i =0; i <respuesta.data.length;i++){

            var myImgTemp = {
                'rating': "",
                'solid_img': "",
                'anim_img': ""
            }

            console.log(`${respuesta.data[i].rating}`)
            myImgTemp.rating = `${respuesta.data[i].rating}`
            myImgTemp.solid_img = `${respuesta.data[i].images.downsized_still.url}`
            myImgTemp.anim_img = `${respuesta.data[i].images.original.url}`
            response.push(myImgTemp)
            
            $("#animals").append(
                `
                <div class="polaroid">
                <div class="container">
                <p>"Raiting: ${response[i].rating}"</p>
                </div>                
                <img id="imgSel" class="cover" src="${response[i].solid_img}" alt="5 Terre" style="width:100%">
                </div>

                `)
          }
      })
}


populateButtons(animals);
});