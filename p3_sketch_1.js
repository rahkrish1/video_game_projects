

//this class takes in coordinates for the wall block
//and then draws them at those coordinates
class wallObj {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    fill(255,86,34);
    rect(this.x,this.y+7,6,6);
    rect(this.x+7,this.y,6,6);
    rect(this.x+7,this.y+14,6,6);
    rect(this.x+14,this.y+7,6,6);
    rect(this.x+1,this.y+5,6,4);
    rect(this.x+5,this.y+1,4,6);
    rect(this.x+11,this.y+1,4,6);
    rect(this.x+1,this.y+11,6,4);
    rect(this.x+13,this.y+5,6,4);
    rect(this.x+5,this.y+13,4,6);
    rect(this.x+13,this.y+11,6,4);
    rect(this.x+11,this.y+13,4,6);
    fill(255);
    rect(this.x+3,this.y+2,2,4);
    rect(this.x+2,this.y+3,4,2);
    rect(this.x+4,this.y+3,2,4);
    rect(this.x+5,this.y+4,2,4);
    rect(this.x+4,this.y+5,4,2);
    rect(this.x+15,this.y+2,2,4);
    rect(this.x+12,this.y+5,4,2);
    rect(this.x+14,this.y+3,2,4);
    rect(this.x+13,this.y+4,2,4);
    rect(this.x+14,this.y+3,4,2);
    rect(this.x+5,this.y+12,2,4);
    rect(this.x+4,this.y+13,2,4);
    rect(this.x+3,this.y+14,2,4);
    rect(this.x+2,this.y+15,4,2);
    rect(this.x+4,this.y+13,4,2);
    rect(this.x+13,this.y+12,2,4);
    rect(this.x+14,this.y+13,2,4);
    rect(this.x+15,this.y+14,2,4);
    rect(this.x+12,this.y+13,4,2);
    rect(this.x+14,this.y+15,4,2);
  }
}

//this class manages the prize objects and drawing and 
//collection
class prizeObj {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    //using custom character here for prizes
    image(prize,this.x,this.y,20,20);
  }
  
  collect() {
    if (dist(posx,posy,this.x+10,this.y+10) <= 20) {
      score++;//increase score
      //if the score is 20, then the game ends and the 
      //player wins
      if (score >= 20) {
        game = false;
        win = true;
      }
      //return true here to tell the part in the main draw program
      //to remove this prize object
      return true;
    }
  }
}

//this class controls the graphics for the main character
//as well as updating the position of it when the player
//presses keys
class charObj {
  constructor(x,y) {
    this.pos = new p5.Vector(x,y);
    this.step = new p5.Vector(0,0);
    this.angle = 0;
  }
  
  draw() {
    //set posx,posy
    posx = this.pos.x;
    posy = this.pos.y;
    push();
    //translate and rotate
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    //draw player boat
    noStroke();
    fill(63,81,181);
    rect(3,-6,7,12);
    rect(-1,-5,11,10);
    rect(-4,-4,14,8);
    fill(255);
    rect(-7,-3,17,2);
    rect(-9,-2,17,1);
    rect(-7,1,17,2);
    rect(-9,1,17,1);
    fill(63,81,181);
    rect(-10,-1,20,2);
    fill(158,158,158);
    rect(3,-4,5,1);
    rect(2,-3,3,1);
    rect(1,-2,3,1);
    rect(0,-1,3,2);
    rect(1,1,3,1);
    rect(2,2,3,1);
    rect(3,3,5,1);
    rect(6,-1,2,2);
    rect(7,-4,1,8);
    pop();
    fill(158,158,158)
    circle(this.pos.x,this.pos.y,2)
  }
  
  move() {
    //calculate movement vector and scale it x2
    this.step.set(cos(this.angle),sin(this.angle));
    this.step.mult(2);
    frame_slide = -(this.pos.x-190);//for moving frame
    frame_slide_y = -(this.pos.y-190);
    
    //rotation
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.angle-=PI / 45;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.angle+=PI / 45;
    }
    
    //find wall closest to player
    let closest_wall = 0;
    let closest_dist = 1200;
    for (var i = 0; i < walls.length; i++) {
      if (closest_dist > dist(walls[i].x+10,walls[i].y+10,this.pos.x,this.pos.y)){
        closest_wall = i;
        closest_dist = dist(walls[i].x+10,walls[i].y+10,this.pos.x,this.pos.y);
      }
    }
    
