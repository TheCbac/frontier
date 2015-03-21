var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');

DatesView = function () {

	/***************************** Main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// size view to screen
	this.viewModifier.sizeFrom(function(){
		// return [window.innerWidth, window.innerHeight/2];
		return [globalWindowX, globalWindowY/globalTileState];
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/*********************** Render Controller ************************/
	this.renderController = new RenderController();
	this.viewNode.add(this.renderController);
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

	/******************* Date text Surface *****************************/

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
		transform: Transform.translate(0,0,1)
		// align:[0.05,0.5],
	});


	this.datesSurfaceMod.alignFrom(function(){
		if (globalTileState == 2){
			return [0.05, 0.5];
		}

		if (globalTileState == 1){
			return [0.05, 0.4];
		}
	});

	this.viewNode.add(this.datesSurfaceMod).add(this.datesSurface);
	this.datesSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* Description Surface *****************************/

	this.oregonDescriptionSurface = new Surface({
		content:"Oregon has been deemed The Frontier’s 2015 adventure destination. Known for its grandeur and majesty, the Beaver State will never disappoint. If you want an experience so intertwined with the heart of nature that trees become friends, pastures transform into home, and flowing water turns into motion pictures, join us as we discover this green earth.",
		properties:{
			fontFamily:"gothamHTF",
			color: "#646665",
			textAlign:"right",
			fontSize:"0.9em"
		}
	});

	this.oregonDescriptionMod = new Modifier({
		origin:[1,0.5],
		align:[0.95,0.45],
	});

	this.oregonDescriptionMod.sizeFrom(function(){
		return [0.6 * globalWindowX, true];
	});

	this.viewNode.add(this.oregonDescriptionMod).add(this.oregonDescriptionSurface);
	this.oregonDescriptionSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* Description Surface *****************************/

	this.oregonNameSurface = new Surface({
		content:"OREGON 2015",
		properties:{
			fontFamily:"gothamHTF",
			color: "#646665",
			textAlign:"right",
			fontSize:"1.5em"
		}
	});

	this.oregonNameMod = new Modifier({
		origin:[1,0.5],
		align:[0.95,0.3],
	});

	this.oregonNameMod.sizeFrom(function(){
		return [0.60 * globalWindowX, true];
	});

	this.viewNode.add(this.oregonNameMod).add(this.oregonNameSurface);
	this.oregonNameSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* Pulldown arrow image ************************/
	this.pullDownImage = new ImageSurface({
		content:"/pictures/pulldown.png",
		size: [50, true]
	});

	this.pullDownImageMod = new  Modifier({
		origin: [0.5,1.0],
		align: [0.5,0.95],
		transform: Transform.translate(0,0,1),
	});

	// Add the modifier to the pullDownNode 
	this.pullDownNode = new RenderNode(this.pullDownImageMod);
	// Add a controller to the pulldown node
	this.pullDownNode.add(this.renderController);
	//add the pulldownNode to the view
	this.viewNode.add(this.pullDownNode);

	this.renderController.show(this.pullDownImage);

	this.pullDownImage.pipe(this._eventOutput);

	
	//var eventHandler = new EventHandler();
	this.pullDownImage.on('click', function(event){
		eventHandler.emit('pullDownClicked');
	});
	/******************************************************************/



};

DatesView.prototype = Object.create(View.prototype);
DatesView.prototype.constructor = DatesView;

DatesView.DEFAULT_OPTIONS = {};