var utils = new Utils();
var aext = utils.ifmp3();

var styles = new Styles();
var data = new Data();
var game = new Game();

var renderer = new PIXI.Application(800, 480, {forceCanvas: false, backgroundColor: 0x000033});


document.getElementById('gameContainer').appendChild(renderer.view);

game.stage = renderer.stage;


PIXI.loader
    .add("music", "./assets/audio/05-Binrpilot-Underground"+aext)
    .add("sound1", "./assets/audio/ToneWobble"+aext)
    .add("sound2", "./assets/audio/S-Damage"+aext)
    .add("sound3", "./assets/audio/Thunder1"+aext)
    .add("death", "./assets/audio/Game-Death"+aext)
    .add("spin", "./assets/img/spin.png")
    .add("atlas", "./assets/img/atlas.json")
    .load(
        game.setup.bind(game)
    )
    .on('progress', function (e) {
        //console.log('PIXI.loader: progress: ', e.progress);
        var perc = e.progress / 100;
        var preloader = document.getElementById("preloader");
        preloader.style.width = perc * window.innerWidth + 'px';
        if (e.progress >= 100) { //console.log('PIXI.loader.resources.atlas.spritesheet._frameKeys:', PIXI.loader.resources.atlas.spritesheet._frameKeys);
            TweenLite.to(preloader, 0.4, {
                opacity: 0
            });
        }
    })
    .on('complete', function (e) {
        console.log('PIXI.loader: complete');
    });


