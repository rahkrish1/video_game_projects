/*
For my project I implemented everything in the project description and added a few features. Because there are 4 letters in my name I made 3 different difficulties. On Easy mode, only the "LU" letters would be in play. Medium "LUK" letters would be in play and Hard all 4 letters "LUKE" would be in play. I also added a play again button when you win or lose that takes you back to the main menu
*/

/* DiSalvo, Luke
This is the Block class in which my name is spelt out of.
It is a simple rectangle with a width and height of 15.
The function takes in an x-coordinate, a y-coordinate and a newY-coordinate where the block "falls" to.
*/
class Block {
  constructor(x, newY, y) {
    this.x = x;
    this.newY = newY;
    this.y = y;
    
  }
  draw() {
    fill('red');
    rect(this.x, this.y, 15, 15);
  }
  update() {
    if (this.y != this.newY) {
      this.y++;
    }
  }
}

/*
This is the Knight class which draws and updates the face of the knight. It is made of a simple circle and makes use of the beginShape() method to draw the spartan helmet.
*/
class Knight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    //draw mascot
    fill('red');
    quad(this.x-13, this.y+39, this.x-20, this.y+15, this.x+20, this.y+15, this.x+13, this.y+40);
    fill('black');
    circle(this.x, this.y + 75,75); //face
  
    beginShape();
    fill("white");
    vertex(this.x+10, this.y+115); //add to 200
    vertex(this.x-5, this.y+115);
    vertex(this.x-15, this.y+110);
    vertex(this.x-15, this.y+80);
    vertex(this.x-25, this.y+77);
    vertex(this.x-25, this.y+67);
    vertex(this.x-2, this.y+70);
    vertex(this.x-5, this.y+85);
    vertex(this.x, this.y+90);
    vertex(this.x+5, this.y+85);
    vertex(this.x+3, this.y+70);
    vertex(this.x+26, this.y+67);
    vertex(this.x+26, this.y+77);
    vertex(this.x+16, this.y+80);
    vertex(this.x+16, this.y+110);
    endShape(CLOSE);
  }
  
  update() {
    stroke(0);
  }
  
}

/*
This is the Shield class to help intensify my Knight. Everygood knight needs a shield to protect himself. This also makes use of the beginShape() method to draw the shield and the cross.
*/
class Shield {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    beginShape(); //shield
    fill(139,69,19);
    vertex(this.x-65, this.y+65);
    vertex(this.x-65, this.y+115);
    vertex(this.x-40, this.y+140);
    vertex(this.x-15, this.y+115);
    vertex(this.x-15, this.y+65);
    endShape(CLOSE);
    
    //cross
    beginShape(); //shield
    fill('white');
    vertex(this.x-45, this.y+75);
    vertex(this.x-45, this.y+85);
    vertex(this.x-55, this.y+85);
    vertex(this.x-55, this.y+95);
    vertex(this.x-45, this.y+95);
    vertex(this.x-45, this.y+115);
    vertex(this.x-35, this.y+115);
    vertex(this.x-35, this.y+95);
    vertex(this.x-25, this.y+95);
    vertex(this.x-25, this.y+85);
    vertex(this.x-35, this.y+85);
    vertex(this.x-35, this.y+75);

    endShape(CLOSE);
  }
  
  update() {
    if (this.y != 225) {
      this.y++;
    }
  }
}

