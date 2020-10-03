var mposx, mposy;
var curx, cury;
var direction;
var speed = 100; //follow speed of word, higher number is slower

function setup() { 
  createCanvas(500, 500);
  background(250);
  // Set text characteristics
  textFont("Arial");
  textSize(36);
    curx = 200; // starting positions of the text
    cury = 200;
} 

function draw() { 
    mposx = mouseX;//library function to find the co-ords of the mouse
    mposy = mouseY;
  direction = createVectorDirection(mposx, mposy, curx, cury);//find the vector between the cursor and current text position
  moveCurrent(curx, cury, mposx, mposy, direction, speed); // move the text in the direction of the cursor and apply a speed variable
  drawWords(curx, cury);//curx&cury are updated by moveCurrent then drawn to the canvas 
}

function drawWords(x, y) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  background(250);//have to redraw background so that we can remove old text draws, see what happens if you comment out this line
  fill(0);
  text("Lorem Ipsum", x, y);
}

function createVectorDirection(mx, my, cx, cy){
  var v;
  
  if(cx >= mx && cy>=my){
    v = createVector((cx-mx),(cy-my));
  }
  else if(cx >= mx && cy<my){
    v = createVector((cx-mx),(my-cy));
  }
  else if(cx<mx && cy>=my){
    v = createVector((mx-cx),(cy-my));
  }
  else if(cx<mx && cy<my){
    v = createVector((mx-cx),(my-cy));
  }
  return v;
}

function moveCurrent(cx, cy, mx, my, v, s){
   if(cx >= mx && cy>=my){
      curx = cx - (v.x *1/s);
      cury = cy - (v.y*1/s);
    }
    else if(cx >= mx && cy<my){
      curx = cx - (v.x *1/s);
      cury = cy + (v.y*1/s);
    }
    else if(cx<mx && cy>=my){
      curx = cx + (v.x*1/s);
      cury = cy - (v.y*1/s);
    }
    else if(cx<mx && cy<my){
      curx = cx + (v.x*1/s);
      cury = cy + (v.y*1/s);
   }
}