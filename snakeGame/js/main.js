var snakeLoc = {};
var snakeLength;
var fruitLoc;
var dir = 1;
var tid;
var score = 0;

$(document).ready(
	function () {
		createSnake();
		startPlaying();
	}
);
$(document).on("swipeleft", function (event) {
	if (dir != 1) {
		dir = 0;
	}
});
$(document).on("swiperight", function (event) {
	if (dir != 0) {
		dir = 1;
	}
});


$(document).swipe({
	swipeUp: function (event, direction, distance, duration) {
		if (dir != 2) {
			dir = 3;
		}
	},
	swipeDown: function (event, direction, distance, duration) {
		if (dir != 3) {
			dir = 2;
		}
	},
	click: function (event, target) {},
	threshold: 100,
	allowPageScroll: "none"
});

$(document).keydown(function (e) {
	switch (e.which) {
	case 37: // left
		if (dir != 1) {
			dir = 0;
		}
		break;
	case 38: // up
		if (dir != 2) {
			dir = 3;
		}
		break;
	case 39: // right
		if (dir != 0) {
			dir = 1;
		}
		break;
	case 40: // down
		if (dir != 3) {
			dir = 2;
		}
		break;
	default:
		return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

function startPlaying() {
	tid = setInterval(moveOnce, 200);
}

function moveOnce() {
	moveSnake(dir);
	if (onFruit()) {
		hitFruit();
		placeFruit();
	}
	if (pastGrid() || collision()) {
		endGame();
	}
}

function pastGrid() {
	return (snakeLoc[0].x < 0 || snakeLoc[0].x > 19 || snakeLoc[0].y < 0 || snakeLoc[0].y > 19)
}

function collision() {
	for (var i = 1; i < snakeLength; i++) {
		if (snakeLoc[0].x == snakeLoc[i].x && snakeLoc[0].y == snakeLoc[i].y) {
			return true;
		}
	}
	return false;
}

function endGame() {
	clearInterval(tid);
	deadSnake();
	setTimeout(resetGame, 1000);
}

function resetGame() {
	snakeLoc = {};
	dir = 1;
	score = 0;
	clearGrid();
	createSnake();
	startPlaying();
}

function clearGrid() {
	for (var x = 0; x <= 20; x++) {
		for (var y = 0; y <= 20; y++) {
			$('tbody tr').eq(y).find('td').eq(x).css("background-color", "transparent");
		}
	}
}

function placeFruit() {
	var x = Math.floor(Math.random() * 20);
	var y = Math.floor(Math.random() * 20);
	while (isSnake(x, y)) {
		x = Math.floor(Math.random() * 20);
		y = Math.floor(Math.random() * 20);
	}
	fruitLoc = {
		x: x,
		y: y
	};
	$('tbody tr').eq(y).find('td').eq(x).css("background-color", "green");
}

function isSnake(x, y) {
	for (var i = 0; i < snakeLength; i++) {
		if (x == snakeLoc[i].x && y == snakeLoc[i].y) {
			return true;
		}
	}
	return false;
}

function createSnake() {
	snakeLength = 4;
	for (var i = 0; i < snakeLength; i++) {
		var snakePiece = {
			x: 10 - i,
			y: 10
		};
		snakeLoc[i] = snakePiece;
	}
	drawSnake();
	placeFruit();
}

function drawSnake() {
	for (var i = 0; i < snakeLength; i++) {
		var x = snakeLoc[i].x;
		var y = snakeLoc[i].y;
		$('tbody tr').eq(y).find('td').eq(x).css("background-color", "blue");
	}
}

function deadSnake() {
	for (var i = 0; i < snakeLength; i++) {
		var x = snakeLoc[i].x;
		var y = snakeLoc[i].y;
		$('tbody tr').eq(y).find('td').eq(x).css("background-color", "red");
	}
}

function moveSnake(dir) {
	for (var i = 0; i < snakeLength; i++) {
		var x = snakeLoc[i].x;
		var y = snakeLoc[i].y;
		$('tbody tr').eq(y).find('td').eq(x).css("background-color", "transparent");
	}
	switch (dir) {
	case 0:
		moveLeft();
		break;
	case 1:
		moveRight();
		break;
	case 2:
		moveUp();
		break;
	case 3:
		moveDown();
		break;
	}
}

function hitFruit() {
	snakeLoc[snakeLength] = {
		x: snakeLoc[snakeLength - 1].x,
		y: snakeLoc[snakeLength - 1].y
	}
	snakeLength++;
	$("#score").text(score++);
}

function onFruit() {
	return (snakeLoc[0].x == fruitLoc.x && snakeLoc[0].y == fruitLoc.y);
}

function moveLeft() {
	for (var i = snakeLength - 1; i > 0; i--) {
		snakeLoc[i].x = snakeLoc[i - 1].x;
		snakeLoc[i].y = snakeLoc[i - 1].y;
	}
	snakeLoc[0].x = snakeLoc[0].x - 1;
	drawSnake();
}

function moveRight() {
	for (var i = snakeLength - 1; i > 0; i--) {
		snakeLoc[i].x = snakeLoc[i - 1].x;
		snakeLoc[i].y = snakeLoc[i - 1].y;
	}
	snakeLoc[0].x = snakeLoc[0].x + 1;
	drawSnake();
}

function moveUp() {
	for (var i = snakeLength - 1; i > 0; i--) {
		snakeLoc[i].x = snakeLoc[i - 1].x;
		snakeLoc[i].y = snakeLoc[i - 1].y;
	}
	snakeLoc[0].y = snakeLoc[0].y + 1;
	drawSnake();
}

function moveDown() {
	for (var i = snakeLength - 1; i > 0; i--) {
		snakeLoc[i].x = snakeLoc[i - 1].x;
		snakeLoc[i].y = snakeLoc[i - 1].y;
	}
	snakeLoc[0].y = snakeLoc[0].y - 1;
	drawSnake();
}