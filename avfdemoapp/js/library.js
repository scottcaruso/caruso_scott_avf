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

//Function to ask the user for a Zipcode.
var zipcodeLookup = function(){
	var question = prompt("Please enter a zipcode. Please note: some zipcodes include multiple districts, so you may return multiple representatives and districts.");
	var questionString = new String (question);
	if (questionString.length != 5){
		alert("Please enter a valid zipcode in 5-digit format.")
	} else {
		for (x=0;x<questionString.length;x++){
			if (isNaN(questionString[x])){
				alert("Please enter a valid zipcode using only numeric digits.")
				window.location="index.html"
			};
		};
		getDistrictByZip(question);
	};
}

//Display an image
var displayImage = function(){
	var imageLocation = localStorage.getItem("photourl");
	var ask = confirm("Would you like to display the picture you just took?");
		if (ask){
			$("#displaydata").empty();
			$("#displaydata").append('<div id="picturediv" class="picturediv"></div>')
			$("#picturediv").append('<img id="newpicture" class="newpicture"></img>');
			$("#newpicture").attr("src",imageLocation);
		}
	window.location="#newpicture"
};

//Access Twitter
var getTwitterFeed = function(){
	pleaseWait();
	$.getJSON("http://search.twitter.com/search.json?q=election&callback=?",
		function(data) {
			var tweets = data.results;
			createTwitterDiv();
			createTweets(tweets);
		});
};

//The below functions access the DOM to create HTML to display the Twitter feed.
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
	};
};


