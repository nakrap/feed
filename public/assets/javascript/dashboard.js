
//Global Variables:
var meal = [];
var newMeal = [];
var userMeal = [];



// GET
$.get('/api/mealMaster', function(data) {
  for (var i = 0; i < data.length; i++) {
    var meal = $('<button>')
      .attr('value', data[i].meal)
      .addClass('list-group-item list-group-item-action meals')
      .text(data[i].meal);
    $('#foods').append(meal);
  }

  $('.meals').on('click', function(e) {
    e.preventDefault();
    let newMeal = $(this)
      .val()
      .trim();
    let userMeal = {
      UserId: localStorage.getItem('id'),
      meal: newMeal
    };
    // api/meals:
    // POST
    $.post('/api/meals', userMeal, function(data) {
      location.reload();
    });
  });
});

// api/users
// GET BY ID
$.get(`/api/users/${localStorage.getItem('id')}`, function(data) {
  for (var i = 0; i < data.Meals.length; i++) {
    let yourMeals = $('<li>')
      .addClass('list-group-item')
      .text(data.Meals[i].meal);
    $('#yourMealList').append(yourMeals);
    console.log(yourMeals);
  }
});

$('#genSeven').on('click', function(e) {
  e.preventDefault();
  $.get(`/api/users/${localStorage.getItem('id')}`, function(data) {
    let mealsArray = [];
    for (var i = 0; i < data.Meals.length; i++) {
      mealsArray.push(data.Meals[i].meal);
    }
    console.log(mealsArray);
    // const generatedMeals = () => {
    //   mealsArray[Math.floor(Math.random() * mealsArray.length)];
    // };
    // for (var j = 0; j < 7; j++) {
    //   console.log(generatedMeals[j]);
    // }

    // console.log(generatedMeals);
  });
});
