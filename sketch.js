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
let movePoints = 0;
let level1 = [{x:-50, y:120},{x:1475,y:120},{x:1475,y:705},{x:275,y:705}, {x:275, y:400}, {x:1600, y:400}];
let level2 = [{x:-50, y:600},{x:400,y:600},{x:400, y:75},{x:1000,y:75},{x:1000,y:600},{x:1475, y:600},{x:1475,y:-50}];
let level3 = [{x:275,y:820}, {x:275,y:75},{x:1475, y:75}, {x:1475,y:820}];
let level4 = [{x:175, y:-20}, {x:175, y:390}, {x:1575, y:390}];
let level5 = [{x:-20, y:390}, {x:1575, y:390}];
let index,levels,levelname,level;
let Health = 2000;
let paths = [];
let previousState = "none";
let temptower;
let sometime = 0;
let money = 500;

let enemy; 
let e1; 
let e2;
let e3;
let e4;
let e5;
let e6;
let boss;
let waveDone = true;
let sometime2 = 0;
let wave = 1;

class Tower{
  constructor(x,y,damage,price,bulletSpeed,firespeed,range,color){
    this.x = x;
    this.y = y;
    this.bulletSpeed= bulletSpeed;
    this. damage = damage;
    this.firespeed = firespeed;
    this.coolDown = 0;
    this.price = price;
    this.range = range;
    //this.imagefile = imagefile
    this.color = color;
    this.targetX;
    this.targetY;
    this.targetprogress = 0;
    this.sprite = new Sprite(this.x,this.y,50);
    this.sprite.color = this.color;
    this.sprite.collider = "n";
    
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
      }
      else {
        this.targetX = 0;
        this.targetY = 0;
        target = "yes";
        
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
        this.coolDown--;
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
    this.money = money;
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

  //perm
  button = new Button(width/2,height/2,200,100,"red","blue", "level","title","start");//title screen button
  buttonAR.push(button);
  button = new Button(387,100,200,100,"red","blue", "level1","level","level 1");//title screen button
  buttonAR.push(button);
  button = new Button(775,100,200,100,"red","blue", "level2","level","level 2");//title screen button
  buttonAR.push(button);
  button = new Button(387,250,200,100,"red","blue", "level3","level","level 3");//title screen button
  buttonAR.push(button);
  button = new Button(775,250,200,100,"red","blue", "level4","level","level 4");//title screen button
  buttonAR.push(button);
  button = new Button(width/2,400,200,100,"red","blue", "level5","level","level 5");//title screen button
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
  button = new Button(775,250,200,100,"blue","red","tower4","shop","tower 4");//buy tower 4
  buttonAR.push(button);
  button = new Button(387,400,200,100,"blue","red","tower5","shop","tower 5");//buy tower 5
  buttonAR.push(button);
  button = new Button(775, 400,200,100,"blue","red","tower6","shop","tower 6");//buy tower 6
  buttonAR.push(button);
}

function draw() {
  background(220);
  clear();
  buttonsupdate();
  if (gamestate === "game"){
    update();
    showpaths();
    makeWave();
    spawnWaves();
  }
  else if(gamestate === "tower"){
    update();
    displayTower();
    showpaths();
  }
  else if( gamestate[2] ==="w"){
    checkTower();
  }
  else{
    turnOffGame();
    hidepaths();
  }
  if (gamestate !== "title" && gamestate !== "end"){
    displayMoney();
    displayHealth();
    perSecond();
  }
  else if (gamestate === "end"){
    turnOffGame();
    hidepaths();
    endScreen();
  }
  if (gamestate === "level"){
    levelSelect();
  }
  else if(gamestate[2] === "v"){
    doLevels();
  }
  
  previousState = gamestate;
}

function update(){
  for (let i = towerAR.length-1; i>=0; i--){ // tower shooting
    towerAR[i].sprite.visible = true;
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
      money += enemyAR[i].money;
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
  for (let i = towerAR.length-1; i >= 0; i --){
    towerAR[i].sprite.visible = false;
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
      money -= temptower.price;
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
      text(this.text,this.x+this.width/2-textWidth(this.text)/2,this.y+this.height/2);
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

function enemyFinish(damage){
  Health -= damage;
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
    sometime = millis() +1000;
    if(gamestate ==="game" || gamestate ==="tower"){
      money += 5;
    }
  }
}
function displayMoney(){
  fill(255);
  textSize(32);
  rect(0,0,textWidth(money)+75,75);
  stroke(0);
  fill(0);
  textSize(8);
  textSize(32);
  text(money, 10, 35);
  text("Money" ,10, 65);
  fill("white"); 
}

function displayHealth(){
  fill(255);
  textSize(32);
  rect(1550-textWidth(Health)-65,0,textWidth(Health)+75,75);
  stroke(0);
  fill(0);
  textSize(8);
  textSize(32);
  text(Health, 1450, 35);
  text("Health" ,1450, 65);
  fill("white"); 
}

function checkTower(){
  if(gamestate === "tower1"){// cheap tower, slow firing, mid damage, kid range,
    if (money >= 50){
      temptower = new Tower(mouseX,mouseY, 15, 50, 8,20,400,"blue");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
  else if (gamestate === "tower2"){//more expensive, faster firing, mid damge, higher range
    if(money >=100){
      temptower = new Tower(mouseX,mouseY,20, 100, 10, 25,500,"green");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
  else if (gamestate === "tower3"){// high damge slow firing 
    if (money >= 250){
      temptower = new Tower(mouseX,mouseY,50,250,8,10,500,"red");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
  else if(gamestate === "tower4"){// low damge high fire speed
    if(money >= 250){
      temptower = new Tower(mouseX,mouseY, 5,250,12,5,500,"orange");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
  else if (gamestate === "tower5"){//super tower
    if (money >= 500){
      temptower = new Tower(mouseX,mouseY,40,500,12,12,600,"purple");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
  else if(gamestate === "tower6"){// one shot man
    if (money >= 500){
      temptower = new Tower(mouseX,mouseY, 10000,500, 12,1000,400,"black");
      gamestate = "tower";
    }
    else{
      gamestate = "shop";
    }
  }
}

function makeWave(){
  if (gamestate === "game" && waveDone){
    if (wave ===1){
      createWaves(10,0,0,0,0,0,0);
    }
    else if (wave === 2){
      createWaves(20,0,0,0,0,0,0);
    }
    else if(wave ===3){
      createWaves(10,5,0,0,0,0,0);
    }
    else if (wave ===4){
      createWaves(15,10,0,0,0,0,0);
    }
    else if (wave === 5){
      createWaves(5,5,10,0,0,0,0);
    }
    else if(wave ===6){
      createWaves(10,5,10,5,0,0,0);
    }
    else if (wave ===7){
      createWaves(25,0,0,0,1,0,0);
    }
    else if (wave === 8){
      createWaves(10,10,5,5,5,0,0);
    }
    else if(wave ===9){
      createWaves(10,5,10,0,0,10,0);
    }
    else if (wave ===10){
      createWaves(50,0,0,0,0,0,0);
    }
    else if (wave === 11){
      createWaves(15,10,10,10,10,10,0);
    }
    else if(wave ===12){
      createWaves(15,5,10,20,10,5,0);
    }
    else if (wave ===13){// boss
      createWaves(0,0,0,0,0,0,1);
    }
  }
}
function createWaves(en1,en2,en3,en4,en5,en6,en7){
  e1 = en1;
  e2 = en2;
  e3 = en3;
  e4 = en4;
  e5 = en5;
  e6 = en6; 
  boss = en7;
  waveDone = false;
}


function spawnWaves(){
  if (millis() - sometime2 > 800){
    console.log("yes");
    sometime2 = millis();
    if (e1 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,7,50,5,50);//basic enemy
      enemyAR.push(enemy);
      e1--;
    }
    else  if (e2 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,10,100,100,100);//faster higher health enemy
      enemyAR.push(enemy);
      e2 --;
    }
    else  if (e3 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,15,150,150,150);//faster w the same health
      enemyAR.push(enemy);
      e3--;
    }
    else  if (e4 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,10,300,150,150);//slower enemy with more health
      enemyAR.push(enemy);
      e4--;
    }
    else  if (e5 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,5,800,300,300);// even slower with more health
      enemyAR.push(enemy);
      e5--;
    }
    else  if (e6 > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,15,300,300,300);// faster with some health
      enemyAR.push(enemy);
      e6--;
    } 
    else  if (boss > 0){
      enemy = new Enemy(movePoints[0].x,movePoints[0].y,1,1000,600,600);// boss, super slow lots of health
      enemyAR.push(enemy);
      boss --;
    }
    else if (enemyAR.length === 0){
      waveDone = true;
      wave ++;
      if (wave === 14){
        gamestate = "end";
      }
    }
  }
}

function endScreen(){
  text("GOOD JOB YOU WIN!!!", width/2, height/2);
}

function doLevels(){
  if (gamestate ==="level1"){
    movePoints = level1;
    gamestate = "game";
  }
  else if (gamestate ==="level2"){
    movePoints = level2;
    gamestate = "game";
  }
  else if (gamestate ==="level3"){
    movePoints = level3;
    gamestate = "game";
  }
  else if (gamestate ==="level4"){
    movePoints = level4;
    gamestate = "game";
  }
  else if (gamestate ==="level5"){
    movePoints = level5;
    gamestate = "game";
  }
  drawPaths();
}

function levelSelect(){

}