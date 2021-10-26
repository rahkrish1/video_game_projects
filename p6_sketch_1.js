//Claire Woehr
//10/21/2021
//Project 6
//Draw seaweed
class seaweedObj
  {
    //Initialize Variables
    constructor(x, y, x1, color)
    {
      this.color = color;
      //Lighter color
      if(x1 == true)
        {
          this.x = x;
          this.x1 = x;
          this.y1 = y;
          this.cx1 = x+90;
          this.cy1 = y + 25;
          this.cx2 = x+20;
          this.cy2 = y+50;
          this.x2 = x + 30;
          this.y2 = y + 100;
          this.cx1Dir = 1;
          this.cx2Dir = -0.5;
          this.x2Dir = -1;
      
        }
      else //Darker color
        {
          this.x = x-60;
          this.x1 = x;
          this.y1 = y;
          this.cx1 = x - 50;
          this.cy1 = y + 25;
          this.cx2 = x;
          this.cy2 = y+50;
          this.x2 = x-20;
          this.y2 = y+100;
          this.cx1Dir = 0.5;
          this.cx2Dir = -0.5;
          this.x2Dir = -0.5;
      
        }
      
      
    }
    //Draw different seaweed with bezier
    draw()
    {
      if(this.color == true)
        {
          stroke(40, 166, 73);
        }
      else
        {
          stroke(39, 92, 52);
        }
      //Thick lines
      strokeWeight(15);
      noFill();
      bezier(this.x1, this.y1, this.cx1, this.cy1, this.cx2, this.cy2, this.x2, this.y2);

      if(this.color == true)
        {
          stroke(56, 255, 108);
        }
      else
        {
          stroke(67, 181, 95);
        }
      //skinny line
      strokeWeight(2);
      bezier(this.x1, this.y1, this.cx1, this.cy1, this.cx2, this.cy2, this.x2, this.y2);
      this.cx1 += this.cx1Dir;
      if ((this.cx1 > this.x2) || (this.cx1 < this.x1)) {this.cx1Dir = -this.cx1Dir;}
      this.cx2 += this.cx2Dir;
      if ((this.cx2 < this.x1) || (this.cx2 > this.x2)) {this.cx2Dir = -this.cx2Dir;}
      this.x1 += this.x2Dir;

      if ((abs(this.x1 - this.x2) > 200) || (this.x2+50 < this.x1) || (this.x1 < this.x)) {this.x2Dir = -this.x2Dir;}
    }
  }
//Draw rocks
class rockObj
  {
    //Initialize Variables
    constructor()
    {
      this.x = 370
      this.y = 360;
    }
    //Draw 3 rocks
    draw()
    {
      noStroke();
      
      //Big rock
      fill(138, 138, 138);
      ellipse(375,380, 90,60);
      ellipse(375,350, 70,50);
      ellipse(375,330, 40,30);

      //Small rock
      fill(117, 84, 84)
      ellipse(380,390, 50,35);

      //Medium rock
      fill(184, 163, 163);
      ellipse(350,390, 55,40);
      ellipse(350,370, 40,30);
      //fill('black');
      //circle(370,360,90);
      
    }
  }
//Initialize Variables
var dolphin = [];
var d2 = [];
var seahorse = [];
var s2 = [];
var fish1 = [];
var f12 = [];
var jelly = [];
var j2 = [];
var snail = [];
var sn2 = [];
var fish2 = [];
var f22 = [];

