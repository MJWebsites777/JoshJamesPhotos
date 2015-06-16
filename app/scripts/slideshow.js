//TODO------------------
//add arrow key control
//display images as they load?
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
	this.waiting = false;
	this.focused = true;
	this.animating = false;

	var parent = this;
	var showLength;
	var currentSlide = 0, lastSlide = 0, nextSlide = 0;

	setInterval(function(){
		if (document.hasFocus()) { 
			if (parent.paused && parent.focused) {
				parent.resume();
			}
		} 
		else {
			if (parent.running) {
				parent.pause();
			}
		}
	}, 50);

	this.start = function(){
		if (!parent.loaded) { parent.waiting = true; return;}
		else {
			//$('.slideshow').css('opacity', '1');
			//$('.nextSlide, .lastSlide').css('opacity', '0.5');
    		parent.nextSlide();
			interval.set(parent.nextSlide, 5000);
			//slideShow.mouseListen(true);
		}
		if (parent.running) {return;}
		parent.running = true;
		//currentSlide = 0; lastSlide = 0;

		//$('.logo').css('opacity', '0.1');

		$(document).on('click', '.nextSlide', function(){
			if (!parent.animating){
				//console.log('nextslide click');
				interval.clear();
				parent.nextSlide(function(){interval.set(parent.nextSlide, 5000);});
			}
		});
		$(document).on('click', '.photos', function(){
			parent.pause();
			parent.focused = false;
			$('.imgViewer div').css('background-image', $('.image').eq(currentSlide).css('background-image'));
			$('.imgViewer').css('display', 'block');
			setTimeout(function(){$('.imgViewer').css('opacity', '1');}, 50);
		});
		$(document).on('click', '.lastSlide', function(){
			if (!parent.animating){
				//console.log('lastslide click');
				interval.clear();
				parent.lastSlide(function(){interval.set(parent.nextSlide, 5000);});
			}
		});
		console.log('SlideShow Started');
	};

	this.stop = function(){
		if (!parent.running) {return;}
		//parent.mouseListen(false);
		$(document).off('click', '.nextSlide');
		$(document).off('click', '.photos');
		$(document).off('click', '.lastSlide');
		interval.clear();
		$('.image').eq(lastSlide).css('opacity', '0');
		$('.logo').css('opacity', '');
		parent.running = false;
		//console.log('SlideShow Stopped');
	};

	this.pause = function(defocus){
		if (parent.paused) {return;}
		//parent.mouseListen(false);
		interval.clear();
		parent.running = false;
		parent.paused = true;
		if (defocus) {
			parent.focused = false;
		}
		$('.logo').css('opacity', '');
		//console.log('SlideShow Paused');
	};

	this.resume = function(){
		$('.overlay').css('z-index', '');
		$('.slideshow').css('opacity', '1');
		//$('.logo').css('opacity', '0.1');
		$('.image').eq(currentSlide).css('opacity', '1');
		//$('.nextSlide, .lastSlide').css('opacity', '0.5');
		interval.set(parent.nextSlide, 5000);
		//parent.mouseListen(true);
		parent.running = true;
		parent.paused = false;
		parent.focused = true;
		//console.log('SlideShow Resumed');
	};

	this.load = function(){
		//$('.gallery').css('opacity', '1');
		setTimeout(function(){
			$('.galNav').css('opacity', '1');
		}, 300);
		$('.logo').css('opacity', '1');
		$('.playback p').css('display', 'inline-block');
		$('.playback p').css('opacity', '0.5');
		//loopLoad(true);
		//http://joshjamesphotos.com/
		//this should read 'getImages.php' instead of 'http://joshjamesphotos.com/getImages.php'
		$.post('http://joshjamesphotos.com/getImages.php', 'cmd=slideshow', function(data){
			//console.log(data);
			var files = data.split('|');
			var count = 0;
			showLength = files.length - 1;
			var filename = '';
			renderCount = 0;
			for (var i=0; i < files.length; i++) {
				filename = files[i];
				$('.photos').append('<div class=\'image\' style=\'background-image: url("'+filename+'");\'></div>');
				count++;

				var image = new Image();
				image.onload = function(){
					renderLoaded(this.src, function(){
						if (renderCount === showLength){
					    	console.log('All images are rendered.');
					    	loopLoad(false);
					    	parent.loaded = true;
					    	if (parent.waiting){	
					    		parent.start();
					    	}	    	
							$('.playback p').css('opacity', '0');
							setTimeout(function(){$('.playback p').css('display', 'none');}, 500);
							parent.waiting = false;
						}
					});
				};
				image.src = files[i];
			}
		});
		//console.log('SlideShow Loaded');
	};

	this.nextSlide = function(callback){
		//console.log('Before Next\nLast: '+lastSlide+'\nCurrent: '+currentSlide);
		parent.animating = true;
		setTimeout(function(){parent.animating = false;}, 500);
		if ((currentSlide+lastSlide+nextSlide) === 0){
			lastSlide = showLength;
			nextSlide = 1;
		} 
		else {
			$('.image').eq(currentSlide).css('opacity', '0');
			lastSlide = currentSlide;
			currentSlide = nextSlide;
			((nextSlide+1) > showLength) ? nextSlide = 0 : nextSlide++;
		}
		$('.lastSlide').css('background-image', $('.image').eq(lastSlide).css('background-image'));
		$('.nextSlide').css('background-image', $('.image').eq(nextSlide).css('background-image'));
		$('.image').eq(currentSlide).css('opacity', '1');
		if (callback) {callback();}
		//console.log('Next Slide\nLast: '+lastSlide+'\nCurrent: '+currentSlide);
	};

	this.lastSlide = function(callback){
		//console.log('Before Last\nLast: '+lastSlide+'\nCurrent: '+currentSlide);
		parent.animating = true;
		setTimeout(function(){parent.animating = false;}, 500);
		if ((currentSlide+lastSlide+nextSlide) === 0){
			lastSlide = showLength;
			nextSlide = 1;
		} 
		else {
			$('.image').eq(currentSlide).css('opacity', '0');
			nextSlide = currentSlide;
			currentSlide = lastSlide;
			((lastSlide-1) < 0) ? lastSlide = showLength : lastSlide--;
		}
		$('.lastSlide').css('background-image', $('.image').eq(lastSlide).css('background-image'));
		$('.nextSlide').css('background-image', $('.image').eq(nextSlide).css('background-image'));
		$('.image').eq(currentSlide).css('opacity', '1');
		if (callback) {callback();}
		//console.log('Last Slide\nLast: '+lastSlide+'\nCurrent: '+currentSlide);
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
					//console.log('Mouse Move');

					mouseTimer = setTimeout(function(){
						$('.logo').css('opacity', '0.1');
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
var renderCount = 0;
function renderLoaded(name, callback)  {
	'use strict';
    requestAnimationFrame(function(){
    	requestAnimationFrame(function(){
    		console.log(name+' rendered.');
    		callback();
			renderCount++;
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