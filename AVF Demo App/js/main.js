//Scott Caruso
//AVF 1210
//Javascript for Landing App

$("#camera").on("click", function(){
	accessCamera();
});

$("#notification").on("click", function(){
	makeBeep(1);	
});

$("#geolocation").on("click", function(){
	var getLatitude = function(){
		function onSuccess(position){
    		var geocoords = new Object();
			geocoords.latitude = position.coords.latitude;
			geocoords.longitude = position.coords.longitude;
			geocoords.altitude = position.coords.altitude;
			geocoords.accuracy = position.coords.altitudeAccuracy;
			geocoords.heading = position.coords.heading;
			geocoords.speed = position.coords.speed;
			geocoords.timestamp = position.timestamp;
			var myLat = geocoords.latitude;
			var myLatMin = myLat - 5;
			var myLatMax = myLat + 5;
			var lat = prompt("Guessing game! Enter a number between -90 and 90 to try and guess your latitude within 5 degrees!","0");
			if (lat <=90 || lat >=-90){
				alert("Your guess is " + lat + ".");
				if (lat <= myLatMax && lat >= myLatMin){
					makeBeep(1);
					alert("Congratulations! You win! Your current latitude is " + myLat + ", which is within 5 degrees of your guess of " + lat + ".")
				} else {
					alert("Sorry! Your latitude is " + myLat + ", which is more than 5 degrees from your guess of " + lat + ". Try again to get the notification beep!")
				};
			} else {
				alert("Please enter a valid number!");
			};
		};

		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};
	getLatitude();
});

$("#contacts").on("click", function(){
	accessContacts();
})