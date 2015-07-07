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
var t = 0;
$(document).on("mousemove", function() {
    if (t > 5) {
        $(".protectP").each(function() {
            $(this).children(".num").html("(" + $(this).data("a") + ") " + $(this).data("e") + "-" + $(this).data("s"));
        });
        $(".protectE").each(function() {
            $(this).html($(this).data("e") + "@" + $(this).data("d") + "." + $(this).data("tld"));
        });
    }
    t++;
});
$(document).on('click', '.bioContainer h1', function(){
	
});