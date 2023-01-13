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
let movePoints = [{x:-50, y:75},{x:1475,y:75},{x:1475,y:705},{x:75,y:705}, {x:75, y:400}, {x:1600, y:400}];
let index,levels,levelname,level;
let wallHealth = 2000;
let paths = [];
let previousState = "none";
let temptower;
let sometime = 0;
let money = 0;

function proload(){
  levels = loadStrings("levels/levels");
}

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
    this.targetprogress = 0;
    this.sprite = new Sprite(this.x,this.y,50);
    this.sprite.color = this.color;
    this.sprite.collider = "k";
    
  }

  target(){//decides what enemy to shoot at and prompts the shoot
    this.targetprogress = 0;
    this.targetX=0;
    this.targetY=0;
    for(let i = enemyAR.length-1; i >=0; i--){
      if(dist(enemyAR[i].sprite.x,enemyAR[i].sprite.y,this.x,this.y) <= this.range/2){
        if (this.targetprogress <= enemyAR[i].progress){
          target = i;
          
          this.targetprogress = enemyAR[i].progress;
          this.targetX = enemyAR[i].sprite.x;
          this.targetY = enemyAR[i].sprite.y;
        }
        else {
          this.targetX = 0;
          this.targetY = 0;
          target = "yes";
        }
      }
    }
    console.log(this.targetX + "x");
    console.log(this.targetY + "y");
  }

  shoot(){//shoots bullet(creates a new bullet sprite)
    if(this.targetX !== 0 || this.targetY !== 0){
      
      if (this.coolDown ===0){
        this.coolDown = this.firespeed;
        bullet = new Bullet(this.x,this.y,this.targetX,this.targetY,this.damage,this.bulletSpeed);
        bullet.sprite.moveTo(this.targetX,this.targetY,this.bulletSpeed);
        bulletAR.push(bullet);
        
      }
      else{
        this.coolDown--;
      }
      
    } 
  }
  display(){
    //image(this.imagefile,this.x,this.y)
    this.sprite.x = this.x;
    this.sprite.y = this.y;

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
    this.sprite = new Sprite(this.x,this.y,10,"d");

  }
  removeB(){
    this.sprite.remove();
  }
}

class Enemy{
  constructor(x,y,movementSpeed,health,damage){
    this.sprite = new Sprite();
    this.sprite.x = x;
    this.sprite.y = y;
    this.movementSpeed = movementSpeed;
    this.health = health;
    this.damage = damage;
    this.progress = 0;
    this.timer = 0;
    this.sprite.collider = "k";
    this.n = 0;
    this.sprite.moveTo(movePoints[0],this.movementSpeed/5);
  }

  switchDirection(){//switches direction when hit a wall
    if(this.sprite.x === movePoints[this.n].x && this.sprite.y === movePoints[this.n].y){
      this.n += 1;
      if (!movePoints[this.n]){
        enemyFinish(this.damage);
        this.health = 0;
      }
      else{
        this.sprite.moveTo(movePoints[this.n],this.movementSpeed/5);
      }

    }
    console.log(this.sprite.x + "ex")
    console.log(this.sprite.y + "ey")
    this.progress+= this.movementSpeed;
  }
  takesDamage(damageTaken){
    this.health-=damageTaken;
  }
}

function setup() {
  createCanvas(1550, 780);

  //temp
  // let enemy1 = new Enemy(50,50,1,100,3,"right");
  // enemyAR.push(enemy1);
  drawPaths();
  let enemy1 = new Enemy(movePoints[0].x,movePoints[0].y,10,1000,3);
  enemyAR.push(enemy1);

  //perm
  button = new Button(width/2,height/2,200,100,"red","blue", "game","title","start");//title screen button
  buttonAR.push(button);
  button = new Button(100,height-50,200,100,"red","blue","shop","game","shop");//open shop button
  buttonAR.push(button);
  button = new Button(width-100,height-50,200,100,"green","orange","game","shop","back");//back
  buttonAR.push(button);
  button = new Button(width/6*2,height/6*2,200,100,"blue","red","tower","shop","tower 1");//buy tower 1
  buttonAR.push(button);
}

function draw() {
  background(220);
  clear();
  buttonsupdate();
  if (gamestate === "game"){
    update();
    perSecond();
    showpaths();
  }
  
  else if(gamestate === "tower"){
    update();
    displayTower();
    perSecond();
    showpaths();
  }
  else{
    turnOffGame();
    hidepaths();
  }
  previousState = gamestate;
}

