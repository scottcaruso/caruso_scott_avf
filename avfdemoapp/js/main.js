//Scott Caruso
//AVF 1210
//Javascript for Landing App

//document.addEventListener("deviceready", onDeviceReady, false);
//NOTE - In order for the app to work in the Android simulator, it seems that Compass and the EventListener need to be commented out!
//function onDeviceReady(){
	//accessCompass(); //Comment this out for Android deploy.
	//accessGeolocation();
	localStorage.setItem("photourl","none");

	$("#camera").on("click", function(){
		accessCamera();
	});

	$("#notification").on("click", function(){
		makeBeep(3);
	});

	$("#geolocation").on("click", function(){
		accessGeolocation();	
	});

	$("#zipcodeentry").on("click", function(){
		zipcodeLookup();
	})

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

	$("#videoplayer").on("click", function(){
		$("#displaydata").empty();
		$("#displaydata").append('<section class="movieplayer" id="movieplayer"><h3>Discussion Video</h3><h4>Week 3</h4><video width="320" height="240" controls="controls"><source src="https://dl.dropbox.com/u/110712229/discussion.mp4" type="video/mp4"><source src="https://dl.dropbox.com/u/110712229/discussion.ogv" type="video/ogg"><source src="https://dl.dropbox.com/u/110712229/discussion.webm" type="video/webm"><object data="discussion.mp4" width="320" height="240"></object></video></section>')
	})

	$("#twitter").on("click", function(){
		getTwitterFeed();
	});	

	$("#congress").on("click", function(){
		getAllCongressPeople()
	})
//};