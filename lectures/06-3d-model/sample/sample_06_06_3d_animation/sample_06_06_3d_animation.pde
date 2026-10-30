float angle = 0;
float z = -260;
float speedZ = 4;

void setup() {
  size(600, 500, P3D);
  sphereDetail(16);
}

void draw() {
  background(245);

  pushMatrix();
  translate(width / 2, height / 2, z);
  rotateX(angle);
  rotateY(angle * 1.2);
  fill(90, 160, 230);
  sphere(45);
  popMatrix();

  angle += radians(2);
  z += speedZ;

  if (z > 260) {
    z = -260;
  }
}
