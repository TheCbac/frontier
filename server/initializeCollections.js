if (emailCollection.find().count()===0){
	
	emailCollection.insert({
		email:"ccheney@mit.edu"
	});
}