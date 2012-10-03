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

//Geolocation
var accessGeolocation = function(){
	var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}

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
	options.filter="Bob"; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError, options);
};

//Notification - Beep
var makeBeep = function(numberoftimes){
	navigator.notification.beep(numberoftimes)
}