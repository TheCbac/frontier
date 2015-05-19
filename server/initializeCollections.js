if (emailCollection.find().count()===0){
	console.log("insert initial email");
	emailCollection.insert({
		email:"ccheney@mit.edu"
	}, function(error, id){
		console.log(error, id);
	});
}

Meteor.publish('emailList', function(){
	user = Meteor.users.findOne({_id:this.userId});
	// debugger

	// return emailCollection.find();
	// console.log(Meteor.user().profile.role);
	if (user && user.profile !== undefined){
		if (user.profile.role=='admin'){
			return emailCollection.find();
		}
		else{

			return [];
		}
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
