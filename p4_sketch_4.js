/* Forklift Jones vs. OSHA
*
*  This is a simple platformer where you play as a forklift, trying to commit (collect) 20 OSHA Violations (coins)
*  while at a construction site
*
*  The enemies are Personal Protective Equipment (PPEs): Hardhats and High-visibility Vests
*
*  The platforms are made to be steel girders (specifically I-beams)
*
*  I thought the idea was funny so I made a game out of it.
*  Should it be in the showcase? I think so, I need to get my message out there.
*
*  NOTE: The background of the menus are ment to bricks, for a construction site aesthetic
*/

//40x20 tile map (800x400 map)
var tiles = [
  "oo               o              o       ",
  "gr                             lggr    v",
  "                lgr                    l",
  "         ov               olr           ",
  "       lgggr                           o",
  "   g             o                     l",
  "                 g               lr     ",
  "        vo                o h           ",
  "       lggr             lggggr          ",
  " o                                      ",
  "gggr               oh              v o  ",
  "                   lr    o         lgggg",
  "o      o                lgr             ",
  "      lr                                ",
  "                o                       ",
  "h                              g       o",
  "r       lgggr         o                l",
  "                      lr                ",
  "                                        ",
  "      p  o                    h         ",
 
]
//Player variable
var p;
//Custom Characters
var customs  = [];
//GameState variable, controls a win or loss
var gameState = 0;

//Logo to appear on the title screen, spaced weirdly so it shows up
//As intended
var logo = "       Forklift Jones \n                vs.\nThe Occupational Safety\n               and\n Health Administration!"

//Tagline on the instructions screen
var tagline = "Remember Kids! Say NO to OSHA regulations!";

//Name of the Hard Hat Enemy
var nameH   = "Hard-Hat Harry:";

//Name of the Vest Enemy
var nameV   = "Vinny the Vest:";


//Classes:

/* Player Class - Handles Drawing, Movement and Collision of the player
*  Only 1 is initialized in initEntities
*/
class player
{
  constructor(x,y)
  {
    this.x =  x+10;
    this.y =  y+10;
    this.velY = -10; //Y velocity (if < 0: falling)  
    this.canJump = true;
  }
  
  draw()
  {
    push();
    translate(this.x-10,this.y-10);
    strokeWeight(1);
    fill(0)
    rect(0,17,5,3);
    rect(3,2,2,15);
    fill('gold');
    noStroke();
    rect(6,10,14,10);          //Lower frame
    rect(11,0,7,10);           //Upper frame Rect
    triangle(6,10,11,0,11,10); //Upper frame triangle
    fill(255);
    triangle(8,10,13,3,13,10);
    rect(13,3,2,7);
    fill(0);
    circle(12,8,2);            //Eyes
    arc(6,13,6,4,0,PI/2);      //Mouth
    circle(9,19,3);
    circle(16,19,3);
    pop();
    this.move();
  }
  move()
  {
    if(keyIsDown(UP_ARROW) && this.canJump)
    {
      this.y -= 8;
      this.velY = 15;
      this.canJump = false;
    }
    if(keyIsDown(LEFT_ARROW) && this.x-10 > 0)
    {
      this.x -= 3;
    }
    else if(keyIsDown(RIGHT_ARROW) && this.x+10 < 800)
    {
      this.x += 3;
    }
    
    if(this.y >= 390)
    {
      this.y = 390;
      this.velY = 0;
      this.canJump = true;
    }
    else
      this.y += -this.velY;
    
    if(this.velY > -10)
      this.velY-= 0.75;
    
    this.collision();
  }
  
  //Check if you are standing on a platform (only if moving down)
  //Kind of jank, snaps the player to the platform, not too noticable
  //Make A special function that can be called for all entities
  collision()
  {
    if(this.velY < 0 && this.y+18 < 400 & this.y > 0
       && !keyIsDown(DOWN_ARROW))
    {
      var yMath = int((this.y+18)/20);
      this.canJump = true;
      
      var tile = tiles[yMath][int((this.x)/20)];
      var tileR = tiles[yMath][int((this.x+11)/20)];
      var tileL = tiles[yMath][int((this.x-11)/20)];
      
      if(tile == 'l' || tile == 'g' || tile == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }  
      else if(tileL == 'l' || tileL == 'g' || tileL == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }  
      else if(tileR == 'l' || tileR == 'g' || tileR == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }
      else
        this.canJump = false;   
    }
    
  
  }
  
  
}

