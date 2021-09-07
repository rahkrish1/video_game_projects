/**
 * Author: Alex Sablan
 * Date: August 31, 2021
 * Description: When playing poker, the dealer usually sprawls the cards and then lays them out  in a horizontal line. I tried to depict that but instead it's simply just 4 cards with my first name written out. The green background is used to attempt to replicate the green felt of the poker table.
 */

// Constants for scaling size purposes
const BASE_RADIUS = 2;
const STEM_FACTOR_X = 7 / 5;
const STEM_FACTOR_Y = 4;
const CARD_WIDTH_FACTOR = 18;
const CARD_HEIGHT_FACTOR = 24;

// Class for the spade (symbol on the card)
class Spade {
  /**
   * @param posX
   *           Center's x-coordinate
   * @param posY
   *           Center's y-coordinate
   * @param size
   *           Relative size of the spade that will be scaled
   * @param startAngle
   *           Angle at which the spade is displayed on the card relative to the card
   */
  constructor(posX, posY, size, startAngle) {
    this.x = posX;
    this.y = posY;
    this.size = size;
    this.radius = BASE_RADIUS * size;
    this.angle = startAngle;
  }

  draw() {
    // Allows for the spade to be rotated upside down on the card
    push();
    translate(this.x, this.y);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    
    // Top of spade
    line(
      this.x - (this.radius + this.radius * 0.707),
      this.y - this.radius * 0.707,
      this.x,
      this.y - this.radius * 2
    );
    line(
      this.x + (this.radius + this.radius * 0.707),
      this.y - this.radius * 0.707,
      this.x,
      this.y - this.radius * 2
    );

    // Two bottoms of spade
    noFill();
    arc(
      this.x - this.radius,
      this.y,
      this.radius * 2,
      this.radius * 2,
      PI / 4,
      (5 / 4) * PI
    ); // Left, rounded bottom of spade
    arc(
      this.x + this.radius,
      this.y,
      this.radius * 2,
      this.radius * 2,
      -PI / 4,
      (3 / 4) * PI
    ); // Right, rounded bottom of spade

    // Stem
    noFill();
    line(
      this.x - this.size * STEM_FACTOR_X,
      this.y + this.size * STEM_FACTOR_Y,
      this.x + this.size * STEM_FACTOR_X,
      this.y + this.size * STEM_FACTOR_Y
    ); // Bottom of stem
    line(
      this.x - this.size * STEM_FACTOR_X,
      this.y + this.size * STEM_FACTOR_Y,
      this.x - (this.radius - this.radius * 0.707),
      this.y + this.radius * 0.707
    ); // Left part of stem
    line(
      this.x + this.size * STEM_FACTOR_X,
      this.y + this.size * STEM_FACTOR_Y,
      this.x + (this.radius - this.radius * 0.707),
      this.y + this.radius * 0.707
    ); // Right part of stem
    pop();
  }

  /**
   * Updates the new center to adjust for translation
   * @param newX
   *          The symbol's adjusted x-coordinate
   * @param newY
   *          The symbol's adjusted y-coordinate
   */
  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

// Class for the letter 'A'
class A {
  /**
   * @param posX
   *           Center's x-coordinate
   * @param posY
   *           Center's y-coordinate
   * @param width
   *           Width of the letter
   * @param height
   *           Height of the letter
   * @param startAngle
   *           Angle at which the letter is displayed on the card relative to the card
   */
  constructor(posX, posY, width, height, startAngle) {
    this.x = posX
    this.y = posY
    this.width = width;
    this.height = height;
    this.angle = startAngle;
  }

