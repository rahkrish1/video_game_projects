class particleObj{ // Particle Object to create the particles for fire
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.r = 226;
    this.g = 88;
    this.b = 34;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    
  }
  draw(){
     noStroke(); // drawing the particles with no stroke
    fill(this.r, this.g, this.b, this.alpha); // Color of fire
    ellipse(this.x, this.y, 4, 6); // draw the particle
  }
  update(){ // updating the position of the particle
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 25;
  }
  done(){ // checking if the particles transparency is negative or not
    if(this.alpha <0){
      return true
    }
    else {
      return false;
    }
  }
}
// The explosion object and the Firewrok Obj is taken from the class examples. and has been displayed to display a firework when the player or any enemy tank is destroyed. 
class explosionObj {
  constructor(a) {
    this.position = new p5.Vector(0, 0);
    this.direction = new p5.Vector(0, 0);
    this.size = random(1, 3);
    this.c1 = 136;
    this.c2 = 8;
    this.c3 = 8;
    if (a === 0) {
      this.c1 = random(0, 250);
    } else {
      this.c1 = random(100, 255);
    }
    if (a === 1) {
      this.c2 = random(0, 250);
    } else {
      this.c2 = random(100, 255);
    }
    if (a === 2) {
      this.c3 = random(0, 250);
    } else {
      this.c3 = random(100, 255);
    }
    this.timer = 0;
  }
  draw() {
    fill(this.c1, this.c2, this.c3, this.timer); 
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);

    this.position.x += this.direction.y * cos(this.direction.x);
    this.position.y += this.direction.y * sin(this.direction.x);
    this.position.y += 90 / (this.timer + 100);
    this.timer--;
  }
}

class fireworkObj {
  constructor(a) {
    this.position = new p5.Vector(200, 380);
    this.direction = new p5.Vector(0, 0);
    this.target = new p5.Vector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 100; i++) { //cheanged the number of particles to 100
      this.explosions.push(new explosionObj(a));
    }
  }
  draw() {
    fill(255, 255, 255);
    ellipse(this.position.x, this.position.y, 2, 2);

    this.position.add(this.direction);
    if (
      dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4
    ) {
      this.step = 2;
      for (var i = 0; i < this.explosions.length; i++) {
        this.explosions[i].position.set(this.target.x, this.target.y);

        this.explosions[i].direction.set(random(0, 2 * PI), random(-0.3, 0.3));
        this.explosions[i].timer = 100; // explosion timer is now set to 100
      }
    }
  }
} 
var score = 0; // keeping the score of the player to check the winning condition
var walls = []; // storing all the walls 
var player = []; // storing the player
var enemy = []; // storing the enemy objects
var tileMap = [
  "wwwwwwwwwwwwwwwwwwww",
  "w                  w",
  "w  P               w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w               e  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w   e              w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w  e            e  w",
  "w                  w",
  "w                  w",
  "w     e            w",
  "w                  w",
  "wwwwwwwwwwwwwwwwwwww",
]; // TileMap initialized

var currFrameCount = 0;
var bulletIndex = 0; // variable holds the index of the bullet shot