/*
This is the Hammer class which also helps intensify my knight and brings lightning from the sky. I made it look like Thor's hammer. This also utilizes the beginShape() method and rect() to make the hammer.
It also defines updates which moves the hammer into the sky.
*/
class Hammer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;
  }
  
  draw() {
    beginShape(); //sword
    fill(220);
    vertex(this.x+40, this.y+135);
    vertex(this.x+50, this.y+135);
    vertex(this.x+50, this.y+75);
    vertex(this.x+75, this.y+75);
    vertex(this.x+75, this.y+35);
    vertex(this.x+15, this.y+35);
    vertex(this.x+15, this.y+75);
    vertex(this.x+40, this.y+75);
    endShape(CLOSE);
    fill(139,69,19);
    rect(this.x+40, this.y+120, 10, 10);
    rect(this.x+40, this.y+100, 10, 10);
    rect(this.x+40, this.y+80, 10, 10);
    line(this.x+15, this.y+65, this.x+30, this.y+65);
    line(this.x+30, this.y+65, this.x+35, this.y+55);
    line(this.x+35, this.y+55, this.x+55, this.y+55);
    line(this.x+55, this.y+55, this.x+60, this.y+65);
    line(this.x+60, this.y+65, this.x+75, this.y+65);
  }
  
  update() {
    if (this.x != 200) {
      this.x--;
    }
    else {
      if (this.y != 150) {
        this.y--;
      }
      else {
        this.timer++;
        if (this.timer < 190 && !gameState) {
          this.y++;
          this.x++;
        }
      }
    }
  }
}

/*
This is the Lightning class which supports my Knight's ability to make lightning come down from the sky. 
*/
class Lightning {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;
  }
  draw() {
    //do nothing
  }
  update() {
    var x1 = 50;
    var y1 = 50;
    var x2 = 245;
    var y2 = 205;
    if (this.y != 150) {
      this.y--;
    }
    else {   
      this.timer++;
      if (this.timer < 580) {
        for (var i = 0; i < 20; i++) {
          x1 = x2;
          y1 = y2;
          x2 = x1 + int(random(-40, 20));
          y2 = y1 + int(random(-40, 20));
          strokeWeight(random(1, 3));
          stroke(255, 204, 0);
          line(x1, y1, x2, y2);
        }
      }
      else {
        animation = false;
        startScreen = true;
      }
    }
  }
}

/*
This is the letterL class which creates a game object that will move around. Has functionality to check if it hits the paddle or missed causing a game over. I had to make its own class because in the logo animation, each block was separate. This is true for all the other letters.
*/
class letterL {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = round(random(1, 4));
    this.yDir = round(random(1, 4));
  }
  
  draw() {
    fill('red');
    rect(this.x, this.y, 15, 15);    
    rect(this.x, this.y-15, 15, 15); 
    rect(this.x, this.y-30, 15, 15); 
    rect(this.x, this.y-45, 15, 15); 
    rect(this.x, this.y-60, 15, 15); 
    rect(this.x, this.y-75, 15, 15); 
    rect(this.x+15, this.y, 15, 15); 
    rect(this.x+30, this.y, 15, 15); 
    rect(this.x+45, this.y, 15, 15); 
  }
  update() {
    //set x and y directions and check if the letter hits a wall or causes a game over
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.x < 0) {
        this.xDir = round(random(1, 4));
    }
    else if (this.x > 340) {
        this.xDir = -round(random(1,4));
    }
    if (this.y < 90) {
        this.yDir = round(random(1, 4));
    }
    else if (this.y > 360) {
      if (dist(this.x, 0, paddle.x, 0) < 100) {
            this.yDir = -round(random(1,4));
            score++;
        }
        else {
            gameOver = true;
        }
    }
  }
}

/*
This is the letterU class which creates a game object that will move around. Has functionality to check if it hits the paddle or missed causing a game over. s.
*/
class letterU {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = round(random(1, 4));
    this.yDir = round(random(1, 4));
  }
  
  draw() {
    fill('red');
    rect(this.x, this.y, 15, 15);    
    rect(this.x, this.y-15, 15, 15); 
    rect(this.x, this.y-30, 15, 15); 
    rect(this.x, this.y-45, 15, 15); 
    rect(this.x, this.y-60, 15, 15); 
    rect(this.x, this.y-75, 15, 15); 
    rect(this.x+15, this.y, 15, 15); 
    rect(this.x+30, this.y, 15, 15); 
    rect(this.x+45, this.y, 15, 15); 
    rect(this.x+45, this.y-60, 15, 15);    
    rect(this.x+45, this.y-45, 15, 15); 
    rect(this.x+45, this.y-30, 15, 15); 
    rect(this.x+45, this.y-15, 15, 15); 
    rect(this.x+45, this.y-75, 15, 15); 
  }
  update() {
    //set x and y directions and check if the letter hits a wall or causes a game over
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.x < 0) {
        this.xDir = round(random(1, 4));
    }
    else if (this.x > 340) {
        this.xDir = -round(random(1,4));
    }
    if (this.y < 90) {
        this.yDir = round(random(1, 4));
    }
    else if (this.y > 360) {
      if (dist(this.x, 0, paddle.x, 0) < 100) {
            this.yDir = -round(random(1,4));
            score++;
        }
        else {
            gameOver = true;
        }
    }
  }
}

