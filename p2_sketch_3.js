/*************************************************************
 * Nathan Moeliono
 * ECE 4525
 * Hw 2 - Tile Map Game
 * 9/14/2021
 * 
 * A "top-down" game where the player tries to collect all 20 coins. 
 * The character can move around using the arrow keys. The player 
 * also has to avoid 5 enemies, as if it collides with one it is
 * game over.
 ************************************************************/

/*********************
 * GLOBAL VARIABLES
 *********************/
/**
 * Draw and update the game
 */
 /**
 * Class that represents a brick
 */
 /**
 * Class that represents the playable character
 */
  class Character {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;

        // set the movement speed
        this.speed = 2;

        // set the character width and height
        this.characterW = 15;
        this.characterH = 15;

        // set the cloud the player rides on
        this.cloud = new Cloud(this.x, this.y + (this.h / 2) + 4);

        // set the bounding box
        this.boundX = this.x + 2;
        this.boundY = this.y + 1;
        this.boundW = 16;
        this.boundH = 16;
    }

    draw() {
        // draw bounding box
        stroke(0);
        fill(0);
        //rect(this.x + 2, this.y + 1, 16, 16);
        // draw clothes
        stroke('#b72504');
        fill('#b72504');
        rect(this.x + 5, this.y + 11, 10, 5);
        // draw body
        stroke('#716804');
        fill('#716804');
        rect(this.x + 8, this.y + 11, 4, 2);
        // draw overall studs
        stroke('#eeaf36');
        fill('#eeaf36');
        ellipse(this.x + 6, this.y + 12, 1, 1);
        ellipse(this.x + 14, this.y + 12, 1, 1);
        // draw face
        stroke('#eeaf36');
        fill('#eeaf36');
        ellipse(this.x + (this.w / 2), this.y + 7, this.characterW, this.characterH / 2);
        // draw nose
        ellipse(this.x + 17, this.y + 6, 2, 1);
        // draw hat
        stroke('#b72504');
        fill('#b72504');
        arc(this.x + (this.w / 2), this.y + 9, this.characterW, this.characterH, PI + QUARTER_PI, TWO_PI - QUARTER_PI, CHORD);
        line(this.x + 5, this.y + 4, this.x + (this.w / 2) + 8, this.y + 4);
        // draw eyes
        stroke('#716804');
        fill('#716804');
        ellipse(this.x + 12, this.y + 6, 1, 2);
        // draw beard
        line(this.x + 10, this.y + 9, this.x + (this.w / 2) + 7, this.y + 9);
        // draw hair
        ellipse(this.x + 4, this.y + 6, 2, 1);
        ellipse(this.x + 5, this.y + 6, 1, 2);
        // draw cloud
        this.cloud.draw();
    }

    update(bricks) {
        // if left-arrow key is pressed, move character to the left
        if (keyIsDown(LEFT_ARROW)) {
            // update player position based on speed and direction
            this.x -= this.speed;
            
            // check every brick for a possible collision,
            // if there is a collision, move player to the correct
            // location outside of that brick
            let newX = this.x;
            bricks.forEach(brick => {
                let ret = this.checkCollisionBrickRight(brick);
                if (ret != this.x) {
                    newX = ret;
                }
            });
            this.x = newX;
        }
        // if right-arrow key is pressed, move character to the right
        if (keyIsDown(RIGHT_ARROW)) {
            // update player position based on speed and direction
            this.x += this.speed;
            
            // check every brick for a possible collision,
            // if there is a collision, move player to the correct
            // location outside of that brick
            let newX = this.x;
            bricks.forEach(brick => {
                let ret = this.checkCollisionBrickLeft(brick);
                if (ret != this.x) {
                    newX = ret;
                }
            });
            this.x = newX;
        }
        // if up-arrow key is pressed, move character up
        if (keyIsDown(UP_ARROW)) {
            // update player position based on speed and direction
            this.y -= this.speed;
            
            // check every brick for a possible collision,
            // if there is a collision, move player to the correct
            // location outside of that brick
            let newY = this.y;
            bricks.forEach(brick => {
                let ret = this.checkCollisionBrickBottom(brick);
                if (ret != this.y) {
                    newY = ret;
                }
            });
            this.y = newY;
        }
        // if right-arrow key is pressed, move character down
        if (keyIsDown(DOWN_ARROW)) {
            // update player position based on speed and direction
            this.y += this.speed;
            
            // check every brick for a possible collision,
            // if there is a collision, move player to the correct
            // location outside of that brick
            let newY = this.y;
            bricks.forEach(brick => {
                let ret = this.checkCollisionBrickTop(brick);
                if (ret != this.y) {
                    newY = ret;
                }
            });
            this.y = newY;
        }

        // update the cloud and bounding box positions
        this.cloud.y = this.y + (this.h / 2) + 4;
        this.cloud.x = this.x;
        this.boundX = this.x + 2;
        this.boundY = this.y + 1;
    }

    /**
     * Function that checks if the players is overlapping a given brick from the top
     */
    checkCollisionBrickTop(brick) {
        if (this.x > brick.x - this.w && this.x < brick.x + brick.w &&
            this.y + this.h > brick.y && this.y < brick.y) {
            return brick.y - this.h;
        }
        return this.y;
    }

    /**
     * Function that checks if the players is overlapping a given brick from the bottom
     */
    checkCollisionBrickBottom(brick) {
        if (this.x > brick.x - this.w && this.x < brick.x + brick.w &&
            this.y < brick.y + brick.h && this.y + this.h > brick.y + brick.h) {
            return brick.y + brick.h;
        }
        return this.y;
    }

    /**
     * Function that checks if the players is overlapping a given brick from the left
     */
    checkCollisionBrickLeft(brick) {
        if (this.y > brick.y - this.h && this.y < brick.y + brick.h &&
            this.x + this.w > brick.x && this.x < brick.x) {
            return brick.x - this.w;
        }
        return this.x;
    }

    /**
     * Function that checks if the players is overlapping a given brick from the right
     */
    checkCollisionBrickRight(brick) {
        if (this.y > brick.y - this.h && this.y < brick.y + brick.h &&
            this.x < brick.x + brick.w && this.x + this.w > brick.x + brick.w) {
            return brick.x + this.w;
        }
        return this.x;
    }
}

