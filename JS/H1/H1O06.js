var scope;
var gamescreen;

function preload() {
    scope = loadImage("scope.png")
    gamescreen= loadImage("images/backgrounds/ddd.png");
}

function setup() { 
  
    createCanvas(1920, 1080); 
} 
   
function draw() { 
    background(gamescreen); 
    image(scope,mouseX-250,mouseY-250,500,500);


} 
