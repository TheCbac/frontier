globalWindowX=null;
globalWindowY=null;
globalAspectRatio=null;
globalTileState=null;

updateWindowSize = function(){
	globalWindowY = window.innerHeight;
	globalWindowX = window.innerWidth;

	var pastAspectRatio = globalAspectRatio;
	globalAspectRatio = globalWindowX/globalWindowY;

	// Deal with initial state
	if (pastAspectRatio === null){
		pastAspectRatio = globalAspectRatio;

		if (globalAspectRatio >=1 ){
			globalTileState =2;
			eventHandler.emit("tileState2");
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
		}
	}
	
	// If there was a transition over 1, change the globalTileState
	if (globalAspectRatio >= 1 && pastAspectRatio < 1 ) {
		eventHandler.emit("tileState2");
		globalTileState =2;
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


screenSize = function(){
	return [window.innerWidth, window.innerHeight];
};