function update(){
  for (let i = towerAR.length-1; i>=0; i--){ // tower shooting
    towerAR[i].display();
    towerAR[i].target();
    towerAR[i].shoot();
  } 

  for (let j = enemyAR.length-1; j >= 0; j--){
    for (let i = bulletAR.length-1; i >=0; i--){ // bullets
      if(bulletAR[i].sprite.overlaps(enemyAR[j].sprite)){
        enemyAR[j].takesDamage(bulletAR[i].damage);
        bulletAR[i].sprite.remove();
        bulletAR.splice(i,1);
      }
    }
  }

  for (let i = enemyAR.length-1; i >= 0; i--){ // enemy death & movement
    enemyAR[i].sprite.visible = true;
    enemyAR[i].switchDirection();
    if(enemyAR[i].health <= 0){
      enemyAR[i].sprite.remove();
      enemyAR.splice(i,1);
      
    }  
    
  }

  for (let i = bulletAR.length-1; i >=0; i--){ // bullet removing
    if (bulletAR[i].sprite.x === bulletAR[i].targetx && bulletAR[i].sprite.y === bulletAR[i].targety){
      bulletAR[i].sprite.remove();
      bulletAR.splice(i,1);
    }
  }
}

function turnOffGame(){
  for (let i = enemyAR.length-1; i >= 0; i--){
    enemyAR[i].sprite.visible = false;
  }
  for (let i = bulletAR.length-1; i >=0; i--){ // bullet removing
    if (bulletAR[i].sprite.x === bulletAR[i].targetx && bulletAR[i].sprite.y === bulletAR[i].targety){
      bulletAR[i].sprite.remove();
      bulletAR.splice(i,1);
    }
  }
}

let pathCollide = false;
function displayTower(){// potentailly monkey code
  if (previousState === "shop"){
    temptower = new Tower(mouseX,mouseY,50,"none",9,25,500,"red");
  }
  temptower.x = mouseX;
  temptower.y = mouseY;
  temptower.display();
  pathCollide = false;
  // for (let i = 0; i < paths.length; i ++){
  //   console.log(temptower.sprite.overlapping(paths[3]) > 0 && !pathCollide);
  //   if (temptower.sprite.overlapping(paths[i]) > 0 && !pathCollide){
  //     //console.log("on path");
  //     fill(255,0,0,100);
  //     circle(temptower.x, temptower.y, temptower.range); 
  //     pathCollide = true;
  //   }
  // }
  // if (!pathCollide){
  //   fill(128,128,128,100);
  //   circle(temptower.x, temptower.y,temptower.range);
  //   //console.log("not on path");
  // }
}

function mousePressed(){
  if (gamestate === "tower"){
    // for (let i = 0; i < paths.length; i ++){
    // if (temptower.sprite.overlapping(paths[i])){
    // towerAR.push(temptower);
    // temptower = "none";
    // gamestate = "game";
    //}
    //}
    let tower = new Tower(mouseX,mouseY,50,"none",9,25,500,"red");
    towerAR.push(tower);
    gamestate = "game";
  }

  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].clicked();
  }
 
}


class Button{
  constructor(x,y,width,height,color1,color2,state,display,text){
    this.x = x-width/2;
    this.y = y-height/2;
    this.width = width;
    this.height = height;
    this.color1 = color1;
    this.color2 = color2;
    this.state = state;
    this.displayState = display;
    this.text = text;
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
      fill("black");
      textSize(40);
      text(this.text,this.x+this.width/2,this.y+this.height/2);
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

function doLevels(name){//uday sandhu code that i borrowed i am very thankful  // uses level.txt as an index for the levels and then sets grid to equal a saved grid with the base level
  index = levels.indexOf(name);
  levelname = levels[index];
  level = loadJSON("levels/" + levelname +".json");
  movePoints = level;
}

function enemyFinish(damage){
  wallHealth -= damage;
}

function drawPaths(){
  for (let i = 0; i < movePoints.length-1; i ++){
    let path = new Sprite;
    let c = color(128,128,128);
    noStroke();
    path.color = c;
    path.w = 65;
    path.h = 65;
    if (movePoints[i].x === movePoints[i+1].x){
      path.x = movePoints[i].x;
    }
    else{
      if (movePoints[i].x > movePoints[i+1].x){
        path.x = movePoints[i].x - dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)/2;
      }
      else{
        path.x = movePoints[i].x + dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)/2;
      }
      path.w =  dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)+65;
    }

    if (movePoints[i].y === movePoints[i+1].y){
      path.y = movePoints[i].y;
    }
    else{
      if(movePoints[i].y > movePoints[i+1].y){
        path.y = movePoints[i].y - dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)/2;
      }
      else{
        path.y = movePoints[i].y + dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)/2;
      }
      path.h =  dist(movePoints[i].x,movePoints[i].y,movePoints[i+1].x,movePoints[i+1].y)+65;
    }
    path.collider = "n";
    path.layer = 1;
    path.visible = false;
    paths.push(path);
  }
}
function showpaths(){
  for (let i = paths.length-1; i >=0; i--){
    paths[i].visible = true;
  }
}

function hidepaths(){
  for (let i = paths.length-1;i >=0; i--){
    paths[i].visible = false;
  }
}

function perSecond(){//happens 1 time per second
  if (millis() >=sometime){
    money += 5;
    sometime = millis() +1000;
    
  }
}