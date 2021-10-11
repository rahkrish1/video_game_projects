/*
Walter Newsome
wnewsome.com
*/

// Global variables
var world_map = [
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "                                        ",
    "     c                                  ",
    "wwwwwwwwwwwwww              c           ",
    "                  c                     ",
    "                 www          e     c   ",
    "     c                   wwwwwwwwwwwwwww",
    "                                        ",
    "        c          e c              c   ",
    "    wwwwwwwwwwwwwwwwwwwwww    c  wwwwwww",
    "  c                                     ",
    "                                        ",
    "        c   e  c      c          c  e   ",
    "       wwwwwwwwwww          wwwwwwwwwwww",
    "                                        ",
    "   e c                   ec             ",
    "wwwwwwwwwww    c c    wwwwwwww          ",
    "                                        ",
    "      c  e           e    c             ",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",];

var charmander = [
    "                     ",
    "    bbbb         b   ",
    "   boooob       brb  ",
    "  boooooob      brrb ",
    "  boooooob      brrb ",
    " boooooooob    brrrrb",
    "boooowbooob    brryrb",
    "boooobbooob    bryyrb",
    "boooobbooob     bybb ",
    " booooooooob    byb  ",
    "  bbooooooooob boob  ",
    "    bbboobooobboob   ",
    "     byyboooooboob   ",
    "     byyybbooobob    ",
    "    b byyyoooobb     ",
    "     bbbyyooobb      ",
    "        bbbobb       ",
    "         b o b       ",
    "          bbbb       ",
]

var mushroom = [
    "     bbbbbb     ",
    "   bbbwrrwbbb   ",
    "  bbwwwrrwwwbb  ",
    " bbrwwrrrrwwrbb ",
    " bwrrrrrrrrrrwb ",
    "bbwwrrwwwwrrwwbb",
    "bwwwrwwwwwwrwwwb",
    "bwwwrwwwwwwrwwwb",
    "bwwrrwwwwwwrrwwb",
    "brrrrrwwwwrrrrrb",
    "brrbbbbbbbbbbrrb",
    "bbbbwwbwwbwwbbbb",
    " bbwwwbwwbwwwbb ",
    "  bwwwwwwwwwwb  ",
    "  bbwwwwwwwwbb  ",
    "   bbbbbbbbbb   "
]

// Constants
var SIZE    = 20;
var WANDER  = 0;
var JUMPING = 1;
var CHASING = 2;
var FACING_LEFT = 3;
var FACING_RIGHT = 4;
var INSTRUCTIONS = 0;
var PLAYING = 1;
var GAMEOVER = 2;

class wallObj{
    // Wall objects are non-dynamic
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.x = this.i*SIZE;
        this.y = this.j*SIZE;
    }

    draw(){
        fill(0);
        // Display the image of the wall
        image(images[1], this.x, this.y, SIZE, SIZE);
    }
}

class coinObj{
    // Coins are displaced over the entire map
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.x = this.i*SIZE;
        this.y = this.j*SIZE;
        this.active = true;
        this.width = SIZE;
        this.dir = -1;
    }

    draw(){
        if(this.active){
            // Rotating coin illusion
            this.width += this.dir;
            if ((this.width > SIZE-1) || (this.width < 2)) {this.dir = -this.dir;}
            image(images[0], this.x-this.width/2+SIZE/2, this.y, this.width,20);
        }
    }
}

