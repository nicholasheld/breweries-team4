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
function getBrewery(postalCode) {
    $("#brewery-info").empty();
    var settings = {
        "url": `https://api.openbrewerydb.org/breweries?by_city=${postalCode}&per_page=10`,
        "method": "GET",
        "timeout": 0,
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
    if(response.length >= 1){
        
            for (var i = 0; i < response.length; i++) {
      
                var searchList = html`
                    <div class="card-info">
                        <h1 class="card-title">${response[i].name}</h1>
                        <p class="card-location"><b>Brewery type:</b> ${response[i].brewery_type}</p>
                        <p class="card-location"><b>Location: </b>${response[i].street}, ${response[i].city}, ${response[i].state}</p>
                        <p class="card-location"><b>Tel.</b> ${response[i].phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</p>
                        <a class="card-location" href="${response[i].website_url}" target="_blank">${response[i].website_url}</a>
                    </div>`;
        
                $("#brewery-info").append(searchList);
            } 
    } else {
        var noResultSpan = $("<h2>");
        noResultSpan.text("No Search Results Found");
        $("#brewery-info").append(noResultSpan);
    }
    });

}

function getRestaurant(postalCode) {

        // $("#restaurant-info").empty();

        const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://documenu.p.rapidapi.com/restaurants/search/fields?address=${postalCode}&size=10`,
        "method": "GET",
        "headers": {
            "x-api-key": "e7e8d2a801b181805ac00744dc1c582c",
            "x-rapidapi-key": "69ab1ed06emsh03eed11d8b3bce0p18b21fjsnea403cc1a6b9",
            "x-rapidapi-host": "documenu.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);

        if(response.data.length >= 1){
            
            for (var i = 0; i < response.data.length; i++) {
                
                var searchList2 = html`
                    <div class="card-info2">
                        <h1 class="card-title">${response.data[i].restaurant_name}</h1>
                        <p class="card-location"><b>Cuisine: </b>${response.data[i].cuisines[0]}</p>
                        <p class="card-location"><b>Location: </b>${response.data[i].address.formatted}</p>
                        <p class="card-location"><b>Tel.</b> ${response.data[i].restaurant_phone}</p>
                        <a class="card-location" href="${response.data[i].restaurant_website}" target="_blank">${response.data[i].restaurant_website}</a>
                    </div>`;
                
                $("#restaurant-info").append(searchList2);
            } 
    } /* else {
        var noResultSpan = $("<h2>");
        noResultSpan.text("No Search Results Found");
        $("#brewery-info").append(noResultSpan);
    } */

    });
}

// Function to get data from restaurant API
// prevent default
// post function

// On click event for search button
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var userInputVal = userInput.val().trim();

    getBrewery(userInputVal);
    getRestaurant(userInputVal);
    // Prevent continual appending of the search result
    // if (results are empty){
    //   Text(no breweries were found for this zip code)
    // }
});


// Local storage to show last index or append a zip code list dynamically
// $(document).ready()




/* Extras 
https://api.openbrewerydb.org/breweries/autocomplete?query=${postalCode}&per_page=10&sort=-name
https://api.openbrewerydb.org/breweries?by_type=${type}
*/