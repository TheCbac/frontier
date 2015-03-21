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
		size: [undefined, undefined],
	});

	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/*********************** Render Controller ************************/
	// this.renderController = new RenderController();
	// this.viewNode.add(this.renderController);
	// /*******************************************************************/

	this.containerSurface = new ContainerSurface({
		properties: {
			overflow:'hidden'
		}
	});

	this.containerNode =this.viewNode.add(this.containerSurface);

	/******************* Background Surface *****************************/
	this.backgroundSurface = new ImageSurface({
		content: "/pictures/mooseCropped.jpeg"
	});

	this.backgroundMod = new Modifier({
		origin:[0.4, 0.6],
		align: [0.4, 0.6],
		transform: Transform.translate(0,0,-3)
	});

	this.backgroundMod.sizeFrom(function(){
		return dynamicScale2(587,700,globalWindowX/globalGridX, globalWindowY/globalGridY);
	});


	this.containerSurface.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

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
		align: [0.5, 0.55],
		transform: Transform.translate(0,0,1)
	});

	this.containerSurface.add(this.natureMod).add(this.natureSurface);
	this.natureSurface.pipe(this._eventOutput);

	/******************************************************************/


};

MooseView.prototype = Object.create(View.prototype);
MooseView.prototype.constructor = MooseView;

MooseView.DEFAULT_OPTIONS = {};