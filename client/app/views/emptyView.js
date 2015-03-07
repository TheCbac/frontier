var View 				= require('famous/core/View');
var Surface 			= require('famous/core/Surface');
var Transform 			= require('famous/core/Transform');
var ImageSurface 		= require('famous/surfaces/ImageSurface');
var Modifier 			= require('famous/core/Modifier');

EmptyView = function () {
	View.apply(this, arguments);

	this.viewModifier = new Modifier({
	});

	this.viewModifier.sizeFrom(function(){
		return [window.innerWidth, window.innerHeight];
	});

	this.viewNode = this.add(this.viewModifier);
};

EmptyView.prototype = Object.create(View.prototype);
EmptyView.prototype.constructor = EmptyView;

EmptyView.DEFAULT_OPTIONS = {};