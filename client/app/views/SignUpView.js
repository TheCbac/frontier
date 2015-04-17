var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var InputSurface 		= require('famous/surfaces/InputSurface');
var MouseSync 			= require('famous/inputs/MouseSync');

SignUpView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	// This needs to be changed to account for mobile
	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowY/2];

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
		content: "The Frontier Awaits.<p>Are you in?</p>",
		properties: {
			// color: "#646665",
			color: "#b2b2b2",
			// backgroundColor: "blue",
			fontSize: "1.5em",
			fontFamily:"gothamHTF",
			textAlign: "center",
			lineHeight:".75em",
		}
	});

	this.titleTextSurfaceMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.1],
	});

	this.titleTextSurfaceMod.sizeFrom( function(){
		return [globalWindowX, true];
	});

	this.viewNode.add(this.titleTextSurfaceMod).add(this.titleTextSurface);
	this.titleTextSurface.pipe(this._eventOutput);

	// ---------------- Description ------------------
	this.descriptionTextSurface = new Surface({
		content: " If our witty prose and overly dramatic photography have convinced you, enter your contact information below.",
		properties: {
			color: "#b2b2b2",
			// backgroundColor: "blue",
			fontSize: "0.8em",
			fontFamily:"gothamHTF",
			textAlign: "center"
		}
	});

	this.descriptionTextSurfaceMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.3],
	});

	this.descriptionTextSurfaceMod.sizeFrom( function(){
		return [500, true];
		//return [window.innerWidth - 100, true];
	});

	this.viewNode.add(this.descriptionTextSurfaceMod).add(this.descriptionTextSurface);
	this.descriptionTextSurface.pipe(this._eventOutput);

	/******************* Email input  box ************************/
	this.emailSurface = new InputSurface({
		placeholder:"Email Address",
		properties:{
			backgroundColor:"#28303B",
			fontSize: "1.6em",
			// lineHeight: "0.1em",
			fontFamily:"gothamHTF",
			borderWidth:"0px 0px thin 0px",
			color: "#b2b2b2",
			textAlign:"left",

		},
	});

	this.emailMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.55],
		size: [500,50]
	});


	this.viewNode.add(this.emailMod).add(this.emailSurface);
	this.emailSurface.pipe(this._eventOutput);

	/******************************************************************/
	

	/******************* Join text  box ************************/
	this.joinSurface = new Surface({
		content: "Join",
		properties:{
			// backgroundColor:"blue",
			color:"#569F5B",
			fontSize:"1.4em",
			fontFamily:"gothamHTF",
			textAlign:"center",
			lineHeight:"50px",
			borderStyle: "solid",
			borderWidth:"2px",
			cursor:"pointer",
		}
	});

	this.joinMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.8],
		size: [185,50]
	});

	this.mouseSync = new MouseSync();
	this.joinSurface.pipe(this.mouseSync);

	this.mouseSync.on('start', function(event){
		this.joinSurface.setProperties({
			backgroundColor:"#345F37",
			borderColor:"#569F5B",
			color:"#28303B",
		});
	}.bind(this));

	this.mouseSync.on('end', function(event){
		this.joinSurface.setProperties({
			backgroundColor:"#569F5B",
			borderColor:"#569F5B",
			color:"#28303B",
		});

		var emailAdd = this.emailSurface.getValue();
		console.log(emailAdd);

		emailCollection.insert({email:emailAdd});
	}.bind(this));

	this.joinSurface.on('mouseenter', function(){
		this.joinSurface.setProperties({
			backgroundColor:"#569F5B",
			borderColor:"#569F5B",
			color:"#28303B",
		});
	}.bind(this));

	this.joinSurface.on('mouseleave', function(){
		this.joinSurface.setProperties({
			backgroundColor:"#28303B",
			color:"#569F5B",
		});
	}.bind(this));


	this.viewNode.add(this.joinMod).add(this.joinSurface);
	this.joinSurface.pipe(this._eventOutput);

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

	// // Add the modifier to the pullDownNode 
	// this.pullDownNode = new RenderNode(this.pullDownImageMod);
	// // Add a controller to the pulldown node
	// this.pullDownNode.add(this.renderController);
	// //add the pulldownNode to the view
	// this.viewNode.add(this.pullDownNode);

	// this.pullDownImage.pipe(this._eventOutput);

	
	// //var eventHandler = new EventHandler();
	// this.pullDownImage.on('click', function(event){
	// 	eventHandler.emit('pullDownClicked');
	// });
	/******************************************************************/



};

SignUpView.prototype = Object.create(View.prototype);
SignUpView.prototype.constructor = SignUpView;
SignUpView.DEFAULT_OPTIONS = {};