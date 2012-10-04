//Scott Caruso
//AVF 1210
//JS Library File

//Camera access
var accessCamera = function(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	    destinationType: Camera.DestinationType.DATA_URL
	 }); 

	function onSuccess(imageData) {
	    var image = document.getElementById('myImage');
	    image.src = "data:image/jpeg;base64," + imageData;
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
};

function accessGeolocationTest (){
	var x = 5;
	return x
};

//Geolocation
var accessGeolocation = function(){
	var onSuccess = function(position) {
	    var geocoords = new Object();
			geocoords.latitude = position.coords.latitude;
			geocoords.longitude = position.coords.longitude;
			geocoords.altitude = position.coords.altitude;
			geocoords.accuracy = position.coords.altitudeAccuracy;
			geocoords.heading = position.coords.heading;
			geocoords.speed = position.coords.speed;
			geocoords.timestamp = position.timestamp;
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	};

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

//Contacts services
var accessContacts = function(){
	function onSuccess(contacts) {
	    alert('Found ' + contacts.length + ' contacts.');
	};

	function onError(contactError) {
	    alert('onError!');
	};

	// find all contacts with 'Bob' in any name field
	var options = new ContactFindOptions();
	options.filter=""; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError, options);
};

//Notification - Beep
var makeBeep = function(numberoftimes){
	navigator.notification.beep(numberoftimes);
};