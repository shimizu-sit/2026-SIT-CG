float lightX = 300;

void setup() {
  size(700, 400, P3D);
  sphereDetail(18);
}

void draw() {
  background(25);
  noStroke();

  lightX = constrain(mouseX, 100, 600);
  pointLight(255, 255, 255, lightX, height / 2, 250);

  pushMatrix();
  translate(width / 2, height / 2);
  fill(180);
  sphere(100);
  popMatrix();

}
