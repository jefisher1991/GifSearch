
// the variables/ topics
var topics = ["Taj Mahal", "Great Wall of China", "Stonehenge", "Colosseum", "Statue of Liberty"];


// creates the buttons at the top
function buttons() {
    var html = "";
    for (i = 0; i < topics.length; i++) {
        html += "<button class=myTopics>" + topics[i] + "</button>";
    }
    $("#topicsHTMLId").html(html);
}

// function that pulls in the lists created below, three parameters- this will actualy dispaly the images to the screen.
function displayMonuments(urlAnimate, urlStill, rating) {
    var html = "";
    for (var i = 0; i < urlAnimate.length; i++) {

        var tempHTML = "<img class=gif src=" + urlStill[i] + " ";

        tempHTML += "data-still=" + urlStill[i] + " ";
        tempHTML += "data-animate=" + urlAnimate[i] + " ";
        tempHTML += "data-state='still' ";
        tempHTML += ">";
        tempHTML += "<span class=ratings> Rating: " + rating[i] + "</span>";
        html += tempHTML;
    }
    $("#displayMonuments").html(html);
}

// this function creates the Ajax data pull, and when it is returned it creates the lists of urls, stills, and ratings. 
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
            var ratings = []
            console.log(response);
            for (var gif of response.data) {
                var myUrl = "http://i.giphy.com/" + gif.id + ".gif";
                urlList.push(myUrl);
                stillList.push(gif.images.original_still.url)
                ratings.push(gif.rating)
                console.log(ratings);
               

            }
            // sends the results to the display monuments function.
            displayMonuments(urlList, stillList, ratings);
        });
}

$(document).ready(function() {
// makes the search button active and pushes the new button topic to the topics array
    buttons();
    $(".searchButton").click(function() {
        var newItem = $(".searchText").val();
        topics.push(newItem);
        buttons();
    });


// this is going to make the animation work properly. 
    $("body").on("click", ".myTopics", function() {
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
