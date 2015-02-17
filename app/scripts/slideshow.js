function Interval(){
	'use strict';
	this.stopped = true;

	var timeout;
	var parent = this;

	this.set = function(func, wait){
		parent.stopped = false;
		var loop = (function(w){
			//console.log('loop called');
			return function(){
				if (!parent.stopped){
					timeout = setTimeout(loop, w);
					func.call(null);
					//console.log('callback called');
				}
			};
		}(wait));
		timeout = setTimeout(loop, wait);
		//loop(wait);
	};

	this.clear = function(){
		parent.stopped = true;
		clearTimeout(timeout);
	};
}

function SlideShow (){
	'use strict';

	this.running = false;
	this.paused = false;
	this.loaded = false;
	this.hidden = true;

	var parent = this;
	var showLength;
	//var slideInterval;
	var interval = new Interval();
	var currentSlide = 0, lastSlide = 0;

	setInterval(function(){if (document.hasFocus()) { if (parent.paused && !parent.hidden) {parent.resume();}} else {if (parent.running && !parent.hidden) {parent.pause();}}}, 50);

	this.start = function(){
		if (!parent.loaded) { parent.load(); parent.start(); return; }
		if (parent.running) {return;}
		parent.mouseListen(true);
		parent.running = true;
		parent.hidden = false;
		currentSlide = 0; lastSlide = 0;

		$('.logo').css('opacity', '0.1');

		$(document).on('click', '.nextSlide', function(){
			//console.log('nextslide click');
			//clearInterval(slideInterval);
			interval.clear();
			//parent.nextSlide(function(){slideInterval = setInterval(parent.nextSlide, 5000);});
			parent.nextSlide(function(){interval.set(parent.nextSlide, 5000);});
		});
		$(document).on('click', '.playback p', function(){
			if (parent.paused){
				parent.hidden = true;
				parent.resume();
				$('.playback p').html('click to view image');
				$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');
				$('.logo, .galNav, .nextSlide, .lastSlide').fadeIn(500);
			} 
			else {
				parent.hidden = true;
				parent.pause();
				$('.playback p').html('click to exit');
				$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');
				$('.logo, .galNav, .nextSlide, .lastSlide').fadeOut(500);
			}
		});
		$(document).on('click', '.lastSlide', function(){
			//console.log('lastslide click');
			//clearInterval(slideInterval);
			interval.clear();
			//parent.lastSlide(function(){slideInterval = setInterval(parent.nextSlide, 5000);});
			parent.lastSlide(function(){interval.set(parent.nextSlide, 5000);});
		});

		//slideInterval = setInterval(parent.nextSlide, 5000);
		//interval.set(parent.nextSlide, 5000);
		//$('.nextSlide, .lastSlide').css('opacity', '0.5');
		console.log('SlideShow Started');
		//fix slideshow start delay
	};

	this.stop = function(){
		if (!parent.running) {return;}
		parent.mouseListen(false);
		$(document).off('click', '.nextSlide');
		$(document).off('click', '.playback');
		$(document).off('click', '.lastSlide');
		//clearInterval(slideInterval);
		interval.clear();
		$('.image').eq(lastSlide).css('opacity', '0');
		$('.logo').css('opacity', '');
		parent.running = false;
		//console.log('SlideShow Stopped');
	};

	this.pause = function(hide){
		if (parent.paused) {return;}
		parent.mouseListen(false);
		//clearInterval(slideInterval);
		interval.clear();
		parent.running = false;
		parent.paused = true;
		if (hide) {$('.image').eq(lastSlide).css('opacity', '0');parent.hidden = true;}
		$('.logo').css('opacity', '');
		//console.log('SlideShow Paused');
	};

	this.resume = function(){
		$('.logo').css('opacity', '0.1');
		$('.image').eq(lastSlide).css('opacity', '1');
		//slideInterval = setInterval(parent.nextSlide, 5000);
		interval.set(parent.nextSlide, 5000);
		parent.mouseListen(true);
		parent.running = true;
		parent.paused = false;
		parent.hidden = false;
		//console.log('SlideShow Resumed');
	};

	this.load = function(){
		$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');
		//http://joshjamesphotos.com
		$.post('http://joshjamesphotos.com/getImages.php', 'cmd=slideshow', function(data){
			//console.log(data);
			var files = data.split('|');
			var count = 0;
			showLength = files.length - 1;
			for (var i=0; i < files.length; i++) {
				$('.slideshow').append('<div class=\'image\' style=\'background-image: url("'+files[i]+'");\'></div>');
				count++;
				if (count === files.length) {
					//var image = new Image();
    				//image.src = files[i];
    				//image.onload = function(){
    					//console.log('images loaded');
    					//parent.nextSlide();
    					//$('.nextSlide, .lastSlide').css('opacity', '0.5');
    					//slideInterval = setInterval(parent.nextSlide, 5000);
    					//interval.set(parent.nextSlide, 5000);
    				//};

					$('<img/>').attr('src', files[i]).load(function() {
   						$(this).remove(); // prevent memory leaks
   						parent.nextSlide();
    					$('.nextSlide, .lastSlide').css('opacity', '0.5');
    					interval.set(parent.nextSlide, 5000);
					});	
				}
			}
		});
		parent.loaded = true;
		console.log('SlideShow Loaded');
	};

	this.nextSlide = function(callback){
		if (currentSlide !== lastSlide){
			$('.image').eq(lastSlide).css('opacity', '0');
		}
		if (currentSlide > showLength) { currentSlide = 0; lastSlide = 0;}
		$('.image').eq(currentSlide).css('opacity', '1');
		$('.lastSlide').css('background-image', $('.image').eq((lastSlide === 0 && currentSlide === 0) ? showLength : lastSlide).css('background-image'));
		lastSlide = currentSlide;
		$('.nextSlide').css('background-image', $('.image').eq((currentSlide === showLength)? 0 : currentSlide+1).css('background-image'));
		currentSlide++;
		if (callback) {callback();}
		//console.log('Next Slide');
	};

	this.lastSlide = function(callback){
		if (currentSlide !== lastSlide){
			$('.image').eq(currentSlide-1).css('opacity', '0');
		}
		//if (currentSlide === 0 && lastSlide === 0) { currentSlide = showLength; lastSlide = showLength-1;}
		$('.image').eq(lastSlide-1).css('opacity', '1');
		lastSlide--;
		$('.lastSlide').css('background-image', $('.image').eq((lastSlide === 0 && currentSlide === 0) ? showLength : lastSlide-1).css('background-image'));
		currentSlide--;
		$('.nextSlide').css('background-image', $('.image').eq((currentSlide === showLength)? 0 : currentSlide).css('background-image'));
		if (callback) {callback();}
		//console.log('Previous Slide');
	};

	var mouseTimer;
	this.mouseListen = function(listen){
		if (listen) {
			var x = 0, y = 0;
			$(window).bind('mousemove', function(e){
				if (e.clientX !== x && e.clientY !== y){ 
					x = e.clientX;
        			y = e.clientY;
					clearTimeout(mouseTimer);
					$('.logo').css('opacity', '1');
					$('.playback p').css('opacity', '0.5');
					//console.log('Mouse Move');

					mouseTimer = setTimeout(function(){
						$('.logo').css('opacity', '0.1');
						$('.playback p').css('opacity', '0');
						//console.log('fadeout');
					}, 1000);
				}
			});
		}
		else {
			clearTimeout(mouseTimer);
			$(window).unbind('mousemove');
		}
	};
}