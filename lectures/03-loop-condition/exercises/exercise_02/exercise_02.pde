size(600, 600);

float rectSize = 500;

for( int i = 0; i < 30; i++) {
  rect(50, 50, rectSize, rectSize);
  rectSize = rectSize * 0.85;
}
