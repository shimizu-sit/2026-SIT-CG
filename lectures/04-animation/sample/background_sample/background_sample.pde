int x = 0;
void setup() {
  size(600, 600);
  background(202);
}

void draw() {
  ellipse(x, height/2, 200, 200);
  x += 10;
}

//save("background-off.png");
