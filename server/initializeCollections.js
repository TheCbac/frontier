if (emailCollection.find().count()===0){
	
	emailCollection.insert({
		email:"ccheney@mit.edu"
	});
}

Meteor.publish('Emails', function(){
	user = Meteor.users.findOne({_id:userId});
	if (user.profile.role=='admin'){
		return emailCollection.find();
	}
	else{
		return [];
	}
});


if (Meteor.users.find().count() ===0){
	craigId = Accounts.createUser({
		email:'ccheney@mit.edu',
		password:'password',
		profile: {
			firstName: 'Craig',
			lastName:'Cheney',
			role:'admin',
			gender:"Male",
		}
	});
}

Meteor.methods({
	insertEmail: function(emailAddress){
		emailCollection.insert({email:emailAddress});
	}
});
