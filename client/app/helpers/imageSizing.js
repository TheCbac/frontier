dynamicScale= function(imageX, imageY) {	
// function dynamicScale(imageX, imageY){
	/* Image size in pixels */
	var imageAspect = imageX/imageY;

	/* User's screen size in pixels */
	var windowX = window.innerWidth * 1.0;
	var windowY = window.innerHeight * 1.0;
	var windowAspect = (windowX/windowY);

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