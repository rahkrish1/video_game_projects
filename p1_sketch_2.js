// Author - Shlok Agarwal
// Version - 5.2
// The Class logo creates and animates the logo with two leetter from my name.
// The letters being "S" and "H".

class Game {
  // The Constructor to initialize the class with the given parameters
  constructor(x, y, background, r, g, b) {
    // boolean to detect the state of the game the player is in
    this.gameOver = false;
    // Variable to hold th curent score of the game
    this.score = 0;
    
    //Speed and direction variable to assign a random speed and direction initially for the letter S
    this.xsDir = random(-3, 3) + 1;
    this.ysDir = random(1, 4);
    //Speed and direction variable to assign a random speed and direction initially for the letter H
    this.xhDir = random(-3, 3) + 1;
    this.yhDir = random(1, 4);
    // initx and inity are the initial positions of the letters SH thats where the user wants
    // the letters to transition into and begin animation from there on
    this.initx = x;
    this.inity = y;

    // xs and ys are the coordintes for the letters to fly into the canvas
    this.xs = 0;
    this.ys = 0;

    // this.x, this.y are the cooardinates to which the letters fly into and start the second animation from there
    this.x = x;
    this.y = y;
    this.xh = x;
    this.yh = 0;

    // bg stores the background color of the canvas
    this.bg = background;

    // The colors that the user wants there letters to be
    this.r = r;
    this.g = g;
    this.b = b;
    
    // r, g, b values for the letters in the game
    this.rl = r;
    this.gl = g;
    this.bl = b;

    // to make the bouncing animation
    this.incrementer = 2;
    this.incrementerx = 2;
    //Storing the history of the coordinates to make the streak
    this.cohist = [];

    // coordinates for the for rectangles for the TV animation.
    this.yb1 = 0;
    this.yb2 = 0;
    this.xb1 = 200;
    this.xb2 = 200;

    this.yb3 = 200;
    this.yb4 = 200;
    this.xb3 = 0;
    this.xb4 = 0;

    this.ssx = 0;
    this.ssy = 0;
    this.length = 320;
    this.height = 250;

    this.rw = 0;
    this.gw = 0;
    this.bw = 0;
  }

  // init initializes the canvas for the logo, stars and sets the animation for the TV
  // boundaries to fly in
  init() {
    // Drawing the stars
    noStroke();
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    // Drawing the TV with rects and arcs
    fill(255, 99, 71);
    rect(this.xb1, this.yb1, 320, 10);
    rect(this.xb2, this.yb2, 320, 10);
    rect(this.xb3, this.yb3, 10, 250);
    rect(this.xb4, this.yb4, 10, 250);
    arc(this.xb1, this.yb1, 40, 40, 0, 180);
    arc(this.xb2, this.yb2, 40, 40, 180, 0);
    arc(this.xb3, this.yb3, 40, 40, 90, 270);
    arc(this.xb4, this.yb3, 40, 40, 270, 90);
  }

