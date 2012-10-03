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
	var latitude = prompt("Guessing game! Enter a number between -90 and 90 to try and guess your latitude within 5 degrees!","0");
	if (latitude <=90 || latitude >=-90){
		alert("You have entered a valid number!");
		accessGeolocation();
	} else {
		alert("Please enter a valid number!");
	}
});

$("#contacts").on("click", function(){
	accessContacts();
})