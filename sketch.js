var scl = 20;
var socket;
var id = null;

function setup(){
	createCanvas(600, 600);
	socket = io();

	socket.on('add_user', (msg) => {
		if(id==null)
			id = msg;
	});

	socket.on('game_update', (data) => {
		background(90);

			console.log(data);

			for(var i=0; i<data.length; i++)
			{
				fill(data[i].color_R, data[i].color_G, data[i].color_B);
					for(var j=0; j<data[i].tail.length; j++)
							rect(data[i].tail[j].x, data[i].tail[j].y, 20, 20);
			}

			fill(random(255), random(255), random(255));
			rect(data[0].food.x, data[0].food.y, scl, scl);
	});


	frameRate(60);

}

function mousePressed(){
	//s.total++;
}

function pickLotation(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function myDraw(){
		background(90);

		fill(data.R, data.G, data.B);
		rect(data.x, data.y, 20, 20);

		fill(random(255), random(255), random(255));
		rect(data.food.x, data.food.y, scl, scl);
}

function draw(){
}


function keyPressed() {

	//socket.emit('left_button', 'hi2');
	if (keyCode === UP_ARROW){
		socket.emit('up_button', id)
	}else if(keyCode === DOWN_ARROW){
		socket.emit('down_button', id)
	}else if(keyCode === RIGHT_ARROW){
		socket.emit('right_button', id)
	}else if(keyCode === LEFT_ARROW){
		socket.emit('left_button', id)
	}

}
