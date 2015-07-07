var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var MouseSync 			= require('famous/inputs/MouseSync');
var PinchSync 			= require('famous/inputs/PinchSync');

CostPage = function(){

	/***************************** Main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});

	this.imageX = 3120;
	this.imageY = 7769;


	// size view to screen
	this.viewModifier.sizeFrom(function(){
		return [globalWindowX, globalWindowX/this.imageX*this.imageY];	
		
	}.bind(this));
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/******************* Background Surface *****************************/

	this.imageBackground = new ImageSurface({
		content: "/pictures/budget-v2.jpg",
		properties:{
			// userScalable:'yes'
		}
	});

	this.imageBackMod = new Modifier({
		size: [undefined, true],

	});


	this.viewNode.add(this.imageBackMod).add(this.imageBackground);
	this.imageBackground.pipe(this._eventOutput);
	/******************************************************************/

	/******************* Background Surface *****************************/

	this.backgroundSurface = new ImageSurface({
		content: "",
		properties:{
			borderWidth:'0px',
			cursor:'pointer',
						
		}
	});

	// // mouse sync
	this.mouseSync = new MouseSync();
	this.backgroundSurface.pipe(this.mouseSync);

	this.mouseSync.on('end', function(event){
		this.contactUs();
	}.bind(this));

	this.contactUs = function(){
		document.location.href = "mailto:oregon-admin@mit.edu";
	};


/// end Mouse Synce
	this.backgroundMod = new Modifier({
		// size: [200, 100],
		transform: Transform.translate(0,0,0),
		origin:[0.5, 0.5],
		align: [0.51, 0.934],
		opacity:1,
	});

	this.backgroundMod.sizeFrom( function(){

		return [800*globalWindowX/this.imageX, 140*globalWindowX/this.imageX];
	}.bind(this));


	this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);

	/******************************************************************/


};

CostPage.prototype = Object.create(View.prototype);
CostPage.prototype.constructor = CostPage;

CostPage.DEFAULT_OPTIONS = {};