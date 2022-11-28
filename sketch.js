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
let circles;

class Tower{
  constructor(x,y,damage,ability,bulletSpeed,firespeed,range,color){
    this.x = x;
    this.y = y;
    this.bulletSpeed= bulletSpeed;
    this. damage = damage;
    this.firespeed = firespeed;
    this.coolDown = 0;
    this.ability= ability;
    this.range = range;
    //this.imagefile = imagefile
    this.color = color;
    this.targetX;
    this.targetY;
  }

  target(){//decides what enemy to shoot at and prompts the shoot
    let targetprogress;
    let target;
    this.targetX=0;
    this.targetY=0;
    for(let i = enemyAR.length; i >0; i--){
      if(dist(enemyAR[i].X(),enemyAR[i].Y(),this.x,this.y) <= this.range){
        if (targetprogress < enemyAR[i].Progress){
          targetprogress = enemyAR[i].Progress;
          target = i;
        }
      }
    }
    this.targetX = enemyAR[target].X();
    this.targetY = enemyAR[target].Y();
  }
  shoot(){//shoots bullet(creates a new bullet sprite)
    if(this.targetX !== 0 || this.targetY !== 0){
      if (this.coolDown !==0){
        this.coolDown--;
      }
      else{
        this.coolDown = this.firespeed;
        bullet =new Sprite(this.x,this.y,10,"static");
        bullet.moveTO(this.targetX,this.targetY,this.bulletSpeed);
        bulletAR.push(bullet);
      }
    }
    
  } 
  display(){
    //image(this.imagefile,this.x,this.y)
    fill(color);
    circle(this.x,this.y,10);
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
    this.progress = 0;
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
    this.progress += this.movementSpeed;
  }
  Progress(){
    return this.progress;
  }
  switchDirection(){//switches direction when hit a wall

  }
  death(){//deletes enemy 

  }
  display(){
    fill("red");
    circle(this.x,this.y,10);
  }
  X(){
    return this.x;
  }
  Y(){
    return this.y;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bullet = new Sprite(400,400,10);

  bullet.color = "red";
  
 
  
}

  
function mousePressed(){
  bullet.moveTO(0,0,10);
  bullet.moveTo(mouseX,mouseY,3);
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
    enemyAR[i].display();
    enemyAR[i].move();
  }
}

function trig(x1,y1,x2,y2){
  let x = abs(x2-x1);
  let y = abs(y2-y1);
  let distance = x*x + y*y; 
}