class enemyObj{
    // The enemy (Mushroom)
    constructor(i, j){
        this.i = i;
        this.j = j;
        // Setting initial values. This object is dynamic
        this.position = new p5.Vector(this.i*SIZE, this.j*SIZE);
        this.active = true;
        this.currState = WANDER;
        this.state = [new enemyWanderState(), new jumpState(), new enemyChaseState()];
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0);
        this.force = new p5.Vector(0, 0);
    }

    applyForce(force) {
        // Add a force over the object such as gravity or jump
        this.acceleration.add(force);
    }

    changeState(new_state) {
        // Changing to a different state
        if(new_state != this.currState){
            this.currState = new_state;
        }
    }
    update() {
        // Apply forces, control overall positioning of the object
        this.applyForce(this.force);
        this.applyForce(gravity);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if(this.position.x < 0)
            this.position.x = 0;
        if(this.position.x > 800-SIZE)
            this.position.x = 800-SIZE;
        if(this.position.y < SIZE){
            this.position.y = SIZE+3;
            this.velocity.y = 0;
        }

        // Checking if object is within game limits
        var n1 = wall_collission(this.position.x+3, this.position.y-3);
        if(n1 > -1 && this.velocity.x >0 && this.velocity.y >1){
            this.velocity.x = 0;
            this.position.x = game.walls[n1].x-SIZE;
        }

        var n2 = wall_collission(this.position.x-3, this.position.y-3);
        if(n2 > -1 && this.velocity.x < 0 && this.velocity.y >1){
            this.velocity.x = 0;
            this.position.x = game.walls[n2].x+SIZE;
        }

        var n = wall_collission(this.position.x, this.position.y+5);
        if (n > -1 && this.velocity.y > 0){
            // only check wall collition when falling
            this.velocity.y = 0;
            this.position.y = game.walls[n].y-SIZE;
        } else {
            this.force.set(0,0);
        }
    }

    draw(){
        // Simply drawing the enemy object
        if(this.active){
            fill(255,0,0);
            image(images[5], this.position.x, this.position.y, SIZE-3, SIZE-3);
        }
        // Reset acceleration
        this.acceleration.set(0, 0);
    }
}

class enemyWanderState{
    // The enemy wander state allows the enemy to move left and right
    constructor(){
        this.x = 0;
        this.dir = -1;
    }

    execute(me) {
        this.x += this.dir;
        if(this.x > 100 || this.x < 0){
            // Changing directions
            this.dir = -this.dir;
        }
        me.position.x+=this.dir/2;
        me.update();
        me.draw();
        if(dist(me.position.x, me.position.y, character.position.x, character.position.y) < 120){
            me.changeState(CHASING);
        }
    }
}

class instructionsState{
    // A state of the Game object in which instructions are presented to the player
    constructor(){
        // Initial values to moving elements
        this.x = 50;
        this.y = 100;
        this.active = true;
        this.width = SIZE;
        this.dir = -1;
        this.cloud_x = 0;
    }

    execute(me){
        // Drawing instructions
        background(70, 183, 235);
        noStroke();
        fill(255);
        this.cloud_x++;
        let y = 95;
        if(this.cloud_x>500){
            this.cloud_x = -100;
        }

        let x= this.cloud_x;
        circle(x,y,70);
        // Cloud
        circle(x+33,y+11,48);
        circle(x-43,y+10,50);
        rect(x-40, y+10, 70, 25);
        stroke(0);
        textSize(70);
        fill(252, 190, 3);
        text("POKENDO", 25, 75);
        fill(0);
        noStroke();
        textSize(22);
        var text_x = 160;
        var text_y = 150;
        text("Collect the coins", text_x, text_y-25);
        text("Avoid touching the", text_x-10, text_y+25);
        text("mushrooms from the side", text_x-35, text_y+50);
        text("Use Arrows or WASD", text_x-20, text_y+100);
        text("to move around and jump", text_x-37, text_y+125);
        // "Animating" elements
        if(this.dir == 1)
            text("Click anywhere to start", text_x-75, text_y+210);
        this.width += this.dir;
        if ((this.width > SIZE-1) || (this.width < 2)) {this.dir = -this.dir;}
        image(images[5], 50, this.y+70+this.width/3, 2*SIZE, 2*SIZE);
        var next = 0;
        if(this.dir == 1)
            next = 1;
        image(images[3+next], 50, this.y+140, 2*SIZE, 2*SIZE);
        image(images[0], this.x-this.width+SIZE, this.y, 2*this.width, 2*SIZE );
    }
}

function mouseClicked(event) {
    // Check if user clicked on screen to change game state
    if(game.currState == INSTRUCTIONS)
        game.changeState(PLAYING);
}

class playingState{
    // A state for the Game object in which all playing elements
    // are updated and drawed
    execute(me){
        image(images[2], 0, 0, 800,800);
        push();
        if(character.position.x>600 && character.position.x<800){
            translate(-400, 0);
        } else if (character.position.x>200) {
            translate(-character.position.x+200, 0);
        }
        game.drawGame();
        character.state[character.currState].execute(character);
        pop();
    }
}

