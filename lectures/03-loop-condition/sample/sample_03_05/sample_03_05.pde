size(600, 600);
background(0);
noStroke();

int num = 100000;

for(int i = 0; i < num; i++) {
  float x = random(0, width);
  float y = random(0, height);
  float d = dist(x, y, width/2, height/2);
  
  if( d < 200) {
    noStroke();
    fill(127, 31, 255);
  } else {
    noFill();
    stroke(31, 127, 255);
  }
  
  ellipse(x, y, 5, 5);
}

save("sample-03-05.png");
