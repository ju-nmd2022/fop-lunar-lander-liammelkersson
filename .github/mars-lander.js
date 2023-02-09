// Hi, welcome to my coding space (see what i did there?)!
// This is a Lunar Lander type game made
// for an assignment in the course Foundations of Programming.
// Liam Melkersson. Jönköping University. 2023.

//----- General game variables & game states
let isGameActive = true;
let gameState = 0;
// game state 0 = menu
// game state 1 = gameplay
// game state 2 = game over
// game state 3 = win

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
  fill("#a45820");
  //   triangle(0, 420, 0, 360, 180, 420);
  //   triangle(width, 430, width, 360, 350, 430);
}

const marsRocks = [];
const marsRockSettings = {
  amount: 2000,
  maxSize: 4,
};

for (let i = 0; i < marsRockSettings.amount; i++) {
  const marsRock = {
    x: Math.floor(Math.random() * width),
    y: 420 + Math.floor(Math.random() * height),
    size: Math.floor(Math.random() * marsRockSettings.maxSize),
    windSpeed: 0.5,
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
//          Based on the one from garrit's lecture
let particles = [];

function createParticle(x, y) {
  const v = 0.2 + Math.random();
  const a = Math.random() * 2 * Math.PI;
  const maxLife = 10 + Math.floor(Math.random() * 10);
  return { x: x, y: y, velocity: v, angle: a, life: 0, maxLife: maxLife };
}

function drawParticle(particle) {
  push();
  translate(particle.x, particle.y);
  noStroke();
  fill(150, 150, 255);
  rect(0, 0, 5);
  pop();
}

function updateParticle(particle) {
  particle.x = particle.x + Math.cos(particle.angle) * particle.velocity;
  particle.y = particle.y + Math.sin(particle.angle) * particle.velocity;
  particle.velocity = particle.velocity * 0.99;
  particle.life = particle.life + 1;

  if (particle.life > particle.maxLife) {
    const particleIndex = particles.indexOf(particle);
    particles.splice(particleIndex, 1);
  }
}

//------Fuel
let fuel = 150;

//------Game Over

//
//
//

//DRAW FUNCTION
function draw() {
  //game states
  if (gameState == 0) {
    console.log("menu");
    //menu

    //Starry Sky
    noStroke();
    background(0, 0, 0);

    for (let star of stars) {
      let alphaSpeed = 0.03;

      fill(255, 255, 255, Math.abs(Math.sin(star.alpha) * 255));
      ellipse(star.x, star.y, star.size);
      star.alpha = star.alpha + alphaSpeed;
    }

    //Game text
    push();
    fill(255, 255, 255);
    textSize(50);
    textFont();
    textAlign(CENTER);
    text("MARS LANDER", width / 2, height / 3);
    pop();

    //press any button to start game
    push();
    fill(255, 255, 255);
    textSize(16);
    textFont();
    textAlign(CENTER);
    text("press spacebar to start game", width / 2, height / 3 + 35);
    pop();

    //controls
    push();
    fill(255, 255, 255);
    textSize(12);
    textFont();
    textAlign(CENTER);
    text("controls: arrow up to thurst & spacebar to restart", width / 2, 35);
    pop();

    //Mars Surface
    mars();

    for (let marsRock of marsRocks) {
      fill(123, 65, 40);
      ellipse(marsRock.x, marsRock.y, marsRock.size);
      marsRock.x = marsRock.x + marsRock.windSpeed;

      if (marsRock.x > width) {
        marsRock.x = 0;
      }
    }

    for (let particle of particles) {
      drawParticle(particle);
      updateParticle(particle);
    }
    //mars mountains
    triangle(0, 430, 0, 360, 180, 430);
    triangle(width, 440, width, 360, 350, 440);

    if (keyIsDown(32) && gameState == 0) {
      gameState = 1;
    }
  } else if (gameState == 1) {
    //gameplay
    //Starry Sky
    noStroke();
    background(0, 0, 0);

    for (let star of stars) {
      let alphaSpeed = 0.03;

      fill(255, 255, 255, Math.abs(Math.sin(star.alpha) * 255));
      ellipse(star.x, star.y, star.size);
      star.alpha = star.alpha + alphaSpeed;
    }

    //Data text
    push();
    fill(255, 255, 255);
    textSize(16);
    textFont();
    //fuel
    text("fuel: " + Math.floor(fuel / 1.5) + "%", 50, 50);
    //velocity
    text(
      "velocity: " + Math.floor(rocketSettings.velocity * 20) + "km/h",
      50,
      75
    );
    //text("altitude: " + Math.floor(rocketSettings.y), 50, 100);
    pop();

    //Mars Surface
    mars();

    for (let marsRock of marsRocks) {
      fill(123, 65, 40);
      ellipse(marsRock.x, marsRock.y, marsRock.size);
      marsRock.x = marsRock.x + marsRock.windSpeed;

      if (marsRock.x > width) {
        marsRock.x = 0;
      }
    }

    for (let particle of particles) {
      drawParticle(particle);
      updateParticle(particle);
    }
    //mars mountains
    triangle(0, 430, 0, 360, 180, 430);
    triangle(width, 440, width, 360, 350, 440);

    //shadow
    push();
    fill(0, 0, 0, 20);
    ellipse(
      rocketSettings.x,
      475,
      80 * (rocketSettings.y / 320),
      30 * (rocketSettings.y / 320)
    );
    pop();

    //GAME MECHANICS
    if (isGameActive) {
      //gravity
      rocketSettings.y = rocketSettings.y + rocketSettings.velocity;
      rocketSettings.velocity =
        rocketSettings.velocity + rocketSettings.acceleration;
      //ground stops rocket
      if (rocketSettings.y > 350) {
        isGameActive = false;
      }
      //Thrust mechanic
      let thrustVelocity = 4;
      //let thrustAcceleration = 5;

      if (keyIsDown(38)) {
        //arrowUp = thurst
        rocketSettings.velocity = rocketSettings.velocity - 0.4;
        console.log(rocketSettings.y);
        console.log(rocketSettings.acceleration);
        fuel = fuel - 2;

        //particles
        for (let i = 0; i < 200; i++) {
          let particle = createParticle(
            rocketSettings.x,
            rocketSettings.y + 125
          );
          particles.push(particle);
        }
      }
    }
    //Rocket
    rocket(
      rocketSettings.x - 40 * rocketSettings.size,
      // ^^^^ 40 * size is so that the rocket is
      // ---- centered 40 is the width of size = 1
      rocketSettings.y,
      rocketSettings.size
    );
  } else if (gameState == 2) {
    //win
  }
  console.log(gameState);
}