// Code snippet used is from one of the examples presented in the class.
// The code has been modified to fit the purpose of this program and project
function checkFire() {
  if (keyIsDown(32)) {
    if (currFrameCount < frameCount - 10) {
      currFrameCount = frameCount;
      bullets[bulletIndex].fired = true;
      bullets[bulletIndex].x = player[0].x;
      bullets[bulletIndex].y = player[0].y;
      bullets[bulletIndex].angle = player[0].angle - HALF_PI;
      bullets[bulletIndex].blocked = false;

      bulletIndex++;
      if (bulletIndex > 3) {
        bulletIndex = 0;
      }
    }
  }
}
function initTilemap() { 


  // Creating and pushing the objects of the tilemap in the
  stroke(0);
  var enemyIndex = 0;
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      // for the entire length and the width of the tileMap
      switch (
        tileMap[i][j] // check the characters and create and push the objects respectively.
      ) {
        case "w": // w is a wall
          // fill(145, 111, 78);
          walls.push(new wallObj(j * 20, i * 20));
          break;
        case "P": // P - player
          player.push(new playerObj(j * 20, i * 20));
          break;
        case "e": // enemy tanks
          enemy.push(new enemyObj(j * 20, i * 20, enemyIndex));
          enemyIndex += 1;
          break;
      }
    }
  }
}
class bulletObj {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.fired = false;
    this.vec = createVector(1, 1); // creating a vector to shoot the bullet in a  given direction
    this.angle = angle;
    this.blocked = false;
  }
  draw() {
    var wallCollision = false; // variable checks for wall collision
    var adversaryCollision = false; // variable checks for enemy collision
    push(); // droawing and translating the bullets
    translate(this.x, this.y);
    fill(0, 0, 0);
    ellipse(0, 0, 6, 6);
    this.vec.setMag(2);
    this.vec.setHeading(this.angle + HALF_PI);
    this.x += this.vec.x;
    this.y += this.vec.y;
    pop();
    for (var i = 0; i < walls.length; i++) {
      // checking for collision with the walls
      if (walls[i].checkCollisionB(this.x, this.y)) {
        this.blocked = true; // checks if the bullet has been blocked or not
        wallCollision = true;
      }
    }
    if (this.blocked) {
      this.fired = false;
      if (wallCollision) {
        return false;
      } else if (adversaryCollision) {
        return true;
      }
    }
  }
  los(x, y, ind) { //checking if a bullet is in an enemy's line of sight
    var projectiony = 0; // projected y position of the bullet

    var projectionx = 0; // projected x position of the bullet 
    if (this.fired) { // Check for los only if the bullet is fired
      projectiony = tan(this.angle + HALF_PI) * (x - this.x) + this.y; // get the projected y location using y = mx +c
      projectionx = (y - this.y) / tan(this.angle + HALF_PI) + this.x; // get the projected x location using x = (y-c)/m
      if (dist(x, y, projectionx, projectiony) < 90) { // if the distance between the projected coordinates and the actual coordinates is less than 90, then the bullet is in sight
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
class playerObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vec = createVector(0, 0); // vector to move the tank
    this.angle = 0; // stores the angle the tank is rotated to
    this.vecHist = createVector(0, 0); // storing the past
    this.blast = new fireworkObj(0);
    this.dead = false;
    this.blasted = false;
    this.particle = [];
  }
  draw() {
    // Draw Tank
    push();
    stroke(0);
    translate(this.x, this.y);
    rotate(this.angle);
    fill(25, 25, 112);

    rect(-10, -10, 15, 20, 2);

    rect(-5, -2, 17, 4, 2);

    // Draw Tracks for the tank
    fill(150);
    rect(-12.5, -10, 20, 4, 2);
    line(-10, -10, -10, -6);
    line(-6, -10, -6, -6);
    line(-2, -10, -2, -6);
    line(2, -10, 2, -6);
    line(5, -10, 5, -6);

    rect(-12.5, 6, 20, 4, 2);
    line(-10, 10, -10, 6);
    line(-6, 10, -6, 6);
    line(-2, 10, -2, 6);
    line(2, 10, 2, 6);
    line(5, 10, 5, 6);

    pop();
  }
  move() {
    // Moving the player based on the key pressed
    // left/a key rotates the tank in the anti-clockwise direction, up/w moves the player forward, down/s moves the player backwards, right/d rotates the player in the clockwise direction
    var xMove = 0;
    var yMove = 0;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // Turning the tank counter-clockwise
      this.angle -= PI / 180;
      if (this.angle > TWO_PI) {
        this.angle = 0; // -(PI - (PI/180));
      } else if (this.angle < 0) {
        this.angle = TWO_PI;
      }
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      // turning the tank clockwise
      this.angle += PI / 180;
      if (this.angle > TWO_PI) {
        this.angle = 0; // -(PI - (PI/180));
      } else if (this.angle < 0) {
        this.angle = TWO_PI;
      }
    }
    if (keyIsDown(UP_ARROW) ||  keyIsDown(87)) {
      // pressing the up arrow moves the tank in the direction it is facing
      this.vec.set(this.x, this.y);
      this.vec.setHeading(this.angle);
      this.vec.setMag(1);
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      // the down arrow moves the tank in the reverse direction
      this.vec.set(this.x, this.y);
      this.vec.setHeading(this.angle);
      this.vec.setMag(-1);
    }

    // Checking for wall collisions here
    // if there is a collission go back a little and rotate
    for (var i = 0; i < walls.length; i++) {
      if (walls[i].checkCollision(this.x + this.vec.x, this.y + this.vec.y)) {
        this.vec.mult(-1);
      }
    }
    
    // Checking for enemy collisions here
    // if there is a collission go back a little and rotate
    for (var i = 0; i < enemy.length; i++) {
      if (enemy[i].checkCollision(this.x + this.vec.x, this.y + this.vec.y)) {
        this.vec.mult(-1);
      }
    }

    // Updating the coordinates of the player

    if (this.vec.mag() != 0) {
      this.x += this.vec.x;
      this.y += this.vec.y;
      this.vecHist.mult(2);
    }
    this.vecHist.set(this.vec.x, this.vec.y); // setting the history to keep the tank in the state that it currently is in
    this.vec.mult(0);
  }
  killed(){ // drawing the state of the tank is the player is killed 
     
    push();
    
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(0);
    fill(25, 25, 90);
    rect(-10, -10, 15, 20, 2);

    rect(-5, -2, 17, 4, 2);

    pop();
  }
  fire(){ // generating fire from the center of the tank
        var p = new particleObj(this.x, this.y);
    this.particle.push(p);
    //iterate through the particle list in the reverse direction to avoid problems from splicing
    for(var i = this.particle.length -1; i> 0; i--){
      this.particle[i].update();
      this.particle[i].draw();
      if(this.particle[i].done()){
        this.particle.splice(i, 1);
      }
    }
  }
}

