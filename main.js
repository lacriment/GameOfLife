var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var width = Math.round(canvas.width / 5);
	height = Math.round(canvas.height / 5);

var cell = {
	x: null,
	y: null,
	alive: false
}

var world = [];
var newWorld = [];
function initWorld(space) {
	var x = 0, y = 0;
	for(var i = 0; i < width; i++) {
		space[i] = [];
		for(var j = 0; j < height; j++) {
			space[i][j] = {
				x: x,
				y: y,
				alive: false
			};
			y += 5;
		}
		x += 5;
		y = 0;
	}
}

function drawWorld() {
    for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
	    	if(world[i][j].alive == true) {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(world[i][j].x, world[i][j].y, 5, 5);
	    	}
		}
    }
}

function createPlanor(x, y) {
    world[x][y].alive = true;
    world[x + 1][y].alive = true;
    world[x + 2][y].alive = true;
    world[x][y + 1].alive = true;
    world[x + 1][y + 2].alive = true;
}

function createBlock(x, y) {
    world[x][y].alive = true;
    world[x + 1][y].alive = true;
    world[x+1][y+1].alive = true;
    world[x][y+1].alive = true;
}

function createGosper(x, y) {
    createBlock(x, y+4);
    createBlock(x+34, y+2);
    world[x+10][y+4].alive = true;
    world[x+10][y+5].alive = true;
    world[x+10][y+6].alive = true;
    world[x+11][y+3].alive = true;
    world[x+11][y+7].alive = true;
    world[x+12][y+2].alive = true;
    world[x+12][y+8].alive = true;
    world[x+13][y+2].alive = true;
    world[x+13][y+8].alive = true;
    world[x+14][y+5].alive = true;
    world[x+15][y+3].alive = true;
    world[x+15][y+7].alive = true;
    world[x+16][y+4].alive = true;
    world[x+16][y+5].alive = true;
    world[x+16][y+6].alive = true;
    world[x+17][y+5].alive = true;
    world[x+20][y+2].alive = true;
    world[x+20][y+3].alive = true;
    world[x+20][y+4].alive = true;
    world[x+21][y+2].alive = true;
    world[x+21][y+3].alive = true;
    world[x+21][y+4].alive = true;
    world[x+22][y+1].alive = true;
    world[x+22][y+5].alive = true;
    world[x+24][y].alive = true;
    world[x+24][y+1].alive = true;
    world[x+24][y+5].alive = true;
    world[x+24][y+6].alive = true;
}

function neighbourCount(x, y) {
	var count = 0;
	if(isAlive(x-1, y-1))   count++;
	if(isAlive(x-1, y))     count++;
	if(isAlive(x-1, y+1))   count++;
	if(isAlive(x, y-1))     count++;
	if(isAlive(x, y+1))     count++;
	if(isAlive(x+1, y-1))   count++;
	if(isAlive(x+1, y))     count++;
	if(isAlive(x+1, y+1))   count++;
	return count;
}

function isAlive(x, y) {
	if(x > 0 && x < width && y < height && y > 0) {
		if(world[x][y].alive)
			return true;
		else
			return false
	}
	else
		return false;
}
function evolution() {
	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			var n = neighbourCount(i, j);
			var survive = false;
			if (isAlive(i, j)) {
				if(n < 2 || n > 3)
					survive = false;
				else if(n == 2 || n == 3)
					survive = true;
			}
			else {
				if(n == 3)
					survive = true;
			}
			newWorld[i][j].alive = survive;
		}
	}
}
function upgradeWorld() {
	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			world[i][j] = newWorld[i][j];
		}
	}
	initWorld(newWorld);
}
function step() {
	clear();
	evolution();
	upgradeWorld();
	drawWorld();
}
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

initWorld(world);
initWorld(newWorld);
createGosper(20,20);

setInterval(function(){
	step()
}, 1000 / 60);