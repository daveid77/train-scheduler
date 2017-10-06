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
  var trainName = '';
  var destination = '';
  var trainTime = '';
  var frequency = '';
  var nextArrival = '';
  var minutesAway = '';

  database.ref().on('child_added', function(snapshot) {

      // console.log('trainName: ' + snapshot.val().trainName);

      $('#current-schedule-row').show();

      var newRow = $('<tr>');

      trainName = snapshot.val().trainName;
      var newName = $('<td>').text(trainName);

      destination = snapshot.val().destination;
      var newDestination = $('<td>').text(destination);

      frequency = snapshot.val().frequency;
      var newFrequency = $('<td>').text(frequency);

      nextArrival = snapshot.val().nextArrival;
      var newArrival = $('<td>').text(nextArrival);

      minutesAway = snapshot.val().minutesAway;
      var newMinutes = $('<td>').text(minutesAway);

      newRow.append(newName,newDestination,newFrequency,newArrival,newMinutes);
      $('#train-data tbody').append(newRow);

  });

  $('#submit-btn').on('click', function() {

    event.preventDefault();

    // Get values from text boxes
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    trainTime = $('#train-time').val().trim();
    frequency = $('#frequency').val().trim();

    console.log(trainTime);

    // Push to firebase
    database.ref().push(
    {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      // https://www.unixtimestamp.com/
    });

    // Empty form input values
    $('#train-name').val('');
    $('#destination').val('');
    $('#train-time').val('');
    $('#frequency').val('');

  });

  // $('#delete-btn').on('click', function() {

  //   event.preventDefault();

  //   // Remove from firebase
  //   firebase.child('articlesList').orderByChild('site').equalTo('SciShow').once('child_added', function(snapshot){
  //       snapshot.ref().remove();  
  //     });
  //   // database.ref().orderByChild("dateAdded").limitToLast(1).once("child_added", function(snapshot)
  //   database.ref().remove(
  //   {
  //     trainName: trainName,
  //     destination: destination,
  //     trainTime: trainTime,
  //     frequency: frequency,
  //     dateAdded: firebase.database.ServerValue.TIMESTAMP
  //     // https://www.unixtimestamp.com/
  //   });

  // });
  
});