/* Enemy Class - Uses custom characters for two types of enemies
*  Initializes 2 state objects per object to handle behavior
*  Handles drawing, movement and collision
*  8 are initialized in initEntities
*/
class enemy
{
  constructor(x,y, type)
  {
    this.x = x;
    this.y = y;
    this.type = type;
    this.velY = -1;
    this.canJump = true;
    this.distance;
    this.states = [new chaseState(), new wanderState()]; //Put states here
    this.currentState = 0;
  }
  
  draw()
  {
    push();
    imageMode(CORNER);
    if(this.type == 'h')
      image(customs[4], this.x,this.y-10, 20, 20);
    else if(this.type == 'v')
      image(customs[5], this.x,this.y-10, 20, 20);
    
    pop();
    this.distance = dist(this.x+10,this.y,p.x,p.y);
    this.move();
  }
  
  move()
  {
    this.states[this.currentState].execute(this);
    
    if(this.y >= 390)
    {
      this.y = 390;
      this.velY = 0;
      this.canJump = true;
    }
    else
      this.y += -this.velY;
    
    if(this.velY > -10)
      this.velY-= 0.5;
  
    if(this.distance > 120)
      this.currentState = 1;
    else
      this.currentState = 0;
    
    this.collide();
  }
  
  collide()
  {
    
    //Paste collision code here
    if(this.velY < 0 && this.y+18 < 400)
    {
      var yMath = int((this.y+18)/20);
      this.canJump = true;
      
      var tile = tiles[yMath][int((this.x)/20)];
      var tileR = tiles[yMath][int((this.x+11)/20)];
      var tileL = tiles[yMath][int((this.x-11)/20)];
      
      if(tile == 'l' || tile == 'g' || tile == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }  
      else if(tileL == 'l' || tileL == 'g' || tileL == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }  
      else if(tileR == 'l' || tileR == 'g' || tileR == 'r')
      {
        this.velY = 0; 
        this.y = yMath*20-10;
      }
      else
        this.canJump = false;   
    }
    
    
    
    if(this.distance < 18)
    {
      //Hitting the enemy on the head
      if(p.y < this.y && p.velY < 0)
      {
        destruct(this.x,this.y, 'e');
        
        //Creates a bouncing effect, very nice
        p.velY = 4;
        p.y -= 10;
      }
      else
        gameState = 4; //A Loss
    }
  }
}

/* Osha class - the collectible coins on the map
*  Shaped (very accurately might I say) like the OSHA logo
*  20 appear on the map, dissapear when collected
*  Increments a counter to know if the game is won
*/
class Osha
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.distance;
  }
  draw()
  {
    imageMode(CORNER);
    image(customs[3], this.x,this.y, 20, 20);
    this.collide();
  }
  
  collide()
  {
    if(abs(this.x - p.x) < 20)
    {
      this.distance = dist(this.x,this.y,p.x,p.y);
      if(this.distance < 15)
      {
        destruct(this.x,this.y, 'o');
        score++;
      }
    }
  }
}

/* ChaseState object - Models chasing behavior for the enemies
*  Is used when their distance to the player is < 120
*  If lower than the player, jump, otherwise move to player
*/
class chaseState
{
  constructor()
  {
  }
  
  execute(me)
  {
    if(p.y >= me.y)
    {
      if(me.x < p.x)
        me.x+=1;
      else if(me.x > p.x)
        me.x-=1;
    }
    else if(me.y > p.y && me.canJump && p.canJump)
    {
        me.velY = 10;
        me.y -= 8;
        me.canJump = false;
    }
  }
}

/* wanderState object - Models wandering around behavior of the enemies
*  Is used when their distance to the player is > 120
*  Moves in a random direction for a random distance, reverses if colliding with map border
*/
class wanderState
{
  constructor()
  {
    this.wandering = random(40,70);
    this.dir = round(random());
  }
  
  execute(me)
  {
    if(this.wandering <= 0)
    {
      this.wandering = random(40,70);    
    }
    
    this.wandering--;
    if(this.dir == 0)
    {
      me.x -= 2;    
    }
    else
      me.x += 2;
    
    if(me.x + 10 > 800)
      this.dir = 0;
    else if(me.x - 10 < 0)
      this.dir = 1;
    
    
  }
}


//Enemies in game
var Enemies  = [];
//Coins in the game
var Violations = [];

//Current Score
var score = 0;

