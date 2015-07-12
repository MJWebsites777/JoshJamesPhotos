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
					$('.logoSplash').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
						$('.logo').attr('class', 'logo');
						console.log('logoSplash done');
						//$('.logoSplash').off('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
					});
				}, 500);
			}
		}, 500);
	};
}
var splash = new Splash();