//Draw dolphin 
class dolphinObj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.mid_x = 200;
      this.mid_y = 185;
      this.x = 70;
      this.y = 30;
      this.name = "dolphin";
      this.bub = false;
    }
    //Assign dolphin points
    assign()
    {
      dolphin.push(new p5.Vector(245, 182));
      dolphin.push(new p5.Vector(262, 182));
      dolphin.push(new p5.Vector(272, 187));
      dolphin.push(new p5.Vector(264, 193));
      dolphin.push(new p5.Vector(246, 197));
      dolphin.push(new p5.Vector(224, 201));
      dolphin.push(new p5.Vector(209, 201));
      dolphin.push(new p5.Vector(197, 219));
      dolphin.push(new p5.Vector(184, 225));
      dolphin.push(new p5.Vector(191, 202));
      dolphin.push(new p5.Vector(168, 202));
      dolphin.push(new p5.Vector(154, 212));
      dolphin.push(new p5.Vector(139, 223));
      dolphin.push(new p5.Vector(143, 236));
      dolphin.push(new p5.Vector(133, 253));
      dolphin.push(new p5.Vector(127, 217));
      dolphin.push(new p5.Vector(110, 200));
      dolphin.push(new p5.Vector(127, 202));
      dolphin.push(new p5.Vector(135, 210));
      dolphin.push(new p5.Vector(152, 194));
      dolphin.push(new p5.Vector(168, 178));
      dolphin.push(new p5.Vector(188, 169));
      dolphin.push(new p5.Vector(209, 168));
      dolphin.push(new p5.Vector(199, 155));
      dolphin.push(new p5.Vector(211, 159));
      dolphin.push(new p5.Vector(224, 169));
      dolphin.push(new p5.Vector(235, 171));
      dolphin.push(new p5.Vector(250, 181));

    }
    //Draw dolphin and subdivide
    draw()
    {
      push();
      stroke(165, 209, 208);
      fill(165, 209, 208);
      translate(this.position.x, this.position.y);
      beginShape();
      for (var i = 0; i < dolphin.length; i++) {
        vertex(dolphin[i].x, dolphin[i].y);
      }
      vertex(dolphin[0].x, dolphin[0].y);
      endShape();

      if (iterations1 < 5) {
        subdivide(dolphin, d2);
        iterations1++;
      }
      //Draw face
      noStroke();
      fill('white');
      circle(230,180,10);
      
      fill('black');
      circle(230,182,7);
      
      fill('white');
      circle(229,180,2);
      
      noFill();
      stroke(1);
      arc(253, 170, 60, 40, 0+QUARTER_PI, QUARTER_PI+QUARTER_PI);
      
      pop();
    }
  }
//Draw seahorse
class seahorseObj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.mid_x = 98;
      this.mid_y = 340;
      this.x = 10;
      this.y = 35;
      this.name = "seahorse";
      this.bub = false;
    }
    //Assign seahorse points
    assign()
    {
      seahorse.push(new p5.Vector(109, 317 ));
      seahorse.push(new p5.Vector(113, 315 ));
      seahorse.push(new p5.Vector(113, 320 ));
      seahorse.push(new p5.Vector(108, 322 ));
      seahorse.push(new p5.Vector(103, 321 ));
      seahorse.push(new p5.Vector(99, 322 ));
      seahorse.push(new p5.Vector(99, 326 ));
      seahorse.push(new p5.Vector(102, 329 ));
      seahorse.push(new p5.Vector(105, 333 ));
      seahorse.push(new p5.Vector(107, 337 ));
      seahorse.push(new p5.Vector(108, 341 ));
      seahorse.push(new p5.Vector(107, 346 ));
      seahorse.push(new p5.Vector(104, 351 ));
      seahorse.push(new p5.Vector(100, 355 ));
      seahorse.push(new p5.Vector(95, 359 ));
      seahorse.push(new p5.Vector(95, 364 ));
      seahorse.push(new p5.Vector(99, 366 ));
      seahorse.push(new p5.Vector(104, 365 ));
      seahorse.push(new p5.Vector(105, 360 ));
      seahorse.push(new p5.Vector(108, 362 ));
      seahorse.push(new p5.Vector(108, 367 ));
      seahorse.push(new p5.Vector(102, 372 ));
      seahorse.push(new p5.Vector(95, 372 ));
      seahorse.push(new p5.Vector(90, 367 ));
      seahorse.push(new p5.Vector(87, 357 ));
      seahorse.push(new p5.Vector(88, 351 ));
      seahorse.push(new p5.Vector(83, 347 ));
      seahorse.push(new p5.Vector(87, 345 ));
      seahorse.push(new p5.Vector(83, 339 ));
      seahorse.push(new p5.Vector(90, 338 ));
      seahorse.push(new p5.Vector(85, 332 ));
      seahorse.push(new p5.Vector(91, 331 ));
      seahorse.push(new p5.Vector(89, 325 ));
      seahorse.push(new p5.Vector(89, 318 ));
      seahorse.push(new p5.Vector(93, 312 ));
      seahorse.push(new p5.Vector(97, 304 ));
      seahorse.push(new p5.Vector(99, 311 ));
      seahorse.push(new p5.Vector(102, 304 ));
      seahorse.push(new p5.Vector(105, 312 ));

    }
    //draw seahorse
    draw()
    {
      push();
      fill(255, 138, 157);
      stroke(255, 138, 157);
      //draw sea horse with subdivide
      translate(this.position.x, this.position.y);
      beginShape();
      for (var j = 0; j < seahorse.length; j++) {
        vertex(seahorse[j].x, seahorse[j].y);
      }
      vertex(seahorse[0].x, seahorse[0].y);
      endShape();

      if (iterations2 < 5) {
        subdivide(seahorse, s2);
        iterations2++;
      }
      //Draw face
      noStroke();
      fill('white');
      circle(102, 315,5);
      fill('black');
      circle(102, 315,4);
      fill('white');
      circle(101, 315,1);
      fill(209, 188, 31);
      circle(102, 305, 5);
      circle(97, 305, 5);
      circle(88, 333, 5);
      circle(85, 340, 5);
      circle(84, 347, 5);
      pop();
    }
  }
