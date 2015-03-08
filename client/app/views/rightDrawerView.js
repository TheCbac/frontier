var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');
var StateModifier 		= require('famous/modifiers/StateModifier');

RightDrawerView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	this.viewModifier.sizeFrom(function(){
		return [window.innerWidth, window.innerHeight];
	});

	this.viewNode = this.add(this.viewModifier);

	/******************* Background Surface *****************************/
	this.drawerSurface = new Surface({
		content: "test",
		properties: {
			backgroundColor: "gray"
		}
	});

	this.drawerMod = new StateModifier({
		size: [200, window.innerHeight],
		origin:[0,0],
		align: [1,0],
	});


	this.viewNode.add(this.drawerMod).add(this.drawerSurface);

	this.drawerSurface.on('click', function(event){
		eventHandler.emit('toggleDrawer');
	});
	/******************************************************************/

	/* State for hidding and Showing */
	this.state = "hidden";
};

RightDrawerView.prototype = Object.create(View.prototype);
RightDrawerView.prototype.constructor = RightDrawerView;

RightDrawerView.DEFAULT_OPTIONS = {};