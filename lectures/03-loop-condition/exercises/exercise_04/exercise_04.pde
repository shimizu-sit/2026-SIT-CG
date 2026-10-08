size(600, 500);
background(0);
noStroke();

colorMode(HSB, 360, 100, 100);

int num = 10000;

for (int i = 0; i < num; i++) {
  float x = random(0, width);
  float y = random(0, height);
  float d = dist(x, y, width/2, height/2);

  if (d < 150) {
    noStroke();
    fill(127, 80, 95);
  } else if (150 <= d && d < 250) {
    noStroke();
    fill(127, 80, 70);
  } else {
    noFill();
    stroke(127, 80, 30);
  }
  ellipse(x, y, 5, 5);
}
