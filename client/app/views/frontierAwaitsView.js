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

	this.textSurface = new Surface({
		content: "TEST",
		properties: {
			backgroundColor: "blue",
			fontSize: "1.6em",
			fontFamily:"gothamHTF"
		}
	});

	this.textSurfaceMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.5],
		size: 	[100,100]
	});

	// this.viewNode.add(this.textSurfaceMod).add(this.textSurface);
	// this.textSurface.pipe(this._eventOutput);
	/******************* Pulldown arrow image ************************/
	this.pullDownImage = new ImageSurface({
		content:"/pictures/pulldown.png",
		size: [50, true]
	});

	this.pullDownImageMod = new  Modifier({
		origin: [0.5,1.0],
		align: [0.5,0.95]
	});

	this.viewNode.add(this.pullDownImageMod).add(this.pullDownImage);
	this.pullDownImage.pipe(this._eventOutput);

	//var eventHandler = new EventHandler();
	this.pullDownImage.on('click', function(event){
		eventHandler.emit('pullDownClicked');
	});
	/******************************************************************/

};

FrontierAwaitsView.prototype = Object.create(View.prototype);
FrontierAwaitsView.prototype.constructor = FrontierAwaitsView;
FrontierAwaitsView.DEFAULT_OPTIONS = {};