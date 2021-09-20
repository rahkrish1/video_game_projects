// shlok ;make the rover go to red tile and then draw  a rectangle

// Creating the tileMap here
var tileMap = [
  "wwwwwwwwwwwwwwwwwwww",
  "w                  w",
  "wP           C    Cw",
  "wwwwwwww     wwwwwww",
  "wC  w         C    w",
  "w   wC   e        Cw",
  "w   ww  wwwwwwwwwwww",
  "wE                Cw",
  "wC          C      w",
  "wwwwwwwwwwwww      w",
  "wC     Cw   w      w",
  "w       w   w      w",
  "w       w   wC     w",
  "w  www Cw   wwwww  w",
  "we  C         C    w",
  "wC      C         Cw",
  "wwwwwwwwwww  e  wwww",
  "w                 Cw",
  "wC E               w",
  "wwwwwwwwwwwwwwwwwwww",
];
var cherryIma = []; // stores the image of the custom object
var cherryScored;
var scored = false; // A boolean to tell the game if a point has beenscored
class scoreAddition {
  // Class to make the +1 fly when a cherry is picked
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    textSize(25); // Setting the size of +1
    fill(255, 215, 0); // making the fill color to be golden
    text("+1", this.x, this.y);

    if (this.y > -10) {
      // make the +1 fly upwards in direction
      this.y -= 3;
    }
    if (this.y == -10) {
      // once the animation has been completed return false
      return false;
    } else {
      return true;
    }
  }
}
// Function to create the custom object cherry
function customObject() {
  // The following draws the object with a transparency of 0
  background(220, 220, 220, 0);
  fill(24, 102, 0);
  stroke(24, 102, 0);
  strokeWeight(30);
  line(200, 0, 300, 200);
  line(200, 0, 100, 200);
  strokeWeight(1);
  stroke(238, 38, 0);
  fill(238, 38, 0);
  ellipse(300, 300, 200, 200);
  ellipse(100, 300, 200, 200);
  cherryIma.push(get(0, 0, width, height)); // stroing the image in the array
}

