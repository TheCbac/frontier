famous.polyfills;
famous.core.famous;


var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');
var ScrollContainer 	= require('famous/views/ScrollContainer');
var Surface 			= require('famous/core/Surface');
var View 				= require('famous/core/View');
var EventHandler 		= require('famous/core/EventHandler');
var RenderController 	= require('famous/views/RenderController');

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
/* Create the scrollview */
// scroll = new Scrollview({
// 	// paginated:true,
// 	//speedLimit: 0.9,
// 	// pageStopSpeed: 0.1,
// 	//drag: 10,
// 	// pagePeriod: 1,
// 	// pageDamp: 2,
// });
//scroll = new ScrollContainer();
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


// /* Third Slide - Mist rocks */
// var mistRocksView = new MistRocksView();
// tiles.push(mistRocksView);
// scroll.subscribe(mistRocksView);


rightDrawer = new RightDrawerView();


// var mooseView = new MooseView();
// tiles.push(mooseView);
// scroll.subscribe(mooseView);


var pictureGrid =[];





// add the mooseView
var mooseView = new MooseView();
pictureGrid.push(mooseView);
scroll.subscribe(mooseView);


// Add the barnView to picture tiles 
var barnView = new BarnView();
pictureGrid.push(barnView);
scroll.subscribe(barnView);

var trailView = new TrailView();
pictureGrid.push(trailView);
scroll.subscribe(trailView);

//Picture at bottom of the screen 
pictureGridView = new PictureGridView();
pictureGridView.gridLayout.sequenceFrom(pictureGrid);

tiles.push(pictureGridView);
scroll.subscribe(pictureGridView);




/* Crete the main context */
mainContext.add(scroll);
mainContext.add(renderController);




// mainContext.add(rightDrawer);

// renderController.hide(rightDrawer);
// renderController.show(rightDrawer);

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

// eventHandler.on('toggleDrawer',function(){
// 	if (rightDrawer.state == "hidden"){
// 		renderController.show(rightDrawer);
// 		rightDrawer.drawerMod.setOrigin([1, 0], {duration: 1000} );
// 		rightDrawer.state = "shown";
// 	}

// 	else if (rightDrawer.state == "shown"){
// 		rightDrawer.drawerMod.setOrigin([0,0], {duraction: 1000 });
// 		renderController.hide(rightDrawer);
// 		rightDrawer.state = "hidden";
// 	}
// });


