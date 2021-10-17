

const TILE_MAP = 
  [
    "####################",
    "#                  #",
    "#  E           E   #",
    "#                  #",
    "#                  #",
    "#      E           #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#        E         #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#            P     #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#  E               #",
    "#                  #",
    "####################"
  ];
const TILE_SIZE = 20;
const CHAR_RADIUS = 10;
const SPEED = 1;

var player;
var walls = [];
var enemies = [];
var state = 0;
var menu, objs;



class Laser {
    constructor(posX, posY, angle, obj, owner) {
        // Positional properties
        this.x = posX;
        this.y = posY;
        this.offX = 0;
        this.offY = 0;
        this.origX = 0;
        this.origY = 0;

        // Angular properties
        this.angle = angle;
        this.step = new p5.Vector(0, -1);

        // Image and owner of laser
        this.obj = obj;
        this.owner = owner;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(this.obj, 0, 0, 10, 5);
        pop();
        this.update();
        this.checkEnemyCollision();
        this.checkPlayerCollision();
    }

    update() {
        this.step.set(1.5*cos(this.angle), 1.5*sin(this.angle));
        this.x += this.step.x;
        this.y += this.step.y;
    }

    checkEnemyCollision() {
        this.leftX = this.x;
        this.topY = this.y;
        this.rightX = this.x + 10;
        this.bottomY = this.y + 5;
        for (let i = 0; i < enemies.length; ++i) {
            this.leftCollision = (this.leftX < enemies[i].x + CHAR_RADIUS) && (this.leftX > enemies[i].x - CHAR_RADIUS);
            this.rightCollision = (this.rightX < enemies[i].x + CHAR_RADIUS) && (this.rightX > enemies[i].x - CHAR_RADIUS);
            this.topCollision = (this.topY > enemies[i].y - CHAR_RADIUS) && (this.topY < enemies[i].y + CHAR_RADIUS);
            this.bottomCollision = (this.bottomY > enemies[i].y - CHAR_RADIUS) && (this.bottomY < enemies[i].y + CHAR_RADIUS);
            this.middleCollision = ((this.leftCollision || this.rightCollision) && this.topY == enemies[i].y - CHAR_RADIUS) || ((this.topCollision || this.bottomCollision) && this.leftX == enemies[i].x - CHAR_RADIUS);
            if (((this.leftCollision || this.rightCollision) && (this.topCollision || this.bottomCollision) || this.middleCollision) && !(enemies[i] === this.owner)) {
                this.x = 10000;
                this.y = 10000;
                enemies[i].currentState = 3;
            }
        }
    }
    checkPlayerCollision() {
        this.leftX = this.x;
        this.topY = this.y;
        this.rightX = this.x + 10;
        this.bottomY = this.y + 5;
        this.leftCollision = (this.leftX < player.x + CHAR_RADIUS) && (this.leftX > player.x - CHAR_RADIUS);
        this.rightCollision = (this.rightX < player.x + CHAR_RADIUS) && (this.rightX > player.x - CHAR_RADIUS);
        this.topCollision = (this.topY > player.y - CHAR_RADIUS) && (this.topY < player.y + CHAR_RADIUS);
        this.bottomCollision = (this.bottomY > player.y - CHAR_RADIUS) && (this.bottomY < player.y + CHAR_RADIUS);
        this.middleCollision = ((this.leftCollision || this.rightCollision) && this.topY == player.y - CHAR_RADIUS) || ((this.topCollision || this.bottomCollision) && this.leftX == player.x - CHAR_RADIUS);
        if (((this.leftCollision || this.rightCollision) && (this.topCollision || this.bottomCollision) || this.middleCollision) && !(player === this.owner)) {
            this.x = 10000;
            this.y = 10000;
            player.state = 2;
            state = 2;
        }
 
}

}

function keyReleased() {
  if (keyCode == 32) {
    player.hasReleased = true;
  }
}

