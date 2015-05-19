famous.polyfills;
famous.core.famous;


var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');
var ScrollContainer 	= require('famous/views/ScrollContainer');
var Surface 			= require('famous/core/Surface');
var View 				= require('famous/core/View');
var EventHandler 		= require('famous/core/EventHandler');
var RenderController 	= require('famous/views/RenderController');

var Transform 			= require('famous/core/Transform');
var mainContext = Engine.createContext();

// Make sure that the window is sized properly once it is created
Engine.nextTick(function(){
	updateWindowSize();
	pictureGridView.gridLayout.setOptions({
		dimensions:[globalGridX, globalGridY]
	});
});	

Engine.on('resize', function(){
	updateWindowSize();
	pictureGridView.gridLayout.setOptions({
		dimensions:[globalGridX, globalGridY]
	});

});



/* Create and array for the slide tiles */
var tiles = [];
scroll = new Scrollview();
scroll.sequenceFrom(tiles);




/* Render Controller */
var renderController = new RenderController();



/* First slide - titleView */
var titleView = new TitleView();
tiles.push(titleView);
scroll.subscribe(titleView);


/* Second Slide - frontier awaits */
var frontierAwaitsView = new FrontierAwaitsView();
tiles.push(frontierAwaitsView);
scroll.subscribe(frontierAwaitsView);

/* Third Slide - Dates */
var datesView = new DatesView();
tiles.push(datesView);
scroll.subscribe(datesView);



var pictureGrid =[];





// add the mooseView
//var mooseView = new MooseView();
var mooseView = new PictureTileView('mooseTile', '/pictures/mooseCropped.jpeg', 
	587,700, "BECOME ONE WITH NAUTRE", "WHITE WATER RAFTING",0.2, 250, 0.2, 250);
pictureGrid.push(mooseView);
scroll.subscribe(mooseView);


// Add the barnView to picture tiles 
var barnView = new PictureTileView('barnTile','/pictures/woodgrain.jpg',
	1050,700, "THE BROAD SIDE OF THE BARN","BARN NIGHTS", 0.2, 300, 0.3, 250);
pictureGrid.push(barnView);
scroll.subscribe(barnView);

// var trailView = new TrailView();
var trailView = new PictureTileView('trailTile','/pictures/trailCropped.jpeg',
	609,725, "HOOF IT", "CASCADE DAZE", 0.35, 175, 0.2, 250);
pictureGrid.push(trailView);
scroll.subscribe(trailView);


//var grapeView = new MooseView();
var grapeView = new PictureTileView('grapeTile' ,'/pictures/grapes_compressed.jpg', 
	3888,2592, "CHEHALEM VALLEY", "WINE & CHEESE", 0.1, 200, 0.2, 250);
pictureGrid.push(grapeView);
scroll.subscribe(grapeView);



//Pictures at bottom of the screen 
pictureGridView = new PictureGridView();
pictureGridView.gridLayout.sequenceFrom(pictureGrid);

tiles.push(pictureGridView);
scroll.subscribe(pictureGridView);


// Sign up view
signUpView = new SignUpView();
tiles.push(signUpView);
scroll.subscribe(signUpView);

// Footer view
footerView = new FooterView();
tiles.push(footerView);
scroll.subscribe(footerView);

/* Create the main context */
Template.landingPage.helpers({
	content: function(){
		mainContext.add(scroll);
		updateWindowSize();
		// mainContext.add(renderController);
	}
});
// mainContext.add(scroll);
// mainContext.add(renderController);




/* Event Handlers */
eventHandler = new EventHandler();
eventHandler.on('pullDownClicked', function(){
	scroll.goToNextPage();
});

eventHandler.on('returnToTopClicked', function(){
	scroll.goToPage(0);
});

eventHandler.on('tileState2', function(){
	frontierAwaitsView.renderController.hide({duration :0});
	//datesView.renderController.hide({duration:0});
});

eventHandler.on('tileState1', function(){
	frontierAwaitsView.renderController.show(frontierAwaitsView.pullDownImage, {duration :0} );
	datesView.renderController.show(datesView.pullDownImage, {duration :0} );
	
});

eventHandler.on('goToSignUp', function(){
	scroll.goToPage(4);
});