//Draw first fish
class fish1Obj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.mid_x = 325;
      this.mid_y = 85;
      this.x = 30;
      this.y = 25;
      this.name = "fish1";
      this.bub = false;
    }
    //Assign fish 1 points
    assign()
    {
      fish1.push(new p5.Vector(304, 83 ));
      fish1.push(new p5.Vector(299, 84 ));
      fish1.push(new p5.Vector(295, 86 ));
      fish1.push(new p5.Vector(296, 89 ));
      fish1.push(new p5.Vector(300, 89 ));
      fish1.push(new p5.Vector(305, 90 ));
      fish1.push(new p5.Vector(309, 93 ));
      fish1.push(new p5.Vector(314, 97 ));
      fish1.push(new p5.Vector(319, 100 ));
      fish1.push(new p5.Vector(324, 102 ));
      fish1.push(new p5.Vector(330, 103 ));
      fish1.push(new p5.Vector(338, 104 ));
      fish1.push(new p5.Vector(345, 105 ));
      fish1.push(new p5.Vector(353, 106 ));
      fish1.push(new p5.Vector(346, 101 ));
      fish1.push(new p5.Vector(343, 95 ));
      fish1.push(new p5.Vector(343, 90 ));
      fish1.push(new p5.Vector(347, 88 ));
      fish1.push(new p5.Vector(351, 91 ));
      fish1.push(new p5.Vector(351, 80 ));
      fish1.push(new p5.Vector(346, 82 ));
      fish1.push(new p5.Vector(342, 82 ));
      fish1.push(new p5.Vector(338, 79 ));
      fish1.push(new p5.Vector(339, 74 ));
      fish1.push(new p5.Vector(344, 72 ));
      fish1.push(new p5.Vector(350, 70 ));
      fish1.push(new p5.Vector(356, 69 ));
      fish1.push(new p5.Vector(362, 68 ));
      fish1.push(new p5.Vector(367, 68 ));
      fish1.push(new p5.Vector(361, 63 ));
      fish1.push(new p5.Vector(352, 61 ));
      fish1.push(new p5.Vector(343, 60 ));
      fish1.push(new p5.Vector(333, 60 ));
      fish1.push(new p5.Vector(325, 61 ));
      fish1.push(new p5.Vector(319, 63 ));
      fish1.push(new p5.Vector(313, 69 ));
      fish1.push(new p5.Vector(310, 74 ));

    }
    draw()
    {
      //draw fish 1 with subdivision
      push();
      fill(241, 245, 186);
      stroke(241, 245, 186);
      translate(this.position.x, this.position.y);
      beginShape();
      for (var k = 0; k < fish1.length; k++) {
        vertex(fish1[k].x, fish1[k].y);
      }
      vertex(fish1[0].x, fish1[0].y);
      endShape();

      if (iterations3 < 5) {
        subdivide(fish1, f12);
        iterations3++;
      }
      //draw face
      noStroke();
      fill('white');
      strokeWeight(1);
      circle(315, 80, 10);
      fill('black');
      circle(315, 82, 7);
      stroke(1);
      strokeWeight(5);
      line(325, 62, 325, 101);
      line(335, 61, 335, 103);
      line(345, 61, 345, 71);
      line(345, 100, 345, 104);
      line(355, 62, 355, 69);
      line(350, 82, 350, 88);
      
      fill('white');
      circle(315, 80, 2);
      noFill();
      stroke(1);
      strokeWeight(2);
      arc(295, 78, 30, 20, 0+QUARTER_PI, QUARTER_PI+QUARTER_PI);
      
      pop();
    }
  }
