$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	
	var movers = initMovers(stage);
	
	_.each(movers, function(mover){
		mover.applyForce(new Vector(5, 20));	
	});
	
	createjs.Ticker.framerate = 30;
	
	createjs.Ticker.addEventListener('tick', function(e){
		
		_.each(movers, function(mover){
			mover.update();	
		});
		stage.update(e);
		
	});
	
});