  // ipdate init creates the TV animation and sets the boundary for the TV animation
  updateinit() {
    // increase the y coordinate for the bottom most rectangle until it is less than 320
    if (this.yb1 < 320) {
      this.yb1 = this.yb1 + 4;
    }
    // increase the y coordinate for the top most rectangle until it is less than 80
    if (this.yb2 < 80) {
      this.yb2 = this.yb2 + 4;
    }
    // increase the x coordinate for the left most rectangle until it is less than 40
    if (this.xb3 < 40) {
      this.xb3 = this.xb3 + 4;
    }
    // increase the x coordinate for the right most rectangle until it is less than 360
    if (this.xb4 < 360) {
      this.xb4 = this.xb4 + 4;
    }

    // if the animation is complete then return true else return false
    if (
      this.yb1 == 320 &&
      this.yb2 == 80 &&
      this.xb3 == 40 &&
      this.xb4 == 360
    ) {
      return true;
    } else {
      return false;
    }
  }
  //function to switch from the logo screen to the game screen
  fadeOut() {
    fill(255, 99, 71);
    // redraw the box the logo was hovering in 
    arc(this.xb1, this.yb1, 40, 40, 0, 180);
    arc(this.xb2, this.yb2, 40, 40, 180, 0);
    arc(this.xb3, this.yb3, 40, 40, 90, 270);
    arc(this.xb4, this.yb3, 40, 40, 270, 90);
    rect(this.xb1, this.yb1, 100, 10);
    rect(this.xb2, this.yb2, this.length, 10);
    rect(this.xb3, this.yb3, 10, this.height);
    rect(this.xb4, this.yb4, 10, this.height);
    
    // Increas the lenght of the horizontal rectangles abd height of the vertical rectangles
    // as the box fades out
    if (this.length < 400) {
      this.length = this.length + 2;
    }
    if (this.height < 400) {
      this.height = this.height + 4;
    }
    // arc(this.xb1, this.yb1, 40, 40, 0, 180);
    // arc(this.xb2, this.yb2, 40, 40, 180, 0);
    // arc(this.xb3, this.yb3, 40, 40, 90, 270);
    // arc(this.xb4, this.yb3, 40, 40, 270, 90);
    
    // creating the animations to fade the box out and make it the boundary of the game screen
    if (this.yb1 < 400) {
      this.yb1 = this.yb1 + 2;
    }
    // decrease the y coordinate for the top most rectangle until it is equal to 0
    if (this.yb2 > 0) {
      this.yb2 = this.yb2 - 2;
    }
    // decrease the x coordinate for the left most rectangle until it is equal to 0
    if (this.xb3 > 0) {
      this.xb3--;
    }
    // increase the x coordinate for the right most rectangle until it is less than 400
    if (this.xb4 < 400) {
      this.xb4++;
    }
    
    // The condition lets the FSM know if the animation has been completed or not 
    if (this.xb3 == 0 && this.xb4 == 400 && this.yb1 == 400 && this.yb2 == 0) {
      return true;
    } else {
      return false;
    }
  }
  
  // Function to fade the logo out
  fadeOutletter(rb, gb, bb) {
    // slowly change the color  to black (background color)
    if (this.rl > 0) {
      this.rl = this.rl - 5;
    }
    if (this.gl > 0) {
      this.gl = this.gl - 5;
    }
    if (this.bl > 0) {
      this.bl = this.bl - 5;
    }
    
    // redraw the entire logo with the new logo to make the animation smooth
    for (var i = 0; i < this.cohist.length; i++) {
      // get the position vector
      var position = this.cohist[i];
      //stroke(r, g, b)
      fill(this.rl, this.gl, this.bl);
      //Instructions to draw the letter S
      rect(position.x, position.y, 50, 20, 20);
      arc(position.x - 10, position.y + 30, 80, 80, 90, 270);
      fill(rb, gb, bb);
      arc(position.x - 10, position.y + 30, 40, 40, 90, 270);
      fill(this.rl, this.gl, this.bl);
      arc(position.x - 10, position.y + 90, 80, 80, 270, 90);
      fill(rb, gb, bb);
      arc(position.x - 10, position.y + 90, 40, 40, 270, 90);
      fill(this.rl, this.gl, this.bl);
      rect(position.x - 20, position.y + 120, 50, 20, 20);

      // Instructions to draw the letter H
      fill(this.rl, this.gl, this.bl);
      rect(position.x + 75, position.y + 60, 100, 140, 10);
      fill(rb, gb, bb);
      rect(position.x + 75, position.y + 15, 40, 50);
      rect(position.x + 75, position.y + 105, 40, 50);
    }
    
    // if the animation is complete then return true and set the locations for the new letters
    if (this.rl == 0 && this.gl == 0 && this.bl == 0) {
      this.xs = 100;
      this.ys = 100;
      this.xh = 300;
      this.yh = 100;
      return true;
    } else {
      return false;
    }
  }

