void setup() {
  size(900, 300, P3D);
  sphereDetail(20);
}

void draw() {
  background(25);
  noStroke();
  lightSpecular(255, 255, 255);
  directionalLight(255, 255, 255, -1, -1, -1);

  drawSphere(150, 2);
  drawSphere(450, 20);
  drawSphere(750, 80);

}

void drawSphere(float x, float gloss) {
  pushMatrix();
  translate(x, height / 2);
  fill(170, 190, 220);
  specular(255, 255, 255);
  shininess(gloss);
  sphere(75);
  popMatrix();
}
