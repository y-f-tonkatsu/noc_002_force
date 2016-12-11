var Mover;

(function(){
	
	Mover = function(stage, mass, density, loaction, velocity, acceleration, bounce){
		
		this._location = loaction || new Vector(0, 0);
		this._velocity = velocity || new Vector(1, 1);
		this._acceleration = acceleration || new Vector(0, 0);
		this._mass = mass || 10;
		this._density = density || 10;
		
		this._blur = false;
		this._blurs = [];
		
		//init cjs objects
		this._graphics = new createjs.Graphics();
		this._shape = new createjs.Shape(this._graphics);
		this._stage = stage;
		this._stage.addChild(this._shape);
		
		this._stageSize = new Vector(this._stage.canvas.width, this._stage.canvas.height);
		
		this._bounce = bounce || false;
		
	};
	
	Mover.prototype = {
		
		'setBounce':function(v){
			
			this._bounce = v;
			
		},
		
		'clear':function(){
			
			this._graphics.clear();
			this._stage.removeAllChildren();
			this._stage.update();
			
		},
		
		'isUnder':function(axis){
			return this._location[axis] - this.getRadius() < 0;
		},
		
		'isOver':function(axis){
			return this._location[axis] + this.getRadius() > this._stageSize[axis];
		},
		
		'isInside':function(location, size){
			return (this._location.x >= location.x &&
				   this._location.x <= location.x + size.x) &&
				(this._location.y >= location.y &&
				 this._location.y <= location.y + size.y);
		},
		
		'getMass':function(){
			
			return this._mass;
			
		},
		
		'getRadius':function(){
			
			return this._mass / this._density;
			
		},
		
		'setVelocityTo':function(v){
			
			this._velocity = this._location.dir(v).mult(this._location.dist(v) * 0.1);
			
		},
		
		'setAccelerationTo':function(v){
			
			this._velocity.mult(0.95);
			this._acceleration = this._location.dir(v).mult(this._location.dist(v) * 0.01);
			
		},
		
		'update':function(){
			
			this._acceleration.div(this._mass);
			
			this._velocity.add(this._acceleration);
			if(this._blur){this.setBlurs();}
			this._location.add(this._velocity);
						
			if(this._bounce){
				_.each(['x', 'y'], _.bind(function(axis){
					if(this.isOver(axis)){
						this._velocity[axis] *= -1;
					}
					if(this.isUnder(axis)){
						this._velocity[axis] *= -1;

					}
				}, this));
			}
			
			this.draw();
			
			this.clearForce();
			
		},
		
		'setBlurs':function(){
			
			var numBlurs = Math.floor(this._velocity.mag() * 0.5);
			this._blurs = _.map(_.range(numBlurs), _.bind(function(current){
				var position = Math.pow((current) / numBlurs, 2);
				var alpha = position * 0.4;
				return {
					'location': new Vector(
						this._location.x + this._velocity.x * position,
						this._location.y + this._velocity.y * position
					),
					'alpha': alpha
				};
			}, this));
			
		},
		
		'drawBlurs':function(){
			
			_.each(this._blurs, _.bind(function(blur){
				this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, blur.alpha)).
				dc(blur.location.x, blur.location.y, this.getRadius())
				.endFill();
			}, this));
			
		},
		
		'setBlurOn':function(){
			this._blur = true;
		},
		
		'getResidueLocation':function(){
			return Vector.sub(this._location, new Vector(
				Math.floor(this._location.x / this._stageSize.x) * this._stageSize.x,
				Math.floor(this._location.y / this._stageSize.y) * this._stageSize.y
			));
		},
		
		'getBounceLocation':function(){
			
			var location = this._location.clone();
			
			_.each(['x', 'y'], _.bind(function(axis){
				if(this.isOver(axis)){
					location[axis] = this._stageSize[axis] - this.getRadius();

				}
				if(this.isUnder(axis)){
					location[axis] = this.getRadius();
				}
			}, this));
			
			return location;
			
		},
		
		'draw':function(){
			
			var location;
			
			if(this._bounce){
				location = this.getBounceLocation();
			} else {
				//画面外に出た場合、反対側から出てくる
				location = this.getResidueLocation();
			}
			
			this._graphics.clear();
			
			if(this._blurs && this._blurs.length > 1){this.drawBlurs()}
			
			this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0)).
			dc(location.x, location.y, this.getRadius())
			.endFill();
		},
		
		'applyForce':function(force){
			this._acceleration.add(force);
		},
			
		'drag':function(coefficient){
			var speed = this._velocity.mag();
			var dragMag = (Math.pow(speed, 2)) * coefficient;
			var dir = this._velocity.clone().normalize();
			var force = dir.mult(-1).mult(dragMag);
			this.applyForce(force);
		},
			
		'clearForce':function(force){
			this._acceleration.mult(0);
		}
			
	};
	
})();