/**
 * Class that represents the dead character sprite
 */
class Cloud {
    
    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 9;
        this.h = 2;
    }

    draw() {
        // draw 3 white overlapping ellipses to form a cloud
        stroke(255);
        fill(255);
        ellipse(this.x + (this.w / 2) + 3, this.y + (this.h / 2), this.w, this.h);
        ellipse(this.x + (this.w / 2) + 7, this.y + (this.h / 2) + 1, this.w, this.h);
        ellipse(this.x + (this.w / 2) + 8, this.y + (this.h / 2) - 1, this.w, this.h);
    }
}

/**
 * Class that represents the dead character sprite
 */
class DeadCharacter {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;

        // set the character width and height
        this.characterW = 15;
        this.characterH = 15;

        // set the death timer
        this.deathTimer = 0;
    }

    draw() {
        // draw bounding box
        //rect(this.x, this.y, this.w, this.h);
        strokeWeight(1);
        // draw clothes
        stroke('#b72504');
        fill('#b72504');
        rect(this.x + 5, this.y + 11, 10, 5);
        // draw body
        stroke('#716804');
        fill('#716804');
        rect(this.x + 8, this.y + 11, 4, 2);
        // draw overall studs
        stroke('#eeaf36');
        fill('#eeaf36');
        ellipse(this.x + 6, this.y + 12, 1, 1);
        ellipse(this.x + 14, this.y + 12, 1, 1);
        // draw face
        stroke('#eeaf36');
        fill('#eeaf36');
        ellipse(this.x + (this.w / 2), this.y + 7, this.characterW, this.characterH / 2);
        // draw hat
        stroke('#b72504');
        fill('#b72504');
        arc(this.x + (this.w / 2), this.y + 9, this.characterW, this.characterH, PI + QUARTER_PI, TWO_PI - QUARTER_PI, CHORD);
        line(this.x + 5, this.y + 4, this.x + (this.w / 2) + 8, this.y + 4);
        // draw eyes
        stroke('#716804');
        fill('#716804');
        strokeWeight(1);
        textSize(5);
        text('X', this.x + 12, this.y + 8);
        text('X', this.x + 6, this.y + 8);
        strokeWeight(1);
        // draw hands and feet
        stroke('#eeaf36');
        fill('#eeaf36');
        ellipse(this.x + 5, this.y + 16, 3, 2);
        ellipse(this.x + 15, this.y + 16, 3, 2);
        ellipse(this.x + 5, this.y + 12, 3, 2);
        ellipse(this.x + 15, this.y + 12, 3, 2);
    }

    update() {
        // for the first 8 frames, the player's corpse will jump up
        if (this.deathTimer < 8) {
            this.y -= 2;
        }
        // afterwards the player's corpse will drop to the bottom of the screen
        else {
            this.y += 8;
        }
        this.deathTimer++;
    }
}
let customCoin; // create global customCoin variable to access outside of file

/**
 * Function that creates a custom coin
 */
