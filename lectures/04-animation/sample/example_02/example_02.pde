float x, y;
float xSpeed;

void setup() {
  size(600, 480);
  
  noStroke();
  fill(0, 0, 255);
  
  x = random(width);
  y = height/2;
  
  xSpeed = random(-10, 10);
}

void draw() {
  background(255);
  
  ellipse(x, y, 40, 40);
  
  x += xSpeed;
  
  if(x > width) {
    x = 0;
  }
  
  if(x < 0) {
    x = width;
  }
}
  
