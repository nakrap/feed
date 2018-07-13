// // api/users:
// // POST
// Working
$('#register').on('click', function(event) {
  event.preventDefault();
  var firstName = $('#firstName')
    .val()
    .trim();
  var lastName = $('#lastName')
    .val()
    .trim();

  var fullName = firstName + ' ' + lastName;

  var email = $('#emailInput')
    .val()
    .trim();
  var password = $('#password')
    .val()
    .trim();

  var user = {
    name: fullName,
    email: email,
    password: password
  };

  $.post('/api/users', user, function(data) {
    console.log(data);
    localStorage.removeItem('id');
    localStorage.setItem('id', data.id);
    $('#name-display').text(data.name);
    window.location.replace('/dashboard');
  });
});
