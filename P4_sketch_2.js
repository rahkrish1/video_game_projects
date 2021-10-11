/*
--- In-Code Documentation Structure ---
General Code
The majority of documentation is described in future subsections. However, in the general body of code some helpful comments can be found. These are typically items that helped me not get lost in the code, such as breaking the code into small sections and perhaps an overview of their mechanics.

Variables outside of functions
Variables outside of functions are grouped into sections. Each variable has a comment on the same line with a brief description of its purpose.

Classes
Before each class is a multiline comment describing the class’s purpose and important mechanics. Methods are listed, whereas fields are listed and described. Additionally, before each method is a multiline comment describing the method’s purpose. Parameters are listed and described.
 
Functions
Before each function is a multiline comment describing the function’s purpose and important mechanics. Parameters are listed and described.

--- Main.js ---
Responsible for high-level logic. Controls game states. Also contains various helper functions and hardware interface functions.
*/

const amber = [253, 183, 80]; // Color for graphics
const lightOrange = [253, 155, 56]; // Color for logo graphics
const orange = [253, 126, 32]; // Color for logo graphics
const redOrange = [252, 46, 32]; // Color for graphics
const black = [0, 0, 0]; // Color for graphics

const darkGreen = [0, 75, 0];
const medGreen = [34, 139, 34];
const lightGreen = [206, 243, 206];
  
const frogGreen = [110, 181, 84];
const frogOrange = [255, 152, 31];
const frogRed = [222, 25, 2];

const snakeGreen = [125, 188, 82];
const snakeYellow = [246, 213, 64];

const treeBark = [207, 112, 30]

const themeDark = darkGreen;
const themeMed = medGreen;
const themeLight = lightGreen;

var frogImages = [];
var snakeImages = [];

var openingLogo; // Object for the opening logo
const logoTimer = 8000;

var keyArray = []; // Object for indexing key presses
var clickState = [];

var gameStates = []; // Tracks game state
var currentGameState = 0;
var confettis = [];
var confettiIndex = 0;
var confettiTimer = 300;

const gridSize = 20;
var gameObj;

const canvasW = 400;
const canvasH = canvasW;
const halfWidth = canvasW/2;

/*
Function: setup()

Initializes entire game. Mostly initializes necessary global variable. Instanciates game elements.
*/
/**
--- Animation Overview ---
The animation is of a capital “M” and capital “S”, my first and last initial. There are three phases to the animation that describe my design process. In an artistic way, it describes my journey when designing video games.
First, a wide field of triangles slowly generates. These triangles move one step at a time, traversing different angles until they converge in a united purpose (in this case, my initials). This is the idea-forming part of my process. I draw inspiration from many different games I’ve played. I weave my favorite components of these games into a creation that is my own: the triangles are now simple building blocks in a larger, more complex vision. Thus, the convergence of the triangles depicts how I invent the games I build.
Second, a red flash runs through the triangles sequentially. This effect demonstrates the technical problem solving that goes into making games. I like to think that the flash is “scanning” the triangles, searching for ways to streamline performance and optimize the system as a whole. A sound technical construction and tuning provides great functionalities to intrigue and impress the player.
Third, a block shadow pops out from the letters, giving these previously flat profiles new depth. This represents my artistic flair, where I modify working code to introduce extra graphical effects or humor in the games to make them more enjoyable. My games are not simply algorithms to beat. They tell a compelling story in which the player is a main character.
This is the best possible introduction to my games that I can think to make. The initials indicate the author, the symbolism depicts how the game was made, and the well-tuned visual effects vouch for a quality product.
*/

/*
Class: Logo
This class defines all logo behavior.

Methods:
constructor()
draw()

Fields:
... Explained in-code for clairty
*/
class Logo {
    constructor() {
      // High-level variables:
      this.state = "Building"; // Various colors for graphics
      this.stateBuffer = 550; // Transition delay between states (milliseconds)
        
      // "Building" state variables:
      this.triangs = []; // Container for SmartTriangle instances
      this.vertices = [120, 250, 140, 230, 120, 230,
                      120, 210, 140, 230, 120, 230,
                      120, 210, 140, 230, 140, 210,
                      120, 210, 140, 190, 140, 210,
                      120, 210, 140, 190, 120, 190,
                      120, 170, 140, 190, 120, 190,
                      120, 170, 140, 190, 140, 170,
                      120, 170, 140, 150, 140, 170,
                      160, 170, 140, 150, 140, 170,
                      140, 170, 160, 190, 160, 170,
                      180, 170, 160, 190, 160, 170,
                      180, 150, 160, 170, 180, 170,
                      180, 150, 200, 170, 180, 170,
                      180, 190, 200, 170, 180, 170,
                      180, 190, 200, 170, 200, 190,
                      180, 190, 200, 210, 200, 190,
                      180, 190, 200, 210, 180, 210,
                      180, 230, 200, 210, 180, 210,
                      180, 230, 200, 210, 200, 230,
                      180, 230, 200, 250, 200, 230,
                      220, 230, 240, 250, 240, 230,
                      260, 230, 240, 250, 240, 230,
                      260, 230, 240, 250, 260, 250,
                      260, 250, 280, 230, 260, 230,
                      260, 210, 280, 230, 260, 230,
                      260, 210, 280, 230, 280, 210,
                      280, 210, 260, 190, 260, 210,
                      240, 210, 260, 190, 260, 210,
                      240, 210, 260, 190, 240, 190,
                      240, 210, 220, 190, 240, 190,
                      220, 170, 240, 190, 220, 190,
                      220, 170, 240, 190, 240, 170,
                      220, 170, 240, 150, 240, 170,
                      260, 170, 240, 150, 240, 170,
                      260, 170, 240, 150, 260, 150,
                      260, 150, 280, 170, 260, 170]; // Vertices for triangles to travel to.
      this.offsets = [-3, 3,
                     -4, -2,
                     2, 2,
                     -2, -4,
                     -1, 7,
                     -4, 2,
                     -5, -7,
                     -2, -4,
                     2, 10,
                     0, -4,
                     3, -5,
                     2, 4,
                     -3, -5,
                     -2, 6,
                     4, 6,
                     0, -6,
                     -5, 1,
                     2, -4,
                     1, 5,
                     -3, 5,
                     -1, 1,
                     0, 4,
                     2, 2,
                     1, 1,
                     0, -2,
                     -2, 0,
                     1, -3,
                     -4, 0,
                     0, 2,
                     -2, 0,
                     0, -2,
                     -3, -1,
                     0, 2,
                     -2, 0,
                     1, -1,
                     4, 0];  // Offsets (multiples of 20 pixels) for triangles to start at. A set of
      this.maxSpawnDelay = 1000; // Maximum time between triangle spawns (milliseconds)
      this.spawnDelay = this.maxSpawnDelay; // This tracks triangle spawn time as it changes
      this.spawnTimer = -this.spawnDelay; // This timer tracks the last time a triangle spawned (milliseconds)
        
      // "Flash" state variables:
      this.flashTimer = 4500;
      this.flashDelay = 30;
      this.flashIndex = -2;
        
      // "Shadow" state variables:
      this.shadow = new Shadow(0, 0, this.color); // This holds the instance of the Shadow class
      this.shadowW = -10; // Long-term width that the shadow will extend
      this.shadowH = 15; // Long-term heigt that the shadow will extend
      this.shadowTimer = 0; // Tracks the time (milliseconds) when "Shadow" state began
      this.shadowDuration = 100; // Duration (milliseconds) of shadow expansion
      this.slope = this.shadowH/this.shadowW;
      this.topLeftCorner = [110, 140];
      this.bottomRightCorner = [290, 280];
      this.bottomLeftCorner = [this.topLeftCorner[0] + (this.bottomRightCorner[1] - this.topLeftCorner[1]) / this.slope, this.bottomRightCorner[1]];
      this.topRightCorner = [this.bottomRightCorner[0] + (this.topLeftCorner[1] - this.bottomRightCorner[1]) / this.slope, this.topLeftCorner[1]]
    }

