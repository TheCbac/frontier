var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var MouseSync 			= require('famous/inputs/MouseSync');
var PinchSync 			= require('famous/inputs/PinchSync');

ItineraryView = function(){

	/***************************** Main view ***************************/
	View.apply(this, arguments);
	// Create modifier
	this.viewModifier = new Modifier({
	});


	// size view to screen
	this.viewModifier.sizeFrom(function(){

		// if screen is wider than it is tall
		if ( globalWindowX/globalWindowY > 1){
			return [globalWindowX, globalWindowX/1000*2040];	
		}

		else {
			return [globalWindowY, globalWindowY/1000*2040];
		}
		
	}.bind(this));
	// Attach modifier to view
	this.viewNode = this.add(this.viewModifier);
	/******************************************************************/

	/******************* Background Surface *****************************/

	this.imageBackground = new ImageSurface({
		content: "/pictures/Itinerary-v3.jpg",
		properties:{
			userScalable:'yes'
		}
	});

	this.imageBackMod = new Modifier({
		size: [undefined, true],
		transform: Transform.translate(0,0,0),
		// origin:[0,0],
		// align: [1,0],
	});


	this.viewNode.add(this.imageBackMod).add(this.imageBackground);
	this.imageBackground.pipe(this._eventOutput);


	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/

	/******************* Background Surface *****************************/

	this.backgroundSurface = new ImageSurface({
		content: "",
		properties:{
			// backgroundColor:"#468C68",
			// color:"white",
			// fontSize:".8em",
			// textAlign:"center",
			// lineHeight:'25px',
			// fontFamily:"gothamHTF",
			borderWidth:'0px',
			cursor:'pointer',
						
		}
	});

	// Pinch Sync
	// this.pinchSync = new PinchSync();
	// this.backgroundSurface.pipe(this.pinchSync);

	// this.pinchSync.on('start', function(event){
	// 	console.log('pinch');
	// });

	// // mouse sync
	this.mouseSync = new MouseSync();
	this.backgroundSurface.pipe(this.mouseSync);

	this.mouseSync.on('end', function(event){
		// this.backgroundSurface.setProperties({
		// 	backgroundColor:"#569F5B",
		// 	borderColor:"#569F5B",
		// 	color:"#28303B",
		// });
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
		align: [0.51, 0.915],
		opacity:1,
	});

	this.backgroundMod.sizeFrom( function(){
		// console.log([250*this.scaling, 45]);
		// if screen is wider than it is tall
		if ( globalWindowX/globalWindowY > 1){	
			return [250*globalWindowX/1000, 45*globalWindowX/1000];
		}

		else {
			return [250*globalWindowY/1000, 45*globalWindowY/1000];
		}
		// return [250*globalWindowX/1000, 45*globalWindowX/1000];
	}.bind(this));


	this.viewNode.add(this.backgroundMod).add(this.backgroundSurface);
	this.backgroundSurface.pipe(this._eventOutput);


	// this.backgroundSurface.on('click', function(event){
	// 	eventHandler.emit('');
	// });
	/******************************************************************/


};

ItineraryView.prototype = Object.create(View.prototype);
ItineraryView.prototype.constructor = ItineraryView;

ItineraryView.DEFAULT_OPTIONS = {};