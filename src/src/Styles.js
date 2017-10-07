/**
 *Class Styles
 */
function Styles() {
    
}

Styles.prototype.createText = function(str) {
    
		var style = new PIXI.TextStyle({
			fontFamily: 'Comic Sans MS',
			fontSize: 34,
			fontStyle: 'normal',
			fontWeight: 'bold',
			fill: ['#fcecfc', '#fb955e', '#ff7cd8'], // gradient
			stroke: '#4a1850',
			strokeThickness: 5,
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 2,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
			wordWrap: true,
			wordWrapWidth: 440
		});
    
        var richText = new PIXI.Text(str, style);
        return richText;
    
}