function createCustomCoin() {
    // set sky color background
    fill('#6185f8');  
    rect(0, 0, 400, 400);
    // draw coin ellipse shape
    strokeWeight(10);
    stroke(0);
    fill('#eeaf36');
    // draw inner rectangle
    stroke(0);
    ellipse(200, 200, 250, 350);
    fill('#eeaf36');
    rect(175, 100, 50, 200);
    stroke(255);
    strokeCap(SQUARE);
    line(170, 100, 220, 100);
    line(175, 100, 175, 295);
    // draw highlight arc
    stroke(255);
    noFill();
    strokeCap(ROUND);
    const scaler = 0.95;
    arc(200, 200, 250 * scaler, 350 * scaler, PI - QUARTER_PI - (QUARTER_PI / 2), PI + HALF_PI + (QUARTER_PI / 4));

    // set customCoin variable to a screen capture of the canvas
    customCoin = get(0,0,width,height);
}

/**
 * Class that represents a coin
 */
class Coin {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;

        // set the dimensions of the coin image
        this.coinW = 18;
        this.coinH = 18;

        // set the direction the width will change
        this.d = -1;

        // set the timer to 0
        this.timer = 0;
        this.explosionTimer = 0;

        // set the collected state to false
        this.collected = false;

        // set the bounding box
        this.boundX = this.x + 3;
        this.boundY = this.y + 2;
        this.boundW = this.w;
        this.boundH = this.h;

        // set the explosion radius
        this.r = 0;
    }

    draw() {
        // if the coin is not collected, draw the coind
        if (!this.collected) {
            // draw the coin image
            image(customCoin, this.x + (this.w - this.coinW) / 2, this.y + 1, this.coinW, this.coinH);
        }
        // else if the coin is collected, and it is exploding, 
        // draw the explosion particles
        else if (this.explosionTimer < 15) {
            // draw all 8 particles in a circle from the center (this.x, this.y) with radius: this.r
            stroke('#eeaf36')
            fill('#eeaf36');
            for (let n = 0; n < 8; n++) {
                ellipse(this.x + (this.w / 2) + (0.7 * this.r * Math.cos(n * QUARTER_PI)), this.y + (this.h / 2) +  this.r * Math.sin(n * QUARTER_PI), 2, 2);
            }
        }
    }

    update() {
        // if the coin is not collected, update the coin width
        // to mimic a rotating coin
        if (!this.collected) {
            // every 2 frames update the coin width
            if (this.timer % 2 == 0) {
                this.coinW += this.d;
    
                // if the coin width reaches a bound,
                // grow/shrink the width in the opposite direction
                if (this.coinW >= 18) {
                    this.d = -1;
                }
                if (this.coinW <= 1) {
                    this.d = 1;
                }
            }
            // increment the timer
            this.timer++;
        }
        // else increment the explosion timer
        else {
            // increase radius for the first 12 frames
            if (this.explosionTimer < 12) {
                this.r++;
            }
            this.explosionTimer++;
        }
    }
}

/**
 * Class that represents a firework
 */
class FireWork {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;

        // set the hypotenuse (how far each firework is from the center)
        this.h = 1;

        // set the inital green value
        this.g = 255;

        // set the timer
        this.timer = 0;
    }

    draw() {
        // only draw the firework for the first 120 frames (to avoid giant fireworks)
        if (this.timer < 120) {
            // draw all 8 fireowrks in a circle from the center (this.x, this.y) with radius: this.h
            stroke(color(255, this.g, 0));
            fill(color(255, this.g, 0));
            for (let n = 0; n < 8; n++) {
                ellipse(this.x + this.h * Math.cos(n * QUARTER_PI), this.y + this.h * Math.sin(n * QUARTER_PI), 2, 2);
            }
        }
    }

    update() {
        // every 3 frames, increase the hypotenuse
        if (this.timer % 3 == 0) {
            this.h++;
        }

        // decrease the green value (make the firework more red)
        this.g--;

        // increase the timer
        this.timer++;
    }
}

/**
 * Class that represents the game over screen
 */
class GameOverScreen {

    constructor() {
        // instantiate goombas
        this.goomba1 = new Goomba(340, 280, 280, 360, 2);
        this.goomba2 = new Goomba(40, 320, 280, 360, 2);
    }

    draw() {
        // draw the game over tilemap with the header and play again box
        bricks.forEach(brick => {
            brick.draw();
        });
        blocks.forEach(block => {
            block.draw();
        });
        drawHeader();
        playAgainBox.draw();
    
        // if the player has won (score == 20), shoot fireworks on the screen
        if (score >= 20) {
            fireworkTimer++;
            // create a new firework every 25 frames at a random location
            if (fireworkTimer % 25 == 0) {
              fireworks.push(new FireWork(Math.floor(Math.random() * 400), 
                                          Math.floor(Math.random() * 400)));
            }
            // draw and update each firework
            fireworks.forEach(firework => {
              firework.draw();
              firework.update();
            });
        }
        else {
            // draw and update goombas
            this.goomba1.draw();
            this.goomba1.update();
            this.goomba2.draw();
            this.goomba2.update();
        }
    }
}

/**
 * Class that represents the play-again-box
 */
class PlayAgainBox {

