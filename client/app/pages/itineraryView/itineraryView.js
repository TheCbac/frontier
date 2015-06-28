var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');

ItineraryView = function(){

	/***************************** Main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	// this.viewModifier.sizeFrom(function(){
	// 	// return [window.innerWidth, window.innerHeight/2];
	// 	return [globalWindowX, globalWindowY/globalTileState];
	// });
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

		/******************* Background Surface *****************************/
	console.log('itinerary');
	this.backgroundSurface = new Surface({
		content: "",
		properties: {
			backgroundColor: "grey"
		}
	});

	this.backgroundMod = new Modifier({
		size: [undefined, undefined],
		transform: Transform.translate(0,0,0),
		// origin:[0,0],
		// align: [1,0],
	});


	this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/

};

ItineraryView.prototype = Object.create(View.prototype);
ItineraryView.prototype.constructor = ItineraryView;

ItineraryView.DEFAULT_OPTIONS = {};