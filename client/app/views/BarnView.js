var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var ContainerSurface 	= require('famous/surfaces/ContainerSurface');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');

BarnView = function () {

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

	this.flipSlide = function(){
		if (this.slideState == "front"){
			this.frontContainerTrans.setRotate([0,Math.PI/2,0], {duration:500}, this.startBack);
		}
		else if (this.slideState=="back"){
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
	/******************************************************************/

	/*********************** Container Surfaces ************************/

	this.frontContainerSurface = new ContainerSurface({
		properties: {
			overflow:'hidden'
		}
	});

	this.frontContainerTrans = new TransitionableTransform();

	this.containerMod = new Modifier({
		origin:[0.5,0.5],
		align: [0.5,0.5],
		transform: this.frontContainerTrans
	});

	this.containerNode =this.viewNode.add(this.containerMod).add(this.frontContainerSurface);


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
		origin:[0.5,0.5],
		align: [0.5,0.5],
		transform: this.rearContainerTrans
	});

	this.rearContainerNode = this.viewNode.add(this.rearContainerMod).add(this.rearContainerSurface);
	/*******************************************************************/



	/******************* Background Surface *****************************/
	this.backgroundSurface = new ImageSurface({
		content: "/pictures/woodgrain.jpg"
	});

	this.backgroundMod = new Modifier({
		//size: [undefined, undefined],
		origin:[0.5, 0],
		align: [0.5, 0],
		transform: Transform.translate(0,0,-2)
	});

	this.backgroundMod.sizeFrom(function(){
		return dynamicScale2(1050,700,globalWindowX/globalGridX, globalWindowY/globalGridY);
	});


	this.frontContainerSurface.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

		// ----------------- back of background ---------//
	 this.rearSurface = new Surface({
	 	content: "",
	 	properties: {
	 		backgroundColor: "#b2b2b2",
	 	}
	 });

	 this.rearMod = new Modifier({
	 	origin: [0.5, 0.5],
	 	align: [0.5, 0.5],
	 });

	 this.rearMod.sizeFrom(function() {
		return [globalWindowX/globalGridX, globalWindowY/globalGridY];
	 });

	 this.rearContainerSurface.add(this.rearMod).add(this.rearSurface);
	 this.rearSurface.pipe(this._eventOutput);

	/******************************************************************/

	/******************* front text Surface *****************************/
	this.frontTextSurface = new Surface({
		content: "THE BROAD SIDE OF THE BARN",
		properties: {
			fontFamily: "gothamHTF",
			color: "white",
			fontSize: "2em",
			textAlign: "center",
		}
	});

	this.frontTextMod = new Modifier({
		size: [175, 200],
		origin:[0.5, 0.5],
		align: [0.5, 0.55],
		transform: Transform.translate(0,0,1)
	});


	this.frontContainerSurface.add(this.frontTextMod).add(this.frontTextSurface);
	this.frontTextSurface.pipe(this._eventOutput);

	/******************************************************************/

	// -------------------- Rear text --------------//
 	this.rearTextSurface = new Surface({
 		content:"BARN NIGHTS",
 		size: [100,200],
 		properties: {
 			fontFamily:"gothamHTF",
 			color:"#28303B",
 			fontSize:"1.5em",
 			textAlign:"center",
 		}
 	});

 	this.rearTextMod = new Modifier({
 		origin:[0.5,0.5],
 		align:[0.5,0.5]

 	});

 	this.rearContainerSurface.add(this.rearTextMod).add(this.rearTextSurface);
 	this.rearTextSurface.pipe(this._eventOutput);
	/******************************************************************/


};

BarnView.prototype = Object.create(View.prototype);
BarnView.prototype.constructor = BarnView;

BarnView.DEFAULT_OPTIONS = {};