class Player {
  constructor(posX, posY) {
    // Position
    this.x = posX;
    this.y = posY;
    this.angle = 0;

    // Game variables
    this.score = 0;
    this.state = 0;
    this.sprite = new Objs();
    this.step = new p5.Vector(0, -1);

    // Laser variables
    this.lasers = [];
    for (let i = 0; i < 4; ++i) {
      this.lasers.push(new Laser(10000, 10000, 0, this.sprite.laser, this));
    }
    this.laserIndex = 0;
    this.slot1 = 0;
    this.slot2 = 0;
    this.hasReleased = true;
  }

  draw() {
    this.prevX = this.x;
    this.prevY = this.y;
    
    // Moving and shooting based on key presses
    if (keyIsDown(UP_ARROW)) {
      this.step.set(SPEED*cos(this.angle - HALF_PI), SPEED*sin(this.angle - HALF_PI));
      this.x += this.step.x;
      this.detectWallXCollision()
      this.detectEnemyXCollision()
      this.y += this.step.y;
      this.detectWallYCollision()
      this.detectEnemyYCollision()
    } if (keyIsDown(DOWN_ARROW)) {
      this.step.set(-SPEED*cos(this.angle - HALF_PI), -SPEED*sin(this.angle - HALF_PI));
      this.x += this.step.x;
      this.detectWallXCollision()
      this.detectEnemyXCollision()
      this.y += this.step.y;
      this.detectWallYCollision()
      this.detectEnemyYCollision()
    } if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 0.1;
    } if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.1;
    } if (this.hasReleased && keyIsDown(32) && (this.slot1 == 0 || this.slot2 == 0)) {
      let currLaser = this.lasers[this.laserIndex]

      // Adjust positional and angular properties of laser
      let angle = this.angle - PI/2;
      if (angle < 0) { angle += TWO_PI; }
      currLaser.x = this.x + 10*cos(angle);
      currLaser.y = this.y + 10*sin(angle);
      currLaser.angle = angle;
      currLaser.origX = currLaser.x;
      currLaser.origY = currLaser.y;
      
      
      if (this.laserIndex == 3) this.laserIndex = 0;
      else this.laserIndex++;

      if (this.slot1 == 0) { this.slot1++; }
      else { this.slot2++; }
      this.hasReleased = false;
    }

    // Keep angle within [0, 2*pi]
    if (this.angle < 0) { this.angle += TWO_PI; }
    else if (this.angle > TWO_PI) { this.angle -= TWO_PI; }
    
    // Cycle shots
    if (this.slot1 == 60) { this.slot1 = 0; }
    else if (this.slot1 != 0) { this.slot1++; }
    
    if (this.slot2 == 60) { this.slot2 = 0; }
    else if (this.slot2 != 0) { this.slot2++; }
    
    // Drawing the lasers
    for (let l = 0; l < this.lasers.length; ++l) { this.lasers[l].draw();}

    // Checks the state of the player (alive or dead)
    if (this.state == 1 || this.state == 3) {
      push();
      translate(this.x, this.y);
      rotate(this.angle - HALF_PI);
      image(this.sprite.tank, -CHAR_RADIUS, -CHAR_RADIUS, TILE_SIZE, TILE_SIZE);
      pop();
    } else {
      push();
      translate(this.x, this.y);
      rotate(this.angle - HALF_PI);
      image(this.sprite.destroyedTank, -CHAR_RADIUS, -CHAR_RADIUS, TILE_SIZE, TILE_SIZE);
      pop();
    }
  }
  detectWallXCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < walls.length; ++i) {
      if (((this.leftX <= walls[i].x + TILE_SIZE && this.leftX >= walls[i].x) ||
           (this.rightX >= walls[i].x && this.rightX <= walls[i].x + TILE_SIZE)) &&
          ((this.topY >= walls[i].y && this.topY <= walls[i].y + TILE_SIZE) ||
           (this.bottomY <= walls[i].y + TILE_SIZE && this.bottomY >= walls[i].y))) {
            this.x = this.prevX;
      }
    }
  }
  detectWallYCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < walls.length; ++i) {
      if (((this.topY <= walls[i].y + TILE_SIZE && this.topY > walls[i].y) ||
           (this.bottomY >= walls[i].y && this.bottomY < walls[i].y + TILE_SIZE)) &&
          ((this.leftX >= walls[i].x && this.leftX <= walls[i].x + TILE_SIZE) ||
           (this.rightX <= walls[i].x + TILE_SIZE && this.rightX >= walls[i].x))) {
            this.y = this.prevY;
      }
    }
  }
  detectEnemyXCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < enemies.length; ++i) {
      let enemy = enemies[i];
      if (((this.leftX <= enemy.x + CHAR_RADIUS && this.leftX >= enemy.x - CHAR_RADIUS) ||
           (this.rightX >= enemy.x - CHAR_RADIUS && this.rightX <= enemy.x + CHAR_RADIUS)) &&
          ((this.topY >= enemy.y - CHAR_RADIUS && this.topY <= enemy.y + CHAR_RADIUS) ||
           (this.bottomY <= enemy.y + CHAR_RADIUS && this.bottomY >= enemy.y - CHAR_RADIUS))) {
            this.x = this.prevX;
      }
    }
  }
  detectEnemyYCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < enemies.length; ++i) {
      let enemy = enemies[i];
      if (((this.topY <= enemy.y + CHAR_RADIUS && this.topY > enemy.y - CHAR_RADIUS) ||
           (this.bottomY >= enemy.y - CHAR_RADIUS && this.bottomY < enemy.y + CHAR_RADIUS)) &&
          ((this.leftX >= enemy.x - CHAR_RADIUS && this.leftX <= enemy.x + CHAR_RADIUS) ||
           (this.rightX <= enemy.x + CHAR_RADIUS && this.rightX >= enemy.x - CHAR_RADIUS))) {
            this.y = this.prevY;
      }
    }
  }
}

