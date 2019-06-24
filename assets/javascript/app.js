// Initial Values
var trainname = "";
var traindest = "";
var trainfreq = 0;
var trainfirsttime = "";
var trainnext = "";

//display live clock on the webpage that updates every second.
$("#currenttime").text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, HH:mm:ss'))

setInterval(function () {
  var time = moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, HH:mm:ss');
  $("#currenttime").text(time)
}, 1000)

//initialize database
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyA4bEghElyUN-2vq2PkKjQYTEu6UDeh7_c",
  authDomain: "fir-learning-a5b76.firebaseapp.com",
  databaseURL: "https://fir-learning-a5b76.firebaseio.com",
  projectId: "fir-learning-a5b76",
  storageBucket: "fir-learning-a5b76.appspot.com",
  messagingSenderId: "400196194527",
  appId: "1:400196194527:web:a64f511ca81fb579"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();



// Capture Button Click
$("#addtrain").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  trainname = $("#addtrainname").val().trim();
  traindest = $("#addtraindestination").val().trim();
  trainfreq = $("#addtrainfrequency").val().trim();
  trainfirsttime = $("#addtrainfirsttime").val().trim();


  // Code belowinspired by Armando Gautreaux, one of our Awesome TAs! Thank you!
  // check if reponses are blank and store reponse in object
  if (
    $("#addtrainname").val().length > 0 &&
    $("#addtraindestination").val().length > 0 &&
    $("#addtrainfirsttime").val().length > 0 &&
    $("#addtrainfrequency").val().length > 0
  ) {

    UserTrain = {
      trainname: trainname,
      traindest: traindest,
      trainfreq: trainfreq,
      trainfirsttime: trainfirsttime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // Code for handling the push of our new object
    database.ref().push(UserTrain)

    // clear the value of our inputs
    $("#addtrainname").val("");
    $("#addtraindestination").val("");
    $("#addtrainfirsttime").val("");
    $("#addtrainfrequency").val("");
  }
});

// Firebase watcher .on("child_added")
database.ref().on("child_added", function (snapshot) {
  console.log("within the response")
  console.log(snapshot.val())
  // storing the snapshot.val() in a variable for convenience to help store new local variables
  var sv = snapshot.val();

//store database entries as new local variables
 var trainnametabledata = sv.trainname;
 var traindesttabledata = sv.traindest;
 var trainfreqtabledata = sv.trainfreq;
 var trainfirsttimetabledata = sv.trainfirsttime;

 //Compute next arrival times
 var trainfirsttimoment = moment(trainfirsttimetabledata, "hh:mm").subtract(1, "days");
 var timedifference = moment().diff(moment(trainfirsttimoment), "minutes");
 var remainder = timedifference % trainfreqtabledata;
 var minutesawaytabledata = trainfreqtabledata - remainder;

 // determine when next train will arrive in minutes

 var nexttrain = moment().add(minutesawaytabledata, "minutes");
 var nextarrivaltabledata = moment(nexttrain). format("HH:mm");

  // Console.loging the database data   --  ONLY FOR DEBUGGING!!
  // console.log(sv);
  // console.log(sv.trainname);
  // console.log(sv.traindest);
  // console.log(sv.trainfreq);
  // console.log(sv.trainfirsttime);
  // addrowcontent();



// create and append rows to table
  var newrow = `
<tr>
  <th scope="row">${trainnametabledata}</th>
  <td>${traindesttabledata}</td>
  <td>${trainfreqtabledata}</td>
  <td>${nextarrivaltabledata}</td>
  <td>${minutesawaytabledata}</td>
</tr>
`
  $("#tablecontent").append(newrow)
    ;

  });
  // Handle the errors
//   function (errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// }