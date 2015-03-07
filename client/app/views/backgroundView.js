var ImageSurface 		= require('famous/surfaces/ImageSurface');
var StateModifier   	= require('famous/modifiers/StateModifier');
var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Modifier 			= require('famous/core/Modifier');

backgroundImage = function() {

	/* First slide view */
		var imageView = new View({
	});

	var viewModifier = new Modifier({
		 size:[window.innerWidth,window.innerHeight]
	});


	/* Background image */
	var backgroundImage = new ImageSurface({
		content:"/pictures/forest-landscape.jpeg",
		// size:[true,undefined]
		// size:[undefined,true]
	});

	var backgroundImageMod = new Modifier({
		
		align: [0.5,1.0],
		origin: [0.5,1.0]
	});


	/* Pull down image */
	var pullDownImage = new ImageSurface({
		content:"/pictures/pulldown.png",
		size: [50, true]
	});

	var pullDownImageMod = new  Modifier({
		origin: [0.5,1.0],
		align: [0.5,0.95]
	});


	/* Frontier Logo */
	var frontierImage = new ImageSurface({
		content:"/pictures/frontier.png"
	});

	var frontierImageMod = new Modifier({
		size:[315,true],
		align:[0.5, 0.4],
		origin:[0.5, 0.5]
	});

	/* Upper left Logo */
	var frontierArrows = new ImageSurface({
		content:"/pictures/frontier-arrows.png",
	});

	var frontierArrowsMod = new Modifier({
		size: [45,true],
		origin:[0, 0],
		align:[0.02, 0.02],
	});

	/* Hamburger Logo */
	var hamburgerImage = new ImageSurface({
		content: "/pictures/hamburger.png"
	});

	var hamburgerImageMod = new Modifier({
		size: [true,30],
		origin:[1.0, 0],
		align:[0.9, 0.05],
	});


	/* Oregon 2015 */
	var oregonTextImage = new ImageSurface({
		content: "/pictures/oregon2015mockup.png"
	});

	var oregonTextImageMod = new Modifier({
		size: [150, true],
		origin:[0.5, 0.5],
		align:[0.5, 0.5],
	});



	/* Background Image sizing Algorithm */
	backgroundImageMod.sizeFrom(function(){
		/* Image size in pixels */
		var imageX = 2200.0;
		var imageY = 1394.0;
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

	});

	sizeNode = imageView.add(viewModifier);
	sizeNode.add(oregonTextImageMod).add(oregonTextImage);
	sizeNode.add(hamburgerImageMod).add(hamburgerImage);
	sizeNode.add(frontierArrowsMod).add(frontierArrows);
	sizeNode.add(pullDownImageMod).add(pullDownImage);
	sizeNode.add(frontierImageMod).add(frontierImage);
	sizeNode.add(backgroundImageMod).add(backgroundImage);

	// return sizeNode;
	return imageView;
};