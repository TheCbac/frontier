var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');

DatesView = function () {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		// return [window.innerWidth, window.innerHeight/2];
		return [globalWindowX, globalWindowY/determineTileHeight()];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	this.renderController = new RenderController();

	/******************* Background Surface *****************************/
	this.backgroundSurface = new Surface({
		content: "",
		properties: {
			backgroundColor: "white"
		}
	});

	this.backgroundMod = new Modifier({
		size: [undefined, undefined],
		// origin:[0,0],
		// align: [1,0],
	});


	this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/

	/******************* Background Surface *****************************/

	this.datesSurface = new Surface({
		content:"JULY 9 - 12",
		properties:{
			fontFamily:"gothamHTF",
			// backgroundColor:"green",
			color: "#646665",
			textAlign:"center",
			fontSize:"1.5em"
		}
	});

	this.datesSurfaceMod = new Modifier({
		size:[150,50],
		origin:[0,0.5],
		align:[0.05,0.5],
	});

	this.viewNode.add(this.datesSurfaceMod).add(this.datesSurface);
	this.datesSurface.pipe(this._eventOutput);

	/******************************************************************/

};

DatesView.prototype = Object.create(View.prototype);
DatesView.prototype.constructor = DatesView;

DatesView.DEFAULT_OPTIONS = {};