    constructor() {
        // set the positions and dimensions
        this.x = 100;
        this.y = 300;
        this.w = 400 - (this.x * 2);
        this.h = 70;
  
        // set the corner studs
        this.cornerStuds = [];
        this.cornerStuds.push(new CornerStud(this.x + 4, this.y + 4));
        this.cornerStuds.push(new CornerStud(this.x + 4, this.y + this.h - 10));
        this.cornerStuds.push(new CornerStud(this.x + this.w - 10, this.y + 4));
        this.cornerStuds.push(new CornerStud(this.x + this.w - 10, this.y + this.h - 10));
    }
    
    draw() {
        // draw main rectangle
        strokeWeight(1);
        stroke(0);
        fill('#954b0c');
        rect(this.x, this.y, this.w, this.h);
        stroke('#ffe6ee');
        line(this.x, this.y, this.x + this.w, this.y);
        line(this.x, this.y, this.x, this.y + this.h);

        // draw corner studs
        this.cornerStuds.forEach(stud => stud.draw());strokeWeight(1);
  
        // draw play again text
        textSize(30);
        textFont("Times New Roman");
        stroke(0);
        fill(0);
        let spacer = 3;
        text("Play Again?", 125 + spacer, 343 + spacer);
        stroke('#ffe6ee');
        fill('#ffe6ee');
        text("Play Again?", 125, 343);
    }
  }
    
	/**
 * Class that represents a goomba enemy
 */
class Goomba {

    constructor(x, y, upperBound, lowerBound, speed) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;

        // set the bounding box
        this.boundX = this.x + 2;
        this.boundY = this.y + 1;
        this.boundW = 16;
        this.boundH = 16;

        // set the speed and position
        this.d = 1;
        this.speed = speed;

        // set the bounds for movement
        this.ub = upperBound;
        this.lb = lowerBound;

        // set the timer to control when the wings flap
        this.wingTimer = 0;
    }

    draw() {
        // draw bounding box
        stroke(0);
        fill(0);
        // rect(this.x + 2, this.y + 1, 16, 16); 
        // draw head
        stroke('#684632');
        fill('#684632');
        ellipse(this.x + (this.w / 2), this.y + (this.h / 2), 16, 12);
        ellipse(this.x + (this.w / 2), this.y + 5, 8, 4);
        // draw torso
        stroke('#ffe6ee');
        fill('#ffe6ee');
        ellipse(this.x + (this.w / 2), this.y + 14, 8, 5);
        // draw feet
        stroke(0);
        fill(0);
        ellipse(this.x + 5, this.y + 15, 3, 2);
        ellipse(this.x + 15, this.y + 15, 3, 2);
        // draw eyes
        stroke(0);
        fill(0);
        ellipse(this.x + 8, this.y + 7, 1, 2);
        ellipse(this.x + 12, this.y + 7, 1, 2);
        // draw wings
        stroke(255);
        fill(255);
        if (Math.floor(this.wingTimer / (10 / this.speed)) % 2 == 0) {
            // draw wings open
            triangle(this.x + (this.w / 2) + 5, this.y + (this.h / 2) - 3, this.x + (this.w / 2) + 4, this.y + 3, this.x + 17, this.y + 3);
            ellipse(this.x + 12 + 4, this.y + 8 - 2, 2, 2);
            ellipse(this.x + 14 + 3, this.y + 6 - 2, 2, 2);
            ellipse(this.x + 14 + 3, this.y + 4 - 2, 2, 2);
            ellipse(this.x + 12 + 3, this.y + 4 - 2, 2, 2);
            
            triangle(this.x + 5, this.y + (this.h / 2) - 3, this.x + 6, this.y + 3, this.x + 3, this.y + 3);
            ellipse(this.x + 4, this.y + 8 - 2, 2, 2);
            ellipse(this.x + 3, this.y + 6 - 2, 2, 2);
            ellipse(this.x + 3, this.y + 4 - 2, 2, 2);
            ellipse(this.x + 5, this.y + 4 - 2, 2, 2);
        }
        else {
            // draw wings closed
            triangle(this.x + (this.w / 2) + 5, this.y + (this.h / 2) - 3, this.x + (this.w / 2) + 4, this.y + 6, this.x + 17, this.y + 6);
            ellipse(this.x + 12 + 4, this.y + 8 - 2, 2, 2);
            ellipse(this.x + 14 + 3, this.y + 6 - 2, 2, 2);

            triangle(this.x + 5, this.y + (this.h / 2) - 3, this.x + 6, this.y + 6, this.x + 3, this.y + 6);
            ellipse(this.x + 4, this.y + 8 - 2, 2, 2);
            ellipse(this.x + 3, this.y + 6 - 2, 2, 2);
            
        }
    }

    update() {
        // update the y-coordinate
        this.y += this.d * this.speed;
        // if the goomba reaches a bound, set the velocity to the oppsite direction
        if (this.y <= this.ub) {
            this.d = 1;
        }
        if (this.y >= this.lb) {
            this.d = -1;
        }
        // increment the wing timer
        this.wingTimer++;
        // update the bounding box
        this.boundX = this.x + 3;
        this.boundY = this.y + 3;
    }
}
class Koopa {

