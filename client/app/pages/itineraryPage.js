var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');




Template.itineraryPage.helpers({
	content: function(){
		
		var itineraryContext = Engine.createContext();
		var itineraryView = new ItineraryView();

		itineraryContext.add(itineraryView);

	}
});

