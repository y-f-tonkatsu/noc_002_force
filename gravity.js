$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	
	var movers = initMovers(stage);
	
	createjs.Ticker.framerate = 30;
	
	createjs.Ticker.addEventListener('tick', function(e){
		
		var g = 9.8 * e.delta * 0.001;
		
		_.each(movers, function(mover){
			var m = mover.getMass();
			mover.applyForce(new Vector(0, m * g));
			mover.update();	
		});
		
		stage.update(e);
		
	});
	
});