    /*
    Method: draw()
    Contains high-level logic, directs transition between states, updates class instances, and draws class instances.
    */
    draw() {
        background(themeDark);
      
        // Behavior for "Building" state
        if (this.state === "Building") {
          if (this.triangs.length < this.vertices.length/6 && (this.spawnTimer + this.spawnDelay) < millis()) {
            this.triangs[this.triangs.length] = new SmartTriangle(...subset(this.vertices, this.triangs.length*6, 6), ...subset(this.offsets, this.triangs.length*2, 2));
            this.spawnTimer = millis();
            this.spawnDelay = this.maxSpawnDelay / (1 + pow(millis()/500, 1.5));
          // Logic for transtion to "Flash" state
          } else if (this.flashTimer < millis()) {
            this.state = "Flash";
            this.flashTimer = millis() + this.stateBuffer;
          }
      
        // Behavior for "Flash" state
        } else if (this.state === "Flash") {
          if (this.flashDelay + this.flashTimer < millis()) {
            if (this.flashIndex - 3 >= 0 && this.flashIndex - 3 < this.triangs.length) {
              this.triangs[this.flashIndex - 3].setStroke(redOrange, 0, 0.3);
            }
            if (this.flashIndex - 2 >= 0 && this.flashIndex - 2 < this.triangs.length) {
              this.triangs[this.flashIndex - 2].setStroke(redOrange, 0.25, 1.25);
            }
            if (this.flashIndex - 1 >= 0 && this.flashIndex - 1 < this.triangs.length) {
              this.triangs[this.flashIndex - 1].setStroke(redOrange, 0.6, 1.6);
            }
            if (this.flashIndex >= 0 && this.flashIndex < this.triangs.length) {
              this.triangs[this.flashIndex].setStroke(redOrange, 1, 2);
            }
            if (this.flashIndex + 1 >= 0 && this.flashIndex + 1 < this.triangs.length) {
              this.triangs[this.flashIndex + 1].setStroke(redOrange, 0.6, 1.6);
            }
            if (this.flashIndex + 2 >= 0 && this.flashIndex + 2 < this.triangs.length) {
              this.triangs[this.flashIndex + 2].setStroke(redOrange, 0.25, 1.25);
            }
            this.flashIndex++;
            this.flashTimer = millis();
          }
      
          // Logic for transtion to "Shadow" state
          if (this.flashIndex - 3 >= this.triangs.length) {
            this.state = "Shadow";
            this.shadowTimer = millis() + this.stateBuffer;
          }
      
        // Behavior for "Shadow" state
        } else if (this.state === "Shadow") {
          if (this.shadowTimer < millis()) {
            var width;
            var height;
            var timingFactor = 0.75 * exp((this.shadowDuration / (millis() - this.shadowTimer)));
      
            if (this.shadowW > 0) {
              width = min(this.shadowW, this.shadowW / timingFactor);
            } else {
              width = max(this.shadowW, this.shadowW / timingFactor);
            }
            if (this.shadowH > 0) {
              height = min(this.shadowH, this.shadowH / timingFactor);
            } else {
              height = max(this.shadowH, this.shadowH / timingFactor);
            }
            this.shadow.setOffsets(width, height);
            this.shadow.draw();
          }
        }
      
        // Update and draw triangles
        for (var i = 0; i < this.triangs.length; i++) {
          this.triangs[i].update();
          this.triangs[i].draw();
        }
      return false;
   }
}


/*
Class: SmartTriangle
Instances of this class are 20 x 20 right triangles. They are given target vertices to move to, as well as x and y offsets (multiples of 20), that dicate the starting position relative to the ending position. These triangles move by flipping over one of their edges toward the target destination. The direction is chosen by the point that is farthest away from the center of the target vertices.

Methods:
constructor()
setStroke()
draw()
update()

Fields:
xs; List of x-coordinates of current position
ys; List of y-coordinates of current position
targetXs; List of x-coordinates of target position
targetYs; List of y-coordinates of target position
targetCenterX; Center x-coordinate of target position
targetCenterY; Center y-coordinate of target position
timer; Timestamp of last movement (milliseconds)
delay; Waiting time between movements (milliseconds)
fill; Fill color
stroke; Stroke color
strokeSize; Stroke wieght
*/

class SmartTriangle {
  /*
  Method: constructor()
  Populates class fields upon instatiation.

  Parameters:
  x1; X-coordinate for first vertex
  y1; Y-coordinate for first vertex
  x2; X-coordinate for second vertex
  y2; Y-coordinate for second vertex
  x3; X-coordinate for third vertex
  y3; Y-coordinate for third vertex
  c; X offset
  d; Y offset
  */
  constructor(x1, y1, x2, y2, x3, y3, c, d) {
    this.xs = [x1 + 20 * c, x2 + 20 * c, x3 + 20 * c];
    this.ys = [y1 + 20 * d, y2 + 20 * d, y3 + 20 * d];
    this.targetXs = [x1, x2, x3];
    this.targetYs = [y1, y2, y3];
    this.targetCenterX = (max(this.targetXs) + min(this.targetXs))/2;
    this.targetCenterY = (max(this.targetYs) + min(this.targetYs))/2;
    this.timer = 0;
    this.delay = 1000;
    this.fill = color(amber);
    this.setStroke(this.fill, 1, 0.3)
  }

