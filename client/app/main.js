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
//var mooseView = new MooseView();
var mooseView = new PictureTileView('/pictures/mooseCropped.jpeg', 587,700, "BECOME ONE WITH NAUTRE", "WHITE WATER RAFTING");
pictureGrid.push(mooseView);
scroll.subscribe(mooseView);


// Add the barnView to picture tiles 
var barnView = new PictureTileView('/pictures/woodgrain.jpg',1050,700, "THE BROAD SIDE OF THE BARN","BARN NIGHTS");
pictureGrid.push(barnView);
scroll.subscribe(barnView);

// var trailView = new TrailView();
var trailView = new PictureTileView('/pictures/trailCropped.jpeg',609,725, "HOOF IT", "CASCADE DAZE");
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


// resetBarn = function(){
// 	console.log("reset Barn");
// 	barnView.backgroundTrans.setRotate([0,0,0], {duration:0});
// };


// eventHandler.on('flipBarn', function(){
// 	console.log("flipBarn");
// 	// barnView.backgroundSurface.backgroundMod.trans.setRotate([180], {duration:100});
// 	// barnView.backgroundMod.setTransform(Transform.rotateZ(Math.PI/2));
// 	barnView.backgroundTrans.setRotate([0,2*Math.PI,0], {duration:2000}, resetBarn);
// });

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