//Draw jellyfish
class jellyObj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.mid_x = 50;
      this.mid_y = 130;
      this.x = 15;
      this.y = 25;
      this.name = "jelly";
      this.bub = false;
    }
    //Assign jellyfish points
    assign()
    {
      jelly.push(new p5.Vector(32, 121 ));
      jelly.push(new p5.Vector(35, 113 ));
      jelly.push(new p5.Vector(40, 108 ));
      jelly.push(new p5.Vector(45, 106 ));
      jelly.push(new p5.Vector(51, 106 ));
      jelly.push(new p5.Vector(56, 106 ));
      jelly.push(new p5.Vector(60, 108 ));
      jelly.push(new p5.Vector(63, 112 ));
      jelly.push(new p5.Vector(66, 119 ));
      jelly.push(new p5.Vector(59, 120 ));
      jelly.push(new p5.Vector(58, 124 ));
      jelly.push(new p5.Vector(59, 127 ));
      jelly.push(new p5.Vector(60, 131 ));
      jelly.push(new p5.Vector(60, 135 ));
      jelly.push(new p5.Vector(59, 139 ));
      jelly.push(new p5.Vector(59, 144 ));
      jelly.push(new p5.Vector(56, 142 ));
      jelly.push(new p5.Vector(55, 139 ));
      jelly.push(new p5.Vector(56, 134 ));
      jelly.push(new p5.Vector(56, 130 ));
      jelly.push(new p5.Vector(55, 126 ));
      jelly.push(new p5.Vector(55, 121 ));
      jelly.push(new p5.Vector(51, 122 ));
      jelly.push(new p5.Vector(52, 127 ));
      jelly.push(new p5.Vector(53, 131 ));
      jelly.push(new p5.Vector(53, 134 ));
      jelly.push(new p5.Vector(52, 138 ));
      jelly.push(new p5.Vector(52, 142 ));
      jelly.push(new p5.Vector(53, 145 ));
      jelly.push(new p5.Vector(53, 149 ));
      jelly.push(new p5.Vector(51, 152 ));
      jelly.push(new p5.Vector(49, 149 ));
      jelly.push(new p5.Vector(49, 145 ));
      jelly.push(new p5.Vector(48, 141 ));
      jelly.push(new p5.Vector(48, 137 ));
      jelly.push(new p5.Vector(49, 133 ));
      jelly.push(new p5.Vector(48, 128 ));
      jelly.push(new p5.Vector(47, 124 ));
      jelly.push(new p5.Vector(43, 123 ));
      jelly.push(new p5.Vector(44, 127 ));
      jelly.push(new p5.Vector(44, 131 ));
      jelly.push(new p5.Vector(44, 136 ));
      jelly.push(new p5.Vector(44, 140 ));
      jelly.push(new p5.Vector(44, 144 ));
      jelly.push(new p5.Vector(43, 147 ));
      jelly.push(new p5.Vector(40, 143 ));
      jelly.push(new p5.Vector(41, 138 ));
      jelly.push(new p5.Vector(41, 134 ));
      jelly.push(new p5.Vector(40, 131 ));
      jelly.push(new p5.Vector(40, 127 ));
      jelly.push(new p5.Vector(39, 123 ));

    }
    draw()
    {
      //Draw jelly fish
      push();
      fill(175, 112, 230);
      stroke(175, 112, 230);
      translate(this.position.x, this.position.y);
      beginShape();
      for (var l = 0; l < jelly.length; l++) {
        vertex(jelly[l].x, jelly[l].y);
      }
      vertex(jelly[0].x, jelly[0].y);
      endShape();

      if (iterations4 < 5) {
        subdivide(jelly, j2);
        iterations4++;
      }
      //Draw face
      noStroke();
      fill('white')
      circle(45, 115, 10);
      circle(54, 114, 10);
      
      fill('black')
      circle(45, 115, 5);
      circle(54, 114, 5);
      fill('white')
      circle(44, 114, 2);
      circle(53, 113, 2);
      pop();
    }
  }