  draw() {
    // Allows for 'A' to be rotated on card
    push();
    translate(this.x, this.y);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    fill(0);
    
    // Construction of the letter 'A'
    quad(
      this.x-(this.width / 2),
      this.y+(2*this.height / 3),
      this.x-(this.width / 3),
      this.y+(2*this.height / 3),
      this.x-(this.width / 3)+(this.height / 6),
      this.y-(this.height / 2),
      this.x-(this.width / 2)+(this.height / 6),
      this.y-(this.height / 2)
    ); // Left slant of the 'A'
    quad(
      this.x+(this.width / 2),
      this.y+(2*this.height / 3),
      this.x+(this.width / 3),
      this.y+(2*this.height / 3),
      this.x+(this.width / 3)-(this.height / 6),
      this.y-(this.height / 2),
      this.x+(this.width / 2)-(this.height / 6),
      this.y-(this.height / 2)
    ); // Right slant of the 'A'
    quad(
      this.x-(this.width)+(this.height / 2),
      this.y+(this.height / 3),
      this.x-(this.width)+(this.height / 2),
      this.y+(this.height / 7),
      this.x+(this.width)-(this.height / 2),
      this.y+(this.height / 7),
      this.x+(this.width)-(this.height / 2),
      this.y+(this.height / 3)
    ); // Middle bridge betweens both slants
    
    pop();
  }
  
