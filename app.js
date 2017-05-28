//Old Tab Page Chrome Extension
//Application Javascript File
//Author: Robert Burton https://www.robert.red
//MIT License
var applist;





var main = function() {
	document.getElementById("submitNewAppBtn").addEventListener("click", appFromForm);
	document.getElementById("rebuildAppsBtn").addEventListener("click", rebuild);
	document.getElementById("saveBtn").addEventListener("click", saveApps);
	document.getElementById("loadBtn").addEventListener("click", loadApps);
	document.getElementById("clearBtn").addEventListener("click", clearApps);
	document.getElementById("testBtn").addEventListener("click", testApp);
};

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

var testApp = function() {
	applist.push({appname : "Google", appurl : "https://www.google.com", appimage : "google.png", dateAdded : new Date()});
};

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

var saveApps = function() {
	chrome.storage.sync.set({
		"apps" : applist
	}, function() {});
};

var clearApps = function() {
	chrome.storage.sync.set({
		"apps" : []
	}, function() {});
};

var loadApps = function() {
	chrome.storage.sync.get("apps", function(data) {
		applist = data.apps;
		rebuild();
	});
};


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

var rebuild = function() {
	var box = document.getElementById("appbox");
	box.innerHTML = "";
	applist.forEach(buildBox);
};

var buildBox = function(item,index) {
	 var box = document.getElementById("appbox");
	 box.innerHTML = box.innerHTML + buildApp(index);
	 
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
};

document.addEventListener('DOMContentLoaded', function(){
	applist = [];	
	main();
	loadApps();
}, false);