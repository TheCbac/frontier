emailCollection = new Mongo.Collection('Emails');
 
emailCollection.allow({
	insert: function(userId){
		if(userId){
			user = Meteor.users.findOne({_id:userId});
			return (user.profile.role == 'admin');
		}
	},

	remove: function(userId){
		if(userId){
			user = Meteor.users.findOne({_id:userId});
			return (user.profile.role == 'admin');
		}
	}

});