/*
This is the letterK class which creates a game object that will move around. Has functionality to check if it hits the paddle or missed causing a game over. s.
*/
class letterK {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = round(random(1, 4));
    this.yDir = round(random(1, 4));
  }
  
  draw() {
    if (difficulty === "Medium" || difficulty === "Hard") {
      fill('red');
      rect(this.x, this.y, 15, 15);    
      rect(this.x, this.y-15, 15, 15); 
      rect(this.x, this.y-30, 15, 15); 
      rect(this.x, this.y-45, 15, 15); 
      rect(this.x, this.y-60, 15, 15); 
      rect(this.x, this.y-75, 15, 15); 
      rect(this.x+15, this.y-30, 15, 15); 
      rect(this.x+15, this.y-45, 15, 15); 
      rect(this.x+30, this.y-15, 15, 15); 
      rect(this.x+30, this.y-60, 15, 15);    
      rect(this.x+45, this.y, 15, 15); 
      rect(this.x+45, this.y-75, 15, 15);      
    }
  }
  update() {
    //set x and y directions and check if the letter hits a wall or causes a game over
    if (difficulty === "Medium" || difficulty === "Hard") {
      this.x += this.xDir;
      this.y += this.yDir;
      if (this.x < 0) {
        this.xDir = round(random(1, 4));
      }
      else if (this.x > 340) {
        this.xDir = -round(random(1,4));
      }
      if (this.y < 90) {
        this.yDir = round(random(1, 4));
      }
      else if (this.y > 360) {
        if (dist(this.x, 0, paddle.x, 0) < 100) {
          this.yDir = -round(random(1,4));
          score++;
        }
        else {
          gameOver = true;
        }
      }
    }
   }  
}

/*
This is the letterE class which creates a game object that will move around. Has functionality to check if it hits the paddle or missed causing a game over. s.
*/
class letterE {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = round(random(1, 4));
    this.yDir = round(random(1, 4));
  }
  
  draw() {
    if (difficulty === "Hard") {
      fill('red');
      rect(this.x, this.y, 15, 15);    
      rect(this.x, this.y-15, 15, 15); 
      rect(this.x, this.y-30, 15, 15); 
      rect(this.x, this.y-45, 15, 15); 
      rect(this.x, this.y-60, 15, 15); 
      rect(this.x, this.y-75, 15, 15); 
      rect(this.x+15, this.y, 15, 15); 
      rect(this.x+30, this.y, 15, 15); 
      rect(this.x+45, this.y, 15, 15); 
      rect(this.x+15, this.y-35, 15, 15);    
      rect(this.x+30, this.y-35, 15, 15); 
      rect(this.x+15, this.y-75, 15, 15); 
      rect(this.x+30, this.y-75, 15, 15); 
      rect(this.x+45, this.y-75, 15, 15);
    }
    
  }
  update() {
    //set x and y directions and check if the letter hits a wall or causes a game over
    if (difficulty === "Hard") {
      this.x += this.xDir;
      this.y += this.yDir;
      if (this.x < 0) {
        this.xDir = round(random(1, 4));
      }
      else if (this.x > 340) {
        this.xDir = -round(random(1,4));
      }
      if (this.y < 90) {
        this.yDir = round(random(1, 4));
      }
      else if (this.y > 360) {
        if (dist(this.x, 0, paddle.x, 0) < 100) {
          this.yDir = -round(random(1,4));
          score++;
        }
        else {
            gameOver = true;
        }
      }
    }
  }  
}

