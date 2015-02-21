
function Page (){
	'use strict';
	this.gotoHome = function(){ 
		'use strict';
		lastPage = currentPage;
		switch (lastPage) {
			case 'gallery':
				slideShow.pause(true);
				//$('.nav1').css('opacity', '');
				$('.gallery').css('display', '');

				//Possible issue with slideshow fadein
				//----------------------------
				$('.'+gallery.current).css('opacity', '');
				//----------------------------
				
				$('.slideshow').css('opacity', '0');
				$('.nav1').css({'background-color': '', 'opacity': ''});
				$('.galNav').css({'opacity': '0', 'display': 'none'});
				$('.nav1 h1').css('display', '');
				$('.logo').css({'transform': 'translateY(0%) rotateZ(-45deg)  scale(1)', 'opacity': '1'});
				setTimeout(function(){$('.nav1 h1').css({'transform': '', 'opacity': 1});},10);
				$('.nav1').css('transform', 'scale(1)').addClass('navHover');
				//$('.nav3').css('transform', 'rotateZ(0deg)');
				//$('.nav2').css('transform', 'rotateZ(0deg)');
				$('.nav3, .nav2').css('transform', 'scaleY(1)');
				//$('.nav2').css('transform', 'scaleY(0%)');
				setTimeout(function(){$('.diamonds').css('z-index', '2');}, 500);
				break;
			case 'bio':
		
				break;
			case 'contact':
		
				break;
			default:
				break;
		}
		currentPage = 'home';
	};
	this.gotoGallery = function(){
		'use strict';
		
		lastPage = currentPage;
		//$('.nav2').css('transform', 'rotateZ(90deg)');
		//$('.nav3').css('transform', 'rotateZ(-90deg)');
		$('.diamonds').css('z-index', '0');
		if (gallery.current === 'slideshow') {$('.slideshow').css('opacity', '1');}
		$('.nav3, .nav2').css('transform', 'scaleY(0)');
		$('.nav1').css({'background-color': 'rgba(0,0,0,0.75)', 'transform': 'scale(1,2)'}).removeClass('navHover');
		$('.nav1 h1').css({'transform': 'translateY(50%)', 'opacity': 0});
		$('.logo').css('transform', 'translateY(-'+Math.ceil($(window).height()/2.8)+'px) rotateZ(-45deg) scale(0.5)');
		currentPage = 'gallery';
		//gallery.current = 'slideshow';
		setTimeout(function(){
			$('.nav1 h1').css('display', 'none');
			$('.galNav').css('display', 'block').animate({opacity: '0.75'}, 500);
			$('.nav1').css('opacity', '1');
			$('.gallery').css('display', 'inline-block');
			setTimeout(function(){
				if (gallery.current === 'slideshow'){
					if (slideShow.paused) {slideShow.resume();} else {slideShow.start();}
				} else {$('.'+gallery.current).css('opacity', '1');}
			}, 1000);
		}, 500);
	};
	this.gotoBio = function(){
		'use strict';
		//lastPage = currentPage;
	
		//currentPage = 'bio';
	};
}