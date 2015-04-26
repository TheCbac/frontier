var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var RenderController 	= require('famous/views/RenderController');
var RenderNode 			= require('famous/core/RenderNode');
var InputSurface 		= require('famous/surfaces/InputSurface');
var MouseSync 			= require('famous/inputs/MouseSync');
var StateModifier 		= require('famous/modifiers/StateModifier');
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

	this.titleTextSurfaceMod.alignFrom( function(){
		if(globalTileState==2){
			return [0.5,0.1];
		}
		//mobile
		else if (globalTileState==1){
			return [0.5,0.05];
		}
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

		if(globalTileState==2){
			return [500, true];
		}
		//mobile
		else if (globalTileState==1){
			return [300, true];
		}
		//return [window.innerWidth - 100, true];
	});

	this.viewNode.add(this.descriptionTextSurfaceMod).add(this.descriptionTextSurface);
	this.descriptionTextSurface.pipe(this._eventOutput);

	/******************* Email input  box ************************/
	this.emailInputSurface = new InputSurface({
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

	this.emailInputSurface.on("click", function(){
		this.acceptanceTextSurfaceMod.setTransform(Transform.translate(0,0,-1), 
														{duration:0});
	}.bind(this));

	this.emailInputMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.55],
		size: [500,50]
	});

	this.emailInputMod.sizeFrom(function() {
		if(globalTileState==2){
			return [500, true];
		}
		//mobile
		else if (globalTileState==1){
			return [300, true];
		}
	});

	this.emailInputSurface.on('keydown', function(event){
		//Enter key pressed 
		if(event.keyCode == 13){
			this.joinButtonSubmit();
		}
	}.bind(this));

	this.viewNode.add(this.emailInputMod).add(this.emailInputSurface);
	this.emailInputSurface.pipe(this._eventOutput);

	/******************************************************************/
	

	/******************* Join text  box ************************/
	this.joinButtonSurface = new Surface({
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

	this.joinButtonMod = new Modifier({
		transform: Transform.translate(0,0,1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.8],
		size: [185,50]
	});

	this.mouseSync = new MouseSync();
	this.joinButtonSurface.pipe(this.mouseSync);

	this.mouseSync.on('start', function(event){
		this.joinButtonSurface.setProperties({
			backgroundColor:"#345F37",
			borderColor:"#569F5B",
			color:"#28303B",
		});
	}.bind(this));

	this.mouseSync.on('end', function(event){
		this.joinButtonSurface.setProperties({
			backgroundColor:"#569F5B",
			borderColor:"#569F5B",
			color:"#28303B",
		});
		this.joinButtonSubmit();

	}.bind(this));

	this.joinButtonSubmit = function(){
		
		var emailAdd = this.emailInputSurface.getValue().toLowerCase();
		// console.log(emailAdd);

		//regex for email address
		test = emailAdd.search(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9]{2,4}/);

		if (test === 0){
			this.acceptanceTextSurface.setContent("Your email has been recorded!");
			this.acceptanceTextSurface.setProperties({
				color:"#569F5B",
			});
			this.acceptanceTextSurfaceMod.setTransform(Transform.translate(0,0,1), 
														{duration:0});
			Meteor.call('insertEmail',emailAdd);
			// console.log("valid email");
		}
		else{
			// console.log("invalid email");
			this.acceptanceTextSurface.setContent("Invalid email");
			this.acceptanceTextSurface.setProperties({
				color:"red",
			});
			this.acceptanceTextSurfaceMod.setTransform(Transform.translate(0,0,1), 
														{duration:0});
		}
	}.bind(this);

	this.joinButtonSurface.on('mouseenter', function(){
		this.joinButtonSurface.setProperties({
			backgroundColor:"#569F5B",
			borderColor:"#569F5B",
			color:"#28303B",
		});
	}.bind(this));

	this.joinButtonSurface.on('mouseleave', function(){
		this.joinButtonSurface.setProperties({
			backgroundColor:"#28303B",
			color:"#569F5B",
		});
	}.bind(this));


	this.viewNode.add(this.joinButtonMod).add(this.joinButtonSurface);
	this.joinButtonSurface.pipe(this._eventOutput);

	/******************************************************************/

	// ---------------- Description ------------------
	this.acceptanceTextSurface = new Surface({
		content: "Your email has been recorded!",
		size:[500,true],
		properties: {
			color: "#569F5B",
			// backgroundColor: "blue",
			fontSize: "0.8em",
			fontFamily:"gothamHTF",
			textAlign: "left",
			
		}
	});

	this.acceptanceTextSurfaceMod = new StateModifier({
		transform: Transform.translate(0,0,-1),
		origin: [0.5, 0.5],
		align: 	[0.5, 0.64],
	});


	this.viewNode.add(this.acceptanceTextSurfaceMod).add(this.acceptanceTextSurface);
	this.acceptanceTextSurface.pipe(this._eventOutput);

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

	/******************************************************************/



};

SignUpView.prototype = Object.create(View.prototype);
SignUpView.prototype.constructor = SignUpView;
SignUpView.DEFAULT_OPTIONS = {};