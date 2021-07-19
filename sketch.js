var mario, mario_running, mario_collided, mario_jumping;

var ground, groundImage, ground2, ground2image;

var cloud, cloudsGroup, cloudImage1, cloudimage2, cloudimage3;

var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score, life;

var coin, coinimage, coinGroup;

var main_sound, coinsound, jump_sound, diesound, powerup_Sound;

var gamestate = "start"

var variable = 1;

var variable2 = 1
var variable3 = 1;

var gameOver, gameOverimage;

var powerup, powerupimage, powerupGroup;

var enemy, enemyimage, enemyGroup;

var playAgain, playAgainImage;

function preload() {
  mario_static = loadAnimation("Standing.png");
  mario_running = loadAnimation("Walking1.png", "Jumping.png", "Walking2.png");
  mario_collided = loadAnimation("Die.png");
  mario_jumping = loadAnimation("Jumping.png");

  groundImage = loadImage("ground.jpg");

  cloudImage1 = loadImage("cloud1.png");
  cloudImage2 = loadImage("cloud2.png");
  cloudImage3 = loadImage("cloud3.png");

  obstacle1 = loadImage("pipe1.png");
  obstacle2 = loadImage("pipe2.png");
  obstacle3 = loadImage("pipe3.png");

  coinimage = loadImage("coin.png");

  main_sound = loadSound("Overworld.mp3");
  jump_sound = loadSound("Mario_Jump.wav");
  coinsound = loadSound("Coin.wav")
  diesound = loadSound("Death.wav");

  gameOverimage = loadImage("game_over.png")

  enemyimage = loadAnimation("enemy1.png", "enemy2.png");

  playAgainImage = loadImage("restart.png");

  powerupimage = loadImage("mushroom.png");
}

/*function setup() {
  createCanvas(windowWidth, windowHeight);

  mario = createSprite(90, height - 40, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("jumping", mario_jumping)
  mario.addAnimation("collided", mario_collided);
  mario.scale = 1.1;

  ground = createSprite(width / 2, height - 20, 400, 20);
  ground.addImage("ground", groundImage);
  ground.scale = 0.49

  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  coinGroup = createGroup();
  enemyGroup = createGroup();
  powerupGroup = createGroup();

  gameOver = createSprite(width / 2, (height / 2) - 50)
  gameOver.addImage("dbhg", gameOverimage);
  gameOver.visible = false;

  playAgain = createSprite(width / 2, (height / 2) + 50)
  playAgain.addImage(playAgainImage);
  playAgain.scale = 0.8;
  playAgain.visible = false;

  score = 0;
  life = 2;

  main_sound.play();
}

function draw() {
  background(rgb(89, 147, 255, 255));

  if (gamestate === "start") {

    if (main_sound.isPlaying) {
      main_sound.setLoop(true);
    }

    if (ground.x < 0) {
      ground.x = width / 2;
    }

    ground.velocityX = -(6 + score / 200);

    if ((keyDown("space") || touches.length > 0) && mario.y >= height - 77) {
      mario.velocityY = -19;
      jump_sound.play();
      touches = [];
    }

    mario.velocityY = mario.velocityY + 0.8
    if (mario.y > height - 77) {
      mario.changeAnimation("running", mario_running);
    } else {
      mario.changeAnimation("jumping", mario_jumping)
    }

    if (coinGroup.isTouching(mario)) {
      score = score + 5
      coinsound.play();
      coinGroup[0].destroy();
    }

    if (obstaclesGroup.isTouching(mario) || enemyGroup.isTouching(mario)) {
      life = life-1
      variable3 = 2;
      gamestate = "end"
    }

    mario.collide(ground);
    obstaclesGroup.collide(ground)
    enemyGroup.collide(ground)

    spawnClouds();
    spawnObstacles()
    spawncoin();
    spawnEnemy();

  }

  if (gamestate === "end") {
    mario.changeAnimation("collided", mario_collided);
    ground.velocityX = 0;
    main_sound.pause();
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();

    if (variable2 === 1) {
      mario.velocityY = -6;
    }

    if (mario.y < height - 250) {
      variable2 = 2;
      mario.velocityY = 6
    }

    if (variable === 1) {
      diesound.play();
      variable = 2;
    }

    if (mario.y >= height) {
      gameOver.visible = true
      playAgain.visible = true
    }
    if(mousePressedOver(playAgain)&&life>0){
      gamestate = "start";
      playAgain.visible = false;
      gameOver.visible = false;
      mario.y = height-100;
      variable = 1;
      variable2 = 1;
      variable3 = 1;
      if (variable3 ===1){
        main_sound.play();
      }
    }
  }
  mario.depth = 90000000;

  drawSprites();
  textSize(20);
  fill("cyan")
  stroke("black")
  strokeWeight(5)
  text("Score : " + score, width - 100, height - 450);
  text("Life : " + life, width - 100, height - 425)
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width, height - 100, 40, 10);
    cloud.y = Math.round(random(height - 370, height - 400));
    cloud.scale = 0.7;
    cloud.velocityX = -(6 + score / 200);
    var rand1 = Math.round(random(1, 3));
    switch (rand1) {
      case 1:
        cloud.addImage(cloudImage1);
        break;
      case 2:
        cloud.addImage(cloudImage2);
        break;
      case 3:
        cloud.addImage(cloudImage3);
        break;
      default:
        break;
    }

    //assign lifetime to the variable
    cloud.lifetime = 400;

    //adjust the depth
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 10;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 90 === 0) {
    obstacle = createSprite(width + 20, height - 100, 10, 40);
    obstacle.velocityX = -(6 + score / 200);
    obstacle.velocityY = +20
    obstacle.depth = 10000;
    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}

function spawncoin() {
  if (frameCount % 200 === 0) {
    coin = createSprite(width, Math.round(random(height - 250, height - 300), 40, 10));
    coin.addImage("dsjfjs", coinimage);
    coin.scale = 0.0150;
    coin.velocityX = -(6 + score / 200);
    coin.lifetime = 300;
    coinGroup.add(coin)
  }
}

function spawnEnemy() {
  if (frameCount % 300 === 0) {
    enemy = createSprite(width + 20, height - 150, 10, 40);
    enemy.addAnimation("enemy", enemyimage)
    enemy.velocityX = -(7 + score / 200);
    enemy.velocityY = +20
    enemy.depth = 1000;
    enemy.scale = 0.2
    enemyGroup.add(enemy)
  }
}*/

  function setup() {
    createCanvas(800, 500);
  
    mario = createSprite(90,400, 20, 50);
    mario.addAnimation("static",mario_static);
    mario.addAnimation("running", mario_running);
    mario.addAnimation("jumping", mario_jumping)
    mario.addAnimation("collided", mario_collided);
    mario.scale = 1.1;
    

    ground = createSprite(950, 480, 400, 20);
  ground.addImage("ground", groundImage);
  ground.scale = 1

  obstacle = createSprite(1200,350,10,40);
  obstacle.addImage(obstacle1);
  obstacle.scale=0.3;

  }
  function draw(){
    background(rgb(89, 147, 255, 255));
    mario.velocityY = mario.velocityY + 0.8
    mario.collide(ground)
    obstacle.velocityY +=0.8
    obstacle.collide(ground)
    obstacle.collide(mario)
    if (keyDown(RIGHT_ARROW)){
      mario.x += 10
    }
    if (keyDown(LEFT_ARROW)){
      mario.x -= 10
    }
    if (keyDown(UP_ARROW)){
      mario.y -= 20
    }
    camera.position.x = mario.x
    drawSprites();
  }