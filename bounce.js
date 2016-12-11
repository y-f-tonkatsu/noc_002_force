$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	
	var movers = initMovers(stage, true);
	
	createjs.Ticker.framerate = 30;
	
	var noiseSeed = 0;
	
	createjs.Ticker.addEventListener('tick', function(e){
		
		noiseSeed += 0.01;
		var wind = 100 * (0.5 - noise(noiseSeed));
		
		var g = 9.8 * e.delta * 0.001;
		
		_.each(movers, function(mover){
			var m = mover.getMass();
			mover.applyForce(new Vector(wind, m * g));
			mover.update();	
		});
		
		
		stage.update(e);
		
	});
	
});