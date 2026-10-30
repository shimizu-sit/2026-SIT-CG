float angle = 0;

void setup() {
  size(600, 500, P3D);
}

void draw() {
  background(30);

  ambientLight(45, 45, 45);
  directionalLight(255, 255, 255, -1, 0, 0);

  pushMatrix();
  translate(width / 2, height / 2);
  rotateX(angle);
  rotateY(angle * 1.2);
  noStroke();
  fill(120, 170, 230);
  box(150);
  popMatrix();

  angle += radians(1);
}