  drawLogo(rb, gb, bb) {
    // Instructions to draw the letter S
    noStroke();
    // Colors for the TV
    this.r = 255;
    this.g = 99;
    this.b = 71;

    // Instructions to draw the letter S
    fill(this.rl, this.gl, this.bl);
    rect(this.x, this.y, 50, 20, 20);
    arc(this.x - 10, this.y + 30, 80, 80, 90, 270);
    fill(rb, gb, bb);
    arc(this.x - 10, this.y + 30, 40, 40, 90, 270);
    fill(this.rl, this.gl, this.bl);
    arc(this.x - 10, this.y + 90, 80, 80, 270, 90);
    fill(rb, gb, bb);
    arc(this.x - 10, this.y + 90, 40, 40, 270, 90);
    fill(this.rl, this.gl, this.bl);
    rect(this.x - 20, this.y + 120, 50, 20, 20);

    // Instructions to draw the letter H
    fill(this.rl + 50, this.gl - 10, this.bl + 50);
    rect(this.x + 75, this.y + 60, 100, 140, 10);
    fill(rb, gb, bb);
    rect(this.x + 75, this.y + 15, 40, 50);
    rect(this.x + 75, this.y + 105, 40, 50);

    // Making the streak animation for the letters from the history of the coordinates
    for (var i = 0; i < this.cohist.length; i++) {
      // get the position vector
      var position = this.cohist[i];
      //stroke(r, g, b)
      fill(this.rl, this.gl, this.bl);
      //Instructions to draw the letter S
      rect(position.x, position.y, 50, 20, 20);
      arc(position.x - 10, position.y + 30, 80, 80, 90, 270);
      fill(rb, gb, bb);
      arc(position.x - 10, position.y + 30, 40, 40, 90, 270);
      fill(this.rl, this.gl, this.bl);
      arc(position.x - 10, position.y + 90, 80, 80, 270, 90);
      fill(rb, gb, bb);
      arc(position.x - 10, position.y + 90, 40, 40, 270, 90);
      fill(this.rl, this.gl, this.bl);
      rect(position.x - 20, position.y + 120, 50, 20, 20);

      // Instructions to draw the letter H
      fill(this.rl + 50, this.gl - 10, this.bl + 50);
      rect(position.x + 75, position.y + 60, 100, 140, 10);
      fill(rb, gb, bb);
      rect(position.x + 75, position.y + 15, 40, 50);
      rect(position.x + 75, position.y + 105, 40, 50);
    }

    // preserving the canvas here on.
    // redrawing the stars
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    // The TV
    fill(this.r, this.g, this.b);
    rect(200, 320, 320, 10);
    rect(200, 80, 320, 10);
    rect(40, 200, 10, 250);
    rect(360, 200, 10, 250);
    arc(200, 320, 40, 40, 0, 180);
    arc(200, 80, 40, 40, 180, 0);
    arc(40, 200, 40, 40, 90, 270);
    arc(360, 200, 40, 40, 270, 90);
  }

  // drawS creates the letter S using rectangles and arcs
  drawSLogo(rb, gb, bb) {
    noStroke();
    fill(250, 40, 120);

    // This Chunk draws the letter S onto the canvas
    rect(this.xs, this.ys, 50, 20, 20);
    arc(this.xs - 10, this.ys + 30, 80, 80, 90, 270);
    fill(rb, gb, bb);
    arc(this.xs - 10, this.ys + 30, 40, 40, 90, 270);
    fill(250, 40, 120);
    arc(this.xs - 10, this.ys + 90, 80, 80, 270, 90);
    fill(rb, gb, bb);
    arc(this.xs - 10, this.ys + 90, 40, 40, 270, 90);
    fill(250, 40, 120);
    rect(this.xs - 20, this.ys + 120, 50, 20, 20);
    //

    // redrawing the initial contents of the canvas to preserve the canvas.
    this.r = 255;
    this.g = 99;
    this.b = 71;

    // The stars
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    // The TV
    fill(this.r, this.g, this.b);
    rect(200, 320, 320, 10);
    rect(200, 80, 320, 10);
    rect(40, 200, 10, 250);
    rect(360, 200, 10, 250);
    arc(200, 320, 40, 40, 0, 180);
    arc(200, 80, 40, 40, 180, 0);
    arc(40, 200, 40, 40, 90, 270);
    arc(360, 200, 40, 40, 270, 90);
  }

