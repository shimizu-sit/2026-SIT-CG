int x = 0;
void setup(){
size(600, 600);
}

void draw() {
  background(202);
  ellipse(x, height/2, 200, 200);
  x += 10;
}

//save("animation-06.png");
