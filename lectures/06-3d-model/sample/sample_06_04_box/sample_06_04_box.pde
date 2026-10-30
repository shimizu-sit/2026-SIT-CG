float angle = 0;

void setup() {
  size(600, 500, P3D);
}

void draw() {
  background(245);

  translate(width / 2, height / 2);
  rotateX(angle);
  rotateY(angle * 1.2);

  fill(80, 160, 220);
  box(120);

  angle += radians(1);
}
