//TODO
//-organize all events from all files here
//-------------

var isAnimating = false;
var bioOpen = false;
$(document).on('click', '.bioDiamonds', function(){
	if (!isAnimating && !bioOpen){
		var bio = $('.bio');
		bio.css({
			'transform': 'translateY(-100%)',
			'cursor': 'default'
		});
		$('.bioOverlay').css('display', 'block');
		setTimeout(function(){$('.bioOverlay').css('opacity', '1');}, 50);
		if (slideShow.running){
			slideShow.pause();
			slideShow.focused = false;
		}
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
	if (slideShow.paused && !slideShow.hidden){
		slideShow.resume();
		slideShow.focused = true;
	}
});