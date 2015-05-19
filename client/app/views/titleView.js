var View 				= require('famous/core/View');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var EventHandler 		= require('famous/core/EventHandler');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');

TitleView =function() {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
		// overflow:"auto"
	});

	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowY];
	});

	this.viewNode = this.add(this.viewModifier);

	

	/******************* Background image ************************/
	this.backgroundImage = new ImageSurface({
		content:"/pictures/forest-landscape.jpeg",
	});

	this.backgroundImageMod = new Modifier({
		
		align: [0.5,1.0],
		origin: [0.5,1.0],
		transform: Transform.translate(0,0,-1)
	});


	/* Background Image sizing Algorithm */
	this.backgroundImageMod.sizeFrom( function(){
		return dynamicScale(2200,1394);
	});


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
		align: [0.5,0.95],
		transform: Transform.translate(0,0,1),
	});

	this.viewNode.add(this.pullDownImageMod).add(this.pullDownImage);
	this.pullDownImage.pipe(this._eventOutput);

	//var eventHandler = new EventHandler();
	this.pullDownImage.on('click', function(event){
		eventHandler.emit('pullDownClicked');
	});
	/******************************************************************/


	/******************* Frontier Logo Image ************************/
	this.frontierImage = new ImageSurface({
		content:"/pictures/frontier.png"
	});

	this.frontierImageMod = new Modifier({
		size:[315,true],
		align:[0.5, 0.38],
		origin:[0.5, 0.5],
		transform: Transform.translate(0,0,2),
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
		transform: Transform.translate(0,0,3),
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
		transform: Transform.translate(0,0,4),
	});
	// this.viewNode.add(this.hamburgerImageMod).add(this.hamburgerImage);
	// this.hamburgerImage.pipe(this._eventOutput);

	// this.hamburgerImage.on('click', function(event){
	// 	eventHandler.emit('toggleDrawer');
	// });
	/******************************************************************/

	/******************* Oregon 2015 text *****************************/
	this.oregonText = new Surface({
		content: "OREGON 2015",
		properties:{
			fontFamily: "gothamHTF",
			//backgroundColor:"orange",
			color: "#646665",
			fontSize:"1.5em",
			textAlign: "center",
			fontWeight: "bold",
		}
	});

	this.oregonTextMod = new Modifier({
		size: [undefined, 40],
		origin:[0.5, 0.5],	
		align:[0.5, 0.57],
		transform: Transform.translate(0,0,1),
	});

	// this.viewNode.add(this.oregonTextImageMod).add(this.oregonTextImage);
	// this.oregonTextImage.pipe(this._eventOutput);
	this.viewNode.add(this.oregonTextMod).add(this.oregonText);
	this.oregonText.pipe(this._eventOutput);
	/******************************************************************/	


};

TitleView.prototype = Object.create(View.prototype);
TitleView.prototype.constructor = TitleView;
TitleView.DEFAULT_OPTIONS = {};

