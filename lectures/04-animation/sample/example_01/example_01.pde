float x = 0;

void setup() {
  size(400, 300);
}

void draw() {
  background(255);
  
  ellipse(x, 150, 100, 100);
  
  x += 1;
}
