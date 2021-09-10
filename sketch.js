var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var modak;
var restart;


//Game States
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  modakImg = loadImage("modak.png");
  restartImg = loadImage("restart.png");
  sound1 = loadSound("die.mp3");
  sound2 = loadSound("gameOver.mp3")
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.25;
  
modak = createSprite(280,20,20,20);
modak.addImage(modakImg);
modak.scale=0.1

restart = createSprite(200,500,20,20);
restart.addImage(restartImg);
restart.scale=0.1;
restart.visible=false;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy) || jwelleryG.isTouching(boy)) {
     gameState=END;
     restart.visible=true;
     sound1.play();
     sound2.play();
     boy.addAnimation("SahilRunning",endImg);
     boy.scale=1;
     boy.x=200;
     boy.y=300;

     path.velocityY = 0;

     cashG.setVelocityXEach(0);
     cashG.setLifetimeEach(-1);

     diamondsG.setVelocityXEach(0);
     diamondsG.setLifetimeEach(-1);

     jwelleryG.setVelocityXEach(0);
     jwelleryG.setLifetimeEach(-1);

     swordGroup.setVelocityXEach(0);
     swordGroup.setLifetimeEach(-1);;

    }
      
  }
  
   
  
  drawSprites();
  textSize(20);
  fill("yellow");
  text("Modak: "+ treasureCollection,300,30);
  }
  //write condition for calling reset( )
if(keyDown("space") || mousePressedOver(restart)){
    reset();
   }
}



function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.05;
  cash.velocityY = 3;
  cash.lifetime = 170;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.1;
  diamonds.velocityY = 3;
  diamonds.lifetime = 170;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.08;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 430 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.15;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function reset(){
  
  gameState=PLAY;
  restart.visible=false;
  treasureCollection=0;
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.25;
  boy.x=70;
  boy.y=580;
  swordGroup.destroyEach();
  cashG.destroyEach();
  jwelleryG.destroyEach();
  diamondsG.destroyEach();
  path.velocityY=3;
  

  }