    constructor(x, y, c, leftBound, rightBound, speed) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;

        // set the color
        this.c = c;

        // set the shell width and height
        this.shellW = 12;
        this.shellH = 8;

        // set the bounding box
        this.boundX = this.x + 3;
        this.boundY = this.y + 3;
        this.boundW = 14;
        this.boundH = 12;

        // set the speed and position
        this.d = 1;
        this.speed = speed;

        // set the bounds for movement
        this.lb = leftBound;
        this.rb = rightBound;

        // set the timer to control when the wings flap
        this.wingTimer = 0;
    }

    draw() {
        // draw bounding box
        stroke(0);
        fill(0);
        //rect(this.x + 3, this.y + 3, 14, 12);
        // draw face
        stroke('#ffe6ee');
        fill('#ffe6ee');
        ellipse(this.x + 5, this.y + 5, 5, 5);
        // draw face
        stroke(0);
        fill(0);
        ellipse(this.x + 4, this.y + 4, 1, 1);
        // draw feet
        stroke('#ffe6ee');
        fill('#ffe6ee');
        ellipse(this.x + 6, this.y + 14, 2, 3);
        ellipse(this.x + 9, this.y + 14, 2, 3);
        ellipse(this.x + 13, this.y + 14, 2, 3);
        ellipse(this.x + 16, this.y + 14, 2, 3);
        // draw shell
        stroke(this.c);
        fill(this.c);
        ellipse(this.x + (this.w / 2) + 1, this.y + (this.h / 2), this.shellW, this.shellH);
        if (Math.floor(this.wingTimer / (10 / this.speed)) % 2 == 0) {
            // draw wings open
            stroke(255);
            fill(255);
            triangle(this.x + (this.w / 2) + 1, this.y + (this.h / 2), this.x + (this.w / 2) + 1, this.y + 5, this.x + 14, this.y + 5);
            ellipse(this.x + 12, this.y + 8, 2, 2);
            ellipse(this.x + 14, this.y + 6, 2, 2);
            ellipse(this.x + 14, this.y + 4, 2, 2);
            ellipse(this.x + 12, this.y + 4, 2, 2);
        }
        else {
            // draw wings closed
            stroke(255);
            fill(255);
            triangle(this.x + (this.w / 2) + 1, this.y + (this.h / 2), this.x + (this.w / 2) + 1, this.y + 8, this.x + 14, this.y + 8);
            ellipse(this.x + 12, this.y + 8, 2, 2);
        }
    }

    update() {
        // update the y-coordinate
        this.x += this.d * this.speed;
        // if the koopa reaches a bound, set the velocity to the oppsite direction
        if (this.x <= this.lb) {
            this.d = 1;
        }
        if (this.x >= this.rb) {
            this.d = -1;
        }
        // increment the wing timer
        this.wingTimer++;
        // update the bounding box
        this.boundX = this.x + 3;
        this.boundY = this.y + 3;
    }
}

/**
 * Class that represents a question block
 */
 class QuestionBlock {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
    }

    draw() {
        // draw the box
        strokeWeight(1);
        stroke(0);
        fill('#eeaf36');
        rect(this.x, this.y, this.w, this.h); 

        // draw the question mark inside the box
        strokeWeight(1);
        textSize(15);
        textFont("Times New Roman");
        stroke(0);
        fill(0);
        let spacer = 1;
        text("?", this.x + 6 + spacer, this.y + 14 + spacer);
        stroke('#954b0c')
        fill('#954b0c');
        text("?", this.x + 6, this.y + 14);

        // draw the studs
        stroke(0);
        fill(0);
        point(this.x + 2, this.y + 2);
        point(this.x + this.h - 2, this.y + 2);
        point(this.x + 2, this.y + this.w - 2);
        point(this.x + this.h - 2, this.y + this.w - 2);

        // draw the highlight lines
        stroke('#954b0c')
        fill('#954b0c');
        line(this.x, this.y, this.x + this.w, this.y);
        line(this.x, this.y, this.x, this.y + this.h);
    }
}

/**
 * Class that represents how to draw the starting screen
 */
class StartingScreen {

    constructor() {
        // insantiate the assets
        this.titleBox = new TitleBox();
        this.hill = new Hill(30, 400 - 40 - 70);
        this.tinyMushroom = new TinyMushroom(52, 240);
        this.pipe = new Pipe(300, 310);
        this.block = new QuestionBlock(230, 300);

        // instantiate the rows of bricks at the bottom
        this.bricks = [];
        for (let i = 0; i < 400; i += 20) {
            for (let j = 360; j < 400; j += 20) {
                this.bricks.push(new Brick(i, j));
            }
        }
    }