/* Destruct function - destroys the desire entity
*  @param x - x coordinate
*  @param y - y coordinate
*  @param entity - the type of entity to be destroyed (enemy or coin)
*/
function destruct(x,y, entity)
{
  if(entity == 'e')
  {
    for(var i in Enemies)
    {
      if(Enemies[i].x == x && Enemies[i].y == y)
        Enemies.splice(i,1);
    }
  }
  else
  {
    for(var i in Violations)
    {
      if(Violations[i].x == x && Violations[i].y == y)
        Violations.splice(i,1);
    }
  }
}

/* DrawCustom Function:
*  
*  Draws custom characters before the start of the game
*  Saves the pixels of each drawn image to the array customs
*/ 
function drawCustom()
{

  background('lightblue');
  
  //Girder Tiles, for platforms:
  //---------------------------
  //Girder Right
  fill('#9b0700');
  rect(0,4,15,12);
  fill('#b30900');
  rect(0,0,20,4);
  rect(0,16,20,4);
  customs.push(get(0,0,20,20));
  clear();
  
  //Girder Middle
  fill('#9b0700');
  rect(0,4,20,12);
  fill('#b30900');
  rect(0,0,20,4);
  rect(0,16,20,4);
  customs.push(get(0,0,20,20));
  clear();
  
  //Girder Left
  fill('#9b0700');
  rect(5,4,15,12);
  fill('#b30900');
  rect(0,0,20,4);
  rect(0,16,20,4);
  customs.push(get(0,0,20,20));
  //---------------------------
  clear();
  
  //OSHA logo
  push();
  noStroke();
  fill(0);
  circle(10,10,20);
  fill(255);
  circle(7,10,15);
  
  fill('DodgerBlue')
  circle(6,10,12);
  
  fill(255);
  circle(8,10,9);
  
  fill('grey');
  circle(8,10,8);
  
  fill(255)
  circle(6,10,5);
  customs.push(get(0,0,20,20));
  pop();
  clear();
  
  //Hard Hat Harry
  //Rim
  fill('#FFD801');
  rect(2,18,20,2);
  //Head Portion
  fill('#FFCD01');
  arc(11,18,18,18, -PI, 0);
  //Trapezoid portion (mouth)
  fill('#FFDB58');
  quad(7,18,8,15,14,15,15,18);
  //Eyes/Eyebrows
  //Eyes
  fill(0);
  stroke('Black');
  point(8,13);
  point(14,13);
  //Eyebrows
  line(14,11,11,13);
  line(8,11,11,13);
  noStroke();
  //Triangle thingy
  fill('#FBB117');
  triangle(19,10,16,10,19,15);
  customs.push(get(0,0,25,20));
  clear();
  
  //Vinny the vest
  //Vest Enemy
  fill('#39FF14');
  rect(5,0,10,6);
  rect(0,6,20,14);
  //Orange Bands
  fill('orange');
  rect(0,13,20,5);
  rect(1,6,3,7);
  rect(16,6,3,7);
  //Grey Bands
  fill('grey');
  rect(0,14,20,3);
  rect(2,6,1,7);
  rect(17,6,1,7);
  //Eyebrows
  stroke(0);
  line(6,0,10,6);
  line(14,0,10,6);
  customs.push(get(0,0,25,20));
  clear();
  
  //Forklift Jones
  push();
  translate(this.x-10,this.y-10);
  strokeWeight(1);
  fill(0)
  rect(0,17,5,3);
  rect(3,2,2,15);
  fill('gold');
  noStroke();
  rect(6,10,14,10);          //Lower frame
  rect(11,0,7,10);           //Upper frame Rect
  triangle(6,10,11,0,11,10); //Upper frame triangle
  fill(255);
  triangle(8,10,13,3,13,10);
  rect(13,3,2,7);
  fill(0);
  circle(12,8,2);            //Eyes
  arc(6,13,6,4,0,PI/2);      //Mouth
  circle(9,19,3);
  circle(16,19,3);
  customs.push(get(0,0,25,20));
  pop();
  
  clear();
  
  //A Girder background for menus and the like
  rectMode(CORNER);
  for(let i = 0; i < tiles.length; i++)
  {
    for(let j = 0; j < tiles[i].length; j++)
    {
      image(customs[1], j*20, i*20, 20, 20);     
    }
  }
  
  customs.push(get());
  clear();
  
} 




