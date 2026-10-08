size(600, 600);
background(255);

noStroke();
colorMode(HSB, 360, 100, 100);

int rectSize = 8;

for (int y = 2; y < height; y += 10) {
  for (int x = 2; x < width; x += 10) {
    if( x < width /2) {
      fill(90, 80, 99);
    } else {
      fill(270, 80, 99);
    }
    rect(x, y, rectSize, rectSize);
  }
}

save("sample-03-04.png");
