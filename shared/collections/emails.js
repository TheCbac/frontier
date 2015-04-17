emailCollection = new Mongo.Collection('Emails');
 
emailCollection.allow({
	insert: function(){
		return true;
	},


});