  /*
  Method: setStroke()
  Adjusts triangle's stroke and color.

  Parameters:
  newStroke; Color for the new stroke
  percent; Percentile for linear interpolation from fill color to new stroke color
  size; New stroke weight
  */
  setStroke(newStroke, percent, size) {
    this.stroke = lerpColor(this.fill, color(newStroke), percent);
    this.strokeSize = size;
  }

  /*
  Method: draw()
  Draws triangle on-screen
  */
  draw() {
    fill(this.fill);
    stroke(this.stroke);
    strokeWeight(this.strokeSize);
    triangle(this.xs[0], this.ys[0], this.xs[1], this.ys[1], this.xs[2], this.ys[2]);
  }

  /*
  Method: update()
  Moves triangle as needed (if timer has expired and not at target position).
  */
  update() {
    if (this.timer + this.delay < millis() && (this.xs.toString() != this.targetXs.toString() || this.ys.toString() != this.targetYs.toString())) {
      // Time has expired and triangle needs to move
      var distances = [];
      for (var i = 0; i < 3; i++) {
        // Find each distance
        distances[i] = distSquared(this.xs[i], this.ys[i], this.targetCenterX, this.targetCenterY);
      }
      if (max(distances) === distances[0] && distances[0] != distances[2]) {
        // Move corner 1
        this.xs[0] += 2*(this.xs[2] - this.xs[0]);
        this.ys[0] += 2*(this.ys[2] - this.ys[0]);
      } else if (max(distances) === distances[1] && distances[1] != distances[2]) {
        // Move corner 2
        this.xs[1] += 2*(this.xs[2] - this.xs[1]);
        this.ys[1] += 2*(this.ys[2] - this.ys[1]);
      } else {
        // Move corner 3
        if (this.xs[2] === this.xs[0]) {
          this.xs[2] = this.xs[1];
          this.ys[2] = this.ys[0];
        } else {
          this.xs[2] = this.xs[0];
          this.ys[2] = this.ys[1];
        }
      }
      if (this.xs[0] === this.targetXs[1] && this.xs[1] === this.targetXs[0]) {
        // "Untangle"
        var placeHolder = [this.xs[0], this.ys[0]];
        this.xs[0] = this.xs[1];
        this.ys[0] = this.ys[1];
        this.xs[1] = placeHolder[0];
        this.ys[1] = placeHolder[1];
      }

      this.timer = millis();
      this.delay = 1000 / (1 + pow(millis()/2000,4));
    }
  }
}

/*
Class: Shadow
This class creates a block shadow that extends from the letters. The shadow operates based on an "offset", or how far (in pixels) the shadow should extend from the letters

Methods:
constructor()
setOffsets()
draw()

Fields:
xOff; X-value of extension from edge of letters
yOff; Y-value of extension from edge of letters
fill; Fill color
stroke; Stroke color
*/

class Shadow {
  /*
  Method: constructor()
  Populates class fields upon instatiation.

  Parameters:
  xOffset; X offset
  yOffset; Y offset
  */
  constructor(xOffset, yOffset) {
    this.setOffsets(xOffset, yOffset);
    this.fill = color(orange);
    this.stroke = this.fill;
  }

  /*
  Method: setOffsets()
  Sets new offfsets for the shadow

  Parameters:
  newX; New x offset
  newY; New y offset
  */
  setOffsets(newX, newY) {
    this.xOff = newX;
    this.yOff = newY;
  }

  /*
  Method: draw()
  Draws shadow on-screen
  */
  draw() {
    fill(this.fill);
    noStroke();

    // M Shadow
    beginShape();
    vertex(120, 170);
    vertex(140, 150);
    vertex(160, 170);
    vertex(180, 150);
    vertex(200, 170);
    vertex(200, 250);
    vertex(200 + this.xOff, 250 + this.yOff);
    vertex(180 + this.xOff, 230 + this.yOff);
    vertex(180 + this.xOff, 170 + this.yOff);
    vertex(160 + this.xOff, 190 + this.yOff);
    vertex(140 + this.xOff, 170 + this.yOff);
    vertex(140, 230);
    vertex(140 + this.xOff, 230 + this.yOff);
    vertex(120 + this.xOff, 250 + this.yOff);
    vertex(120 + this.xOff, 170 + this.yOff);
    endShape();

    // S Shadow
    beginShape();
    vertex(220, 230);
    vertex(260 + this.xOff, 230+ this.yOff);
    vertex(260 + this.xOff, 210 + this.yOff);
    vertex(240 + this.xOff, 210 + this.yOff);
    vertex(220 + this.xOff, 190 + this.yOff);
    vertex(220 + this.xOff, 170 + this.yOff);
    vertex(220, 170);
    vertex(260, 150);
    vertex(280, 170);
    vertex(280 + this.xOff, 170 + this.yOff);
    vertex(240 + this.xOff, 170 + this.yOff);
    vertex(240, 190);
    vertex(280, 210);
    vertex(280, 230);
    vertex(280 + this.xOff, 230 + this.yOff);
    vertex(260 + this.xOff, 250 + this.yOff);
    vertex(240 + this.xOff, 250 + this.yOff);
    vertex(220 + this.xOff, 230 + this.yOff);
    endShape();
  }
}

class PlatformGame {
  constructor(gridStep) {
    this.remainingTargets = 0;
    this.gridStep = gridStep;
    this.halfGrid = gridStep/2;
    this.player;
    this.beans = [];
    this.beanIndex = 0;
    this.beanSpawnFrames = 15;
    this.beanSpawnFrame = 0;
    this.walls = [];
    this.wallBools = [];
    this.prizes = [];
    this.enemies = [];
    this.floors = [];
    this.viewingX = 0;
    this.worldWidth = 0;
    this.worldHeight = 0;
    this.gameTimer = new GameTimer(325, 15, 15, themeLight);
    this.tileMap = [
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X C                       CO           X",
"X              C          FFFFFF      OX",
"X   F          FF  O            F   FFFX",
"X     O      FF  FFF             F     X",
"X     FFF  FF       F       C     F    X",
"X            FFCCFFF               F  CX",
"X   F          FF         FFFFF     F  X",
"X      C                   COC       F X",
"X F                C      FFFFF    CF  X",
"X   P                              F   X",
"X   F                           FFF    X",
"X           C  O  C        FF  F       X",
"X F        FFFFFFFFF            F      X",
"X   C     C           O        F  C  O X",
"X   F     FF  F F  FFFFFF       FFFFFFFX",
"X              F  C                   CX",
"X F        FFF   FFF            FFFFFFFX",
"X                     C               PX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"];
    this.initMap();
  }
  
