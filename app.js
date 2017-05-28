//Old Tab Page Chrome Extension
//Application Javascript File
//Author: Robert Burton https://www.robert.red
//MIT License
var applist;




//Create button listeners
var main = function() {
	document.getElementById("submitNewAppBtn").addEventListener("click", appFromForm);
	document.getElementById("rebuildAppsBtn").addEventListener("click", rebuild);
	document.getElementById("saveBtn").addEventListener("click", saveApps);
	document.getElementById("loadBtn").addEventListener("click", loadApps);
	document.getElementById("clearBtn").addEventListener("click", clearApps);
	document.getElementById("testBtn").addEventListener("click", testApp);
};

//For a given index of the applist array, build a string to use as the html for that app
var buildApp = function(index) {
	var built = "";
	built = built + 
		"<div class=\"app\"><a href=\""
		+applist[index].appurl
		+"\"><img style=\"background-color: white;\" src=\""
		+applist[index].appimage
		+"\"></a></div>";
	return built;
};

//Add a Google app tile
var testApp = function() {
	applist.push({appname : "Google", appurl : "https://www.google.com", appimage : "google.png", dateAdded : new Date()});
};

//Appropriate the information in the form to a new app and put it on the applist
var appFromForm = function() {
	var aname = document.getElementById('newAppTitle').value;
	var aimage = document.getElementById('newAppImage').value;
	var aurl = document.getElementById('newAppURL').value;
	applist.push({
		appname : aname,
		appurl : aurl,
		appimage : aimage,
		dateAdded : new Date(),
	});
};

//Save the current applist to Chrome storage
var saveApps = function() {
	chrome.storage.sync.set({
		"apps" : applist
	}, function() {});
};

//Clear the applist that resides in Chrome storage
var clearApps = function() {
	chrome.storage.sync.set({
		"apps" : []
	}, function() {});
};

//Load the applist from Chrome storage
var loadApps = function() {
	chrome.storage.sync.get("apps", function(data) {
		applist = data.apps;
		rebuild();
	});
};

//Test setting some variables and building the app box
var test = function() {
	chrome.storage.sync.set({
		"apps" : applist,
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
	var box = document.getElementById("appbox");
	//box.innerHTML = box.innerHTML + buildApp(0);
	applist.forEach(buildBox);
	
};

//Reconstruct the app box based off of the applist
var rebuild = function() {
	var box = document.getElementById("appbox");
	box.innerHTML = "";
	applist.forEach(buildBox);
};

//Given the app from the applist and its index, add a built app to the app box
var buildBox = function(item,index) {
	 var box = document.getElementById("appbox");
	 box.innerHTML = box.innerHTML + buildApp(index);
	 
};

//Old. Do not use. Used to add apps.
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
};

//Called on page load; calls the main and loads the apps.
document.addEventListener('DOMContentLoaded', function(){
	applist = [];	
	main();
	loadApps();
}, false);