class Objs {
  constructor() {
    this.makeFriendlyTank();
    this.makeEnemyTank();
    this.makeDestroyedTank();
    this.makeTombstone();
    this.makeLaser();
  }
  
  makeFriendlyTank() {
    clear();
    background(255, 255, 255, 0);

    stroke('black');
    strokeWeight(4);
    fill(53, 159, 255);
    rect(0, 100, 290, 200);

    fill('white');
    rect(0, 100, 30, 40);
    rect(30, 100, 50, 40);
    rect(80, 100, 70, 40);
    rect(0, 100, 30, 40);
    rect(150, 100, 70, 40);
    rect(220, 100, 50, 40);
    rect(270, 100, 30, 40);
    
    rect(0, 260, 30, 40);
    rect(30, 260, 50, 40);
    rect(80, 260, 70, 40);
    rect(0, 260, 30, 40);
    rect(150, 260, 70, 40);
    rect(220, 260, 50, 40);
    rect(270, 260, 30, 40);

    fill(53, 159, 255);
    rect(200, 175, 150, 50);

    this.tank = get(0, 100, 400, 200);
  }
  
  makeEnemyTank() {
    clear();
    background(255, 255, 255, 0);

    stroke('black');
    strokeWeight(4);
    fill('red');
    rect(0, 100, 290, 200);

    fill('white');
    rect(0, 100, 30, 40);
    rect(30, 100, 50, 40);
    rect(80, 100, 70, 40);
    rect(0, 100, 30, 40);
    rect(150, 100, 70, 40);
    rect(220, 100, 50, 40);
    rect(270, 100, 30, 40);
    
    rect(0, 260, 30, 40);
    rect(30, 260, 50, 40);
    rect(80, 260, 70, 40);
    rect(0, 260, 30, 40);
    rect(150, 260, 70, 40);
    rect(220, 260, 50, 40);
    rect(270, 260, 30, 40);

    fill('red');
    rect(200, 175, 150, 50);
    
    this.enemy = get(0, 100, 400, 200);
  }