// The following class drawsthe golden fox which is the player in the game
class playerObj {
  constructor(x, y) {
    this.x = x + 10;
    this.y = y;
    this.cx = this.x; // cx and cy are the centers of the player
    this.gx = this.x;
    this.gy = this.y; // coordinates for the ghost
    this.cy = this.y;
    this.r = 230; // r, g, b stores the color of the player
    this.g = 230;
    this.b = 0;
    this.sc = 200;
    this.score = 0;
  }
  draw() {
    stroke(0); // changing the stroke color to black
    fill(this.r, this.g, this.b);
    beginShape(); // creating a custom shape to draw the golden fox
    vertex(this.x - 5, this.y + 5);

    vertex(this.x - 5, this.y + 2);
    vertex(this.x - 6.5, this.y + 2);
    vertex(this.x - 8, this.y + 5);

    vertex(this.x - 8, this.y + 15);

    vertex(this.x, this.y + 19);
    vertex(this.x + 8, this.y + 15);
    vertex(this.x + 8, this.y + 5);
    vertex(this.x + 6.5, this.y + 2);
    vertex(this.x + 5, this.y + 2);
    vertex(this.x + 5, this.y + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE); // ending the custom shape

    // Making the eyes and the mouth here
    fill(255);
    ellipse(this.x + 3.5, this.y + 8, 5, 5.5);
    ellipse(this.x - 3.5, this.y + 8, 5, 5.5);
    fill(0);
    ellipse(this.x + 3.5, this.y + 8, 1.5, 1.5);
    ellipse(this.x - 3.5, this.y + 8, 1.5, 1.5);
    fill(200, 0, 0);
    ellipse(this.x, this.y + 15, 2, 2);
  }
  move() {
    // Moving the player based on the key pressed
    // left key moves the player in the left direction, up movves the player up, down moves the player down, right moves the player right
    var xMove = 0;
    var yMove = 0;
    if (keyIsDown(LEFT_ARROW) && this.x > 20) {
      xMove = -2;
    }

    if (keyIsDown(RIGHT_ARROW) && this.x < width - 20) {
      xMove = 2;
    }
    if (keyIsDown(UP_ARROW) && this.y > 20) {
      yMove = -2;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - 20) {
      yMove = 2;
    }

    this.cx = this.x;
    this.cy = this.y + 10;
    // Checking for wall collisions here
    // if ther is a collission go back a little
    for (var i = 0; i < walls.length; i++) {
      if (walls[i].checkWallCollision(this.cx + xMove, this.cy + yMove)) {
        xMove = -xMove;
        yMove = -yMove;
      }
    }
    // Updating the coordinates of the player
    this.x += xMove;
    this.y += yMove;
    this.cx = this.x;
    this.cy = this.y + 10;
    this.gx = this.x;
    this.gy = this.y - 3;
  }
  eat() {
    // The eat function checks if a cherry is being eaten
    var self = this;
    function checkEaten(cher) {
      //checkEaten is only accessible to eat
      // Checking if the player is colliding with a cherry or not
      if (dist(self.cx, self.cy, cher.cx, cher.cy) <= 13) {
        cher.eaten = true; // if there is a collisione, the cherry has been eaten
      }
    }

    // Check collision for every cherry in the game
    for (var i = 0; i < cherry.length; i++) {
      checkEaten(cherry[i]);
    }
  }
  death() {
    // creating the animation for the death of the player
    // the eyes of the players close and become a x
    // and the mouth of the players appears to increase in size to create the illusion of a screem
    stroke(0);
    fill(this.r, this.g, this.b);
    beginShape();
    vertex(this.x - 5, this.y + 5);

    vertex(this.x - 5, this.y + 2);
    vertex(this.x - 6.5, this.y + 2);
    vertex(this.x - 8, this.y + 5);

    vertex(this.x - 8, this.y + 15);

    vertex(this.x, this.y + 19);
    vertex(this.x + 8, this.y + 15);
    vertex(this.x + 8, this.y + 5);
    vertex(this.x + 6.5, this.y + 2);
    vertex(this.x + 5, this.y + 2);
    vertex(this.x + 5, this.y + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE);

    stroke(0);
    // drawing the eyes and the mouth here
    line(this.x + 1.5, this.y + 5.5, this.x + 6, this.y + 10.5);
    line(this.x + 6, this.y + 5.5, this.x + 1.5, this.y + 10.5);

    line(this.x - 1.5, this.y + 5.5, this.x - 6, this.y + 10.5);
    line(this.x - 6, this.y + 5.5, this.x - 1.5, this.y + 10.5);
    fill(255, 0, 0);
    ellipse(this.x, this.y + 15, 4, 4);
  }
  ghost() {
    // function to make a ghost of the golden fox fly up in the screen

    // redrawing the fox's ghost
    stroke(0);
    fill(220);
    beginShape();
    vertex(this.gx - 5, this.gy + 5);

    vertex(this.gx - 5, this.gy + 2);
    vertex(this.gx - 6.5, this.gy + 2);
    vertex(this.gx - 8, this.gy + 5);

    vertex(this.gx - 8, this.gy + 15);

    vertex(this.gx, this.gy + 19);
    vertex(this.gx + 8, this.gy + 15);
    vertex(this.gx + 8, this.gy + 5);
    vertex(this.gx + 6.5, this.gy + 2);
    vertex(this.gx + 5, this.gy + 2);
    vertex(this.gx + 5, this.gy + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE);

    stroke(0);
    // drawing the eyes and the mouth here
    line(this.gx + 1.5, this.gy + 5.5, this.gx + 6, this.gy + 10.5);
    line(this.gx + 6, this.gy + 5.5, this.gx + 1.5, this.gy + 10.5);

    line(this.gx - 1.5, this.gy + 5.5, this.gx - 6, this.gy + 10.5);
    line(this.gx - 6, this.gy + 5.5, this.gx - 1.5, this.gy + 10.5);
    fill(0);
    ellipse(this.gx, this.gy + 15, 4, 4);
    if (this.gy > -20) {
      this.gy -= 2; // making the ghsot fly up 
    }
  }
}
// The adversaryObj class creates the demon foxes and controls their actions
class adversaryObj {
  constructor(x, y, dir) {
    this.x = x + 10;
    this.y = y;
    this.dir = dir;
    this.cx = this.x;
    this.cy = this.y + 10;
    this.gx = this.x;
    this.gy = this.y;
    this.r = 200;
    this.g = 100;
    this.b = 100;
    this.sc = 200;
    this.motion = 2.5;
  }
  draw() {
    // drawing the demon foxes, similar to that of the golden fox
    stroke(0);
    fill(this.r, this.g, this.b);
    beginShape();
    vertex(this.x - 5, this.y + 5);

    vertex(this.x - 5, this.y + 2);
    vertex(this.x - 6.5, this.y + 2);
    vertex(this.x - 8, this.y + 5);

    vertex(this.x - 8, this.y + 15);

    vertex(this.x, this.y + 19);
    vertex(this.x + 8, this.y + 15);
    vertex(this.x + 8, this.y + 5);
    vertex(this.x + 6.5, this.y + 2);
    vertex(this.x + 5, this.y + 2);
    vertex(this.x + 5, this.y + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE);

    noStroke();
    fill(0);
    ellipse(this.x + 3.5, this.y + 8, 5, 5.5);
    ellipse(this.x - 3.5, this.y + 8, 5, 5.5);
    fill(255);
    ellipse(this.x + 3.5, this.y + 8, 2, 2);
    ellipse(this.x - 3.5, this.y + 8, 2, 2);
    fill(0);
    stroke(0);
    ellipse(this.x, this.y + 15, 2, 2);
  }
  move() {
    // Moving the fox in a given direction
    if (this.dir == "V") {
      // if the direction that the demon fox is supposed to move in is V then move up and down
      for (var i = 0; i < walls.length; i++) {
        // check if there is a collision with a wall, if so turn around.
        if (walls[i].checkWallCollision(this.cx, this.cy)) {
          this.motion = -this.motion;
        }
      }
      this.y += this.motion;
      this.cx = this.x;
      this.cy = this.y + 10;
      this.gx = this.x;
      this.gy = this.y;
    } else if (this.dir == "H") {
      // Similarly for the motion in the horizontal direction
      for (var i = 0; i < walls.length; i++) {
        if (walls[i].checkWallCollision(this.cx, this.cy)) {
          this.motion = -this.motion;
        }
      }
      this.x += this.motion;
      this.cx = this.x;
      this.cy = this.y + 10;
      this.gx = this.x;
      this.y = this.y;
    }
  } // checkCollision between the player and the demon fox here
  checkCollision(x, y) {
    // if the distance between there x and y values is less than 15 a collision is detected
    if (abs(x - this.cx) < 15 && abs(y - this.cy) < 15) {
      return true;
    } else {
      return false;
    }
  }
  death() {
    // Drawing the animaiton of death for the demon fox
    stroke(0);
    fill(this.r, this.g, this.b);
    beginShape();
    vertex(this.x - 5, this.y + 5);

    vertex(this.x - 5, this.y + 2);
    vertex(this.x - 6.5, this.y + 2);
    vertex(this.x - 8, this.y + 5);

    vertex(this.x - 8, this.y + 15);

    vertex(this.x, this.y + 19);
    vertex(this.x + 8, this.y + 15);
    vertex(this.x + 8, this.y + 5);
    vertex(this.x + 6.5, this.y + 2);
    vertex(this.x + 5, this.y + 2);
    vertex(this.x + 5, this.y + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE);

    stroke(0);
    line(this.x + 1.5, this.y + 5.5, this.x + 6, this.y + 10.5);
    line(this.x + 6, this.y + 5.5, this.x + 1.5, this.y + 10.5);

    line(this.x - 1.5, this.y + 5.5, this.x - 6, this.y + 10.5);
    line(this.x - 6, this.y + 5.5, this.x - 1.5, this.y + 10.5);
    fill(255, 0, 0);
    ellipse(this.x, this.y + 15, 4, 4);
  }

