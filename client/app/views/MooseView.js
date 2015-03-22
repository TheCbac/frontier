var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var ContainerSurface 	= require('famous/surfaces/ContainerSurface');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');

MooseView = function () {

	this.slideState = "front";

	/***************************** main view ***************************/
	View.apply(this, arguments);
	// Create modifier


	this.viewModifier = new Modifier({
		size: [undefined, undefined],
		// transform: this.backgroundTrans
	});

	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);

	this.on('click', function(){
		this.flipSlide();
	}.bind(this));


	this.flipSlide = function(){
		if(this.slideState == "front"){
			this.backgroundTrans.setRotate([0,Math.PI/2,0], {duration:500}, this.startBack);
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
		this.backgroundTrans.setRotate([0,0,0], {duration:500});
		this.slideState = "front";
	}.bind(this);

	/******************************************************************/


	/*********************** Render Controller ************************/
	// this.renderController = new RenderController();
	// this.viewNode.add(this.renderController);
	/*******************************************************************/

	/*********************** Container Surfaces ************************/

	this.containerSurface = new ContainerSurface({
		properties: {
			overflow:'hidden'
		}
	});

	this.backgroundTrans = new TransitionableTransform();

	this.containerMod = new Modifier({
		origin:[0.5,0.5],
		align: [0.5,0.5],
		transform: this.backgroundTrans
	});

	this.containerNode =this.viewNode.add(this.containerMod).add(this.containerSurface);


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
		content: "/pictures/mooseCropped.jpeg"
	});

	this.backgroundMod = new Modifier({
		origin:[0.4, 0.6],
		align: [0.4, 0.6],
		transform: Transform.translate(0,0,-3)
	});

	this.backgroundMod.sizeFrom(function(){
		return dynamicScale2(587,700,globalWindowX/globalGridX, globalWindowY/globalGridY);
	});


	this.containerSurface.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

	 		// ----------------- back of background ---------//
	 this.rearSurface = new Surface({
	 	content: "",
	 	properties: {
	 		backgroundColor: "#28303B"
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


	/******************* Text Surface *****************************/
	this.natureSurface = new Surface({
		content: "BECOME ONE WITH NATURE",
		properties: {
			fontFamily: "gothamHTF",
			color: "white",
			fontSize: "2em",
			textAlign: "center",
		}
	});

	this.natureMod = new Modifier({
		size: [150, 200],
		origin:[0.5, 0.5],
		align: [0.5, 0.55],
		transform: Transform.translate(0,0,1)
	});

	this.containerSurface.add(this.natureMod).add(this.natureSurface);
	this.natureSurface.pipe(this._eventOutput);


	// -------------------- Rear text --------------//
 	this.rearTextSurface = new Surface({
 		content:"WHITE WATER RAFTING",
 		size: [100,200],
 		properties: {
 			fontFamily:"gothamHTF",
 			color:"#b2b2b2",
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

MooseView.prototype = Object.create(View.prototype);
MooseView.prototype.constructor = MooseView;

MooseView.DEFAULT_OPTIONS = {};