    //forward or backward movement with wall collisions and border collisions
    if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && (dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x,this.pos.y) > 14) && (dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x-this.step.x,this.pos.y-this.step.y) > 14) && (this.pos.x-10 > 0) && (this.pos.x-10-this.step.x > 0) && (this.pos.y-10 > 0) && (this.pos.y-10-this.step.y > 0) && (this.pos.y+10 < 400) && (this.pos.y+10-this.step.y < 400) && (this.pos.x+10 < 1200) && (this.pos.x+10-this.step.x < 1200)) {
      this.pos.sub(this.step);
    } else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && (dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x,this.pos.y) > 14) && (dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x+this.step.x,this.pos.y+this.step.y) > 14) && (this.pos.x-10 > 0) && (this.pos.x-10+this.step.x > 0) && (this.pos.y-10 > 0) && (this.pos.y-10+this.step.y > 0) && (this.pos.y+10 < 400) && (this.pos.y+10+this.step.y < 400) && (this.pos.x+10 < 1200) && (this.pos.x+10+this.step.x < 1200)) {
      this.pos.add(this.step);
    }
    //update the angle character uses
    char_ang = this.angle;
  }
  
  shoot() {
    //check if space is pressed
    if (keyIsDown(32)) {
      //rate of bullets
      if (currFrameCount < (frameCount - 25)) {
        currFrameCount = frameCount;
        //set parameters of bullet
        bullets[bulletIndex].fire = 1;
        bullets[bulletIndex].angle = char_ang;
        bullets[bulletIndex].pos.x = posx;
        bullets[bulletIndex].pos.y = posy;
        bulletIndex++;//increase in array
        //reset array iteration
        if (bulletIndex > 8) {
          bulletIndex = 0;
        }
      }
    }
    //draw the bullets if the fire var is 1
    for (let i = 0; i<bullets.length; i++) {
      if (bullets[i].fire === 1) {
        bullets[i].draw();
      }
    }
  }
}

