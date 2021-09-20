/*
  Rohit Panneer Selvam
  Spetember 17rd, 2021
  ECE 4525 - Project 2 - Simple Game with Tilemap

  Documentation:
  This project, titled 'HERO', is meant to showcase the tile map concept as well as make a game with NPC enemies and collision.
  
  The 'plot' of this game is a 'Hero' player is placed in the center of a ruined building or strucure and must escape while 5 purple alien... snakes(?) try to kill the player.
  
  The 'selling point' of my version of the game is the random generation of every level, enemy position and speed in the game. The walls are generated through 20 iterations of 'Conway's Game of Life', modified to make maze-like structures. The openings in ruined buildings are randomized to an extent. The tiled textures are all randomly generated, and the speed and positions of all enemies are randomly generated to an extent. This allows for much more replayability than a standard game with a fixed level design.

Also, as a bonus, the prizes and prize pickups are animated.
*/

// Asset Manager Class: Used to make asset references 
// streamlined and easy to follow.
class AssetManager{
  constructor() // Asset manager constructor
  {
    this.assets = new Map(); // Map for storing assets
  }
  // Insert function for inserting asset into AssetManager
  insert(type)
  {
    // If asset type not in manager, add new field to manager
    if (this.assets.get(type) == undefined)
      this.assets.set(type, []);
    let temp; // temp variable
    temp = this.assets.get(type); // Get asset array from map
    temp.push(get(0,0,width,height)) // Push new asset to array
    this.assets.set(type, temp) // Reset array in map
  }
  // Display asset to screen at position (x,y) with size 'tileSize'
  display(type,x,y)
  {
    // If asset type not in manager, do nothing
    if (this.assets.get(type) == undefined)
      return;
    image(random(this.assets.get(type)), x, y, tileSize, tileSize); // Display asset at location
  }
  // Display asset to screen at position (x,y,tile1,tile2)
  display2(type,x,y,tile1,tile2)
  {
    // If asset type not in manager, do nothing
    if (this.assets.get(type) == undefined)
      return;
    // Display asset at location
    image(random(this.assets.get(type)), x, y, tile1, tile2);
  }
}

// Enemy Class: Used to define enemy NPC behavior
class Enemy {
  // Enemy constructor
  constructor(x, y, orientation, direction) {
    this.x = x; // x val
    this.y = y; // y val
    // Defines whether movement is up/down or left/right
    this.orientation = orientation;
    // Defines direction of motion (up or down/left or right)
    this.direction = direction;
    // Save last moves to revert enemy back to previous position if boundary (wall, end of map) is hit
    this.lastMoves = [];
    // Counts moves to save processing speed later
    this.moveCount = 0;
    // Enemy speed
    this.speed = (random() + 1)*globalSpeedModifier;
    // Enemy hitbox size
    this.size = tileSize;
    // Counter used for various purpouses
    this.count = 0;
  }
  // Function to convert pixel value in range [0,400] to grid value in range [0,19]
  toGridVal(val) {
    return floor((val - val%mapSize)/mapSize)
  }
  
  // Checks if this instance of the enemy class intersects with a member of the player class in game
  intersectWithPlayer() {
    if (this.x >= playerDims[1][0] || playerDims[0][0] >= this.x+this.size  ||  this.y+this.size <= playerDims[0][1] || playerDims[1][1] <= this.y)
        return false;
    return true;
  }
  
  // Checks if current character position is valid (i.e. not in a wall)
  valid(type)
  {
    for (let i = 2; i < this.size - 2; i++)
    {
      for (let j = 2; j < this.size - 2; j++)
      {
        if (charArray[this.toGridVal(this.x + i)][this.toGridVal(this.y + j)] == type)
        return false;
      }
    }
    return true;
  }
  
