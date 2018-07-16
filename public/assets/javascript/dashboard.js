// GET
$(document).ready(function() {
  $.get('/api/mealMaster', function(data) {
    for (var i = 0; i < data.length; i++) {
      var meal = $('<li>')
        .attr('value', data[i].meal)
        .addClass('list-group-item list-group-item-action meals')
        .text(data[i].meal);
      $('#foods').append(meal);
    }

    $('.meals').on('click', function(e) {
      e.preventDefault();
      let newMeal = $(this).attr('value');
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
        .addClass('list-group-item hover-meal')
        .text(data.Meals[i].meal)
        .attr('value', data.Meals[i].id);
      $('#yourMealList').append(yourMeals);
    }
    $('.hover-meal').on('click', function() {
      const val = $(this).val();
      console.log(val);
      $.ajax({
        url: `/api/meals/${val}`,
        type: 'DELETE'
      });
      window.location.reload();
    });
  });

  const generateMeals = e => {
    e.preventDefault();
    $.get(`/api/users/${localStorage.getItem('id')}`, function(data) {
      let mealsArray = [];
      for (var i = 0; i < data.Meals.length; i++) {
        mealsArray.push(data.Meals[i].meal);
      }
      const currentMeals = [];
      const generatedMeals = () => {
        const aMeal = mealsArray[Math.floor(Math.random() * mealsArray.length)];
        currentMeals.push(aMeal);
      };
      for (var j = 0; j < 7; j++) {
        generatedMeals();
      }
      $('#food1').text(currentMeals[0]);
      $('#food2').text(currentMeals[1]);
      $('#food3').text(currentMeals[2]);
      $('#food4').text(currentMeals[3]);
      $('#food5').text(currentMeals[4]);
      $('#food6').text(currentMeals[5]);
      $('#food7').text(currentMeals[6]);
    });
  };

  $('#genSeven').on('click', function(e) {
    generateMeals(e);
  });

  $('#genAgain').on('click', function(e) {
    generateMeals(e);
  });

  $('#mealSubmitBtn').on('click', function(e) {
    console.log(`clicked`);
    e.preventDefault();
    let userMeal = {
      UserId: localStorage.getItem('id'),
      meal: $('#ownMeal')
        .val()
        .trim()
    };
    $.post('/api/meals', userMeal, function(data) {
      location.reload();
      $.get(`/api/users/${localStorage.getItem('id')}`, function(data) {
        for (var i = 0; i < data.Meals.length; i++) {
          let yourMeals = $('<li>')
            .addClass('list-group-item')
            .text(data.Meals[i].meal);
          $('#yourMealList').append(yourMeals);
        }
      });
    });
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();
    window.location.replace('/');
  });
});