  // drawH creates the letter H using rectangles
  drawHLogo(rb, gb, bb) {
    noStroke();

    fill(250 + 50, 40 - 10, 120 + 50);
    rect(this.xh + 75, this.yh + 60, 100, 140, 10);
    fill(rb, gb, bb);
    rect(this.xh + 75, this.yh + 15, 40, 50);
    rect(this.xh + 75, this.yh + 105, 40, 50);
  }
  // Creates the streaking animation for both the letters inside the TV
  updatestreak() {
    // Keeping the y coordinate of the letters between 90 and 190
    if (this.y > 190) {
      this.incrementer = -2;
    }
    if (this.y < 90) {
      this.incrementer = 2;
    }
    this.y = this.y + this.incrementer;

    // keeping the x coordiante of the letters between 90 and 230
    if (this.x > 230) {
      this.incrementerx = -2;
    }
    if (this.x < 90) {
      this.incrementerx = 2;
    }
    this.x = this.x + this.incrementerx;

    // create a vector of the given coordinates
    var coordinates = createVector(this.x, this.y);
    // push the coordinates to the history of the coordinates to create the streak
    this.cohist.push(coordinates);

    // history length shouldnot exceed 20 and if it does remove the the first element of the
    // history array
    if (this.cohist.length > 20) {
      this.cohist.splice(0, 1);
    }
  }

  // Creates the nanimation of S flying in from the corner
  updateSLogo() {
    if (this.xs < this.initx) {
      this.xs = this.xs + 5;
    }
    if (this.ys < this.inity) {
      this.ys = this.ys + 5;
    }

    // If the animation is complete then return true else return false
    if (this.xs == this.initx && this.ys == this.inity) {
      return true;
    } else {
      return false;
    }
  }

  // The function drops H from the top of the canvas
  updateHLogo() {
    if (this.yh < this.inity) {
      this.yh = this.yh + 5;
    }

    //if the animation is complete then return true else return false
    if (this.yh == this.inity) {
      return true;
    } else {
      return false;
    }
  }
  
  // function to make the game play letters slowly appear onto the game screen
  fadeIn() {
    // slowly increase the rl, gl, bl, values to make the letters appear again
    if (this.rl < 250) {
      this.rl = this.rl + 5;
    }
    if (this.gl < 40) {
      this.gl = this.gl + 5;
    }
    if (this.bl < 120) {
      this.bl = this.bl + 5;
    }
    // return true if the animaiton is complete
    if (this.rl == 250 && this.gl == 40 && this.bl == 120) {
      return true;
    } else {
      return false;
    }
  }
  // to make the letters disappear after the game is over  
  fadeOut1(rb, gb, bb) {
    // slowly decrease the rl, gl, bl value until the color of the letters is black (background)
    if (this.rl > 0) {
      this.rl = this.rl - 5;
    }
    if (this.gl > 0) {
      this.gl = this.gl - 5;
    }
    if (this.bl > 0) {
      this.bl = this.bl - 5;
    }
    
    // keep redrawing the letters to preserve the screen and create a smooth animation
    fill(this.rl, this.gl, this.bl);
    rect(this.xs, this.ys, 30, 10, 10);
    noFill();
    stroke(this.rl, this.gl, this.bl);
    strokeWeight(10);
    arc(this.xs - 10, this.ys + 15, 30, 30, 90, 270);
    arc(this.xs - 10, this.ys + 45, 30, 30, 270, 90);
    noStroke();
    fill(this.rl, this.gl, this.bl);
    rect(this.xs - 20, this.ys + 60, 30, 10, 10);

    rect(this.xh, this.yh, 45, 70, 5);
    fill(rb, gb, bb);
    rect(this.xh, this.yh - 20, 15, 30);
    rect(this.xh, this.yh + 20, 15, 30);
  }
  // The function creates the changing color animaiton.
  updateColor() {
    // the map function maps a value between -1 to 1 to a value between 50 and 255 
    // the input value is given by the sin or cosine of frameCount
    this.rl = map(sin(frameCount), -1, 1, 50, 255);
    this.gl = map(cos(frameCount), -1, 1, 50, 255);
    this.bl = map(sin(frameCount), -1, 1, 50, 255);
  }
  
