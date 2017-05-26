//Old Tab Page Chrome Extension
//Application Javascript File
//Author: Robert Burton https://www.robert.red
//MIT License

console.log("JavaScript File Entered");
var apps = [
	{appname : "Google", appurl : "https://www.google.com", appimage : "google.png", lastClicked : new Date(), dateAdded : new Date(), numClicks : 0}
];
var main = function() {
	document.getElementById("submitNewAppBtn").addEventListener("click", appFromForm);
	document.getElementById("rebuildAppsBtn").addEventListener("click", rebuild);
	document.getElementById("saveBtn").addEventListener("click", appFromForm);
	console.log("Running Main");
	test();
};

var buildApp = function(index) {
	var built = "";
	built = built + 
		"<div class=\"app\"><a href=\""
		+apps[index].appurl
		+"\"><img style=\"background-color: white;\" src=\""
		+apps[index].appimage
		+"\"></a></div>";
	return built;
};

var appFromForm = function() {
	var aname = document.getElementById('newAppTitle').value;
	var aimage = document.getElementById('newAppImage').value;
	var aurl = document.getElementById('newAppURL').value;
	apps.push({
		appname : aname,
		appurl : aurl,
		appimage : aimage,
		lastClicked : new Date(),
		dateAdded : new Date(),
		numClicks : 0
	});
	apps.forEach(buildBox);
	console.log(apps);
};

var test = function() {
	chrome.storage.sync.set({
		"apps" : apps,
		"var1" : 5,
		"var2" : 10
	}, function() {});
	//chrome.storage.sync.clear();
	/*
	chrome.storage.sync.get("var1", function(data) {
		console.log(data.var1);
	});
	chrome.storage.sync.get("var2", function(dataz) {
		console.log(dataz.var2);
	});
	*/
	addApp(0,0,0);
	console.log(apps[0]);
	console.log(buildApp(0));
	var box = document.getElementById("appbox");
	//box.innerHTML = box.innerHTML + buildApp(0);
	apps.forEach(buildBox);
	
};

var rebuild = function() {
	var box = document.getElementById("appbox");
	box.innerHTML = "";
	apps.forEach(buildBox);
}

var buildBox = function(item,index) {
	 var box = document.getElementById("appbox");
	 box.innerHTML = box.innerHTML + buildApp(index);
	 
}

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