class endGameState{
    // A state for the Game object in which the game is finished by either
    // losing or winning
    constructor(){
        this.x = 50;
        this.y = 100;
        this.active = true;
        this.width = SIZE;
        this.dir = -1;
        this.cloud_x = 0;
    }
    execute(me){
        // Similar to instructions. Draw required text/elements
        background(70, 183, 235);
        noStroke();
        fill(255);
        this.cloud_x++;
        let y = 95;
        if(this.cloud_x>500){
            this.cloud_x = -100;
        }
        // Moving cloud
        let x= this.cloud_x;
        circle(x,y,70);
        circle(x+33,y+11,48);
        circle(x-43,y+10,50);
        rect(x-40, y+10, 70, 25);
        stroke(0);
        textSize(70);
        fill(252, 190, 3);
        text("POKENDO", 25, 75);
        fill(0);
        noStroke();
        textSize(50);
        this.width += this.dir;
        if ((this.width > SIZE-1) || (this.width < 2)) {this.dir = -this.dir;}
        if(me.score == 20){
            // Player WON
            var next = 0;
            if(this.dir == 1)
                next = 1;
            image(images[3+next], 160, this.y+70, 4*SIZE, 4*SIZE);
            text("You Win!", 100, 340);
        } else {
            // Player LOST
            image(images[5], 160, this.y+70+this.width/3, 4*SIZE, 4*SIZE);
            text("Mushroom Wins!", 10, 340);
        }
    }
}

class enemyChaseState{
    // An enemy state in which the main character is chased
    execute(me) {
        me.update();
        me.draw();
        if(dist(me.position.x, me.position.y, character.position.x,
                character.position.y) >= 120)
            // character out of sight
            me.changeState(WANDER);
        if(me.position.x > character.position.x)
            me.position.x--;
        if(me.position.x < character.position.x)
            me.position.x++;
        if(character.position.y < me.position.y &&
            character.velocity.y == 0 && me.velocity.y ==0)
            me.changeState(JUMPING);
    }
}

class characterObj{
    // The main character object
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.position = new p5.Vector(this.i*SIZE, this.j*SIZE);
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0);
        this.force = new p5.Vector(0, 0);
        this.currState = WANDER;
        this.state = [new wanderState(), new jumpState()];
        this.facing = FACING_LEFT;
    }

    changeState(new_state) {
        // Change states
        if(new_state != character.state){
            this.currState = new_state;
        }
    }

    applyForce(force) {
        // Adding forces such as gravity/jump
        this.acceleration.add(force);
    }

    update() {
        // Apply existing forces
        this.applyForce(this.force);
        this.applyForce(gravity);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        // Contain character inside of screen limits
        if(this.position.x < 0)
            this.position.x = 0;
        if(this.position.x > 800-SIZE)
            this.position.x = 800-SIZE;
        if(this.position.y < SIZE){
            this.position.y = SIZE+3;
            this.velocity.y = 0;
        }
        // Check for wall collission
        var n1 = wall_collission(this.position.x+3, this.position.y-3);
        if(n1 > -1 && this.velocity.x >0 && this.velocity.y >1){
            this.velocity.x = 0;
            this.position.x = game.walls[n1].x-SIZE;
        }

        var n2 = wall_collission(this.position.x-3, this.position.y-3);
        if(n2 > -1 && this.velocity.x < 0 && this.velocity.y >1){
            this.velocity.x = 0;
            this.position.x = game.walls[n2].x+SIZE;
        }

        var n = wall_collission(this.position.x, this.position.y+5);
        if (n > -1 && this.velocity.y > 0){
            // only check collition when falling
            this.velocity.y = 0;
            this.position.y = game.walls[n].y-SIZE;
            if(keyArray[LEFT_ARROW] == 1){
                keyArray[LEFT_ARROW] = 0;
                this.velocity.x = 0;
            }
            if(keyArray[RIGHT_ARROW] == 1){
                keyArray[RIGHT_ARROW] = 0;
                this.velocity.x = 0;
            }
        } else {
            this.force.set(0,0);
        }
        // Check if a coin was picked up
        coin_collission(this.position.x, this.position.y);
        if(this.velocity.y >0)
            // Check if collided with enemy while in air
            enemy_collission(this.position.x, this.position.y, true);
        // Check if collided with enemy
        enemy_collission(this.position.x, this.position.y, false);
    }

    draw(){
        // Drawing character and resetting acceleration
        fill(150);
        image(images[this.facing], this.position.x,
                this.position.y, SIZE, SIZE);
        this.acceleration.set(0, 0);
    }
}