//this creates customchars to use throughout the game
//only the prize custom chars are used in the game page
//all other custom chars were created to use as assets in the 
//home screen or win/loss screens
function customChars() {
  noStroke();
  background(0,187,212);
  fill(255,193,7);
  rect(8,0,4,1);
  rect(7,1,6,1);
  rect(6,2,8,1);
  rect(5,3,10,1);
  rect(5,4,10,1);

  rect(3,5,4,1);
  rect(2,6,6,1);
  rect(1,7,8,1);
  rect(0,8,20,1);
  rect(0,9,20,1);
  rect(13,5,4,1);
  rect(12,6,6,1);
  rect(11,7,8,1);

  rect(3,10,4,1);
  rect(2,11,6,1);
  rect(1,12,8,1);
  rect(0,13,20,1);
  rect(0,14,20,1);
  rect(13,10,4,1);
  rect(12,11,6,1);
  rect(11,12,8,1);

  rect(3,15,4,1);
  rect(2,16,6,1);
  rect(1,17,8,1);
  rect(0,19,20,1);
  rect(0,18,20,1);
  rect(13,15,4,1);
  rect(12,16,6,1);
  rect(11,17,8,1);

  fill(255,235,59);
  rect(8,1,4,1);
  rect(7,2,6,1);
  rect(6,3,8,1);

  rect(3,6,4,1);
  rect(2,7,6,1);
  rect(1,8,8,1);
  rect(13,6,4,1);
  rect(12,7,6,1);
  rect(11,8,8,1);

  rect(3,11,4,1);
  rect(2,12,6,1);
  rect(1,13,8,1);
  rect(13,11,4,1);
  rect(12,12,6,1);
  rect(11,13,8,1);

  rect(3,16,4,1);
  rect(2,17,6,1);
  rect(1,18,8,1);
  rect(13,16,4,1);
  rect(12,17,6,1);
  rect(11,18,8,1);

  fill(255);
  rect(11,2,1,1);
  rect(6,7,1,1);
  rect(16,7,1,1);
  rect(6,12,1,1);
  rect(16,12,1,1);
  rect(6,17,1,1);
  rect(16,17,1,1);
  
  prize = get(0,0,20,20);
  
  background(0,187,212);
  fill(0);
  rect(13,4,7,12);
  rect(9,5,11,10);
  rect(6,6,14,8);
  fill(183,28,28);
  rect(3,7,17,2);
  rect(1,8,17,1);
  rect(3,11,17,2);
  rect(1,11,17,1);
  fill(0);
  rect(0,9,20,2);
  fill(158,158,158);
  rect(13,6,5,1);
  rect(12,7,3,1);
  rect(11,8,3,1);
  rect(10,9,3,2);
  rect(11,11,3,1);
  rect(12,12,3,1);
  rect(13,13,5,1);
  rect(16,9,2,2);
  rect(17,6,1,8);
  
  adv = get(0,0,20,20);
  
  background(0,187,212);
  noStroke();
  fill(63,81,181);
  rect(13,4,7,12);
  rect(9,5,11,10);
  rect(6,6,14,8);
  fill(255);
  rect(3,7,17,2);
  rect(1,8,17,1);
  rect(3,11,17,2);
  rect(1,11,17,1);
  fill(63,81,181);
  rect(0,9,20,2);
  fill(158,158,158);
  rect(13,6,5,1);
  rect(12,7,3,1);
  rect(11,8,3,1);
  rect(10,9,3,2);
  rect(11,11,3,1);
  rect(12,12,3,1);
  rect(13,13,5,1);
  rect(16,9,2,2);
  rect(17,6,1,8);
  
  mc = get(0,0,20,20);
  
  background(0,187,212);
  fill(255,86,34);
  rect(0,7,6,6);
  rect(7,0,6,6);
  rect(7,14,6,6);
  rect(14,7,6,6);
  rect(1,5,6,4);
  rect(5,1,4,6);
  rect(11,1,4,6);
  rect(1,11,6,4);
  rect(13,5,6,4);
  rect(5,13,4,6);
  rect(13,11,6,4);
  rect(11,13,4,6);
  fill(255);
  rect(3,2,2,4);
  rect(2,3,4,2);
  rect(4,3,2,4);
  rect(5,4,2,4);
  rect(4,5,4,2);
  rect(15,2,2,4);
  rect(12,5,4,2);
  rect(14,3,2,4);
  rect(13,4,2,4);
  rect(14,3,4,2);
  rect(5,12,2,4);
  rect(4,13,2,4);
  rect(3,14,2,4);
  rect(2,15,4,2);
  rect(4,13,4,2);
  rect(13,12,2,4);
  rect(14,13,2,4);
  rect(15,14,2,4);
  rect(12,13,4,2);
  rect(14,15,4,2);
  
  wall = get(0,0,20,20);
}

//this class represents a single bullet fired by the player
class bulletObj {
  constructor() {
    this.pos = new p5.Vector(0,0);
    this.fire = 0;
    this.step = new p5.Vector(0,0);
    this.angle = 0;
  }
  
  draw() {
    //controls angle of bullet and location of it
    fill(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle+PI/2)
    ellipse(0,0,2,6);
    pop();
    
    //increase bullet route based on the angle
    this.step.set(cos(this.angle),sin(this.angle));
    this.step.normalize();
    this.step.mult(4);//speed of bullets
    this.pos.sub(this.step);//advance bullet away from player

    //when touches enemy, bullet is gone and enemy is gone
    for (var i=0; i<adversaries.length; i++) { 
      if (dist(this.pos.x,this.pos.y,adversaries[i].pos.x, adversaries[i].pos.y) < 13) {
        adversaries.splice(i,1);
        this.fire = 0;
      }  
    }
    
    //when touches wall unit, bullet is gone
    for (var j=0; j<walls.length; j++) { 
      if (dist(this.pos.x,this.pos.y,walls[j].x+10, walls[j].y+10) < 13) {
        this.fire = 0;
      }  
    }
    
    //bullet collisions with borders
    if (!((this.pos.x-5 > 0) && (this.pos.y-5 > 0) && (this.pos.y-5 < 400) && (this.pos.x-5 < 1200))) {
        this.fire = 0;
      }
  }
}

//this class controls the graphics for the adversary
//and handles the movement of the enemy, as well as check
//for collision with the main character and walls
class advObj {
  constructor(x,y,dir) {
    this.pos = new p5.Vector(x,y);
    this.step = new p5.Vector(0,0);
    this.angle = 0;
  }
  
