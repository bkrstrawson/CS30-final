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
let bulletDAR = [];
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
        bullet =new Sprite(this.x,this.y,10,"kinematics");
        bullet.moveTO(this.targetX,this.targetY,this.bulletSpeed);
        bulletAR.push(bullet);
        bulletDAR.push(this.damage);
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
    this.sprite = new Sprite();
    this.sprite.x = x;
    this.sprite. y = y;
    this.movementSpeed = movementSpeed;
    this.health = health;
    this.damage = damage;
    this.direction = direction;
    this.progress = 0;
    
    this.sprite.collider = "dynamic";
  }

  moves(){//moves and turns each enemy
    this.sprite.move(this.direction,1,this.movementSpeed);
  }
  Progress(){
    return this.progress;
  }
  switchDirection(){//switches direction when hit a wall

  }
  death(){//deletes enemy 

    if(this.health <=0){
      this.sprite.remove();
    }
  }
  X(){
    return this.x;
  }
  Y(){
    return this.y;
  }
  takesDamage(damageTaken){
    this.health-=damageTaken;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let enemy1 = new Enemy(50,50,1,100,3,"right");
  enemyAR.push(enemy1);
  bullet = new Sprite(100,50,10);
  bulletAR.push(bullet);
  bullet.collider = "dynamic";
  bulletDAR.push(50);
  bullet.color = "red";
}

  
function mousePressed(){
  
}

function draw() {
  background(220);
  update();
}
let timer = 0;
function update(){
  for (let i = towerAR.length-1; i>=0; i--){
    towerAR[i].display();
  } 
  for (let i = enemyAR.length-1; i >= 0; i--){
    enemyAR[i].death();
    if (timer === 0){
      enemyAR[i].moves();
      timer = 2;
    }
    else{
      timer --;
    }
  }
  for (let i = bulletAR.length-1; i >=0; i--){
    for (let j = enemyAR.length-1; j >= 0; j--){
      if(bulletAR[i].collides(enemyAR[j].sprite)){
        enemyAR[j].takesDamage(bulletDAR[i]);
        bulletAR[i].remove();
        bulletDAR.splice(i,1);
      }
    }
      
  }

}

function placeTower(){

}
function buyMenu(){
  
}