//Draws the map, including platforms and open space
function drawMap()
{
  rectMode(CORNER);
  noStroke();
  for(let i = 0; i < tiles.length; i++)
    {
      for(let j = 0; j < tiles[i].length; j++)
        {
          switch(tiles[i][j])
          {
            case 'l':                                //Left end of a girder
              image(customs[2], j*20, i*20, 20, 20);
              break;
            case 'g':                                //Middle of a girder
              image(customs[1], j*20, i*20, 20, 20);
              break;
            case 'r':                                //Right end of a girder
              image(customs[0], j*20, i*20, 20, 20);
              break;
            default:
              fill('lightblue');                     //Light Blue Sky
              rect(j*20, i*20, 20, 20);
              break
          }
        }
    }
}


//Initializes all entities (OSHA violations, PPE, Player)
//Looks through the tiles array to determine initial position
function initEntities()
{
  rectMode(CENTER);
  for(let i = 0; i < tiles.length; i++)
  {
      for(let j = 0; j < tiles[i].length; j++)
      {
        var ppe;
        switch(tiles[i][j])
        {
          case 'p':
            p = new player(j*20, i*20);
            break;
          case 'h':
            ppe = new enemy(j*20, i*20, 'h');
            Enemies.push(ppe);
            break;
          case 'v':
            ppe = new enemy(j*20, i*20, 'v');
            Enemies.push(ppe);
            break;
          case 'o':
            ppe = new Osha(j*20, i*20);
            Violations.push(ppe);
            break;
          default:
            break;
        }
      }
  }
}

  
var start;        //Start Button
var instructions; //Instructions Button
var disclaimer;   //Disclaimer Button
var MM;           //Back to main menu button
  
/* Main Menu Function - draws a main menu for the player
*
*  Holds 3 buttons:
*  - Button to start the game
*  - Button for instuctions
*  - Disclaimer
*/
function mainMenu()
{
  //Do a nested loop to populate the background with the girders
  image(customs[7], 0,0, 400,400);
  
  start = createButton('OSHA? More Like NOsha!') //Funny pun
  start.position(115, 220);
  start.size(160,20);
  start.mousePressed(gameStart);
  
  instructions = createButton('How to play')
  instructions.position(115,270);
  instructions.size(160,20);
  instructions.mousePressed(go2Instructions);
  
  disclaimer   = createButton('Disclaimer')
  disclaimer.position(115,320);
  disclaimer.size(160,20);
  disclaimer.mousePressed(go2Disclaimer)
  
  textSize(30);
  fill(255);
  noStroke();
  text(logo, 45, 40);
  
      
}

var transition = 400;
  
/* Win Screen - Shows a win screen when 20 violations are collected
*  20 Forklift Jones reveal the screen from right to left
*  Contains a button to play again
*/
function winScreen()
{
  image(customs[7], transition,0, 400,400);
  
  
  if(transition > 0)
  {
    for(let i = 0; i < 20; i++)
    {

      image(customs[6], transition, i*20, 20, 20);     

    }
    transition -= 4;
  }
  else
  {
    fill(255);
    textSize(50);
    text("YOU WIN!", 75, 50);
  
    textSize(30)
    text("OSHA is no more!",70, 125);
  
    textSize(20);
    text("Now you can finally make super sick jumps", 15, 210);
    text("on your forklift without any consquences!", 15, 250);
  
    fill(0);
    triangle(20,375,100,375,100,325);
    triangle(380,375,300,375,300,325);
    
    
    image(customs[6],180,280,40,40);
    
    
    
    
    
    
    
    MM = createButton('Go again?')
    MM.position(120,350);
    MM.size(150,50);
    MM.mousePressed(restart)
  }
}

