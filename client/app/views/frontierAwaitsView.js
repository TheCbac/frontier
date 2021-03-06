var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');

FrontierAwaitsView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowY/globalTileState];

	});

	this.viewNode = this.add(this.viewModifier);


	/*********************** Render Controller ************************/
	this.renderController = new RenderController();
	this.viewNode.add(this.renderController);
	/******************************************************************/


	/******************* Background Surface ************************/
	this.backgroundSurface = new Surface({
		properties:{
			backgroundColor: "#28303B"
			}
	});

	this.backgroundSurfaceMod = new Modifier({
		size: [undefined, undefined]
	});

	// this.backgroundSurfaceMod.sizeFrom( function(){
	// 	return screenSize();
	// } );

	this.viewNode.add(this.backgroundSurfaceMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Text Surfaces************************/
	// ---------------- title ------------------
	this.titleTextSurface = new Surface({
		content: "THE FRONTIER AWAITS",
		properties: {
			// color: "#646665",
			color: "#b2b2b2",
			// backgroundColor: "blue",
			fontSize: "1em",
			fontFamily:"gothamHTF"
		}
	});

	this.titleTextSurfaceMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.0, 0.5],
		align: 	[0.05, 0.1],
	});

	this.titleTextSurfaceMod.sizeFrom( function(){
		return [globalWindowX, true];
	});

	this.viewNode.add(this.titleTextSurfaceMod).add(this.titleTextSurface);
	this.titleTextSurface.pipe(this._eventOutput);

	// ---------------- Description ------------------
	this.descriptionTextSurface = new Surface({
		content: "Conceived through countless nights of purveying in a small wayward barn south of the treacherous Yukon Territory, The Frontier represents more than just a gathering of friends. We are a unique herd, stronger than the forces of nature, smarter than the average bear, more diverse that a Kenyan census, and driven like a pack of ravenous lionesses hunting a water buffalo. We cannot promise that The Frontier will lift men and women from 9-5 oppression to a utopia of blissful unknowns and constant discovery. But it pretty much will. <p>Welcome to the greatest social group you will ever join. The Frontier awaits. Are you in?</p>",
		properties: {
			color: "#b2b2b2",
			// backgroundColor: "blue",
			fontSize: "0.9em",
			fontFamily:"gothamHTF"
		}
	});

	this.descriptionTextSurfaceMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.0, 0.5],
		align: 	[0.05, 0.3],
	});

	this.descriptionTextSurfaceMod.sizeFrom( function(){
		return [0.75* globalWindowX, true];
		//return [window.innerWidth - 100, true];
	});

	this.viewNode.add(this.descriptionTextSurfaceMod).add(this.descriptionTextSurface);
	this.descriptionTextSurface.pipe(this._eventOutput);

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