var initMovers = function(stage, doesBounce){

	var movers = [
		//アルミ
		new Mover(stage, 
			27, //質量
			2.7, //密度
			new Vector(40,50), //初期位置
			new Vector(0, 0), //速度
			new Vector(0, 0) //加速度
		),
		//鉄
		new Mover(stage, 
			78.7, //質量
			7.87, //密度
			new Vector(190,50), //初期位置
			new Vector(0, 0), //速度
			new Vector(0, 0) //加速度
		),
		//金
		new Mover(stage, 
			193, //質量
			19.3, //密度
			new Vector(340,50), //初期位置
			new Vector(0, 0), //速度
			new Vector(0, 0) //加速度
		),
	];
	
	if(doesBounce){
		_.each(movers, function(mover){
			mover.setBounce(true);	
		});
	}
	
	return movers;
	
}

