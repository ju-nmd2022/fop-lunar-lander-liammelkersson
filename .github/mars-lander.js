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

//------Rocket
// let rocketSettings = {
// x:
// y:
// velocity:
// acceleration:
// }

function rocket(x, y) {
  noStroke();
  translate(x, y);

  push();
  //light grey parts
  fill(189, 189, 189);
  rect(5, 40, 10, 95);
  rect(10, 30, 5, 95);
  rect(60, 30, 5, 95);
  pop();

  push();
  fill(45, 45, 45);
  //left-wing
  rect(0, 135, 5, 15);
  rect(5, 130, 5, 5);
  rect(10, 125, 5, 5);
  rect(15, 120, 5, 5);
  rect(20, 105, 5, 15);

  //right-wing
  rect(55, 105, 5, 15);
  rect(60, 120, 5, 5);
  rect(65, 125, 5, 5);
  rect(70, 130, 5, 5);
  rect(75, 135, 5, 15);
  //thrusters
  rect(20, 155, 5, 5);
  rect(25, 155, 10, 10);
  rect(30, 160, 25, 5);
  rect(45, 155, 10, 10);
  rect(55, 155, 5, 5);

  //nose
  rect(35, 45, 10, 10);

  //legs
  rect(15, 160, 5, 5);
  rect(10, 165, 5, 5);
  rect(10, 170, 5, 5);
  rect(60, 160, 5, 5);
  rect(65, 165, 5, 5);
  rect(65, 170, 5, 5);
  pop();

  //orange parts
  push();
  fill(148, 97, 82);
  rect(30, 45, 5, 10);
  rect(45, 45, 5, 10);
  rect(25, 50, 5, 45);
  rect(50, 50, 5, 45);
  pop();

  push();
  fill(178, 98, 63);
  rect(25, 35, 5, 15);
  rect(30, 30, 5, 15);
  rect(35, 30, 5, 15);
  rect(40, 30, 5, 15);
  rect(45, 30, 5, 15);
  rect(50, 35, 5, 15);

  rect(30, 15, 25, 20);
  rect(30, 5, 20, 20);
  pop();

  //body
  push();
  fill(224, 224, 224);
  rect(30, 55, 20, 100);
  rect(25, 95, 30, 60);
  rect(20, 120, 40, 35);
  rect(5, 135, 70, 10);
  rect(10, 130, 60, 5);
  rect(15, 125, 50, 5);
  rect(35, 155, 10, 5);
  pop();

  //window
  push();
  fill(45, 45, 45);
  rect(35, 60, 10, 5);
  pop();

  //dark grey
  push();
  fill(97, 97, 97);
  rect(5, 145, 15, 5);
  rect(60, 145, 15, 5);
  rect(20, 150, 5, 5);
  rect(55, 150, 5, 5);

  rect(15, 30, 5, 90);
  rect(20, 40, 5, 65);

  rect(55, 40, 5, 65);
  rect(65, 30, 5, 95);
  rect(70, 40, 5, 90);
  pop();

  //big tank nose
  push();
  fill(109, 77, 66);
  rect(25, 15, 5, 20);
  rect(30, 5, 5, 10);
  rect(35, 0, 10, 5);
  rect(45, 5, 5, 10);
  rect(50, 15, 5, 20);
  pop();

  //highlights
  push();
  fill(255, 255, 255);
  rect(10, 40, 5, 5);
  rect(10, 50, 5, 15);
  rect(30, 15, 5, 10);
  rect(30, 35, 5, 10);
  rect(35, 5, 5, 5);
  rect(35, 55, 5, 5);
  rect(35, 65, 5, 10);
  rect(60, 40, 5, 5);
  rect(60, 60, 5, 15);
  pop();

  //U.S flag and nasa logo
  push();
  fill(170, 85, 94);
  rect(55, 140, 15, 5);
  rect(60, 135, 5, 5);
  pop();

  push();
  fill(69, 92, 162);
  rect(55, 135, 5, 5);

  rect(20, 135, 5, 10);
  rect(15, 140, 5, 5);
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
  rocket(width / 2, 100);
}
