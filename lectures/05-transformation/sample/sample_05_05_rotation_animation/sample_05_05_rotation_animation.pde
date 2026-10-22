float angle = 0;
float omega = radians(2);

void setup() {
  size(600, 400);
  rectMode(CENTER);
}

void draw() {
  background(245);

  translate(width / 2, height / 2);
  rotate(angle);

  fill(80, 160, 220);
  rect(0, 0, 140, 140);

  angle += omega;
}
