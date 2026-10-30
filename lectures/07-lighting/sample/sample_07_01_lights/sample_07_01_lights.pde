void setup() {
  size(900, 300, P3D);
}

void draw() {
  background(235);

  noLights();
  pushMatrix();
  translate(150, height / 2);
  stroke(30);
  fill(180);
  box(130);
  popMatrix();

  noLights();
  pushMatrix();
  translate(450, height / 2);
  noStroke();
  fill(180);
  box(130);
  popMatrix();

  lights();
  pushMatrix();
  translate(750, height / 2);
  noStroke();
  fill(180);
  box(130);
  popMatrix();

}
