var Engine 				= require('famous/core/Engine');
var Scrollview 			= require('famous/views/Scrollview');

var adminContext = Engine.createContext();





Template.adminPage.helpers({
	content: function(){


		emailTiles =[];
		emailScroll= new Scrollview();
		

		number = emailCollection.find().count();

		emailCursor = emailCollection.find();

		emailCursor.forEach( function(email){
			var emailCollectionView = new EmailCollectionView(email.email);
			emailTiles.push(emailCollectionView);
		});

		// for (var i = 0; i < number; i++) {
		// 	var emailCollectionView = new EmailCollectionView(1);
		// 	emailTiles.push(emailCollectionView);
		// }

		emailScroll.sequenceFrom(emailTiles);

		adminContext.add(emailScroll);
	}
});