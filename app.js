//Old Tab Page Chrome Extension
//Application Javascript File
//Author: Robert Burton https://www.robert.red
//MIT License
var applist;




//Create button listeners
var main = function() {
	applist = [];
	
	document.getElementById("submitNewAppBtn").addEventListener("click", appFromForm);
	document.getElementById("rebuildAppsBtn").addEventListener("click", rebuild);
	document.getElementById("saveBtn").addEventListener("click", saveApps);
	document.getElementById("loadBtn").addEventListener("click", loadApps);
	document.getElementById("clearBtn").addEventListener("click", clearApps);
	document.getElementById("testBtn").addEventListener("click", testApp);
	document.getElementById("optionz").addEventListener("click", toggleOps);
	chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });
	toggleOps();
	chrome.storage.local.get("apps", function(data) {
		console.log("There are no apps. "+ (!("apps" in data)));
		if(!("apps" in data)) {
			testApp();
			saveApps();
		}
		loadApps();
	});
};

var imageExists = function(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

//Test creating/saving an image data URL
//Code appropriated from https://davidwalsh.name/convert-image-data-uri-javascript
var imgData = function(url, callback) {
	imageExists(url, function(exists) {
		console.log('RESULT: url=' + url + ', exists=' + exists);
	});
	var img = new Image();
	img.crossOrigin="anonymous";
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    img.src = url;
}

//Toggles the form to add buttons
var toggleOps = function() {
	var ops = document.getElementById("newApp");
	if(ops.style.display == "block") {
		ops.style.display = "none";
	} else {
		ops.style.display = "block";
	}
}

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
	var uimage = 0;
	imgData(aimage, function(dataUri) {
		uimage = dataUri;
		applist.push({
			appname : aname,
			appurl : aurl,
			appimage : uimage,
			dateAdded : new Date(),
		});
	});
};

//Save the current applist to Chrome storage
var saveApps = function() {
	chrome.storage.local.set({
		"apps" : applist
	}, function() {});
};

//Clear the applist that resides in Chrome storage
var clearApps = function() {
	chrome.storage.local.set({
		"apps" : []
	}, function() {});
};

//Load the applist from Chrome storage
var loadApps = function() {
	chrome.storage.local.get("apps", function(data) {
		console.log("There are no apps. "+ (!("apps" in data)));
		console.log("Bacon!");
	});
	
	chrome.storage.local.get("apps", function(data) {
		if(chrome.runtime.lastError) {
			chrome.storage.local.set({
				"apps" : applist
			});
		}
		applist = data.apps;
		console.log(data);
		console.log("Cheese!");
		rebuild();
	});
};

//Test setting some variables and building the app box
var test = function() {
	chrome.storage.local.set({
		"apps" : applist,
		"var1" : 5,
		"var2" : 10
	}, function() {});
	//chrome.storage.local.clear();
	/*
	chrome.storage.local.get("var1", function(data) {
		console.log(data.var1);
	});
	chrome.storage.local.get("var2", function(dataz) {
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

//Deprecated. Formerly to add apps.
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

//Called on page load; calls the main.
document.addEventListener('DOMContentLoaded', function(){
	main();
}, false);