  initMap() {
    for (var i = 0; i< this.tileMap.length; i++) {
      this.wallBools[i] = [];
      for (var j = 0; j < this.tileMap[i].length; j++) {
        this.wallBools[i][j] = 0;
        switch (this.tileMap[i][j]) {
          case 'P':
            this.player = new Player(j, i, this.gridStep);
            this.viewingX = i * this.gridStep + this.gridStep/2;
            break;
          case 'F':
            this.walls.push(new Wall(j, i, this.gridStep, 1));
            this.wallBools[i][j] = 2;
            break;
          case 'X':
            this.walls.push(new Wall(j, i, this.gridStep, 0));
            this.wallBools[i][j] = 1;
            break;
          case 'C':
            this.prizes.push(new Prize(j, i, this.gridStep));
            this.remainingTargets++;
            break;
          case 'O':
            this.enemies.push(new Enemy(j, i, this.gridStep));
            break;
        }
      }
    }
    this.worldWidth = this.tileMap[0].length * this.gridStep;
    this.worldHeight = this.tileMap.length * this.gridStep;
  }
  
  update() {
    let i;
    this.gameTimer.update();
    
    this.viewingX = this.player.update(this.viewingX);
    
    for (i = 0; i < this.walls.length; i++) {
      this.walls[i].update(this.viewingX);
    }
    
    for (i = 0; i < this.prizes.length; i++) {
      if (!this.prizes[i].collected) {
        this.remainingTargets -= this.prizes[i].update(this.viewingX);
      }
    }
    
    if (this.remainingTargets <= 0) {
      return 1;
    }
    
    for (i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].alive) {
        switch(this.enemies[i].update(this.player.pos, this.player.onFloor, this.viewingX)) {
          case 2:
            if (this.player.dir.y > 0 && !this.player.onFloor) {
              this.enemies[i].alive = false;
              break;
            }
          case 1:
            this.player.health--;
            break;
        }
      }
    }
    
    if (!this.player.alive) {
      return 2;
    }
    return 0;
  }
  
  draw() {
    var i;
    background([135, 206, 235]);
    for (i = 0; i < this.walls.length; i++) {
      if (abs(this.viewingX - this.walls[i].pos.x - this.halfGrid) <= halfWidth + this.walls[i].spacing) {
        this.walls[i].draw();
      }
    }
    for (i = 0; i < this.prizes.length; i++) {
      if (!this.prizes[i].collected && abs(this.viewingX - this.prizes[i].pos.x - this.halfGrid) <= halfWidth + this.prizes[i].spacing) {
        this.prizes[i].draw();
      }
    }
    
    this.player.draw();
    
    for (i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].alive && abs(this.viewingX - this.enemies[i].pos.x - this.halfGrid) <= halfWidth + this.enemies[i].spacing) {
        this.enemies[i].draw();
      }
    }
    
    this.gameTimer.draw();
    text("Remaining: " + this.remainingTargets, 5, 15);
  }
  
  wallCollisions(me) {
    var [xCor, yCor] = me.getCoords();
    var [xSCor, ySCor] = me.getSloppyCoords();
    let futurePos = p5.Vector.add(me.pos, me.vel);
    let wallPos;
    var mannhatVec;
    var mannhatDist;

    
    for (var i = ySCor-1; i <= ySCor+1; i++) {
      for (var j = xSCor-1; j <= xSCor+1; j++) {
        if(this.wallBools[i][j]) { // If there is a wall at corrdinates
          wallPos = createVector(j * this.gridStep, i * this.gridStep);
          mannhatDist = createVector(abs(me.pos.x - wallPos.x), abs(me.pos.y - wallPos.y));
          if (this.wallBools[i][j] == 1 && mannhatDist.y < me.height && ((me.pos.x >= wallPos.x + this.gridStep && futurePos.x < wallPos.x + this.gridStep) || (me.pos.x + me.width <= wallPos.x && futurePos.x + me.width > wallPos.x))) {
            me.vel.x = 0;
            me.pos.x = wallPos.x - (me.dir.x * me.width);
          }
          if (mannhatDist.x < me.width * 0.98 && ((this.wallBools[i][j] == 1 && me.pos.y >= wallPos.y + this.gridStep && futurePos.y < wallPos.y + this.gridStep) || (me.pos.y + me.height <= wallPos.y && futurePos.y + me.height > wallPos.y))) {
            me.vel.y = 0;
            me.pos.y = wallPos.y - (me.dir.y * me.width);
            if (me.dir.y > 0) {
              me.onFloor = true;
            }
          }
        }
      }
    } 
  }
}

class Tile {
  constructor(x, y, spacing) {
    this.pos = createVector(spacing * x, spacing * y);
    this.drawingX = this.pos.x;
    this.spacing = spacing;
    this.height = spacing;
    this.width = spacing;
    this.halfHeight = this.height/2;
    this.halfWidth = this.width/2;
    this.fillColor = 0;
  }
  
  update(viewingX) {
    this.updateDrawingCoords(viewingX);
  }
  
  draw() {
    noStroke();
    fill(this.fillColor);
    rect(this.drawingX, this.pos.y, this.height, this.width);
  }
  
  updateDrawingCoords(viewingX) {
    this.drawingX = halfWidth + this.pos.x - viewingX
  }
  
  getCoords() {
    return [this.pos.x/this.spacing, this.pos.y/this.spacing]
  }
  
  getSloppyCoords() {
    var realCoords = this.getCoords();
    return [floor(realCoords[0] + 0.5), floor(realCoords[1] + 0.5)];
  }
}

class Wall extends Tile {
  constructor(x, y, spacing, style) {
    super(x, y, spacing);
    this.style = style;
    this.quarterSpacing = spacing/4;
    this.fillColor = themeDark;
    this.fillColor2 = themeMed;
    this.unit = this.spacing/4;
  }
  
  draw() {
    if (this.style) {
      strokeWeight(1);
      stroke(this.fillColor);
      fill(this.fillColor2);
      rect(this.drawingX, this.pos.y, this.width, this.quarterSpacing);
    } else {
      noStroke();
      fill(this.fillColor);
      rect(this.drawingX, this.pos.y, this.height, this.width);
    }
  }
}

class Prize extends Tile {
  constructor(x, y, spacing) {
    super(x, y, spacing);
    this.quarterSpacing = spacing/4;
    this.fillColor = [0, 255, 0];
    this.unit = this.spacing / 10;
    this.collected = false;
  }
  
  update(viewingX) {
    this.updateDrawingCoords(viewingX);
    
    let manhattanDist = p5.Vector.sub(this.pos, gameObj.player.pos);
    
    this.collected = abs(manhattanDist.x) < this.width && abs(manhattanDist.y) < this.height;
    return this.collected;
  }
  
