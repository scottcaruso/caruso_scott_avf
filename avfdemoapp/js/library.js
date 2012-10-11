//Scott Caruso
//AVF 1210
//JS Library File

//Camera access
var accessCamera = function(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
	    destinationType: Camera.DestinationType.FILE_URI,
	    targetWidth: 250,
	    targetHeight: 450}); 

	function onSuccess(imageURI) {
	    localStorage.setItem("photourl",imageURI);
	    displayImage();
	    //var image = document.getElementById('myImage');
	    //image.src = imageURI;
	    //console.log(imageURI);
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
};

//Geolocation
var accessGeolocation = function(){
	var onSuccess = function(position) {
		var myLatitude = position.coords.latitude;
	    localStorage.setItem("latitude",myLatitude)
	};

	// onError Callback receives a PositionError object
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	};

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

//Compass
var accessCompass = function(){
	function onSuccess(heading) {
		myHeading = heading.magneticHeading;
	    localStorage.setItem("heading",myHeading);
	};

	function onError(error) {
	    alert('CompassError: ' + error.code);
	};

	navigator.compass.getCurrentHeading(onSuccess, onError);
};

//Notification 
var makeBeep = function(times){
	navigator.notification.beep(times);
};

//Display an image
var displayImage = function(){
	var imageLocation = localStorage.getItem("photourl");
	console.log(imageLocation);
	var ask = confirm("Would you like to display the picture you just took?");
		if (ask){
			$("#picturebucket").append('<div id="picturediv" class="picturediv"></div>')
			$("#picturediv").append('<img id="newpicture" class="newpicture"></img>');
			$("#newpicture").attr("src",imageLocation);
		}
	window.location="#newpicture"
};

var getTwitterFeed = function(){
	pleaseWait();
	$.getJSON("http://search.twitter.com/search.json?q=election&callback=?",
		function(data) {
			var tweets = data.results;
			createTwitterDiv();
			createTweets(tweets);
		});
};

var getCongressPeople = function(){
	pleaseWait();
	$.getJSON("http://www.govtrack.us/api/v1/person?roles__current=true&format=jsonp&limit=600&callback=?",
		function(data) {
			//console.log(data.objects[0].lastname);
			var currentObject = data.objects;
			console.log(currentObject[5]);
			var parseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];	
			createAlpha(parseLetters);
			for (var x = 0; x<currentObject.length; x++){
				for (var y = 0; y<parseLetters.length; y++){
					var lastnameString = new String(currentObject[x].lastname)
					var firstLetter = lastnameString.charAt(0);
					var currentLetter = parseLetters[y];
					if (firstLetter === currentLetter){
						var currentPerson = currentObject[x]
						createItems(currentPerson,currentLetter);
					};
				};
			}
		});
};

var createTwitterDiv = function(){
	$("#displaydata").empty();
	$("#displaydata").append('<div class="twitter" id="twittersearch"></div>')
};

var createTweets = function(tweets){
	var numberOfTweets = tweets.length;
	for (x=0; x<numberOfTweets; x++){
		var username = tweets[x].from_user;
		var userimage = tweets[x].profile_image_url;
		var tweetText = tweets[x].text;
		var tweetID = "tweetnumber"+x;
		var tweetFinder = "#"+tweetID;
		$("#twittersearch").append('<div id="'+tweetID+'"></div>')
		$(tweetFinder).append('<img src="'+userimage+'"></a>').append('<h4>'+username+'</h4>').append('<p>'+tweetText+'</p>')
	}
}

var createAlpha = function(parseLetters){
	$("#displaydata").empty();
	for (var y=0; y<parseLetters.length; y++){
		var currentLetter = parseLetters[y];
		var divID = "#letter"+currentLetter;
		$("#displaydata").append("<div class='"+divID+"' id='letter"+currentLetter+"'>")
		$(divID).append("<h2>"+currentLetter+"</h2>")
	}
};

var createItems = function(currentPerson,currentLetter){
	var divID = "#letter"+currentLetter;
	var title = currentPerson.current_role.title;
	var firstName = currentPerson.firstname;
	var lastName = currentPerson.lastname;
	var party = currentPerson.current_role.party;
	var state = currentPerson.current_role.state;
	$(divID).append("<h3>"+title+" "+firstName+" "+lastName+"</h3>").append("<p>Party: "+party+"</p>").append("<p>State: "+state+"</p>");
};

var pleaseWait = function(){
	$("#displaydata").empty();
	$("#displaydata").append("Please wait while your data loads!")
}