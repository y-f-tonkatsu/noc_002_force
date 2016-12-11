$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	
	var movers = initMovers(stage, true);
	
	var sky = new Resistance(stage, 0, 0, stage.canvas.width, stage.canvas.height * 0.85, 0.01, {r:200, g:200, b:230});
	var sea = new Resistance(stage, 0, stage.canvas.height * 0.85, stage.canvas.width, stage.canvas.height * 0.15, 0.44, {r:180, g:180, b:250});
	
	var resistances = [sky, sea];
	
	var noiseSeed = 0;
	
	createjs.Ticker.framerate = 30;
		
	createjs.Ticker.addEventListener('tick', function(e){
		
		stage.clear();
		
		_.each(resistances, function(resistance){
			resistance.draw();
		});

		noiseSeed += 0.01;
		var wind = 100 * (0.5 - noise(noiseSeed));
		
		var g = 9.8 * e.delta * 0.001;
		
		_.each(movers, function(mover){
			
			_.each(resistances, function(resistance){
				if(mover.isInside(resistance.getLocation(), resistance.getSize())){
					mover.drag(resistance.getCoefficient());
				}
			});
			
			var m = mover.getMass();
			mover.applyForce(new Vector(wind, m * g));
			mover.update();	
		});
		
		
		stage.update(e);
		
	});
	
});