//Draw snail
class snailObj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.dir = true;
    }
    //Assign snail points
    assign()
    {
      snail.push(new p5.Vector(245, 395 ));
      snail.push(new p5.Vector(233, 396 ));
      snail.push(new p5.Vector(221, 395 ));
      snail.push(new p5.Vector(210, 392 ));
      snail.push(new p5.Vector(204, 385 ));
      snail.push(new p5.Vector(204, 380 ));
      snail.push(new p5.Vector(208, 377 ));
      snail.push(new p5.Vector(212, 378 ));
      snail.push(new p5.Vector(210, 370 ));
      snail.push(new p5.Vector(207, 365 ));
      snail.push(new p5.Vector(210, 365 ));
      snail.push(new p5.Vector(213, 372 ));
      snail.push(new p5.Vector(215, 376 ));
      snail.push(new p5.Vector(217, 379 ));
      snail.push(new p5.Vector(220, 382 ));
      snail.push(new p5.Vector(224, 382 ));
      snail.push(new p5.Vector(223, 376 ));
      snail.push(new p5.Vector(223, 371 ));
      snail.push(new p5.Vector(228, 365 ));
      snail.push(new p5.Vector(234, 362 ));
      snail.push(new p5.Vector(240, 361 ));
      snail.push(new p5.Vector(247, 362 ));
      snail.push(new p5.Vector(251, 365 ));
      snail.push(new p5.Vector(254, 370 ));
      snail.push(new p5.Vector(255, 373 ));
      snail.push(new p5.Vector(257, 377 ));
      snail.push(new p5.Vector(257, 383 ));
      snail.push(new p5.Vector(254, 388 ));
      snail.push(new p5.Vector(258, 390 ));
      snail.push(new p5.Vector(262, 391 ));
      snail.push(new p5.Vector(255, 393 )); 
    }
    draw()
    {
      //Draw snail with subdivision
      push();
      fill(168, 143, 125);
      stroke(168, 143, 125);
      translate(this.position.x, this.position.y);
      beginShape();
      for (var m = 0; m < snail.length; m++) {
        vertex(snail[m].x, snail[m].y);
      }
      vertex(snail[0].x, snail[0].y);
      endShape();

      if (iterations5 < 5) {
        subdivide(snail, sn2);
        iterations5++;
      }
      //Draw face
      noStroke();
      fill(245, 116, 81);
      circle(240, 375, 23);
      fill(218, 204, 255);
      circle(240, 375, 18);
      fill(128, 173, 173);
      circle(240, 375, 12);
      fill(185, 237, 194);
      circle(240, 375, 7);
      pop();
    }
    //Allow movement
    update()
    {
      //Move back and forth on sea ground
      if(this.position.x > -200 && this.dir == true)
        {
          this.position.x-=0.2;
        }
      else
        {
          this.dir = false;
          if(this.position.x < 30)
            {
              this.position.x+=0.2;
            }
          else
            {
              this.dir = true;
            }
        }
      
    }
  }