  // Function to draw enemy. I went with a purple snake thing to be the arbitrary enemy of the game
  draw() {
    stroke(19,2,41);
    strokeWeight(1);
    fill(57,10,107);
    
    // Snake lower body
    rect(this.x+3,this.y+17,13,3);
    
    // Snake left 'arm'
    triangle(this.x+3,this.y+16,this.x, this.y+12,this.x+3,this.y+12);
    triangle(this.x+3,this.y+19,this.x, this.y+15,this.x+3,this.y+15);
    
    // Snake right 'arm'
    triangle(this.x+16,this.y+16,this.x+19, this.y+12,this.x+16,this.y+12);
    triangle(this.x+16,this.y+19,this.x+19, this.y+15,this.x+16,this.y+15);
    
    // Snake 'neck'
    triangle(this.x+6,this.y+15,this.x+10, this.y+19,this.x+14,this.y+15);
    triangle(this.x+6,this.y+12,this.x+10, this.y+16,this.x+14,this.y+12);
    triangle(this.x+6,this.y+9,this.x+10, this.y+13,this.x+14,this.y+9);
    triangle(this.x+6,this.y+6,this.x+10, this.y+10,this.x+14,this.y+6);
    
    // Snake head
    fill(68,19,133)
    triangle(this.x+3,this.y,this.x+10, this.y+6,this.x+17,this.y);
    strokeWeight(1);
    
    //Snake Eyes
    stroke(255,23,69)
    line(this.x+8, this.y+2, this.x+8.5, this.y+3)
    line(this.x+12, this.y+2, this.x+11.5, this.y+3)
    noStroke();
  }
  
  update() { // Updates variables in Eney class
    this.count++;
    // Temp value to append to lastMoves. Values consist of [If character has moved, did it go left/right or up/down, was it's movement negative]
    var temp = [false, false, false] 
    
    // Check if enemy intersects with player, if so end the game
    if (this.intersectWithPlayer())
    {
      gameRunning = false;
      gameLose = true;
    }
    
    // Movement check, uses orientation and direction values to move enemy based on speed. Also changes values in temp to add to lastMoves.
    if (this.orientation) {
      // Going left/right
      temp[0] = true;
      temp[1] = true;
      if (this.direction)
      {
        this.x -= this.speed;
        temp[2] = true;
      }
      else
        this.x += this.speed;
    }
    else {
      // Going up/down
      temp[0] = true;
      if (this.direction)
      {
        this.y -= this.speed;
        temp[2] = true;
      }
      else
        this.y += this.speed;
    }
    
    // Adds last move to LastMoves
    this.lastMoves.push(temp);
    
    // Makes sure lastMoves's length is less than or equal to 10
    if (this.moveCount > 10)
      this.lastMoves.shift();
    else
      this.moveCount++;
    
    // Checks valid movement every 5 frames to save processing time
    if(this.count >= 5)
    {
      this.count = 0;
      if(!this.valid(actor.Wall) && this.moveCount > 0)
        this.direction = !this.direction;
    }
    
    // Checks if character has reached game boundary, and resets position and direction if so
    if (this.x < 0)
    {
      this.x = 0;
      this.direction = false;
    }
    if (this.x + this.size > width)
    {
      this.x = width - this.size;
      this.direction = true;
    }
    if (this.y < 0)
    {
      this.y = 0;
      this.direction = false;
    }
    if (this.y + this.size > height)
    {
      this.y = height - this.size;
      this.direction = true;
    }
  }
}

// Player class, used to define the player's look and movement
class Player {
  constructor(x, y) { // Player Constructor
    this.x = x; // X value
    this.y = y; // Y value
    this.lastMoves = [];  // lastMoves, same as in Enemy Class
    this.moveCount = 0    // moveCount, same as in Enemy Class
    this.speed = 2*globalSpeedModifier; // player speed
    this.size = tileSize;  // size of player's square hitbox
    this.score = 0; // score value
    this.prizeVal = [false,-1,-1,-1,0] // Checks if player has picked up prize to show small animation
    this.flip = false; // Checks if player has been flipped from movement
  }
  
  // Function to convert pixel value in range [0,400] to grid value in range [0,19]
  toGridVal(val){
    return floor((val - val%mapSize)/mapSize)
  }
  
  // Checks if player has intersected with any walls or other static boundaries
  intersect(type)
  {
    for (let i = 5; i < this.size - 4; i++)
    {
      for (let j = 2; j < this.size - 2; j++)
      {
        let xval = this.toGridVal(this.x + i);
        let yval = this.toGridVal(this.y + j);
        if (charArray[xval][yval] == type)
          return [xval,yval];
      }
    }
    return [-1,-1];
  }
  
