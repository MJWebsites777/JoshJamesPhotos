//TODO
//-organize all events from all files here
//-------------

var isAnimating = false;
var infoOpen = false;
$(document).on('click', '.bioDiamonds', function(){
	if (!isAnimating && !infoOpen){
		Info.gotoBio();
		var info = $('.info');
		info.css({
			'transform': 'translateY(-100%)',
			'cursor': 'default'
		});
		$('.infoOverlay').css('display', 'block');
		setTimeout(function(){$('.infoOverlay').css('opacity', '1');}, 50);
		if (slideShow.running){
			slideShow.pause();
			slideShow.focused = false;
		}
		infoOpen = true;
	}
});
$(document).on('click', '.contactDiamonds', function(){
	if (!isAnimating && !infoOpen){
		Info.gotoContact();
		var info = $('.info');
		info.css({
			'transform': 'translateY(-100%)',
			'cursor': 'default'
		});
		$('.infoOverlay').css('display', 'block');
		setTimeout(function(){$('.infoOverlay').css('opacity', '1');}, 50);
		if (slideShow.running){
			slideShow.pause();
			slideShow.focused = false;
		}
		infoOpen = true;
	}
});
$(document).on('click', '.infoContainer h1', function(){
	var t = $(this);
	if (t.attr('class').toLowerCase().indexOf('bio') != -1){
		Info.gotoBio();
	}
	else {
		Info.gotoContact();
	}
});
$(document).on('click', '.hideInfo', function(){
	var info = $('.info');
	info.css({
		'transform': '',
		'cursor': ''
	});
	isAnimating = true;
	$('.infoOverlay').css('opacity', '');
	setTimeout(function(){
		$('.infoOverlay').css('display', ''); 
		isAnimating = false;
		infoOpen = false;
	}, 550);
	if (slideShow.paused && !slideShow.hidden){
		slideShow.resume();
		slideShow.focused = true;
	}
});