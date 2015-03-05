var ImageSurface 		= require('famous/surfaces/ImageSurface');
var StateModifier   	= require('famous/modifiers/StateModifier');
var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Modifier 			= require('famous/core/Modifier');

backgroundImage = function() {

	var imageBlock = new ImageSurface({
		content:"/pictures/forest-landscape.jpeg",
		// size:[true,undefined]
		// size:[undefined,true]
	});

	var mySurface = new Surface ({
		content:"Hello",
	
		properties :{
			backgroundColor: "red",
		}
	});

	var imageModifier = new Modifier({
		size:[100, 100],
		align: [0.5,1.0],
		origin: [0.5,1.0]
	});

	var imageView = new View({
	});

	var viewModifier = new Modifier({
		 //size:[undefined,undefined]
	});



	var backgroundMod = new Modifier({
		
		align: [0.5,1.0],
		origin: [0.5,1.0]
	});


	backgroundMod.sizeFrom(function(){
		var imageX = 2200.0;
		var imageY = 1394.0;
		var imageAspect = imageX/imageY;

		var windowX = window.innerWidth * 1.0;
		var windowY = window.innerHeight * 1.0;

		var windowAspect = (windowX/windowY);

		var width;
		var height;

		if (windowAspect > imageAspect){
			width = windowX;
			height = imageY/imageX * windowX; 
		}

		else {
			width = imageX/imageY * windowY;
			height = windowY;

		}

		return [width, height];

	});

	sizeNode = imageView.add(viewModifier);
	sizeNode.add(imageModifier).add(mySurface);
	sizeNode.add(backgroundMod).add(imageBlock);

	return sizeNode;
	// return imageView;
};