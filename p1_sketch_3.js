// Tilden Fernandez
// ECE 4525 Video Game Design
// Project 1
// 09/09/21

// Flags to trigger transistions between stages of the animation
var lettersDoneFlag = 0;  // Letters are draw, start rectangle
var rectDone = 0;  // Pause the rectangle minimizing
var game_start = "logo";
var game_state = 0;

// Square box that encompasses the letters
class BoxObj {
  // Box has center location and side length
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.rate = 3;  // set rate it will shrink at
    this.pause = 0;  // counter to time pauses
    this.resume = 0;  // flag to know when to resume
  }
  draw () {
    if (this.s > 50) {
        // Draw a square with no fill to boarder the letters
        noFill();
        stroke(0);
        strokeWeight(10);
        rectMode(CENTER);
        square(this.x, this.y, this.s);
    
        // Make the outside of the square blank by drawing rectangles the color of the background
        noStroke();
        fill(248, 205, 181);
        rectMode(CORNER);
        rect(0, 0, width, this.y-(this.s/2)-5);
        rect(this.x+(this.s/2)+5, 0, width, height);
        rect(0, 0, this.x-(this.s/2)-5, height);
        rect(0, this.y+(this.s/2)+5, width, height);
    }
    else {
        background(248, 205, 181);
        game_start = "preclick";
    }
  }
  // Cause the square to shrink around the letters
  resize() {
    if (this.s > 50) {
        this.s -= this.rate;
    }
    else {
        rectDone = 1;
    }
  }
}

// A class that simply instantiates and updates the block objects
// Makes the letters 'TF' and organizes the four blocks into one object
class letterObjs {
    constructor() {
        this.blocks = [];
        // One instance of each block object used to form the letters TF
        this.blocks.push(new TopBlock(410, 125, 300, 25, 'red'));
        this.blocks.push(new LeftBlock(140, -200, 25, 100, 'green'));
        this.blocks.push(new RightBlock(230, 498, 25, 100, 'blue'));
        this.blocks.push(new SmallBlock(-95, 175, 65, 25, [165, 78, 40]));
    }
    update() {
        // For each block, draw it then update the position
        rect(-100, -100, width+100, 0);

        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw();
            // Update three times to make the blocks move faster
            for (var j = 0; j < 3; j++) {
                this.blocks[i].update();
            }
        }
    }
}

// Block on top of the letters
class TopBlock {
  // Has (x,y), length, width, and color
  constructor(x, y, l, w, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.c = c;
    // Set count to trigger the next phase after a delay
    this.count = 400;
  }
  draw () {
    // If the block is not in the final position, it has no fill
    if (this.x <= 60) {
      noStroke();
      fill(0);
    }
    // Once the block is in place, it has a fill
    else {
      stroke(this.c);
      strokeWeight(1);
      noFill();
    }
    
    rect(this.x, this.y, this.l, this.w);
  }
  update() {
    // Move the block left until it hits its final spot
    if (this.x > 60) {
      this.x--;
    }
    // Once it stops start a count to the next phase
    else {
      this.count--;
      if (this.count <= 0) {
        lettersDoneFlag = 1;
      }
    }
  }
}

// Left vertical block of the letters
class LeftBlock {
  // Block has (x,y), length, width, and color
  constructor(x, y, l, w, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.c = c;
  }
  // If the block is moving, it has no fill. Once it stops, add a fill
  draw () {
    if (this.y >= 150) {
      noStroke();
      fill(0);
    } else {
      stroke(this.c);
      strokeWeight(1);
      noFill();
    }
    rect(this.x, this.y, this.l, this.w);
  }
  // Move the block down until it hits it's final spot
  update() {
    if (this.y < 150) {
      this.y++;
    }
  }
}

// Right vertical block of the letters
class RightBlock {
  // Block has (x,y), length, width, and color
  constructor(x, y, l, w, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.c = c;
  }
  draw () {
    // If the block is moving it has no fill, once it stops add a fill
    if (this.y <= 150) {
      noStroke();
      fill(0);
    } else {
      stroke(this.c);
      strokeWeight(1);
      noFill();
    }
    rect(this.x, this.y, this.l, this.w);
  }
  update() {
    // Move the block up until it hits it's final spot
    if (this.y > 150) {
      this.y--;
    }
  }
}

// Small lower horizontal block for the letter F
class SmallBlock {
  // Block has (x,y), length, width, color
  constructor(x, y, l, w, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.c = c;
  }
  draw () {
    // If the block is moving it has no fill, once it stops add a fill
    if (this.x >= 255) {
      noStroke();
      fill(0);
    } else {
      stroke(this.c);
      strokeWeight(1);
      noFill();
    }
    rect(this.x, this.y, this.l, this.w);
  }
  // Move the block right until it hits its final spot
  update() {
    if (this.x < 255) {
      this.x++;
    }
  }
}

