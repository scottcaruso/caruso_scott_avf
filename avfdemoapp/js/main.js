//Scott Caruso
//AVF 1210
//Javascript for Landing App

//document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady(){
	/*accessCompass();
	accessGeolocation();
	localStorage.setItem("photourl","none");

	$("#camera").on("click", function(){
		accessCamera();
	});

	$("#notification").on("click", function(){
		makeBeep(1);	
	});

	$("#geolocation").on("click", function(){
		var myLat = localStorage.getItem("latitude");
		var minLat = myLat-5;
		var maxLat = myLat-(-5);
		var lat = prompt("Guessing game! Enter a number between -90 and 90 to try and guess your latitude within 5 degrees!","0");
			if (lat <= 90 && lat >=-90){
				alert("Your guess is " + lat + ".");
				if (lat <= maxLat && lat >= minLat){
					makeBeep(1);
					alert("Congratulations! You win! Your current latitude is " + myLat + ", which is within 5 degrees of your guess of " + lat + ".")
					window.location.reload;			
				} else {
					alert("Sorry! Your latitude is " + myLat + ", which is more than 5 degrees from your guess of " + lat + ". Try again to get the notification beep!")
					window.location.reload;
				};
			} else {
				alert("Please enter a valid number!");
				window.location.reload;
			};
	});

	$("#compass").on("click", function(){
		var heading = localStorage.getItem("heading");
		if (heading >= 0 && heading <= 45){
			var direction = "North-Northeast";
		} else if (heading > 45 && heading <= 90){
			var direction = "Northeast-East";
		} else if (heading > 90 && heading <= 135){
			var direction = "East-Southeast";
		} else if (heading > 135 && heading <= 180){
			var direction = "Southeast-South";
		} else if (heading > 180 && heading <= 225){
			var direction = "South-Southwest";
		} else if (heading > 225 && heading <= 270){
			var direction = "Southwest-West";
		} else if (heading > 270 && heading <= 315){
			var direction = "West-Northwest";
		} else if (heading > 315 && heading <= 360){
			var direction = "Northwest-North";
		};
		alert("Avast, ye landlubber! Thar fancy compass be pointin' ye on a " + direction + " course.")
		window.location.reload;
	});

	$("#contacts").on("click", function(){
		alert("Sorry! Scott failed miserably at coding anything good with the contact list, so it doesn't exist yet!")
	});*/

	$("#twitter").on("click", function(){
		alert("Button pressed!");
		getTwitterFeed();
	});	

	$("#congress").on("click", function(){
		alert("Button pressed!")
		getCongressPeople()
	})
//};