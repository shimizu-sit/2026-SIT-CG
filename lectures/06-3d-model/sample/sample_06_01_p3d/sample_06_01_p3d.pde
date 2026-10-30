void setup() {
  size(600, 600, P3D);
}

void draw() {
  background(245);

  translate(width / 2, height / 2);
  rotateX(radians(-25));
  rotateY(radians(25));

  strokeWeight(3);
  stroke(220, 70, 70);
  line(0, 0, 0, 180, 0, 0);       // +X：右
  stroke(70, 150, 90);
  line(0, 0, 0, 0, 180, 0);       // +Y：下
  stroke(70, 100, 220);
  line(0, 0, 0, 0, 0, 180);       // +Z：手前

  stroke(40);
  noFill();
  box(40);

}