  ghost() {
    // function to make a ghost of the demon fox fly up in the screen

    // redrawing the demon fox
    stroke(0);
    fill(220); // Color the ghost grey
    beginShape();
    vertex(this.gx - 5, this.gy + 5);

    vertex(this.gx - 5, this.gy + 2);
    vertex(this.gx - 6.5, this.gy + 2);
    vertex(this.gx - 8, this.gy + 5);

    vertex(this.gx - 8, this.gy + 15);

    vertex(this.gx, this.gy + 19);
    vertex(this.gx + 8, this.gy + 15);
    vertex(this.gx + 8, this.gy + 5);
    vertex(this.gx + 6.5, this.gy + 2);
    vertex(this.gx + 5, this.gy + 2);
    vertex(this.gx + 5, this.gy + 5);

    // vertex(this.x-8, this.y+ 15);
    endShape(CLOSE);

    stroke(0);
    // drawing the eyes and the mouth here
    line(this.gx + 1.5, this.gy + 5.5, this.gx + 6, this.gy + 10.5);
    line(this.gx + 6, this.gy + 5.5, this.gx + 1.5, this.gy + 10.5);

    line(this.gx - 1.5, this.gy + 5.5, this.gx - 6, this.gy + 10.5);
    line(this.gx - 6, this.gy + 5.5, this.gx - 1.5, this.gy + 10.5);
    fill(0);
    ellipse(this.gx, this.gy + 15, 4, 4);
    if (this.gy > -20) {
      this.gy -= 2;
    }
  }
}
class wallObj {
  // drawing the dirt walls in this class
  constructor(x, y) {
    this.x = x;
    this.cx = this.x + 10; // x coordinate for the center of the wall
    this.y = y;
    this.cy = this.y + 10; // y coordinate for the center of the wall
  }
  draw() {
    // drawing the dirt walls in the draw a function here of width 20
    stroke(0);
    strokeWeight(1);
    fill(145, 111, 78);
    rect(this.x, this.y, 20, 20, 5);
  }
  checkWallCollision(x, y) {
    // checking hte collision of another object with the given wall
    if (abs(x - this.cx) < 20 && abs(y - this.cy) < 20) {
      return true;
    } else {
      return false;
    }
  }
}
// Cherry Object draws the cherry for the golden fox to protect
class cherryObj {
  constructor(x, y) {
    this.x = x;
    this.cx = x + 10;
    this.cy = y + 10;
    this.y = y;
    this.r = 24;
    this.g = 102;
    this.b = 0;
    this.weight = 1;
    this.eaten = false;
    this.scored = false;
  }

