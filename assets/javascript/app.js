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

// database.ref().on("value", function(snapshot) {
//
//   addTrainName = snapshot.addTrainName.val();
//   addDestination = snapshot.addDestination.val();
//   addTrainTime = snapshot.addTrainTime.val();
//   addFrequency = snapshot.addFrequency.val();
//
// })



//If I add a train I need to erase the train names and then repopulate them

//moment().format('HH:mm')
//moment().format('mm')
//Adding a train name etc
$("#submit").on("click", function(){
  // Prevent form from submitting
  event.preventDefault();
//this val etc
 var addTrainName = $("#addTrainName").val()
 var addDestination = $("#addDestination").val()
 var addTrainTime = $("#addTrainTime").val()
 var addFrequency = $("#addFrequency").val()
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


database.ref().set({
  addTrainName: addTrainName,
  addDestination: addDestination,
  addTrainTime: addTrainTime,
  addFrequency: addFrequency
});

})

});
