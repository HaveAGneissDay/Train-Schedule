//When Opened  The App should:
//Display the current Time
// Update the train times
// Add a train
//Linked to firebase

$(document).ready(function() {

  //  Shows the current time
  $("#currentTime").append(moment().format('MMMM Do YYYY, HH:mm'));

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsmzAb31K0qHVKkxvZzh4mxbj3atk8SjI",
    authDomain: "train-schedule-3b3a8.firebaseapp.com",
    databaseURL: "https://train-schedule-3b3a8.firebaseio.com",
    projectId: "train-schedule-3b3a8",
    storageBucket: "",
    messagingSenderId: "922067610377"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var addTrainName = childSnapshot.val().name;
    var addDestination = childSnapshot.val().destination;
    var addTrainTime = childSnapshot.val().trainTime;
    var addFrequency = childSnapshot.val().frequency;

    var currentTime = moment().format('HH:mm');
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(currentTime, "HH:mm").subtract(1, "years");
    // next train = Current Time - first time  / frequency

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted));
    // Time apart (remainder)
    var tRemainder = diffTime % addFrequency;
    // Minute Until Train
    var minsAway = addFrequency - tRemainder;
    // Next Train
    var nextArival = moment().add(minsAway).format("HH:mm");


    $("#trainTable > tbody").append("<tr><td>" + addTrainName + "</td><td>" + addDestination + "</td><td>" +
      addFrequency + " mins" + "</td><td>" + nextArival + "</td><td>" + minsAway + " mins" + "</td></tr>");

  })

  //If I add a train I need to erase the train names and then repopulate them

  //Adding a train name etc
  $("#submit").on("click", function() {
    // Prevent form from submitting
    event.preventDefault();
    //this val etc
    var addTrainName = $("#addTrainName").val();
    var addDestination = $("#addDestination").val();
    var addTrainTime = $("#addTrainTime").val();
    var addFrequency = $("#addFrequency").val();
    console.log(addTrainName);
    console.log(addDestination);
    console.log(addTrainTime);
    console.log(addFrequency);

    //New Temperorary Object
    var newTrain = {
      name: addTrainName,
      destination: addDestination,
      trainTime: addTrainTime,
      frequency: addFrequency
    };

    //Push the new Train Object to firebase

    database.ref().push(newTrain);

    //Console Log everything
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);
    // Clears the inputs
    $("#addTrainName").val("");
    $("#addDestination").val("");
    $("#addTrainTime").val("");
    $("#addFrequency").val("");


  });
});
