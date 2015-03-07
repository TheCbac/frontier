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

// var title2 = new TitleView();
// tiles.push(title2);
// scroll.subscribe(title2);

/* Crete the main context */
mainContext.add(scroll);