  /**
   * Updates the new center to adjust for translation
   * @param newX
   *          The symbol's adjusted x-coordinate
   * @param newY
   *          The symbol's adjusted y-coordinate
   */
  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class L {
  /**
   * @param posX
   *           Center's x-coordinate
   * @param posY
   *           Center's y-coordinate
   * @param width
   *           Width of the letter
   * @param height
   *           Height of the letter
   * @param startAngle
   *           Angle at which the letter is displayed on the card relative to the card
   */
  constructor(posX, posY, width, height, startAngle) {
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;
    this.angle = startAngle;
  }

  draw() {
    // Allows for 'L' to be rotated on card
    push();
    translate(this.x, this.y);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    fill(0);
    rect(
      this.x-(this.width / 2), 
      this.y-(this.height / 2), 
      this.width / 4, 
      this.height
    );
    rect(
      this.x-(this.width / 2), 
      this.y+(this.height / 2), 
      this.width, 
      this.height / 6
    );
    pop();
  }
  
  /**
   * Updates the new center to adjust for translation
   * @param newX
   *          The symbol's adjusted x-coordinate
   * @param newY
   *          The symbol's adjusted y-coordinate
   */
  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class E {
  /**
   * @param posX
   *           Center's x-coordinate
   * @param posY
   *           Center's y-coordinate
   * @param width
   *           Width of the letter
   * @param height
   *           Height of the letter
   * @param startAngle
   *           Angle at which the letter is displayed on the card relative to the card
   */
  constructor(posX, posY, width, height, startAngle) {
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;
    this.angle = startAngle;
  }

  draw() {
    // Allows for 'E' to be rotated on card
    push();
    translate(this.x, this.y);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    fill(0);
    rect(
      this.x-(this.width / 2), 
      this.y-(this.height / 2), 
      this.width / 4, 
      this.height
    ); // Backbone of 'E'
    rect(
      this.x-(this.width / 2),
      this.y-(this.height / 2),
      this.width,
      this.height / 6
    ); // Top portion of 'E'
    rect(
      this.x-(this.width / 2),
      this.y,
      2*this.width / 3,
      this.height / 6
    ); // Middle portion of 'E'
    rect(
      this.x-(this.width / 2), 
      this.y+(this.height / 2), 
      this.width, 
      this.height / 6
    ); // Bottom portion of 'E'
    pop();
  }
  
  /**
   * Updates the new center to adjust for translation
   * @param newX
   *          The symbol's adjusted x-coordinate
   * @param newY
   *          The symbol's adjusted y-coordinate
   */
  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class X {
  /**
   * @param posX
   *           Center's x-coordinate
   * @param posY
   *           Center's y-coordinate
   * @param width
   *           Width of the letter
   * @param height
   *           Height of the letter
   */
  constructor(posX, posY, width, height) {
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;
  }

  draw() {
    fill(0);
    quad(
      this.x-(this.width / 2),
      this.y-(this.height / 2),
      this.x-(this.width / 3),
      this.y-(this.height / 2),
      this.x+(this.width / 2),
      this.y+(this.height / 2)+(this.height / 6),
      this.x+(this.width / 3),
      this.y+(this.height / 2)+(this.height / 6)
    ); // Positive-sloped slant
    quad(
      this.x-(this.width / 2),
      this.y+(this.height / 2)+(this.height / 6),
      this.x-(this.width / 3),
      this.y+(this.height / 2)+(this.height / 6),
      this.x+(this.width / 2),
      this.y-(this.height / 2),
      this.x+(this.width / 3),
      this.y-(this.height / 2)
    ); // Negative-sloped slant
  }
  
  /**
   * Updates the new center to adjust for translation
   * @param newX
   *          The symbol's adjusted x-coordinate
   * @param newY
   *          The symbol's adjusted y-coordinate
   */
  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

// Class for the ace of spades card
class Card {
  /**
   * @param x
   *           The center's x-coordinate
   * @param y
   *           The center's y-coordinate
   * @param Csize
   *           Relative size of the card that will be scaled
   * @param letter
   *           Letter being displayed on the card
   */
  constructor(x, y, Csize, letter) {
    this.x = x;
    this.y = y;
    this.size = Csize;

    // Defining dimensions of the card
    this.width = Csize * CARD_WIDTH_FACTOR;
    this.height = Csize * CARD_HEIGHT_FACTOR;
    this.cornerDiameter = Csize * 4;
    this.cornerRadius = this.cornerDiameter / 2;

    // Defining starting angle, pivot location, rotation rate, and offset for movement
    this.pivotX = x - this.width / 2;
    this.pivotY = y + this.height / 2;
    this.angle = 0;
    this.rotationRate = -0.01;
    this.offsetX = 0;

    // Creating symbols and letters on the card
    this.centerSpade = new Spade(
      x, 
      y, 
      Csize, 
      0
    ); // Center spade
    this.leftSpade = new Spade(
      x - this.width / 2,
      y - this.height / 6,
      Csize / 3,
      0
    ); // Upper-left spade
    this.rightSpade = new Spade(
      x + this.width / 2,
      y + this.height / 6,
      Csize / 3,
      PI
    ); // Bottom-right spade
    
    // Creates the letter on the card depending on the desired letter
    if (letter == 'a') {
      this.topLetter = new A(
        x - this.width / 2,
        y - this.height / 2,
        this.leftSpade.radius*2,
        this.leftSpade.radius*3,
        0
      ); // Top letter on card
      this.bottomLetter = new A(
        x + this.width / 2,
        y + this.height / 2,
        this.rightSpade.radius*2,
        this.rightSpade.radius*3,
        PI
      ); // Bottom letter on card
    } else if (letter == 'l') {
      this.topLetter = new L(
        x - this.width / 2,
        y - this.height / 2,
        this.leftSpade.radius*2,
        this.leftSpade.radius*3,
        0
      ); // Top letter on card
      this.bottomLetter = new L(
        x + this.width / 2,
        y + this.height / 2,
        this.rightSpade.radius*2,
        this.rightSpade.radius*3,
        PI
      ); // Bottom letter on card
    } else if (letter == 'e') {
      this.topLetter = new E(
        x - this.width / 2,
        y - this.height / 2,
        this.leftSpade.radius*2,
        this.leftSpade.radius*3,
        0
      ); // Top letter on card
      this.bottomLetter = new E(
        x + this.width / 2,
        y + this.height / 2,
        this.rightSpade.radius*2,
        this.rightSpade.radius*3,
        PI
      ); // Bottom letter on card
      } else if (letter == 'x') {
      this.topLetter = new X(
        x - this.width / 2,
        y - this.height / 2,
        this.leftSpade.radius*2,
        this.leftSpade.radius*3,
        0
      ); // Top letter on card
      this.bottomLetter = new X(
        x + this.width / 2,
        y + this.height / 2,
        this.rightSpade.radius*2,
        this.rightSpade.radius*3,
        PI
      ); // Bottom letter on card
    }
    }

  draw() {
    // Used for sprawling the cards
    push();
    translate(this.pivotX, this.pivotY);
    this.x = this.width / 2 + this.offsetX;
    this.y = -(this.height / 2);

    // Defining the borders
    this.leftBorder = -this.cornerRadius;
    this.rightBorder = this.width + this.cornerRadius;
    this.topBorder = -(this.height + this.cornerRadius);
    this.bottomBorder = this.cornerRadius;
    rotate((this.angle -= this.rotationRate));

    // Background of the card (prevents clipping of the cards)
    noStroke();
    rect(
      this.leftBorder + this.offsetX,
      this.topBorder + this.cornerRadius,
      this.rightBorder - this.leftBorder,
      this.height
    ); // Covers the vertical-most portion of the card prior to curved edges
    rect(
      this.leftBorder + this.cornerRadius + this.offsetX,
      this.topBorder,
      this.width,
      this.bottomBorder - this.topBorder
    ); // Covers the horizontal-most portion of the card prior to curved edges
    ellipse(
      this.leftBorder + this.cornerRadius + this.offsetX,
      this.topBorder + this.cornerRadius,
      this.cornerDiameter,
      this.cornerDiameter
    ); // Top-left corner
    ellipse(
      this.rightBorder - this.cornerRadius + this.offsetX,
      this.topBorder + this.cornerRadius,
      this.cornerDiameter,
      this.cornerDiameter
    ); // Top-right corner
    ellipse(
      this.leftBorder + this.cornerRadius + this.offsetX,
      this.bottomBorder - this.cornerRadius,
      this.cornerDiameter,
      this.cornerDiameter
    ); // Bottom-left corner
    ellipse(
      this.rightBorder - this.cornerRadius + this.offsetX,
      this.bottomBorder - this.cornerRadius,
      this.cornerDiameter,
      this.cornerDiameter
    ); // Bottom-right corner

    // Straight edges of card
    stroke("black");
    strokeWeight(2);
    line(
      this.leftBorder + this.offsetX,
      this.topBorder + this.cornerRadius,
      this.leftBorder + this.offsetX,
      this.bottomBorder - this.cornerRadius
    ); // Left Edge
    line(
      this.rightBorder + this.offsetX,
      this.topBorder + this.cornerRadius,
      this.rightBorder + this.offsetX,
      this.bottomBorder - this.cornerRadius
    ); // Right Edge
    line(
      this.leftBorder + this.cornerRadius + this.offsetX,
      this.topBorder,
      this.rightBorder - this.cornerRadius + this.offsetX,
      this.topBorder
    ); // Top Edge
    line(
      this.leftBorder + this.cornerRadius + this.offsetX,
      this.bottomBorder,
      this.rightBorder - this.cornerRadius + this.offsetX,
      this.bottomBorder
    ); // Bottom Edge
    noFill();

    // Curves on card
    arc(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.cornerDiameter,
      this.cornerDiameter,
      PI,
      -HALF_PI
    ); // Upper-left corner
    arc(
      this.x + this.width / 2,
      this.y - this.height / 2,
      this.cornerDiameter,
      this.cornerDiameter,
      -HALF_PI,
      0
    ); // Upper-right corner
    arc(
      this.x - this.width / 2,
      this.y + this.height / 2,
      this.cornerDiameter,
      this.cornerDiameter,
      HALF_PI,
      PI
    ); // Bottom-Left corner
    arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.cornerDiameter,
      this.cornerDiameter,
      0,
      HALF_PI
    ); // Bottom-Right corner

    // Drawing spades on the card
    this.centerSpade.update(this.width / 2 + this.offsetX, -(this.height / 2));
    this.leftSpade.update(this.offsetX, -((5 * this.height) / 6));
    this.rightSpade.update(this.width + this.offsetX, -(this.height / 6));
    this.centerSpade.draw();
    this.leftSpade.draw();
    this.rightSpade.draw();
    
    // Drawing the letters on the card
    this.topLetter.update(this.offsetX, -this.height);
    this.bottomLetter.update(this.width + this.offsetX, 0);
    this.topLetter.draw();
    this.bottomLetter.draw();
    pop();
  }
  
}

// The 4 cards being utilized
var aCard, lCard, eCard, xCard;
var cards = [];
function setup() {
////////Added on 6 sept 2021 ////////////////////
     
	 

    let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	//resizeCanvas(sketchGameWidth, sketchGameHeight);
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

  //createCanvas(400, 400);
  
  aCard = new Card(width / 2, height / 2, 6, 'a');
  cards.push(aCard);
  aCard.rotationRate = 0.02; // Initial rotation rate for card 'A'

  lCard = new Card(width / 2, height / 2, 6, 'l');
  cards.push(lCard);
  lCard.rotationRate = 0.01; // Initial rotation rate for card 'L'

  eCard = new Card(width / 2, height / 2, 6, 'e');
  cards.push(eCard);
  eCard.rotationRate = -0.001; // Initial rotation rate for card 'E'

  xCard = new Card(width / 2, height / 2, 6, 'x');
  cards.push(xCard);
  xCard.rotationRate = -0.011; // Initial rotation rate for card 'X'

}

function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			
////////////////////////////////////////////////////////////////////
// Variables to control display time for each sequence, determining sequence number, and whether or not the state needs to be reset
var pFrameCount;
var enTime = false;
var firstSequence = true;
var flag = false;
var reset = false;

// Draws the cards and their current state on the table
function draw() {
  background('green');
  // These functions reset the positions of the cards to loop the animation
  if (aCard.offsetX != 0 && reset) {
    aCard.offsetX += 3;
  }
  if (lCard.offsetX != 0 && reset) {
    lCard.offsetX += 3;
  }
  if (eCard.offsetX != 0 && reset) {
    eCard.offsetX -= 3;
  }
  if (xCard.offsetX != 0 && reset) {
    xCard.offsetX -= 3;
  } else if (reset) {
    aCard.angle = 0;
    lCard.angle = 0;
    eCard.angle = 0;
    xCard.angle = 0;
    aCard.rotationRate = 0.02;
    lCard.rotationRate = 0.01;
    eCard.rotationRate = -0.001;
    xCard.rotationRate = -0.011;
    firstSequence = true;
    reset = false;
  }
  
  // Stops the first sprawl of the cards
  if (aCard.angle <= -PI / 8 && !enTime && firstSequence) {
    aCard.rotationRate = 0;
    lCard.rotationRate = 0;
    eCard.rotationRate = 0;
    xCard.rotationRate = 0;
    pFrameCount = frameCount;
    enTime = true;
  }
  
  // Stops the over-rotation of cards back to their original positions
  else if (aCard.angle > 0 && firstSequence) { 
    aCard.rotationRate = 0;
    lCard.rotationRate = 0;
    eCard.rotationRate = 0;
    xCard.rotationRate = 0;
    enTime = true;
    firstSequence = false;
    pFrameCount = frameCount;
  }
  
  // Rotates the cards back to their original angles
  if (enTime && frameCount - pFrameCount >= 60 && firstSequence) {
    aCard.rotationRate = -0.02;
    lCard.rotationRate = -0.01;
    eCard.rotationRate = 0.001;
    xCard.rotationRate = 0.011;
    enTime = false;
  }
  
  // Taking the cards to the far left side of the table
  if (!firstSequence && !flag && frameCount - pFrameCount >= 30 && !reset) {
    aCard.offsetX -= 3;
    lCard.offsetX -= 3;
    eCard.offsetX -= 3;
    xCard.offsetX -= 3;
    if (aCard.x <= width / 5 - aCard.pivotX) {
      flag = true;
      pFrameCount = frameCount;
    }
  }
  
  // Spreads the cards out in a horizontal line across the table
  if (!firstSequence && flag  && !reset) {
    if (lCard.x < (2 * width) / 5 - aCard.pivotX) {
      lCard.offsetX += 3;
    }
    if (eCard.x < (3 * width) / 5 - aCard.pivotX) {
      eCard.offsetX += 3;
    }
    if (xCard.x < (4 * width) / 5 - aCard.pivotX) {
      xCard.offsetX += 3;
    } else if (frameCount - pFrameCount >= 200){
      flag = false;
      reset = true;
      enTime = false;
    }
  }

  // Prints out the cards
  for (let i = 0; i < cards.length; ++i) {
    cards[i].draw();
  }
}
