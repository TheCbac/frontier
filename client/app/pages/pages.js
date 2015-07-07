var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');

// Administrator page
Template.adminPage.helpers({
	content: function(){

		var adminContext = Engine.createContext();
		emailTiles =[];
		emailScroll= new Scrollview();
		emailScroll.sequenceFrom(emailTiles);

		number = emailCollection.find().count();

		emailCursor = emailCollection.find();

		emailCursor.forEach( function(email){
			var emailCollectionView = new EmailCollectionView(email.email);
			emailTiles.push(emailCollectionView);
			emailScroll.subscribe(emailCollectionView);
		});

		// for (var i = 0; i < number; i++) {
		// 	var emailCollectionView = new EmailCollectionView(1);
		// 	emailTiles.push(emailCollectionView);
		// }

		

		adminContext.add(emailScroll);
	}
});

Template.costPage.helpers({
	content: function(){

		this.costContext = Engine.createContext();

		Engine.on('resize', function(){
			// updateWindowSize();
			this.costScroll.setPosition(0);
			
		}.bind(this));

		// this.itineraryView = new ItineraryView();
		// this.costPage.add(this.itineraryView);

		this.costTiles =[];
		this.costScroll = new Scrollview();
		this.costScroll.sequenceFrom(this.costTiles);

		this.costPage = new CostPage();
		this.costTiles.push(this.costPage);
		this.costScroll.subscribe(this.costPage);

		this.costContext.add(this.costScroll); 
	}
});

// Oregon Itinerary
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

