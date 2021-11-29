/*************************************************************
 * Nathan Moeliono
 * ECE 4525
 * Hw 10 - 3D Coffe Table
 * 11/19/2021
 * 
 * A 3D Coffee table created using the wireframe model which can
 * be rotated by clicking and dragging the mouse. 
 ************************************************************/

// define global prisms array
let prisms = [];

// definte prism face flags
const allFaces = [true, true, true, true, true, true];
const allButTop = [true, true, false, true, true, true];

// added in the game to set them in website 
function windowResized() 
{
  let sketchGameWidth = document.getElementById("game-container").offsetWidth;
  let sketchGameHeight = document.getElementById("game-container").offsetHeight;
  resizeCanvas(sketchGameWidth, sketchGameHeight);
}			



// setup the game variables
function setup() {
  noStroke();
  
  /* additional code added to the  game for hosting in website */
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
	
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 
	
	
  //createCanvas(400, 400);
  angleMode(DEGREES);

  // define prism color arrays
  const legColors1 = [color("#ffbaba"), color("#ff7b7b"), color("#ff5252"), color("#ff0000"), color("#a70000"), color("red")];
  const legColors2 = [color("#FD5602"), color("#FE6E00"), color("#FF8303"), color("#FEDEBE"), color("#FFAF42"), color("orange")];
  const legColors3 = [color("#149414"), color("#0e6b0e"), color("#649568"), color("#9ccc9c"), color("#2b5329"), color("green")];
  const legColors4 = [color("#45b6fe"), color("#3792cb"), color("#296d98"), color("#1c4966"), color("#0e2433"), color("blue")];
  const topColors = [color("#c38452"), color("#e3c099"), color("#6b3e2e"), color("#a1785c"), color("#ccb494"), color("#795644")];

  // draw legs
  pushLeg(110, 50, 70, legColors1, prisms);
  pushLeg(-100, 50, -50, legColors2, prisms);
  pushLeg(-100, 50, 70, legColors3, prisms);
  pushLeg(110, 50, -50, legColors4, prisms);

  // add table top prisms
  pushTop(0, -20, 0, topColors, prisms);

  // add table bottom connector prisms
  prisms.push(new Prism(5, 50, 10, 180, 10, 90, allFaces, topColors));

  // add vase prism
  prisms.push(new Prism(-10, -50, 10, 30, 30, 30, allFaces, legColors4));
  // add stem prism
  prisms.push(new Prism(-10, -80, 10, 5, 30, 5, allFaces, legColors3));;
  // add flower head prism
  prisms.push(new Prism(-10, -100, 10, 10, 10, 10, allFaces, legColors2));;
  // add flower petals prisms
  prisms.push(new Prism(-10, -100, 2.5, 5, 5, 5, allFaces, legColors1));;
  prisms.push(new Prism(-10, -100, 17.5, 5, 5, 5, allFaces, legColors1));;
  prisms.push(new Prism(-2.5, -100, 10, 5, 5, 5, allFaces, legColors1));;
  prisms.push(new Prism(-17.5, -100, 10, 5, 5, 5, allFaces, legColors1));;
  prisms.push(new Prism(-10, -107.5, 10, 5, 5, 5, allFaces, legColors1));;
}

// draw the game sceen
function draw() {
    background(200);

    // define and populate faces array
    let faces = [];
    prisms.forEach(prism => {
      prism.faces.forEach(face => faces.push(face));
    });

    // sort the faces by decreasing Z-index
    faces.sort((a, b) => {
      return distanceFromCamera(b) - distanceFromCamera(a);
    });
    
    push();
    translate(200, 200);
    // Draw faces
    for (var f=0; f<faces.length; f++) {
        var face = faces[f];
        // get the normal vector using the cross product
        var vec1 = createVector(face[1][0] - face[0][0], face[1][1] - face[0][1], face[1][2] - face[0][2]);
        var vec2 = createVector(face[2][0] - face[1][0], face[2][1] - face[1][1], face[2][2] - face[1][2]);
        var normal = vec1.cross(vec2);
        // if the face is facing the camera, draw the face
        if (normal.z < 0) {
            // set the color to the color of the face
            fill(face[4]);
            beginShape();
            vertex(face[0][0], face[0][1]);
            vertex(face[1][0], face[1][1]);
            vertex(face[2][0], face[2][1]);
            vertex(face[3][0], face[3][1]);
            endShape();
        }
    }
    pop();
};

// event handler for mouse dragged. Rotate the game field accordingly
function mouseDragged() {;
    prisms.forEach(prism => {
      prism.rotateY3D(mouseX - pmouseX);
      prism.rotateX3D(mouseY - pmouseY);
    });
};


// helper function that returns the distance a face is away from
// the camera, calculated using the average Z-coordinate
function distanceFromCamera(f) {
  let averageZ = (f[0][2] + f[1][2] + f[2][2] + f[3][2]);

  return averageZ;
}

// helper function to add all leg prisms
function pushLeg(x, y, z, colors, ps) {
  ps.push(new Prism(x, y-40, z, 30, 30, 30, allButTop, colors));
  ps.push(new Prism(x, y-20, z, 30, 32, 30, allButTop, colors));
  ps.push(new Prism(x, y, z, 30, 32, 30, allButTop, colors));
  ps.push(new Prism(x, y+20, z, 30, 32, 30, allButTop, colors));
  ps.push(new Prism(x, y+40, z, 30, 30, 30, allButTop, colors));
}

