/**
*Class Game
*/
function Game(){
	
    this.SW=800; // Stage Width
	this.SH=480; // Stage Height
	this.stage;
    this.itemsPos = 0;
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
    
        // scene for gameplay
        var sc1 = new PIXI.Container();
        sc1.name = "scene1";
        _st.addChild(sc1);
        sc1.alpha = 0;

        var sc3 = new PIXI.Sprite();
        sc3.name = "scene3";
        //sc3.width = _SW;
        //sc3.height = _SH;
        //sc3.x = 0;
        //sc3.y = 0;    
        //sc3.anchor.set(0.5)
    
        _st.addChild(sc3);
        
        // scene for score
        var sc2 = new PIXI.Container();
        sc2.name = "scene2";    
        _st.addChild(sc2);    
        //
    
        //
        this.basket = utils.shuffle(utils.createPool(data.items));
        var basket = this.basket;
        
    
        this.addScene = function() {
            
            // building game play scene
            
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
            logo.name = "logo";
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
                //console.log(bg1.scale)
                //console.log(rsp)
                tl.from(spin, 2, {rotation:-Math.PI * 2 * 5,ease: Elastic.easeOut.config(1, 1)},"+=0");                
                tl.to(bg1.scale, 1, {x:0.8+rsp,y:0.8+rsp, ease:  Elastic.easeOut.config(1, 1)},"-=2");
                
                var g = utils.getSound('sound1');
                g.volume = 0.5;
                g.play();
                

                music.volume = 0.2;
                if(music.isPlaying == false) {
                    //--- annoying music
                    //music.play();
                }
                
                game.animateCycle();                
                
                //tl.to(bg1.scale, 1, {x:1,y:1, ease:  Elastic.easeOut.config(1, 1)},"-=1") 
            });
            
            var tl = new TimelineMax();
            tl.to(sc1, 0.2, {alpha:1},"+=0.1")
            tl.from(logo, 0.7, {y:-100},"-=0.1")            
            tl.from(spin.scale, 1, {x:0,y:0, ease: Elastic.easeOut.config(1, 0.3)},"-=0.4");
            
            this.showItems();
            
            //tl.from(spin, 0.2, {alpha:0},"+=0.1");
            
        }    

        this.drawAwardSquare = function(t) {
            var gr = new PIXI.Graphics();
            gr.lineStyle(2, 0xFF00FF, 1);
            gr.beginFill(0xFF00BB, 0.25);
            gr.drawRoundedRect(0, 0, 120, 200, 15);
            gr.endFill();
            t.addChild(gr);
        }
        
        
        this.showScore = function(sdata) {
                    
            sc1.filters = [styles.blurf1]; 
            
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
            var award = utils.addAtlasSprite(sdata.frame);
            award.anchor.set(0.5);
            award.name = "award";
            award.x = _SW*.5;
            award.y = _SH*.5;
            award.scale.set(3);
            award.alpha = 0;            
            sc2.addChild(award);
            
            var scene3 = utils.getSpriteByName(_st,"scene3");

            //console.log(scene3.pivot)
            // capture scene
            utils.capturePos(game.stage.getChildAt(0));
            
            // animate transition in
            var tl = new TimelineMax();
            
            //
            
            tl.to(scene3, 0.3, {alpha:0},"award+=0")
            
            .to(spin,0.4, {alpha:0},"award+=0")
            
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
            .addCallback(function() {game.backToGame();}.bind(this), "+=1")
            
            // play relevant sound for the winner
            //tl.call(utils.getSound('death').play(),"+=4");
            
        }

        
       this.showItemsUpdated = function() {
           
            // remove this element from game.basket
            game.basket.splice(game.itemsPos+2,1);
            game.basket = utils.shuffle(game.basket);          
           
            game.itemsPos = 0;
           
            for (var i = sc3.children.length - 1; i >= 0; i--) {	         sc3.removeChild(sc3.children[i]);
            };           

            var tl = new TimelineMax();

            for(var i=0; i <5; i++) {

                var n = basket[i];
                var r = 'symbol'+n+'.png';
 
                var s = utils.addAtlasSprite(r);
                s.scale.x = 0.65;
                s.scale.y = s.scale.x;
                s.dscale = s.scale;
                s.anchor.set(0.5);
                s.x = 160 + (i * 120);
                s.y = 215;
                s.idn = n;
                
                //console.log(game.getSymbolData(data.items,s.idn));
                
                sc3.addChild(s);

                tl.from(s, 0.5, {x:500},"show3+=0.5")
                .from(s.scale, 0.2, {y:0, x:0, ease: Elastic.easeOut.config(1,1)},"show3+=0.6") 

            }
        }                
        
        
        
        this.clearScoreScene = function(ar) {
            console.log('clear')
            for(var i=0; i<ar.length; i++) {
                var r = ar[i].destroy();
            }
            
        }
        
        this.showItems = function() {

            var tl = new TimelineMax();

            for(var i=0; i <5; i++) {

                var n = basket[i];
                var r = 'symbol'+n+'.png';
                

                var s = utils.addAtlasSprite(r);
                s.scale.x = 0.65;
                s.scale.y = s.scale.x;
                s.dscale = s.scale;
                s.anchor.set(0.5);
                s.x = 160 + (i * 120);
                s.y = 215;
                s.idn = n;
                
                //console.log(game.getSymbolData(data.items,s.idn));
                
                sc3.addChild(s);

                //tl.from(s.scale, 0.5, {y:-s.dscale, x:-s.dscale},"+=0")
                tl.from(s.scale, 0.2, {y:0, x:0, ease: Elastic.easeOut.config(1,1)},"-=0.1") 

            }
        }        
        
        
        this.animateCycleEnd = function() {
                        
            var spin = utils.getSpriteByName(sc1,"spin");
            spin.interactive = true;
            
            
            var scene3 = utils.getSpriteByName(_st,"scene3");
            
            var d = scene3.children[3].data;
            
            
            var tl = new TimelineMax();
            tl.addCallback(function() {game.showScore(d);}.bind(this), "+=2")
            
            //console.log(scene3.children[3].data);
            
            
        }

        
        this.animateCycle = function() {
            
            //utils.setIntervalX(this.animateItems,400,15)
            
            
            var spin = utils.getSpriteByName(sc1,"spin");
            spin.interactive = false;
            
            var delay = 400;
            var repetitions = 15;
            var x = 0;
            var intervalID = window.setInterval(function () {
               game.animateItems();
               if (++x === repetitions) {
                   window.clearInterval(intervalID);
                   game.animateCycleEnd();
               }
            }, delay);            
            
        }

        
        
        
        
        this.animateItems = function() {
            
            
            
            // animate
            var tl = new TimelineMax();

           for(var i=0; i <5; i++) {
               var r = sc3.getChildAt(i);
               
               if(i == 0) {
                tl.to(r.scale, 0.2, {x:0,y:0},"mov+=0.1")
               } else {
                tl.to(r, 0.2, {x:"-="+120},"mov+=0.1")
               }
            }
            
            tl.addCallback(function() { 
                
            sc3.getChildAt(0).destroy(); }.bind(this), "mov+=0.3")

            var n = basket[game.itemsPos+5];
            var d = game.getSymbolData(data.items,game.basket[game.itemsPos+5]);
            var r = d.frame;
            
            var i = 4;

            var s = utils.addAtlasSprite(r);
            s.scale.x = 0.65;
            s.scale.y = s.scale.x;
            s.dscale = s.scale;
            s.anchor.set(0.5);
            s.x = 160 + (i * 120);
            s.y = 215;
            s.data = d;

            sc3.addChild(s);

            tl.from(s.scale, 0.2, {y:0, x:0, ease: Elastic.easeOut.config(1,1)},"-=0.1")
            
            game.itemsPos +=1;
             
        }
        
        this.getSymbolData = function(obj,id) {
            var l = obj.length;
            var nid;
            for(var i=0; i <obj.length; i++) {
                var r = obj[i];
                if(r.id == id) {
                    nid = i;
                    //console.log(id,'is located at',i)
                }
            }
            return obj[nid];
        }
        
        this.rebuildItems = function() {
            
            //
            
            
        }
        
        
        
        this.backToGame = function() {
            
            var tl = new TimelineMax();
            
            var spin = utils.getSpriteByName(sc1,"spin");
            var overlay1 = utils.getSpriteByName(sc1,"overlay1");
            var overlay2 = utils.getSpriteByName(sc1,"overlay2");
            var bg1 = utils.getSpriteByName(sc1,"bg1");
            var msg1 = utils.getSpriteByName(sc2,"msg1");
            var msg2 = utils.getSpriteByName(sc2,"msg2");
            var award = utils.getSpriteByName(sc2,"award");
            var scene3 = utils.getSpriteByName(_st,"scene3");
            
            game.showItemsUpdated();
            
            
            tl.to(spin,0.4, {alpha:spin.oalpha},"back+=0")
            .to(scene3, 0.3, {alpha:1},"back+=0")
            
            .to(overlay1,0.5, {y:overlay1.oy,alpha:overlay1.oalpha},"back+=0")
            .to(overlay2,0.5, {y:overlay2.oy,alpha:overlay2.oalpha},"back+=0")            
            .to(bg1.scale, 3, {x:bg1.oscale.x, y:bg1.oscale.y},"back+=0")
            .to(bg1, 1, {width:bg1.owidth,height:bg1.oheight},"back+=0")
            
            .to(msg1, 2, {x:-_SW+100,ease: Elastic.easeInOut.config(1, 1)}, "back+=0")
            .to(award, 1.5, {x:-_SW+100,ease: Elastic.easeInOut.config(1, 1)},"back+=0.1")
            .to(msg2, 1, {x:-_SW+100,ease: Elastic.easeInOut.config(1, 1)}, "back+=0.2")
            .addCallback(function() { 
                this.clearScoreScene([msg1,msg2,award]);
                var spin = utils.getSpriteByName(sc1,"spin");
                spin.interactive = true;            
            }.bind(this), "back+=2.5")
            
        }
        
        this.addScene(); 
		
}