  // Checks if current position is valid or not (i.e. no intersecting walls)
  valid(type)
  {
    for (let i = 5; i < this.size - 4; i++)
    {
      for (let j = 2; j < this.size - 2; j++)
      {
        if (charArray[this.toGridVal(this.x + i)][this.toGridVal(this.y + j)] == type)
          return false;
      }
    }
    return true;
  }

  // Draws player character. I went for a action hero style player character for this game
  draw() {
    // Check if player is flipped
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))
      this.flip = keyIsDown(LEFT_ARROW);
    noStroke();
    
    // Draw Head
    fill(241,196,125); 
    rect(this.x + 7,this.y + 1,7,7);
    // Flip head if flip has occured
    if(!this.flip)
      rect(this.x + 8,this.y + 8,6,1);
    else
      rect(this.x + 7,this.y + 8,6,1);
    // Draw Hands
    rect(this.x + 5,this.y + 9,2,7);
    rect(this.x + 14,this.y + 9,2,7);
    
    // Draw Hair
    fill(255, 235, 59);
    rect(this.x + 7,this.y,7,2);
    rect(this.x + 6,this.y + 1,9,1);
    // Flip part of hair if flip has occured
    if(!this.flip)
    {
      rect(this.x + 6,this.y + 1,3,2);
      rect(this.x + 6,this.y + 1,2,5);
    }
    else
    {
      rect(this.x + 12,this.y + 1,3,2);
      rect(this.x + 13,this.y + 1,2,5);
    }
    
    // Draw eye, and flip if flip has occured
    fill(255); 
    if(!this.flip)
      rect(this.x + 11, this.y + 5, 2,1);
    else
      rect(this.x + 8, this.y + 5, 2,1);
    
    // Draw top of shirt
    fill(30,136,229); 
    rect(this.x + 7,this.y + 9,7,6);
    rect(this.x + 5,this.y + 9,2,4);
    rect(this.x + 14,this.y + 9,2,4);
    
    // Draw bottom of shirt
    fill(13,72,161); 
    rect(this.x + 5,this.y + 9,11,2);
    rect(this.x + 5,this.y + 9,2,3);
    rect(this.x + 14,this.y + 9,2,3);
    
    // Draw pants
    fill(31);
    rect(this.x + 7,this.y + 15,7,2);
    rect(this.x + 7,this.y + 15,3,5);
    rect(this.x + 11,this.y + 15,3,5);
    
    // Draw coin animation if coin has been collected
    if (this.prizeVal[0] && gameRunning)
    {
      // Draw coin
      assets.display('prize', this.prizeVal[1], this.prizeVal[2]);
      this.prizeVal[2] -= this.prizeVal[4]; // Coin vel
      this.prizeVal[4] -= 0.5; // Coin accel
      
      // If coin hits 'ground', stop drawing coin
      if(this.prizeVal[2] >= this.prizeVal[3])
        this.prizeVal = [false,-1,-1,-1,0]
    }
  }
  
  update() { // Update fucntion ro update player values
    // Update playerDims to show dimensions of player hitboxx
    playerDims = [[this.x + 5, this.y], [this.x + this.size - 4, this.y + this.size]];
    
    // Temp value to append to lastMoves. Values consist of [If character has moved, did it go left/right or up/down, was it's movement negative]
    var temp = [false, false, false]
    
    // Movement check, uses arrow keys to move player based on speed. Also changes values in temp to add to lastMoves.
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
      temp[0] = true;
      temp[1] = true;
      if (keyIsDown(LEFT_ARROW))
      {
        this.x -= this.speed;
        temp[2] = true;
      }
      else
        this.x += this.speed;
    }
    
    else if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
      temp[0] = true;
      if (keyIsDown(UP_ARROW))
      {
        this.y -= this.speed;
        temp[2] = true;
      }
      else
        this.y += this.speed;
    }
    
    // Add last move to lastMoves
    this.lastMoves.push(temp);
    
    // Makes sure lastMoves has less than or equal to 10 values
    if (this.moveCount > 10)
      this.lastMoves.shift();
    else
      this.moveCount++;
    
    // If player is intersectign with a wall and there are valid moves in lastMoves, loop and reverse moves until player has left wall
    while(!this.valid(actor.Wall) && this.moveCount > 0)
    {
      // Take last move from lastMoves
      let popped = this.lastMoves.pop();
      this.moveCount--;
      
      // Checks if player has last moved up, down, left, or right.
      if (popped[0])
      {
        if(popped[1])
        {
          // Player moved left/right
          if(popped[2])
            this.x += this.speed;
          else
            this.x -= this.speed;
        }
        else
        {
          // Player moved up/down
          if(popped[2])
            this.y += this.speed;
          else
            this.y -= this.speed;
        }
      }
    }
    // If player intersects with a prize, remove prize from character Array, which lists all walls and objects.
    let inter = this.intersect(actor.Prize);
    if (inter[0] != -1 && inter[1] != -1)
    {
      // Remove from character array
      charArray[inter[0]][inter[1]] = actor.None;
      this.score++; // increment score
      this.prizeVal = [true, inter[0]*20, inter[1]*20, inter[1]*20,6]; // Add values to prizeVal to start animation
    }
    // Checks if player has hit game boundaries and stops player from moving
    if (this.x <= 0)
      this.x = 0;
    if (this.x + this.size >= width - 2)
      this.x = width - this.size - 2;
    if (this.y <= 0)
      this.y = 0;
    if (this.y + this.size >= height - 2)
      this.y = height - this.size - 2;
    
    // If score has reached the number of prizes, stop game and declare victory
    if (this.score >= numberOfPrizes)
    {
      gameRunning = false;
      gameLose = false;
    }
    
  }
}