  draw() {
    push();
    //translate and rotate enemy
    translate(this.pos.x, this.pos.y);
    rotate(this.angle+PI);
    this.centercharx = this.pos.x-10;
    noStroke();
    //draw boat
    fill(0);
    rect(3,-6,7,12);
    rect(-1,-5,11,10);
    rect(-4,-4,14,8);
    fill(183,28,28);
    rect(-7,-3,17,2);
    rect(-9,-2,17,1);
    rect(-7,1,17,2);
    rect(-9,1,17,1);
    fill(0);
    rect(-10,-1,20,2);
    fill(158,158,158);
    rect(3,-4,5,1);
    rect(2,-3,3,1);
    rect(1,-2,3,1);
    rect(0,-1,3,2);
    rect(1,1,3,1);
    rect(2,2,3,1);
    rect(3,3,5,1);
    rect(6,-1,2,2);
    rect(7,-4,1,8);
    pop();
  }
  
  collision() {
    //if player comes close, then game over
    if (dist(this.pos.x,this.pos.y,posx,posy) <= 13) {
      dead = true;
      game = false;
    }
  }
  
  chase() {
    //only chase if under 120 units away
    if (dist(posx,posy,this.pos.x,this.pos.y) <= 120) {
      //calculate step vector to increment towards player
      this.step.set(posx-this.pos.x,posy-this.pos.y);
      this.step.normalize();
      this.angle = acos(this.step.x);
      this.step.mult(0.45);//scale for speed
      
      //find the closest wall to the current enemy
      let closest_wall = 0;
      let closest_dist = 1200;
      for (var i = 0; i < walls.length; i++) {
        if (closest_dist > dist(walls[i].x+10,walls[i].y+10,this.pos.x,this.pos.y)){
          closest_wall = i;
          closest_dist = dist(walls[i].x+10,walls[i].y+10,this.pos.x,this.pos.y);
        }
      }
      
      //this handles collisions with the border or any wall units
      if ((dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x,this.pos.y) > 14) && (dist(walls[closest_wall].x+10,walls[closest_wall].y+10,this.pos.x+this.step.x,this.pos.y+this.step.y) > 14) && (this.pos.x-10 > 0) && (this.pos.x-10+this.step.x > 0) && (this.pos.y-10 > 0) && (this.pos.y-10+this.step.y > 0) && (this.pos.y+10 < 400) && (this.pos.y+10+this.step.y < 400) && (this.pos.x+10 < 1200) && (this.pos.x+10+this.step.x < 1200)) {
        this.pos.add(this.step);
      }
    }
  }
}
var tilemap = [
  "                                                            ",
  "                          p                 p               ",
  "        p      w  p  e        e    w      w            e    ",
  "    e                                  e        e           ",
  "          e             w          p                        ",
  "                  w                         w   p           ",
  "  w    w      p       p     w   w        p           w   p  ",
  "                                                 w          ",
  "                                      e              e      ",
  "                 e   w     e      p        w                ",
  "       e     w                                  e    p      ",
  "                                              p             ",
  "                           w       w    p                   ",
  "         p       p  w         p                  w          ",
  "   w          w            e               e              c ",
  "                       p         e      w                   ",
  "                                                   e        ",
  "   p   e         w  e      w                  w          w  ",
  "                                      e              p      ",
  "                                                            "];

//current state of the game
var home = true;
var instructions = false;
var game = false;
var dead = false;
var win = false;

var mc;
var walls = [];
var wall;
var prizes = [];
var prize;
var adversaries = [];
var adv;
var bullets = [];
var score = 0;
var home_anim = 0;
var cloud_anim = 0;

var currFrameCount = 0;
var bulletIndex = 0;

var posx = 0;
var posy = 0;

var char_ang = 0;
var frame_slide = -970;
var frame_slide_y = -170;

function initTilemap() {
  //reset arrays and score counter
  score = 0;
  walls = [];
  prizes = [];
  adversaries = [];
  
  //fill arrays with tilemap contents
  //w:walls
  //c:player
  //p:prizes
  //e:enemies
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      switch (tilemap[i][j]) {
        case 'w':
          walls.push(new wallObj(j*20,i*20));
          break;
        case 'c':
          main_char = new charObj(j*20,i*20);
          break;
        case 'p':
          prizes.push(new prizeObj(j*20,i*20));
          break;
        case 'e':
          adversaries.push(new advObj(j*20,i*20,'h'));
          break;
      }
    }
  }
}

