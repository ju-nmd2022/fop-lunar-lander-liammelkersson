// Hi, welcome to my coding space (see what i did there?)!
// This is a Lunar Lander type game made
// for an assignment in the course Foundations of Programming.
// Liam Melkersson. Jönköping University. 2023.

//----- Setup
function setup() {
  createCanvas(750, 750);
  frameRate(30);
}

//----- General game variables & game states
let isGameActive = true;
let gameState = "start";
let result;
let rocketLanded;
let landingY = 350;
const screenWidth = 750;
const screenHeight = 750;

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
    x: Math.floor(Math.random() * screenWidth),
    y: Math.floor(Math.random() * screenHeight),
    size: Math.floor(Math.random() * starSettings.maxSize),
    alpha: Math.random(),
  };
  stars.push(star);
}

//------ Intro text
function introText() {
  //Game text
  push();
  fill(255, 255, 255);
  textSize(50);
  textFont();
  textAlign(CENTER);
  text("MARS LANDER", screenWidth / 2, screenHeight / 3);
  pop();

  //Instructions
  push();
  fill(255, 255, 255);
  textSize(16);
  textFont();
  textAlign(CENTER);
  text("press spacebar to start game", screenWidth / 2, screenHeight / 3 + 35);

  fill(200, 200, 200);
  textSize(14);
  text(
    "you have to land with an impact velocity of max 30km/h",
    screenWidth / 2,
    screenHeight / 3 - 160
  );
  text(
    "don't run out of fuel, or the rocket will explode",
    screenWidth / 2,
    screenHeight / 3 - 175
  );
  text(
    "controls: arrow-up = thrust, spacebar = restart",
    screenWidth / 2,
    screenHeight / 3 - 190
  );
  pop();
}

//-----Mars surface
const marsSettings = {
  x: 0,
  y: 420,
  marsscreenWidth: screenWidth,
  marsscreenHeight: screenHeight,
  color: "#ad6242",
};

function mars() {
  noStroke();
  fill(marsSettings.color);
  rect(
    marsSettings.x,
    marsSettings.y,
    marsSettings.marsscreenWidth,
    marsSettings.marsscreenHeight
  );
}

function marsMountains() {
  noStroke();
  fill(123, 65, 40);
  triangle(0, 430, 0, 360, 180, 430);
  triangle(750, 440, 750, 360, 450, 440);
}

const marsRocks = [];
const marsRockSettings = {
  amount: 2000,
  maxSize: 4,
};

for (let i = 0; i < marsRockSettings.amount; i++) {
  const marsRock = {
    x: Math.floor(Math.random() * screenWidth),
    y: 420 + Math.floor(Math.random() * screenHeight),
    size: Math.floor(Math.random() * marsRockSettings.maxSize),
    windSpeed: 0.5,
  };
  marsRocks.push(marsRock);
}

//------Rocket
let rocketSettings = {
  x: screenWidth / 2,
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

const particleSettings = {
  acceleration: 0.99,
  agingSpeed: 1,
  deltaY: 125,
};

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
  particle.velocity = particle.velocity * particleSettings.acceleration;
  particle.life = particle.life + particleSettings.agingSpeed;

  if (particle.life > particle.maxLife) {
    const particleIndex = particles.indexOf(particle);
    particles.splice(particleIndex, 1);
  }
}

//------Fuel
let fuel = 150;
let fuelUsageSpeed = 2;

//------Game Over
function gameOver() {
  push();
  translate(0, 0);
  fill(255, 255, 255);
  textSize(50);
  textFont();
  textAlign(CENTER);
  text("GAME OVER", screenWidth / 2, screenHeight / 3);
  pop();
}

//------Game won
function gameWon() {
  push();
  fill(255, 255, 255);
  textSize(50);
  textFont();
  textAlign(CENTER);
  text("YOU LANDED!", screenWidth / 2, screenHeight / 3);
  pop();
}
//
//
//
//
//
//
//

