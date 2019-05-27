var scl = 20;
var game_speed = 20;

function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
  this.total = 1;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 10){
        this.total++;
        return true;
      }else{
      return false;
    }
  }

this.death = function(){
  for (var i =0; i< this.tail.length; i++){
    var pos = this.tail[i];
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1){
    	this.x = 0;
    	this.y = 0;
      this.total = 1;
      this.tail = []
    }
  }
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
    this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed * game_speed;
		this.y = this.y + this.yspeed * game_speed;

    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);

	}

	this.show = function(){
		fill(255);
    for (var i=0; i<this.tail.length; i++){
  		rect(this.tail[i].x, this.tail[i].y, 20, 20);
    }
    //rect(this.x, this.y, 20, 20);
	}
}
