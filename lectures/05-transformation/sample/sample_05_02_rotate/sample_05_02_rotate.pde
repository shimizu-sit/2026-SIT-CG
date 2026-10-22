void setup() {
  size(600, 400);
  rectMode(CENTER);
}

void draw() {
  background(245);

  translate(width / 2, height / 2);
  rotate(radians(30));

  fill(80, 160, 220);
  rect(0, 0, 180, 80);
}
