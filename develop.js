// When I search a 5-digit zip code 
// Then I am presented with a list of breweries and restaurants in that zip code
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;


// define variables
var searchButton = $("#search-btn")
var userInput = $("#user-input")
var breweryList = [];
var foodList = [];

// Function to get data from brewery API
function getBrewery(postalCode) {

    $("#brewery-info").empty();

    var settings = {
        "url": `https://api.openbrewerydb.org/breweries?by_city=${postalCode}&per_page=20`,
        "method": "GET",
        "timeout": 0,
    };
      
    $.ajax(settings).done(function (response) {

    if(response.length >= 1){
        
            for (var i = 0; i < response.length; i++) {
      
                var searchList = html`
                    <div class="card-info">
                        <h3 class="card-title">${response[i].name}</h3>
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

        $("#restaurant-info").empty();

        const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://documenu.p.rapidapi.com/restaurants/search/fields?address=${postalCode}&size=20`,
        "method": "GET",
        "headers": {
            "x-api-key": "848db6fb69eb78b8d5a37e119a0a2748",
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
                        <h3 class="card-title">${response.data[i].restaurant_name}</h3>
                        <p class="card-location1"><b>Cuisine: </b>${response.data[i].cuisines[0]}</p>
                        <p class="card-location1"><b>Location: </b>${response.data[i].address.formatted}</p>
                        <p class="card-location1"><b>Tel.</b> ${response.data[i].restaurant_phone}</p>
                        <a class="card-location1" href="${response.data[i].restaurant_website}" target="_blank">${response.data[i].restaurant_website}</a>
                    </div>`;
                
                $("#restaurant-info").append(searchList2);

                

            }  
    } else {
        var noResultSpan = $("<h2>");
        noResultSpan.text("No Search Results Found");
        $("#restaurant-info").append(noResultSpan);
    }

    });
    
}

// On click event for search button
$("#search-btn").on("click", function(event) {

    event.preventDefault();

    $(".center").show()
    
    var userInputVal = userInput.val().trim();

    localStorage.setItem("userInputVal", JSON.stringify(userInputVal));
    getBrewery(userInputVal);
    getRestaurant(userInputVal);
});


// Local storage to show last index
$(document).ready(function(){

    $(".center").hide();

    if (history !== null) {
        var history = JSON.parse(localStorage.getItem("userInputVal"));
        var lastSearch = history;
        getRestaurant(lastSearch);
        getBrewery(lastSearch);
        console.log(lastSearch);
        $(".center").show()
    }
})