// helper function to add all table top prisms
function pushTop(x, y, z, colors, ps) {

  // define x and z coorinates for each sub-prism
  const xs = [-100, -70, -40, -10, 20, 50, 80, 110];
  const zs = [-50, -20, 10, 40, 70];

  // definte black color array
  blackColors = [color(0), color('#191919'), color('#333333'), color('#4d4d4d'), color('#666666'), color('#999999')];

  // for each prism, color them alternating colors
  let num = 0;
  xs.forEach(X =>{
    zs.forEach(Z => {
      
      if (num % 2 == 0) {
        ps.push(new Prism(x + X, y, z + Z, 30, 30, 30, allFaces, colors));

      }
      else {
        ps.push(new Prism(x + X, y, z + Z, 30, 30, 30, allFaces, blackColors));
      }

      num++;

    });
  });
}

// Prism class that defines a prism object
class Prism {

    constructor(x, y, z, w, h, l, faces, faceColors=[color('#006ee6'), color('#003d80'), color('#0055b3'), color('#006ee6'), color('#003d80'), color('#0055b3')]) { 
        // define colors
        this.backgroundColour = 'red';
        this.nodeColour = 'orange';
        this.edgeColour = 'blue';
        this.nodeSize = 8;
        this.faceColours = [color('#006ee6'), color('#003d80'), color('#0055b3')];
        
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.l = l;
        // h = up
        // w = left to right
        // l = out of screen

        // set the nodes
        this.node0 = [this.x - (this.w / 2), this.y - (this.h / 2), this.z - (this.l / 2)]; // w h l
        this.node1 = [this.x - (this.w / 2), this.y - (this.h / 2), this.z + (this.l / 2)]; // w h l
        this.node2 = [this.x - (this.w / 2), this.y + (this.h / 2), this.z - (this.l / 2)]; // w h l
        this.node3 = [this.x - (this.w / 2), this.y + (this.h / 2), this.z + (this.l / 2)]; // w h l
        this.node4 = [this.x + (this.w / 2), this.y - (this.h / 2), this.z - (this.l / 2)];
        this.node5 = [this.x + (this.w / 2), this.y - (this.h / 2), this.z + (this.l / 2)];
        this.node6 = [this.x + (this.w / 2), this.y + (this.h / 2), this.z - (this.l / 2)];
        this.node7 = [this.x + (this.w / 2), this.y + (this.h / 2), this.z + (this.l / 2)];
        this.nodes = [this.node0, this.node1, this.node2, this.node3, this.node4, this.node5, this.node6, this.node7];
    
        // set the edges
        this.edge0  = [0, 1];
        this.edge1  = [1, 3];
        this.edge2  = [3, 2];
        this.edge3  = [2, 0];
        this.edge4  = [4, 5];
        this.edge5  = [5, 7];
        this.edge6  = [7, 6];
        this.edge7  = [6, 4];
        this.edge8  = [0, 4];
        this.edge9  = [1, 5];
        this.edge10 = [2, 6];
        this.edge11 = [3, 7];
        this.edges = [this.edge0, this.edge1, this.edge2, this.edge3, this.edge4, this.edge5, this.edge6, this.edge7, this.edge8, this.edge9, this.edge10, this.edge11];
    
        // set the faces
        this.face0 = [this.node0, this.node1, this.node3, this.node2, faceColors[0]]; // left
        this.face1 = [this.node6, this.node7, this.node5, this.node4, faceColors[1]]; // right
        this.face2 = [this.node4, this.node5, this.node1, this.node0, faceColors[2]]; // top
        this.face3 = [this.node7, this.node6, this.node2, this.node3, faceColors[3]]; // bot
        this.face4 = [this.node5, this.node7, this.node3, this.node1, faceColors[4]]; // back
        this.face5 = [this.node0, this.node2, this.node6, this.node4, faceColors[5]]; // front
        
        // add the faces given the face flag array
        this.faces = [];
        if (faces[0]) {
            this.faces.push(this.face0);
        }
        if (faces[1]) {
            this.faces.push(this.face1);
        }
        if (faces[2]) {
            this.faces.push(this.face2);
        }
        if (faces[3]) {
            this.faces.push(this.face3);
        }
        if (faces[4]) {
            this.faces.push(this.face4);
        }
        if (faces[5]) {
            this.faces.push(this.face5);
        }

        this.rotateZ3D(0); // rotate clockwise
        this.rotateY3D(0); // rotate left
        this.rotateX3D(0); // rotate up
    }
   

    // Rotate shape around the z-axis
    rotateZ3D(theta) {
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);

        for (var n=0; n<this.nodes.length; n++) {
            var node = this.nodes[n];
            var x = node[0];
            var y = node[1];
            node[0] = x * cosTheta - y * sinTheta;
            node[1] = y * cosTheta + x * sinTheta;
        }
    }

    // Rotate shape around the y-axis
    rotateY3D(theta) {
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);

        for (var n=0; n<this.nodes.length; n++) {
            var node = this.nodes[n];
            var x = node[0];
            var z = node[2];
            node[0] = x * cosTheta - z * sinTheta;
            node[2] = z * cosTheta + x * sinTheta;
        }
    }

    // Rotate shape around the x-axis
    rotateX3D(theta) {
        var sinTheta = sin(theta);
        var cosTheta = cos(theta);

        for (var n=0; n<this.nodes.length; n++) {
            var node = this.nodes[n];
            var y = node[1];
            var z = node[2];
            node[1] = y * cosTheta - z * sinTheta;
            node[2] = z * cosTheta + y * sinTheta;
        }
    }
}
