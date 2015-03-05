famous.polyfills;
famous.core.famous;

var mainContext = famous.core.Engine.createContext();
var Scrollview = require('famous/views/Scrollview');


imageBlock = backgroundImage();

mainContext.setSize([1440,2560]);
//mainContext.sizeFrom(function(){return [window.innerWidth, window.innerHeight];});
mainContext.add(imageBlock);
	