// Make the logo an object for easy movement
class bouncingLogo {
    // The logo has an (x,y) center and a (dx, dy) movement
    constructor(x, y, c) {
        this.x = x;
        this.y = y;
        var rx = random([-1, 1]);
        var ry = random([-1, 1]);
        this.dx = rx * random(1, 4);
        this.dy = ry * random(1, 4);
        this.boundingColor = c;

        // Values used to move the inner blocks
        this.offx1 = -20;
        this.offy1 = -10;
        this.offx2 = -9;
        this.offy2 = -5;
        this.offx3 = 1;
        this.offy3 = -5;
        this.offx4 = 6;
        this.offy4 = -1;

        // Control in the blocks move in or out
        this.inOut = 0;
        // Count how much the blocks have moved
        this.count = 19;
        // Delay in between cycles of the blocks moving
        this.lDelay = 100;
    }
    // Make the logo that moves around: a square with the letters in the middle
    draw() {
        // Fill the inside of the square
        noStroke();
        fill([214, 255, 254]);
        rectMode(CENTER);
        rect(this.x, this.y, 45, 45);

        // Make the colorful rectangles to form the letter
        rectMode(CORNER);
        noStroke();
        fill('red');
        rect(this.x+this.offx1, this.y+this.offy1, 40, 5);
        fill('green');
        rect(this.x+this.offx2, this.y+this.offy2, 5, 15);
        fill('blue');
        rect(this.x+this.offx3, this.y+this.offy3, 5, 15);
        fill([171, 98, 56]);
        rect(this.x+this.offx4, this.y+this.offy4, 6, 5);

        // Make the bounding black square
        noFill();
        rectMode(CENTER);
        stroke(this.boundingColor);
        strokeWeight(10);
        rect(this.x, this.y, 50, 50);
    }
    moveInnerBlocks() {
        // If we are moving out
        if (this.inOut === 1) {
            // Move top block up
            this.offy1--;
            // Small block down
            this.offy4++;
            // Left block left
            this.offx2--;
            // Right block right
            this.offx3++;

            // Keep count
            this.count--;
        }
        // If we are moving in
        else if (this.inOut === 2) {
            // Move top block down
            this.offy1++;
            // Small block up
            this.offy4--;
            // Left block right
            this.offx2++;
            // Right block left
            this.offx3--;

            // Keep count
            this.count++;
        }
        // Iin between moving in and out, delay for some time
        else {
            // Count the delay
            this.lDelay--;
            // Once the delay is done, reset values and go to blocks moving out
            if (this.lDelay <= 0) {
                this.inOut = 1;
                this.lDelay = 100;
            }
        }
        // If blocks are far enough out, change to moving in
        if (this.count <= 0) {
            this.inOut = 2;
            this.count = 1;
        }
        // If blocks have reached the in position, move to delay
        if (this.count >= 20) {
            this.inOut = 3;
            this.count  = 19;
        }
    }
    // Move the logo according to the (dx, dy) velocity
    move() {
        // Move the logo
        this.x += this.dx;
        this.y += this.dy;

        // Check if the logo hits the left, right, or top boarder of the screen
        // If it hits left or right, reverse the dx velocity component
        // If it hits the top, reverse the dy velocity component
        // Also reset the center so the logo is exactly touching the boarder
        // This avoids the issue of the logo going slightly past the boarder
        if (this.x >= width - 25) {
            this.x = width - 25;
            this.dx = -this.dx;
        }
        if (this.x <= 25) {
            this.x = 25;
            this.dx = -this.dx;
        }

        if (this.y <= 25) {
            this.y = 25;
            this.dy = -this.dy;
        }
        // If the logo hits the bottom boarder, move the game state to be 
        // in "Game Over"
        if (this.y >= height - 25) {
            game_state = 2;
        }
    }
}

// Store the player's paddle as an object for easy movement
class playerPaddle {
    // The paddle only needs an a variable because it only moves horizontally
    constructor(x) {
        this.x = x;
        this.y = height - 10;
        this.color = [69, 173, 172];
    }
    // Drawing is just making a rectangle
    draw() {
        rectMode(CORNER);
        fill(this.color);
        noStroke();
        rect(this.x, this.y, 100, 10);
    }
    // Functions to move the paddle left or right
    moveRight() {
        if (this.x < width - 100) {
            this.x += 2;
        }
    }
    moveLeft() {
        if (this.x > 0) {
            this.x -= 2;
        }
    }
}

// Used to draw rectangles making a background pattern
class backgroundRects {
    constructor(c) {
        this.color = c;
    }
    draw() {
        // Give the rectangles a black outline and some color
        stroke(0);
        strokeWeight(1);
        fill(this.color);

        // Translate the matrix in preparation for rotation
        translate(width / 2, height / 2);
        // Rotate the matrix so the rectangles appear rotated
        rotate(PI / 3.0);

        // Draw the rectangles for the background
        rect(-width/2 - 100, -height/2 - 100, width+200, 225);
        rect(-width/2 - 100, -height/2 - 100, 225, height + 200);
        rect(-width/2 - 100, height/2 - 125, width + 200, 200);
        rect(width/2 - 125, -height/2 + 125, 200, height + 200);

        // Add shading rectangles
        noStroke();
        fill(214, 255, 254);
        
        rect(-width/2 - 100, height/2 - 124, 374, 10);
        rect(width/2 - 124, -74, 10, 374);
        rect(-74, -height/2 + 114, width, 10);
        rect(-86, -height/2 - 126, 10, height);

        // Reset the position of the matrix
        rotate(-PI / 3.0);
        translate(-width / 2, -height / 2);
    }
}