  draw() {
    // drawing the custom object at the given  pixel location with a height and width of do.
    image(cherryIma[0], this.x, this.y, 20, 20);
  }
}
var cherry = [];
var walls = [];
var player = [];
var adversary = [];
var score = 0;
function initTilemap() {
  // Creating and pushing the objects of the tilemap in the
  stroke(0);
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      // for the entire length and the width of the tileMap
      switch (
        tileMap[i][j] // check the characters and createa and push the objects respectively.
      ) {
        case "w": // w is a wall
          // fill(145, 111, 78);
          walls.push(new wallObj(j * 20, i * 20));
          break;
        case "C": // C - cherry
          cherry.push(new cherryObj(j * 20, i * 20));
          break;
        case "P": // P - player
          player.push(new playerObj(j * 20, i * 20));
          break;
        case "e": // adversary moving in the vertical direction
          adversary.push(new adversaryObj(j * 20, i * 20, "V"));
          break;
        case "E": // adversary moving in the horizontal direction
          adversary.push(new adversaryObj(j * 20, i * 20, "H"));
          break;
      }
    }
  }
}

function mouseClicked() {
  // checking where the mouse clicked to start the game
  var xCor = mouseX;
  var yCor = mouseY; // check if clicked in the correct box
  if (xCor > 0 && xCor < 419 && yCor > 0 && yCor < 410 && !instructions) {
    instructions = true;
  }
}
//added to the code 
function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			

