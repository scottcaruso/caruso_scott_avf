//Scott Caruso
//AVF 1210
//Javascript for Landing App


$("#camera").on("click", function(){
	alert("This works!");
	accessCamera();
});

$("#notification").on("click", function(){
	makeBeep(3);	
});

$("#geolocation").on("click", function(){
	accessGeolocation();
});

$("#contacts").on("click", function(){
	accessContacts();
})