    draw() {
        // draw the assets
        this.titleBox.draw();
        this.bricks.forEach(brick => brick.draw());
        this.hill.draw();
        this.tinyMushroom.draw();
        this.pipe.draw();
        this.block.draw();

        // draw the text inside the title-box
        strokeWeight(1);
        textSize(60);
        textFont("Times New Roman");
        stroke(0);
        fill(0);
        let spacer = 3;
        text("Super", 70 + spacer, 80 + spacer);
        text("Tile Bros.", 70 + spacer, 150 + spacer);
        stroke('#ffe6ee');
        fill('#ffe6ee');
        text("Super", 70, 80);
        text("Tile Bros.", 70, 150);

        // draw the instructional text
        strokeWeight(1);
        textSize(14);
        textFont('Courier New');
        stroke(255);
        fill(255);
        text("Click the mouse to start the game!", 70, 250);
    }
}

/**
 * Class that represents how to draw the tiny mushroom
 */
class TinyMushroom {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;

        this.stemW = 4;
        this.stemH = 4; 
    }

    draw() {
        // draw the mushroom top
        stroke('#954b0c')
        fill('#954b0c');
        ellipse(this.x + (this.w / 2), this.y + (this.h / 2), this.w, this.h);
        // draw the shadow
        stroke(0);
        fill(0);
        ellipse(this.x + (this.w / 2), this.y + (this.h / 2) + 3, this.w - 2, this.h - 8);
        // draw the stem
        stroke('#ffe6ee')
        fill('#ffe6ee');
        rect(this.x + (this.w / 2) - (this.stemW / 2), this.y + this.h - this.stemH , this.stemW, this.stemH);

    }
}

/**
 * Class that represents how to draw a pipe
 */
class Pipe {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
    }

    draw() {
        // draw pipe
        stroke(0);
        fill('#2cb10a');
        rect(this.x, this.y, this.w, this.h - 30);
        rect(this.x + 5, this.y + 20, this.w - 10, this.h - 20);
        // draw pipe highlights
        stroke('#73f218')
        fill('#73f218');
        rect(this.x + 10, this.y + 1, 6, this.h - 32);
        rect(this.x + 10, this.y + 21, 6, this.h - 22);
        rect(this.x + 44, this.y + 1, 5, this.h - 32);
        rect(this.x + 44, this.y + 21, 0, this.h - 22);
    }

}

/**
 * Class that represents how to draw a hill
 */
class Hill {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 70;
    }

    draw() {
        // draw a green triangle
        stroke(0);
        fill('#138200');
        triangle(this.x + (this. w / 2), this.y, this.x, this.y + this.h, this.x + this.w, this.y + this.h);

        // draw the textures
        fill(0);
        ellipse(this.x + 60, this.y + 25, 6, 10);
        ellipse(this.x + 54, this.y + 28, 3, 6);

        ellipse(this.x + 36, this.y + 40, 6, 10);
        ellipse(this.x + 30, this.y + 43, 3, 6);

        ellipse(this.x + 70, this.y + 48, 6, 10);
    }
}

/**
 * Class that represents how to draw the title box
 */
class TitleBox {

    constructor() {
        // set the position and dimensions
        this.x = 40;
        this.y = 20;
        this.w = 400 - (this.x * 2);
        this.h = 160;

        // set the corner studs
        this.cornerStuds = [];
        this.cornerStuds.push(new CornerStud(this.x + 4, this.y + 4));
        this.cornerStuds.push(new CornerStud(this.x + 4, this.y + this.h - 10));
        this.cornerStuds.push(new CornerStud(this.x + this.w - 10, this.y + 4));
        this.cornerStuds.push(new CornerStud(this.x + this.w - 10, this.y + this.h - 10));
    }
    
    draw() {
        // draw main rectangle
        strokeWeight(1);
        stroke(0);
        fill('#954b0c');
        rect(this.x, this.y, this.w, this.h);
        stroke('#ffe6ee');
        line(this.x, this.y, this.x + this.w, this.y);
        line(this.x, this.y, this.x, this.y + this.h);

        // draw corner studs
        this.cornerStuds.forEach(stud => stud.draw());
    }
}

/**
 * Class that represents how to draw a corner stud
 */
class CornerStud {
     
    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 5;
    }

    draw() {
        // draw shadow
        strokeWeight(1);
        stroke(0);
        fill(0);
        rect(this.x + 1, this.y + 1, this.w, this.h);

        // draw stud
        stroke('#ffe6ee');
        fill('#ffe6ee');
        rect(this.x, this.y, this.w, this.h);
    }
}