function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			

function setup() 
{

     //setup method which instantiates all of the objects that will be used in the logo animation.

     //createCanvas(400, 400); 
  	/* additional code added to the  game for hosting in website */
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
    //createCanvas(400, 400);
  
  //bullet object array - 9 bullets
  bullets = [new bulletObj(),new bulletObj(),new bulletObj(),new bulletObj(),new bulletObj(),new bulletObj(),new bulletObj(), new bulletObj(),new bulletObj()];
  //create custom characters and start
  //the tilemap
  customChars();
  initTilemap();
}

function draw() {
  background(0,187,212);
  if (instructions) {//instructions page
    //use wall graphics for border wall
    for (var j = 0; j < 400; j++) {
      image(wall,20*j,0,20,20)
      image(wall,20*j,380,20,20)
      image(wall,0,20*j,20,20)
      image(wall,380,20*j,20,20)
    }
    
    //instructions text
    fill(63,81,181);
    textSize(50);
    text('Instructions',35,75);
    fill(183,28,28);
    textSize(25);
    text('Collect all of the gold',45,125);
    text('Use right/left keys to rotate',45,165);
    text('Use up/down keys to move',45,205);
    text('forward or backward',45,235);
    text('Avoid enemy boats',45,275);
    text('Press Space to shoot',45,315);
    
    //buttons to navigate back home or to game
    textSize(20);
    text('Home',45,354);
    text('Play',292,354);
    noFill();
    strokeWeight(3);
    stroke(63,81,181)
    rect(42,334,87,25);
    rect(289,334,70,25);
    image(prize,104,337,20,20)
    image(mc,336,337,20,20)
    noStroke();
  } else if (game) {//game page
    //draw all assets
    push();
    translate(frame_slide, frame_slide_y);//center player
    noStroke();
    for (var i = 0; i < walls.length; i++) {
      walls[i].draw();
    }
    for (i = 0; i < prizes.length; i++) {
      prizes[i].draw();
    }
    //once a prize is collected, remove it
    //from the prizes array
    for (i = 0; i < prizes.length; i++) {
      if (prizes[i].collect()) {
        prizes.splice(i,1);
      }
    }
    
    //draw and control the main character
    main_char.draw();
    main_char.move();
    main_char.shoot();
    
    //for each enemy, draw and update their movements
    //also check for collision with main char
    for (i = 0; i < adversaries.length; i++) {
      adversaries[i].draw();
      adversaries[i].chase();
      adversaries[i].collision();
    }
    
    //use wall graphics for border wall
    for (var j = -1; j < 61; j++) {
      image(wall,20*j,-20,20,20)
      image(wall,20*j,400,20,20)
    }
    for (j = 0; j < 20; j++) {
      image(wall,-20,20*j,20,20)
      image(wall,1200,20*j,20,20)
    }
    pop();
  } else if (home) {//home page
    //sky
    fill(135,206,235);
    rect(0,0,400,150);
    
    //quick animation of main char being chased
    image(mc,400-home_anim,180,20,20)
    image(adv,470-home_anim,180,20,20)
    image(adv,500-home_anim,160,20,20)
    image(adv,500-home_anim,200,20,20)
    
    //decrement and reset counter when all graphics
    //are off screen
    home_anim+=2;
    if (home_anim >= 530) {
      home_anim = 0;
    }
    
    //clouds and animate similar to above
    fill(255)
    ellipse(0+cloud_anim,70,75,45)
    ellipse(10+cloud_anim,60,75,45)
    ellipse(20+cloud_anim,70,75,45)
    
    ellipse(120+cloud_anim,50,75,45)
    ellipse(130+cloud_anim,40,75,45)
    ellipse(140+cloud_anim,50,75,45)
    
    ellipse(240+cloud_anim,90,75,45)
    ellipse(250+cloud_anim,80,75,45)
    ellipse(260+cloud_anim,90,75,45)
    
    cloud_anim+=1;
    if (cloud_anim >= 438) {
      cloud_anim = -298;
    }
    
    //title
    fill(63,81,181);
    textSize(80);
    text('Boat',3,65);
    fill(183,28,28);
    text('Chase',158,135);
    
    //buttons for playing and instructions
    textSize(20);
    text('Play',185,250);
    text('Instructions',155,290);
    noFill();
    strokeWeight(3);
    stroke(63,81,181)
    rect(180,230,50,28)
    rect(150,270,112,28)
    noStroke();
  } else if (dead) {//lose page
    //death screen enemy assets
    fill(183,28,28);
    rect(0,0,400,400);
    fill(0,187,212);
    rect(0,100,400,200);
    push();
    translate(170,170);
    rotate(-PI/2);
    image(adv,5,0,60,60);
    rotate(PI);
    image(adv,65,-60,60,60);
    image(mc,0,-60,60,60);//player asset
    rotate(PI/2);
    image(adv,0,-60,60,60);
    rotate(PI);
    image(adv,60,0,60,60);
    pop();
    
    //buttons to go back home or play again
    fill(0);
    textSize(80);
    text('Captured',15,80);
    textSize(20);
    text('Play Again',240,355);
    text('Home',85,355);
    let adv_des = 20-adversaries.length;
    if (adv_des == 1) {
      text(adv_des+" Enemy Boat Destroyed",67,320);
    } else {
      text(adv_des+" Enemy Boats Destroyed",67,320);
    }
    noFill();
    strokeWeight(3);
    stroke(0)
    rect(82,336,59,24)
    rect(237,336,101,24)
    noStroke();
  } else if (win) {//win screen
    //win screen background
    fill(63,81,181);
    rect(0,0,400,400);
    fill(0,187,212);
    rect(0,100,400,200);
    
    //win screen assets
    image(mc,410-home_anim,170,60,60)
    image(prize,470-home_anim,170,60,60)
    image(prize,530-home_anim,170,60,60)
    image(prize,590-home_anim,170,60,60)
    
    //animate boat and gold going across, reusing home_anim
    home_anim+=2;
    if (home_anim >= 650) {
      home_anim = 0;
    }
    
    //win text and buttons to
    //play again or go home
    fill(255);
    textSize(80);
    text('Escaped',30,80);
    textSize(20);
    let adv_des = 20-adversaries.length;
    if (adv_des == 1) {
      text(adv_des+" Enemy Boat Destroyed",67,320);
    } else {
      text(adv_des+" Enemy Boats Destroyed",67,320);
    }
    text('Play Again',240,355);
    text('Home',85,355);
    noFill();
    strokeWeight(3);
    stroke(255)
    rect(82,336,59,24)
    rect(237,336,101,24)
    noStroke();
  }
}

