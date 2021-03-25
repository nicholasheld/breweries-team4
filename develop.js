// When I search a 5-digit zip code 
// Then I am presented with a list of breweries and restaurants in that zip code
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;


// define variables
var searchButton = $("#search-btn")
var userInput = $("#user-input")
var breweryList = [];
// var foodList = [];
// 

// Function to get data from brewery API
// function getBrewery(event)
// event.prevent default()
// var postalCode = get the value from the zip code text input
// var postalURL = 'https://api.openbrewerydb.org/breweries/search?query=${postalCode}&per_page=10&sort=-name'
// fetch()

// Function to get data from restaurant API
// prevent default
// post function

// On click event for search button
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        console.log("hello")

        var userInputVal = $(userInput).val().trim();
        var searchList = html`
        <div class="card-info">
            <h1 class="card-title">Card Title</h1>
            <p class="card-author">Author Name</p>
        </div>`;
        /* var divEl = document.createElement(
            divEl.setAttr("id", "brewery-info")
        );
        var card = $("#brewery-info");
        divEl.textContent = ("Hello World"); */
        $("#brewery-info").append(searchList);
    });
// Append list dynamically to show results
// if (results are empty){
//   Text(no breweries were found for this zip code)
// }




// Local storage for previous search
// $(document).ready()




/* Extras 
https://api.openbrewerydb.org/breweries/autocomplete?query=${postalCode}&per_page=10&sort=-name
https://api.openbrewerydb.org/breweries?by_type=${type}


To start the search for breweries */