  makeDestroyedTank() {
    clear();
    background(255, 255, 255, 0);

    stroke('black');
    strokeWeight(4);
    fill(34);
    rect(0, 100, 290, 200);

    fill(100);
    rect(0, 100, 30, 40);
    rect(30, 100, 50, 40);
    rect(80, 100, 70, 40);
    rect(0, 100, 30, 40);
    rect(150, 100, 70, 40);
    rect(220, 100, 50, 40);
    rect(270, 100, 30, 40);
    
    rect(0, 260, 30, 40);
    rect(30, 260, 50, 40);
    rect(80, 260, 70, 40);
    rect(0, 260, 30, 40);
    rect(150, 260, 70, 40);
    rect(220, 260, 50, 40);
    rect(270, 260, 30, 40);

    fill(34);
    rect(200, 175, 150, 50);
    
    this.destroyedTank = get(0, 100, 400, 200);
  }
  
  makeTombstone() {
    clear();
    background(255, 255, 255, 0);
    
    noStroke();
    fill(150);
    rect(0, height/3, width, 2*height/3);
    ellipse(width / 2, height/3, width, 2*height/3);
  
    fill(175);
    rect(width/15, height/3, 13*width/15, 9*height/15);
    ellipse(width/2, height/3, 13*width/15, 8*height/15);
  
    fill(150);
    rect(9*width / 20, height/5, width/10, height/2);
    rect(width/4, height/3, width/2, height/12);
    
    this.tombstone = get(0, 0, width, height);
    clear();
  }

  makeLaser() {
    clear();
    background(255, 255, 255, 0);

    noStroke();
    fill(247, 10, 10, 200);
    rect(width/2, height/2, width, 30);

    fill(230, 175, 90, 200);
    rect(width/2, height/2 + 5, width/2, 20);
    
    fill(245, 245, 245, 100);
    rect(width/2, height/2 + 10, width/2, 10);

    this.laser = get(width/2, height/2, width/2, 30);
  }
}

class Menu {
  constructor() {
    this.sprites = new Objs();
    this.ghost = new Enemy(width/10, height/1.1, this.sprites);
    this.ghost2 = new Enemy(width/1.3, height/1.4, this.sprites);
    this.ghost3 = new Enemy(width/1.9, height/1.2, this.sprites);
  }
  draw() {
    background(25, 0, 51);
    
    // Ground + Tombstones
    noStroke();
    fill(1, 68, 33);
    rect(0, 2*height/3, width, height/3);
    
    // Moon
    fill(255, 153, 51);
    ellipse(width/8, height/8, width/5, height/5);
    fill(25, 0, 51);
    ellipse(width/7, height/7.5, width/5, height/5);
    
    this.ghost.draw();
    this.ghost.x++;
    if (this.ghost.x > 420) { this.ghost.x = -10; }

    this.ghost2.draw();
    this.ghost2.x++;
    if (this.ghost2.x > 420) { this.ghost2.x = -10; }

    this.ghost3.draw();
    this.ghost3.currentState = 3;
    this.ghost3.states[3].execute(this.ghost3);

    this.rules = "The objective is to destroy all the tanks while maneuvering around their lasers. If you get hit by a laser, you lose! You must destroy all the tanks to win the game. Turn by pressing the left and right arrow keys. Go forward and backward using the up and down arrows, respectively.";
    textSize(16);
    stroke('black');
    fill('white');
    text(this.rules, width/4, height/10, 2*width/3, 2*height/3);
  }
}

class chaseState {
  constructor() {
  }
  execute(me) {
    me.update();
    if (abs(me.angle - me.tempHead) < 0.5) {
      me.x += me.speed*cos(me.angle);
      me.detectWallXCollision();
      me.detectEnemyXCollision();
      me.y += me.speed*sin(me.angle);
      me.detectWallYCollision();
      me.detectEnemyYCollision();
    }
    if (dist(me.x, me.y, player.x, player.y) <= 120) { me.currentState = 1; } 
    me.checkLaser();
  }
}

class shootState {
  constructor() {
  }
  execute(me) {
    me.update();
    if (abs(me.angle - me.tempHead < 0.3) && me.cooldown == 0) {
      me.laser.x = me.x + CHAR_RADIUS*cos(me.angle);
      me.laser.y = me.y + CHAR_RADIUS*sin(me.angle);
      me.laser.angle = me.angle;
      me.cooldown++;
    }
    // Cooldown for laser
    if (me.cooldown == 120) { me.cooldown = 0; }
    else if (me.cooldown != 0) { me.cooldown++; }


    if (dist(me.x, me.y, player.x, player.y) > 120) { me.currentState = 0; }
    me.checkLaser();
  }
}

