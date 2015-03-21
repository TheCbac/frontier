var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var ContainerSurface 	= require('famous/surfaces/ContainerSurface');

MooseView = function () {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		// return [globalWindowX, globalWindowY];
		return [globalWindowX/globalGridX, globalWindowY];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/*********************** Render Controller ************************/
	this.renderController = new RenderController();
	this.viewNode.add(this.renderController);
	/*******************************************************************/

	this.containerSurface = new ContainerSurface({
	});

	this.containerModifier = new Modifier();

	this.containerModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowY];
	});
	//this.viewNode.add(this.containerSurface);



	/******************* Background Surface *****************************/
	this.backgroundSurface = new ImageSurface({
		content: "/pictures/moose.jpeg"
	});

	this.backgroundMod = new Modifier({
		//size: [undefined, undefined],
		origin:[0.5, 0.5],
		align: [0.5, 0.5],
		transform: Transform.translate(0,0,-1)
	});

	this.backgroundMod.sizeFrom(function(){
		return dynamicScale2(1050,700,globalWindowX/globalGridX, globalWindowY);
		// return [globalWindowX/2 , true];
		// return [undefined, undefined];
	});

	//this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.containerNode = this.containerSurface.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);
	this.viewNode.add(this.containerModifier).add(this.containerNode);
	this.containerSurface.pipe(this._eventOutput);

	/******************************************************************/


	/******************* nature Surface *****************************/
	this.natureSurface = new Surface({
		content: "BECOME ONE WITH NATURE",
		properties: {
			fontFamily: "gothamHTF",
			color: "white",
			fontSize: "2em",
			textAlign: "center",
		}
	});

	this.natureMod = new Modifier({
		size: [150, 200],
		origin:[0.5, 0.5],
		align: [0.5, 0.5],
		transform: Transform.translate(0,0,1)
	});


	this.viewNode.add(this.natureMod).add(this.natureSurface);
	this.natureSurface.pipe(this._eventOutput);

	/******************************************************************/


};

MooseView.prototype = Object.create(View.prototype);
MooseView.prototype.constructor = MooseView;

MooseView.DEFAULT_OPTIONS = {};