/*
This is the Paddle class that creates the paddle game object and has functionality to move left and right across the screen.
*/
class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    fill(255);
    rect(this.x, this.y, 100, 10);
    if (!gameWin && !gameOver) {
       if (keyIsPressed && (keyCode === LEFT_ARROW)) {
          if (this.x > 0) {
          if (difficulty === "Easy" || difficulty === "Medium") {
            this.x-=4;
          }
          else if (difficulty === "Hard") {
            this.x-=6;
          }  
        }
      }
      if (keyIsPressed && (keyCode === RIGHT_ARROW)) {
        if (this.x < 300) {
          if (difficulty === "Easy" || difficulty === "Medium") {
            this.x+=4;
          }
          else if (difficulty === "Hard") {
            this.x+=6;
          }
        }
      }
    }
  }
}

//instantiate object arrays
var beginningObjects = [];
var gameObjects = [];

//instatiate states and variables
var animation = true;
var startScreen = false;
var gameState = false;
var gameOver = false;
var gameWin = false;
var restart = false;
var score = 0;
var difficulty = "";

//instatiante individual game objects
var paddle;

/*
This is the mouseClicked function that helps implement choosing the difficulty and play again options
*/
function mouseClicked() {
  var xCor= mouseX;
  var yCor = mouseY;
  // check if clicked in the correct box
  if ((xCor>30)&&(xCor<110) && (yCor>150) && (yCor<190)) {
    startScreen = false;
    gameState = true;
    difficulty = "Easy";
  }
  if ((xCor>165)&&(xCor<245) && (yCor>150) && (yCor<190)) {
    startScreen = false;
    gameState = true;
    difficulty = "Medium";
  }
  if ((xCor>300)&&(xCor<380) && (yCor>150) && (yCor<190)) {
    startScreen = false;
    gameState = true;
    difficulty = "Hard";
  }
  if ((gameOver || gameWin) && (xCor>150)&&(xCor<250) && (yCor>125) && (yCor<175)) {
    setup();
    startScreen = true;
    gameOver = false;
    gameWin = false;
    animation = false;
    score = 0;
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
  	
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
	
  //Instantiate and add a Knight with its accessories
  beginningObjects[0] = new Knight(200, 200);
  beginningObjects[1] = new Shield(200, 200);
  beginningObjects[2] = new Hammer(200, 200);
  beginningObjects[3] = new Lightning(200, 200);
  //Instantiate blocks that will make up the "L"
  beginningObjects[4] = new Block(50, 50, -475);
  beginningObjects[5] = new Block(50, 65, -415);
  beginningObjects[6] = new Block(50, 80, -355);
  beginningObjects[7] = new Block(50, 95, -275);
  beginningObjects[8] = new Block(50, 110, -215);
  beginningObjects[9] = new Block(50, 125, -85);
  beginningObjects[10] = new Block(65, 125, -95);
  beginningObjects[11] = new Block(80, 125, -105);
  beginningObjects[12] = new Block(95, 125, -115);
  //Instantiate blocks that will make up the "U"
  beginningObjects[13] = new Block(125, 50, -485);
  beginningObjects[14] = new Block(125, 65, -425);
  beginningObjects[15] = new Block(125, 80, -365);
  beginningObjects[16] = new Block(125, 95, -285);
  beginningObjects[17] = new Block(125, 110, -225);
  beginningObjects[18] = new Block(125, 125, -125);
  beginningObjects[19] = new Block(140, 125, -135);
  beginningObjects[20] = new Block(155, 125, -145);
  beginningObjects[21] = new Block(170, 110, -235);
  beginningObjects[22] = new Block(170, 125, -155);
  beginningObjects[23] = new Block(170, 95, -295);
  beginningObjects[24] = new Block(170, 80, -365);
  beginningObjects[25] = new Block(170, 65, -435);
  beginningObjects[26] = new Block(170, 50, -495);
  //Instantiate blocks that will make up the "K"
  beginningObjects[27] = new Block(200, 50, -505);
  beginningObjects[28] = new Block(200, 65, -445);
  beginningObjects[29] = new Block(200, 80, -375);
  beginningObjects[30] = new Block(200, 95, -305);
  beginningObjects[31] = new Block(200, 110, -245);
  beginningObjects[32] = new Block(200, 125, -165);
  beginningObjects[33] = new Block(215, 80, -385);
  beginningObjects[34] = new Block(230, 65, -455);
  beginningObjects[35] = new Block(245, 50, -515);
  beginningObjects[36] = new Block(215, 95, -315);
  beginningObjects[37] = new Block(230, 110, -255);
  beginningObjects[38] = new Block(245, 125, -175);
  //Instantiate blocks that will make up the "E"
  beginningObjects[39] = new Block(275, 50, -525);
  beginningObjects[40] = new Block(275, 65, -465);
  beginningObjects[41] = new Block(275, 80, -405);
  beginningObjects[42] = new Block(275, 95, -325);
  beginningObjects[43] = new Block(275, 110, -265);
  beginningObjects[44] = new Block(275, 125, -185);
  beginningObjects[45] = new Block(290, 50, -535);
  beginningObjects[46] = new Block(305, 50, -545);
  beginningObjects[47] = new Block(320, 50, -555);
  beginningObjects[48] = new Block(290, 85, -335);
  beginningObjects[49] = new Block(305, 85, -345);
  beginningObjects[50] = new Block(290, 125, -195);
  beginningObjects[51] = new Block(305, 125, -205);
  beginningObjects[52] = new Block(320, 125, -215);
  
  //Instantiate and add a Knight with its accessories
  gameObjects[0] = new Knight(200, 200);
  gameObjects[1] = new Shield(200, 225);
  gameObjects[2] = new Hammer(200, 150);
  gameObjects[3] = new letterL(50, 135);
  gameObjects[4] = new letterU(125, 135);
  gameObjects[5] = new letterK(200, 135);
  gameObjects[6] = new letterE(275, 135);
  paddle = new Paddle(100, 380);
  
}

/*
draw method creates the grassy and sky background as well as updates the logo to do its animation. Contains structure to determine what state the game is in and functions accordinly.
*/
function draw() {
  background(210);
  fill('green');
  rect(0,200,400,200);
  fill('blue');
  rect(0,0,400,200);
  
  if (animation || startScreen) {
      for (var i=0; i<beginningObjects.length; i++) {
        if (!restart) {
          beginningObjects[i].update();
        }
        beginningObjects[i].draw();
    }
    if (startScreen) {
      textSize(16);
      fill(255);
      rect(30, 150, 80, 40);
      rect(165, 150, 80, 40);
      rect(300, 150, 80, 40);
      fill(255, 0, 0);
      text("Easy", 53, 175);
      text("Medium", 178, 175);
      text("Hard", 323, 175);
      text("To start the game, click wanted difficulty", 65, 390);
    }
  }
  else if (gameState) {
    restart = false;
    if (score == 20) {
      gameWin = true;
    }
    fill(255, 0, 0);
    textSize(24);
    text("Score:", 290, 24);
    text(score, 365, 24);
    text("Difficulty:", 0, 24);
    text(difficulty, 100, 24);
    paddle.draw();
    for (var j=0; j<gameObjects.length; j++) {
      if (!gameWin && !gameOver) {
        gameObjects[j].update();
      }
      gameObjects[j].draw();
    }    
    if (gameWin) {
      textSize(16);
      fill(255);
      rect(150, 125, 100, 50);
      fill(255, 0, 0);
      text("Play Again?", 160, 155);
      fill(255, 0, 0);
      textSize(50);
      text("You Win!", 100, 100);
      restart = true;
    }
    if (gameOver) {
      textSize(16);
      fill(255);
      rect(150, 125, 100, 50);
      fill(255, 0, 0);
      text("Play Again?", 160, 155);
      textSize(50);
      text("Game Over!", 75, 100); 
      restart = true;
    }
  }
}