// The enemy tank is in the shoot state if the distance between the enemy tank and the player is less than 150 pixels
// While in the shoot state the enemy tank sets the gun to face the player and then shoot bullet randomly
class shootState {
  constructor(x, y) {
    this.move = 1;
    this.velocisty = createVector(1, 1);
  }
  execute(me) {
    var rand = int(random(0, 50)); // generating a random int between 0 and 50 for shooting
    if (dist(me.x, me.y, player[0].x, player[0].y) > 150) { // change state if the distance is greater than 150
      me.state = 1;
    }
    me.updateAngle(); // update the angle of the tank to face the player
    for (var i = 0; i < 4; i++) { // check collision with the players bullets
      if(bullets[i].fired){
      if (bullets[i].los(me.x, me.y, me.index)) { // if the tank is in the players line of sight switch to avoid state
        me.state = 2;
      }
      if (dist(me.x, me.y, bullets[i].x, bullets[i].y) < 20) {
        bullets[i].fired = false;
        me.state = 3;
      }
    }
    if (me.bullet[0].fired) { // check if the tanks bullet hits the player or not
      if (dist(player[0].x, player[0].y, me.bullet[0].x, me.bullet[0].y) < 20) {
        gameOver = true;
        player[0].dead = true;
      }
      for(var i = 0 ; i < enemy.length; i++){ //stop the bullet if it hits a destroyed enemy tank 
        if (i != me.index) {
          if (enemy[i].state == 3){
            if (dist(enemy[i].x, enemy[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    //checking collision with the player
      if (dist(me.x, me.y, player[0].x, player[0].y) < 20){
        this.velocity.setHeading(me.angle);
        this.velocity.setMag(-0.5);
        me.x+= this.velocity.x;
        me.y += this.velocity.y;
      }
      // shooting action
    if (rand == 5 && !me.bullet[0].fired) { 
      var projectedAngle = me.vec.heading();
      if (projectedAngle < 0) {
        projectedAngle += 2 * PI;
      }
      var angleDiff = abs(projectedAngle - me.angle);
      if (angleDiff < PI / 90) {
        if (currFrameCount < frameCount - 10) {
          currFrameCount = frameCount;
          me.bullet[0].fired = true;
          me.bullet[0].x = me.x;
          me.bullet[0].y = me.y;
          me.bullet[0].angle = me.angle - PI / 2;
          me.bullet[0].blocked = false;
        }
      }
    }
  }
}
}
// The tank is in the Chase State when the distance between the enemy tank and the player is greater than 150 pixels. Int this state the enemy tank chases the playeer tank. In the state the tank checks for collisions with enemy, player and the walls. The tank also checks if it is in a bullets line of sight or if it is dead and changes to a different state accordingly. (As done in the chase state)
class chaseState {
  constructor() {
    this.move = 0.5;
    this.velocity = createVector(1, 1);
  }
  execute(me) {
    this.move = 0.5;
    for (var i = 0; i < 4; i++) {
      if (bullets[i].fired){
      if (bullets[i].los(me.x, me.y, me.index)) {
        me.state = 2;
      } else if (dist(me.x, me.y, bullets[i].x, bullets[i].y) < 20) {
        bullets[i].fired = false;
        me.state = 3;
      }
      }
    }
    if (dist(me.x, me.y, player[0].x, player[0].y) <= 150) {
      me.state = 0;
    }
    if (me.bullet[0].fired) {
      if (dist(player[0].x, player[0].y, me.bullet[0].x, me.bullet[0].y) < 20) {
        gameOver = true;
        player[0].dead = true;
      }
      for(var i = 0 ; i < enemy.length; i++){
        if (i != me.index) {
          if (enemy[i].state == 3){
            if (dist(enemy[i].x, enemy[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    me.updateAngle();
    this.velocity.setHeading(me.angle);
    this.velocity.setMag(this.move);
    for (i = 0; i < walls.length; i++) {
      if (
        walls[i].checkCollision(me.x + this.velocity.x, me.y + this.velocity.y)
      ) {
        me.angle += PI / 180;
        this.move = -this.move;
        this.velocity.setMag(this.move);
      }
    }
    for (i = 0; i < enemy.length; i++) {
      if (i != me.index) {
        if (
          enemy[i].checkCollision(
            me.x + this.velocity.x,
            me.y + this.velocity.y
          )
        ) {
          me.angle += PI / 180;
          this.move = -this.move;
          this.velocity.setMag(this.move);
          // print("Here");
        }
      }
    }
    me.x += this.velocity.x;
    me.y += this.velocity.y;
  }
}

// The tank is in the avoidState when it is in a bullets line of sight. When in the avoid state the enemy tank rotates until the angle between the bullet and the tanks is more than 80 degrees and then tries to move away from the bullet. Also, in this checks the tank check for collision and if it hits the bullet then switches the state to dead. If the bullet is no more in the line of sight of the tank then go back to the shoot state. 
class avoidState {
  constructor() {
    this.bulletAngle = 0;
    this.tankAngle = 0;
    this.velocity = createVector(1, 1);
    this.fire = [false, false, false, false];
    this.noFire = true;
    this.move = 1;
  }
  execute(me) {
    this.move = 1;
    if (me.bullet[0].fired) {
      if (dist(player[0].x, player[0].y, me.bullet[0].x, me.bullet[0].y) < 20) {
        gameOver = true;
        player[0].dead = true;
      }
      for(var i = 0 ; i < enemy.length; i++){
        if (i != me.index) {
          if (enemy[i].state == 3){
            if (dist(enemy[i].x, enemy[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    // check if the tank is pointing in the same direction
    this.tankAngle = me.angle * (180 / PI);
    if (this.tankAngle >= 180) {
      this.tankAngle = this.tankAngle - 180;
    }
    if (this.bulletAngle >= 180) {
      this.bulletAngle = this.bulletAngle - 180;
    }
    // print(this.tankAngle, this.bulletAngle);
    if (abs(this.bulletAngle - this.tankAngle) <= 80) {
      if (this.bulletAngle > this.tankAngle) {
        me.decreaseAngle(); // if so rotate
        // print("here");
      } else if (this.bulletAngle < this.tankAngle) {
        me.increaseAngle(); // if so rotate
        // print("here2");
      }
    } else {
      // if there is a difference of atleast 45 degrees then just move
      this.velocity.setHeading(me.angle);
      this.velocity.setMag(this.move);
      for (i = 0; i < walls.length; i++) {
        if (
          walls[i].checkCollision(
            me.x + this.velocity.x,
            me.y + this.velocity.y
          )
        ) {
          me.increaseAngle();
          this.move = -this.move;
          this.velocity.setMag(this.move);
        }
      }
      for (i = 0; i < enemy.length; i++) {
        if (i != me.index) {
          if (
            enemy[i].checkCollision(
              me.x + this.velocity.x,
              me.y + this.velocity.y
            )
          ) {
            me.increaseAngle();
            this.move = -this.move;
            this.velocity.setMag(this.move);
          }
        }
      }
      me.x += this.velocity.x;
      me.y += this.velocity.y;
      for (var i = 0; i < 4; i++) {
        if (bullets[i].fired) {
          this.fire[i] = true;
        } else {
          this.fire[i] = false;
        }
      }
      this.noFire = true;
      for (var i = 0; i < 4; i++) {
        if (this.fire[i]) {
          this.noFire = false;
        }
      }
      if (this.noFire) {
        me.state = 0;
      }
    }
        for (var i = 0; i < 4; i++) {
      if (bullets[i].fired) {
        this.bulletAngle = (bullets[i].angle + HALF_PI) * (180 / PI);
        if (dist(me.x, me.y, bullets[i].x, bullets[i].y) < 20) {
          bullets[i].fired = false;
          me.state = 3;
        }
      }
    }
  }
}

// When in this state the tank has been destroyed. 
class deathState {
  constructor() {
    this.move = 1;
  }
  execute(me) {
    // draw the fireworks once when the tank dies (Code taken from the class examples)
    if (me.blast.step == 0) {
      me.blast.position.set(me.x, me.y);
      me.blast.target.set(me.x, me.y - 50);
      me.blast.direction.set(
        me.blast.target.x - me.blast.position.x,
        me.blast.target.y - me.blast.position.y
      );
      var s = random(1, 2) / 100;
      me.blast.direction.mult(s);
      me.blast.step++;
    } else if (me.blast.step == 1) {
      me.blast.draw();
    } else if (me.blast.step == 2) {
      for (var i = 0; i < me.blast.explosions.length; i++) {
        me.blast.explosions[i].draw();
      }
      if (me.blast.explosions[0].timer <= 0) {
        me.blast.step++;
      }
    }
    if (me.bullet[0].fired) {
      if (dist(player[0].x, player[0].y, me.bullet[0].x, me.bullet[0].y) < 20) {
        gameOver = true;
        player[0].dead = true;
      }
      for(var i = 0 ; i < enemy.length; i++){
        if (i != me.index) {
          if (enemy[i].state == 3){
            if (dist(enemy[i].x, enemy[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    for (var i = 0; i < 4; i++) {
      if (dist(me.x, me.y, bullets[i].x, bullets[i].y) < 20) {
        bullets[i].fired = false;
        me.state = 3;
      }
    }
    me.dead = true; // kill  the tank 
    me.killed(); // draw its destroyed state
    me.fire(); // draw the fire originating from the tank
  }
}
// Creating the enemy tank
class enemyObj {
  constructor(x, y, ind) {
    this.index = ind;
    this.x = x;
    this.y = y;
    this.initAngle = random(0, 2 * PI);
    this.angle = this.initAngle;
    this.vec = createVector(0, 0);
    this.angleDir = 0;
    this.bullet = [new bulletObj(this.x, this.y, this.angle)];
    this.states = [
      new shootState(),
      new chaseState(),
      new avoidState(),
      new deathState(),
    ]; // different state objects of the tank
    this.state = 0;
    this.blast = new fireworkObj(2);
    this.dead = false;
    this.scored = false;
    this.particle =[];
  }
  draw() {
    push();
    stroke(0);
    translate(this.x, this.y);
    rotate(this.angle);
    fill(136, 8, 8);
    rect(-10, -10, 15, 20, 2);

    rect(-5, -2, 17, 4, 2);

    // Draw Tracks for the tank
    fill(150);
    rect(-12.5, -10, 20, 4, 2);
    line(-10, -10, -10, -6);
    line(-6, -10, -6, -6);
    line(-2, -10, -2, -6);
    line(2, -10, 2, -6);
    line(5, -10, 5, -6);

    rect(-12.5, 6, 20, 4, 2);
    line(-10, 10, -10, 6);
    line(-6, 10, -6, 6);
    line(-2, 10, -2, 6);
    line(2, 10, 2, 6);
    line(5, 10, 5, 6);

    pop();
  }
  killed() {
    push();
    stroke(0);
    translate(this.x, this.y);
    rotate(this.angle);
    fill(136, 8, 8);
    rect(-10, -10, 15, 20, 2);

    rect(-5, -2, 17, 4, 2);
    pop();
  }
  decreaseAngle() {
    this.angle -= PI / 45;
  }
  increaseAngle() {
    this.angle += PI / 45;
  }
  updateAngle() { // update the angle of the tank to face the player tank.
    this.vec.set(player[0].x - this.x, player[0].y - this.y);
    var projectedAngle = this.vec.heading();
    if (projectedAngle < 0) {
      projectedAngle += 2 * PI;
    }
    var angleDiff = abs(projectedAngle - this.angle);

    if (angleDiff > PI / 90) {
      if (projectedAngle > this.angle) {
        this.angleDir = PI / 180;
      } else {
        this.angleDir = -(PI / 180);
      }
      if (angleDiff > TWO_PI - 5 * (PI / 180)) {
        this.angleDir = -this.angleDir;
      }

      this.angle += this.angleDir;
      if (this.angle > TWO_PI) {
        this.angle = 0; // -(PI - (PI/180));
      } else if (this.angle < 0) {
        this.angle = TWO_PI;
      }
    }
  }
  checkCollision(x, y) {
    if (dist(this.x, this.y, x, y) < 25) {
      return true;
    } else {
      return false;
    }
  }
    fire(){ // to start drawing the fire originating at the center of the enemy tank. 
        var p = new particleObj(this.x, this.y);
    // print(p);
    this.particle.push(p);
    //print(this.particle.length);
    for(var i = this.particle.length -1; i> 0; i--){
      // print(this.particle[i]);
      this.particle[i].update();
      this.particle[i].draw();
      if(this.particle[i].done()){
        this.particle.splice(i, 1);
      }
    }
  }
}

class wallObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cx = this.x + 10;
    this.cy = this.y + 10;
  }
  draw() {
    fill(67, 70, 75);
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, 20, 20, 2);
  }
  checkCollision(x, y) {
    // if the distance between there x and y values is less than 15 a collision is detected
    if (abs(x - this.cx) < 20 && abs(y - this.cy) < 25) {
      return true;
    } else {
      return false;
    }
  }
  checkCollisionB(x, y) {
    if (abs(x - this.cx) < 12 && abs(y - this.cy) < 12) {
      return true;
    } else {
      return false;
    }
  }
}
var bullets = []; // Storing the bullets for the player

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
    
	
	
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
  
  initTilemap(); 
  
   bullets = [
    new bulletObj(player[0].x, player[0].y),
    new bulletObj(player[0].x, player[0].y),
    new bulletObj(player[0].x, player[0].y),
    new bulletObj(player[0].x, player[0].y),
  ]; // The player can only shoot 4 bullets at a  time.     
     
	 
  
  
}
var gameOver = false;
var instructions = false;
function mouseClicked() {
  // checking where the mouse clicked to start the game
  var xCor = mouseX;
  var yCor = mouseY; // check if clicked in the correct box
  if (xCor > 0 && xCor < 419 && yCor > 0 && yCor < 410 && !instructions) {
    instructions = true;
  }
}
var r = 135;
var g = 206;
var b = 235;
function draw() {
  
  if (!instructions){ // showing the instructions screen
     background(135, 206, 235);
    r++;
    g++;
    b++;
    noStroke();
    fill(255, 255, 0);
    arc(0, 0, 150, 150, 2 * PI, (1 / 2) * PI);
    fill(112, 84, 62);
    beginShape();
    vertex(0, 325);
    vertex(400, 325);
    vertex(400, 400);
    vertex(0, 400);
    endShape(CLOSE);
    fill(r, g, b);
    textSize(20);
    text("Welcome to the Game !!!", 100, 125);
    textSize(15);
    text("To start playing the game click anywhere on the screen.", 25, 150);
    text("Use the up arrow key/w to move forward, use the down  ", 25, 175);
    text(" arrow key/s to move back, use the right arrows/d and ", 25, 200);

    text("left arrows/a to rotate in a given direction. Hit Space Bar  ", 25, 225);
    text("to kill the enemy tanks, destroy all the enmy tanks to win. ", 15, 250);
    text("If you get hit by any of the enemy tank bullets, you die.", 25, 275);
    text("Best of Luck !!!", 150, 325);
  }
  else if (!gameOver) { // if the game is not over and the plaer has moved on from the instruction screen
    background(112, 84, 62);
    for (var i = 0; i < walls.length; i++) {
      walls[i].draw();
    }
    player[0].draw();
    player[0].move();
    for (i = 0; i < enemy.length; i++) { // for each enemy execute the state that the enemy is in 
      enemy[i].states[enemy[i].state].execute(enemy[i]);
      if (enemy[i].bullet[0].fired) {
        enemy[i].bullet[0].draw();
      }
      if (enemy[i].state != 3) { // if the enemy is not dead then draw its orginal shape and structure 
        enemy[i].draw();
      } else {
        if (!enemy[i].scored) { // if the enemy has not been scored adn is dead then score it.
          score += 1;
          enemy[i].scored = true;
        }
      }
    }

    for (i = 0; i < 4; i++) {
      if (!bullets[i].fired) { // if the bullet is not fired then check if it can be fired 
        checkFire();
      }
      if (bullets[i].fired) { // if the bullet has been fired then draw it 
        bullets[i].draw();
      }
    }

    if (score == 5) { // if the score is equal to 5 then the game i sover
      gameOver = true;
    }
  } else { // if the game is over 
    background(112, 84, 62); // redraw the the background and the walls
    for (var i = 0; i < walls.length; i++) {
      walls[i].draw();
    }
    
    if (player[0].dead) { // if the player has been shot then the player has lost the game
      if (!player[0].blasted) { // draw the fireworks for the game code taken from the exmaple 
        if (player[0].blast.step == 0) {
          player[0].blast.position.set(player[0].x, player[0].y);
          player[0].blast.target.set(player[0].x, player[0].y - 50);
          player[0].blast.direction.set(
            player[0].blast.target.x - player[0].blast.position.x,
            player[0].blast.target.y - player[0].blast.position.y
          );
          var s = random(1, 2) / 100;
          player[0].blast.direction.mult(s);
          player[0].blast.step++;
        } else if (player[0].blast.step === 1) {
          player[0].blast.draw();
        } else if (player[0].blast.step === 2) {
          for (var i = 0; i < player[0].blast.explosions.length; i++) {
            player[0].blast.explosions[i].draw();
          }
          if (player[0].blast.explosions[0].timer <= 0) {
            player[0].blast.step++;
          }
        }
        if (player[0].blast.step == 3) {
          player[0].blasted = true;
        }
        
      }
      for (i = 0; i < enemy.length; i++) { // draw all the enemies in their given state
        if (enemy[i].state != 3) {
            enemy[i].draw();
          enemy[i].state = 0;
        }
          enemy[i].states[enemy[i].state].execute(enemy[i]);
          
        }
      textSize(20);
    player[0].killed(); //kill the player and draw the fire
    player[0].fire();
      
      // stroke(0);
      fill(136, 8, 8);
      text("The Enemy tank destroyed you, you lose!!!", 10, 175); // print the losing message
    }
    else if (score == 5){ // if the score is 5 then the player has destroyed all the tanks and won the game.
      player[0].draw();
      for (i = 0; i < enemy.length; i++) {
          enemy[i].states[enemy[i].state].execute(enemy[i]);
      }
        textSize(25);
      fill(102, 255, 0);
        text("You Win !!!", 150, 175); // display winning message
    }
  }
}
