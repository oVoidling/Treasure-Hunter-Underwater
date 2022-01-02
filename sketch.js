var diver, diverImg;
var appletreasure, irontreasure, goldentreasure;
var appletreasureImg, irontreasureImg, goldentreasureImg;
var ocean, oceanImg;
var appletreasuresGroup, irontreasuresGroup, goldentreasuresGroup;
var shark, sharkImg, sharksGroup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

var treasure = 0

function preload(){
  diverImg = loadAnimation("swim1.png","swim2.png","swim3.png","swim4.png","swim5.png","swim6.png","swim7.png","swim8.png");
  oceanImg = loadImage("ocean.png")
  appletreasureImg = loadImage("appletreasure.png")
  irontreasureImg = loadImage("irontreasure.png")
  goldentreasureImg = loadImage("goldtreasure.png")
  sharkImg = loadImage("shark.png")
}

function setup() {
  createCanvas(500,400);


ocean = createSprite(200,200,400,400)
ocean.addImage(oceanImg)
ocean.scale = 1

diver = createSprite(100,100,1,1);
diver.addAnimation("swiming",diverImg);
diver.scale = 0.7
diver.setCollider("rectangle",0,10,180,70,0)

  appletreasuresGroup = createGroup()
  irontreasuresGroup = createGroup()
  goldentreasuresGroup = createGroup()
  sharksGroup = createGroup()
}

function draw() {
  background(0);
if(gameState === PLAY){
ocean.velocityX = -1


if (ocean.x < 130){
  ocean.x = 200;
}

if(keyDown("a")){
  diver.y -= 1
}
if(keyDown("d")){
  diver.y += 1
}

if(appletreasuresGroup.isTouching(diver)){
appletreasuresGroup.destroyEach();
treasure += 50
}

if(goldentreasuresGroup.isTouching(diver)){
  goldentreasuresGroup.destroyEach();
  treasure += 150
}
if(irontreasuresGroup.isTouching(diver)){
  irontreasuresGroup.destroyEach();
  treasure += 100
}

if(sharksGroup.isTouching(diver)){
  gameState = END;
  ocean.destroy();
  diver.destroy();
  sharksGroup.destroyEach();
  appletreasuresGroup.destroyEach();
  irontreasuresGroup.destroyEach();
  goldentreasuresGroup.destroyEach();

  sharksGroup.visible = false;
  appletreasuresGroup.visible = false;
  irontreasuresGroup.visible = false;
  goldentreasuresGroup.visible = false;
}

spawnappleTreasure();
spawngoldTreasure();
spawnironTreasure();
spawnShark();

}

if(gameState === END){
  stroke("white")
  fill("white")
  background("black")
  text("GameOver Your Score was : "+ treasure,150,200)
}

drawSprites();
textSize(20);
  fill(000);
  text("Treasure: "+ treasure,10,30);
}

function spawnappleTreasure(){
  if(frameCount % 200 === 0){
  appletreasure = createSprite(450,100,10,10);
  appletreasure.addImage(appletreasureImg);
  appletreasure.scale = 0.1;
  appletreasure.velocityX = -1;
  appletreasure.y = Math.round(random(10,380));
  appletreasuresGroup.add(appletreasure);
  }
}

function spawngoldTreasure(){
  if(frameCount % 320 === 0){
  goldentreasure = createSprite(450,100,10,10);
  goldentreasure.addImage(goldentreasureImg);
  goldentreasure.scale = 0.3;
  goldentreasure.velocityX = -1;
  goldentreasure.y = Math.round(random(10,380));
  goldentreasuresGroup.add(goldentreasure);
  }
}

function spawnironTreasure(){
  if(frameCount % 450 === 0){
  irontreasure = createSprite(450,100,10,10);
  irontreasure.addImage(irontreasureImg);
  irontreasure.scale = 0.3;
  irontreasure.velocityX = -1;
  irontreasure.y = Math.round(random(10,380));
  irontreasuresGroup.add(irontreasure);
  }
}

function spawnShark(){
  if(frameCount % 129 === 0){
  shark = createSprite(450,100,1,0);
  shark.addImage(sharkImg);
  shark.scale = 0.4;
  shark.velocityX = -1;
  shark.y = Math.round(random(10,380));
  shark.lifetimeEach = 1200
  shark.setCollider("rectangle",-20,-40,200,100,0)
  sharksGroup.add(shark);
  }
}