  draw() {
    strokeWeight(1);
    stroke(0);
    fill(220);
    
    ellipse(this.drawingX + this.halfWidth, this.pos.y + this.quarterSpacing + 3, this. width, this.quarterSpacing);
    ellipse(this.drawingX + this.halfWidth, this.pos.y + this.quarterSpacing, this. width, this.quarterSpacing);
    
    strokeWeight(3);
    line(this.drawingX + this.halfWidth, this.pos.y, this.drawingX + this.halfWidth, this.pos.y + this.height);
  }
}

class Actor extends Tile {
  constructor(x, y, spacing) {
    super(x, y, spacing);
    this.additionalFriction = 0;
    this.maxXVel = 5;
    this.vel = createVector(0, 0);
    this.dir = createVector(0, 0);
    this.onFloor = false;
    this.alive = true;
  }
  
  applyPhysics() {
    this.vel.y += 0.5; // Gravity
    if (this.onFloor) {
      this.vel.x *= 0.875 - this.additionalFriction; // Ground friction
    }
    this.vel.mult(0.95); // Drag
    
    if (this.vel.x > this.maxXVel) {
      this.vel.x = this.maxXVel
    } else if (this.vel.x < -this.maxXVel) {
      this.vel.x = -this.maxXVel;
    }
    
    if (this.vel.x) {
      this.dir.x = this.vel.x/abs(this.vel.x);
    }  else {
      this.dir.x = 0;
    }
    if (this.vel.y) {
      this.dir.y = this.vel.y/abs(this.vel.y);
    } else {
      this.dir.y = 0;
    }
  }
}

class Player extends Actor {
  constructor(x, y, spacing) {
    super(x, y, spacing);
    this.jumpAccel = 8;
    this.xAccel = 0.7;
    this.xHalfAccel = this.xAccel/2;
    this.angleStep = TWO_PI/40;
    this.viewMargin = width/8;
    this.jump = false;
    this.crouched = false;
    this.crouchedFrame = 0;
    this.notCrouchedFrame = 0;
    this.fill = [0, 0, 255];
    this.health = 1;
  }
  
  update(viewingX) {
    if (this.health <= 0) {
      this.alive = false;
    }
    
    if (keyArray[LEFT_ARROW] || keyArray[65]) {
      if (this.onFloor) {
        this.vel.x -= this.xAccel;
      } else {
        this.vel.x -= this.xHalfAccel;
      }
      
    } else if (keyArray[RIGHT_ARROW] || keyArray[68]) {
      if (this.onFloor) {
        this.vel.x += this.xAccel;
      } else {
        this.vel.x += this.xHalfAccel;
      }
    }
    
    if ((keyArray[UP_ARROW] || keyArray[87]) && this.onFloor) {
      this.jump = true;
      if (this.crouchedFrame <= frameCount + 35) {
        this.additionalFriction = 0.2;
      }
      if (this.crouchedFrame <= frameCount) {
        this.crouched = true;
      }
    } else {
      this.additionalFriction = 0;
      if (this.jump && this.onFloor) {
        this.vel.y -= this.jumpAccel + this.crouched * 0.25 * this.jumpAccel;
      }
      this.crouchedFrame = frameCount + 50;
      this.crouched = false;
      this.jump = false;
    }
    
    this.applyPhysics();
    
    gameObj.wallCollisions(this);
    
    if(this.onFloor && this.vel.y) {
      this.onFloor = false;
    }

    this.pos.add(this.vel);
    
    if(this.pos.x - viewingX < -this.viewMargin) {
      viewingX = this.pos.x + this.viewMargin;
    } else if(this.pos.x - viewingX > this.viewMargin) {
      viewingX = this.pos.x - this.viewMargin;
    }
    
    if (viewingX < halfWidth) {
      viewingX = halfWidth;
    } else if(viewingX > gameObj.worldWidth - halfWidth) {
      viewingX = gameObj.worldWidth - halfWidth;
    }
    
    this.updateDrawingCoords(viewingX);
    
    return viewingX;
  }
  
  draw() {
    let index = 0
    
    if (this.dir.x < 0) {
      index += 5;
    }
    if (!this.onFloor && this.dir.y < 0) {
      image(frogImages[index+4], this.drawingX, this.pos.y, 25, 25);
    } else {
      if (this.crouched) {
        index += 2
      }
      if (abs(this.vel.x) > 0.25) {
        index += round(frameCount/15) % 2
      }
      image(frogImages[index], this.drawingX, this.pos.y, 20, 20);
    }
  }
}

class Enemy extends Actor {
  constructor(x, y, spacing) {
    super(x, y, spacing);
    let chaseXAccel = 0.5;
    let wanderXAccel = chaseXAccel * 0.2;
    this.vision = pow(125, 2);
    this.alive = true;
    this.fillColor = [255, 0, 0];
    this.states = [new EnemyWanderState(wanderXAccel), new EnemyChaseState(chaseXAccel)];
    this.state = 0;
    this.playerPos;
    this.playerOnFloor;
    this.jumpAccel = 7;
    this.maxXVel = 2;
    this.segments = [];
    
    for (let i = 1; i <= 7; i++) {
      this.segments.push(new Segment(this.pos.x, this.pos.y, this.spacing, i * 0.5));
      if (i > 1) {
        this.segments[i-2].assign(this.segments[i-1]);
      }
    }
  }
  
  update(playerPos, playerOnFloor, viewingX) {
    this.playerPos = playerPos;
    this.playerOnFloor = playerOnFloor;
    this.state = (distSquared(this.playerPos.x, this.playerPos.y, this.pos.x, this.pos.y) <= this.vision);
    this.states[int(this.state)].execute(this);
    
    this.applyPhysics();
    
    gameObj.wallCollisions(this);
    
    if(this.onFloor && this.vel.y) {
      this.onFloor = false;
    }
    
    this.pos.add(this.vel);
    
    this.updateDrawingCoords(viewingX);
    
    let manhatanDist = p5.Vector.sub(this.pos, this.playerPos);
    
    this.segments[0].push(this.pos);
    
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].update(viewingX);
    }
    
    if (abs(manhatanDist.x) < this.width && abs(manhatanDist.y) < this.height) {
      if (abs(manhatanDist.x) <= abs(manhatanDist.y)) {
        return 2;
      } else {
        return 1;
      }
    }
    return 0;
  }
  
  draw() {
    for (let i = this.segments.length - 1; i >= 0; i--) {
      this.segments[i].draw(this.dir.x);
    }
    
    let index = 0
    
    if (this.dir.x > 0) {
      index += 2;
    }
    
    image(snakeImages[index], this.drawingX, this.pos.y, this.height, this.width);
  }
}

