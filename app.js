console.log("JavaScript File Entered");

var main = function() {
	console.log("Running Main");
};

var test = function() {
	
};

window.onload = function(){
	console.log("Window Onload Called");
	main();
	return 0;
};