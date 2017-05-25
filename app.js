console.log("JavaScript File Entered");

var main = function() {
	console.log("Running Main");
	test();
};

var test = function() {
	chrome.storage.sync.set({
		"var1" : 5,
		"var2" : 10
	}, function() {});
	chrome.storage.sync.get("var1", function(data) {
		console.log(data.var1);
	});
	chrome.storage.sync.get("var2", function(dataz) {
		console.log(dataz.var2);
	});
};

var addApp = function(nname,nurl,nimage) {
	var box = document.getElementById("appbox");
	var app = document.createElement("div");
	
}

window.onload = function(){
	console.log("Window Onload Called");
	main();
	return 0;
};