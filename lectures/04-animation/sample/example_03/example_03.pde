void setup() {
  size(400, 400);
  
  noStroke();
  background(0);
}

void draw() {
  fill( random(255), random(255), random(255));
  
  ellipse(random(width), random(height), 50, 50);
  //saveFrame("example-######.png");
}
