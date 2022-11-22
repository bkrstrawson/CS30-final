// tower defense(dragons and knihgts)
// b3ns2005
// date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//p5.play
let towerAR = [];
let bulletAR = [];
let enemyAR= [];
let bullet;

class Tower{
  constructor(x,y,damage,ability,bulletSpeed,firespeed,range,color){
    this.x = x;
    this.y = y;
    this.bulletSpeed= bulletSpeed;
    this. damage = damage;
    this.firespeed = firespeed;
    this.ability= ability;
    this.range = range;
    //this.imagefile = imagefile
    this.color = color;
  }
  target(){//decides what enemy to shoot at and prompts the shoot

  }
  shoot(){//shoots bullet(creates a new bullet object)

  }
  display(){
    //image(this.imagefile,this.x,this.y)
    fill(color);
    circle(this.x,this.y,10);
  }

}

class Bullet{
  constructor(x,y,xf,yf,speed,damage,range){
    this.x = x;
    this.y = y;
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
    fill("black");
    circle(this.x,this.y,5);
  }
}

class Enemy{
  constructor(x,y,movementSpeed,health,damage,direction){
    this.x = x;
    this.y = y;
    this.movementSpeed = movementSpeed;
    this.health = health;
    this.damage = damage;
    this.direction = direction;
  }

  move(){//moves and turns each enemy
    if (this.direction === "up"){
      this.y -= this.movementSpeed;
    }
    else if(this.direction === "down"){
      this.y += this.movementSpeed;
    }
    else if (this.direction === "right"){
      this.x += this.movementSpeed;
    }
    else if(this.direction === "left"){
      this.x -= this.movementSpeed;
    }
  }
  switchDirection(){//switches direction when hit a wall

  }
  death(){//deletes enemy 

  }
  display(){
    fill("red");
    circle(this.x,this.y,10);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   
}

function draw() {
  background(220);
  update();
}

function update(){
  for (let i = towerAR.length; i>0; i--){
    towerAR[i].display();
  } 
  for (let i = bulletAR.length; i >0; i--){
    bulletAR[i].display();
    bulletAR[i].move();
  }
  for (let i = enemyAR.length; i >0; i--){
    enemyAR[1].display();
    enemyAR[1].move();
  }
}
