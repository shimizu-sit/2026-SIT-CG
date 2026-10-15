float x = 0;

void setup() {
  size(300, 300);
}

void draw() {
  background(255);
  
  ellipse(x, 150, 50, 50);
  x += 1;
}
