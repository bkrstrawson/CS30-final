// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Tower{
  constructor(x,y,damage,ability,bulletSpeed,firespeed,range){
    this.x = x
    this.y = y
    this.bulletSpeed= bulletSpeed
    this. damage = damage
    this.firespeed = firespeed
    this.ability= ability
  }
  target(){//decides what enemy to shoot at and prompts the shoot

  }
  shoot(){//shoots bullet(creates a new bullet object)

  }

  }

  class Bullet{
    constructor(x,y,speed,damage,range){
      this.x = x
      this.y = y
      this.spped = speed
      this.damage = damage

    }
  }

  class Enemy{
    constructor(x,y,movementSpeed, health,damge){
      this.x = x
      this.y = y
      this.movementSpeed = movementSpeed
      this.health = health
      this.damage
    }

    move(){//moves and turns each enemy

    }
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("black")
  circle(10,10,10)
}
