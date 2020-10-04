var gun;

function setup() { 
      
    // Create canvas 
    createCanvas(1000, 400); 
      
    // Set the text size 
    textSize(20);  
} 
   
function draw() { 
      
    // Set background color 
    background(200); 
      
    // Create rectangle 
    rect(mouseX, height/2, 30, 30); 
      
    // Display position 
    text("Position of mouse relative to canvas is "
            + mouseX, 30, 40); 
} 