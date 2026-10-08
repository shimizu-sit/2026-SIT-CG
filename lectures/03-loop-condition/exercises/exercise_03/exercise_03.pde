size(600, 600);
background(255);
noStroke();
colorMode(HSB, 360, 100, 100);

int rectSize = 8;

for (int y = 2; y < height; y += 10) {
  for (int x = 2; x < width; x += 10) {
    if (x < width / 3) {
      fill(#ef476f);
    } else if (x >= width / 3 && x < 2* width / 3){
      fill(#06d6a0);
    } else {
      fill(#118ab2);
    }
    rect(x, y, rectSize, rectSize);
  }
}
