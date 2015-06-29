var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');







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