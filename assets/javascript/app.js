//When Opened  The App should:
//Display the current Time
// Update the train times
// Add a train
//Linked to firebase

$(document).ready(function() {

//  Shows the current time
$("#currentTime").append(moment().format('MMMM Do YYYY, HH:mm'))

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

  $("#trainTable > tbody").append("<tr><td>" + addTrainName + "</td><td>" + addDestination + "</td><td>" +
  addTrainTime + "</td><td>" + addFrequency + "</td></tr>");

  })




//If I add a train I need to erase the train names and then repopulate them

//moment().format('HH:mm')
//moment().format('mm')
//Adding a train name etc
$("#submit").on("click", function(){
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


});
});
