globalWindowX=100;
globalWindowY=100;
globalAspectRatio=1;

updateWindowSize = function(){
	globalWindowY = window.innerHeight;
	globalWindowX = window.innerWidth;
	globalAspectRatio = globalWindowX/globalWindowY;
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

// Used for determining the size of the balck and white tiles 
determineTileHeight =function(){

	if (globalAspectRatio >=1){
		//console.log(globalWindowY);
		//eventHandler.emit("tile2");
		return 2;
	}

	else{
		return 1;
	}
};

screenSize = function(){
	return [window.innerWidth, window.innerHeight];
};