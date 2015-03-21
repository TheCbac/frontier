var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var GridLayout 			= require('famous/views/GridLayout');

PictureGridView = function () {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowY];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	this.gridLayout = new GridLayout({
		dimensions: [globalGridX, globalGridY],
	});

	this.viewNode.add(this.gridLayout);
	this.gridLayout.pipe(this._eventOutput);
	/*********************** Render Controller ************************/
	// this.renderController = new RenderController();
	// this.viewNode.add(this.renderController);
	/******************************************************************/

	/******************* Background Surface *****************************/
	// this.backgroundSurface = new Surface({
	// 	content: "",
	// 	properties: {
	// 		backgroundColor: "white"
	// 	}
	// });

	// this.backgroundMod = new Modifier({
	// 	size: [undefined, undefined],
	// 	// origin:[0,0],
	// 	// align: [1,0],
	// });


	// this.ViewewNode.add(this.backgroundMod).add(this.backgroundSurface);
	// this.backgroundSurface.pipe(this._eventOutput);

	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/


};

PictureGridView.prototype = Object.create(View.prototype);
PictureGridView.prototype.constructor = PictureGridView;

PictureGridView.DEFAULT_OPTIONS = {};