size(600, 600);

background(255);

colorMode(HSB, 360, 100, 100);

int rectSize = 8;

for (int y = 2; y < 600; y += 10) {
  for (int x = 2; x < 600; x += 10) {
    rect(x, y, rectSize, rectSize);
  }
}
