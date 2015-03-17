var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');

EmptyView = function () {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		return [window.innerWidth, window.innerHeight/2];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

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


	this.ViewewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/


};

EmptyView.prototype = Object.create(View.prototype);
EmptyView.prototype.constructor = EmptyView;

EmptyView.DEFAULT_OPTIONS = {};