// Objects to use when instantiating classes
var letterBlocksObj;
var boxObj1;
var bLogo = [];
var paddle;
var bRects;
var score = 0;

function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			




// Make a canvas and set up one of each class
function setup() {
    //createCanvas(400, 400);

  	
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

    // Make a new instance of the letters
    letterBlocksObj = new letterObjs();
  
    // An instance of the box object that closes the animation
    boxObj1 = new BoxObj(width/2, height/2, width);

    // Make two of the logo that will be move its own object
    bLogo[0] = new bouncingLogo(width/2, height/2, [127, 127, 127]);
    bLogo[1] = new bouncingLogo(width/2, height/2, [0, 0, 0]);

    // Make an object instance for the player paddle
    paddle = new playerPaddle(width/2 - 50);

    bRects = new backgroundRects([69, 173, 172]);
}

function draw() {
    // Always updating the background
    if (game_start == "logo") {
        background(247, 157, 106);
        bRects.draw();
    }
    else {
        background(248, 205, 181);
    }

    // Game hasn't started yet - logo is still playing
    if (game_start === "logo") {
        // Only draw the letters until the rectangle is done shrinking - trying to save computation
        if (!rectDone) {
            letterBlocksObj.update();
        }
        
        // If the letters have finished forming, draw the boarder square
        if (lettersDoneFlag) {
            boxObj1.draw();
            boxObj1.resize();
        }
    }
    // Logo is done, needs to be clicked for the game to start
    // Nothing happens here except that the logo appears
    else if (game_start === "preclick") {
        for (var i = 0; i < bLogo.length; i++) {
           bLogo[i].draw();
        }
    }
    // The game has started!
    else {
        // Draw the logo and the player paddle
        for (var i = 0; i < bLogo.length; i++) {
            bLogo[i].draw();
        }
        paddle.draw();
        // If the game hasn't been won or lost yet, enable controls
        if (game_state === 0) {
            for (var i = 0; i < bLogo.length; i++) {
                // Update the logo position
                bLogo[i].move();

                // Cause the inner blocks that form the letters 'TF' to move
                bLogo[i].moveInnerBlocks();
            }
            
            // Check collision between the logo and the paddle
            checkCollision();

            // Show the current score
            fill(0);
            text("Score: ", width - 100, 25);
            text(score, width - 50, 25);

            // Check for user input
            if (keyIsPressed) {
                // Left arrow moves the paddle left
                if (keyCode === LEFT_ARROW) {
                    paddle.moveLeft();
                }
                // Right paddle moves the paddle right
                else if (keyCode === RIGHT_ARROW) {
                    paddle.moveRight();
                }
            }
            // If the score reaches the winning score, the player wins
            if (score === 20) {
                game_state = 1;
            }
        }
        // The game has been won
        if (game_state === 1) {
                // Show a winning screen, movement is no longer allowed
                noStroke();
                fill('green');
                textSize(48);
                text("You Win!", 100, 150);
        }
        // The game has been lost
        if (game_state === 2) {
            // Show a losing screen, movement is no longer allowed
            noStroke();
            fill(0);
            textSize(24);
            text("Score:", 125, 250);
            text(score, 250, 250);
            fill('red');
            textSize(48);
            text("You Lose", 100, 150);
        }
    }
}

function checkCollision() {
    // Check if the logo bounding box overlaps with the player paddle by
    // comparing the relative centers
    for (var i = 0; i < bLogo.length; i++) {
        if (bLogo[i].y + 25 >= paddle.y &&
            bLogo[i].x + 25 >= paddle.x &&
            bLogo[i].x - 25 <= paddle.x + 100 &&
            bLogo[i].y + 25 > 0) {

            // If they do overlap, reverse the logo movement in the y direction
            bLogo[i].dy = -bLogo[i].dy;
            // Reset the logo position to avoid overlapping with the paddle
            bLogo[i].y = paddle.y - 25;
            // Increment the score
            score++;
            // Swap the colors for fun
            var tempCol = bLogo[i].boundingColor;
            bLogo[i].boundingColor = paddle.color;
            paddle.color = tempCol;
        }
    }
}

function mousePressed() {
    // We only accept input once the logo is done and before the game starts
    if (game_start === "preclick") {
        // Check that the mouse in the right area
        // Both logos are in the same area so we only need to check against one
        if (mouseX <= bLogo[0].x + 25 && mouseX >= bLogo[0].x - 25 &&
            mouseY <= bLogo[0].y + 25 && mouseY >= bLogo[0].y - 25) {
                // Change the game start variable to start playing the game
                game_start = "playing";
            }
    }
}