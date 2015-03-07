var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');

MistRocksView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	this.viewModifier.sizeFrom(function(){
		return [window.innerWidth, window.innerHeight];
	});

	this.viewNode = this.add(this.viewModifier);

	/******************* Background image ************************/
	this.backgroundImage = new ImageSurface({
		content:"/pictures/mistrocks.jpg",
	});

	this.backgroundImageMod = new Modifier({
		transform: Transform.translate(0,0,-1),
		align: [0.5,1.0],
		origin: [0.5,1.0]
	});

	this.backgroundImageMod.sizeFrom(function(){ 
		return dynamicScale(1774,2238); 
	});

	this.viewNode.add(this.backgroundImageMod).add(this.backgroundImage);
	this.backgroundImage.pipe(this._eventOutput);
	/******************************************************************/


};

MistRocksView.prototype = Object.create(View.prototype);
MistRocksView.prototype.constructor = MistRocksView;

MistRocksView.DEFAULT_OPTIONS = {};