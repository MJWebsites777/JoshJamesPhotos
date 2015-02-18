//TODO------------------
//add arrow key control
//slideshow load timeout?
//----------------------

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

var interval = new Interval();
function SlideShow (){
	'use strict';

	this.running = false;
	this.paused = false;
	this.loaded = false;
	this.hidden = true;

	var parent = this;
	var showLength;
	//var slideInterval;
	var currentSlide = 0, lastSlide = 0;

	setInterval(function(){
		if (document.hasFocus()) { 
			if (parent.paused && !parent.hidden) {
				parent.resume();
			}
		} 
		else {
			if (parent.running && !parent.hidden) {
				parent.pause();
			}
		}
	}, 50);

	this.start = function(){
		if (!parent.loaded) { parent.load(); parent.start(); return; }
		if (parent.running) {return;}
		//parent.mouseListen(true);
		parent.running = true;
		parent.hidden = false;
		currentSlide = 0; lastSlide = 0;
		$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');

		$('.logo').css('opacity', '0.1');

		$(document).on('click', '.nextSlide', function(){
			//console.log('nextslide click');
			//clearInterval(slideInterval);
			interval.clear();
			//parent.nextSlide(function(){slideInterval = setInterval(parent.nextSlide, 5000);});
			parent.nextSlide(function(){interval.set(parent.nextSlide, 5000);});
			//parent.nextSlide();
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
		if (hide) {
			$('.slideshow').css('opacity', '0');
			$('.overlay').css('z-index', '0');
			$('.image').eq(lastSlide).css('opacity', '0');
			$('.nextSlide, .lastSlide').css('opacity', '0');
			/*$('.image').eq(lastSlide).css('opacity', '0');*/
			parent.hidden = true;
		}
		$('.logo').css('opacity', '');
		//console.log('SlideShow Paused');
	};

	this.resume = function(){
		$('.overlay').css('z-index', '');
		$('.slideshow').css('opacity', '1');
		$('.logo').css('opacity', '0.1');
		$('.image').eq(lastSlide).css('opacity', '1');
		$('.nextSlide, .lastSlide').css('opacity', '0.5');
		//slideInterval = setInterval(parent.nextSlide, 5000);
		interval.set(parent.nextSlide, 5000);
		parent.mouseListen(true);
		parent.running = true;
		parent.paused = false;
		parent.hidden = false;
		//console.log('SlideShow Resumed');
	};

	this.load = function(){
		$('.logo').css('opacity', '1');
		$('.playback p').css('opacity', '0.5');
		loopLoad(true);
		$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');
		//http://joshjamesphotos.com/
		$.post('http://joshjamesphotos.com/getImages.php', 'cmd=slideshow', function(data){
			//console.log(data);
			var files = data.split('|');
			var count = 0;
			showLength = files.length - 1;
			var filename = '';
			imgCount = 0;
			for (var i=0; i < files.length; i++) {
				filename = files[i];
				//$('.slideshow').append('<div class=\'image\' style=\'background-image: url("'+files[i]+'");\'></div>');
				$('.slideshow').append('<div class=\'image\' style=\'background-image: url("'+filename+'");\'></div>');
				count++;

				var image = new Image();
				image.onload = function(){
					imgLoaded(this.src, function(){
						if (imgCount === showLength){
					    	console.log('All images are rendered.');
					    	$('.nextSlide, .lastSlide').css('opacity', '0.5');
							loopLoad(false);
							$('.playback p').html('click to view image');
							slideShow.nextSlide();
							interval.set(slideShow.nextSlide, 5000);
							slideShow.mouseListen(true);
						}
					});
				};
				image.src = files[i];
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
var imgCount = 0;
function imgLoaded(name, callback)  {
	'use strict';
    requestAnimationFrame(function(){
    	requestAnimationFrame(function(){
    		console.log(name+' rendered.');
    		callback();
			imgCount++;
    	});
	});
}
var loop = new Interval();
function loopLoad(cmd){
	'use strict';
	if (cmd){
		var msgObj = $('.playback p');
		var msg = $('.playback p').html();
		loop.set(function(){
			if (msg.indexOf('...') !== -1){msg = msg.replace('...', '.&nbsp&nbsp');msgObj.html(msg);}
			else if (msg.indexOf('..') !== -1){msg = msg.replace('..&nbsp', '...');msgObj.html(msg);}
			else if (msg.indexOf('.') !== -1){msg = msg.replace('.&nbsp&nbsp', '..&nbsp');msgObj.html(msg);}
		}, 100);
	} else {loop.clear();}
}