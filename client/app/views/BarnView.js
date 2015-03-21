var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');


BarnView = function () {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		// return [globalWindowX, globalWindowY];
		// return [globalWindowX/globalGridX, globalWindowY];
		return [undefined, undefined];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/*********************** Render Controller ************************/
	// this.renderController = new RenderController();
	// this.viewNode.add(this.renderController);
	/******************************************************************/

	/******************* Background Surface *****************************/
	this.backgroundSurface = new ImageSurface({
		content: "/pictures/woodgrain.jpg"
	});

	this.backgroundMod = new Modifier({
		//size: [undefined, undefined],
		origin:[0.5, 0],
		align: [0.5, 0],
		transform: Transform.translate(0,0,-2)
	});

	this.backgroundMod.sizeFrom(function(){
		//return dynamicScale(1050,700);
		// return [globalWindowX/2 , true];
		// return dynamicScale2(1050,700,globalWindowX/globalGridX, globalWindowY);
		return [undefined, undefined];
	});

	this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);
	/******************************************************************/

	/******************* nature Surface *****************************/
	this.natureSurface = new Surface({
		content: "THE BROAD SIDE OF THE BARN",
		properties: {
			fontFamily: "gothamHTF",
			color: "white",
			fontSize: "2em",
			textAlign: "center",
		}
	});

	this.natureMod = new Modifier({
		size: [175, 200],
		origin:[0.5, 0.5],
		align: [0.5, 0.5],
		transform: Transform.translate(0,0,1)
	});


	this.viewNode.add(this.natureMod).add(this.natureSurface);
	this.natureSurface.pipe(this._eventOutput);

	/******************************************************************/


};

BarnView.prototype = Object.create(View.prototype);
BarnView.prototype.constructor = BarnView;

BarnView.DEFAULT_OPTIONS = {};