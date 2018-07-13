// // import { CLIENT_RENEG_LIMIT } from "tls";

// // api/users:

// // POST
// $("#signup").on("click", function(event) {

//     event.preventDefault();
//         var firstName = $("#firstName").val().trim();
//         var lastName = $("#lastName").val().trim();

//         var fullName = firstName + lastName;
//         // console.log(fullName);

//         var email = $("#email").val().trim();
//         var password = $("pwd").val().trim();

//         var user = {
//             name: fullName,
//             email: email,
//             password: password
//         };


//     $.post("/api/users", user, function(data){
//         // console.log(data);
//         localStorage.setItem("userId", data.id);
//         $("#name-display").text(data.name);
//     });
// });


// // GET BY ID

// // $.ajax
// // ({
// //   type: "GET",
// //   url: "/api/users/1",
// //   success: function(html)
// //   {
// //       console.log("hone")
// //   }
// // });

//     $.get("/api/users/1", function(req, res) {

//         // var id = req.body.id;
//         $.noConflict()

//         console.log("front here");
        
//         console.log(res)
//         for (var i = 0; i < res.Meal.length; i++) {
            
//             console.log(req.Meal[i])
//         //     var newMeal = $("<p>").text(res.body.Meals[i]);

//         }
//         // renderAuthorList(rowsToAdd);
//         // nameInput.val("");
//     });







// // api/meals:

// // POST

// // DELETE BY ID



// // api/masterMeals

// // GET
