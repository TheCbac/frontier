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
			backgroundColor: "#E2DCDC",
			zIndex:"0",
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
	
	/******************* Oregon Surface *****************************/

	this.oregonNameSurface = new Surface({
		content:"OREGON 2015",
		properties:{
			// backgroundColor:"blue",
			fontFamily:"gothamHTF",
			color: "#646665",
			textAlign:"center",
			fontSize:"1.8em",
			zIndex:"2",
		}
	});

	this.oregonNameMod = new Modifier({
		origin:[0.5,0.5],
		align:[0.5,0.1],
	});

	this.oregonNameMod.sizeFrom(function(){
		return [0.60 * globalWindowX, true];
	});

	this.viewNode.add(this.oregonNameMod).add(this.oregonNameSurface);
	this.oregonNameSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* Date text Surface *****************************/

	this.datesSurface = new Surface({
		content:"JULY 9 - 12",
		properties:{
			fontFamily:"gothamHTF",
			// backgroundColor:"green",
			color: "#646665",
			textAlign:"center",
			fontSize:"2.5em",
			zIndex:"2",
		}
	});

	this.datesSurfaceMod = new Modifier({
		size:[undefined, true],
		origin:[0.5,0.5],
		align:[0.5,0.25],
		transform: Transform.translate(0,0,1)
	});


	// this.datesSurfaceMod.alignFrom(function(){
	// 	if (globalTileState == 2){
	// 		return [0.05, 0.5];
	// 	}

	// 	if (globalTileState == 1){
	// 		return [0.05, 0.4];
	// 	}
	// });

	this.viewNode.add(this.datesSurfaceMod).add(this.datesSurface);
	this.datesSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* Description Surface *****************************/

	this.oregonDescriptionSurface = new Surface({
		content:"Oregon has been deemed The Frontier’s 2015 adventure destination. <p> Known for its grandeur and majesty, the Beaver State will never disappoint. If you want an experience so intertwined with the heart of nature that trees become friends, pastures transform into home, and flowing water turns into motion pictures, join us as we discover this green earth.</p>",
		properties:{
			fontFamily:"gothamHTF",
			color: "#646665",
			textAlign:"center",
			fontSize:"1.2em",
			zIndex:"2",
		}
	});

	this.oregonDescriptionMod = new Modifier({
		origin:[0.5, 0.5],
		align: [0.5, 0.45],
	});

	this.oregonDescriptionMod.sizeFrom(function(){
		return [0.8 * globalWindowX, true];
	});

	this.oregonDescriptionMod.alignFrom(function(){
		if(globalTileState==2){
			return [0.5,0.45];
		}
		//mobile
		else if (globalTileState==1){
			return [0.5,0.35];
		}
	});

	this.viewNode.add(this.oregonDescriptionMod).add(this.oregonDescriptionSurface);
	this.oregonDescriptionSurface.pipe(this._eventOutput);

	/******************************************************************/



};

DatesView.prototype = Object.create(View.prototype);
DatesView.prototype.constructor = DatesView;

DatesView.DEFAULT_OPTIONS = {};