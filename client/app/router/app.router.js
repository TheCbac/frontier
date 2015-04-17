Router.configure({

	notFoundTemplate:"notFoundPage",

});

Router.route('landingPageRoute', {
	path:'/',
	template: 'landingPage',
});