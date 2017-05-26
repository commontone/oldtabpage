//Old Tab Page Chrome Extension
//Application Javascript File
//Author: Robert Burton https://www.robert.red
//MIT License

console.log("JavaScript File Entered");
var apps = [
	{appname : "Google", appurl : "https://www.google.com", appimage : "google.png", lastClicked : new Date(), numClicks : 0}
];
var main = function() {
	
	console.log("Running Main");
	test();
};

var buildApp = function(index) {
	var built = "";
	built = built + 
		"<div class=\"app\"><a href=\""
		+apps[index].appurl
		+"\"><img src=\""
		+apps[index].appimage
		+"\"></a></div>";
	return built;
}

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
	addApp(0,0,0);
	console.log(apps[0]);
	console.log(buildApp(0));
	var box = document.getElementById("appbox");
	box.innerHTML = box.innerHTML + buildApp(0);
	
};

var addApp = function(nname,nurl,nimage) {
	var box = document.getElementById("appbox");
	var app = document.createElement("div");
	app.className = "app";
	var ref = document.createElement("a");
	ref.href = "#";
	var theimage = document.createElement("img");
	theimage.src = "gradient.png";
	ref.appendChild(theimage);
	app.appendChild(ref);
	box.appendChild(app);
	console.log("test");
}

window.onload = function(){
	console.log("Window Onload Called");
	main();
	return 0;
};