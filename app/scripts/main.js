//TODO

var currentPage = 'home', lastPage = '';
$(document).ready(function() {
	//slideShow.start();

	var img = new Image();
	img.src = '../images/cover.jpg';
	img.onload = function() {
		$('.bgImg').css('opacity','1');
		//$('.nav').css('opacity', '1');
		slideShow.load(function(){
			splash.end();
		});
		splash.begin();
	};
});