/**
*Class Game
*/
function Game(){
	this.STAGE_WIDTH=800;
	this.STAGE_HEIGHT=480;
	this.stage;
    this.score;
}
/**
*Function called after the load of the images assets
*Can be emptied (or should ?) before starting the test
*/
Game.prototype.setup= function(){
    
        console.log('setup');
	
		//rich text copied from https://pixijs.github.io/examples/#/basics/text.js
		var style = new PIXI.TextStyle({
			fontFamily: 'cheeseburgerregular',
			fontSize: 36,
			fontStyle: 'italic',
			fontWeight: 'bold',
			fill: ['#ffffff', '#00ff99'], // gradient
			stroke: '#4a1850',
			strokeThickness: 5,
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
			wordWrap: true,
			wordWrapWidth: 440
		});
    
        var _st = this.stage;
    
        function addSprite(id) {
            return new PIXI.Sprite(PIXI.loader.resources.atlas["textures"][id]);
        }
    
    
    // adding images from atlas resources
    // background
    
        var bg1 = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"]["bigwin-screen.jpg"]);
        bg1.width = this.STAGE_WIDTH;
        bg1.height = this.STAGE_HEIGHT;
        _st.addChild(bg1);
    
        var bg2 = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"]["bigwin-screen.jpg"]);
        bg2.width = this.STAGE_WIDTH;
        bg2.height = this.STAGE_HEIGHT;    
    
    
        var overlay1 = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"]["Overlay-FreeSpins.png"]);
        overlay1.width = this.STAGE_WIDTH;
        //overlay1.height = this.STAGE_HEIGHT*overlay1.scale.x;    
        _st.addChild(overlay1);    
    
        var overlay2 = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"]["Overlay.png"]);
        overlay2.width = this.STAGE_WIDTH;
        overlay2.scale.y = -1;
        overlay2.y = 390;
        _st.addChild(overlay2);      
    
        var logo = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"]["Logo.png"]);
        _st.addChild(logo);
        logo.width = this.STAGE_WIDTH;
        logo.height = logo.height*logo.scale.x;
    
        var spin = new PIXI.Sprite(PIXI.loader.resources.spin.texture);
        spin.x = this.STAGE_WIDTH/2;
        spin.y = this.STAGE_HEIGHT - spin.height*0.5 - 13;
        spin.anchor.set(0.5);
        _st.addChild(spin);
        spin.interactive = true;
        spin.buttonMode = true;
    
        var symbols = new PIXI.Container();
        _st.addChild(symbols);
    
        function toss() {
            
            eraseToss();
            
            for(var i=0; i <5; i++) {
                var n = Math.ceil(Math.random()*12);
                var r = 'symbol'+n+'.png';

                var s = new PIXI.Sprite(PIXI.loader.resources.atlas["textures"][r]);
                s.scale.x = 0.65;
                s.scale.y = s.scale.x;
                s.dscale = s.scale;
                s.anchor.set(0.5);
                s.x = 160 + (i * 120);
                s.y = 185;
                symbols.addChild(s);
                
                TweenLite.from(s.scale, 0.5, {y:-s.dscale, x:-s.dscale});
                
                TweenLite.from(s.scale, 0.5, {y:0, x:0});
                
            }
            
            TweenLite.from(spin, 1, {rotation:-Math.PI * 2 * 1},"spin+=2");
            
        }
    
        function eraseToss() {
            
            console.log(symbols.children.length)
            
/*            for(var i=0; i < 4; i++) {
                    symbols.removeChildAt(1);  
            }*/
            
        }    
    
       function scorePage() {
           //
           
            _st.addChild(bg2);
            var r = new PIXI.Text('YOU WON',style);
            r.x = this.STAGE_WIDTH/2;
            r.y =  -50;
            r.anchor.set(0.5,0.5);
            stage.addChild(richText);            
        }
    
    
        spin.on('pointerdown', function() {
            console.log('so cold here');
            toss();
        });
    

    
        //_st.addChild(addSprite("bigwin-screen.jpg"));
    
        toss();
		
}




