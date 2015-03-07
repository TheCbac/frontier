var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');

FrontierAwaitsView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	this.viewModifier.sizeFrom(function(){
		return screenSize();
		// return [undefined, 500];
	});

	this.viewNode = this.add(this.viewModifier);
	/******************* Background Surface ************************/
	this.backgroundSurface = new Surface({
		properties:{
			backgroundColor: "#28303B"
			}
	});

	this.backgroundSurfaceMod = new Modifier({
	});

	this.backgroundSurfaceMod.sizeFrom( function(){
		return screenSize();
	} );

	this.viewNode.add(this.backgroundSurfaceMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);
	/******************************************************************/

};

FrontierAwaitsView.prototype = Object.create(View.prototype);
FrontierAwaitsView.prototype.constructor = FrontierAwaitsView;
FrontierAwaitsView.DEFAULT_OPTIONS = {};