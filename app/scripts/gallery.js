//TODO ---------------------------
//gallery thumbnail right-click prevention?
//gallery thumbs don't fade in
//fade in each thumbnail on load NOT WORKING
//add div on preview to view larger image
//--------------------------------

var gallery = new Gallery();
var slideShow = new SlideShow();
$(window).resize(function(){
	if (currentPage === 'gallery'){
		$('.playback p').css('margin-left', '-'+($('.playback p').innerWidth()/2)+'px');
		$('.logo').css('transform', 'translateY(-'+Math.ceil($(window).height()/2.8)+'px) rotateZ(-45deg) scale(0.5)');
	}
});
$(document).on('click', '.galNav h2', function() {
	var t = $(this);
	var id = t.html().toLowerCase();
	switch(id){
		case 'architecture':
			//console.log('architecture');
			if (gallery.current !== id) {
				$('.galNav h2').css('color', '#FFF'); 
				t.css('color', '#FBFF6D'); 
				gallery.load(id); 
			}
			break;
		case 'commercial':
			//console.log('commercial');
			if (gallery.current !== id) {
				$('.galNav h2').css('color', '#FFF'); 
				t.css('color', '#FBFF6D'); 
				gallery.load(id); 
			}
			break;
		case 'landscapes':
			//console.log('landscapes');
			if (gallery.current !== id) {
				$('.galNav h2').css('color', '#FFF'); 
				t.css('color', '#FBFF6D'); 
				gallery.load(id); 
			}
			break;
		case 'portraits':
			//console.log('portraits');
			if (gallery.current !== id) {
				$('.galNav h2').css('color', '#FFF'); 
				t.css('color', '#FBFF6D'); 
				gallery.load(id); 
			}
			break;
		case 'weddings':
			//console.log('weddings');
			if (gallery.current !== id) {
				$('.galNav h2').css('color', '#FFF'); 
				t.css('color', '#FBFF6D'); 
				gallery.load(id); 
			}
			break;
		default:
			break;
	}
});
$(document).on('click', '.thumb', function(){
	var t = $(this);
	var preview = t.parents('.thumbScroller').siblings('.preview');
	var src = t.children('.thumbnail').attr('src');
	if (preview.css('background-image').indexOf(src) !== -1) {return;}
	$('.imgViewer img').attr('src', src);
	preview.animate({opacity: 0}, 300, function(){
		preview.css('background-image', 'url('+src+')');
		preview.animate({opacity: 1}, 300);
	});
});
$(document).on('click', '.preview', function(){
	$('.imgViewer').css({'display': 'block', 'opacity': '1'});
});
$(document).on('click', '.imgViewer', function(){
	$('.imgViewer').css('opacity', '0');
	setTimeout(function(){$('.imgViewer').css('display', '');}, 500);
});

function Gallery () {
	'use strict';
	this.current = 'slideshow';
	this.previous = '';
	this.loadedGalleries = [];

	var parent = this;

	this.load = function(id){
		parent.unload(parent.current, function(){
			$('.'+id).css('display', 'block');
			setTimeout(function(){
				$('.'+id).css('opacity', '1');
				$('.'+id+' .thumbScroller').niceScroll({
					autohidemode: 'leave',
					railoffset: {top:0, left:15}
				});
			}, 50);
			//if (parent.previous !== '') {$('.'+parent.previous+' .thumbScroller').niceScroll().remove();}
		});
		//$('.'+id).css({'display': 'block', 'opacity': '1'});
		//http://joshjamesphotos.com
		if (!parent.loaded(id)) {
			$.post('http://joshjamesphotos.com/getImages.php', 'cmd='+id, function(data){
				var files = data.split('|');
				var count = 0;
				var filename = '';
				for (var i=0; i < files.length; i++) {
					filename = $('.'+parent.current+' .thumb').eq(i).children('.thumbnail').attr('src');
					$('.'+parent.current+' .columns').append ('<div class="thumb"><img class="thumbnail" src="'+files[i]+'"></div>');
					$('.'+parent.current+' .thumb').eq(i).css('opacity', '0.7');
					count++;
					if (count === 1) {$('.'+parent.current+' .preview').css('background-image', 'url('+$('.'+parent.current+' .thumbnail').eq(0).attr('src')+')');}
					
					var image = new Image();
					image.onload = function(){
						imgLoaded(this.src, function(){
							$('.'+parent.current+' .thumb').eq(i).css('opacity', '0.7');
						});
					};
					image.src = $('.'+parent.current+' .thumb').eq(i).children('.thumbnail').attr('src');
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
				//$(this).css('opacity', '0.7');
			});
		}
		parent.previous = parent.current;
		parent.current = id;
		parent.loadedGalleries.push(id);
		//console.log(parent.current);
	};

	this.unload = function(id, callback){
		if (id === 'slideshow') {slideShow.pause(true); if (callback) {setTimeout(function(){callback()}, 500);}}
		else {
			//$('.'+id).css({'display': 'none', 'opacity': ''}); 
			$('.'+id).css('opacity', ''); 
			setTimeout(function(){
				$('.'+id).css('display', 'none');
				if (callback) {callback();}
			}, 500);
		}
	};

	this.loaded = function(id) {
		for (var i=0; i < parent.loadedGalleries.length; i++){
			if (parent.loadedGalleries[i] === id) {return true;}
		}
		return false;
	};
}