// 
// Timesheet 
//

$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrlKMOM9m3JbnTmOaJnF5BEw-UQWltduU",
    authDomain: "train-scheduler-2afd0.firebaseapp.com",
    databaseURL: "https://train-scheduler-2afd0.firebaseio.com",
    projectId: "train-scheduler-2afd0",
    storageBucket: "",
    messagingSenderId: "495270236511"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var name = '';
  var role = '';
  var start = '';
  var rate = '';
  var worked = '';
  var billed = '';

  database.ref().on('child_added', function(snapshot) {

      // console.log(snapshot.val().name);

      var newRow = $('<tr>');
      name = snapshot.val().name;
      var newName = $('<td>').text(name);
      role = snapshot.val().role;
      var newRole = $('<td>').text(role);
      start = snapshot.val().start;
      var newStart = $('<td>').text(start);
      
      worked = moment([]).diff(start, 'months');
      var newWorked = $('<td>').text(worked);

      rate = snapshot.val().rate;
      var newRate = $('<td>').text(rate);

      billed = worked * rate;
      var newBilled = $('<td>').text('$' + billed);

      newRow.append(newName,newRole,newStart,newWorked,newRate,newBilled);

      $('#employee-data tbody').append(newRow);

  });

  // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

  //     // console.log(snapshot.val().name);

  //     // $("#name-display").text(snapshot.val().name);
  //     // $("#email-display").text(snapshot.val().email);
  //     // $("#age-display").text(snapshot.val().age);
  //     // $("#comment-display").text(snapshot.val().comment);

  //     var newRow = $('<tr>');
  //     name = snapshot.val().name;
  //     var newName = $('<td>').text(name);
  //     role = snapshot.val().role;
  //     var newRole = $('<td>').text(role);
  //     start = snapshot.val().start;
  //     var newStart = $('<td>').text(start);
  //     rate = snapshot.val().rate;
  //     var newRate = $('<td>').text(rate);

  //     newRow.append(newName,newRole,newStart,newRate);

  //     $('#employee-data tbody').append(newRow);

  // });

  $('#search-btn').on('click', function() {

    event.preventDefault();

    // Grabbed values from text boxes
    name = $('#employee-name').val().trim();
    role = $('#role').val().trim();
    start = $('#start-date').val().trim();
    rate = $('#monthly-rate').val().trim();

    // Code for handling the push
    database.ref().push(
    {
      name: name,
      role: role,
      start: start,
      rate: rate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      // https://www.unixtimestamp.com/
    });

    $('#employee-name').val('');
    $('#role').val('');
    $('#start-date').val('');
    $('#monthly-rate').val('');

  });

  $('#delete-btn').on('click', function() {

    event.preventDefault();

    // Code for handling the push
    firebase.child('articlesList').orderByChild('site').equalTo('SciShow').once('child_added', function(snapshot){
        snapshot.ref().remove();  
      });
    // database.ref().orderByChild("dateAdded").limitToLast(1).once("child_added", function(snapshot)
    database.ref().remove(
    {
      name: name,
      role: role,
      start: start,
      rate: rate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      // https://www.unixtimestamp.com/
    });

  })
  
});