class Brick {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
    }

    draw() {
        // draw the brick box
        strokeWeight(1);
        stroke(0);
        fill('#954b0c');
        rect(this.x, this.y, this.w, this.h);

        // horizontal lines
        stroke(0);
        line(this.x, this.y + (this.w / 4), this.x + this.w, this.y + (this.w / 4));
        line(this.x, this.y + (2 * this.w / 4), this.x + this.w, this.y + (2 * this.w / 4));
        line(this.x, this.y + (3 * this.w / 4), this.x + this.w, this.y + (3 * this.w / 4));

        // vertical lines
        line(this.x + (this.w / 2), this.y, this.x + (this.w / 2), this.y + (this.w / 4));
        line(this.x + (this.w / 2), this.y + (2 * this.w / 4), this.x + (this.w / 2), this.y + (3 * this.w / 4));

        line(this.x + (this.w / 4), this.y + (this.w / 4), this.x + (this.w / 4), this.y + (2 * this.w / 4));
        line(this.x + (3 * this.w / 4), this.y + (this.w / 4), this.x + (3 * this.w / 4), this.y + (2 * this.w / 4));
        
        line(this.x + (this.w / 4), this.y + (3 * this.w / 4), this.x + (this.w / 4), this.y + (4 * this.w / 4));
        line(this.x + (3 * this.w / 4), this.y + (3 * this.w / 4), this.x + (3 * this.w / 4), this.y + (4 * this.w / 4));
    }
}
function drawGame() {
    drawGameScreen();
    // if the character is dead, draw the dying animation
    if (dyingState) {
        drawDyingState();
    }
    // else perform updates to the live game
    else {
        updateGameScreen();
    }
}

/**
 * Draw the usual game screen
 */
function drawGameScreen() {
    // draw the tiles
    bricks.forEach(brick => {
        brick.draw();
    });
    coins.forEach(coin => {
        coin.draw();
    });
    blocks.forEach(block => {
        block.draw();
    });
    
    // draw the enemies
    enemies.forEach(enemy => enemy.draw());

    // draw the header
    drawHeader();
}

/**
 * Update the game screen
 */
function updateGameScreen() {
    // draw the character
    character.draw();

    // check for collisions with enemies and coins
    checkCollisions();

    // update the character
    character.update(bricks);
    // update the enemies
    enemies.forEach(enemy => enemy.update());
    // update the coins if they are not collected
    coins.forEach(coin => {
        coin.update();
    });

    // increment the timer and gameTimer
    timer++;
    if (timer % 30 == 0) {
        gameTimer++;
        if (gameTimer > 999) {
            gameTimer = 0;
        }
    }
}

/**
 * Draw the dying state screen
 */
function drawDyingState() {
    dyingCharacter.draw();
    dyingCharacter.update();
    if (dyingCharacter.y >= 380) {
        gameOver = true;
        initTileMap(gameOverTilemap);
    }
}

/**
 * Draw the header involving the score, coin count, time, and level
 */
function drawHeader() {
    // draw the game score
    textSize(8);
    strokeWeight(1);
    textFont('Courier New');
    stroke(255);
    fill(255);
    text("SCORE", 50, 6);
    let gameScoreStr = str(score * 100).padStart(5, '0');
    text(gameScoreStr, 50, 16);
    
    // draw the count count
    headerCoin.draw();
    stroke(255);
    fill(255);
    strokeWeight(1);
    textSize(12);
    text("X", 162, 13);
    textSize(16);
    text(score, 173, 14)

    // draw the world level
    textSize(8);
    strokeWeight(1);
    text("WORLD", 260, 6);
    text("1-1", 265, 16);

    // draw the time
    textSize(8);
    strokeWeight(1);
    text("TIME", 320, 6);
    let gameTimerStr = str(gameTimer).padStart(3, '0');
    text(gameTimerStr, 323, 16);
}

/**
 * Check collisions between the bounding boxes of the player, enemies, and coins
 */
function checkCollisions() {
    /**
     * Helper function that checks for 2-D bounding box collisions
     */
    function checkCollision(box1, box2) {
        return (box1.boundX < box2.boundX + box2.boundW && 
                box1.boundX + box1.boundW > box2.boundX &&
                box1.boundY < box2.boundY + box2.boundH && 
                box1.boundY + box1.boundH > box2.boundY);
    }

    // if the game is over, don't bother checking for collisions
    if (gameOver) {
        return;
    }

    // check each possible enemy collision
    // if there is a collision, set the dying state to true
    enemies.forEach(enemy => {
        if (checkCollision(character, enemy)) {
            dyingCharacter = new DeadCharacter(character.x, character.y);
            dyingState = true;
        }
    });

    // check each possible coin collision
    // if there is a collision, set the coin to collected and increment the score
    // if the score reaches 20, set the game over state to true
    coins.forEach(coin => {
        if (!coin.collected && checkCollision(character, coin)) {
            coin.collected = true;
            score++;
            if (score >= 20) {
                gameOver = true;
                initTileMap(gameOverTilemap);
            }
        }
    });
}

