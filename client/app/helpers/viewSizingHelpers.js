globalWindowX=null;
globalWindowY=null;
globalAspectRatio=null;
globalTileState=null;
globalGridX = null;
globalGridY = null;
globalTileNum = 4;


updateWindowSize = function(){
	globalWindowY = window.innerHeight;
	globalWindowX = window.innerWidth;

	var pastAspectRatio = globalAspectRatio;
	globalAspectRatio = globalWindowX/globalWindowY;

	// Deal with initial state
	if (pastAspectRatio === null || globalGridX === null){
		pastAspectRatio = globalAspectRatio;

		if (globalAspectRatio >=1 ){
			// If Y is < 530 px, stay in one tile
			if (globalWindowY <= 530){
				eventHandler.emit("tileState1");
				globalTileState= 1;
			}

			else{
				globalTileState =2;
				eventHandler.emit("tileState2");
			}

			globalGridX =globalTileNum;
	 		globalGridY =1;
	 
		}

		else {
			if ( globalWindowY >= 1000 ){
				eventHandler.emit("tileState2");
				globalTileState= 2;
			}

			else {
				eventHandler.emit("tileState1");
				globalTileState= 1;
				}

			globalGridX = 1;
			globalGridY = globalTileNum;

		}
	}
	
	// If there was a transition over 1, change the globalTileState
	if (globalAspectRatio >= 1 && pastAspectRatio < 1 ) {
		
		// simplistic way of avoiding overflow bug
		if (scroll.getPosition() > 266){
			// console.log("Over Screen");
			scroll.setPosition(100);
		}
		if (globalWindowY <= 530){
				eventHandler.emit("tileState1");
				globalTileState= 1;
		}
		else{
			eventHandler.emit("tileState2");
			globalTileState =2;
		}

		globalGridX =globalTileNum;
	 	globalGridY =1;
	}

	else if(globalAspectRatio < 1 && pastAspectRatio >= 1){
		// don't resive if screen is more that 1000 px high
		if ( globalWindowY >= 1000 ){
			eventHandler.emit("tileState2");
			globalTileState= 2;
		}

		else {
			eventHandler.emit("tileState1");
			globalTileState= 1;
		}

		globalGridX = 1;
		globalGridY = globalTileNum;


	}
};



dynamicScale= function(imageX, imageY) {	
// function dynamicScale(imageX, imageY){
	/* Image size in pixels */
	var imageAspect = imageX/imageY;

	// /* User's screen size in pixels */
	var windowX = globalWindowX;
	var windowY = globalWindowY;
	var windowAspect = globalAspectRatio;

	/* return values */
	var width;
	var height;

	/* if screen is too wide for image */
	if (windowAspect > imageAspect){
		/* Size to X, scale to Y */
		width = windowX;
		height = imageY/imageX * windowX; 
	}

	/* If screen is too tall for image */
	else {
		/* Size to Y, scale to X */
		width = imageX/imageY * windowY;
		height = windowY;

	}
	return [width, height];
};


dynamicScale2= function(imageX, imageY, windowX, windowY) {	
// function dynamicScale(imageX, imageY){
	/* Image size in pixels */
	var imageAspect = imageX/imageY;

	// /* User's screen size in pixels */
	// var windowX = globalWindowX;
	// var windowY = globalWindowY;
	// var windowAspect = globalAspectRatio;

	var windowAspect = windowX/windowY;

	/* return values */
	var width;
	var height;

	/* if screen is too wide for image */
	if (windowAspect > imageAspect){
		/* Size to X, scale to Y */
		width = windowX;
		height = imageY/imageX * windowX; 
	}

	/* If screen is too tall for image */
	else {
		/* Size to Y, scale to X */
		width = imageX/imageY * windowY;
		height = windowY;

	}
	return [width, height];
};


screenSize = function(){
	return [window.innerWidth, window.innerHeight];
};