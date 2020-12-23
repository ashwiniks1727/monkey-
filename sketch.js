
var monkey , monkey_running
var banana ,bananaImage, stone, obstacleImage
var bananaGroup, stoneGroup
var score,survivalT;
var gameState=1;
function preload()
{  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  
    createCanvas(500,400); 
  
    monkey=createSprite(50,330,50,50);                           monkey.addAnimation("moving",monkey_running);
    monkey.scale=0.15;
  
    ground=createSprite(0,380,1000,15);
    ground.x=ground.width/2;
  
    score=0;
    survivalT=0;
  
    bananaGroup=new Group();
    stoneGroup=new Group();
    
    //monkey.debug=true;
  
}


function draw()
{
    background("green");
    fill("black");
    textSize(15);
    text("Survival Time: "+survivalT,50,25);
    text("Score: "+score,375,25);
  
    survivalT=Math.ceil(frameCount/frameRate());
  
    if(gameState===1)
    {
      ground.velocityX=-4;
      
      if(ground.x<0)
      {
         console.log("inside infinite")
         ground.x=ground.width/2; 
      }
      
      if(keyDown("space") && monkey.y>=100)
      {
         monkey.velocityY=-12;
      }
      monkey.velocityY=monkey.velocityY+1;
      
      createFruit();
      createObstacles();
      
      if(stoneGroup.isTouching(monkey))
      {
        gameState=0;    
      }
      if(bananaGroup.isTouching(monkey))
      {
        bananaGroup.destroyEach();
        score=score+1;
       
      }
    }
    else if(gameState===0)
    {
      textSize(25);
      text("GAME OVER",190,220);
      ground.velocityX=0;
      ground.velocityY=0;
      
      bananaGroup.setVelocityXEach(0);
      stoneGroup.setVelocityXEach(0);
      
      //bananaGroup.setLifetimeEach(-1);
      stoneGroup.setLifetimeEach(-1);
      
    }
    monkey.collide(ground);
    drawSprites();
  
}

function createFruit()
{
  if(frameCount%80===0)
  {
    banana=createSprite(500,100,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.12;
    banana.velocityX=-5;
    banana.lifetime=150;
    banana.y=Math.round(random(70,150));
    bananaGroup.add(banana);
  }
}

function createObstacles()
{
  if(frameCount%300===0)
  {
    stone=createSprite(500,335,10,10);
    stone.addImage(obstacleImage);
    stone.scale=0.2;
    stone.velocityX=-5;
    stone.lifetime=150;
    stoneGroup.add(stone);
  }
}