class evadeState {
  constructor() {
    this.currAngle = 0;
    this.diffAngle = 0;
    this.direction = 1;
    this.traveled = 0;
  }
  execute(me) {
    me.prevX = me.x;
    me.prevY = me.y;
    if (abs(this.currAngle) < PI/3 && this.direction > 0) {
      me.angle += me.rotateSpeed;
      this.currAngle -= me.rotateSpeed;
    }
    else if (abs(this.currAngle) < PI/3 && this.direction < 0) {
      me.angle -= me.rotateSpeed;
      this.currAngle += me.rotateSpeed;
    }
    else {
      me.x -= me.speed*cos(me.angle);
      me.detectWallXCollision();
      me.detectEnemyXCollision();
      me.y -= me.speed*sin(me.angle);
      me.detectWallYCollision();
      me.detectEnemyYCollision();
      this.traveled += 1;
    }
    if (this.traveled >= 40) {
      me.currentState = 0;
      this.traveled = 0;
    }
  }
  findDiffAngle(me, laser) {
    this.laser = laser;
    this.diffAngle = abs(laser.angle - me.angle);
    if (this.diffAngle < PI) { this.direction = 1; }
    else { this.direction = -1; }
    this.currAngle = this.diffAngle - PI;
  }
}

class destroyState {
  constructor() {
    this.plume1 = new p5.Vector(2, 3);
    this.plume2 = new p5.Vector(-1, 2);
    this.plume3 = new p5.Vector(1, 2);
    this.plume4 = new p5.Vector(-3, 3);

    this.color1 = new p5.Vector(150, 50);
    this.color2 = new p5.Vector(100, 100);
    this.color3 = new p5.Vector(75, 150);
    this.color4 = new p5.Vector(125, 200);
  }
  execute(me) {
    // Smoke adjustments
    noStroke();
    this.color1.set(150, this.color1.y-5)
    this.color2.set(100, this.color2.y-5)
    this.color3.set(75, this.color3.y-5)
    this.color4.set(125, this.color4.y-5)
    this.plume1.set(this.plume1.x, this.plume1.y - 0.5);
    this.plume2.set(this.plume2.x, this.plume2.y - 0.5);
    this.plume3.set(this.plume3.x, this.plume3.y - 0.5);
    this.plume4.set(this.plume4.x, this.plume4.y - 0.5);

    if (this.color1.y <= 0) {
      this.plume1.set(-5, -0.2);
      this.color1.set(150, 255);
    }
    if (this.color2.y <= 0) {
      this.plume2.set(0, -0.2);
      this.color2.set(100, 255);
    }
    if (this.color3.y <= 0) {
      this.plume3.set(5, -0.2);
      this.color3.set(75, 255);
    }
    if (this.color4.y <= 0) {
      this.plume4.set(2.5, -0.2);
      this.color4.set(125, 255);
    }
    
    let col1 = this.color1.x;
    fill(col1, col1, col1, this.color1.y);
    circle(me.x + this.plume1.x, me.y + this.plume1.y, 15);

    let col2 = this.color2.x;
    fill(col2, col2, col2, this.color2.y);
    circle(me.x + this.plume2.x, me.y + this.plume2.y, 15);

    let col3 = this.color3.x;
    fill(col3, col3, col3, this.color3.y);
    circle(me.x + this.plume3.x, me.y + this.plume3.y, 15);

    let col4 = this.color4.x;
    fill(col4, col4, col4, this.color4.y);
    circle(me.x + this.plume4.x, me.y + this.plume4.y, 15);
  }
}

