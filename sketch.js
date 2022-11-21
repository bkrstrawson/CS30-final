// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Tower{
  constructor(x,y,damage,ability,bulletSpeed,firespeed,range){
    this.x = x;
    this.y = y;
    this.bulletSpeed= bulletSpeed;
    this. damage = damage;
    this.firespeed = firespeed;
    this.ability= ability;
    this.range = range;
  }
  target(){//decides what enemy to shoot at and prompts the shoot

  }
  shoot(){//shoots bullet(creates a new bullet object)

  }
  display(){

  }

}

class Bullet{
  constructor(xi,yi,xf,yf,speed,damage,range){
    this.startx = xi;
    this.starty = yi;
    this.finalx = xf;
    this.finaly = yf;
    this.spped = speed;
    this.damage = damage;
    this.range = range;
  }
  move(){//moves bullet

  }
  collide(){//checks to see if bullet collides with an enemy 

  }
  outOfRange(){//checks to see if the bullet has reached the end of the range 
    
  }
  display(){
    
  }
}

class Enemy{
  constructor(x,y,movementSpeed, health,damage){
    this.x = x;
    this.y = y;
    this.movementSpeed = movementSpeed;
    this.health = health;
    this.damage;
  }

  move(){//moves and turns each enemy

  }
  death(){//deletes enemy 

  }
  display(){
    
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
