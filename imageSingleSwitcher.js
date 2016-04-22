var spacePressed = false;
window.addEventListener("keydown", dealWithKeyboard, true);
function dealWithKeyboard(e) {
	// alert("key press detected");
	if (e.keyCode == 0 || e.keyCode == 32) {
		console.log('Space pressed');
		spacePressed = true;
	}
}

function startImageSwitcher(originalFile, changedFile, greyFile, maxTestTime,
		image1Time, image2Time, greyTime) {
	console.log('starting image switcher');
	var i1 = document.getElementById('image-frame');
	var counter = 0;
	var startTime = new Date().getTime();

	function switchImage() {
		console.log('switching image: ' + counter);
		var currentTime = new Date().getTime();
		if ((currentTime - startTime) > maxTestTime) {
			i1.src = greyFile;
			alert("time is up");
			window.location.href = 'SelectedTests.html';
			// clearInterval(refreshIntervalId);
			return;
		}
		if (spacePressed) {
			i1.src = greyFile;
			alert("test is stopped due to key press. Num ms: "
					+ (currentTime - startTime - greyTime));
			window.location.href = 'SelectedTests.html';
			// clearInterval(refreshIntervalId);
			return;
		}
		counter++;
		var fileToDisplay = "";
		var timeout = 50;
		if (((currentTime - startTime)) < image1Time) {
			fileToDisplay = originalFile;
		} else if (((currentTime - startTime)) < greyTime) {
			fileToDisplay = greyFile;
			// timeout = imageInterval;
		} else if (((currentTime - startTime)) < image2Time) {
			fileToDisplay = changedFile;
			// timeout = imageInterval;
		} else {
			fileToDisplay = greyFile;
			// timeout = greyInterval;
		}
		i1.src = fileToDisplay;
		setTimeout(function() {
			switchImage();
		}, timeout);
	}
	switchImage();
}



function startImageSwitcherDefault(originalFile) {

	var image1Time = 5000;

	var greyTime = 1000;

	var image2Time = 20000;
	var maxTestTime = image1Time + greyTime + image2Time;

	var dotIndex = originalFile.indexOf('.');

	var basicFileNamePart = originalFile.substring(0, dotIndex);

	var fileType = originalFile.substring(dotIndex, originalFile.length);

	startImageSwitcher(originalFile, basicFileNamePart + "_changed" + fileType,"grey.JPG", maxTestTime, image1Time, greyTime+image1Time+image2Time, greyTime+image1Time);

}