var View 				= require('famous/core/View');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');

TitleView =function() {
	View.apply(this, arguments);

	// this.imageSurface = new ImageSurface({
	// 	content: "/pictures/CraigCheney.jpg",
	// 	size : [100, true],
	// });
	
	// this.add(this.imageSurface);
	// this.imageSurface.pipe(this._eventOutput);

	this.viewModifier = new Modifier({
		size:[window.innerWidth, window.innerHeight]
	});

	/******************* Background image ************************/
	this.backgroundImage = new ImageSurface({
		content:"/pictures/forest-landscape.jpeg",
	});

	this.backgroundImageMod = new Modifier({
		
		align: [0.5,1.0],
		origin: [0.5,1.0]
	});

	/* Background Image sizing Algorithm */
	this.backgroundImageMod.sizeFrom(function(){
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

	this.viewNode = this.add(this.viewModifier);
	this.viewNode.add(this.backgroundImageMod).add(this.backgroundImage);
	this.backgroundImage.pipe(this._eventOutput);
	/******************************************************************/


	/******************* Pulldown arrow image ************************/
	this.pullDownImage = new ImageSurface({
		content:"/pictures/pulldown.png",
		size: [50, true]
	});

	this.pullDownImageMod = new  Modifier({
		origin: [0.5,1.0],
		align: [0.5,0.95]
	});

	this.viewNode.add(this.pullDownImageMod).add(this.pullDownImage);
	this.pullDownImage.pipe(this._eventOutput);
	/******************************************************************/


	/******************* Frontier Logo Image ************************/
	this.frontierImage = new ImageSurface({
		content:"/pictures/frontier.png"
	});

	this.frontierImageMod = new Modifier({
		size:[315,true],
		align:[0.5, 0.4],
		origin:[0.5, 0.5]
	});

	this.viewNode.add(this.frontierImageMod).add(this.frontierImage);
	this.frontierImage.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Upper left Logo ************************/
	this.frontierArrows = new ImageSurface({
		content:"/pictures/frontier-arrows.png",
	});

	this.frontierArrowsMod = new Modifier({
		size: [45,true],
		origin:[0, 0],
		align:[0.02, 0.02],
	});

	this.viewNode.add(this.frontierArrowsMod).add(this.frontierArrows);
	this.frontierArrows.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Upper right hamburger ************************/	
	this.hamburgerImage = new ImageSurface({
		content: "/pictures/hamburger.png"
	});

	this.hamburgerImageMod = new Modifier({
		size: [true,30],
		origin:[1.0, 0],
		align:[0.9, 0.05],
	});
	this.viewNode.add(this.hamburgerImageMod).add(this.hamburgerImage);
	this.hamburgerImage.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Oregon 2015 text *****************************/
	this.oregonTextImage = new ImageSurface({
		content: "/pictures/oregon2015mockup.png"
	});

	this.oregonTextImageMod = new Modifier({
		size: [150, true],
		origin:[0.5, 0.5],
		align:[0.5, 0.5],
	});

	this.viewNode.add(this.oregonTextImageMod).add(this.oregonTextImage);
	this.oregonTextImage.pipe(this._eventOutput);
	/******************************************************************/	


};

TitleView.prototype = Object.create(View.prototype);
TitleView.prototype.constructor = TitleView;
TitleView.DEFAULT_OPTIONS = {};