function setup() 
{

//setup method which instantiates all of the objects that will be used in the logo animation.

  	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

  //createCanvas(400, 400);
  customObject();
  initTilemap();
  frameRate(60);
}
var instructions = false;
var r = 135;
var g = 206;
var b = 235;
var gameOn = false;
function draw() {
  background(220);

  if (!instructions) {
    // Creating the initial instructions screen over here
    background(135, 206, 235);
    r++;
    g++;
    b++;
    noStroke();
    fill(255, 255, 0);
    arc(0, 0, 150, 150, 2 * PI, (1 / 2) * PI);
    fill(r, g, b);
    textSize(20);
    text("Welcome to the Game !!!", 100, 125);
    textSize(15);
    text("To start playing the game click anywhere on the screen.", 25, 150);
    text("To move the Golden Fox use the arrow keys, ", 25, 175);
    text("Avoid the Demon Foxes and collect all the prizes to win", 25, 200);
    text("The character cannot pass through the walls, ", 25, 225);
    text("If the Demon Fox touches you, you die.", 25, 250);
    text("Best of Luck !!!", 150, 275);

    fill(86, 125, 70);
    beginShape();
    vertex(0, 325);
    vertex(400, 325);
    vertex(400, 400);
    vertex(0, 400);
    endShape(CLOSE);
  } else if (!gameOn) {
    // Once the user clicks somewhere on the screen the game begins
    // background(0, 200, 0);
    // print(walls.length);
    background(0, 200, 0);
    for (var i = 0; i < walls.length; i++) {
      // draw the walls
      // fill(145, 111, 78);
      walls[i].draw();
    }
    for (i = 0; i < cherry.length; i++) {
      // draw the cherrys if they have not been eaten
      if (!cherry[i].eaten) {
        cherry[i].draw();
      } else if (cherry[i].eaten) {
        // check if a cherry has been eaten
        if (!cherry[i].scored) {
          // see if the cherry has been scored
          score += 1; // is so add the score by one
          cherry[i].scored = true; // score the cherry
          scored = true;
          cherryScored = new scoreAddition(cherry[i].cx, cherry[i].cy); // and create the object for the acore additions animation
        }
      }
    }
    if (scored) {
      scored = cherryScored.draw();
    } // draw the +1 flying
    player[0].draw(); // draw the player
    player[0].move(); // move the player
    player[0].eat(); // check if the player eats the cherry
    fill(255, 215, 0);
    textSize(15);
    text("Score:", 330, 15);
    text(str(score), 380, 15); // display the score in the top right corner
    for (i = 0; i < adversary.length; i++) {
      // for loop to draw and move the demon fox
      adversary[i].draw();
      adversary[i].move();
      if (adversary[i].checkCollision(player[0].cx, player[0].cy)) {
        player[0].death(); // check if the player has died, if so animation for death takes place
        player[0];
        gameOn = true; // gameOn is set to true to move to the next state of the game
      }
    }
    if (score == 20) {
      // if all the cherrys have been collected game Over
      gameOn = true;
    }
  } else {
    background(0, 200, 0);
    for (var i = 0; i < walls.length; i++) {
      // fill(145, 111, 78);
      walls[i].draw();
    }
    if (this.score == 20) {
      for (var i = 0; i < adversary.length; i++) {
        adversary[i].ghost();
        adversary[i].death();
      }
      player[0].draw();
      fill(255, 215, 0);
      textSize(15);
      text("Score:", 330, 15);
      text(str(score), 380, 15);
      textSize(25);
      text("You Win !!!", 150, 175); // display winning message
      text("Score: ", 150, 210);
      text(str(score), 240, 210);
    } else {
      textSize(15);
      text("Score:", 330, 15);
      text(str(score), 380, 15);
      for (i = 0; i < cherry.length; i++) {
        if (!cherry[i].eaten) {
          cherry[i].draw();
        }
      }

      player[0].death();

      for (i = 0; i < adversary.length; i++) {
        adversary[i].draw(); // animation for the death of the demon foxes
      }
      player[0].ghost();
      fill(255, 215, 0);
      textSize(15);

      text("Score:", 330, 15);
      text(str(score), 380, 15);
      fill(102, 0, 0);
      textSize(25);
      text("The Demon Fox ate you, you lose!!!", 10, 175); // display losing message
      
      text("Score: ", 150, 210);
      text(str(score), 240, 210);
    }
  }
}