//DRAW FUNCTION
function draw() {
  //game states

  if (gameState === "start") {
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
      marsRock.x = marsRock.x + marsRock.windSpeed;

      if (marsRock.x > screenWidth) {
        marsRock.x = 0;
      }
    }

    introText();

    for (let particle of particles) {
      drawParticle(particle);
      updateParticle(particle);
    }
    marsMountains();

    if (keyIsPressed === true && keyCode === 32) {
      gameState = "gameplay";
    }
  } else if (gameState === "gameplay") {
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
    //fuel          divided by 1.5 so that it's 1-100% and not 1-150%
    text("fuel: " + Math.floor(fuel / 1.5) + "%", 50, 50);
    //velocity      times 20 so that it is somewhat relatable to real speeds
    text(
      "velocity: " + Math.floor(rocketSettings.velocity * 20) + " km/h",
      50,
      75
    );
    text(
      "altitude: " + Math.floor((rocketSettings.y - landingY) * -1) + " m",
      50,
      100
    );
    pop();

    //Mars Surface
    mars();

    for (let marsRock of marsRocks) {
      fill(123, 65, 40);
      ellipse(marsRock.x, marsRock.y, marsRock.size);
      marsRock.x = marsRock.x + marsRock.windSpeed;

      if (marsRock.x > screenWidth) {
        marsRock.x = 0;
      }
    }

    for (let particle of particles) {
      drawParticle(particle);
      updateParticle(particle);
    }

    marsMountains();

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
      if (rocketSettings.y > landingY && rocketSettings.velocity > 1.5) {
        gameOver();
        result = "too bad, you crashed";

        //EXPLOSION EFFECT

        rocketLanded = false;
        isGameActive = false;
        gameState = "end";
      } else if (
        rocketSettings.y > landingY &&
        rocketSettings.velocity <= 1.5
      ) {
        gameWon();
        result = "great! you landed safely";
        rocketLanded = true;
        isGameActive = false;
        gameState = "end";
      }
      //Thrust mechanic
      let thrustAcceleration = 0.4;

      if (keyIsDown(38)) {
        //arrowUp to thrust
        rocketSettings.velocity = rocketSettings.velocity - thrustAcceleration;
        console.log(rocketSettings.y);
        console.log(rocketSettings.acceleration);
        fuel = fuel - fuelUsageSpeed;

        //particles
        for (let i = 0; i < 200; i++) {
          let particle = createParticle(
            rocketSettings.x,
            rocketSettings.y + particleSettings.deltaY
          );
          particles.push(particle);
        }
      }
    }
    //Rocket
    rocket(
      rocketSettings.x - 40 * rocketSettings.size,
      // ^^^^ 40 * size is so that the rocket is
      // ---- centered 40 is the screenWidth of size = 1 this is cus the size is 0.4
      rocketSettings.y,
      rocketSettings.size
    );

    if (fuel === 0) {
      rocketLanded = false;
      gameState = "end";
      isGameActive = false;
      result = "you had no fuel left, the rocket exploded :(";
      //EXPLOSION EFFECT
    }
  } else if (gameState === "end") {
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
    text("MARS LANDER", screenWidth / 2, screenHeight / 3);
    pop();

    //press any button to start game
    push();
    fill(255, 255, 255);
    textSize(16);
    textFont();
    textAlign(CENTER);
    text(result, screenWidth / 2, screenHeight / 3 + 35);
    pop();

    //controls
    push();
    fill(255, 255, 255);
    textSize(12);
    textFont();
    textAlign(CENTER);
    //text(" well played", screenWidth / 2, 35);
    pop();

    //Mars Surface
    mars();

    for (let marsRock of marsRocks) {
      fill(123, 65, 40);
      ellipse(marsRock.x, marsRock.y, marsRock.size);
      marsRock.x = marsRock.x + marsRock.windSpeed;

      if (marsRock.x > screenWidth) {
        marsRock.x = 0;
      }
    }

    for (let particle of particles) {
      drawParticle(particle);
      updateParticle(particle);
    }
    marsMountains();

    if (rocketLanded === true) {
      rocket(
        rocketSettings.x - 40 * rocketSettings.size,
        // ^^^^ 40 * size is so that the rocket is
        // ---- centered 40 is the screenWidth of size = 1
        rocketSettings.y,
        rocketSettings.size
      );
    }

    // resetting the variables that aren't consts & the game ofc
    if (keyIsPressed === true && keyCode === 32) {
      rocketSettings.x = screenWidth / 2;
      rocketSettings.y = 50;
      rocketSettings.size = 0.7;
      rocketSettings.velocity = 0.5;
      rocketSettings.acceleration = 0.16;

      fuel = 150;

      gameState = "start";
      isGameActive = true;
    }
  }
}
