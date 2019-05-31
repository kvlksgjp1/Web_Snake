var scl = 20;

function Snake(name){
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
  this.total = 1;
  this.tail = [];
	this.color_R = random(255);
	this.color_G = random(255);
	this.color_B = random(255);

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
	    	this.revive();
	    }
	  }
	}

	this.revive = function(){
		this.x = 40;
		this.y = 40;
		this.total = 1;
		this.tail = []
		this.color_R = random(255);
		this.color_G = random(255);
		this.color_B = random(255);
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

		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);

	}

	this.show = function(){
		fill(this.color_R, this.color_G, this.color_B);
    for (var i=0; i<this.tail.length; i++){
  		rect(this.tail[i].x, this.tail[i].y, 20, 20);
    }
    //rect(this.x, this.y, 20, 20);
	}
}
