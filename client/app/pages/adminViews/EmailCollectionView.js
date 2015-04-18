var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');


EmailCollectionView = function (email) {

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		return [window.innerWidth, 25];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/


	/******************* Background Surface *****************************/
	this.backgroundSurface = new Surface({
		content: email,
		properties: {
			// backgroundColor: 
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


};

EmailCollectionView.prototype = Object.create(View.prototype);
EmailCollectionView.prototype.constructor = EmailCollectionView;

EmailCollectionView.DEFAULT_OPTIONS = {};