//Geolocation access
var accessGeolocation = function(){
	var onSuccess = function(position) {
		var lat = position.coords.latitude;
		var longi = position.coords.longitude;
	    getDistrict(lat,longi);
	};
	var onError = function(error) {
	    var ask = confirm("There was a problem trying to get your current location. Would you like to enter a zipcode instead?");
	    if (ask){
	    	zipcodeLookup();
	    };
	};
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

//Retrieve the congressional district from Geolocation
var getDistrict = function(lat,longi){
	var url = "http://services.sunlightlabs.com/api/districts.getDistrictFromLatLong.json?apikey=eab4e1dfef1e467b8a25ed1eab0f7544&latitude="+lat+"&longitude="+longi+"&jsonp=?";
	$.getJSON(url,
		function(data){
			var state = data.response.districts[0].district.state;
			var number = data.response.districts[0].district.number;
			var numbers = "Only 1 District";
			getSomeCongressPeople(state,number,numbers);
		});
};

//Retrieve the congressional district by zipcode, if Geo data isn't available or the user prefers to lookup a different location.
var getDistrictByZip = function(zipcode){
	var url = "http://services.sunlightlabs.com/api/districts.getDistrictsFromZip.json?apikey=eab4e1dfef1e467b8a25ed1eab0f7544&zip="+zipcode+"&jsonp=?";
	$.getJSON(url,
		function(data){
			var isThereData = data.response.districts;
			if (jQuery.isEmptyObject(isThereData)){
				var ask = confirm("That zip code does not exist. Would you like to try a different one?")
				if (ask){
					zipcodeLookup();
				} else {
					window.location="index.html"
				};
			} else {
				var state = data.response.districts[0].district.state;
				var districtsArray = data.response.districts;
				var numberOfDistricts = districtsArray.length;
				if (numberOfDistricts > 1){
					var numbers = []
					for (x = 0; x < numberOfDistricts; x++){
						var currentDistrict = data.response.districts[x].district.number;
						numbers.push(currentDistrict);
					}
				} else {
					var number = data.response.districts[0].district.number;
					var numbers = "Only 1 District";
				};
				getSomeCongressPeople(state,number,numbers);
			};
		});
};

//If the user wants to see all current congresspeople, he accesses this function
var getAllCongressPeople = function(){
	pleaseWait();
	$.getJSON("http://www.govtrack.us/api/v1/person?roles__current=true&format=jsonp&limit=600&callback=?",
		function(data) {
			var currentObject = data.objects;
			var parseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];	
			createAlpha(parseLetters);
			for (var x = 0; x<currentObject.length; x++){
				for (var y = 0; y<parseLetters.length; y++){
					var lastnameString = new String(currentObject[x].lastname)
					var firstLetter = lastnameString.charAt(0);
					var currentLetter = parseLetters[y];
					if (firstLetter === currentLetter){
						var currentPerson = currentObject[x]
						createItemsForFullList(currentPerson,currentLetter);
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
}

//If the user wants to access only the congresspeople for a specific district(s), use this one,
var getSomeCongressPeople = function(state,number,numbers){
	pleaseWait();
	$.getJSON("http://www.govtrack.us/api/v1/person?roles__current=true&format=jsonp&limit=600&callback=?",
		function(data) {
			var currentObject = data.objects;
			var parseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];	
			createAlphaNoLinks(parseLetters,state,number,numbers);
			var currentObject = data.objects;
			for (var x=0; x<currentObject.length; x++){
				var thisPersonsState = currentObject[x].current_role.state;
				if (thisPersonsState===state){
					if (currentObject[x].current_role.role_type==="senator"){
						var currentPerson = currentObject[x];
						var lastnameString = new String(currentObject[x].lastname)
						var firstLetter = lastnameString.charAt(0);
						createItemsForGeoList(currentPerson,firstLetter);
					}; 
					if (currentObject[x].current_role.role_type==="representative"){
						if (numbers != "Only 1 District"){
							for (y=0; y<numbers.length; y++){
								var districtNumber = parseInt(numbers[y]);
								if (currentObject[x].current_role.district===districtNumber){
									var currentPerson = currentObject[x];
									var lastnameString = new String(currentObject[x].lastname)
									var firstLetter = lastnameString.charAt(0);
									createItemsForGeoList(currentPerson,firstLetter);
								};
							};
						} else if (currentObject[x].current_role.district==number){
							var currentPerson = currentObject[x];
							var lastnameString = new String(currentObject[x].lastname)
							var firstLetter = lastnameString.charAt(0);
							createItemsForGeoList(currentPerson,firstLetter);	
						};
					};		
				};
			};
			$("#backtomain").append('<p><a href="launch.html" id="backtolaunch">Return to launch page.</a></p>')
		});
};

//This function creates HTML elements to display the Congress data
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

//This function is the same as above, but doesn't create the nav links.
var createAlphaNoLinks = function(parseLetters,state,number,numbers){
	$("#displaydata").empty();
	$("#displaydata").append("<h2>Current U.S. Congresspeople</h2>")
	var stateLong = retrieveStateFromAbbreviation(state);
	if (number != 0){
		if (numbers != "Only 1 District"){
			var numberOfDistricts = numbers.length;
			if (numberOfDistricts === 2){
				$("#displaydata").append("<h3>Representing Districts "+numbers[0]+" and "+numbers[1]+" of "+stateLong);
			} else {
				$("#displaydata").append("<h3>Representing Districts "+numbers[0]+", "+numbers[1]+", and "+numbers[2]+" of "+stateLong);
			};
		} else {
			$("#displaydata").append("<h3>Representing District "+number+" of "+stateLong);
		}
	} else {
		$("#displaydata").append("<h3>Representing the entire state of "+stateLong);
	}
	for (var y=0; y<parseLetters.length; y++){
		var currentLetter = parseLetters[y];
		var divID = "#letter"+currentLetter;
		$("#displaydata").append("<div class='"+divID+"' id='letter"+currentLetter+"'>")
	}
};

//This functionc reates individual congresspeople in the DIVs above.
var createItemsForFullList = function(currentPerson,currentLetter){
	var divID = "#letter"+currentLetter;
	var title = currentPerson.current_role.title;
	var firstName = currentPerson.firstname;
	var lastName = currentPerson.lastname;
	var party = currentPerson.current_role.party;
	var role = currentPerson.current_role.role_type_label;
	var twitter = currentPerson.twitterid;
	var twitterHandle = "@"+twitter;
	var state = currentPerson.current_role.state;
	$(divID).append("<h4>"+title+" "+firstName+" "+lastName+"</h4>").append("<p>Party: "+party+"</p>").append("<p>State: "+state+"</p>").append("<p>Role: "+role+"</p>");
	if (twitter != ""){
		$(divID).append('<p>Twitter Handle: '+'<a href="http://www.twitter.com/'+twitter+'">'+twitterHandle+'</a></p>')
	}
};

//This functionc reates individual congresspeople in the DIVs above.
var createItemsForGeoList = function(currentPerson,currentLetter){
	var divID = "#letter"+currentLetter;
	var title = currentPerson.current_role.title;
	var firstName = currentPerson.firstname;
	var lastName = currentPerson.lastname;
	var party = currentPerson.current_role.party;
	//var role = currentPerson.current_role.role_type_label;
	var twitter = currentPerson.twitterid;
	var twitterHandle = "@"+twitter;
	//var state = currentPerson.current_role.state;
	$(divID).append("<h4>"+title+" "+firstName+" "+lastName+"</h4>").append("<p>Party: "+party+"</p>");
	if (twitter != ""){
		$(divID).append('<p>Twitter Handle: '+'<a href="http://www.twitter.com/'+twitter+'">'+twitterHandle+'</a></p>')
	}
};

//This function simply empties the display Div and displays a message to the user to wait.
var pleaseWait = function(){
	$("#displaydata").empty();
	$("#launch").empty();
	$("#displaydata").append("Please wait while your data loads!")
};

var retrieveStateFromAbbreviation = function(state){
	var stateList = {
		AL: "Alabama",
		AK: "Alaska",
		AZ: "Arizona",
		AR: "Arkansas",
		CA: "California",
		CO: "Colorado",
		CT: "Connecticut",
		DE: "Delaware",
		FL: "Florida",
		GA: "Georgia",
		HI: "Hawaii",
		ID: "Idaho",
		IL: "Illinois",
		IN: "Indiana",
		IA: "Iowa",
		KS: "Kansas",
		KY: "Kentucky",
		LA: "Louisana",
		ME: "Maine",
		MD: "Maryland",
		MA: "Massachusetts",
		MI: "Michigan",
		MN: "Minnesota",
		MS: "Mississippi",
		MO: "Missouri",
		MT: "Montana",
		NE: "Nebraska",
		NV: "Nevada",
		NH: "New Hampshire",
		NJ: "New Jersey",
		NM: "New Mexico",
		NY: "New York",
		NC: "North Carolina",
		ND: "North Dakota",
		OH: "Ohio",
		OK: "Oklahoma",
		OR: "Oregon",
		PA: "Pennsylvania",
		RI: "Rhode Island",
		SC: "South Carolina",
		SD: "South Dakota",
		TN: "Tennessee",
		TX: "Texas",
		UT: "Utah",
		VT: "Vermont",
		VA: "Virginia",
		WA: "Washington",
		WV: "West Virginia",
		WI: "Wisconsin",
		WY: "Wyoming" }
	var stateLongName = stateList[state];
	return stateLongName;
};