class Enemy {
  constructor(posX, posY, obj) {
    // Positional variables
    this.x = posX;
    this.y = posY;
    this.step = new p5.Vector(0, -1);
    this.speed = 0.8;

    // Image for drawing
    this.obj = obj;

    // States
    this.currentState = 0;
    this.states = [new chaseState(), new shootState(), new evadeState(), new destroyState()];

    // Angle variables
    this.angle = 0;
    this.rotateSpeed = 0.025;

    // Laser variables
    this.laser = new Laser(10000, 10000, 0, this.obj.laser, this);
    this.cooldown = 60;
  }
  draw() {
    this.laser.draw();
    if (this.currentState != 3) {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      image(this.obj.enemy, -CHAR_RADIUS, -CHAR_RADIUS, TILE_SIZE, TILE_SIZE);
      pop();
    } else {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      image(this.obj.destroyedTank, -CHAR_RADIUS, -CHAR_RADIUS, TILE_SIZE, TILE_SIZE);
      pop();
    }
  }
  detectWallXCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < walls.length; ++i) {
      if (((this.leftX <= walls[i].x + TILE_SIZE && this.leftX >= walls[i].x) ||
           (this.rightX >= walls[i].x && this.rightX <= walls[i].x + TILE_SIZE)) &&
          ((this.topY >= walls[i].y && this.topY <= walls[i].y + TILE_SIZE) ||
           (this.bottomY <= walls[i].y + TILE_SIZE && this.bottomY >= walls[i].y))) {
            this.x = this.prevX;
      }
    }
  }
  detectWallYCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < walls.length; ++i) {
      if (((this.topY <= walls[i].y + TILE_SIZE && this.topY > walls[i].y) ||
           (this.bottomY >= walls[i].y && this.bottomY < walls[i].y + TILE_SIZE)) &&
          ((this.leftX >= walls[i].x && this.leftX <= walls[i].x + TILE_SIZE) ||
           (this.rightX <= walls[i].x + TILE_SIZE && this.rightX >= walls[i].x))) {
            this.y = this.prevY;
      }
    }
  }
  detectEnemyXCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < enemies.length; ++i) {
      let enemy = enemies[i];
      if (enemy === this) { continue; }
      if (((this.leftX <= enemy.x + CHAR_RADIUS && this.leftX >= enemy.x - CHAR_RADIUS) ||
           (this.rightX >= enemy.x - CHAR_RADIUS && this.rightX <= enemy.x + CHAR_RADIUS)) &&
          ((this.topY >= enemy.y - CHAR_RADIUS && this.topY <= enemy.y + CHAR_RADIUS) ||
           (this.bottomY <= enemy.y + CHAR_RADIUS && this.bottomY >= enemy.y - CHAR_RADIUS))) {
            this.x = this.prevX;
      }
    }
  }
  detectEnemyYCollision() {
    this.leftX = this.x - CHAR_RADIUS;
    this.topY = this.y - CHAR_RADIUS;
    this.rightX = this.x + CHAR_RADIUS;
    this.bottomY = this.y + CHAR_RADIUS;
    for (let i = 0; i < enemies.length; ++i) {
      let enemy = enemies[i];
      if (enemy === this) { continue; }
      if (((this.topY <= enemy.y + CHAR_RADIUS && this.topY > enemy.y - CHAR_RADIUS) ||
           (this.bottomY >= enemy.y - CHAR_RADIUS && this.bottomY < enemy.y + CHAR_RADIUS)) &&
          ((this.leftX >= enemy.x - CHAR_RADIUS && this.leftX <= enemy.x + CHAR_RADIUS) ||
           (this.rightX <= enemy.x + CHAR_RADIUS && this.rightX >= enemy.x - CHAR_RADIUS))) {
            this.y = this.prevY;
      }
    }
  }
  update() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.step.set(player.x - this.x, player.y - this.y);
    this.step.normalize();
    
    this.rotateToPlayer();
  }
  rotateToPlayer() {
    // Ensure comparison heading is positive
    if (this.step.heading() < 0) { this.tempHead = this.step.heading() + TWO_PI; }
    else { this.tempHead = this.step.heading(); }
    // Check when the tank needs to stop rotating
    if (abs(this.tempHead - this.angle) < 0.05) { return; }

    // Rotate to shortest path
    let diff = this.tempHead - this.angle;
    if (abs(diff) > PI && this.tempHead > this.angle) { this.angle -= this.rotateSpeed; }
    else if (abs(diff) > PI && this.tempHead < this.angle) {this.angle += this.rotateSpeed; }
    else if (abs(diff) < PI && this.tempHead > this.angle) { this.angle += this.rotateSpeed; }
    else { this.angle -= this.rotateSpeed; }

    if (this.angle < 0) { this.angle += TWO_PI; }
    else if (this.angle > TWO_PI) { this.angle -= TWO_PI; }
  }
  checkLaser() {
    for (let i = 0; i < player.lasers.length; ++i) {
      let currLaser = player.lasers[i];
      if (!(currLaser.x > 0 && currLaser.x < width && currLaser.y > 0 && currLaser.y < height)) continue;
      let path = new p5.Vector(this.x - currLaser.x, this.y - currLaser.y);
      // Ensure comparison heading is positive
      if (path.heading() < 0) { this.tempLaserHead = path.heading() + TWO_PI; }
      else { this.tempLaserHead = path.heading(); }
      
      if (abs(currLaser.angle - this.tempLaserHead) < 0.3) {
        this.currentState = 2;
        this.states[2].currAngle = this.angle;
        this.states[2].findDiffAngle(this, currLaser);
      }
    }
  }
}