  // the function creates the game screen of the game
  gameScreen(rb, gb, bb) {
    
    // S and H appear on the screen
    fill(this.rl, this.gl, this.bl);
    rect(this.xs, this.ys, 30, 10, 10);
    noFill();
    stroke(this.rl, this.gl, this.bl);
    strokeWeight(10);
    arc(this.xs - 10, this.ys + 15, 30, 30, 90, 270);
    arc(this.xs - 10, this.ys + 45, 30, 30, 270, 90);
    noStroke();
    fill(this.rl, this.gl, this.bl);
    rect(this.xs - 20, this.ys + 60, 30, 10, 10);

    rect(this.xh, this.yh, 45, 70, 5);
    fill(rb, gb, bb);
    rect(this.xh, this.yh - 20, 15, 30);
    rect(this.xh, this.yh + 20, 15, 30);
    
    // redrawing the stars to preserve the screen
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    
    // redrawing the border to preserve the screen 
    fill(255, 99, 71);
    arc(this.xb1, this.yb1, 40, 40, 0, 180);
    arc(this.xb2, this.yb2, 40, 40, 180, 0);
    arc(this.xb3, this.yb3, 40, 40, 90, 270);
    arc(this.xb4, this.yb3, 40, 40, 270, 90);
    rect(this.xb1, this.yb1, 100, 10);
    rect(this.xb2, this.yb2, this.length, 10);
    rect(this.xb3, this.yb3, 10, this.height);
    rect(this.xb4, this.yb4, 10, this.height);
    
    // showing the current score of the player in the top right corner of the screen in yellow color
    fill(255, 243, 0);
    text("Score:", 330, 25);
    text(str(this.score), 370, 25);
  }
  
  // winning screen appears when the game is over and if the player has won the game
  winningScreen(rb, gb, bb) {
    // Prints the message "Congratulations !!! You Win, with the winning score in the bottom"
    // The color of the text changes continuosly
    noStroke();
    textSize(25);
    this.rw = map(sin(frameCount), -1, 1, 100, 255);
    this.gw = map(cos(frameCount), -1, 1, 100, 255);
    this.bw = map(sin(frameCount), -1, 1, 100, 255);
    fill(this.rw, this.gw, this.bw);
    text("Congratulations !!!", 100, 170);
    text("You win", 150, 200);
    text("Your score is 20", 120, 230);
  
    // preserving the screen and preventing it from turning black
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }

