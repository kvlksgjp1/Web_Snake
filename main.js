const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var global_socket = null;
var s = [];
var food;
var scl = 20;
var width = 600;
var height = 600;
pickLotation();

io.on('connection', (socket) => {

  global_socket = socket;

  console.log('a user connected')
  {
    io.emit('add_user', s.length);
    s[s.length] = new Snake(s.length);
    console.log(s[s.length-1]);
    console.log(s.length);
  }


  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('game_update', (data) => {
        console.log(data);
        io.emit('game_update', data);
      });

  socket.on('left_button', (id) => {
    console.log('left_button : ' + id);
    s[id].dir(-1,0);
  });

  socket.on('right_button', (id) => {
    console.log('right_button : ' + id);
    s[id].dir(1,0);
  });

  socket.on('up_button', (id) => {
    console.log('up_button : ' + id);
    s[id].dir(0,-1);
  });

  socket.on('down_button', (id) => {
    console.log('down_button : ' + id);
    s[id].dir(0,1);
  });

  socket.on('disconnect', () => {
  console.log('user disconnected');
  });
});


http.listen(3000, () => {
  console.log('Connected at 3000');
});


function server_update(){

  //console.log(s.length);
  for(var i=0; i<s.length; i++)
  {
      //s[i].death();
      s[i].update();
      if(s[i].eat())
        pickLotation();

      //if(io!=null)
        //io.emit('game_update', s[i])
  }
  console.log(s);
  
    if(io!=null)
    io.emit('game_update', s)
  //console.log(food);
  //console.log(s[0]);
  setTimeout(server_update, 120);
}

server_update();


function pickLotation(){
  	var cols = Math.floor(width/scl);
  	var rows = Math.floor(height/scl);

  	food = {x:  Math.floor(Math.random() * cols)*scl, y: Math.floor(Math.random() * rows)*scl};
    console.log(food);
    for(var i=0; i<s.length; i++)
    {
      s[i].food = food;
    }
}

function Snake(name){
	this.name = name;
	this.x = 0;
	this.y = 0;
  this.food = food;
	this.xspeed = 1;
	this.yspeed = 0;
  this.total = 1;
  this.tail = [];
	this.color_R = Math.floor(Math.random() * 256);
	this.color_G = Math.floor(Math.random() * 256);
	this.color_B = Math.floor(Math.random() * 256);

  this.eat = function() {
    //var d = Math.sqrt(Math.pow((this.x - food.x)) + Math.pow((this.y - food.y)));
    if(this.x == food.x && this.y == food.y){
        this.total++;
        return true;
      }else{
      return false;
    }
  }

	this.death = function(){
	  for (var i =0; i< this.tail.length; i++){
	    var pos = this.tail[i];
	    if(this.x == food.x && pos.y == pos.y){
        console.log('die');
	    	this.revive();
	    }
	  }
	}

	this.revive = function(){
		this.x = 40;
		this.y = 40;
		this.total = 1;
		this.tail = []
		this.color_R = Math.floor(Math.random() * 256);
		this.color_G = Math.floor(Math.random() * 256);
		this.color_B = Math.floor(Math.random() * 256);
	}

  this.dir = function(x, y){
      this.xspeed = x;
      this.yspeed = y;
  }

	this.update = function(){
      if (this.total === this.tail.length){
        for (var i=0; i<this.tail.length-1; i++){
          this.tail[i] = this.tail[i+1];
        }
      }
    this.tail[this.total-1] = {x: this.x, y: this.y};

		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;

    if(this.x <=0)
      this.x = 0;
    if(this.x >= width-scl)
      this.x = width-scl;
    if(this.y <=0)
      this.y = 0;
    if(this.y >= height-scl)
      this.y = height-scl;

	}

	this.show = function(){
		//fill(this.color_R, this.color_G, this.color_B);
    for (var i=0; i<this.tail.length; i++){
  		//rect(this.tail[i].x, this.tail[i].y, 20, 20);
    }

	}
}
