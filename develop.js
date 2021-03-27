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
        "url": `https://api.openbrewerydb.org/breweries?by_postal=${postalCode}&per_page=10`,
        "method": "GET",
        "timeout": 0,
    };
      
    $.ajax(settings).done(function (response) {

    if(response.length >= 1){
        console.log(response)
      
            for (var i = 0; i < response.length; i++) {
      
                var searchList = html`
                    <div class="card-info">
                        <h1 class="card-title">${response[i].name}</h1>
                        <p class="card-location">${response[i].street}, ${response[i].city}, ${response[i].state}</p>
                        <p class="card-location">Tel. ${response[i].phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</p>
                        <a class="card-location" href="${response[i].website_url}" target="_blank">${response[i].website_url}</a>
                    </div>`;
        
                $("#brewery-info").append(searchList);
            } 
    } else {
        console.log("not found")
        var noResultSpan = $("<h2>");
        noResultSpan.text("No Search Results Found");
        $("#brewery-info").append(noResultSpan);
    }
      
});

/*
    $.ajax({
        RequestURL: `https://api.openbrewerydb.org/breweries/search?query=55303&per_page=10&sort=-name`,
        method: "GET",
    }).then(function(options) {

        console.log("hello");
        
        $("#brewery-info").empty();

        var info = {
            name: options[0].name,
            location: options.location,
        }

        
        var searchList = html`
            <div class="card-info">
                <h1 class="card-title">${info.name}</h1>
                <p class="card-author">Author Name</p>
            </div>`;
        

        var searchList = $(`
        <div class="card-info">
            <h1 class="card-title">${info.name}</h1>
            <p class="card-author">Author Name</p>
        </div>`);

        $("#brewery-info").append(searchList);

    })*/



    // var postalCode = get the value from the zip code text input

}

// Function to get data from restaurant API
// prevent default
// post function

// On click event for search button
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var userInputVal = userInput.val().trim();

    getBrewery(userInputVal);
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