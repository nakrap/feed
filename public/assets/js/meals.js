$(document).ready(function () {
    // Getting the inputs using jQuery
    var ownMeal = $("#ownMeal");

    // When user adds a new meal run this
    $("#mealSubmitBtn").on("click", function (event) {
        event.preventDefault();
        // Setting mealData to the input values
        var mealData = {
            meal: ownMeal.val().trim()
        }
        
        //Client Input Validation
        if (validateEventForm(mealData.meal)) {
            // Calling the addMeal function with the paramaters
            // meal
            addMeal(mealData.meal);

            //After addMeal is called the inputs are cleared
            ownMeal.val("");
        };

    });

    // The addMeal function
    function addMeal(meal) {
        // Post request that will hit the /api/meals post request
        $.post("/api/meals", {
            meal: meal,
        }).then(function (data) {
            // Logging data
            console.log(data);
            // Redirecting the user to the all-meals page
            window.location.replace("/all-meals");
        });
    };
});

//Clear validation error messages on input
$("#ownMeal").on("input", function(){
    $(this).removeClass("is-danger");
    $("#mealHelp").hide()
});

//Client Input Validation function
function validateEventForm(ownMeal) {

    var isValidForm = true;
   
    if (ownMeal == "") {
        $("#ownMeal").addClass("is-danger");
        $("#mealHelp").show();
        isValidForm = false;
    }
    
    return isValidForm;
};