// Generate walls using a variation of Conway's Game of Life, programmed to generate maze-like structures. Walls are designed to look like they were part of some old ruined structure, with variable openings, holes, and wall patterns.
function wallGenerator()
{
  // Initalize walls and nextWalls array and fill with zeros
  walls = []
  nextWalls = []
  for(let i = 0; i < mapSize; i++)
  {
    walls.push(new Array(mapSize).fill(0))
    nextWalls.push(new Array(mapSize).fill(0))
  }
  
  // Set all values to random 0 or 1 inside walls array with a border around the edge
  for (let i = 1; i < mapSize-1; i++) 
  {
    for (let j = 1; j < mapSize-1; j++) 
      walls[i][j] = floor(random(2));
  }
  
  // Loop through walls array using modified Game of Life rules for 20 stages to, in most cases, reach a majority equilibrium
  for(let v = 0; v < 20; v++)
  {
    for (let x = 1; x < mapSize - 1; x++) 
    {
      for (let y = 1; y < mapSize - 1; y++) 
      {
        // For each value, sum up values of it's neighbors
        let sum = -walls[x][y];
        for (let i = -1; i <= 1; i++) 
        {
          for (let j = -1; j <= 1; j++) 
            sum += walls[x+i][y+j];
        }

        // Follow modified rules of Game of Life Behavior - 'kill' cells with less than 1 and more than 4 neighbors, and 'spawn' cells with 3 neighbors
        if ((walls[x][y] == 1) && (sum <  1)) 
          nextWalls[x][y] = 0;
        else if ((walls[x][y] == 1) && (sum >  4)) 
          nextWalls[x][y] = 0;
        else if ((walls[x][y] == 0) && (sum == 3)) 
          nextWalls[x][y] = 1;
        else                                             
          nextWalls[x][y] = walls[x][y];
      }
    }
    // Switch nextWalls and walls values, 'emptying' nextWalls array
    let temp = walls;
    walls = nextWalls;
    nextWalls = temp;
  }
  
  // Remove walls following a series of custom rules
  // 1. Empty some space in the center
  // 2. Empty a column/row 3 spaces in on every side of the grid
  // 3. Empty a column/row 5 spaces in on every side of the grid
  // 4. Following the wallMode value, create openings in the structure to the outside
  for (let i = 0; i < mapSize; i++) 
  {
    for (let j = 0; j < mapSize; j++) 
    {
      if (walls[i][j] == 1)
      {
        let rules = [i > 5 && i < 15 && j > 5 && j < 15,
                     i == 2 && j >=2 && j <= 17,
                     j == 2 && i >=2 && i <= 17,
                     i == 17 && j >= 2 && j <= 17,
                     j == 17 && i >= 2 && i <= 17,
                     i == 4 && j >= 4 && j <= 15,
                     j == 4 && i >= 5 && i <= 14,
                     i == 15 && j >= 4 && j <= 15,
                     j == 15 && i >= 5 && i <= 14,
                     ];
        if(wallMode == 1 || wallMode == 3)
          rules.push(j > 8 && j < 12);
        if(wallMode == 2 || wallMode == 3)
          rules.push(i > 8 && i < 12);
        let notUsed = true;
        // Loop through all rules. If none are true, add wall to tile
        for (let k = 0; k < rules.length; k++)
        {  
          if (rules[k])
          {
            walls[i][j] = actor.None;
            notUsed = false;
            break;
          }
        }
        if(notUsed)
          walls[i][j] = actor.Wall;
      }
    }
  }
  // Return generated walls
  return walls;
}