//Draw 2nd fish
class fish2Obj
  {
    //Initialize Variables
    constructor(x,y) {
      this.position = new p5.Vector(x, y);
      this.state = [new wanderState()];
      this.currState = 0;
      this.mid_x = 300;
      this.mid_y = 268;
      this.x = 35;
      this.y = 18;
      this.name = "fish2";
      this.bub = false;
    }
    //Assign fish 2 points
    assign()
    {
      fish2.push(new p5.Vector(335, 257 ));
      fish2.push(new p5.Vector(335, 276 ));
      fish2.push(new p5.Vector(323, 267 ));
      fish2.push(new p5.Vector(316, 275 ));
      fish2.push(new p5.Vector(308, 281 ));
      fish2.push(new p5.Vector(297, 282 ));
      fish2.push(new p5.Vector(286, 282 ));
      fish2.push(new p5.Vector(280, 280 ));
      fish2.push(new p5.Vector(274, 275 ));
      fish2.push(new p5.Vector(269, 269 ));
      fish2.push(new p5.Vector(273, 263 ));
      fish2.push(new p5.Vector(280, 258 ));
      fish2.push(new p5.Vector(286, 255 ));
      fish2.push(new p5.Vector(294, 253 ));
      fish2.push(new p5.Vector(302, 253 ));
      fish2.push(new p5.Vector(309, 253 ));
      fish2.push(new p5.Vector(315, 256 ));
      fish2.push(new p5.Vector(320, 260 ));
      fish2.push(new p5.Vector(335, 251 ));

    }
    draw()
    {
      //draw fish 2 with subdivision
      push();
      fill(163, 196, 159);
      stroke(163, 196, 159);
      translate(this.position.x, this.position.y);
      beginShape();
      for (var n = 0; n < fish2.length; n++) {
        vertex(fish2[n].x, fish2[n].y);
      }
      vertex(fish2[0].x, fish2[0].y);
      endShape();

      if (iterations5 < 5) {
        subdivide(fish2, f22);
        iterations5++;
      }
      //Draw face
      noStroke();
      fill('white');
      circle(280, 267, 10);
      fill('black');
      circle(280, 269, 7);
      fill('white');
      circle(279, 267, 2);
      fill(207, 209, 59);
      circle(290, 260, 10);
      circle(290, 275, 10);
      circle(300, 267, 5);
      circle(300, 258, 7);
      circle(305, 275, 12);
      circle(315, 270, 7);
      circle(310, 260, 10);
      pop();
    }
  }
//Animals wander around ocean
class wanderState {
  //Initialize Variables
  constructor() {
    this.angle = 0;
    this.wanderDist = 0;
    this.step = new p5.Vector(0,0);
  }
  
  //Set up new coordinates for animals
  execute(me,x,y) {
    if (this.wanderDist <= 0) {
        this.wanderDist = random(50, 80);
        this.angle = random(0, 360);
        this.step.set(cos(this.angle), sin(this.angle));
    }
    this.wanderDist--;
    //me.position.add(this.step);
    //print(me.mid_x+me.position.x);
    //Hits rocks
    if(dist(me.mid_x+me.position.x+me.x, me.mid_y+me.position.y, rocks.x, rocks.y) < 50)
      {
        this.step.set(-1,-1);
        me.position.add(this.step);
        me.bub = true;
        //b = true;
      }
    else if(dist(me.mid_x+me.position.x, me.mid_y+me.position.y+me.y, rocks.x, rocks.y) < 50)
      {
        this.step.set(-1,-1);
        me.position.add(this.step);  
        me.bub = true;
        //b = true;
      }
    else //does not hit rocks
      {
        me.bub = false;
        //Hits walls
        if(me.mid_x+me.position.x - me.x < 1)
          {
            //print("1");
            this.step.set(0.5,0);
            me.position.add(this.step);
          }
        if(me.mid_x+me.position.x + me.x > 399)
          {
            //print("2");
            this.step.set(-0.5,0);
            me.position.add(this.step);
          }
        if(me.mid_y+me.position.y - me.y < 40)
          {
            //print("3");
            this.step.set(0,0.5);
            me.position.add(this.step);
          }
        if(me.mid_y+me.position.y + me.y > 399)
          {
            //print("4");
            this.step.set(0,-0.5);
            me.position.add(this.step);
          }
        //Does not hit walls
        if(me.mid_x - me.x > 1 && me.mid_x + me.x < 399 && me.mid_y + me.x < 399 && me.mid_y - me.y > 1)
          {
            //this.wanderDist--;
            me.position.add(this.step);
          }
      }
  }
}  // wanderState