function wall_collission(x, y){
    // Objects can call this function to check wall collission
    for(var i = 0; i < game.walls.length; i++){
        if(dist(game.walls[i].x, game.walls[i].y, x, y) < 20){
            return i;
        }
    }
    return -1;
}

function enemy_collission(x, y, falling){
    // The main character calls this function to see if in
    // contact with enemy
    for(var i = 0; i < game.enemies.length; i++){
        if(dist(game.enemies[i].position.x,
                game.enemies[i].position.y, x, y) < 20){
            if(game.enemies[i].active){
                if(falling){
                    // Character was falling
                    game.enemies[i].active = false;
                } else {
                    game.changeState(GAMEOVER);
                }

            }

        }
    }
    return -1;
}

function coin_collission(x, y){
    // Character checks for picked up coins
    for(var i = 0; i < game.coins.length; i++){
        if(dist(game.coins[i].x, game.coins[i].y, x, y) < 20){
            if(game.coins[i].active){
                // Only check if coin has not been
                // picked up already
                game.coins[i].active = false;
                game.score++;
                if(game.score == 20)
                    game.changeState(GAMEOVER);
            }

        }
    }
    return -1;
}

class wanderState{
    // Main wander state for the character
    execute(me) {
        me.update();
        me.draw();
    }
}

class jumpState{
    // For main character only
    // Jumping state adds a force and changes to wander state
    execute(me) {
        me.force.add(jumpForce);
        me.changeState(WANDER);
    }
}

class gameState {
    // This object contains the main values of the overall game
    constructor(){
        this.walls = []
        this.coins = []
        this.enemies = []
        this.initMap();
        this.score = 0;
        this.currState = INSTRUCTIONS;
        this.state=[new instructionsState(),
                    new playingState(),
                    new endGameState()];
    }

    changeState(new_state) {
        // State can be either instructions, playing, or game over
        if(new_state != character.state){
            this.currState = new_state;
        }
    }

    initMap(){
        // go over map and add proper objects
        for (var i = 0; i< world_map.length; i++) {
            for (var j =0; j < world_map[i].length; j++) {
                switch (world_map[i][j]) {
                    case 'w': this.walls.push(new wallObj(j, i));
                        break;
                    case 'c': this.coins.push(new coinObj(j, i));
                        break
                    case 'e': this.enemies.push(new enemyObj(j, i));
                        break;
                }
            }
        }
    }

    drawGame(){
        // Draw all walls
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        for (var i = 0; i < this.coins.length; i++) {
            this.coins[i].draw();
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].state[this.enemies[i].currState].execute(this.enemies[i]);
        }
    }
}

function keyReleased() {
    // Check for released keys to stop character while not in air
    character.force.set(0, 0);
    if ((keyCode === LEFT_ARROW || keyCode == 65) && character.velocity.y == 0) {
        character.velocity.x =0;
    }
    if (keyCode === LEFT_ARROW || keyCode == 65){
        keyArray[LEFT_ARROW] = 1;
    }
    if (keyCode === RIGHT_ARROW || keyCode == 68){
        keyArray[RIGHT_ARROW] = 1;
    }
    if (keyCode === RIGHT_ARROW && character.velocity.y == 0) {
        character.velocity.x =0;
    }
}

// Game variables
var game = new gameState();
var character = new characterObj(35,17);
var keyArray = [];
var gravity = new p5.Vector(0, 0.15);
var jumpForce = new p5.Vector(0, -5);
var walkForce = new p5.Vector(0.1, 0);
var backForce = new p5.Vector(-0.1, 0);
var images = [];

function keyPressed() {
    // Check what keys were pressed that control the main character
    if (keyCode === RIGHT_ARROW || keyCode == 68) {
        character.force.add(walkForce);
        character.facing = FACING_RIGHT;
    }
    else if (keyCode === LEFT_ARROW || keyCode == 65) {
        character.force.add(backForce);
        character.facing = FACING_LEFT;
    }
    else if (keyCode === UP_ARROW || keyCode == 87) {
        if(character.velocity.y == 0)
            character.changeState(JUMPING);
    }
}