class Segment extends Tile {
  constructor (x, y, spacing, offset) {
    super(x, y, spacing);
    this.offset = offset
    this.halfOffset = offset/2;
    this.height -= this.offset;
    this.width -= this.offset;
    this.halfWidth = this.width/2;
    this.nextSeg = null;
    this.posQueue = [];
    this.trigger = 6;
    this.fillColor = [200, 0, 0];
  }
  
  assign(nextSeg) {
    this.nextSeg = nextSeg;
  }
  
  push(pos) {
    this.posQueue.push(createVector(pos.x, pos.y));
  }
  
  update(viewingX) {
    if (this.posQueue.length >= this.trigger) {
      this.pos = (this.posQueue.shift());
      if (this.nextSeg != null) {
        this.nextSeg.push(this.pos);
      }
    }
    this.updateDrawingCoords(viewingX);
  }
  
  draw(dir) {
    noStroke();
    fill(snakeYellow);
    rect(this.drawingX + this.halfOffset, this.pos.y + this.offset, this.width, this.height)
    fill(snakeGreen);
    rect(this.drawingX + this.halfOffset, this.pos.y + this.offset, this.width, this.halfHeight);
  }
}

class EnemyWanderState {
  constructor(xAccel) {
    this.wanderDir = 1;
    this.xAccel = xAccel;
  }
  
  execute(me) {
    var [xSCor, ySCor] = me.getSloppyCoords();
    if (me.onFloor && (gameObj.wallBools[ySCor + 1][xSCor + this.wanderDir] == 0 || gameObj.wallBools[ySCor][xSCor + this.wanderDir] != 0 )) {
      this.wanderDir *= -1;
    }
    if (me.onFloor) {
      me.vel.x += this.wanderDir * this.xAccel;
    }
  }
}

class EnemyChaseState {
  constructor(xAccel) {
    this.xAccel = xAccel;
  }
  