    fill(255, 99, 71);
    arc(this.xb1, this.yb1, 40, 40, 0, 180);
    arc(this.xb2, this.yb2, 40, 40, 180, 0);
    arc(this.xb3, this.yb3, 40, 40, 90, 270);
    arc(this.xb4, this.yb3, 40, 40, 270, 90);
    rect(this.xb1, this.yb1, 100, 10);
    rect(this.xb2, this.yb2, this.length, 10);
    rect(this.xb3, this.yb3, 10, this.height);
    rect(this.xb4, this.yb4, 10, this.height);
  }
  
  // losing screen appears when the game is over and if the player has lost the game
  loserScreen(rb, gb, bb) {
    // Prints the message "Sorry you lost the game of JUGGLR !!!"
    noStroke();
    textSize(25);
    fill(255);
    text("Sorry you lost the game of", 50, 200);
    text("JUGGLR !!!", 125, 230);
  
    // preserving the screen and preventing it from turning black
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }

    fill(255, 99, 71);
    arc(this.xb1, this.yb1, 40, 40, 0, 180);
    arc(this.xb2, this.yb2, 40, 40, 180, 0);
    arc(this.xb3, this.yb3, 40, 40, 90, 270);
    arc(this.xb4, this.yb3, 40, 40, 270, 90);
    rect(this.xb1, this.yb1, 100, 10);
    rect(this.xb2, this.yb2, this.length, 10);
    rect(this.xb3, this.yb3, 10, this.height);
    rect(this.xb4, this.yb4, 10, this.height);
  }
  
  // function to move the letters and to check the collision between the letters and the 
  // bar 
  move() {
    // Move the letters
    this.xs += this.xsDir;
    this.ys += this.ysDir;

    this.xh += this.xhDir;
    this.yh += this.yhDir;
    
    // change the direction of S if it hits any of the walls on the side of the screen
    if (this.xs > width - 15 || this.xs < 40) {
      this.xsDir = -this.xsDir;
    }
    // change the direction of S if it hits top of the screen
    if (this.ys < 10) {
      this.ysDir = -this.ysDir;
    }
    // If S is close to the bottom of the screen 
    if (this.ys > height - 65) {
      // Then check for collision and if collision happens then ...
      if (dist(this.xs, 0, this.xb1, 0) <= 65) {
        // Increment the score by 1
        this.score++;
        // Increase the speed of the letter if the player has reached 10 points or 15 points
        // to increase difficulty
        if (
          (this.ysDir != 4 || this.ysDir != -4) &&
          (this.score == 10 || this.score == 15)
        ) {
          if (this.ysDir < 0) {
            this.ysDir--;
          } else {
            this.ysDir++;
          }
          if (this.yhDir < 0) {
            this.yhDir--;
          } else {
            this.yhDir++;
          }
        }
        this.ysDir = -this.ysDir;
      } 
      else { // if the collision is not detected then the game is over 
        this.gameOver = true;
      }
    }
    // same procedure is used for letter H as that for the letter S 
    if (this.xh > width - 25 || this.xh < 25) {
      this.xhDir = -this.xhDir;
    }
    if (this.yh > height - 35) {
      if (dist(this.xh, 0, this.xb1, 0) <= 65) {
        this.score++;
        if (
          (this.yhDir != 4 || this.yhDir != -4) &&
          (this.score == 10 || this.score == 15)
        ) {
          if (this.yhDir < 0) {
            this.yhDir--;
          } else {
            this.yhDir++;
          }
          if (this.ysDir < 0) {
            this.ysDir--;
          } else {
            this.ysDir++;
          }
        }
        this.yhDir = -this.yhDir;
      } else {
        this.gameOver = true;
      }
    }
    if (this.yh < 40) {
      this.yhDir = -this.yhDir;
    }
    fill(255, 243, 0);
    text(str(this.score), 370, 25);
    
    // if the score is 20 or the game is over return true 
    if (this.score == 20 || this.gameOver) {
      return true;
    } else {
      return false;
    }
  }
  
  // tells the FSM if the player has lost the game or won the game
  // true - player has won the game 
  // false - player has lost the game 
  gameState() {
    if (this.score == 20) {
      return true;
    } else if (this.gameOver) {
      return false;
    }
  }
  // Function to move the bar at the bottom 
  moveBar() {
    // this.xb1 = x;

    if (keyIsDown(LEFT_ARROW) && this.xb1 > 50) {
      this.xb1 -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) && this.xb1 < width - 50) {
      this.xb1 += 5;
    }
  }
}
var barX = 200;

