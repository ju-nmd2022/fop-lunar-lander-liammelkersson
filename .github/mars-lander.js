// Hi, welcome to my coding space (see what i did there?)!
// This is a Lunar Lander type game made
// for an assignment in the course Foundations of Programming.
// Liam Melkersson. Jönköping University. 2023.

//-----Starry sky
//      (inspired by Garrit's starry sky at:
//      https://pixelkind.github.io/foundationsofprogramming//programming/15-07-example)

const stars = [];
const starSettings = {
  amount: 500,
  maxSize: 3,
};

for (let i = 0; i < starSettings.amount; i++) {
  const star = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    size: Math.floor(Math.random() * starSettings.maxSize),
    alpha: Math.random(),
  };
  stars.push(star);
}

//-----Mars surface
const marsSettings = {
  x: 0,
  y: width - width / 7,
  marsWidth: width,
  marsHeight: height,
  color: "#ad6242",
};

function mars() {
  noStroke();
  fill(marsSettings.color);
  rect(
    marsSettings.x,
    marsSettings.y,
    marsSettings.marsWidth,
    marsSettings.marsHeight
  );
}

const marsRocks = [];
const marsRockSettings = {
  amount: 500,
  maxSize: 7,
};

for (let i = 0; i < marsRockSettings.amount; i++) {
  const marsRock = {
    x: Math.floor(Math.random() * width),
    y: 420 + Math.floor(Math.random() * height),
    size: Math.floor(Math.random() * marsRockSettings.maxSize),
    //alpha: Math.random(),
  };
  marsRocks.push(marsRock);
}

//DRAW FUNCTION
function draw() {
  //Starry Sky
  noStroke();
  background(0, 0, 0);

  for (let star of stars) {
    let alphaSpeed = 0.03;

    fill(255, 255, 255, Math.abs(Math.sin(star.alpha) * 255));
    ellipse(star.x, star.y, star.size);
    star.alpha = star.alpha + alphaSpeed;
  }

  //Mars Surface
  mars();

  for (let marsRock of marsRocks) {
    fill(123, 65, 40);
    ellipse(marsRock.x, marsRock.y, marsRock.size);
  }
  rocket(width / 2, 100);
}
