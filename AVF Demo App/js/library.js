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