// function keyPressed(){
//   if(keyCode == LEFT_ARROW && barX > 50){
//       barX -= 2;
//     }

//     if(keyCode == RIGHT_ARROW && barX < (width-50)){
//       barX += 2;
//     }
// }

// Initializing the Global variables that need to be set once initially
var game;
var bg = 220;
var bool1 = false;
var bool2 = false;
var bool3 = false;
var bool4 = false;
var bool5 = false;
var bool6 = false;
var playGame = false;
var gameOver = false;
// check if the user clicks the mouse somehwere inside the area of the logo
function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY; // check if clicked in the correct box
  if (xCor > 30 && xCor < 370 && yCor > 70 && yCor < 330 && bool4) {
    bool5 = true;
  }
}
function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			



function setup() {
  //create the canvas
  //createCanvas(400, 400);
  //setup method which instantiates all of the objects that will be used in the logo animation.

  //createCanvas(400, 400); 
  	
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
	
  // rectMode is changes to center
  rectMode(CENTER);
  // angleMode is changed to degrres
  angleMode(DEGREES);
  bg = 220;

  // creating a new object of the class
  game = new Game(160, 150, bg, 250, 40, 120);
}

function draw() {
  background(0, 0, 0);

  // The finite state machine is implemented here
  // The FSM creates the animations one after the other in order

  // The stars are drawn first and once that is complete bool1 is set to true to move onto
  // the next animation
  if (!bool1) {
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    bool1 = true;
  } else if (!bool2) {
    // Next the animation for the TV happens, and once completed, i.e updateinit() returns true move onto to the next animation
    game.init();
    bool2 = game.updateinit();
  } else if (!bool3) {
    // The letter S flies in here, once complete(update returns true), move to the next state
    bool3 = game.updateSLogo();
    game.drawSLogo(0, 0, 0);
  } else if (!bool4) {
    // The letter H drops down here, once complete(updateH returns true), move to the next state
    bool4 = game.updateHLogo();
    game.drawHLogo(0, 0, 0);
    game.drawSLogo(0, 0, 0); // S is redrawn in its current position to preserve the canvas.
  } else if (!bool5) {
    // keep the streak animation going
    game.drawLogo(0, 0, 0);
    game.updatestreak();
    fill(144, 238, 144);
    text("Press anywhere within the Logo to start the game", 75, 350);
  } else if (!bool6) { // once the users clicks somewhere inside the logo, bool5 is set to true
    var fade1 = game.fadeOutletter(0, 0, 0); // returns true once the letters have faded out 
    
    // redraw the stars 
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        fill(255);
        ellipse(i * 10, j * 10, 2, 2);
      }
    }
    var fade2 = game.fadeOut(); // returns true once the box turns into the borders od the game screen 

    bool6 = fade2 & fade1; // bool 6 is true once both the fade out animations are completed
  } else if (!playGame) { // now the animaiton to draw the game screen and the letters takes place  
    game.gameScreen(0, 0, 0); // draw the game screen 
    playGame = game.fadeIn(); // and let the letters fade in, omce completed move onto the next stage
  } else if (!gameOver) { // in this state the user plays the game 
    //game.move();
    game.gameScreen(0, 0, 0); // draw the game screen 
    gameOver = game.move(); // move the letters and check for the state of the game
    game.moveBar(barX); // move the bar at the bottom based on the inputs from the user 
    game.updateColor(); // update the color of the letters
    //print("Here");
  } else { // once the game is over 
    if (game.gameState()) { // check if the user has lost or won the game, and print messages accordingly
      game.fadeOut1(0, 0, 0);
      game.winningScreen(0, 0, 0);
    } else {
      game.fadeOut1(0, 0, 0);
      game.loserScreen(0, 0, 0);
    }
  }
}