// Enum for values in the game grid
const actor = {
  None:  0,
  PC:    1,
  NPC:   2,
  Wall:  3,
  Prize: 4,
}

// Picks colors and draws tiles on the grid
function blockDrawer(lr, r, lg, g, lb, b,i,j)
{
  let rrand = floor(random()*10 + 1)
  let grand = floor(random()*10 + 1)
  let brand = floor(random()*10 + 1)
  fill(map(noise(i*rrand,j*rrand), 0, 1, lr,r), map(noise(i*grand,j*grand), 0, 1, lg,g), map(noise(i*brand,j*brand), 0, 1, lb, b));
  rect(i,j,pixelSize,pixelSize);
}

// Simplifies process for use if necessary
function simpleBlockDrawer(r,g,b,p,i,j)
{
  blockDrawer(r*p, r, g*p, g, b*p, b,i,j);
}

// Load all variables that change in each new iteration of the map
function loadVariableElements(playerInMap)
{
  // Run Wall Generator to generate walls
  charArray = wallGenerator();
  // Create array of valid (x,y) coordinates that could potentially contain prizes
  validArray = [];
  for(let i = 0; i < mapSize; i++)
  {
    for(let j = 0; j < mapSize; j++)
    {
      if(charArray[i][j] == 0 && (i < 9 || i > 12) && (j < 8 || j > 12))
        validArray.push([i,j])
    }
  }

  // Shuffle validArray and take the first 'numberOfPrizes' values to make as prize spaces - distribtues prizes in grid
  shuffle(validArray, true);
  for(let i = 0; i < numberOfPrizes; i++)
    charArray[validArray[i][0]][validArray[i][1]] = 4;
  
  // If player should be drawn on map, draws player. Instances where player would not be drawn on map would be in the main menu
  if (playerInMap)
    player = new Player(200,190);
  
  // Create array for enemies
  enemies = []
  // Shuffle starting values for the enemies
  randomStart = shuffle([0,180,220,380])
  // If enemy is facing walls up to 5 spaces into the game board, remove them
  for (let i = 0; i < 5; i++)
  {
    if(charArray[floor(randomStart[0]/20)][1+i] == actor.Wall)
      charArray[floor(randomStart[0]/20)][1+i] = actor.None;
    if(charArray[floor(randomStart[1]/20)][19-i] == actor.Wall)
      charArray[floor(randomStart[1]/20)][19-i] = actor.None;
    if(charArray[1+i][floor(randomStart[2]/20)] == actor.Wall)
      charArray[1+i][floor(randomStart[2]/20)] = actor.None;
    if(charArray[19-i][floor(randomStart[3]/20)] == actor.Wall)
      charArray[19-i][floor(randomStart[3]/20)] = actor.None;
  }
  // Add enemies to array
  enemies.push(new Enemy(randomStart[0],0,false, false))
  enemies.push(new Enemy(randomStart[1],height-30,false, true))
  enemies.push(new Enemy(0,randomStart[2],true, true))
  enemies.push(new Enemy(width-30,randomStart[3],true, false))
  enemies.push(new Enemy(random([40,340]),random([40,340]),true, false))
  
  // Add grass and path tiles to map in valid locations
  for(let i = 0; i < mapSize; i++)
  {
    for(let j = 0; j < mapSize; j++)
    {
      let xval = i*tileSize;
      let yval = j*tileSize;
      // Add path tiles randomly, focused on the center of the game screen (Center of the ruined building) adn add paths for any openings in the building ruins. Else, add grass tile.
      if(i > 1 && j > 1 && j < 18 && i < 18 &&(random()+0.1 < (sin(((i+1)/20)*3.14) + sin(((j+1)/20)*3.14))/2 || i >= 7 && i <= 13 && j >= 7 && j <= 13))
        assets.display('path', xval, yval);
      else
        assets.display('grass', xval, yval);
    }
  }
  
  // Check wall opening mode, and open walls at the top and bottom of building if true
  if(wallMode == 2 || wallMode == 3)
  {
    for(let i = 180; i < 230; i += 20)
    {
      for(let j = 0; j < height; j += 20)
        assets.display('path', i, j);
    }
  }
  
  // Check wall opening mode, and open walls to the left and right of building if true
  if(wallMode == 1 || wallMode == 3)
  {
    for(let i = 0; i < width; i += 20)
    {
      for(let j = 180; j < 230; j += 20)
        assets.display('path', i, j);
    }
  }
  
  // Show grid if 'grid' value is true, mainly for testing
  if (grid) 
  {
    stroke(0);
    for(let i = 0; i < mapSize; i++)
    {
      let val = i*tileSize;
      line(val, 0, val, height);
      line(0, val, width, val);
    }
  }
  
  // Take image of entire background with all tiles to speed up processing
  backgroundImg = get(0,0,width,height)
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
	
	/* till here additional code added to the  game for hosting in website */
	
   // Setup function, to set up all variables in game  
  //createCanvas(400, 400); // create 400x400 canvas
  
  frameRate(60); // Set framerate to 60 FPS
  // Value to run game if true and to stop game if false
  gameRunning = true; 
  // Value used at the end of game to decide if game is won or not
  gameLose = false;
  // Value to check if game is in the menu
  menu = true;
  
  // Set map size, for how many grids are in map
  mapSize = 20;
  // Set half of map size for use later
  halfmapSize = floor(mapSize/2);
  // Set tile size, to show how many pixels per tile there is 
  tileSize = floor(width/mapSize);
  // Sets grid on or off
  grid = false;
  // Sets size of 'pixels' in grass, path and wall textures
  pixelSize = 50;
  // Sets wall opening modes, 1 = ruins open left and right, 2 = ruins open up and down, 3 = ruins open in all 4 directions
  wallMode = random([1,2,3]);
  // Sets global speed of all characters and all rotation
  globalSpeedModifier = 1;
  // Value for number of prizes in game
  numberOfPrizes = 20;
  
  // Show dimensions of player character, for use in collision detection
  playerDims = [[-1,-1],[-1,-1]];
  
  // Create asset manager to save and load game assets
  assets = new AssetManager();
  
  // Grass Texture Generation - generates 5 variations of the grass texture for use in game
  background(0,255,0);
  noStroke();
  for(let v = 0; v < 5; v++)
  {
    for(let i = 0; i <= width; i += pixelSize)
    {
      for(let j = 0; j <= height; j += pixelSize)
        blockDrawer(10,50,70,190,10,80,i,j)
    }
    assets.insert('grass'); // Adds texture to asset manager
  }
  
   // Path Texture Generation - generates 3 variations of the grass texture for use in game
  background(0,255,0);
  noStroke();
  for(let v = 0; v < 3; v++)
  {
    for(let i = 0; i <= width; i += pixelSize)
    {
      for(let j = 0; j <= height; j += pixelSize)
        simpleBlockDrawer(194,167,108,0.8,i,j)
    }
    assets.insert('path'); // Adds texture to asset manager
  }
  
  // Wall Texture Generation - generates 3 variations of the grass texture for use in game
  pixelSize = 100; // Bricks are twice as long as normal pixels, but the same value high
  for(let v = 0; v < 3; v++)
  {
    for(let i = 0; i <= width; i += pixelSize*2)
    {
      count = 0;
      for(let j = 0; j <= height + pixelSize; j += pixelSize)
      {
        // Pick a brick color
        noStroke();
        fill(map(noise(i*3,j*3), 0, 1, 100, 136),map(noise(i*2,j*2), 0, 1, 110, 130),map(noise(i*3,j*3), 0, 1, 105, 125));
        
        // Offsets brick positions on eevery other row like bricks on real-world buildings
        let brickPosition = 0;
        if (count%2 == 0)
          brickPosition = i;
        else
          brickPosition = i - pixelSize;
        rect(brickPosition,j,pixelSize*2,pixelSize);

        // Adds mortar in between bricks
        stroke(190);
        strokeWeight(10);
        line(brickPosition,j,brickPosition,j+pixelSize);
        count++;
      }
    }
    
    // Add more mortar in between bricks
    for(let j = 0; j <= height + pixelSize; j += pixelSize)
    {
      stroke(200);
      strokeWeight(10);
      line(0,j,width,j);
    }
    stroke(220);
    strokeWeight(9);

    assets.insert('wall'); // Adds to asset manager
  }
  pixelSize = 50; // Resets pixel size
  
  // Prize Texture Generation - makes prize a gold 'token' that is gem-like in nature
  clear();
  stroke(255);
  fill(255,235,0);
  // Make top and bottom of prize
  triangle(width/2, 0, width/4, height/4, width*3/4, height/4);
  triangle(width/2, height, width/4, height*3/4, width*3/4, height*3/4);
  // Make middle of prize and add borders
  rect(width/4, height/4, width/2, height/2)
  stroke(255,235,0);
  strokeWeight(4);
  line(width/4 + 5, height/4, width*3/4 - 5, height/4);
  line(width/4 + 5, height*3/4, width*3/4 - 5, height*3/4);
  assets.insert('prize'); // Add to asset manager
  
  // Prize Glow Texture Generation - adds transluscent circle to act as 'glow' to coin
  clear();
  background(85,0);
  noStroke();
  fill(255,235,0,80)
  circle(200,200,380)
  assets.insert('glow');
  
  strokeWeight(1);
  background(0);
  
  rotateVal = 0; // Add rotate value to define prize rotation
  loadVariableElements(false); // Reloads all elements in gaem without player chaarcter for menu
}

