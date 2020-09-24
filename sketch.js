var apple, obstacle;
var ground;
var appleImg,rockImg,trashImg,goImg,rImg;
var rand;
var count = 0;
var gameOver, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obsGroup;

function preload(){
  appleImg = loadImage("apple-7.png");
  rockImg = loadImage("rock.png");
  trashImg = loadImage("trash.png");
  goImg = loadImage("over.png");
  rImg = loadImage("restart.png");

}

function setup(){
  canvas = createCanvas(500,500);

  ground = createSprite(250,470,800,20);
  ground.shapeColor = "black";
  
  apple = createSprite(40,468,20,20);
  apple.addImage(appleImg);
  apple.scale = 0.2;

  obsGroup = createGroup();

  gameOver = createSprite(280,250,20,20);
  gameOver.addImage(goImg);
  gameOver.scale = 0.9;
  gameOver.visible = false;

  restart = createSprite(280,330,20,20);
  restart.addImage(rImg);
  restart.scale = 0.3;
  restart.visible = false;
}

function draw(){
  background("#0000FF");
  text("Score: "+count,420,20);
  apple.collide(ground);

  if(gameState === PLAY){
    count = count+Math.round(frameCount/50);

  
  if(keyDown("space") && apple.y>420){
    apple.velocityY = -11;
  }

  apple.velocityY = apple.velocityY+0.8;

  if(obsGroup.collide(apple)){
    gameState = END;
  }
  spawnObstacles();
  }else if(gameState === END){
    obstacle.velocityX = 0;

    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%90===0){
    obstacle = createSprite(510,450,50,50);
    obstacle.velocityX = -5;
    obstacle.scale = 0.35;
    rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacle.addImage(rockImg);
        break;
      case 2: obstacle.addImage(trashImg);
        break;
        default: break;
    }
    obsGroup.add(obstacle);
    }
}

function reset(){
  gameState = PLAY;
  count = 0;
  obsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
}
