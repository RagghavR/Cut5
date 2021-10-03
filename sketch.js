const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let sadsoundplay = false
let engine;
let world;
var score = 0
var rabbit
var s1 = false
var s2 = false
var s3 = false

function preload(){
  bg = loadImage("assets/background.png")
  fruitImg = loadImage("assets/melon.png")
  rabbitImg = loadImage("assets/Rabbit-01.png")
  blinking = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png",)
  eat.looping = false
  sad.looping = false
  bgsound = loadSound("assets/sound1.mp3")
  sadsound = loadSound("assets/sad.wav")
  cutsound = loadSound("assets/rope_cut.mp3")
  eatsound = loadSound('assets/eating_sound.mp3')
  airsound = loadSound("assets/air.wav")
  starImg = loadImage("assets/star.png")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height*0.95,width,20);
  blinking.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20
  rope = new Rope(7,{x:width*0.4,y:30});
  rope2 = new Rope(8,{x:width*0.6,y:30});
  fruit = Bodies.circle(200,300,20);
  Matter.Composite.add(rope.body,fruit);
  star1 = createSprite(width/2,height/2)
  star1.addImage(starImg)
  star1.scale = 0.025
  star2 = createSprite(width*0.75,height/2)
  star2.addImage(starImg)
  star2.scale = 0.025
  star3 = createSprite(width*0.75,height*0.25)
  star3.addImage(starImg)
  star3.scale = 0.025

  link = new Link(rope,fruit);
  link2 = new Link(rope2,fruit);
  rabbit = createSprite(width*0.85,480,100,100)
  rabbit.addAnimation("still",blinking)
  rabbit.addAnimation("swef",eat)
  rabbit.addAnimation("asd",sad)
  blower = createImg("assets/balloon.png")
  blower.position(420,250)
  blower.size(150,100)
  blower.mouseClicked(function(){
    Matter.Body.applyForce(fruit,fruit.position,{x: 0.03,y:0})
    airsound.setVolume(0.1)
    airsound.play()
  })
  bgsound.play()
  bgsound.setVolume(0.2)
  //bgsound.setVolume(0)
  rabbit.scale = 0.2

  button = createImg("assets/cut_btn.png")
  button.position(width*0.4,30)
  button.size(50,50)
  button.mouseClicked(function(){
    rope.break()
    link.break()
    cutsound.play()
  })
  button2 = createImg("assets/cut_btn.png")
  button2.position(width*0.6,30)
  button2.size(50,50)
  button2.mouseClicked(function(){
    rope2.break()
    link2.break()
    cutsound.play()
  })

  mute = createImg("assets/mute.png")
  mute.position(width*0.9,40)
  mute.size(35,35)
  mute.mouseClicked(function(){
    if(bgsound.isPlaying()){
      bgsound.stop()
    } else{
      bgsound.play()
    }
  })
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg);
  drawSprites()
  rope.display();
  rope2.display()
  push()
  if(fruit != null){
  imageMode(CENTER)
  image(fruitImg,fruit.position.x,fruit.position.y,80,80);
  }
  pop()
  Engine.update(engine);
  //ground.display();
  fill("white")
  textSize(20)
  text("Score: "+score,width*0.1,height*0.1)

  if(collides(fruit,rabbit)){
    rabbit.changeAnimation("swef",eat)
    eatsound.play()
    score =score + 20
  }
  if(fruit!== null){
  if(star1 !== undefined){
  dist1 = dist(fruit.position.x,fruit.position.y,star1.position.x,star1.position.y)
  if(dist1<50 && s1 == false){
    score = score+10
    star1.destroy()
    s1 = true
  }
}
if(star2!== undefined){
  dist2 = dist(fruit.position.x,fruit.position.y,star2.position.x,star2.position.y)
  if(dist2<50 && s2  == false){
    score = score+10
    star2.destroy()
    s2 = true
  }
}
if(star3!== undefined){
  dist3 = dist(fruit.position.x,fruit.position.y,star3.position.x,star3.position.y)
  if(dist3<50 && s3 == false){
    score = score+10
    star3.destroy()
    s3 = true
  }
}
  }
   if(fruit != null && fruit.position.y > 490 && sadsoundplay == false){
     rabbit.changeAnimation("asd",sad)
      sadsound.play()
        sadsoundplay = true
   }
   
   
   //console.log(sadsoundplay)
}

function collides(body,sprite){
  
  if(fruit!=null){
  var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance < 80){
    World.remove(world,fruit)
    fruit = null
    return true
  } else {
    return false
  }
  
  }
}