//Draw bubbles
class bubbleObj
{
  //Initialize Variables
  constructor()
  {
    this.particles = [];
    this.count = 0;
    this.time = 0;
  }
  //Draw bubbles
  draw()
  {
    //Frame count
    if(this.count == 0)
      {
        this.count = 1;
        this.time = frameCount+200;
      }
    if (b == true) { //Animal hits rock
        //Assigns particles
        for(var j = 0; j < 50; j++)
          {
            this.particles.push(new particleObj(random(350, 400), 350));
            this.particles.push(new particleObj(random(350, 400), 350));
          }
    }
    //Draw bubbles
    for (var i=0; i<this.particles.length; i++) {
      if ((this.particles[i].timeLeft > 0) && (this.particles[i].position.y < 400))           {
      
        if((this.particles[i].position.y > 50))
        {
          this.particles[i].draw();
          this.particles[i].move();
        }
        else if(b != false && this.time < frameCount) {
            particles.splice(i, 1);
            this.count = 0;
            this.time = 0;
        }
        
      }

  }

      
    }
}
//Split points up for subdivision
var splitPoints = function(animal, a2) {
    a2.splice(0, a2.length);
    for (var i = 0; i < animal.length - 1; i++) {
        a2.push(new p5.Vector(animal[i].x, animal[i].y));
        a2.push(new p5.Vector((animal[i].x + animal[i+1].x)/2, (animal[i].y +
animal[i+1].y)/2));
    }
    a2.push(new p5.Vector(animal[i].x, animal[i].y));
    a2.push(new p5.Vector((animal[0].x + animal[i].x)/2, (animal[0].y +
animal[i].y)/2));
};

//Average of the points for subdivision
var average = function(animal, a2) {
    for (var i = 0; i < a2.length - 1; i++) {
        var x = (a2[i].x + a2[i+1].x)/2;
        var y = (a2[i].y + a2[i+1].y)/2;
        a2[i].set(x, y);
    }
    var x = (a2[i].x + animal[0].x)/2;
    var y = (a2[i].y + animal[0].y)/2;
    animal.splice(0, animal.length);
    for (i = 0; i < a2.length; i++) {
        animal.push(new p5.Vector(a2[i].x, a2[i].y));
    }
};

var subdivide = function(animal, a2) {
    splitPoints(animal, a2);
    average(animal, a2);
};
//Initialize Variables
var dolphinAnimal;
var seahorseAnimal;
var fish1Animal;
var jellyAnimal;
var snailAnimal;
var fish2Animal;
var iterations1 = 0;
var iterations2 = 0;
var iterations3 = 0;
var iterations4 = 0;
var iterations5 = 0;
var iterations6 = 0;
var seaweed = [];
var wander = [];
var rocks;
var bubbles;
var bubbleCount = 0;
var b = false;
let xspacing = 16; 
let w; 
let theta = 0.0;
let amplitude = 15.0;
let period = 500.0; 
let dx; 
let yvalues; 
//Create waves
function calcWave() {
  theta += 0.05;
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = (sin(x) * amplitude)-140;
    x += dx;
  }
}
//Make waves
function renderWave() {
  noStroke();
  fill(82, 170, 199);
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 50, 50);
  }
}
//Randomize
var monteCarlo = function() {
    var v1 = random(220, 255);
    var v2 = random(220, 255);
    while (v2 > v1) {
        v1 = random(220, 255);
        v2 = random(220, 255);
    }
    return(v1);
};
//Initialize particales
var particleObj = function(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(random(-0.3, 0), random(-0.5, -3));
    this.size = random(5, 10);
    this.position.y -= (18 - this.size);
    this.c1 = monteCarlo();
    this.timeLeft = 255;
};

