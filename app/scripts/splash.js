function Splash() {

	this.begin = function(){
		var logo = $('.logo');
		logo.css('opacity', '1');

		var i = 1;
		var interval = setInterval(function(){
			if (i<4){
				$('.ellipse'+i).addClass('anim-ellipses');
				i++;
			}
			else {clearInterval(interval);}
		}, 500);
	};

	this.end = function(){
		console.log('Ending Splash...');
		var logo = $('.logo');
		logo.css('opacity', '1');

		var i = 1;
		var interval = setInterval(function(){
			if (i<4){
				$('.ellipse'+i).css('opacity', '0');
				i++;
			}
			else {
				clearInterval(interval);
				$('.loading').css('opacity', '0');
				setTimeout(function(){
					$('.splash').css('display', 'none');
					$('.logoSplash').one('animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration', function(){
						//$('.logo').attr('class', 'logo');
						$('.logo').removeClass('logoSplash');
						$('.galNav').css('opacity', '1');
						$('.featured').css('display', '');
						setTimeout(function(){$('.featured').css('opacity', '1');},10);
						$('.diamonds').css('opacity', '1');
					});
				}, 500);
			}
		}, 500);
	};
}
var splash = new Splash();