'use strict';

let prevscript;
let p5_mainscript;
let p5_soundscript;
var sketchFileName; 
var project_id_loc = {
'id': [
	'logo1', 
	'logo2',
	'logo3',
	'p1_game1',
	'p1_game2',
	'p1_game3',
	'p2_game1',
	'p2_game2',
	'p2_game3',
	'p2_game4',
	'p3_game1',
	'p4_game1',
	'p4_game2',
	'p4_game3',
	'p4_game4',
	'p5_game1',
	'p5_game2',
	'p5_game3'
	
	
	
	
	],
'loc':[
	'p0_sketch_1.js', 
	'p0_sketch_2.js',
	'p0_sketch_3.js',
	'p1_sketch_1.js',
	'p1_sketch_2.js',
	'p1_sketch_3.js',
	'p2_sketch_1.js',
	'p2_sketch_2.js',
	'p2_sketch_3.js',
	'p2_game_4.js',
	'p3_sketch_1.js',
	'p4_sketch_1.js',
	'p4_sketch_2.js',
	'p4_sketch_3.js',
	'p4_sketch_4.js',
	'p5_sketch_1.js',
	'p5_sketch_2.js',
	'p5_sketch_3.js'
	
	
],
'description':['Empty'] 
};

document.addEventListener('DOMContentLoaded', init);

function init()
{
	for (let i = 0; i < project_id_loc['id'].length; i++)
	{
		let project_id = project_id_loc['id'][i];
		  console.log(project_id);
		document.getElementById(project_id).addEventListener('click', function () {
			display_game(i)		   
		});
	}
	sketchFileName = localStorage.getItem('sketch');  
	if (sketchFileName == undefined) {
		//sketchFileName = 'Project_0/logo1/sketch.js';
	}
	
    console.log(sketchFileName);
   
	console.log('loading file :', sketchFileName);
	loadjscssfile(sketchFileName, "js") //dynamically load and add this .js file
}

function display_game(id) {
	console.log(id);
	localStorage.setItem('sketch', project_id_loc['loc'][id] );
	window.location.reload();	
}

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("body")[0].appendChild(fileref)
}




