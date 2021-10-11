var tilemap = [
  "                                        ",
  "                                        ",
  "         e   p           p              ",
  "         wwwwwwwwwwwwwwwwwwwww          ",
  "                                        ",
  "     p                p        e p      ",
  "     wwwwwwwwwwww     wwwwwwwwwwww      ",
  "                                        ",
  "           e  p    p    p               ",
  "         wwwwww  wwwww  wwwwww          ",
  "                                        ",
  "    p        e p       p          p     ",
  "   wwww      wwwwwwwwwwwww      wwww    ",
  "                                        ",
  "     p  e  p               p  e  p      ",
  "  wwwwwwwwwwwww         wwwwwwwwwwwww   ",
  "                                        ",
  "e   p      p       c       p       p   e",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];

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
var score = 0;
var home_anim = 0;
var cloud_anim = 0;

var jumpForce;
var gravity;
var mc_vel;

var curytile_mc;
var curxtile_mc;
var posx = 0,posy = 0;
var jump_mc;

var frame_slide = -600;

//this class takes in coordinates for the wall block
//and then draws them at those coordinates
class wallObj {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    fill(184,142,124);
    rect(this.x,this.y,20,20);
    fill(91,70,61);
    rect(this.x,this.y+4,20,1);
    rect(this.x,this.y+9,20,1);
    rect(this.x,this.y+14,20,1);
    rect(this.x,this.y+19,20,1);
    rect(this.x+5,this.y+1,2,1);
    rect(this.x+7,this.y,1,1);
    rect(this.x+2,this.y,1,4);
    rect(this.x+4,this.y+2,1,3);
    rect(this.x+12,this.y,1,4);
    rect(this.x+15,this.y+2,1,2);
    rect(this.x,this.y+5,1,4);
    rect(this.x+7,this.y+5,1,2);
    rect(this.x+6,this.y+7,1,2);
    rect(this.x+10,this.y+5,1,4);
    rect(this.x+16,this.y+5,1,4);
    rect(this.x+3,this.y+10,1,4);
    rect(this.x+5,this.y+10,1,4);
    rect(this.x+13,this.y+10,1,4);
    rect(this.x+18,this.y+10,1,3);
    rect(this.x+17,this.y+13,1,1);
    rect(this.x+1,this.y+15,1,4);
    rect(this.x+8,this.y+15,1,3);
    rect(this.x+9,this.y+17,1,2);
    rect(this.x+11,this.y+15,1,4);
    rect(this.x+15,this.y+15,1,3);
    rect(this.x+16,this.y+18,1,1);
  }
}

//this class manages the wandering state for enemies
class wanderState {
  constructor() {
    //possible actions: jump, move left, move right
    this.action = int(random(3));
    this.rdist = int(random(50,149));//distance until next action
  }
  
