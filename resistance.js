var Resistance;

(function(){
	
	Resistance = function(stage, x, y, w, h, coefficient, color){
		
		//init cjs objects
		this._stage = stage;
		this._graphics = new createjs.Graphics();
		this._shape = new createjs.Shape(this._graphics);
		this._stage = stage;
		this._stage.addChildAt(this._shape, 0);
		
		this._location = new Vector(x, y);
		this._size = new Vector(w, h);
		this._coefficient = coefficient;
		this._color = color;
		
	};
	
	Resistance.prototype = {
		
		'getLocation':function(){
			return this._location;	
		},
		
		'getSize':function(){
			return this._size;	
		},
		
		'getCoefficient':function(){
			return this._coefficient;	
		},
		
		'draw':function(){
			
			this._graphics.beginFill(createjs.Graphics.getRGB(this._color.r, this._color.g, this._color.b)).
			dr(this._location.x, this._location.y, this._size.x, this._size.y)
			.endFill();
			
		},
		
	};
	
})();