function mouseClicked() {
  if (instructions) {
    //first is bounds for home button, second is for play again
    if (mouseX > 42 && mouseX < 129 && mouseY > 334 && mouseY < 359) {
      home = true;
      instructions = false;
    } else if (mouseX > 289 && mouseX < 379 && mouseY > 334 && mouseY < 359) {
      game = true;
      instructions = false;
      //reset to tilemap so if any prizes were taken, they are put back
      //and main character goes back to start
      initTilemap();
    }
  } else if (home) {
    //first is bounds for play button, second is for instructions
    if (mouseX > 180 && mouseX < 230 && mouseY > 230 && mouseY < 258) {
      game = true;
      home = false;
      //reset to tilemap so if any prizes were taken, they are put back
      //and main character goes back to start
      initTilemap();
    } else if (mouseX > 150 && mouseX < 262 && mouseY > 270 && mouseY < 298) {
      instructions = true;
      home = false;
    }
  } else if (dead) {
    frame_slide = 0;
    //first is bounds for home button, second is for play again
    if (mouseX > 82 && mouseX < 141 && mouseY > 336 && mouseY < 360) {
      home = true;
      dead = false;
    } else if (mouseX > 237 && mouseX < 338 && mouseY > 336 && mouseY < 360) {
      game = true;
      dead = false;
      //reset to tilemap so if any prizes were taken, they are put back
      //and main character goes back to start
      initTilemap();
    }
  } else if (win) {
    frame_slide = 0;
    //first is bounds for home button, second is for play again
    if (mouseX > 82 && mouseX < 141 && mouseY > 336 && mouseY < 360) {
      home = true;
      win = false;
    } else if (mouseX > 237 && mouseX < 338 && mouseY > 336 && mouseY < 360) {
      game = true;
      win = false;
      //reset to tilemap so if any prizes were taken, they are put back
      //and main character goes back to start
      initTilemap();
    }
  }
}