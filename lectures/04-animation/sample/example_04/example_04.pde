float x, y;
float ringSize;

void setup() {
  size(500, 500);
  
  noFill();
  smooth();
  
  stroke(255, 0, 0);
  
  x = random(50, width - 50);
  y = random(50, height - 50);
  
  ringSize = 1;
}

void draw() {
  background(255);
  
  ellipse(x, y, ringSize, ringSize);
  
  ringSize += 2;
  
  if(ringSize > 300) {
    x = random(width);
    y = random(height);
    
    ringSize = 1;
  }
  //saveFrame("ripples-####.png");
}
