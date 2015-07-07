Router.configure({

	notFoundTemplate:"notFoundPage",

});

Router.onRun(function(){
	if (!Meteor.loggingIn() && !Meteor.user()) {
		this.redirect('/login');
	} else {
		this.next();
	}
 }, {
 	//whitelist which routes don't need to be signed in for 
 	except:[
 	'pageNotFoundRoute',
 	'landingPageRoute',
 	'loginPageRoute',
 	'itineraryRoute',
 	'costRoute',
 	'costsRoute',
 	]
 });


Router.route('landingPageRoute', {
	path:'/',
	template: 'landingPage',
});

Router.route('adminPageRoute',{
	path:'/admin',
	template:'adminPage'
});

Router.route('loginPageRoute',{
	path:'/login',
	template:'loginPage'
});


Router.route('itineraryRoute',{
	path:'/itinerary',
	template:'itineraryPage'
});

Router.route('costRoute',{
	path:'/cost',
	template:'costPage'
});

Router.route('costsRoute',{
	path:'/costs',
	// redirect:'/cost'
	template:'costPage'
});



