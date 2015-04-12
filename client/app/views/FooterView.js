var View 				= require('famous/core/View');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var EventHandler 		= require('famous/core/EventHandler');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');

FooterView =function() {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
		// overflow:"auto"
	});

	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, 55];
	});

	this.viewNode = this.add(this.viewModifier);

	
	/******************* Background Surface ************************/
	this.backgroundSurface = new Surface({
		properties:{
			backgroundColor: "#3A3B3D",
			}
	});

	this.backgroundSurfaceMod = new Modifier({
		size: [undefined, undefined]
	});

	// this.backgroundSurfaceMod.sizeFrom( function(){
	// 	return screenSize();
	// } );

	this.viewNode.add(this.backgroundSurfaceMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Frontier Logo Image ************************/
	this.frontierImage = new ImageSurface({
		content:"/pictures/frontier-light.png"
	});

	this.frontierImageMod = new Modifier({
		size:[150,true],
		align:[0.01, 0.35],
		origin:[0, 0],
		transform: Transform.translate(0,0,2),
	});

	this.viewNode.add(this.frontierImageMod).add(this.frontierImage);
	this.frontierImage.pipe(this._eventOutput);
	/******************************************************************/


	/******************* Copyright text *****************************/
	this.copyrightText = new Surface({
		content: "&copy Frontier 2015",
		properties:{
			fontFamily: "gothamHTF",
			//backgroundColor:"orange",
			color: "#646665",
			fontSize:"1em",
			textAlign: "right",
			fontWeight: "bold",
		}
	});

	this.copyrightMod = new Modifier({
		size: [200, true],
		origin:[1, 0],	
		align:[0.99, 0.35],
		transform: Transform.translate(0,0,1),
	});

	// this.viewNode.add(this.copyrightTextImageMod).add(this.copyrightTextImage);
	// this.copyrightTextImage.pipe(this._eventOutput);
	this.viewNode.add(this.copyrightMod).add(this.copyrightText);
	this.copyrightText.pipe(this._eventOutput);
	/******************************************************************/	


};

FooterView.prototype = Object.create(View.prototype);
FooterView.prototype.constructor = FooterView;
FooterView.DEFAULT_OPTIONS = {};

