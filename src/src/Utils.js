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
    console.log(id, r.width, 'x', r.height);
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
    var k = c.children.length;
    var i = 0;
    while(--k) {
        i++
        var r = c.getChildAt(k);
        var p;
        if (r.name == n) {
            p = k
        }                
    }
    return c.getChildAt(p);
}





