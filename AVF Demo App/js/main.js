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
	accessGeolocation();
});

$("#contacts").on("click", function(){
	accessContacts();
})