var particles = [];
//particles move
particleObj.prototype.move = function() {
    this.position.add(this.velocity);
    this.timeLeft--;
};
//Particles are drawn
particleObj.prototype.draw = function() {
    noStroke();
    fill(this.c1, this.c1, this.c1, this.timeLeft);
    ellipse(this.position.x, this.position.y, this.size, this.size*2);
};
var counter = 0;

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
  //createCanvas(400, 400);
  //seaweed
  seaweed[0] = new seaweedObj(-20,300, true, true);
  seaweed[1] = new seaweedObj(45,300, false , true);
  seaweed[2] = new seaweedObj(10,300, true, false);
  seaweed[3] = new seaweedObj(70,300, false, false);
  seaweed[4] = new seaweedObj(70,300, true, true);
  seaweed[5] = new seaweedObj(120,300, false , true);
  seaweed[6] = new seaweedObj(100,300, true, false);
  seaweed[7] = new seaweedObj(145,300, false, false);
  seaweed[8] = new seaweedObj(200,300, true , true);
  seaweed[9] = new seaweedObj(220,300, false, true);
  seaweed[10] = new seaweedObj(230,300, true, false);
  seaweed[11] = new seaweedObj(245,300, false, true);
  seaweed[12] = new seaweedObj(290,300, true , false);
  seaweed[13] = new seaweedObj(270,300, false, false);
  seaweed[14] = new seaweedObj(320,300, false, true);
  seaweed[15] = new seaweedObj(320,300, true , false);
  seaweed[16] = new seaweedObj(370,300, false, true);
  seaweed[17] = new seaweedObj(420,300, false, true);
  //animals
  dolphinAnimal = new dolphinObj();
  seahorseAnimal = new seahorseObj();
  fish1Animal = new fish1Obj();
  jellyAnimal = new jellyObj();
  snailAnimal = new snailObj();
  fish2Animal = new fish2Obj();
  bubbles = new bubbleObj();
  dolphinAnimal.assign();
  seahorseAnimal.assign();
  fish1Animal.assign();
  jellyAnimal.assign();
  snailAnimal.assign();
  fish2Animal.assign();
  rocks = new rockObj();
  
  //Wave initializations
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  
  
  	/* additional code added to the  game for hosting in website */
	let sketchGameWidth = document.getElementById("game-container").offsetWidth;
	let sketchGameHeight = document.getElementById("game-container").offsetHeight;
    
	
	
	let renderer = createCanvas(sketchGameWidth, sketchGameHeight);
	renderer.parent("game-container"); 

  
}


//draw all elements
function draw() {
  background(198, 245, 239);
  //Draw boat
  fill(71, 42, 47);
  arc(100,5, 150,150, 0, PI);
  rect(50, 0, 15,10);
  fill('black');
  stroke(1);
  line(150, 5, 175, 0);
  line(190,0, 190, 50);
  fill(199, 196, 159);
  noStroke();
  rect(100,5, 5, 30);
  arc(102, 30, 18, 30, 0, PI);
  //draw wave
  calcWave();
  renderWave();
  stroke(82, 170, 199);
  
  fill(82, 170, 199);
  rect(0,40, 400,360);
  

  //Draw seaweed
  for(var a = 0; a < seaweed.length; a++)
    {
      seaweed[a].draw();
    }
  fill(207, 204, 174);
  noStroke();
  rect(0, 380, 400, 20);
  fill(255,255,255);
  
  //Draw bubbles
  bubbles.draw();

  //Draw rocks
  rocks.draw();
  
  //Draw and move animals
  dolphinAnimal.draw();
  //print(dolphin[0].x+dolphinAnimal.position.x);
  dolphinAnimal.state[dolphinAnimal.currState].execute(dolphinAnimal);
  seahorseAnimal.draw();
  seahorseAnimal.state[seahorseAnimal.currState].execute(seahorseAnimal);
  fish1Animal.draw();
  fish1Animal.state[fish1Animal.currState].execute(fish1Animal);
  jellyAnimal.draw();
  jellyAnimal.state[jellyAnimal.currState].execute(jellyAnimal);
  snailAnimal.draw();
  snailAnimal.update();
  fish2Animal.draw();
  fish2Animal.state[fish2Animal.currState].execute(fish2Animal);
  
  //Collision detection
  if(dolphinAnimal.bub == false && seahorseAnimal.bub == false && fish1Animal.bub == false && jellyAnimal.bub == false && fish2Animal.bub == false)
    {
      b = false;
    }
  else
    {
      b = true;
    }
}