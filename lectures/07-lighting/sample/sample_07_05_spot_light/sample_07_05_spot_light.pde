void setup() {
  size(600, 400, P3D);
  sphereDetail(18);
}

void draw() {
  background(20);
  noStroke();

  spotLight(
    255, 255, 255,
    width / 2, height / 2, 300,
    0, 0, -1,
    PI / 5, 12
  );

  pushMatrix();
  translate(width / 2, height / 2);
  fill(190);
  sphere(100);
  popMatrix();
}
