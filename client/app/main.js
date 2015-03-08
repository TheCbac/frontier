famous.polyfills;
famous.core.famous;

var mainContext = famous.core.Engine.createContext();
var Scrollview = require('famous/views/Scrollview');
var Surface 			= require('famous/core/Surface');
var View 				= require('famous/core/View');
var EventHandler 		= require('famous/core/EventHandler');


/* Create and array for the slide tiles */
var tiles = [];
/* Create the scrollview */
scroll = new Scrollview({
	paginated:true,
	speedLimit: 0.9,
	// pageStopSpeed: 0.1,
	//drag: 10,

	pageDamp: 2,
});

scroll.sequenceFrom(tiles);

/* Event Handlers */
eventHandler = new EventHandler();
eventHandler.on('pullDownClicked', function(){
	scroll.goToNextPage();
});

eventHandler.on('returnToTopClicked', function(){
	scroll.goToPage(0);
});

/* First slide - titleView */
var titleView = new TitleView();
tiles.push(titleView);
scroll.subscribe(titleView);


/* Second Slide - frontier awaits */
var frontierAwaitsView = new FrontierAwaitsView();
tiles.push(frontierAwaitsView);
scroll.subscribe(frontierAwaitsView);


/* Third Slide - Mist rocks */
var mistRocksView = new MistRocksView();
tiles.push(mistRocksView);
scroll.subscribe(mistRocksView);



/* Crete the main context */
mainContext.add(scroll);