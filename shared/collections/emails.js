emailCollection = new Mongo.Collection('Emails');
 
emailCollection.allow({
	insert: function(){
		return true;
	},

	remove: function(userId){
		user = Meteor.users.findOne({_id:userId});
		return (user.profile.role == 'admin');
	}

});