class Wall {
  constructor(posX, posY, obj) {
    this.x = posX;
    this.y = posY;
    this.obj = obj;
  }
  draw() {
    image(this.obj, this.x, this.y, TILE_SIZE, TILE_SIZE);
  }
}

function initializeTilemap() {
  fill(0);
  stroke(255);
  for (let i = 0; i < TILE_MAP.length; ++i) {
    for (let j = 0; j < TILE_MAP[i].length; ++j) {
      switch(TILE_MAP[i][j]) {
        case '#':
          walls.push(new Wall(TILE_SIZE*j, TILE_SIZE*i, objs.tombstone));
          break;
        case 'P':
          player = new Player(TILE_SIZE*j + CHAR_RADIUS, TILE_SIZE*i + CHAR_RADIUS);
          break;
        case 'E':
          enemies.push(new Enemy(TILE_SIZE*j + CHAR_RADIUS, TILE_SIZE*i + CHAR_RADIUS, objs));
          break;
      }
    }
  }
}

// added in the game to set them in website 
function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			

//Setup function: Creates the canvas, draws custom characters and intializes entities
function setup() 
{

     
  	/* additional code added to the  game for hosting in website */
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	//createCanvas(400, 400); student code commented  
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
	

  
  objs = new Objs();
  menu = new Menu();
  initializeTilemap();
  frameRate(60);
}

function game() {
  clear();
  background(1, 68, 33);
  fill(0);
  for (let i = 0; i < walls.length; ++i) { walls[i].draw(); }
  for (let i = 0; i < enemies.length; ++i) { 
    enemy = enemies[i];
    enemy.draw(); enemy.states[enemy.currentState].execute(enemy); 
  }
  player.draw();
  if (player.score == 20) { state = 3; player.state = 3; }
  for (let i = 0; i < enemies.length; ++i) {
    if (enemies[i].currentState != 3) { return; }
  }
  state = 3;
  for (let i = 0; i < walls.length; ++i) { walls[i].draw(); }
  for (let i = 0; i < enemies.length; ++i) { 
    enemy = enemies[i];
    enemy.draw(); enemy.states[enemy.currentState].execute(enemy); 
  }
  player.draw();
}

function draw() {
  if (state == 0 && mouseIsPressed) { state = 1; player.state = 1;}
  else if (state == 0) { menu.draw(); }
  else if (state == 1) { game(); }
  else if (state == 2) {
    stroke(153, 0, 0);
    textSize(30);
    text("You're Dead!!!", width / 4, height / 3);
    noStroke();
  }
  else if (state == 3) {
    stroke(51, 240, 255, 95);
    textSize(30);
    text("You Win!!!", width/4, height / 3);
    noStroke();
  }
}