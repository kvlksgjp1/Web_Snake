var s;
var food;
var scl = 20

function setup(){
	createCanvas(600, 600);
	s = new Snake();
	frameRate(10);
	pickLotation();
}

function mousePressed(){
	s.total ++;
}

function pickLotation(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function draw(){
	background(30);
	s.death();
	s.update();
	s.show();
	if(s.eat(food)){
		pickLotation();
	}
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

function keyPressed() {
	if (keyCode === UP_ARROW){
		s.dir(0, -1);
	}else if(keyCode === DOWN_ARROW){
		s.dir(0, 1);
	}else if(keyCode === RIGHT_ARROW){
		s.dir(1, 0);
	}else if(keyCode === LEFT_ARROW){
		s.dir(-1, 0);
	}
}
