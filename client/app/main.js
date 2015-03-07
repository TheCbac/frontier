famous.polyfills;
famous.core.famous;

var mainContext = famous.core.Engine.createContext();
var Scrollview = require('famous/views/Scrollview');
var Surface 			= require('famous/core/Surface');
var View 				= require('famous/core/View');



/* Create and array for the slide tiles */
var tiles = [];
/* Create the scrollview */
var scroll = new Scrollview();
scroll.sequenceFrom(tiles);

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