// game states
let gameStarted;
let gameOver;
let dyingState;

// characters
let chracter;
let enemies = [];

// tiles
let bricks = [];
let coins = [];
let blocks = [];

// game variables
let score;

// timers
let gameTimer;
let timer;
let fireworkTimer;

// assets
let startingScreen;
let gameOverScreen;
let headerCoin;
let playAgainBox;
let dyingCharacter;
let fireworks = [];

// tilemaps
const tilemap = [
  "wwwwwwwwwwwwwwwwwwww",
  "wc-----------------w",
  "w-ww-www---c-c----cw",
  "w-ww-wqw----------cw",
  "w-wwcwww--c---c----w",
  "w-wwcwww---ccc---www",
  "w-ww-wwww--------www",
  "w-ww-wwwwwwwwwww-wqw",
  "w--------------w-www",
  "wwwwwww-wwwwww-wcwww",
  "wwwwwww-wwwwww-w-www",
  "wc-----------w-w-www",
  "w-wwwwwwwwww-w-w-wwq",
  "w-www---cccw-wcw-www",
  "w-wqw-wwwwww-wcw---w",
  "w-www--------wwwww-w",
  "w-wwwwwwwwwwwwwwww-w",
  "w--w-----w-----w---w",
  "w-----w--c--w------w",
  "wwwwwwwwwwwwwwwwwwww"];
const gameOverTilemap = [
  "--------------------",
  "--------------------",
  "-qqqq-www-qqqqq-www-",
  "-q----w-w-q-q-q-w---",
  "-q-qq-www-q-q-q-www-",
  "-q--q-w-w-q-q-q-w---",
  "-qqqq-w-w-q-q-q-www-",
  "--------------------",
  "-wwww-q---q-www-qqq-",
  "-w--w-q---q-w---q-q-",
  "-w--w-q---q-www-qq--",
  "-w--w--q-q--w---q-q-",
  "-wwww---q---www-q-q-",
  "--------------------",
  "--------------------",
  "--------------------",
  "--------------------",
  "--------------------",
  "--------------------",
  "--------------------"];

/*************************
 * DRAW & UPDATE FUNCTIONS
 *************************/

/**
 * Setup the game by initializing variables
 */
 
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
 
//  createCanvas(400, 400);
  createCustomCoin();

  // instantiate assets
  startingScreen = new StartingScreen();
  gameOverScreen = new GameOverScreen();
  playAgainBox = new PlayAgainBox();
  headerCoin = new Coin(140, 0);

  // set game variables
  restartGame();
  gameStarted = false;
}

/**
 * Draw the game every frame
 */
function draw() {
  background('#6185f8');
  // if the game has not started, draw the starting screen
  if (!gameStarted) {
    startingScreen.draw();
  }
  // if the game is over, draw the gave over screen
  else if (gameOver) {
    gameOverScreen.draw();
  }
  // if the game is started and not over, draw the game screen
  else {
    drawGame();
  }
}

/*********************
 * HELPER FUNCTIONS
 *********************/
function initTileMap(tileMap) {
  // empty all the tiles arrays
  bricks = [];
  coins = [];
  blocks = [];

  // iterate across the tilemap and push the tiles to their
  // respective arrays
  for (let i = 0; i < 20; i++) {
    const row = tileMap[i];
    for (let j = 0; j < 20; j++) {
      const char = row.charAt(j);
      if (char == 'w') {
        bricks.push(new Brick(j * 20, i * 20));
      }
      if (char == 'c') {
        coins.push(new Coin(j * 20, i * 20));
      }
      if (char == 'q') {
        blocks.push(new QuestionBlock(j * 20, i * 20));
      }
    }
  }
}

function restartGame() {
  // place character
  character = new Character(350, 350);

  // reinitialize enemies to starting states
  enemies = [];
  enemies.push(new Koopa(21, 220, color('#73f218'), 20, 240, 1));
  enemies.push(new Koopa(21, 20, color('#b72504'), 20, 360, 2));
  enemies.push(new Goomba(320, 200, 20, 280, 3));
  enemies.push(new Goomba(80, 21, 20, 160, 1));
  enemies.push(new Goomba(180, 21, 20, 120, 5));

  // set proper game states
  gameStarted = true;
  gameOver = false;
  dyingState = false;

  // set timers back to 0
  gameTimer = 0;
  timer = 0;
  fireworkTimer = 0;
  fireworks = [];

  // set game variables
  score = 0;
  initTileMap(tilemap);
}

function mouseClicked(event) {
  // if the play again button is clicked, restart the game if the game is over
  if (event.x >= playAgainBox.x && event.x <= playAgainBox.x + playAgainBox.w && 
    event.y >= playAgainBox.y && event.y <= playAgainBox.y + playAgainBox.h && gameOver) {
    restartGame();
  } 
  // set the game state to started if the screen is clicked
  gameStarted = true;
}

