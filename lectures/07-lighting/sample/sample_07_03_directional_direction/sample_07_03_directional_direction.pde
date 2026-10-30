void setup() {
  size(1000, 260, P3D);
  sphereDetail(16);
}

void draw() {
  background(235);
  noStroke();

  drawSphere(125, -1, 0, 0);
  drawSphere(375, 1, 0, 0);
  drawSphere(625, 0, -1, 0);
  drawSphere(875, 0, 1, 0);

}

void drawSphere(float x, float dx, float dy, float dz) {
  noLights();
  directionalLight(255, 255, 255, dx, dy, dz);
  pushMatrix();
  translate(x, height / 2);
  fill(190);
  sphere(70);
  popMatrix();
}
