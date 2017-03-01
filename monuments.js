// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page. 

// the variables/ topics
var topics = ["Taj Mahal", "Great Wall of China", "Stonehenge", "Colosseum", "Statue of Liberty"]


// creates the buttons at the top
for (i = 0; i < topics.length; i++) 
  $("#topicsHTMLId").append("<input type='button' value='" + topics[i]+"'/>");
    

function grabImages ()



