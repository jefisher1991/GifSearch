// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page. 

// the variables/ topics
var topics = ["Taj Mahal", "Great Wall of China", "Stonehenge", "Colosseum", "Statue of Liberty"];


$("searchbutton").click(var search = $("#searchText"); 
// console.log(search);


// creates the buttons at the top
for (i = 0; i < topics.length; i++)
    $("#topicsHTMLId").append("<button>" + topics[i] + "</button> ");


function displayMonuments(urlAnimate, urlStill) {
    var html = "";
    for (var i = 0; i < urlAnimate.length; i++) {
        var tempHTML = "<img class=gif src=" + urlStill[i] + " ";
        tempHTML += "data-still=" + urlStill[i] + " ";
        tempHTML += "data-animate=" + urlAnimate[i] + " ";
        tempHTML += "data-state='still' ";
        tempHTML += " >";
        html += tempHTML;
    }
    $("#displayMonuments").html(html);
}


function data(topic) {
    // Constructing a queryURL using the animal name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";


    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(response);
            var urlList = []
            var stillList = []
            for (var gif of response.data) {
                var myUrl = "http://i.giphy.com/" + gif.id + ".gif";
                urlList.push(myUrl);
                stillList.push(gif.images.original_still.url)
            }
            displayMonuments(urlList, stillList);
        });
}

$(document).ready(function() {

    $("button").on("click", function() {
        var currentTopic = $(this).text();
        data(currentTopic);
    });

    $("body").on("click", ".gif", function() {
      var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    });

});
