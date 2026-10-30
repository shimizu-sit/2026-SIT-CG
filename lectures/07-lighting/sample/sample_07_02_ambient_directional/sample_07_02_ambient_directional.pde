void setup() {
  size(900, 300, P3D);
  sphereDetail(18);
}

void draw() {
  background(235);
  noStroke();

  noLights();
  ambientLight(100, 100, 100);
  pushMatrix();
  translate(150, height / 2);
  fill(190);
  sphere(75);
  popMatrix();

  noLights();
  directionalLight(255, 255, 255, -1, 0, 0);
  pushMatrix();
  translate(450, height / 2);
  fill(190);
  sphere(75);
  popMatrix();

  noLights();
  ambientLight(70, 70, 70);
  directionalLight(255, 255, 255, -1, 0, 0);
  pushMatrix();
  translate(750, height / 2);
  fill(190);
  sphere(75);
  popMatrix();

}
