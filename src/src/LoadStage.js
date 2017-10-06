var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

//Instantiate the Game Class
var game=new Game();

//create the PIXI application
var renderer = new PIXI.Application(game.STAGE_WIDTH, game.STAGE_HEIGHT);
document.body.appendChild(renderer.view);
game.stage=renderer.stage;

//load of the spritesheet and image
PIXI.loader
	.add("spin", "./assets/img/spin.png")
	.add("atlas", "./assets/img/atlas.json")
	.load(game.setup.bind(game));



  