function customcoin(){
    // Custom coin figure
    push();
    background(6, 79, 204, 0);
    fill(240, 236, 7);
    stroke(204, 174, 6);
    strokeWeight(20);
    circle(width/2, height/2-22, width-70);
    rect(125,125-22, 150, 150, 20);
    // Save coin to images
    images.push(get(0,0,width,height));
    pop();
}

function customwall(){
    // Custom coin figure
    push();
    background(6, 79, 204, 0);
    fill(34,139,34);
    rect(0,0, 400,100);

    fill(20,130,34);
    square(0,10, 30);
    square(150,10, 30);
    square(300,10, 30);

    fill(139,69,19);
    rect(0,100, 400,300);

    fill(120,60,19);
    square(50,120, 100);
    square(250,250, 100);
    // Save wall to images
    images.push(get(0,0,width,height));
    pop();
}

function custombackground(){
    // Custom coin figure
    push();
    background(70, 183, 235);
    fill(255);
    let x= 90;
    let y = 100;
    circle(x,y,70);
    //circle(x-30,y-6,35);
    circle(x+33,y+11,48);
    circle(x-43,y+10,50);
    rect(x-40, y+10, 70, 25);
    x= 300;
    y = 130;
    circle(x,y,70);
    //circle(x-30,y-6,35);
    circle(x+33,y+11,48);
    circle(x-43,y+10,50);
    rect(x-40, y+10, 70, 25);

    images.push(get(0,0,2*width,2*height));
    pop();
}

function customcharmander(){
    // Custom character figure
    push();
    
	createCanvas(400,400);
	
	
    background(6, 79, 204, 0);
    for (var i = 0; i< charmander.length; i++) {
        for (var j =0; j < charmander[i].length; j++) {
            switch (charmander[i][j]) {
                case 'b': fill(0);
                    break;
                case 'o': fill(240, 142, 5);
                    break
                case 'y': fill(235, 242, 15);
                    break;
                case 'r': fill(242, 15, 15);
                    break;
                case ' ': fill(255,255,255,0);
                    break;
                case 'w': fill(255);
                    break;
            }
            square(j*20,i*20,20);
        }
    }
    images.push(get(0,0,width,height));
    pop();
}

function customcharmander2(){
    // Custom character figure 2 (facing left)
    push();
    createCanvas(400,400);
	
    background(6, 79, 204, 0);
    for (var i = 0; i< charmander.length; i++) {
        for (var j =0; j < charmander[i].length; j++) {
            switch (charmander[i][j]) {
                case 'b': fill(0);
                    break;
                case 'o': fill(240, 142, 5);
                    break
                case 'y': fill(235, 242, 15);
                    break;
                case 'r': fill(242, 15, 15);
                    break;
                case ' ': fill(255,255,255,0);
                    break;
                case 'w': fill(255);
                    break;
            }
            square((19-j)*20,i*20,20);
        }
    }
    images.push(get(0,0,width,height));
    pop();
}

function custommushroom(){
    // Custom mushroom figure
    push();
	
	
	
    createCanvas(400,400);
    background(6, 79, 204,0);
    for (var i = 0; i< mushroom.length; i++) {
        for (var j =0; j < mushroom[i].length; j++) {
            switch (mushroom[i][j]) {
                case 'b': fill(0);
                    break;
                case 'r': fill(242, 15, 15);
                    break;
                case ' ': fill(255,255,255,0);
                    break;
                case 'w': fill(255);
                    break;
            }
            square(j*25,i*25,25);
        }
    }
    images.push(get(0,0,width,height));
    pop();
}


//Setup function: Creates the canvas, draws custom characters and intializes entities
function setup() 
{

     
  	

    
    createCanvas(400,400); 
	noStroke();
    customcoin();
    customwall();
    custombackground();
    customcharmander();
    customcharmander2();
    custommushroom(); 
	
	/* additional code added to the  game for hosting in website */
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

}


// added in the game to set them in website 
function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			


function draw() {
    stroke(0);
    game.state[game.currState].execute(game);

}
