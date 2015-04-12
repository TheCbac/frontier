var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var ContainerSurface 	= require('famous/surfaces/ContainerSurface');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');

PictureTileView = function (name, src, imageX, imageY, frontTextContent, rearTextContent) {

	/* True Constants */
	this.imageSource = src;
	this.imageX = imageX;
	this.imageY = imageY;

	this.tileName =name; 

	/* should be refactored to make the default
	arguments depend on a factory input in the 
	calling funciton  */ 

	/* add all, OriginFrom function */ 


	/* Front container variables */
	this.frontContainerModOrigin 	= [0.5, 0.5];
	this.frontContainerModAlign 	= [0.5, 0.5];
	/* Rear container variables */ 
	this.rearContainerModOrigin 	= [0.5, 0.5];
	this.rearContainerModAlign 		= [0.5, 0.5];

	/* Front Background variables */
	this.frontBackgroundModOrigin 	= [0.5, 0.5];
	this.frontBackgroundModAlign 	= [0.5, 0.5];
	// this.frontBackgroundTrans		= 
	/* Rear Background  variables */
	this.rearBackgroundColor 		= "#28303B";
	this.rearBackgroundModOrigin 	= [0.5, 0.5];
	this.rearBackgroundAlign 		= [0.5, 0.5];


	/* Front Text Variables */
	this.frontTextContent			= frontTextContent;
	this.frontTextProperties 		= {fontFamily: "gothamHTF",
											color: "white",
										 fontSize: "2em",
										textAlign: "center",};
	this.frontTextModSize			= [175, 175 ];
	this.frontTextModOrigin			= [0.5, 0.5 ];
	this.frontTextModAlign			= [0.5, 0.55];
	this.frontTextModTrans			= Transform.translate(0,0,1);
	/* Front Text Variables */
	this.rearTextContent			= rearTextContent;
	this.rearTextProperties 		= {fontFamily: "gothamHTF",
											color: "white",
										 fontSize: "2em",
										textAlign: "center",};
	this.rearTextModSize			= [300, 200 ];
	this.rearTextModOrigin			= [0.5, 0.5 ];
	this.rearTextModAlign			= [0.5, 0.55];
	this.rearTextModTrans			= Transform.translate(0,0,1);


	/* State Variables */
	this.slideState = "front";

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);

	this.on('click', function(){
		this.flipSlide();
	}.bind(this));

	this.on('mouseenter', function(event){
		// console.log("hover");

		globalActiveTile = this.tileName;
		this.zoom();

	});

	this.on('mouseleave', function(){

		if (globalActiveTile == this.tileName){
			this.unzoom();
		}
	});

	/* Zoom function */
	this.zoom = function(){
		this.frontBackgroundTrans.setScale([1.1,1.1], {duration:100});
	};

	this.unzoom=function(){
		this.frontBackgroundTrans.setScale([1,1], {duration:100});
	};

	/* Flipping functions */
	this.flipSlide = function(){
		if(this.slideState == "front"){
			this.frontContainerTrans.setRotate([0,Math.PI/2,0], {duration:500}, this.startBack);
		}

		else if (this.slideState == "back"){
			this.rearContainerTrans.setRotate([0,Math.PI/2,0], {duration:500},this.startFront);
		}
	}.bind(this);

	this.startBack = function(){
		this.rearContainerTrans.setRotate([0,0,0], {duration:500});
		this.slideState = "back";
	}.bind(this);

	this.startFront = function(){
		this.frontContainerTrans.setRotate([0,0,0], {duration:500});
		this.slideState = "front";
	}.bind(this);

	/******************************************************************/

	/*********************** Render Controller ************************/
	// this.renderController = new RenderController();
	// this.viewNode.add(this.renderController);
	/*******************************************************************/

	/*********************** Container Surfaces ************************/
	//----------------- front container -------- //
	this.frontContainerSurface = new ContainerSurface({
		properties: {
			overflow:'hidden'
		}
	});

	this.frontContainerTrans = new TransitionableTransform();

	this.frontContainerMod = new Modifier({
		origin:		this.frontContainerModOrigin,
		align: 		this.frontContainerModAlign,
		transform: 	this.frontContainerTrans
	});

	this.firstContainerNode =this.viewNode.add(this.frontContainerMod).add(this.frontContainerSurface);


	//----------------- rear container -------- //

	this.rearContainerSurface = new ContainerSurface({
		properties: {
			overflow: "hidden"
		}
	});


	this.rearContainerTrans = new TransitionableTransform(
		Transform.rotateY(Math.PI/2)
		);

	this.rearContainerMod = new Modifier({
		origin: 	this.rearContainerModOrigin,
		align: 		this.rearContainerModAlign,
		transform: 	this.rearContainerTrans,
	});

	this.rearContainerNode = this.viewNode.add(this.rearContainerMod).add(this.rearContainerSurface);
	/*******************************************************************/


	/******************* Background Surface *****************************/
	this.frontBackgroundSurface = new ImageSurface({
		content: 	this.imageSource,
	});

	this.frontBackgroundTrans = new TransitionableTransform(
		Transform.translate(0,0,-3)
		// Transform.scale([1,1])
		);
	
	this.frontBackgroundMod = new Modifier({
		origin: 	this.frontBackgroundModOrigin,
		align: 		this.frontBackgroundModAlign,
		transform: 	this.frontBackgroundTrans,
	});

	this.frontBackgroundMod.sizeFrom(function(){
		// var test = dynamicScale2(this.imageX, this.imageY, this.sizeX, globalWindowY/globalGridY);
		this.sizeY = globalWindowY/globalGridY;
		this.sizeX = globalWindowX/globalGridX;
		
		var test = dynamicScale2(this.imageX, this.imageY, this.sizeX, this.sizeY);
		// console.log(this.imageX + "," + this.imageY);
		// console.log(test);
		return test;
	}.bind(this));


	this.frontContainerSurface.add(this.frontBackgroundMod).add(this.frontBackgroundSurface);
	this.frontBackgroundSurface.pipe(this._eventOutput);

	 // ----------------- Rear Background surface ---------//
	 this.rearBackgroundSurface = new Surface({
	 	content: "",
	 	properties: {
	 		backgroundColor: this.rearBackgroundColor,
	 	}
	 });

	 this.rearMod = new Modifier({
	 	origin: this.rearBackgroundModOrigin,
	 	align: this.rearBackgroundAlign,
	 });

	 this.rearMod.sizeFrom(function() {
		return [globalWindowX/globalGridX, globalWindowY/globalGridY];
	 });

	 this.rearContainerSurface.add(this.rearMod).add(this.rearBackgroundSurface);
	 this.rearBackgroundSurface.pipe(this._eventOutput);

	/******************************************************************/


	/******************* Front Text Surface *****************************/
	this.frontTextSurface = new Surface({
		content:  	this.frontTextContent,
		properties: this.frontTextProperties,
	});

	this.frontTextMod = new Modifier({
		size: 		this.frontTextModSize,
		origin: 	this.frontTextModOrigin,
		align:  	this.frontTextModAlign,
		transform:  this.frontTextModTrans,
	});


	this.frontContainerSurface.add(this.frontTextMod).add(this.frontTextSurface);
	this.frontTextSurface.pipe(this._eventOutput);


	// -------------------- Rear text --------------//
 	this.rearTextSurface = new Surface({
		content:  	this.rearTextContent,
		properties: this.rearTextProperties,
	});

	this.rearTextMod = new Modifier({
		size: 		this.rearTextModSize,
		origin: 	this.rearTextModOrigin,
		align:  	this.rearTextModAlign,
		transform:  this.rearTextModTrans,
	});

 	this.rearContainerSurface.add(this.rearTextMod).add(this.rearTextSurface);
 	this.rearTextSurface.pipe(this._eventOutput);
	/******************************************************************/


};

PictureTileView.prototype = Object.create(View.prototype);
PictureTileView.prototype.constructor = PictureTileView;

PictureTileView.DEFAULT_OPTIONS = {};