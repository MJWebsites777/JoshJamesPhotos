//TODO

var currentPage = 'home', lastPage = '';
$(document).ready(function() {
	slideShow.start();

//Clicks
	var isAnimating = false;
	var bioOpen = false;
	$(document).on('mouseover', '.bioContent', function(){
		if (!isAnimating && !bioOpen){
			var bio = $('.bio');
			bio.css({
				'transform': 'translateY(-120%)',
				'cursor': 'default'
			});
			$('.bioOverlay').css('display', 'block');
			setTimeout(function(){$('.bioOverlay').css('opacity', '1');}, 50);
			slideShow.pause();
			slideShow.focused = false;
			bioOpen = true;
		}
	});
	$(document).on('click', '.hideBio', function(){
		var bio = $('.bio');
		bio.css({
			'transform': '',
			'cursor': ''
		});
		isAnimating = true;
		$('.bioOverlay').css('opacity', '');
		setTimeout(function(){
			$('.bioOverlay').css('display', ''); 
			isAnimating = false;
			bioOpen = false;
		}, 550);
		slideShow.resume();
		slideShow.focused = true;
	});
//------
	var img = new Image();
	img.src = '../images/cover.jpg';
	img.onload = function() {
		$('.bgImg').css('opacity','1');
		$('.nav').css('opacity', '1');
		slideShow.load();
	};
});