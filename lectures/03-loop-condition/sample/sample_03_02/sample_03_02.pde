size(500, 500);

float rectSize = 400;

for(int  i = 0; i < 100; i++) {
  rect(50, 50, rectSize, rectSize);
  rectSize = rectSize / 1.2;
}