  execute(me) {
    if (me.onFloor) {
      if (me.pos.y > me.playerPos.y && me.playerOnFloor) {
        me.vel.y -= me.jumpAccel
      }
    
      if (me.pos.x < me.playerPos.x) {
        me.vel.x += this.xAccel;
      } else if (me.pos.x > me.playerPos.x) {
        me.vel.x -= this.xAccel;
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


  //createCanvas(canvasW, canvasH);
  getFrogArt(1);
  getFrogArt(-1);
  getSnakeArt(1);
  getSnakeArt(-1);
  openingLogo = new Logo();
  gameStates = [
    new LogoState(),
    new MenuState(),
    new InstructionsState(),
    new PlayState(),
    new WinState(),
    new LoseState(),
  ];
  clickState = [false, 0, 0];
}

/*
Function: draw()

Responsible for drawing all graphics. Also dictates game state behaviors.
*/
function draw() {
  gameStates[currentGameState].execute();
}

class LogoState {
  constructor() {}

  execute() {
    openingLogo.draw();
    if (logoTimer < millis()) {
      currentGameState = 1;
    }
  }
}

class MenuState {
  constructor() {}

  execute() {
    background(themeDark);

    strokeWeight(3);
    stroke(themeLight);
    fill(themeMed);
    rect(50, 325, 125, 40);
    rect(225, 325, 125, 40);
    textSize(20);
    noStroke();
    textSize(20);
    fill(themeLight);
    text("Instructions", 60, 350);
    text("Play", 270, 350);
    textSize(30);
    text("Treefrog Tribulations", 65, 100);
    
    image(frogImages[2], 50, 175, 120, 120);
    
    let yFactor = 15*sin(frameCount*PI/51)*sin(frameCount*PI/17)*sin(frameCount*PI/11)
    
    strokeWeight(1);
    stroke(0);
    fill(200, 200, 220, 200);
    
    ellipse(250, 190+yFactor, 100, 25);
    ellipse(250, 175+yFactor, 100, 25);
    
    strokeWeight(5);
    line(250, 150+yFactor, 250, 250+yFactor);

    if (clickState[0]) {
      var xCor = clickState[1];
      var yCor = clickState[2];
      if (60 <= xCor && xCor <= 175 && 325 <= yCor && yCor <= 365) {
        currentGameState = 2;
        clickState[0] = false;
      } else if (225 <= xCor && xCor <= 350 && 325 <= yCor && yCor <= 365) {
        currentGameState = 3;
        gameObj = new PlatformGame(gridSize);
        clickState[0] = false;
      }
    }
  }
}

class InstructionsState {
  constructor() {}

  execute() {
    background(themeDark);
    strokeWeight(3);
    stroke(themeLight);
    fill(themeMed);
    rect(150, 325, 100, 40);
    noStroke();
    fill(themeLight);
    textSize(14);
    text("Menu", 180, 350);
    text(
      "You are a hungry tree frog. Thankfully, there are dragonflies in the jungle today. However, emerald tree boas lurk among the branches.\n\nUse the left and right arrow keys (or A and D) to move left and right. Release the up arrow (or W) to jump.\n\nHolding down the up arrow will charge up a higher jump. The frog crouches when the higher jump is charged up.\n\nSnakes will try to eat you if you get too close. Land on their head to squash them. Be careful: they can jump up to bite you from below if you are standing on a platform. You must be moving downward when hitting their head to squash them -- otherwise you are eaten.",
      50,
      10,
      350,
      300
    );
    
    image(frogImages[0], 10, 20, 30, 30);
    image(frogImages[4], 10, 80, 30, 30);
    image(frogImages[2], 10, 140, 30, 30);
    image(snakeImages[2], 10, 225, 30, 30);

    if (clickState[0]) {
      var xCor = clickState[1];
      var yCor = clickState[2];
      if (150 <= xCor && xCor <= 250 && 325 <= yCor && yCor <= 365) {
        currentGameState = 1;
        clickState[0] = false;
      }
    }
  }
}

class PlayState {
  constrctor() {}

  execute() {
    background(themeDark);
    clickState[0] = false;
    switch (gameObj.update()) {
      case 0: // Game continues
        gameObj.draw();
        break;
      case 1: // Player wins
        confettis = [];
        gameObj.gameTimer.moveTo(77.5, 87.5);
        currentGameState = 4;
        break;
      case 2: // Player loses
        currentGameState = 5;
        break;
    }
  }
}

class WinState {
  constructor() {}

  execute() {
    background(themeDark);
    strokeWeight(3);
    stroke(themeLight);
    fill(themeMed);
    rect(150, 325, 100, 40);
    noStroke();
    fill(themeLight);
    textSize(13.5);
    text("Menu", 180, 350);
    text(
      "Congratulations! You've eaten enough to survive another day. Here's some confetti. See how you rank:\n\nYour time:\n\n<2:00 ~ Speedrunner. Get a life.\n2:00-4:00 ~ Apex Predator. A ribbetting perfomrance.\n4:00-6:00 ~ Treetop Master. You jumped at the opportunity.\n6:00-10:00 ~ Juvenile. Welcome to the jungle.\n>10:00 ~ Tadpole. Get back in the water!",
      10,
      25,
      390,
      300
    );
    
    gameObj.gameTimer.draw();
    
    if (confettiTimer + 10 <= frameCount) {
      confettiTimer = frameCount;
      confettis[confettiIndex] = new Confetti();
      confettiIndex++;
      confettiIndex %= 30;
    }
    
    for (let i = 0; i < confettis.length; i++) {
      confettis[i].draw();
    }

    if (clickState[0]) {
      var xCor = clickState[1];
      var yCor = clickState[2];
      if (150 <= xCor && xCor <= 250 && 325 <= yCor && yCor <= 365) {
        currentGameState = 1;
        clickState[0] = false;
      }
    }
  }
}

class LoseState {
  constructor() {}

  execute() {
    background(themeDark);
    strokeWeight(3);
    stroke(themeLight);
    fill(themeMed);
    rect(150, 325, 100, 40);
    noStroke();
    fill(themeLight);
    textSize(13.5);
    text("Menu", 180, 350);
    text(
      "Ouch. I guess the story ends there... unless you try again.",
      10,
      25,
      390,
      300
    );
    
    image(frogImages[9], 225, 200, 50, 50);
    image(snakeImages[2], 150, 150, 100, 100);

    if (clickState[0]) {
      var xCor = clickState[1];
      var yCor = clickState[2];
      if (150 <= xCor && xCor <= 250 && 325 <= yCor && yCor <= 365) {
        currentGameState = 1;
        clickState[0] = false;
      }
    }
  }
}

/*
function: mouseClicked()

Detects mouse clicks and affects game state when necessary
*/
function mouseClicked() {
  clickState = [true, mouseX, mouseY];
}

/*
function: keyPressed()

Tracks keys that are pressed.
*/
function keyPressed() {
  keyArray[keyCode] = 1;
}

/*
function: keyReleased()

Tracks keys that are released.
*/
function keyReleased() {
  keyArray[keyCode] = 0;
}

/*
Function: distSquared()

Calculates the square of the distance between two points

Parameters:
x1; X-coordinate of first point
y1; Y-coordinate of first point
x2; X-coordinate of second point
y2; Y-coordinate of second point
*/
function distSquared(x1, y1, x2, y2) {
  return pow(x1 - x2, 2) + pow(y1 - y2, 2);
}

class GameTimer {
  constructor(x, y, textSize, stroke) {
    this.x = x;
    this.y = y;
    this.textSize = textSize;
    this.stroke = stroke;
    this.start = millis();
    this.millisecs = 0;
    this.seconds = 0;
    this.minutes = 0;
  }

  update() {
    var currentTime = millis() - this.start;
    this.millisecs = floor(currentTime / 10) % 100;
    this.seconds = floor(currentTime / 1000) % 60;
    this.minutes = floor(currentTime / 60000);
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(this.stroke);
    textSize(this.textSize);
    text(
      this.minutes + ":" + this.seconds + "." + this.millisecs,
      this.x,
      this.y
    );
  }
}

class Confetti {
  constructor() {
    this.width = random(6, 10);
    this.height = random(10, 18);
    this.fill = [random(190, 240), random(190, 240), random(190, 240)];
    this.x = random(0, width-this.width);
    this.y = -this.height;
    this.vel = 0.1;
  }
  
  draw() {
    this.vel += 0.025;
    this.y += this.vel;
    noStroke();
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
  }
}

function getFrogArt(dir) {
  clear();
  background(0, 0, 0, 0);
  let unit = width/80
  
  push()
  translate(width/4, 0)
  stroke(frogGreen);
  strokeWeight(2*unit);
  line(dir*16*unit, 19*unit, dir*11*unit, 13*unit);
  line(dir*12*unit, 10*unit, dir*11*unit, 13*unit);
  line(dir*4*unit, 11*unit, dir*9*unit, 16*unit);
  line(dir*2*unit, 16.5*unit, dir*9*unit, 16*unit);
  line(dir*2*unit, 16.5*unit, dir*7*unit, 19*unit);
  strokeWeight(6*unit);
  line(dir*17*unit, 5*unit, dir*6*unit, 9*unit);
  
  stroke(frogOrange);
  strokeWeight(2*unit);
  line(dir*15*unit, 19*unit, dir*18*unit, 19*unit);
  line(dir*6*unit, 19*unit, dir*9*unit, 19*unit);
  
  noStroke()
  fill(frogRed);
  circle(dir*13.5 * unit, 2.5 * unit, 5 * unit)
  fill(0)
  ellipse(dir*14 * unit, 2.5 * unit, 2 * unit, 3 * unit)
  translate(-width/4, 0)
  frogImages.push(get(width/8 + dir * width/8,0,20 * unit, 20 * unit));
  pop()
  
  
  push()
  translate(width/4, 20 * unit)
  stroke(frogGreen);
  strokeWeight(2*unit);
  line(dir*14*unit, 19*unit, dir*10*unit, 12*unit);
  line(dir*12*unit, 10*unit, dir*10*unit, 12*unit);
  line(dir*4*unit, 11*unit, dir*10*unit, 14*unit);
  line(dir*3*unit, 15.5*unit, dir*10*unit, 14*unit);
  line(dir*3*unit, 15.5*unit, dir*9*unit, 19*unit);
  strokeWeight(6*unit);
  line(dir*17*unit, 5*unit, dir*6*unit, 9*unit);
  
  stroke(frogOrange);
  strokeWeight(2*unit);
  line(dir*13*unit, 19*unit, dir*16*unit, 19*unit);
  line(dir*8*unit, 19*unit, dir*11*unit, 19*unit);
  
  noStroke()
  fill(frogRed);
  circle(dir*13.5 * unit, 2.5 * unit, 5 * unit)
  fill(0)
  ellipse(dir*14 * unit, 2.5 * unit, 2 * unit, 3 * unit)
  translate(-width/4, 0)
  frogImages.push(get(width/8 + dir * width/8, 20 * unit, 20 * unit, 20 * unit));
  pop()
  
  
  push()
  translate(width/2 + 20 * unit, 0)
  stroke(frogGreen);
  strokeWeight(2*unit);
  line(dir*16*unit, 19*unit, dir*10.5*unit, 14*unit);
  line(dir*15*unit, 11*unit, dir*10.5*unit, 14*unit);
  line(dir*4*unit, 12.5*unit, dir*9*unit, 17*unit);
  line(dir*3*unit, 15*unit, dir*9*unit, 17*unit);
  line(dir*3*unit, 15*unit, dir*7*unit, 19*unit);
  strokeWeight(6*unit);
  line(dir*17*unit, 9*unit, dir*6*unit, 10*unit);
  
  stroke(frogOrange);
  strokeWeight(2*unit);
  line(dir*15*unit, 19*unit, dir*18*unit, 19*unit);
  line(dir*6*unit, 19*unit, dir*9*unit, 19*unit);
  
  noStroke()
  fill(frogRed);
  circle(dir*13.5 * unit, 5.5 * unit, 5 * unit)
  fill(0)
  ellipse(dir*14 * unit, 5 * unit, 2 * unit, 3 * unit)
  translate(-width/2 - 20 * unit, 0)
  frogImages.push(get(5*width/8 + dir * width/8, 0, 20 * unit, 20 * unit));
  pop()
  
  
  push()
  translate(width/2 + 20 * unit, 20 * unit)
  stroke(frogGreen);
  strokeWeight(2*unit);
  line(dir*14*unit, 19*unit, dir*10.5*unit, 13*unit);
  line(dir*15*unit, 11*unit, dir*10.5*unit, 13*unit);
  line(dir*4*unit, 12.5*unit, dir*10*unit, 16.5*unit);
  line(dir*3.5*unit, 16*unit, dir*10*unit, 16.5*unit);
  line(dir*3.5*unit, 16*unit, dir*9*unit, 19*unit);
  strokeWeight(6*unit);
  line(dir*17*unit, 9*unit, dir*6*unit, 10*unit);
  
  stroke(frogOrange);
  strokeWeight(2*unit);
  line(dir*13*unit, 19*unit, dir*16*unit, 19*unit);
  line(dir*8*unit, 19*unit, dir*11*unit, 19*unit);
  
  noStroke()
  fill(frogRed);
  circle(dir*13.5 * unit, 5.5 * unit, 5 * unit)
  fill(0)
  ellipse(dir*14 * unit, 5 * unit, 2 * unit, 3 * unit)
  translate(-width/2 - 20 * unit, -20 * unit)
  frogImages.push(get(5*width/8 + dir * width/8, 20 * unit, 20 * unit, 20 * unit));
  pop()
  
  
  push()
  translate(width/2, 40 * unit)
  stroke(frogGreen);
  strokeWeight(2*unit);
  line(dir*23.5*unit, 16*unit, dir*16*unit, 13*unit);
  line(dir*17*unit, 10*unit, dir*16*unit, 13*unit);
  line(dir*9*unit, 12*unit, dir*10*unit, 19*unit);
  line(dir*5*unit, 19.5*unit, dir*10*unit, 19*unit);
  line(dir*5*unit, 19.5*unit, dir*2*unit, 24*unit);
  strokeWeight(6*unit);
  line(dir*22*unit, 5*unit, dir*11*unit, 11*unit);
  
  stroke(frogOrange);
  strokeWeight(2*unit);
  line(dir*23.5*unit, 16*unit, dir*24*unit, 13.5*unit);
  line(dir*1*unit, 24*unit, dir*4*unit, 24*unit);
  
  noStroke()
  fill(frogRed);
  circle(dir*18.5 * unit, 2.5 * unit, 5 * unit)
  fill(0)
  ellipse(dir*19 * unit, 2.5 * unit, 1.25 * unit, 3 * unit)
  translate(-width/2, -40 * unit)
  frogImages.push(get(27.5 * unit + dir * 12.5 * unit,40 * unit, 25 * unit, 25 * unit));
  pop()
}

function getSnakeArt(dir) {
  clear();
  background(0, 0, 0, 0);
  
  let unit = width/40;
  
  push();
  translate(width/2, 0);
  
  stroke(snakeYellow);
  strokeWeight(4 * unit);
  line(dir*18*unit, 18*unit, dir*6*unit, 18*unit);
  line(dir*2*unit, 16*unit, dir*6*unit, 18*unit);
  line(dir*2*unit, 16*unit, dir*2*unit, 10*unit);
  line(dir*18*unit, 10*unit, dir*2*unit, 10*unit);
  line(dir*18*unit, 18*unit, dir*18*unit, 10*unit);
  noStroke();
  fill(snakeYellow);
  rect(dir*18*unit, 8*unit, dir*2*unit, 12*unit);
  rect(dir*2*unit, 10*unit, dir*18*unit, 8*unit);
  
  stroke(snakeGreen);
  strokeWeight(4 * unit);
  line(dir*13*unit, 5*unit, dir*18*unit, 5*unit);
  line(dir*13*unit, 5*unit, dir*2*unit, 7*unit);
  line(dir*2*unit, 10*unit, dir*2*unit, 7*unit);
  line(dir*2*unit, 10*unit, dir*13*unit, 10*unit);
  line(dir*13*unit, 10*unit, dir*18*unit, 11*unit);
  noStroke();
  fill(snakeGreen);
  rect(dir*18*unit, 3*unit, dir*2*unit, 10*unit);
  rect(dir*2*unit, 7*unit, dir*17*unit, 5*unit);
  ellipse(dir*17*unit, 3.5*unit, 6*unit, 4*unit);
  fill(snakeYellow);
  circle(dir*17*unit, 3.5*unit, 3*unit)
  
  fill(0)
  circle(dir*2*unit, 7*unit, 1.5*unit);
  stroke(0);
  strokeWeight(1*unit);
  line(dir*0*unit, 14.5*unit, dir*17*unit, 14.5*unit);
  line(dir*17*unit, 2.5*unit, dir*17*unit, 4.5*unit);
  
  translate(-width/2, 0)
  snakeImages.push(get(width/4 + dir * width/4, 0, 20 * unit, 20 * unit));
  pop();
  
  push();
  translate(width/2, height/2);
  noStroke();
  fill(snakeYellow);
  rect(dir*0*unit, 13*unit, dir*20*unit, 8*unit);
  fill(snakeGreen);
  rect(dir*0*unit, 0*unit, dir*20*unit, 13*unit);
  fill(255);
  rect(dir*5*unit, 0*unit, dir*1*unit, 5*unit);
  rect(dir*15*unit, 0*unit, dir*1*unit, 2*unit);
       
  translate(-width/2, -height/2)
  snakeImages.push(get(width/4 + dir * width/4, height/2, 20 * unit, 20 * unit));
  pop();
}