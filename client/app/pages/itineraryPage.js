var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');




Template.itineraryPage.helpers({
	content: function(){
		
		this.itineraryContext = Engine.createContext();

		Engine.on('resize', function(){
			// updateWindowSize();
			this.itinScroll.setPosition(0);
			
		}.bind(this));

		// this.itineraryView = new ItineraryView();
		// this.itineraryContext.add(this.itineraryView);

		this.itinTiles =[];
		this.itinScroll = new Scrollview();
		this.itinScroll.sequenceFrom(this.itinTiles);

		this.itineraryView = new ItineraryView();
		this.itinTiles.push(this.itineraryView);
		this.itinScroll.subscribe(this.itineraryView);

		this.itineraryContext.add(this.itinScroll); 


	}
});

