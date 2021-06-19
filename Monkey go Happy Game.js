var bananaImage,obstacleImage,obstaclesGroup,bg,score, playerImage, player, monkeyImage, backgroundImg,ground, bananaGroup,obstacleHits;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",
   "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png");
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("stone.png");
   backgroundImg = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(800, 400);
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  bg = createSprite(0, 0, 800, 400);
  bg.scale = 1.5;
  bg.velocityX = -4;
  bg.addImage(backgroundImg);
  player = createSprite(100, 350, 20, 20);
  player.addAnimation("hi", monkeyImage);
  player.scale = 0.25;
  score = 0;
  ground = createSprite(0, 375, 800, 5);
  ground.visible = false;
  obstacleHits = 0;

}

function draw() {
  background(220);
  
  if(bg.x< 100 ){
    bg.x = bg.width/2;
  }
  //code runs when game is playing
  if(obstacleHits <2){
    if(keyDown("space")){
      player.velocityY = -10;
    }
    if(bananaGroup.isTouching(player)){
      score +=2;
      bananaGroup.destroyEach();
    }
    if(bananaGroup.isTouching(player)){
      gameState = END;
    }
    if(obstaclesGroup.isTouching(player)){
      player.scale = 0.2;
      obstaclesGroup.destroyEach();
      obstacleHits+=1;
    }
    switch(score){
      case 10: player.scale = 0.12;
            break;
      case 20: player.scale = 0.14;
            break;
      case 30: player.scale = 0.16;
            break;
      case 40: player.scale = 0.18;
            break;
      default: break;
    }
    makeObstacles();
    makeFood();
  }
  //code runs when player loses
  if(obstacleHits === 2){
    bg.velocityX =0;
    player.velocityX =0;
    
  }
  

  player.collide(ground);
  player.velocityY = player.velocityY  +1;
  drawSprites();
  

  //making text for score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
}

function makeFood(){
  if(frameCount%110 === 0){
    var food = createSprite(800, 200, 20, 20);
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -8;
    bananaGroup.add(food);
  }
}

function makeObstacles(){
  if(frameCount%200 ===0){
    var obstacle = createSprite(800, 350, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);
  }

}