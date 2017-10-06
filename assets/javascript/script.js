// 
// Timesheet 
//

$(document).ready(function() {

  // Initialize firebase
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
  var firstTime = '';
  var frequency = '';
  var nextArrival = '';
  var minutesAway = '';
  var currentTime = '';

  // Get data from firebase and append to DOM
  database.ref().on('child_added', function(snapshot) {

      // console.log('trainName: ' + snapshot.val().trainName);

      $('#current-schedule-row').show();

      var newRow = $('<tr>');

      trainName = snapshot.val().trainName; // user inputted
      var newName = $('<td>').text(trainName);
      destination = snapshot.val().destination; // user inputted
      var newDestination = $('<td>').text(destination);
      frequency = snapshot.val().frequency; // user inputted
      var newFrequency = $('<td>').text(frequency);
      firstTime = snapshot.val().firstTime; // user inputted
        console.log(firstTime);

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
      var timeRemainder = timeDiff % frequency;
      minutesAway = frequency - timeRemainder;
      nextArrival = moment().add(minutesAway, "minutes").format("hh:mma");
      var newArrival = $('<td>').text(nextArrival);
      var newMinutes = $('<td>').text(minutesAway);

      newRow.append(newName,newDestination,newFrequency,newArrival,newMinutes);
      $('#train-data tbody').append(newRow);

  });

  $('#submit-btn').on('click', function() {

    event.preventDefault();

    // Get values from form inputs
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTime = $('#first-time').val().trim();
    frequency = $('#frequency').val().trim();

    //console.log(firstTime);

    // Push to firebase
    database.ref().push(
    {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      // https://www.unixtimestamp.com/
    });

    // Empty form input values
    $('#train-name').val('');
    $('#destination').val('');
    $('#first-time').val('');
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
  //     firstTime: firstTime,
  //     frequency: frequency,
  //     dateAdded: firebase.database.ServerValue.TIMESTAMP
  //     // https://www.unixtimestamp.com/
  //   });

  // });
  
});