  execute(me) {
    //print(this.action)
    let prev_act = this.action;
    if (this.rdist <= 0 || (me.pos.x >= 780 || me.pos.x <= 20)) {
      this.action = int(random(3));//make new action
      while (this.action == prev_act) {
        //if new action is same, refresh
        this.action = int(random(3));
      }
      this.rdist = int(random(50,149));//new distance
    }
    this.rdist--;//decrement distance
    
    //implement actions
    if (this.action == 0 && me.pos.x < 780) {
      me.pos.x+=me.step;
    } else if (this.action == 1 && me.pos.x > 0) {
      me.pos.x-=me.step;
    } else if (this.action == 2 && me.jump == 0) {
      me.jump = 2;
    }
    
    //when less than 120px, initiate chasestate
    if (dist(me.pos.x+10,me.pos.y+10,posx+10,posy+10) < 120) {
      me.changeState(1);
    }
  }
}

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
    if (dist(this.x+10,this.y+10,posx,posy) <= 20) {
      score++;
      //if the score is 20, then the game ends and the player wins
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
    //set up physics vectors and forces
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;//initialize to on ground
  }
  
  draw() {
    if (this.jump == 0) {//when on ground
      noStroke();
      fill(139,69,19);
      rect(this.pos.x+7,this.pos.y,6,1);
      rect(this.pos.x+6,this.pos.y+1,8,1);
      rect(this.pos.x+5,this.pos.y+2,10,2);
      rect(this.pos.x+5,this.pos.y+13,10,1);
      rect(this.pos.x+4,this.pos.y+14,12,1);
      rect(this.pos.x+3,this.pos.y+15,14,1);
      rect(this.pos.x+4,this.pos.y+16,1,1);
      rect(this.pos.x+15,this.pos.y+16,1,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+4,10,1);
      fill(139,69,19);
      rect(this.pos.x+1,this.pos.y+5,18,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+6,2,1);
      rect(this.pos.x+13,this.pos.y+6,2,1);
      fill(198,134,66)
      rect(this.pos.x+7,this.pos.y+6,6,1);
      rect(this.pos.x+5,this.pos.y+7,10,1);
      fill(255);
      rect(this.pos.x+7,this.pos.y+7,2,1);
      rect(this.pos.x+11,this.pos.y+7,2,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+7,1,1);
      rect(this.pos.x+14,this.pos.y+7,1,1);
      fill(198,134,66);
      rect(this.pos.x+5,this.pos.y+8,10,1);
      fill(84,42,14);
      rect(this.pos.x+7,this.pos.y+8,2,1);
      rect(this.pos.x+11,this.pos.y+8,2,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+9,1,1);
      rect(this.pos.x+14,this.pos.y+9,1,1);
      fill(198,134,66);
      rect(this.pos.x+6,this.pos.y+9,8,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+10,10,1);
      fill(198,134,66);
      rect(this.pos.x+7,this.pos.y+10,1,1);
      rect(this.pos.x+12,this.pos.y+10,1,1);
      rect(this.pos.x+8,this.pos.y+11,4,1);
      fill(0);
      rect(this.pos.x+6,this.pos.y+11,2,1);
      rect(this.pos.x+12,this.pos.y+11,2,1);
      rect(this.pos.x+7,this.pos.y+12,6,1);
      rect(this.pos.x+8,this.pos.y+13,4,1);
      rect(this.pos.x+6,this.pos.y+16,8,1);
      rect(this.pos.x+4,this.pos.y+19,4,1);
      rect(this.pos.x+12,this.pos.y+19,4,1);
      fill(255);
      rect(this.pos.x+8,this.pos.y+14,2,1);
      rect(this.pos.x+11,this.pos.y+14,1,1);
      rect(this.pos.x+8,this.pos.y+15,1,1);
      rect(this.pos.x+10,this.pos.y+15,2,1);
      fill(198,134,66);
      rect(this.pos.x+2,this.pos.y+16,2,2);
      rect(this.pos.x+16,this.pos.y+16,2,2);
      fill(194,176,145);
      rect(this.pos.x+6,this.pos.y+17,8,1);
      rect(this.pos.x+5,this.pos.y+18,4,1);
      rect(this.pos.x+11,this.pos.y+18,4,1);
    } else {//in air
      noStroke();
      fill(139,69,19);
      rect(this.pos.x+7,this.pos.y,6,1);
      rect(this.pos.x+6,this.pos.y+1,8,1);
      rect(this.pos.x+5,this.pos.y+2,10,2);
      rect(this.pos.x+5,this.pos.y+13,10,1);
      rect(this.pos.x+5,this.pos.y+13,3,3);
      rect(this.pos.x+12,this.pos.y+13,3,3);
      rect(this.pos.x+4,this.pos.y+12,1,3);
      rect(this.pos.x+3,this.pos.y+13,1,1);
      rect(this.pos.x+15,this.pos.y+12,1,3);
      rect(this.pos.x+16,this.pos.y+13,1,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+4,10,1);
      fill(139,69,19);
      rect(this.pos.x+1,this.pos.y+5,18,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+6,2,1);
      rect(this.pos.x+13,this.pos.y+6,2,1);
      fill(198,134,66)
      rect(this.pos.x+7,this.pos.y+6,6,1);
      rect(this.pos.x+5,this.pos.y+7,10,1);
      fill(255);
      rect(this.pos.x+7,this.pos.y+7,2,1);
      rect(this.pos.x+11,this.pos.y+7,2,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+7,1,1);
      rect(this.pos.x+14,this.pos.y+7,1,1);
      fill(198,134,66);
      rect(this.pos.x+5,this.pos.y+8,10,1);
      fill(84,42,14);
      rect(this.pos.x+7,this.pos.y+8,2,1);
      rect(this.pos.x+11,this.pos.y+8,2,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+9,1,1);
      rect(this.pos.x+14,this.pos.y+9,1,1);
      fill(198,134,66);
      rect(this.pos.x+6,this.pos.y+9,8,1);
      fill(0);
      rect(this.pos.x+5,this.pos.y+10,10,1);
      fill(198,134,66);
      rect(this.pos.x+7,this.pos.y+10,1,1);
      rect(this.pos.x+12,this.pos.y+10,1,1);
      rect(this.pos.x+8,this.pos.y+11,4,1);
      fill(0);
      rect(this.pos.x+6,this.pos.y+11,2,1);
      rect(this.pos.x+12,this.pos.y+11,2,1);
      rect(this.pos.x+7,this.pos.y+12,6,1);
      rect(this.pos.x+8,this.pos.y+13,4,1);
      rect(this.pos.x+6,this.pos.y+16,8,1);
      rect(this.pos.x+4,this.pos.y+19,4,1);
      rect(this.pos.x+12,this.pos.y+19,4,1);
      fill(255);
      rect(this.pos.x+8,this.pos.y+14,2,1);
      rect(this.pos.x+11,this.pos.y+14,1,1);
      rect(this.pos.x+8,this.pos.y+15,1,1);
      rect(this.pos.x+10,this.pos.y+15,2,1);
      fill(198,134,66);
      rect(this.pos.x+2,this.pos.y+11,2,2);
      rect(this.pos.x+16,this.pos.y+11,2,2);
      fill(194,176,145);
      rect(this.pos.x+6,this.pos.y+17,8,1);
      rect(this.pos.x+5,this.pos.y+18,4,1);
      rect(this.pos.x+11,this.pos.y+18,4,1);
    }
  }
  
  move() {
    //vars for the current velocity and position
    mc_vel = this.velocity;
    posx = this.pos.x;
    posy = this.pos.y;
    this.acceleration.set(0, 0);//set initial no acceleration
    frame_slide = -(this.pos.x-190);//for moving frame
    
    //current tile in tilemap
    curytile_mc = Math.floor((this.pos.x+10)/20);
    curxtile_mc = Math.floor((this.pos.y+10)/20);
    //check if WASD keys or arrows keys are held down
    //and if there is a wall in the direction the player wants
    //to move
    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && this.pos.x > 0) {
      this.pos.x-=5;
    } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && this.pos.x < 780) {
      this.pos.x+=5;
    }
    
    //find walls closest to player (lower, middle, upper)
    let closest_wall = 0;
    let closest_dist = 1200;
    let closest_wall_low = 0;
    let closest_dist_low = 1200;
    let closest_wall_mid = 0;
    let closest_dist_mid = 1200;
    for (var i = 0; i < walls.length; i++) {
      if ((this.pos.x >= walls[i].x && this.pos.x+20 <= walls[i].x+39) || (this.pos.x+20 <= walls[i].x+20 && this.pos.x >= walls[i].x-19)) {
        if (this.pos.y > walls[i].y) {
        if (closest_dist > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall = i;
            closest_dist = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
        else if (this.pos.y <= walls[i].y-20){
          if (closest_dist_low > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall_low = i;
            closest_dist_low = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
        else {
          if (closest_dist_mid > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall_mid = i;
            closest_dist_mid = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
      }
      
    }
    
    //checks when to land on a platform
    if (this.pos.y > walls[closest_wall_mid].y-20 && closest_dist_mid <= 20 && this.velocity.y > 0 && tilemap[curxtile_mc+1][curytile_mc] == 'w') {
      this.pos.y = walls[closest_wall_mid].y-20;
      this.velocity.y = 0;
      this.jump = 0;
    }
    
    //checks if it should be midair based on if there is no 
    //wall under it
    if (this.pos.y >= 0 && tilemap[curxtile_mc+1][curytile_mc] != 'w') {
        this.jump = 1;
    }
    
    //apply force when up
    if (this.jump === 2) {
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    if (this.jump > 0) {//gravity effects in midair
      this.applyForce(gravity);
    }
    //add vel and pos, and reset acceleration
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.set(0, 0);
    jump_mc = this.jump;//record main char jump
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
}

function keyPressed() {
  //check for pressing up
  if ((keyCode == UP_ARROW || keyCode == 87) && (main_char.jump == 0)) {
    main_char.jump = 2;
  }
}

//this creates customchars to use throughout the game
//only the prize custom chars are used in the game page
//all other custom chars were created to use as assets in the 
//home screen or win/loss screens
function customChars() {
  noStroke();
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
  
  background(237,201,175);
  noStroke();
  fill(0);
  rect(2,11,2,2);
  rect(3,12,2,2);
  rect(4,14,1,1);
  rect(16,11,2,2);
  rect(15,12,2,2);
  rect(15,14,1,1);
  rect(7,0,6,1);
  rect(6,1,8,1);
  rect(5,2,10,1);
  rect(4,3,12,7);
  rect(5,10,10,1);
  rect(6,11,8,1);
  rect(7,12,6,1);
  rect(5,13,10,1);
  rect(5,14,10,1);
  rect(5,15,10,1);
  rect(6,16,8,2);
  rect(5,18,4,1);
  rect(11,18,4,1);
  rect(4,19,4,1);
  rect(12,19,4,1);
  fill(255);
  rect(7,1,6,1);
  rect(6,2,7,1);
  rect(5,3,4,1);
  rect(14,3,1,2);
  rect(10,4,2,1);
  rect(7,5,4,2);
  rect(11,7,4,1);
  rect(5,7,1,2);
  rect(6,8,4,1);
  rect(8,9,7,1);
  rect(6,10,1,1);
  rect(10,10,4,1);
  rect(7,11,2,1);
  rect(8,13,3,1);
  rect(5,14,4,1);
  rect(12,14,3,1);
  rect(11,15,2,1);
  rect(7,16,4,1);
  rect(7,17,2,1);
  rect(11,17,2,1);
  rect(6,18,2,1);
  rect(12,18,2,1);
  fill(255,0,0);
  rect(5,5,4,1);
  rect(7,6,2,1);
  rect(12,4,2,4);
  rect(11,5,4,2);
  
  adv = get(0,0,20,20);
  
  background(237,201,175);
  noStroke();
  fill(139,69,19);
  rect(7,0,6,1);
  rect(6,1,8,1);
  rect(5,2,10,2);
  rect(5,13,10,1);
  rect(4,14,12,1);
  rect(3,15,14,1);
  rect(4,16,1,1);
  rect(15,16,1,1);
  fill(0);
  rect(5,4,10,1);
  fill(139,69,19);
  rect(1,5,18,1);
  fill(0);
  rect(5,6,2,1);
  rect(13,6,2,1);
  fill(198,134,66)
  rect(7,6,6,1);
  rect(5,7,10,1);
  fill(255);
  rect(7,7,2,1);
  rect(11,7,2,1);
  fill(0);
  rect(5,7,1,1);
  rect(14,7,1,1);
  fill(198,134,66);
  rect(5,8,10,1);
  fill(84,42,14);
  rect(7,8,2,1);
  rect(11,8,2,1);
  fill(0);
  rect(5,9,1,1);
  rect(14,9,1,1);
  fill(198,134,66);
  rect(6,9,8,1);
  fill(0);
  rect(5,10,10,1);
  fill(198,134,66);
  rect(7,10,1,1);
  rect(12,10,1,1);
  rect(8,11,4,1);
  fill(0);
  rect(6,11,2,1);
  rect(12,11,2,1);
  rect(7,12,6,1);
  rect(8,13,4,1);
  rect(6,16,8,1);
  rect(4,19,4,1);
  rect(12,19,4,1);
  fill(255);
  rect(8,14,2,1);
  rect(11,14,1,1);
  rect(8,15,1,1);
  rect(10,15,2,1);
  fill(198,134,66);
  rect(2,16,2,2);
  rect(16,16,2,2);
  fill(194,176,145);
  rect(6,17,8,1);
  rect(5,18,4,1);
  rect(11,18,4,1);
  
  mc = get(0,0,20,20);
  
  fill(184,142,124);
  rect(0,0,20,20);
  fill(91,70,61);
  rect(0,4,20,1);
  rect(0,9,20,1);
  rect(0,14,20,1);
  rect(0,19,20,1);
  rect(5,1,2,1);
  rect(7,0,1,1);
  rect(2,0,1,4);
  rect(4,2,1,3);
  rect(12,0,1,4);
  rect(15,2,1,2);
  rect(0,5,1,4);
  rect(7,5,1,2);
  rect(6,7,1,2);
  rect(10,5,1,4);
  rect(16,5,1,4);
  rect(3,10,1,4);
  rect(5,10,1,4);
  rect(13,10,1,4);
  rect(18,10,1,3);
  rect(17,13,1,1);
  rect(1,15,1,4);
  rect(8,15,1,3);
  rect(9,17,1,2);
  rect(11,15,1,4);
  rect(15,15,1,3);
  rect(16,18,1,1);
  
  wall = get(0,0,20,20);
}

//this class manages the chase state for enemies
class chaseState {
  constructor() {
    //possible actions: jump, move left, move right
    this.action = int(random(3));
    this.rdist = int(random(50,149));//distance until next action
  }
  
  execute(me) {
    //jump if lower than main char otherwise chase
    if (posy+20 < me.pos.y && jump_mc == 0 && me.jump == 0) {
      me.jump = 2;
    } else if (me.pos.y <= posy && me.jump == 0) {
      me.pos.x+=(posx - me.pos.x)/20;
    }
    
    //change to wandering if more than 120px
    if (dist(me.pos.x+10,me.pos.y+10,posx+10,posy+10) >= 120) {
      me.changeState(0);
    }
  }
}

//this class controls the graphics for the adversary
//and handles the movement of the enemy, as well as check
//for collision with the main character
class advObj {
  constructor(x,y) {
    this.pos = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    //stores all possible states
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;//relates to index of this.state
    this.step = 1;
  }
  
  changeState(x) {//update to new state
    this.currState = x;
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  draw() {
    if (this.jump == 0) {//when on ground
      fill(0);
      rect(this.pos.x+2,this.pos.y+16,2,2);
      rect(this.pos.x+3,this.pos.y+15,2,2);
      rect(this.pos.x+4,this.pos.y+14,1,1);
      rect(this.pos.x+16,this.pos.y+16,2,2);
      rect(this.pos.x+15,this.pos.y+15,2,2);
      rect(this.pos.x+15,this.pos.y+14,1,1);
      rect(this.pos.x+7,this.pos.y,6,1);
      rect(this.pos.x+6,this.pos.y+1,8,1);
      rect(this.pos.x+5,this.pos.y+2,10,1);
      rect(this.pos.x+4,this.pos.y+3,12,7);
      rect(this.pos.x+5,this.pos.y+10,10,1);
      rect(this.pos.x+6,this.pos.y+11,8,1);
      rect(this.pos.x+7,this.pos.y+12,6,1);
      rect(this.pos.x+5,this.pos.y+13,10,1);
      rect(this.pos.x+5,this.pos.y+14,10,1);
      rect(this.pos.x+5,this.pos.y+15,10,1);
      rect(this.pos.x+6,this.pos.y+16,8,2);
      rect(this.pos.x+5,this.pos.y+18,4,1);
      rect(this.pos.x+11,this.pos.y+18,4,1);
      rect(this.pos.x+4,this.pos.y+19,4,1);
      rect(this.pos.x+12,this.pos.y+19,4,1);
      fill(255);
      rect(this.pos.x+7,this.pos.y+1,6,1);
      rect(this.pos.x+6,this.pos.y+2,7,1);
      rect(this.pos.x+5,this.pos.y+3,4,1);
      rect(this.pos.x+14,this.pos.y+3,1,2);
      rect(this.pos.x+10,this.pos.y+4,2,1);
      rect(this.pos.x+7,this.pos.y+5,4,2);
      rect(this.pos.x+11,this.pos.y+7,4,1);
      rect(this.pos.x+5,this.pos.y+7,1,2);
      rect(this.pos.x+6,this.pos.y+8,4,1);
      rect(this.pos.x+8,this.pos.y+9,7,1);
      rect(this.pos.x+6,this.pos.y+10,1,1);
      rect(this.pos.x+10,this.pos.y+10,4,1);
      rect(this.pos.x+7,this.pos.y+11,2,1);
      rect(this.pos.x+8,this.pos.y+13,3,1);
      rect(this.pos.x+5,this.pos.y+14,4,1);
      rect(this.pos.x+12,this.pos.y+14,3,1);
      rect(this.pos.x+11,this.pos.y+15,2,1);
      rect(this.pos.x+7,this.pos.y+16,4,1);
      rect(this.pos.x+7,this.pos.y+17,2,1);
      rect(this.pos.x+11,this.pos.y+17,2,1);
      rect(this.pos.x+6,this.pos.y+18,2,1);
      rect(this.pos.x+12,this.pos.y+18,2,1);
      fill(255,0,0);
      rect(this.pos.x+5,this.pos.y+5,4,1);
      rect(this.pos.x+7,this.pos.y+6,2,1);
      rect(this.pos.x+12,this.pos.y+4,2,4);
      rect(this.pos.x+11,this.pos.y+5,4,2);
    } else {//when in air
      fill(0);
      rect(this.pos.x+2,this.pos.y+11,2,2);
      rect(this.pos.x+3,this.pos.y+12,2,2);
      rect(this.pos.x+4,this.pos.y+14,1,1);
      rect(this.pos.x+16,this.pos.y+11,2,2);
      rect(this.pos.x+15,this.pos.y+12,2,2);
      rect(this.pos.x+15,this.pos.y+14,1,1);
      rect(this.pos.x+7,this.pos.y,6,1);
      rect(this.pos.x+6,this.pos.y+1,8,1);
      rect(this.pos.x+5,this.pos.y+2,10,1);
      rect(this.pos.x+4,this.pos.y+3,12,7);
      rect(this.pos.x+5,this.pos.y+10,10,1);
      rect(this.pos.x+6,this.pos.y+11,8,1);
      rect(this.pos.x+7,this.pos.y+12,6,1);
      rect(this.pos.x+5,this.pos.y+13,10,1);
      rect(this.pos.x+5,this.pos.y+14,10,1);
      rect(this.pos.x+5,this.pos.y+15,10,1);
      rect(this.pos.x+6,this.pos.y+16,8,2);
      rect(this.pos.x+5,this.pos.y+18,4,1);
      rect(this.pos.x+11,this.pos.y+18,4,1);
      rect(this.pos.x+4,this.pos.y+19,4,1);
      rect(this.pos.x+12,this.pos.y+19,4,1);
      fill(255);
      rect(this.pos.x+7,this.pos.y+1,6,1);
      rect(this.pos.x+6,this.pos.y+2,7,1);
      rect(this.pos.x+5,this.pos.y+3,4,1);
      rect(this.pos.x+14,this.pos.y+3,1,2);
      rect(this.pos.x+10,this.pos.y+4,2,1);
      rect(this.pos.x+7,this.pos.y+5,4,2);
      rect(this.pos.x+11,this.pos.y+7,4,1);
      rect(this.pos.x+5,this.pos.y+7,1,2);
      rect(this.pos.x+6,this.pos.y+8,4,1);
      rect(this.pos.x+8,this.pos.y+9,7,1);
      rect(this.pos.x+6,this.pos.y+10,1,1);
      rect(this.pos.x+10,this.pos.y+10,4,1);
      rect(this.pos.x+7,this.pos.y+11,2,1);
      rect(this.pos.x+8,this.pos.y+13,3,1);
      rect(this.pos.x+5,this.pos.y+14,4,1);
      rect(this.pos.x+12,this.pos.y+14,3,1);
      rect(this.pos.x+11,this.pos.y+15,2,1);
      rect(this.pos.x+7,this.pos.y+16,4,1);
      rect(this.pos.x+7,this.pos.y+17,2,1);
      rect(this.pos.x+11,this.pos.y+17,2,1);
      rect(this.pos.x+6,this.pos.y+18,2,1);
      rect(this.pos.x+12,this.pos.y+18,2,1);
      fill(255,0,0);
      rect(this.pos.x+5,this.pos.y+5,4,1);
      rect(this.pos.x+7,this.pos.y+6,2,1);
      rect(this.pos.x+12,this.pos.y+4,2,4);
      rect(this.pos.x+11,this.pos.y+5,4,2);
    }
  }
  
  update() {
    //determine current tile that corresponds to location
    let curytile_mo = Math.floor((this.pos.x+10)/20);
    let curxtile_mo = Math.floor((this.pos.y+10)/20);
    
    //we are finding the wall above and below
    //also checks if in between walls and records that
    let closest_wall = 0;
    let closest_dist = 1200;
    let closest_wall_low = 0;
    let closest_dist_low = 1200;
    let closest_wall_mid = 0;
    let closest_dist_mid = 1200;
    for (var i = 0; i < walls.length; i++) {
      if ((this.pos.x >= walls[i].x && this.pos.x+20 <= walls[i].x+39) || (this.pos.x+20 <= walls[i].x+20 && this.pos.x >= walls[i].x-19)) {
        if (this.pos.y > walls[i].y) {
        if (closest_dist > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall = i;
            closest_dist = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
        else if (this.pos.y <= walls[i].y-20){
          if (closest_dist_low > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall_low = i;
            closest_dist_low = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
        else {
          if (closest_dist_mid > dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10)) {
            closest_wall_mid = i;
            closest_dist_mid = dist(walls[i].x+10,walls[i].y+10,this.pos.x+10,this.pos.y+10);
          }
        }
      }
    }
    
    //checks when to land on a platform
    if (this.pos.y > walls[closest_wall_mid].y-20 && closest_dist_mid <= 20 && this.velocity.y > 0 && tilemap[curxtile_mo+1][curytile_mo] == 'w') {
      this.pos.y = walls[closest_wall_mid].y-20;
      this.velocity.y = 0;
      this.jump = 0;
    }
    
    //checks if it should be midair based on if there is no 
    //wall under it
    if (this.pos.y >= 0 && tilemap[curxtile_mo+1][curytile_mo] != 'w') {
        this.jump = 1;
    }
    
    //apply force when up is pressed
    if (this.jump === 2) {
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    if (this.jump > 0) {
      this.applyForce(gravity);
    }
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.set(0, 0);
  }
  
  bounce() {//this checks if the player has landed on top of adv
    if (((posx+20 <= this.pos.x+20 && posx+20 >= this.pos.x) || (posx >= this.pos.x && posx <= this.pos.x+20)) && mc_vel.y > 0 && (posy+20 >= this.pos.y && posy <= this.pos.y)) {
      return true;
    } else {
      return false;
    }
  }
  
  collision() {
    //ends game if adv touches player
    if (((posy+20 <= this.pos.y+20 && posy+20 >= this.pos.y) || (posy >= this.pos.y && posy <= this.pos.y+20)) && ((posx+20 <= this.pos.x+20 && posx+20 >= this.pos.x) || (posx >= this.pos.x && posx <= this.pos.x+20))) {
      if (this.bounce() == false) {
        dead = true;
        game = false;
      }
    }
  }
}

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
          adversaries.push(new advObj(j*20,i*20));
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
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 


  //createCanvas(400, 400);
  
  gravity = new p5.Vector(0, 0.1);
  jumpForce = new p5.Vector(0, -4);
  //create custom characters and start
  //the tilemap
  customChars();
  initTilemap();
}

function draw() {
  background(237,201,175);
  //reset to default frameRate
  frameRate(60);
  if (instructions) {//instructions page
    //use wall graphics for border wall
    for (var j = 0; j < 400; j++) {
      image(wall,20*j,0,20,20)
      image(wall,20*j,380,20,20)
      image(wall,0,20*j,20,20)
      image(wall,380,20*j,20,20)
    }
    
    //inner yellow border
    fill(255,235,59);
    rect(20,20,360,360);
    fill(237,201,175);
    rect(40,40,320,320);
    
    //instructions text
    fill(255,235,59);
    textSize(50);
    text('Instructions',45,85);
    fill(184,142,124);
    textSize(30);
    text('Collect all of the gold',45,165);
    text('Use arrow keys or ',45,215);
    text('WASD to move',45,245);
    text('Avoid touching the',45,295);
    text('mummies; you will die',45,325);
    
    //buttons to navigate back home or to game
    textSize(20);
    text('Home',45,354);
    text('Play',292,354);
    noFill();
    strokeWeight(3);
    stroke(184,142,124)
    rect(42,334,87,25);
    rect(289,334,70,25);
    image(prize,104,337,20,20)
    image(mc,336,337,20,20)
    noStroke();
  } else if (game) {//game page
    //draw all assets
    push();
    translate(frame_slide, 0);//center player
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
    
    //for each enemy, draw and update their movements
    //also check for collision with main char
    for (i = 0; i < adversaries.length; i++) {
      adversaries[i].draw();
      adversaries[i].update();
      adversaries[i].state[adversaries[i].currState].execute(adversaries[i]);
      adversaries[i].collision();
      if (adversaries[i].bounce()) {
        adversaries.splice(i,1);
      }
    }
    pop();
  } else if (home) {//home page
    //sky
    fill(135,206,235);
    rect(0,0,400,150);
    
    //quick animation of main char being chased
    image(mc,400-home_anim,180,20,20)
    image(adv,470-home_anim,180,20,20)
    image(adv,490-home_anim,180,20,20)
    image(adv,510-home_anim,180,20,20)
    
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
    fill(255,235,59);
    textSize(80);
    text('Gold',107,100);
    
    //buttons for playing and instructions
    textSize(20);
    text('Play',185,250);
    text('Instructions',155,290);
    noFill();
    strokeWeight(3);
    stroke(184,142,124)
    rect(180,230,50,28)
    rect(150,270,112,28)
    noStroke();
  } else if (dead) {//lose page
    //death screen enemy assets
    fill(0);
    rect(0,0,400,400);
    fill(237,201,175);
    rect(0,100,400,200);
    image(adv,170,140,60,60);
    image(adv,230,200,60,60);
    image(adv,110,200,60,60);
    
    //buttons to go back home or play again
    fill(255);
    textSize(20);
    let adv_des = 8-adversaries.length;
    if (adv_des == 1) {
      text(adv_des+" Enemy Stomped",97,320);
    } else {
      text(adv_des+" Enemies Stomped",97,320);
    }
    textSize(80);
    text('You Died',40,80);
    textSize(20);
    text('Play Again',240,355);
    text('Home',85,355);
    noFill();
    strokeWeight(3);
    stroke(255)
    rect(82,336,59,24)
    rect(237,336,101,24)
    noStroke();
    
    //rotate main char 
    rotate(PI / 2);
    imageMode(CENTER);
    image(mc,230,-200,60,60);
    imageMode(CORNER);
  } else if (win) {//win screen
    //win screen background
    fill(0);
    rect(0,0,400,400);
    fill(237,201,175);
    rect(0,100,400,200);
    
    //win screen assets
    image(mc,170,170,60,60)
    image(prize,230,170,60,60)
    image(prize,290,170,60,60)
    image(prize,110,170,60,60)
    image(prize,50,170,60,60)
    image(prize,80,110,60,60)
    image(prize,140,110,60,60)
    image(prize,200,110,60,60)
    image(prize,260,110,60,60)
    
    //You Won text and buttons to
    //play again or go home
    fill(255);
    textSize(20);
    let adv_des = 8-adversaries.length;
    if (adv_des == 1) {
      text(adv_des+" Enemy Stomped",97,320);
    } else {
      text(adv_des+" Enemies Stomped",97,320);
    }
    textSize(80);
    text('You Won',40,80);
    textSize(20);
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