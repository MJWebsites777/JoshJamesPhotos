//TODO ---------------------------
//gallery thumbnail right-click prevention?
//animated nextSlide and lastSlide images
//--------------------------------

function Gallery () {
	'use strict';
	this.current = 'featured';
	this.previous = '';
	this.loadedGalleries = [];

	var parent = this;

	this.load = function(id){
		var newGallery = '.'+id+' .gallery';
		parent.unload(parent.current, function(){
			$(newGallery).css({'visibility': 'visible', 'opacity': '1'});
			$(newGallery + ' .thumbScroller').niceScroll({
				autohidemode: 'leave',
				railoffset: {top:0, left:15}
			});
		});
		//http://joshjamesphotos.com/
		if (!parent.loaded(id)) {
			//this should read 'getImages.php' instead of 'http://joshjamesphotos.com/getImages.php'
			$.post('http://joshjamesphotos.com/getImages.php', 'cmd='+id, function(data){
				var files = data.split('|');
				var count = 0;
				var renderCount = 0;
				var filename = '';
				for (var i=0; i < files.length; i++) {
					filename = $('.'+parent.current+' .thumb').eq(i).children('.thumbnail').attr('src');
					$('.'+parent.current+' .columns').append('<div class="thumb"><img class="thumbnail" src="'+files[i]+'"></div>');
					//$('.'+parent.current+' .thumb').eq(i).css('opacity', '0.7');
					count++;
					if (count === 1) {
						var src = $('.'+parent.current+' .thumbnail').eq(0).attr('src');
						$('.'+parent.current+' .preview').css({'background-image': 'url('+src+')', 'opacity': '1'});
					}
					
					var image = new Image();
					image.onload = function(){
						renderLoaded(this.src, function(){
							$('.'+parent.current+' .thumb').eq(renderCount).css('opacity', '0.7');
							renderCount++;
						});
					};
					image.src = $('.'+parent.current+' .thumb').eq(renderCount).children('.thumbnail').attr('src');
				}
			});
		}
		else {
			$('.'+parent.current+' .thumb').each(function(i){
				var image = new Image();
				image.onload = function(){
					$(this).css('opacity', '0.7');
				};
				image.src = $(this).children('.thumbnail').attr('src');
			});
		}
		parent.previous = parent.current;
		parent.current = id;
		parent.loadedGalleries.push(id);
		//console.log(parent.current);
	};

	this.unload = function(id, callback){
		if (id === 'featured'){ 
			if (callback) {
				setTimeout(function(){callback();}, 500);
			}
		}
		else {
			$('.'+id+' .gallery').css('opacity', ''); 
			setTimeout(function(){
				$('.'+id+' .gallery').css('visibility', '');
				if (callback) {callback();}
			}, 500);
		}
		slideShow.pause(true);
	};

	this.loaded = function(id) {
		for (var i=0; i < parent.loadedGalleries.length; i++){
			if (parent.loadedGalleries[i] === id) {return true;}
		}
		return false;
	};
}

var gallery = new Gallery();
$(window).resize(function(){
	if (currentPage === 'gallery'){
		//$('.logo').css('transform', 'translateY(-'+Math.ceil($(window).height()/2.8)+'px) rotateZ(-45deg) scale(0.5)');
	}
});
$(document).on('click', '.galNav li', function() {
	var t = $(this);
	var id = t.children('h2').html().toLowerCase();
	if (gallery.current !== id) {
		$('.galNav h2').css('color', ''); 
		t.children('h2').css('color', 'rgba(255, 255, 255, 1)'); //rgba(251, 255, 109, 0.75)
		gallery.load(id); 
	}
});
$(document).on('click', '.thumb', function(){
	var t = $(this);
	var preview = t.parents('.thumbScroller').siblings('.preview');
	var src = t.children('.thumbnail').attr('src');
	if (preview.css('background-image').indexOf(src) !== -1) {return;}
	preview.css('opacity', '');
	setTimeout(function(){
		preview.css('background-image', 'url('+src+')');
		preview.css('opacity', '1');
	}, 300);
});
$(document).on('click', '.preview', function(){
	$('.imgViewer div').css('background-image', $(this).css('background-image'));
	$('.imgViewer').css('display', 'block');
	setTimeout(function(){$('.imgViewer').css('opacity', '1');}, 50);
});
$(document).on('click', '.imgViewer', function(){
	$('.imgViewer').css('opacity', '0');
	setTimeout(function(){
		$('.imgViewer').css('display', '');
		if (slideShow.paused === true && gallery.current === 'featured'){
			slideShow.resume();
			slideShow.zoomed = false;
		}
	}, 500);
});
$(document).on('click', '.hideGallery', function(){
	gallery.unload(gallery.current, function(){
		$('.galNav h2').css('color', '');
		slideShow.resume();
		gallery.current = 'featured';
	});
});