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
    // console.log(req.get('x-auth-token'));
    // localStorage.setItem('mike', req.get('x-auth-token'));
    // console.log('loggin in');
    // console.log(data);
    localStorage.removeItem('id');
    localStorage.setItem('id', data.id);
    $('#name-display').text(data.name);
    window.location.replace('/dashboard');
  });
});

// $('#loginBtn').on('click', function(e) {
//   e.preventDefault();
//   var email = $('#loginName')
//     .val()
//     .trim();
//   var password = $('#loginPassword')
//     .val()
//     .trim();
//   const loginData = {
//     email: email,
//     password: password
//   };
//   $.post('/api/auth', loginData, function(data) {});
// });