// If mouse is clicked, start or restart game if game is in menu or ended
function mouseClicked() {
  // If in menu and mouse is clicked, start game and reload all elements
  if (menu) {
    menu = false;
    loadVariableElements(true);
  }
  
  // If gaem had ended and mouse is clicked, restart game and reload all elements
  else if (!gameRunning)
  {
    gameRunning = true;
    gameLose = false;
    loadVariableElements(true);
  }
}

// Function to draw all elements to screen
function draw() {
  background(0); // Clear canvas
  // Draw background image containing grass and path tiles
  image(backgroundImg,0,0,width,height);
  // If game is runnign, update rotation based on a triangle wave to make rotation seem consistent throughout it's movement
  if (gameRunning)
    rotateVal = map(2*abs(frameCount*globalSpeedModifier/64 - floor(frameCount*globalSpeedModifier/64 + 1/2)),0,1,0,floor(tileSize/2)-2);
  
  // Loop through character array and display all elements
  for(let i = 0; i < mapSize; i++)
  {
    for(let j = 0; j < mapSize; j++)
    {
      let xval = i*tileSize;
      let yval = j*tileSize;
      // Display wall
      if(charArray[i][j] == actor.Wall)
        assets.display('wall', xval, yval);
      // Display prize and glow
      if(charArray[i][j] == actor.Prize)
      {
        assets.display('glow', xval, yval + 5*rotateVal/8 - 2.5);
        assets.display2('prize', xval + rotateVal, yval + 5*rotateVal/8,tileSize - rotateVal*2, tileSize-5);
      }
    }
  }
  
  // If not in menu, draw player. If the game is running, update the player's motion as well
  if(!menu)
  {
    if (gameRunning)
      player.update();
    player.draw();
  }
  
  // Loop through and draw enemies. If the game is running, update their motion
  for (let i = 0; i < enemies.length; i++)
  {
    if (gameRunning)
      enemies[i].update();
    enemies[i].draw();
  }
  
  // Stop game and display if game has been won or lost based on various conditions
  textSize(50);  // Set text size to 80
  textStyle(BOLD);  // Make text bold
  stroke(54,34,4);  // Remove stroke
  strokeWeight(9);
  if (!gameRunning)
  {
    if(gameLose)  // If game is lost
    {
      fill(255, 35, 0);  // Set text color to red
      text('GAME OVER', 35, 200); // Set screen text to 'Game Over'
    }
    else  // If game is won
    {
      fill(255, 235, 0);  // Set text color to gold
      text('YOU WIN', 75, 200);  // Set screen text to 'You Win'
    }
    
    // Create text box showing that you may 'click anywhere to retsart the game'
    fill(54,34,4);
    rect(75,240,251,30);

    fill(212, 175, 55);
    let borderSize = 10;
    noStroke()
    rect(75-borderSize, 240-borderSize, 250+2*borderSize, borderSize);
    rect(75-borderSize, 240-borderSize, borderSize, 30+2*borderSize);
    rect(75-borderSize, 280-borderSize, 250+2*borderSize, borderSize);
    rect(330, 240-borderSize, borderSize, 30+2*borderSize);

    stroke(35,17,2);
    strokeWeight(2);
    line(75-borderSize, 240-borderSize, 75-borderSize, 270+ borderSize);
    line(75-borderSize, 240-borderSize, 330+borderSize, 240-borderSize);
    line(330+borderSize, 240-borderSize, 330+borderSize, 270+ borderSize);
    line(75-borderSize, 270+ borderSize, 330+borderSize, 270+ borderSize);

    textFont('Georgia');
    strokeWeight(2.5);
    textSize(17);
    textStyle(ITALIC);
    text('Click anywhere to play again...',85,260);
  }
  textStyle(NORMAL);  // Set text to normal
  noStroke();

  // If in menu, show the menu
  if(menu)
  {
    // Display game borders and title box, as well as instruction box
    fill(54,34,4);
    rect(0,0,20,height);
    rect(0,0,width,20);
    rect(0,height-20,width,height);
    rect(width-20,0,width,height);
    
    rect(90,80,220,100);
    rect(50,210,300,155);
    
    let highlightWidth = 6;
    fill(212, 175, 55);
    rect(18,18,highlightWidth,height-38);
    rect(18,18,width-38,highlightWidth);
    rect(18,height-20,width-38,highlightWidth);
    rect(width-26,18,highlightWidth,height-38);
    
    let borderSize = 10;
    rect(50-borderSize,210-borderSize, 300 + 2*borderSize,borderSize)
    rect(50-borderSize,210-borderSize, borderSize, 155 + 2*borderSize)
    rect(50-borderSize,210+155, 300 + 2*borderSize,borderSize)
    rect(50+300,210-borderSize, borderSize, 155 + 2*borderSize)
    
    stroke(35,17,2);
    strokeWeight(2);
    quad(100,90, 80,70, 80,190, 100,170);
    quad(100,90, 80,70, 320,70, 300,90);
    quad(300,90, 320,70, 320,190, 300,170);
    quad(100,170, 80,190, 320,190, 300,170);
    
    line(40,200,360,200);
    line(40,200,40,375);
    line(40,375,360,375);
    line(360,200,360,375);
    
    // Display title 
    textFont('Georgia');
    textStyle(BOLD);
    textSize(60);
    stroke(35,17,2);
    strokeWeight(5);
    text('HERO',103,153);
    
    // Display game instructions
    textFont('Arial');
    strokeWeight(3);
    textSize(20);
    text('You are a Hero.', 130, 235);
    text('In a moment, you will enter', 70, 257);
    text('  a world filled with danger.', 70, 277);
    text('Avoid enemies and collect all', 60, 297);
    text('coins to win. You cannot move', 55, 317);
    text('through walls.', 135, 337);
    
    // Show that the player may 'click anywhere to begin'
    textFont('Georgia');
    strokeWeight(2.5);
    textSize(17);
    textStyle(ITALIC);
    text('Click anywhere to begin.',108,357);
  }
}
