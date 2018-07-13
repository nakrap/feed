
var generatedMeal = [];

function displayGeneratedMeals() {
    var generatedMeals = $(this).attr("generated-meal-name");
    var queryURL = "https://api.yummly.com/v1/recipes/search?q=" + generatedMeals + "&api_key=JnIno7xeSKctvWCwVNMhxVchJImnRJm5&limit=1"; 
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        var results = response.data;
        // Loop through the results variable.
        for(i=0; i<results.length; i++){
            // Create a div to display the whole gif.
            var cartoonDiv = $("<div class='cartoon'>");
            // Find the rating of each gif and add it to the cartoonDiv.
            var rating = results[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            cartoonDiv.append(pOne);
            // Generate the image from giphy and add it to the cartoonDiv.
            var cartoonGif = results[i].images.fixed_height_still.url;
            var gif = results[i].images.fixed_height.url;
            var image = $("<img class='still-image'>");
                image.attr("src", cartoonGif);
                image.attr('data-gif', gif);
                image.attr("class", "image");
                image.attr("data-index", i);
                image.attr("data-img", cartoonGif);
            cartoonDiv.append(image);
            // Add the cartoonDiv to the page by referencing the div id cartoon-view.
            $("#cartoon-view").prepend(cartoonDiv);
        } 
    });
}
$(document).on("click", '.image', function() {
    var currentState = $(this).attr("data-index");
    var animate = $(this).attr("data-gif");
    var still = $(this).attr("data-img");
    if ($(this).attr("src") == still) {
        $(this).attr("src", animate);
    }
    else if ($(this).attr("src") == animate) {
        $(this).attr("src", still);
    };
});
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < generatedMeal.length; i++) {
        var a = $("<button>");
        a.addClass("cartoon-btn");
        a.attr("generated-meal-name", generatedMeal[i]);
        a.text(generatedMeal[i]);
        $("#buttons-view").append(a);
    }
}

$(document).on("click", ".cartoon-btn", displayCartoonInfo);
renderButtons();






























// var cartoon = ["Bugs Bunny", "Tom and Jerry", "Road Runner", "Droopy", "Mickey Mouse", "Speedy Gonzalez "];
        
    function displayGeneratedInfo() {
            
        var generatedMeal = $(this).attr("generated-meal-name");
        var queryURL = "https://api.yummly.com/v1/recipe/search?q=" + generatedMeal + "&api_key=JnIno7xeSKctvWCwVNMhxVchJImnRJm5&limit=10"; 
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        
            var results = response.data;
        
            // Loop through the results variable.
                for(i=0; i<results.length; i++){
                // Find the rating of each gif and add it to the cartoonDiv.
                var yummlyName = results[i].name;
                var cardText = $("<p>").text("Meal: " + yummlyName);
                $(".card-text").append(cardText);
                // Generate the image from giphy and add it to the cartoonDiv.
                var yummlyImage = results[i].images;
                var gif = results[i].images.fixed_height.url;
                var image = $("<img class='still-image'>");
                    image.attr("src", cartoonGif);
                    image.attr('data-gif', gif);
                    image.attr("class", "image");
                    image.attr("data-index", i);
                    image.attr("data-img", cartoonGif);
                cartoonDiv.append(image);
                // Add the cartoonDiv to the page by referencing the div id cartoon-view.
                $("#cartoon-view").prepend(cartoonDiv);
                } 
            });
        }
        $(document).on("click", '.image', function() {
            var currentState = $(this).attr("data-index");
            var animate = $(this).attr("data-gif");
            var still = $(this).attr("data-img");
            if ($(this).attr("src") == still) {
                $(this).attr("src", animate);
            }
            else if ($(this).attr("src") == animate) {
                $(this).attr("src", still);
            };
        });
        function renderButtons() {
            $("#buttons-view").empty();
            for (var i = 0; i < cartoon.length; i++) {
                var a = $("<button>");
                a.addClass("cartoon-btn");
                a.attr("generated-meal-name", cartoon[i]);
                a.text(cartoon[i]);
                $("#buttons-view").append(a);
            }
        }
        $("#add-cartoon").on("click", function(event) {
            event.preventDefault();
            var cartoons = $("#cartoon-input").val().trim();
            cartoon.push(cartoons);
            renderButtons();
        });
        $(document).on("click", ".cartoon-btn", displayCartoonInfo);
        renderButtons();