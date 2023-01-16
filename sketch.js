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
let movePoints = [{x:-50, y:700},{x:400,y:700},{x:400, y:75},{x:1000,y:75},{x:1000,y:600},{x:1475, y:600},{x:1475,y:-50}]
let level1 = [{x:-50, y:75},{x:1475,y:75},{x:1475,y:705},{x:75,y:705}, {x:75, y:400}, {x:1600, y:400}];
let level2 = [{x:-50, y:700},{x:400,y:700},{x:400, y:75},{x:1000,y:75},{x:1000,y:600},{x:1475, y:600},{x:1475,y:-50}]
let level3 = [{x:200,y:820}, {x:200,y:75},{x:1475, y:75}, {x:1475,y:820}]
let level4 = [{x:175, y:-20}, {x:175, y:390}, {x:1575, y:390}]
let level5 = [{x:-20, y:390}, {x:1575, y:390}]
let index,levels,levelname,level;
let wallHealth = 2000;
let paths = [];
let previousState = "none";
let temptower;
let sometime = 0;
let money = 500;

function proload(){
  levels = loadStrings("levels/levels");
}

class Tower{
  constructor(x,y,damage,price,bulletSpeed,firespeed,range,color){
    this.x = x;
    this.y = y;
    this.bulletSpeed= bulletSpeed;
    this. damage = damage;
    this.firespeed = firespeed;
    this.coolDown = 0;
    this.price = price
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
    //console.log(this.targetX + "x");
    //console.log(this.targetY + "y");
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
        this.coolDown--
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
  constructor(x,y,movementSpeed,health,damage,money){
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
    this.money = money
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
    //console.log(this.sprite.x + "ex")
    //console.log(this.sprite.y + "ey")
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
  let enemy1 = new Enemy(movePoints[0].x,movePoints[0].y,10,1000,3,1000);
  enemyAR.push(enemy1);

  //perm
  button = new Button(width/2,height/2,200,100,"red","blue", "game","title","start");//title screen button
  buttonAR.push(button);
  button = new Button(100,height-50,200,100,"red","blue","shop","game","shop");//open shop button
  buttonAR.push(button);
  button = new Button(width-100,height-50,200,100,"green","orange","game","shop","back");//back
  buttonAR.push(button);
  button = new Button(387,100,200,100,"blue","red","tower1","shop","tower 1");//buy tower 1
  buttonAR.push(button);
  button = new Button(775,100,200,100,"blue","red","tower2","shop","tower 2");//buy tower 2
  buttonAR.push(button);
  button = new Button(387,250,200,100,"blue","red","tower3","shop","tower 3");//buy tower 3
  buttonAR.push(button);
  button = new Button(775,250,200,100,"blue","red","tower4","shop","towe r4");//buy tower 4
  buttonAR.push(button);
  button = new Button(387,400,200,100,"blue","red","tower5","shop","tower 5");//buy tower 5
  buttonAR.push(button);
  button = new Button(775, 400,200,100,"blue","red","tower6","shop","tower6");//buy tower 6
  buttonAR.push(button);
}

function draw() {
  background(220);
  clear();
  buttonsupdate();
  if (gamestate === "game"){
    update();
    showpaths();
  }
  else if(gamestate === "tower"){
    update();
    displayTower();
    showpaths();
  }
  else if( gamestate[2] ==="w"){
    checkTower()
  }

  else{
    turnOffGame();
    hidepaths();
  }
  if (gamestate !== "title"){
    displayMoney()
    perSecond();
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
      money += enemyAR[i].money
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
  temptower.x = mouseX;
  temptower.y = mouseY;
  temptower.display();
  //pathCollide = false;
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
    if(money >= temptower.price){
    // for (let i = 0; i < paths.length; i ++){
    // if (temptower.sprite.overlapping(paths[i])){
     towerAR.push(temptower);
     money -= temptower.price
     temptower = "none";
     gamestate = "game";
     
    }
    //}
    //}
    // let tower = new Tower(mouseX,mouseY,50,"none",9,25,500,"red");
    // towerAR.push(tower);
    // gamestate = "game";
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
function displayMoney(){
  fill(255)
    textSize(32);
    rect(0,0,textWidth(money)+75,65);
    stroke(0);
    fill(0);
    textSize(8);
    textSize(32);
    text(money, 10, 35);
    fill("white"); 
    //image(imgBanana,textWidth(banana1)+20,0,50,50);
  }

  function checkTower(){
    if(gamestate === "tower1"){// cheap tower, slow firing, mid damage, kid range,
      temptower = new Tower(mouseX,mouseY, 15, 50, 8,20,400,"blue")
    }
    else if (gamestate === "tower2"){//more expensive, faster firing, mid damge, higher range
      temptower = new Tower(mouseX,mouseY,20, 100, 10, 25,500,"green")
    }
    else if (gamestate === "tower3"){// high damge slow firing 
      temptower = new Tower(mouseX,mouseY,50,250,8,10,500,"red")
    }
    else if(gamestate === "tower4"){// low damge high fire speed
      temptower = new Tower(mouseX,mouseY, 5,250,12,5,500,"orange")
    }
    else if (gamestate === "tower5"){//super tower
      temptower = new Tower(mouseX,mouseY,40,500,12,12,600,"purple")
    }
    else if(gamestate === "tower6"){// one shot man
      temptower = new Tower(mouseX,mouseY, 10000,500, 12,1000,400,"black")
    }
    gamestate = "tower"
  }