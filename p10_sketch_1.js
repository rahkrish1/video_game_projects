/**
 * Main.js
 *
 * Author : Bug Lee
 * Last modified : 11/18/21
 *
 * This module contains constant values used for 
 * 3d coffee table program.
 */

 "use strict";

 // set up
 const CANVAS_WIDTH = 400;
 const CANVAS_HEIGHT = 400;
 const BIG_TEXT_SIZE = 40;
 
 // Button
 const Z_NORM = 0;
 const Z_POS = 1;
 const DEFAULT_TEXT_SIZE = 20;
 const BUTTON_DEFAULT_COLOR = [200, 200, 200];
 const RED = 0;
 const GREEN = 1;
 const BLUE = 2;
 
 // cuboid 
 const WIDTH = 5;
 const HEIGHT = 10;
 const DEPTH = 5;
 const DEFAULT_COLOR = [255, 255, 255];
 const RIGHT = 0;
 const LEFT = 1;
 const FRONT = 2;
 const BACK = 3;
 const TOP = 4;
 const BOTTOM = 5;
 
 // state
 const MAIN = 0;
 const OPTION = 1;
 
 /**
  * SimpleObj.js
  * Author: Bug Lee
  * Last modified: 11/4/21
  *
  * This module contains data structure for SimpleObj,
  * which provide a baseline for many objects used in game.
  */
 
 "use strict";
 
 /**
  * SimpleObj have following properties:
  * 1. initialziation of coordiante, object size, and type
  * 2. box collision
  * 3. render
  * 4. set image
  * 5. spawn dust (spawn effect)
  */
 var SimpleObj = {
     /**
      * Initialize the object
      * @param x: x coordinate
      * @param y: y coordiante
      * @param width: width of the object
      * @param height: height of the object
      * @type: type of the object, such as wall, ground, etc...
      */
     init: function(x, y, width, height, type) {
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
         this.type = type;
     },
     
     /**
      * Set the image data that would represent the object.
      * @param img : array of images.
      */
     setImg: function(imgs) {
         this.imgs = imgs;
     },
 
     /**
      * Check box collision between this object and things on the game.
      * This give flexibility for the things that are not objects.
      *
      * @param x: x coordinate of the things.
      * @param y: y corrdinate of the things.
      * @param width: width of the things.
      * @param height: hieght of the things.
      */
     collision: function(x, y, width, height) {
         if (this.x + this.width > x && this.x < x + width &&
             this.y + this.height > y && this.y < y + height) {
             return true;
         }
         return false;
     },
 
     /**
      * Render the image base on its type.
      *
      * @param offset: camera offset.
      */
     render: function(offset) {
     }
 };
 
 
 /**
  * Actor.js
  * Author: Bug Lee
  * Last modified: 11/18/21
  *
  * This module contains data structures for MouseObj and ButtonObj.
  */
 
 
 "use strict";
 
 
 /**
  * This object track mouse click.
  */
 var MouseObj = {
     x: -1,
     y: -1 
 }
 
 /**
  * ButtonObj have additional properties added on
  * compare to the SimpleObj.
  * 1, 2, 3. same as SimpleObj
  * 4. contain text
  * 5. change state of the game when it get clicked
  * 6. change light setting 
  * 7. change color setting
  */
 var ButtonObj = Object.create(SimpleObj);
 ButtonObj.color = BUTTON_DEFAULT_COLOR;
 /**
  * Set text display for the button.
  * @param text: text that will display on top of button.
  */
 ButtonObj.text = function(text) {
     this.text = text;
 }
 /**
  * Record mouse poistion when clicked.
  */
 ButtonObj.clicked = function() {
     MouseObj.x = mouseX;
     MouseObj.y = mouseY;
 };
 /**
  * Change state of the game when user click the button.
  *
  * @param nextState : suceeding state after click.
  */
 ButtonObj.clickEvent = function(nextState) {
     if (this.collision(MouseObj.x, MouseObj.y, 0, 0)) {
         state = nextState;
         MouseObj.x = -1;
         MouseObj.y = -1;
     }
 }
 /**
  * Change light setting. User can choose from:
  * 1. Z-normal (brightness of surface is base on its z-normal vector)
  * 2. Z-position (brightness of surface is base on its z-position)
  *
  * @param curr_setting : current light setting
  * @param new_setting : new light setting that would overwrite current setting  
  */
 ButtonObj.changeLighting = function(curr_setting, new_setting) {
     if (this.collision(MouseObj.x, MouseObj.y, 0, 0)) {
         MouseObj.x = -1;
         MouseObj.y = -1;
         return new_setting;
     }
     return curr_setting;
 }
 /**
  * Change color setting. User can select and combine colors.
  *
  * @param curr_setting : current color setting
  * @param new_setting : color constants (Red = 0, Green = 1, Blue = 2)
  */
 ButtonObj.changeColor = function(curr_setting, color) {
     if (this.collision(MouseObj.x, MouseObj.y, 0, 0)) {
         MouseObj.x = -1;
         MouseObj.y = -1;
 
         if (color == RED) {
             if (curr_setting[0] == 0) {
                 curr_setting[0] = 255;
             }
             else {
                 curr_setting[0] = 0;
             }
             changeShapesColor(shapes, curr_setting);
         }
         else if (color == GREEN) {
             if (curr_setting[1] == 0) {
                 curr_setting[1] = 255;
             }
             else {
                 curr_setting[1] = 0;
             }
             changeShapesColor(shapes, curr_setting);
         }
         else {
             if (curr_setting[2] == 0) {
                 curr_setting[2] = 255;
             }
             else {
                 curr_setting[2] = 0;
             }
             changeShapesColor(shapes, curr_setting);
         }
     }
 }
 /**
  * Indicate that button is active.
  */
 ButtonObj.turnOn = function(color) {
     this.color = color;
 }
 /**
  * Indicate that button is inactive.
  */
 ButtonObj.turnOff = function() {
     this.color = BUTTON_DEFAULT_COLOR;
 }
 
 /**
  * Render button.
  */
 ButtonObj.render = function() {
     push();
     fill(this.color);
     rect(this.x, this.y, this.width, this.height);
     fill(0);
     textSize(DEFAULT_TEXT_SIZE);
     textAlign(CENTER, CENTER);
     text(this.text, this.x + this.width / 2, this.y + this.height / 2);
     pop();
 };
 
 /**
  * Cuboid.js
  *
  * Author : Bug Lee
  * Last modified : 11/18/21
  *
  * This module contains data structure and functions to build
  * a cuboid, and more importantly creating shape.
  * Part of the code was adapted from the provided code (multi_shape.js) in lecture.
  */
 
 
 "use strict";
 
 /**
  * Each Cuboid contains:
  * 1. 8 nodes
  * 2. 12 edges
  * 3. 6 faces
  * 4. 6 normal vector
  * 5. color
  */
 var Cuboid = {
     init: function(x, y, z, w, h, d, color) {
         this.nodes = [[x,   y,   z  ],
                      [x,   y,   z+d],
                      [x,   y+h, z  ],
                      [x,   y+h, z+d],
                      [x+w, y,   z  ],
                      [x+w, y,   z+d],
                      [x+w, y+h, z  ],
                      [x+w, y+h, z+d]];
 
         this.edges = [[0, 1], [1, 3], [3, 2], [2, 0],
                      [4, 5], [5, 7], [7, 6], [6, 4],
                      [0, 4], [1, 5], [2, 6], [3, 7]];
 
         this.faces = [[0, 1, 3, 2],     // left
                      [4, 5, 7, 6],      // right 
                      [0, 2, 6, 4],      // back
                      [1, 3, 7, 5],      // front
                      [0, 1, 5, 4],      // bottom
                      [2, 3, 7, 6]];     // top
 
         let x0 = w/2 + x; // center x
         let y0 = h/2 + y; // center y
         let z0 = d/2 + z; // center z
         this.nVectors = [[[x, y0, z0], [-w+x, y0, z0]],     // left
                         [[w+x, y0, z0], [2*w+x, y0, z0]],   // right
                         [[x0, y0, z], [x0, y0, -d+z]],   // back
                         [[x0, y0, d+z], [x0, y0, 2*d+z]],    // front
                         [[x0, y, z0], [x0, -h+y, z0]],   // bottom
                         [[x0, h+y, z0], [x0, 2*h+y, z0]]];   // top
 
         this.color = color;
     }
     
 };
 
 /**
  * Create shape by joining multiple cuboids into group.
  *
  * @param x : x position 
  * @param y : y position
  * @param z : z position
  * @param w : width of the shape
  * @param h : height of the shape
  * @param d : depth of the shape
  * @param color : color of the shape
  */
 function createShape(x, y, z, w, h, d, color = DEFAULT_COLOR) {
     let shapes = [];
     w /= WIDTH;
     h /= HEIGHT;
     d /= DEPTH;
 
     for (let i = 0; i < w; i++) {
         for (let j = 0; j < h; j++) {
             for (let k = 0; k < d; k++) {
                 let cuboid = Object.create(Cuboid);
                 cuboid.init(x + i * WIDTH, 
                             y + j * HEIGHT, 
                             z + k * DEPTH, 
                             WIDTH, HEIGHT, DEPTH, color);
 
                 if (i == 0 || i == w -1 || j == 0 || j == h - 1 || k == 0 || k == d - 1) {
                     shapes.push(cuboid);
                 }
             }
         }
     }
 
     return shapes;
 }
 
 /**
  * Change color of the given shapes
  *
  * @param shapes : array that contains many shapes (cuboid)
  * @param color : new color for the shapes
  */
 function changeShapesColor(shapes, color) {
     for (let i = 0; i < shapes.length; i++) {
         if (i < 1024) {
             shapes[i].color = color.map( function(x) { return x / 2 });
         }
         else {
             shapes[i].color = color;
         }
     }
 }
 
 /**
  * Rotate3D.js
  *
  * Author : Bug Lee
  * Last modified : 11/18/21
  *
  * This module contains functions for rotating shapes.
  * Part of the code was adapted from the provided code (multi_shape.js) in
  * lecture.
  */
 
 "use strict";
 
 
 /**
  * Rotate shape around the z-axis
  *
  * @param theta : rotating angle in degrees
  * @param shape : shape to be rotated
  */
 var rotateZ3D = function(theta, shape) {
     let nodes = shape.nodes;
     let nVectors = shape.nVectors;
 
     var sinTheta = sin(theta);
     var cosTheta = cos(theta);
 
     // rotate nodes
     for (var n = 0; n < nodes.length; n++) {
         let node = nodes[n];
         let x = node[0];
         let y = node[1];
         node[0] = x * cosTheta - y * sinTheta;
         node[1] = y * cosTheta + x * sinTheta;
     }
 
     // rotate normal vectors of surfaces
     for (var n = 0; n < nVectors.length; n++) {
         let nVector = nVectors[n];
 
         let x0 = nVector[0][0];
         let x1 = nVector[1][0];
 
         let y0 = nVector[0][1];
         let y1 = nVector[1][1];
 
         nVector[0][0] = x0 * cosTheta - y0 * sinTheta;
         nVector[0][1] = y0 * cosTheta + x0 * sinTheta;
 
         nVector[1][0] = x1 * cosTheta - y1 * sinTheta;
         nVector[1][1] = y1 * cosTheta + x1 * sinTheta;
     }
 
 };
 
 /**
  * Rotate shape around the y-axis
  *
  * @param theta : rotating angle in degrees
  * @param shape : shape to be rotated
  */
 var rotateY3D = function(theta, shape) {
     let nodes = shape.nodes;
     let nVectors = shape.nVectors;
 
     var sinTheta = sin(theta);
     var cosTheta = cos(theta);
 
     // rotate nodes
     for (var n = 0; n < nodes.length; n++) {
         let node = nodes[n];
         let x = node[0];
         let z = node[2];
         node[0] = x * cosTheta - z * sinTheta;
         node[2] = z * cosTheta + x * sinTheta;
     }
 
     // rotate normal vectors of surfaces
     for (var n = 0; n < nVectors.length; n++) {
         let nVector = nVectors[n];
 
         let x0 = nVector[0][0];
         let x1 = nVector[1][0];
 
         let z0 = nVector[0][2];
         let z1 = nVector[1][2];
 
         nVector[0][0] = x0 * cosTheta - z0 * sinTheta;
         nVector[0][2] = z0 * cosTheta + x0 * sinTheta;
 
         nVector[1][0] = x1 * cosTheta - z1 * sinTheta;
         nVector[1][2] = z1 * cosTheta + x1 * sinTheta;
     }
 
 };
 
 /**
  * Rotate shape around the x-axis
  *
  * @param theta : rotating angle in degrees
  * @param shape : shape to be rotated
  */
 var rotateX3D = function(theta, shape) {
     let nodes = shape.nodes;
     let nVectors = shape.nVectors;
 
     var sinTheta = sin(theta);
     var cosTheta = cos(theta);
 
     // rotate nodes
     for (var n = 0; n < nodes.length; n++) {
         let node = nodes[n];
         let y = node[1];
         let z = node[2];
         node[1] = y * cosTheta - z * sinTheta;
         node[2] = z * cosTheta + y * sinTheta;
     }
 
     // rotate normal vectors of surfaces
     for (var n = 0; n < nVectors.length; n++) {
         let nVector = nVectors[n];
 
         let y0 = nVector[0][1];
         let y1 = nVector[1][1];
 
         let z0 = nVector[0][2];
         let z1 = nVector[1][2];
 
         nVector[0][1] = y0 * cosTheta - z0 * sinTheta;
         nVector[0][2] = z0 * cosTheta + y0 * sinTheta;
 
         nVector[1][1] = y1 * cosTheta - z1 * sinTheta;
         nVector[1][2] = z1 * cosTheta + y1 * sinTheta;
     }
 
 };
 
 /**
  * Draw3D.js
  *
  * Author : Bug Lee
  * Last modified : 11/19/21
  *
  * This module contains functions for drawing 3D shapes.
  * This was adapted from the provided code (mutli_shape.js) from the lecture.
  */
 
 "use strict";
 
 /**
  * Draw all edges from the given shapes.
  *
  * @param shapes : array containing many shapes (cuboid) 
  */
 function draw_edges(shapes) {
     push();
     translate(200, 200);
     // Draw edges
     stroke(edgeColour);
 
     for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
         let nodes = shapes[shapeNum].nodes;
         let edges = shapes[shapeNum].edges;
 
         for (var e = 0; e < edges.length; e++) {
             var n0 = edges[e][0];
             var n1 = edges[e][1];
             var node0 = nodes[n0];
             var node1 = nodes[n1];
             line(node0[0], node0[1], node1[0], node1[1]);
         }
     }
     pop();
 }
 
 /**
  * Draw all nodes from the given shapes.
  *
  * @param shapes : array containing many shapes (cuboid) 
  */
 function draw_nodes(shapes) {
     push();
     translate(200, 200);
 
     // Draw nodes
     fill(nodeColour);
     noStroke();
     for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
         let nodes = shapes[shapeNum].nodes;
 
         for (var n = 0; n < nodes.length; n++) {
             var node = nodes[n];
             ellipse(node[0], node[1], nodeSize, nodeSize);
         }
     }
     pop();
 }
 
 /**
  * Draw surface of the given shapes.
  *
  * @param shapes : array containing many shapes (cuboid).
  */
 function draw_faces(shapes) {
     push();
     translate(200, 200);
     noStroke();
 
     // helper data structure for determining depth of the surface
     var depth = {
         init: function(shapeNum, faceNum, z) {
             this.shapeNum = shapeNum; // record of which shape the face belong to
             this.faceNum = faceNum; // record of which side of the face from the shape
             this.z = z; // depth of the face
         }
     };
 
     let drawOrder = []; 
 
     for (let shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
         let faces = shapes[shapeNum].faces;
         let nVectors = shapes[shapeNum].nVectors;
 
         for (let f = 0; f < faces.length; f++) {
             
             let z = nVectors[f][0][2] - nVectors[f][1][2];
             // ignore surface that are not visible
             if (z < 0) {
                 continue;
             }
             
             let faceDepth = Object.create(depth);
             faceDepth.init(shapeNum, f, nVectors[f][0][2]);
             drawOrder.push(faceDepth);
         }
     }
 
     // sort the normal vectors from furthest to nearest
     drawOrder.sort(sortBy('z'));
 
     // draw faces in order (furthest first, nearest last)
     for (let i = 0; i < drawOrder.length; i++) {
         let shapeNum = drawOrder[i].shapeNum;
         let f = drawOrder[i].faceNum;
         let nodes = shapes[shapeNum].nodes;
         let faces = shapes[shapeNum].faces;
         let nVectors = shapes[shapeNum].nVectors;
 
 
         // set up surface color base on the light and color setting
         let lighting = shapes[shapeNum].color.map( function(shade) { 
             if (light_setting == Z_NORM) {
                 let x = nVectors[f][0][0] - nVectors[f][1][0];
                 let y = nVectors[f][0][1] - nVectors[f][1][1];
                 let z = nVectors[f][0][2] - nVectors[f][1][2];
                 let magnitude = sqrt(x*x + y*y + z*z);
 
                 return shade * z / magnitude;
             }
             return shade * abs(nVectors[f][0][2] - 120) / 240;
         });
         fill(lighting);
        
         // draw surface
         beginShape();
         for (let node of faces[f]) {
             vertex(nodes[node][0], nodes[node][1]);
         }
         endShape();
     }
 
     pop();
 }
 
 /**
  * Draw normal vector of all surface in given shapes.
  *
  * @param shapes : array containing many shapes (cuboid) 
  */
 function draw_normalVec(shapes) {
     push();
     translate(200, 200);
 
     stroke(255, 0, 0);
     // Draw normal vectors
     for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
         let nVectors = shapes[shapeNum].nVectors;
 
         for (var v = 0; v < nVectors.length; v++) {
             var node0 = nVectors[v][0];
             var node1 = nVectors[v][1];
             line(node0[0], node0[1], node1[0], node1[1]);
         }
     }
     pop();
 }
 
 /**
  * Custom comparator for sort.
  * compare the object base on specified key.
  */
 function sortBy(key) {
     return function(a, b) {
         if (a[key] > b[key]) {
             return -1;
         }
         else if (a[key] < b[key]) {
             return 1;
         }
         return 0;
     };
 }
 
 /**
  * OptionScreen.js
  * Author: Bug Lee
  * Last modified: 11/18/21
  *
  * This module contains OptionScreen data structure.
  * How to play screen include:
  * 1. Option title
  * 2. Panel for light setting.
  * 2. Panel for color setting.
  * 3. Back/close button.
  */
 
 "use strict";
 
 
 function OptionScreen() {
     var backButton = Object.create(ButtonObj);
     var lightButton1 = Object.create(ButtonObj);
     var lightButton2 = Object.create(ButtonObj);
     var redButton = Object.create(ButtonObj);
     var greenButton = Object.create(ButtonObj);
     var blueButton = Object.create(ButtonObj);
     var title = "Options";
     var rendered = false;
 
     backButton.init(150, 300, 100, 50, undefined);
     backButton.text("Close");
    
     // light setting buttons
     lightButton1.init(50, 100, 100, 50, undefined);
     lightButton1.text("z-normal");
 
     lightButton2.init(50, 160, 100, 50, undefined);
     lightButton2.text("z-position");
 
     // color setting buttons
     redButton.init(250, 100, 100, 50, undefined);
     redButton.text("Red");
 
     greenButton.init(250, 160, 100, 50, undefined);
     greenButton.text("Green");
 
     blueButton.init(250, 220, 100, 50, undefined);
     blueButton.text("Blue");
 
     /**
      * handle mouse click from user.
      */
     function handleInput() {
         canvas.mouseClicked(ButtonObj.clicked);
     }
     
     /**
      * User can adjust display of coffee table by
      * tweeking light setting or color setting.
      * Also, user can go back to Main menu by clicking the close button.
      */
     function update() {
         backButton.clickEvent(MAIN);
 
         // light setting
         light_setting = lightButton1.changeLighting(light_setting, Z_NORM);
         light_setting = lightButton2.changeLighting(light_setting, Z_POS);
 
         if (light_setting == Z_NORM) {
             lightButton1.turnOn([255,255,0]);
             lightButton2.turnOff();
         }
         else {
             lightButton1.turnOff();
             lightButton2.turnOn([255,255,0]);
         }
 
         // color setting
         redButton.changeColor(color_setting, RED);
         greenButton.changeColor(color_setting, GREEN);
         blueButton.changeColor(color_setting, BLUE);
         
         redButton.turnOff();
         greenButton.turnOff();
         blueButton.turnOff();
         if (color_setting[0] == 255) {
             redButton.turnOn([255,0,0]);
         }
         if (color_setting[1] == 255) {
             greenButton.turnOn([0,255,0]);
         }
         if (color_setting[2] == 255) {
             blueButton.turnOn([0,0,255]);
         }
     }
 
     /**
      * Render option screen.
      */
     function render() {
         // buttons
         backButton.render();
         lightButton1.render();
         lightButton2.render();
         redButton.render();
         greenButton.render();
         blueButton.render();
 
         if (!optionScreen.rendered) {
             optionScreen.rendered = true;
         }
         else {
             return;
         }
         
         // background
         fill(0, 220);
         rect(0, 0, CANVAS_WIDTH, 50);
         fill(0, 180);
         rect(0, 50, CANVAS_WIDTH, 350);
 
         // Title
         push();
         fill(255);
         textAlign(CENTER);
         textSize(BIG_TEXT_SIZE);
         textStyle(BOLD);
         text(title, CANVAS_WIDTH / 2, 40);
         pop();
 
         push();
         // option menu 
         fill(255);
         textAlign(LEFT, TOP);
         textSize(DEFAULT_TEXT_SIZE);
         textWrap(WORD);
         text("Light setting:", 50, 70, 300);
         text("Color setting:", 250, 70, 300);
         pop();
 
     }
 
     var publicAPI = {
         handleInput: handleInput,
         update: update,
         render: render,
         rendered: rendered
     }
 
     return publicAPI;
 }
 
 /**
  * Main.js
  *
  * Author : Bug Lee
  * Last modified : 11/18/21
  *
  * This program construct a 3D coffee table that user can interact with.
  * User can rotate the coffee table by dragging the mouse.
  * Representation of the table can be changed by adjusting setting.
  * First, color of the table can be changed by selecting/combining RGB values. 
  * Second, surface light setting can be choosed between z-normal and
  * z-position.
  */
 
 "use strict";
 
 
 var canvas;
 var backgroundColour, nodeColour, edgeColour;
 var nodeSize = 8;
 var shapes = [];
 var optionButton;
 var state = MAIN;
 var optionScreen = OptionScreen();
 var light_setting = Z_NORM;
 var color_setting = DEFAULT_COLOR;
 
 
 function setup() {
     canvas = createCanvas(400, 400);
     frameRate(30);
     angleMode(DEGREES);
     backgroundColour = color(255, 255, 255);
     //nodeColour = color(40, 168, 107);
     //edgeColour = color(34, 68, 204);
     
     optionButton = Object.create(ButtonObj);
     optionButton.init(290, 20, 90, 30, undefined);
     optionButton.text("Options");
    
     // table top
     // darker color for checker pattern
     let newColor = color_setting.map( function(x) { return x / 2 }); 
     let top1 = createShape(-160, -80, -80, 80, 10, 80, newColor);
     let top2 = createShape(-160, -80, 0, 80, 10, 80);
     let top3 = createShape(-80, -80, -80, 80, 10, 80);
     let top4 = createShape(-80, -80, 0, 80, 10, 80, newColor);
     let top5 = createShape(0, -80, -80, 80, 10, 80, newColor);
     let top6 = createShape(0, -80, 0, 80, 10, 80);
     let top7 = createShape(80, -80, -80, 80, 10, 80);
     let top8 = createShape(80, -80, 0, 80, 10, 80, newColor);
     let tableTop = new Array().concat(top1, top4, top5, top8, top2, top3, top6, top7);
 
     // talbe top/legs supports 
     let support1 = createShape(-145, -70, -70, 5, 20, 140);
     let support2 = createShape(140, -70, -70, 5, 20, 140);
     let support3 = createShape(-130, -70, -75, 260, 20, 5);
     let support4 = createShape(-130, -70, 70, 260, 20, 5);
     let supports = new Array().concat(support1, support2, support3, support4);
 
     // legs 
     let leg1 = createShape(-150, -70, -80, 20, 150, 10); 
     let leg2 = createShape(-150, -70, 70, 20, 150, 10); 
     let leg3 = createShape(130, -70, -80, 20, 150, 10); 
     let leg4 = createShape(130, -70, 70, 20, 150, 10); 
     let legs = new Array().concat(leg1, leg2, leg3, leg4);
 
     // under board/foot rest
     let underBoard = createShape(-130, 60, -70, 260, 10, 140);
     
     // assemble coffee table
     shapes = shapes.concat(tableTop, supports, legs, underBoard);
    
     // initial rotation
     for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
         rotateY3D(30, shapes[shapeNum]);
         rotateX3D(30, shapes[shapeNum]);
     }
 }
 
 /**
  * Render coffee table or option screen depend on the current state.
  */
 var draw = function() {
     // main screen
     if (state == MAIN) {
         canvas.mouseClicked(ButtonObj.clicked);
         optionButton.clickEvent(OPTION);
 
         background(backgroundColour);
         draw_faces(shapes);
         optionButton.render();
         optionScreen.rendered = false;
     }
     // option screen
     else {
         optionScreen.handleInput();
         optionScreen.update();
         optionScreen.render();
     }
 };
 
 /**
  * Rotate shapes on the screen
  */
 function mouseDragged() {
     var dx = mouseX - pmouseX;
     var dy = mouseY - pmouseY;
 
     if (state == MAIN) {
         for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
             rotateY3D(dx, shapes[shapeNum]);
             rotateX3D(dy, shapes[shapeNum]);
         }
     }
 }
 
 
 
 