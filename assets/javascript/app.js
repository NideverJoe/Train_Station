//display live clock on the webpage that updates every second.

$("#currenttime").text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'))

setInterval(function(){
    var time = moment().format('dddd') + " " + moment().format('MMMM Do YYYY, h:mm:ss a');
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
  
      // Initial Values
      var trainname = "";
      var traindest = "";
      var trainfreq = 0;
      var trainfirsttime = "";
  
      // Capture Button Click
      $("#addtrain").on("click", function(event) {
        event.preventDefault();
  
        // Grabbed values from text boxes
        trainname = $("#addtrainname").val().trim();
        traindest = $("#addtraindestination").val().trim();
        trainfreq = $("#addtrainfrequency").val().trim();
        trainfirsttime = $("#addtrainfirsttime").val().trim();
  
        // Code for handling the push
        database.ref().push({
          trainname: trainname,
          traindest: traindest,
          trainfreq: trainfreq,
          trainfirsttime: trainfirsttime,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  
      });
  
      // Firebase watcher .on("child_added"
      database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
  
        // Console.loging the last user's data
        console.log(sv.trainname);
        console.log(sv.traindest);
        console.log(sv.trainfreq);
        console.log(sv.trainfirsttime);
  
        // create and append rows to table
var newrow;
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });


//submit user entry to firebase
$("#add-user").on("click", function(event) {
    event.preventDefault();


  });