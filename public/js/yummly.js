$('.recipeButton').on('click', function(e) {
  e.preventDefault();
  const meal = $(this)
    .val()
    .split(' ')
    .join('+');
  console.log(meal);
  const queryURL = `http://api.yummly.com/v1/api/recipes?_app_id=c80eb1dc&_app_key=bcb2227975b7e809f5979400cec566a4&q=${meal}`;
  $.get(queryURL, function(data) {});
});
