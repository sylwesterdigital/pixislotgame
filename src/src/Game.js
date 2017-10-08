/**
*Class Game
*/
function Game(){
	this.SW=800; // Stage Width
	this.SH=480; // Stage Height
	this.stage;
    this._rs = PIXI.loader.resources;
}
/**
*Function called after the load of the images assets
*Can be emptied (or should ?) before starting the test
*/

/* So what people saying
- don't use the prototype to store static values
*/

Game.prototype.setup = function(){
    
        console.log('Game.prototype.setup');
    
        var _st = this.stage;
		var _SW = this.SW;
		var _SH = this.SH;
    
        var sc1 = new PIXI.Container();
        _st.addChild(sc1);
        sc1.alpha = 0;
    
        var sc2 = new PIXI.Container();
        _st.addChild(sc2);    
    
        this.addScene = function() {
            
            var bg1 = utils.addAtlasSprite("bigwin-screen.jpg");
            bg1.name = 'bg1';
            utils.scaleToStageH(bg1,_SW,_SH); 
            bg1.y = bg1.height*.5;
            bg1.x = bg1.width*.5;
            bg1.nscale = bg1.scale;
            bg1.anchor.set(0.5);
            
            var overlay1 = utils.addAtlasSprite("Overlay-FreeSpins.png");
            overlay1.name = "overlay1";
            utils.scaleToStageW(overlay1,_SW);
            overlay1.y = 60;
            
            var overlay2 = utils.addAtlasSprite("Overlay.png");
            overlay2.name = "overlay2";
            utils.scaleToStageW(overlay2,_SW);
            overlay2.scale.y = -1;
            overlay2.y = 420;
            
            var logo = utils.addAtlasSprite("Logo.png");
            utils.scaleToStageW(logo,_SW)	

            var spin = new PIXI.Sprite(this._rs.spin.texture);
            spin.name = 'spin';
            spin.x = _SW/2;
            spin.y = this.SH - spin.height*0.5 - 13;
            spin.scale.set(0.85)
            spin.anchor.set(0.5);
            spin.interactive = true;
            spin.buttonMode = true;

            sc1.addChild(bg1);
            sc1.addChild(overlay1);
            sc1.addChild(overlay2);	
            sc1.addChild(logo);	
            sc1.addChild(spin);
            
            // music
            var music = utils.getSound('music');
            music.volume = 0.35;
            if(music.isPlaying == false) {
                //music.play();
            }            

            spin.on('pointerdown', function() {
                var tl = new TimelineMax();
                var rsp = utils.rnd(0.06) - utils.rnd(0.06);
                console.log(bg1.scale)
                console.log(rsp)
                tl.from(spin, 2, {rotation:-Math.PI * 2 * 5,ease: Elastic.easeOut.config(1, 1)},"+=0");                
                tl.to(bg1.scale, 1, {x:0.8+rsp,y:0.8+rsp, ease:  Elastic.easeOut.config(1, 1)},"-=2");
                
                var g = utils.getSound('sound1');
                g.volume = 0.5;
                g.play();
                

                music.volume = 0.2;
                if(music.isPlaying == false) {
                    music.play();
                }
                
                //tl.to(bg1.scale, 1, {x:1,y:1, ease:  Elastic.easeOut.config(1, 1)},"-=1") 
            });
            
            var tl = new TimelineMax();
            tl.to(sc1, 0.2, {alpha:1},"+=0.1")
            tl.from(logo, 0.7, {y:-100},"-=0.1")            
            tl.from(spin.scale, 1, {x:0,y:0, ease: Elastic.easeOut.config(1, 0.3)},"-=0.4")
            
            //tl.from(spin, 0.2, {alpha:0},"+=0.1");
            
        }    
        
        this.showScore = function(num) {
            
            var sdata = data.items[num];
            
            if(data == undefined) {
                data = 1;
            }
           
            
            // stop the game pla
            
            // hide game play scene
            
            // display message and bigg
            
        
            // blur game scene
            var blurf1 = new PIXI.filters.BlurFilter();
            blurf1.blur = 0;
            sc1.filters = [blurf1]; 
            
            var c1 = sc1;
            var spin = utils.getSpriteByName(c1,"spin");
            spin.interactive = false;
            
            var msg1 = styles.createText(sdata.msg1);
            msg1.name = 'msg1';        
            msg1.anchor.set(0.5);
            msg1.x = _SW*.5;
            msg1.y = 120;

            var msg2 = styles.createText(sdata.points);
            msg2.name = 'msg2';        
            msg2.anchor.set(0.5);
            msg2.x = _SW*.5;
            msg2.y = 350;
            
            sc2.addChild(msg1);
            sc2.addChild(msg2);


            // show choosen symbol
            //var spritedata = data.inam+""+data.items[4].id+".png";
            //console.log(spritedata);
            var award = utils.addAtlasSprite(data.inam+""+sdata.id+".png");
            award.anchor.set(0.5);
            award.name = "award";
            award.x = _SW*.5;
            award.y = _SH*.5;
            award.scale.set(3);
            award.alpha = 0;            
            sc2.addChild(award);
            
            // animate transition in
            var tl = new TimelineMax();
            
            tl.to(spin,0.4, {alpha:0},"award+=0")
            // a little bit of testing
            .to(utils.getSpriteByName(c1,"overlay1"),0.5, {y:-200,alpha:0},"award+=0")
            .to(utils.getSpriteByName(c1,"overlay2"),0.5, {y:"+=200",alpha:1},"award+=0")
            
            //tl.to(blurf1, 0.2, {blur:5},"+=0.0");
            .to(award.scale, 3, {x:1.3,y:1.3, ease: Elastic.easeOut.config(0.5, 0.3)},"award+=0")
            .to(award, 1, {alpha:1},"award+=0")
            .from(msg1.scale, 1, {x:0,y:0, ease: Elastic.easeOut.config(0.5, 0.3)},"award+=0.2")
            .from(msg2.scale, 1, {x:0,y:0, ease: Elastic.easeOut.config(0.5, 0.3)},"award+=0.4")
            
            .to(utils.getSpriteByName(sc1,"bg1"), 3, {rotation:-Math.PI * 2 },"award+=0")
            .to(utils.getSpriteByName(sc1,"bg1").scale, 0.4, {x:1.4,y:2},"award+=0")
            .addCallback(function() {utils.getSound('death').play()}.bind(this), "award+=0.4")
            
            // play relevant sound for the winner
            //tl.call(utils.getSound('death').play(),"+=4");
            
        }
        
        this.backToGame = function() {
            
            // hide the score
            
            // build a game play scene again
            
            // launch game play 
            
            
            
            
            
            
        }
        
        
        
        this.addScene(); 
        
/*    
        function toss() {
            
            eraseToss();
            
            for(var i=0; i <5; i++) {
                var n = Math.ceil(Math.random()*12);
                var r = 'symbol'+n+'.png';

                var s = new PIXI.Sprite(_rs.atlas["textures"][r]);
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
            }
            
        }    
    
       function scorePage() {
           //
           
            _st.addChild(bg2);
            var r = new PIXI.Text('YOU WON',style);
            r.x = _SW/2;
            r.y =  -50;
            r.anchor.set(0.5,0.5);
            stage.addChild(richText);            
        }
    
    
        spin.on('pointerdown', function() {
            console.log('so cold here');
createjs.Sound.play('sound3')            
            toss();
        });
    

    
        //_st.addChild(addSprite("bigwin-screen.jpg"));
    
        toss();*/
    
    

    //music.play();
    


		
}




