/**
 *Class Utils
 */
function Utils() {
    this._rs = PIXI.loader.resources;
}

Utils.prototype.ifmp3 = function () {
    var a = document.createElement('audio');
    var r = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    var f;
    if (r == true) {
        f = '.mp3';
    } else {
        f = 'ogg';
    }
    return f;
}

Utils.prototype.scaleToStageW = function (r, w) {
    r.width = w;
    r.scale.y = r.scale.x;
}

// some simple methods
Utils.prototype.addAtlasSprite = function (id) {
    var r = new PIXI.Sprite(this._rs.atlas["textures"][id]);
    //console.log(id, r.width, 'x', r.height);
    return r;
}

Utils.prototype.scaleToStageH = function (r, w, h) {
    r.height = h;
    r.width = w;//r.scale.x = r.scale.y;
}

Utils.prototype.stopMusic = function () {

}

Utils.prototype.getSound = function (id) {
    var r = this._rs[id].sound;
    return r;
}

Utils.prototype.capturePos = function (c) {
    //console.log(c.name)
    for(var i=0; i<c.children.length; i++) {
        var r = c.getChildAt(i);
        r.ox = r.x;
        r.oy = r.y;
        r.owidth = r.width;
        r.oheight = r.height;
        r.oscale = r.scale;
        r.orotation = r.rotation;
        r.oalpha = r.alpha;
        //console.log(i,r.name,r.x,r.y,r.width,r.height,r.rotation,r.alpha,r.scale.x,r.scale.y);
    }
}




Utils.prototype.playMusic = function () {
    var music1 = this._rs.music.sound;
    music1.play();
    TweenLite.from(music1, 3, {
        volume: 0
    })
}

Utils.prototype.rnd = function (v) {
    var r = Math.random()*v;
    return r;
}

Utils.prototype.getSpriteByName = function(c,n) {
    var k = c.children.length+1;
    var i = 0;
    while(--k) {
        //console.log(c.getChildAt(k-1).name,k)
        var r = c.getChildAt(k-1);
        var p;
        //console.log(k,r.name)
        if (r.name == n) {
            p = k-1;
        }
        i++

    }
    //console.log('--')
    return c.getChildAt(p);
}

Utils.prototype.shuffle = function(array) {
    var cidx = array.length;
    var tv;
    var ridx;
    while (0 !== cidx) {
        ridx = Math.floor(Math.random() * cidx);
        cidx -= 1;
        tv = array[cidx];
        array[cidx] = array[ridx];
        array[ridx] = tv;
    }
    return array;
}

Utils.prototype.createPool = function(obj) {
    var l = obj.length;
    var bigarr = new Array();    
    for(var i=0; i<l; i++) {
        var ra = this['ra'+i];
        ra = new Array(obj[i].basket)
        ra.fill(obj[i].id);
        bigarr.push.apply(bigarr,ra);
    }
    return bigarr;
}

Utils.prototype.setIntervalX = function(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
       callback();
       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}











