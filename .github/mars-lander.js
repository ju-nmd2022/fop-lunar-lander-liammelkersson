// Hi, welcome to my coding space (see what i did there?)!
// This is a Lunar Lander type game made
// for an assignment in the course Foundations of Programming.
// Liam Melkersson. Jönköping University. 2023.

//----- General game variables
let isGameActive = true;

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
  y: 420,
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

//------Rocket
let rocketSettings = {
  x: width / 2,
  y: 50,
  size: 0.7,
  velocity: 0.5,
  acceleration: 0.16,
};

function rocket(x, y, s) {
  noStroke();
  translate(x, y);

  push();
  //light grey parts
  fill(189, 189, 189);
  rect(5 * s, 40 * s, 10 * s, 95 * s);
  rect(10 * s, 30 * s, 5 * s, 95 * s);
  rect(60 * s, 30 * s, 5 * s, 95 * s);
  pop();

  push();
  fill(45, 45, 45);
  //left-wing
  rect(0 * s, 135 * s, 5 * s, 15 * s);
  rect(5 * s, 130 * s, 5 * s, 5 * s);
  rect(10 * s, 125 * s, 5 * s, 5 * s);
  rect(15 * s, 120 * s, 5 * s, 5 * s);
  rect(20 * s, 105 * s, 5 * s, 15 * s);

  //right-wing
  rect(55 * s, 105 * s, 5 * s, 15 * s);
  rect(60 * s, 120 * s, 5 * s, 5 * s);
  rect(65 * s, 125 * s, 5 * s, 5 * s);
  rect(70 * s, 130 * s, 5 * s, 5 * s);
  rect(75 * s, 135 * s, 5 * s, 15 * s);
  //thrusters
  rect(20 * s, 155 * s, 5 * s, 5 * s);
  rect(25 * s, 155 * s, 10 * s, 10 * s);
  rect(30 * s, 160 * s, 25 * s, 5 * s);
  rect(45 * s, 155 * s, 10 * s, 10 * s);
  rect(55 * s, 155 * s, 5 * s, 5 * s);

  //nose
  rect(35 * s, 45 * s, 10 * s, 10 * s);

  //legs
  rect(15 * s, 160 * s, 5 * s, 5 * s);
  rect(10 * s, 165 * s, 5 * s, 5 * s);
  rect(10 * s, 170 * s, 5 * s, 5 * s);
  rect(60 * s, 160 * s, 5 * s, 5 * s);
  rect(65 * s, 165 * s, 5 * s, 5 * s);
  rect(65 * s, 170 * s, 5 * s, 5 * s);
  pop();

  //orange parts
  push();
  fill(148, 97, 82);
  rect(30 * s, 45 * s, 5 * s, 10 * s);
  rect(45 * s, 45 * s, 5 * s, 10 * s);
  rect(25 * s, 50 * s, 5 * s, 45 * s);
  rect(50 * s, 50 * s, 5 * s, 45 * s);
  pop();

  push();
  fill(178, 98, 63);
  rect(25 * s, 35 * s, 5 * s, 15 * s);
  rect(30 * s, 30 * s, 5 * s, 15 * s);
  rect(35 * s, 30 * s, 5 * s, 15 * s);
  rect(40 * s, 30 * s, 5 * s, 15 * s);
  rect(45 * s, 30 * s, 5 * s, 15);
  rect(50 * s, 35 * s, 5 * s, 15 * s);

  rect(30 * s, 15 * s, 25 * s, 20 * s);
  rect(30 * s, 5 * s, 20 * s, 20 * s);
  pop();

  //body
  push();
  fill(224, 224, 224);
  rect(30 * s, 55 * s, 20 * s, 100 * s);
  rect(25 * s, 95 * s, 30 * s, 60 * s);
  rect(20 * s, 120 * s, 40 * s, 35 * s);
  rect(5 * s, 135 * s, 70 * s, 10 * s);
  rect(10 * s, 130 * s, 60 * s, 5 * s);
  rect(15 * s, 125 * s, 50 * s, 5 * s);
  rect(35 * s, 155 * s, 10 * s, 5 * s);
  pop();

  //window
  push();
  fill(45, 45, 45);
  rect(35 * s, 60 * s, 10 * s, 5 * s);
  pop();

  //dark grey
  push();
  fill(97, 97, 97);
  rect(5 * s, 145 * s, 15 * s, 5 * s);
  rect(60 * s, 145 * s, 15 * s, 5 * s);
  rect(20 * s, 150 * s, 5 * s, 5 * s);
  rect(55 * s, 150 * s, 5 * s, 5 * s);

  rect(15 * s, 30 * s, 5 * s, 90 * s);
  rect(20 * s, 40 * s, 5 * s, 65 * s);

  rect(55 * s, 40 * s, 5 * s, 65 * s);
  rect(65 * s, 30 * s, 5 * s, 95 * s);
  rect(70 * s, 40 * s, 5 * s, 90 * s);
  pop();

  //big tank nose
  push();
  fill(109 * s, 77 * s, 66 * s);
  rect(25 * s, 15 * s, 5 * s, 20 * s);
  rect(30 * s, 5 * s, 5 * s, 10 * s);
  rect(35 * s, 0 * s, 10 * s, 5 * s);
  rect(45 * s, 5 * s, 5 * s, 10 * s);
  rect(50 * s, 15 * s, 5 * s, 20 * s);
  pop();

  //highlights
  push();
  fill(255, 255, 255);
  rect(10 * s, 40 * s, 5 * s, 5 * s);
  rect(10 * s, 50 * s, 5 * s, 15 * s);
  rect(30 * s, 15 * s, 5 * s, 10 * s);
  rect(30 * s, 35 * s, 5 * s, 10 * s);
  rect(35 * s, 5 * s, 5 * s, 5 * s);
  rect(35 * s, 55 * s, 5 * s, 5 * s);
  rect(35 * s, 65 * s, 5 * s, 10 * s);
  rect(60 * s, 40 * s, 5 * s, 5 * s);
  rect(60 * s, 60 * s, 5 * s, 15 * s);
  pop();

  //U.S flag and nasa logo
  push();
  fill(170, 85, 94);
  rect(55 * s, 140 * s, 15 * s, 5 * s);
  rect(60 * s, 135 * s, 5 * s, 5 * s);
  pop();

  push();
  fill(69, 92, 162);
  rect(55 * s, 135 * s, 5 * s, 5 * s);

  rect(20 * s, 135 * s, 5 * s, 10 * s);
  rect(15 * s, 140 * s, 5 * s, 5 * s);
  pop();
}

//------Particles

//------Fuel system

//------Data (text)
//
//
//
//

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

  //Rocket
  rocket(
    rocketSettings.x - 40 * rocketSettings.size,
    // ^^^^ 40 * size is so that the rocket is
    // ---- centered 40 is the width of size = 1
    rocketSettings.y,
    rocketSettings.size
  );

  if (isGameActive) {
    //gravity
    rocketSettings.y = rocketSettings.y + rocketSettings.velocity;
    rocketSettings.velocity =
      rocketSettings.velocity + rocketSettings.acceleration;
    //ground stops rocket
    if (rocketSettings.y > 350) {
      isGameActive = false;
    }
  }
}
