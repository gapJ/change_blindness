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
		imageInterval, greyInterval) {
	console.log('starting image switcher');
	var i1 = document.getElementById('image-frame');
	var counter = 0;
	var startTime = new Date().getTime();

	function switchImage() {
		console.log('switching image: ' + counter);
		var currentTime = new Date().getTime();
		if (((currentTime - startTime) / 1000) > maxTestTime) {
			i1.src = greyFile;
			alert("1 minute is complete");
			window.location.href = '../ChangeStart.html';
			// clearInterval(refreshIntervalId);
			return;
		}
		if (spacePressed) {
			i1.src = greyFile;
			alert("test is stopped due to key press");
			window.location.href = '../ChangeStart.html';
			// clearInterval(refreshIntervalId);
			return;
		}
		counter++;
		var fileToDisplay = "";
		var timeout = 0;
		if (counter % 4 == 1) {
			fileToDisplay = originalFile;
			timeout = imageInterval;
		} else if (counter % 4 == 3) {
			fileToDisplay = changedFile;
			timeout = imageInterval;
		} else {
			fileToDisplay = greyFile;
			timeout = greyInterval;
		}
		i1.src = fileToDisplay;
		setTimeout(function() {
			switchImage();
		}, timeout);
	}
	switchImage();
}

function startImageSwitcherDefault(originalFile) {
	var maxTestTime = 60;
	var imageTime = 200;
	var greyTime = 80;
	var dotIndex = originalFile.indexOf('.');
	var basicFileNamePart = originalFile.substring(0, dotIndex);
	var fileType = originalFile.substring(dotIndex, originalFile.length);
	startImageSwitcher(originalFile, basicFileNamePart + "_changed" + fileType,
			"../grey.JPG", maxTestTime, imageTime, greyTime);
}