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
let button;
let gamestate = "title";
let buttonAR= [];
let target = 0;


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
    let targetprogress = 0;
    this.targetX=0;
    this.targetY=0;
    for(let i = enemyAR.length-1; i >=0; i--){
      //console.log(dist(enemyAR[i].sprite.x,enemyAR[i].sprite.y,this.x,this.y));
      if (targetprogress < enemyAR[i].progress){
        if(dist(enemyAR[i].sprite.x,enemyAR[i].sprite.y,this.x,this.y) <= this.range){
        
          targetprogress = enemyAR[i].Progress;
          this.targetX = enemyAR[i].sprite.x;
          this.targetY = enemyAR[i].sprite.y;
        }
        else {
          this.targetX = 0;
          this.targetY = 0;
        }
      }
    }
  }
  shoot(){//shoots bullet(creates a new bullet sprite)
    if(this.targetX !== 0 || this.targetY !== 0){
      if (this.coolDown !==0){
        this.coolDown--;
      }
      else{
        this.coolDown = this.firespeed;
        bullet = new Bullet(this.x,this.y,this.targetX,this.targetY,this.damage,this.bulletSpeed);
        bullet.sprite.moveTo(this.targetX,this.targetY,this.bulletSpeed);
        bulletAR.push(bullet);
      }
    }

  } 
  display(){
    //image(this.imagefile,this.x,this.y)
    fill(this.color);
    circle(this.x,this.y,50);
  }
}

class Bullet{
  constructor(x,y,targetx,targety,damage,bulletSpeed){
    this.x = x;
    this.y = y;
    this.targetx = targetx;
    this.targety = targety;
    this.damage = damage;
    this.bulletSpeed = bulletSpeed;
    this.sprite = new Sprite(this.x,this.y,10,"k");
  }

  removeB(){
    if (this.sprite.x === this.targetx && this.sprite.y === this.targety){
      this.sprite.remove();
      return true;
    }
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
    this.timer = 0;
    this.sprite.collider = "k";
  }

  moves(){//moves and turns each enemy
    if(this.timer ===0){
      this.sprite.move(this.direction,1,this.movementSpeed);
      this.timer = 2;
    }
  
    else{
      this.timer --;
    }
    this.progress += this.movementSpeed;
  }
  switchDirection(){//switches direction when hit a wall

  }
  death(){//deletes enemy 

    if(this.health <=0){
      this.sprite.remove();
      return true;
    }
  }
  takesDamage(damageTaken){
    this.health-=damageTaken;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //temp
  // let enemy1 = new Enemy(50,50,1,100,3,"right");
  // enemyAR.push(enemy1);

  //perm
  button = new Button(width/2,height/2,200,100,"red","blue", "game","title");//title screen button
  buttonAR.push(button);
  button = new Button(100,height-50,200,100,"red","blue","shop","game");//open shop button
  buttonAR.push(button);
  button = new Button(width-100,height-50,200,100,"green","orange","game","shop");
  buttonAR.push(button);
  button = new Button(width/6*2,height/6*2,200,100,"blue","red","tower","shop");
  buttonAR.push(button);
}

function draw() {
  background(220);
  buttonsupdate();
  if (gamestate === "game"|| gamestate === "tower"){
    update();
  }
  
  else{
    turnOffGame();
  }
}

let timer = 0;

function update(){
  for (let i = towerAR.length-1; i>=0; i--){
    towerAR[i].display();
    towerAR[i].target();
    towerAR[i].shoot();
  } 
  for (let i = enemyAR.length-1; i >= 0; i--){
    enemyAR[i].sprite.visible = true;
    if(enemyAR[i].death()){
      enemyAR[i].death();
      enemyAR.splice(i,1);
    }  
    else{ 
      enemyAR[i].moves();
    }
  }
  for (let i = bulletAR.length-1; i >=0; i--){
    for (let j = enemyAR.length-1; j >= 0; j--){
      if(bulletAR[i].sprite.overlaps(enemyAR[j].sprite)){
        enemyAR[j].takesDamage(bulletAR[i].damage);
        bulletAR[i].sprite.remove();
        bulletAR.splice(i,1);
      }
    }
  }
    for (let i = bulletAR.length-1; i >=0; i--){
     if(bulletAR[i].removeB()){
       bulletAR[i].removeB();
       bulletAR.splice(i,1);
     }
  }
}

function turnOffGame(){
  for (let i = enemyAR.length-1; i >= 0; i--){
    enemyAR[i].sprite.visible = false;
  }
}

function mousePressed(){
  if (gamestate === "tower"){
    let tower = new Tower(mouseX,mouseY,50,"none",3,25,200,"red");
    towerAR.push(tower);
    gamestate = "game";
  }

  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].clicked();
  }
  let enemy1 = new Enemy(50,50,3,100,3,"right");
  enemyAR.push(enemy1);
}


class Button{
  constructor(x,y,width,height,color1,color2,state,display){
    this.x = x-width/2;
    this.y = y-height/2;
    this.width = width;
    this.height = height;
    this.color1 = color1;
    this.color2 = color2;
    this.state = state;
    this.displayState = display;
  }

  display(){
    if (gamestate === this.displayState){
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height){
        fill(this.color1);
      }
      else {
        fill(this.color2);
      }
      rect(this.x,this.y,this.width,this.height);
    }
  }

  clicked(){
    if (gamestate === this.displayState){
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height && mouseIsPressed){
        gamestate = this.state;
      }
    }
  }
}

function buttonsupdate(){
  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].display();
  }
}