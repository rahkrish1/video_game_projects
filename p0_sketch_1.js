/*
Name: Ryan Landry
This program creates a logo with animation. 
The logo starts with a truck driving on a road with a mountain sunset background. 
Once the truck gets to the middle of the screen, a dog appears in the bed of the truck.
The truck then speeds away and leaves exhaust circles that float up to for the letters "Ry" 
which are the first 2 letters of my name.
*/

//Create variables
let sunset1,
    sunset2,
    grass,
    name,
    truck,
    nameXCoords,
    nameYCoords,
    startingNameXCoords,
    startingNameYCoord,
    dog;
var count, nameCircles;



function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			

function setup() 
{
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	 
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

    //createCanvas(600, 400);
    count = 0;

    // Define colors
    sunset1 = color(46, 91, 132);
    sunset2 = color(196, 56, 20);
    grass = color(0, 90, 0);
    babyBlue = color(137, 207, 240);

    //Define objects
    truck = new Truck(0, 250);
    dog = new Dog(-40, 260);

    //Set coordinates for circles for initials
    nameXCoords = [
        -26,
        -27,
        -26,
        -27,
        -26,
        -27,
        -18,
        -12,
        -8,
        -8,
        -12,
        -20,
        -18,
        -14,
        -10,
        -6,
        6,
        10,
        14,
        18,
        30,
        28,
        24,
        20,
        16,
        14,
        10,
        8,
        6,
    ];
    nameYCoords = [
        0,
        -8,
        -16,
        -24,
        -32,
        -40,
        -40,
        -38,
        -32,
        -24,
        -20,
        -20,
        -12,
        -8,
        -4,
        0,
        -12,
        -8,
        -4,
        0,
        -12,
        -8,
        -4,
        0,
        4,
        8,
        12,
        16,
        20,
    ];
    startingXCoords = [width / 2 - 30, width / 2, width / 2 + 30];
    startingYCoord = height - height / 3;
    nameCircles = [];

    //Create the circles for intials
    for (var i = 0; i < nameXCoords.length; i++) {
        nameCircles.push(
            new NameCircle(
                this.startingXCoords[i % 3],
                this.startingYCoord,
                nameXCoords[i] + width / 2,
                nameYCoords[i] + height / 3
            )
        );
    }
}

//This class represents the truck that drives across the screen
class Truck {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        noStroke();
        //Draw outer wheels
        fill(100);
        circle(this.x - 50, this.y + 20, 40);
        circle(this.x + 50, this.y + 20, 40);
        //Draw inner wheels and tailpipe
        fill(194, 197, 204);
        rect(this.x - 110, this.y + 15, 20, 5, 5);
        circle(this.x - 50, this.y + 20, 20);
        circle(this.x + 50, this.y + 20, 20);
        //Draw truck body
        fill(babyBlue);
        rect(this.x - 100, this.y - 10, 190, 30, 5);
        rect(this.x - 10, this.y - 40, 40, 35, 3);
        triangle(
            this.x + 29,
            this.y - 10,
            this.x + 29,
            this.y - 40,
            this.x + 50,
            this.y - 10
        );
        //Draw window
        fill(255);
        rect(this.x - 5, this.y - 35, 30, 20, 5, 5, 0, 0);
        triangle(
            this.x + 22,
            this.y - 15,
            this.x + 22,
            this.y - 35,
            this.x + 35,
            this.y - 15
        );
        rect(this.x - 5, this.y, 15, 5, 5);
    }

    //Move truck to the right
    drive(speed) {
        this.x += speed;
    }
}

//This class represents the circles that make up my name on the screen
class NameCircle {
    constructor(startingX, startingY, finalX, finalY) {
        this.x = startingX;
        this.y = startingY;
        this.finalX = finalX;
        this.finalY = finalY;
    }

    draw() {
        fill(175, 212, 219);
        noStroke();
        ellipse(this.x, this.y, 10, 10);
    }

    //Move the circle closer in the direction of it final coordinate
    //Uses random values for visual effect of "floating"
    float() {
        if (this.x - this.finalX > 1) {
            this.x -= random(1, 50);
        }
        if (this.finalX - this.x > 1) {
            this.x += random(1, 50);
        }
        if (this.y - this.finalY > 1) {
            this.y -= random(1, 50);
        }
        if (this.finalY - this.y > 1) {
            this.y += random(1, 50);
        }
    }
}

//This class represents the dog that appears in the back of the truck
class Dog {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        //Draw head
        ellipse(this.x, this.y, 30, 35);
        fill(0);
        //Draw eyes
        ellipse(this.x - 5, this.y - 5, 5, 8);
        ellipse(this.x + 5, this.y - 5, 5, 8);
        //Draw ears
        ellipse(this.x - 14, this.y - 3, 10, 20);
        ellipse(this.x + 14, this.y - 3, 10, 20);
        //Draw nose
        ellipse(this.x, this.y + 5, 6, 4);
        //Draw tongue
        fill(255, 0, 0);
        ellipse(this.x, this.y + 11, 5, 7);
        //Draw snout
        noFill();
        stroke(0);
        arc(this.x - 5, this.y + 5, 6, 6, 0, PI);
        arc(this.x + 5, this.y + 5, 6, 6, 0, PI);
    }

    //Move dog upwards
    popup() {
        this.y--;
    }

    //Move dog to the right
    drive(speed) {
        this.x += speed;
    }
}

//Creates the road for the truck to drive on
function drawRoad() {
    //Draw black part of road
    fill(0);
    rect(0, height - height / 4 - 30, width, 60);
    //Draw stripes on road
    fill(255);
    let count = 10;
    while (count < width) {
        rect(count, height - height / 4 - 2.5, 20, 10);
        count += 50;
    }
}

//Uses gradient to draw sunset background
function drawSunset() {
    //Draw gradient for sunset
    noFill();
    for (let i = 0; i <= height / 2; i++) {
        let inter = map(i, 0, height / 2, 0, 1);
        let c = lerpColor(sunset1, sunset2, inter);
        stroke(c);
        line(0, i, width, i);
    }
}

function draw() {
    // Background
    drawSunset();
    noStroke();
    //Draw mountains
    fill(0);
    triangle(20, height / 2, 100, height / 2, 60, height / 4);
    triangle(70, height / 2, 160, height / 2, 115, height / 3);
    triangle(
        width - 10,
        height / 2,
        width - 100,
        height / 2,
        width - 55,
        height / 4
    );
    triangle(
        width - 70,
        height / 2,
        width - 160,
        height / 2,
        width - 115,
        height / 3
    );
    //Draw grass
    fill(grass);
    rect(0, height - height / 2, width, height / 2);
    drawRoad();
    //Move dog and truck to middle of screen
    if (truck.x < width / 2 && count == 0) {
        truck.drive(2);
        dog.drive(2);
    } else {
        //Make dog pop up from truck
        if (dog.y > truck.y - 25) {
            dog.popup();
        }
        count++;
        dog.draw();
    }
    truck.draw();

    //Have truck and dog speed off after 3 seconds
    if (count > frameRate() * 3) {
        if (truck.x < width + 160) {
            truck.drive(5);
            dog.drive(5);
        }
        //Have circles appear and float to form name
        if (truck.x > width / 2 + 100) {
            for (var i = 0; i < nameCircles.length; i++) {
                if (count % 6 == 0 && count > frameRate() * 3.4) {
                    nameCircles[i].float();
                }
                nameCircles[i].draw();
            }
        }
    }
}