/* Lose screen - Shows a Lose screen when a PPE protects you (touches you)
*  20 Forklift Jones reveal the screen from right to elft
*  Contains a button to go back to the main menu
*/
function loseScreen()
{
  image(customs[7], transition,0, 400,400);
  
  
  if(transition > 0)
  {
    for(let i = 0; i < 20; i++)
    {

      image(customs[6], transition, i*20, 20, 20);     

    }
    transition -= 4;
  }
  else
  {
    fill(255);
    textSize(50);
    text("YOU LOSE!", 60, 50);
  
    textSize(20);
    text("Your workplace violations have been noted.",10,120);
    text("An OSHA Officer will be with you shortly.", 20, 170);
    textSize(17);
    text("Pray they don't come for your Forklift License!", 20, 210, 350);
    
    fill(220);
    rect(120, 250, 150, 80);
    fill(0);
    text("Forklift License", 130,270,100);
    fill(255)
    rect(200,260,60,60);
    
    image(customs[6], 210,265,40,40);
    
    MM = createButton('Appeal?')
    MM.position(120,350);
    MM.size(150,50);
    MM.mousePressed(restart)
    
  }
  
  
}
  
  
/* instructions screen - introduces the controls/enemies
*
*  Shows the enemies
*  Shows the controls
*  Outputs some anti-OSHA propaganda
*/
function instructionScreen()
{
  image(customs[7], 0,0, 400,400);
  
  textSize(15);
  textStyle(BOLD);
  text(tagline, 10, 20)
  text("Controls:", 20, 50)
  textStyle(NORMAL);
  text("Up Arrow: Jump", 20,80);
  text("Down Arrow: Drop Down", 20, 115)
  text("Left Arrow: Drive Left", 200, 80)
  text("Right Arrow: Drive Right", 200, 115)
  textSize(14)
  textStyle(BOLD);
  text("Land on them to take them down!\n\nShow them how useless safety equipment is!", 280, 180, 100);
  textStyle(NORMAL);
  
  
  textSize(30);
  textStyle(BOLD);
  text("Destroy the evil PPE:", 20, 170);
  textStyle(NORMAL);
  textSize(20);
  text(nameH, 20, 220);
  text(nameV, 20, 270);
  
  textSize(13)
  textStyle(BOLD);
  text("Collect all OSHA violations at the construction site to win!", 10, 350);
  textStyle(NORMAL);
  
  textSize(16)
  text(" x 20", 200, 380)
  
  
  //Place Drawings and Enemies Here
  image(customs[4], 200,180,40,40)
  image(customs[5], 200,240,40,40)
  image(customs[3], 170,360,30,30)
  image(customs[6], 350,5,50,40)
  
  MM = createButton('Back')
  MM.position(361,377);
  MM.mousePressed(go2MM)
  
}
 
/* Disclaimer screen
*
*  Shows a disclaimer stating this game is satire, along with a button to go back to the main menu
*/
function disclaimerScreen()
{
  rectMode(CORNER);
  image(customs[7], 0,0, 400,400);
  
  fill(255)
  textSize(50);
  text("DISCLAIMER:", 40, 50)
  
  textSize(18);
  text("-This game is purely Satire, not anti-OSHA propaganda.", 40, 120, 300);
  text("-Please follow all safety guidelines as stated by OSHA.", 40, 200, 300);
  text("-For more information on workplace safety,\nvisit:", 40, 280, 350);
  
  fill('blue');
  stroke(255);
  strokeWeight(2);
  text("www.osha.gov", 80, 302, 350);
  
  noStroke();
  
  fill(255);
  textSize(12);
  text("No PPE were harmed in the making of this game.", 50, 380, 300);

  
  MM = createButton('Back')
  MM.position(361,377);
  MM.mousePressed(go2MM)
}

  
//The following 5 functions are button callbacks that change the game state
//Their names should be self explanatory
function gameStart()
{
  removeElements();
  gameState = 3;
}
  
function go2Instructions()
{
  removeElements();
  gameState = 1;
}

function go2Disclaimer()
{
  removeElements();
  gameState = 2;
}
  
function go2MM()
{
  removeElements();
  gameState = 0;
}
  
//This callback in particular restarts everything to play again
function restart()
{
  removeElements();
  score = 0;
  gameState = 0;
  Enemies.splice(0,Enemies.length);
  Violations.splice(0,Enemies.length);
  initEntities();
  transition = 400;
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
  drawCustom();
  initEntities();
}

//Draw function: Draws the game board depending on the game State
function draw() {
  background('lightblue');
  
  if(gameState == 0)
    mainMenu();
  else if(gameState == 1)
    instructionScreen();
  else if(gameState == 2)
    disclaimerScreen();
  else if(gameState == 3)
  {
    if(p.x >= 210 && p.x < 610)
        translate(210-p.x, 0);
    else if(p.x >= 610)
        translate(-400,0);

    drawMap();

    for (let e in Enemies)
    {
      Enemies[e].draw();
    }
    for (let v in Violations)
    {
      Violations[v].draw();
    }
    p.draw();

    //Win Condition
    if(score == 20)
      gameState = 5;
  }
  else if(gameState == 4)
    loseScreen();
  else if(gameState == 5)
    winScreen();
  
}