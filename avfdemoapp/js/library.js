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
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
};

//Geolocation
var accessGeolocation = function(){
	var onSuccess = function(position) {
		var lat = position.coords.latitude;
		var longi = position.coords.longitude;
	    //localStorage.setItem("latitude",myLatitude);
	    //localStorage.setItem("longitude",myLongitude);
	    getDistrict(lat,longi);
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
			$("#displaydata").empty();
			$("#displaydata").append('<div id="picturediv" class="picturediv"></div>')
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

var getCongressPeople = function(state,number){
	pleaseWait();
	$.getJSON("http://www.govtrack.us/api/v1/person?roles__current=true&format=jsonp&limit=600&callback=?",
		function(data) {
			var currentObject = data.objects;
			var parseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];	
			createAlpha(parseLetters);
			/*for (var x = 0; x<currentObject.length; x++){
				for (var y = 0; y<parseLetters.length; y++){
					var lastnameString = new String(currentObject[x].lastname)
					var firstLetter = lastnameString.charAt(0);
					var currentLetter = parseLetters[y];
					if (firstLetter === currentLetter){
						var currentPerson = currentObject[x]
						createItems(currentPerson,currentLetter);
					};
				};
			}*/
			var currentObject = data.objects;
			for (var x=0; x<currentObject.length; x++){
				var thisPersonsState = currentObject[x].current_role.state;
				if (thisPersonsState===state){
					if (currentObject[x].current_role.role_type==="senator"){		
						var currentPerson = currentObject[x];
						var lastnameString = new String(currentObject[x].lastname)
						var firstLetter = lastnameString.charAt(0);
						createItems(currentPerson,firstLetter);
					} else if (currentObject[x].current_role.role_type==="representative"){
						if (currentObject[x].current_role.district==number){
							var currentPerson = currentObject[x];
							var lastnameString = new String(currentObject[x].lastname)
							var firstLetter = lastnameString.charAt(0);
							createItems(currentPerson,firstLetter);	
						};
					};		
				};
			};
			for (var y = 0; y<parseLetters.length; y++){
				var currentLetter = parseLetters[y];
				var divID = "#letter"+currentLetter;
				var thisDiv = $(divID).html();
				var divString = '<h2 class="congressheader">'+currentLetter+'</h2>';
				var linkClass = "#link"+currentLetter;
				if (thisDiv===divString){
					$(linkClass).remove();
					$(divID).remove();
				};
			};
		});
};

var createTwitterDiv = function(){
	$("#displaydata").empty();
	$("#displaydata").append('<header><h2>Recent Election Tweets</h2></header>').append('<div class="twitter" id="twittersearch"></div>')
};

var createTweets = function(tweets){
	var numberOfTweets = tweets.length;
	for (x=0; x<numberOfTweets; x++){
		var username = tweets[x].from_user;
		var userimage = tweets[x].profile_image_url;
		var tweetText = tweets[x].text;
		var tweetID = "tweetnumber"+x;
		var tweetFinder = "#"+tweetID;
		$("#twittersearch").append('<div id="'+tweetID+'" class="nameplustweet"></div>')
		$(tweetFinder).append('<img src="'+userimage+'" class="twitter"></a>').append('<h4 class="twitterhead"><a href="http://www.twitter.com/'+username+'">'+username+'</a></h4>').append('<p class="tweettext">'+tweetText+'</p>')
	}
}

var createAlpha = function(parseLetters){
	$("#displaydata").empty();
	$("#displaydata").append("<h2>Current U.S. Congresspeople</h2>")
	$("#displaydata").append('<nav id="quickalphalinks"></nav>')
	for (var y=0; y<parseLetters.length; y++){
		var currentLetter = parseLetters[y];
		var divID = "#letter"+currentLetter;
		$("#quickalphalinks").append('<a href="'+divID+'" id="link'+currentLetter+'">'+currentLetter+'</a>  ');
		$("#displaydata").append("<div class='"+divID+"' id='letter"+currentLetter+"'>")
		$(divID).append('<h2 class="congressheader">'+currentLetter+'</h2>')
	}
};

var createItems = function(currentPerson,currentLetter){
	var divID = "#letter"+currentLetter;
	var title = currentPerson.current_role.title;
	var firstName = currentPerson.firstname;
	var lastName = currentPerson.lastname;
	var party = currentPerson.current_role.party;
	var role = currentPerson.current_role.role_type_label;
	var twitter = currentPerson.twitterid;
	var twitterHandle = "@"+twitter;
	var state = currentPerson.current_role.state;
	$(divID).append("<h3>"+title+" "+firstName+" "+lastName+"</h3>").append("<p>Party: "+party+"</p>").append("<p>State: "+state+"</p>").append("<p>Role: "+role+"</p>");
	if (twitter != ""){
		$(divID).append('<p>Twitter Handle: '+'<a href="http://www.twitter.com/'+twitter+'">'+twitterHandle+'</a></p>')
	}
};

var pleaseWait = function(){
	$("#displaydata").empty();
	$("#displaydata").append("Please wait while your data loads!")
}

//Retrieve the congressional district from location
var getDistrict = function(lat,longi){
	var url = "http://services.sunlightlabs.com/api/districts.getDistrictFromLatLong.json?apikey=eab4e1dfef1e467b8a25ed1eab0f7544&latitude="+lat+"&longitude="+longi+"&jsonp=?";
	console.log(url);
	$.getJSON(url,
		function(data){
			var state = data.response.districts[0].district.state;
			var number = data.response.districts[0].district.number;
			getCongressPeople(state,number);
		});
}
