//console.log('\'Allo \'Allo!');
//change url hash on page change

//TODO
//improve slideshow startup stability and performance
//CSS: logo out of top of screen on height ~= 640

var currentPage = 'home', lastPage = '';
$(document).ready(function() {
	var page = new Page();
	//var slideshow = new SlideShow();
	//slideshow.load();

	onload=onresize=function(){	
		$('.nav .navHover').css('height', Math.ceil($(window).height()/2)+'px');
		switch (currentPage){
			case 'gallery': 
				$('.nav1').height($(window).height()/2);
				break;
			case 'bio': 
				$('.nav2').height($(window).height()/2);
				break;
			case 'contact': 
				$('.nav3').height($(window).height()/2);
				break;
			default:
				break;
		}
		//$('.bgImg').height($(window).height());
		//resizeBG();
	};

//Clicks
	$(document).on('click', '.nav1', function(event){
		var target = $(event.target);
		//console.log('nav1 clicked element: '+target);
		if (target.attr('class') === 'nav1 navHover' || event.target.nodeName === 'H1'){
			page.gotoGallery();
		}
		
	});
	$(document).on('click', '.nav2', function(event){
		var target = $(event.target);
		if (target.attr('class') === 'nav2 navHover' || event.target.nodeName === 'H1'){
			page.gotoBio();
		}
	});
	$(document).on('click', '.nav3', function(event){
		var target = $(event.target);
		if (target.attr('class') === 'nav3 navHover' || event.target.nodeName === 'H1'){
			page.gotoContact();
		}
	});
	$(document).on('click', '.logo', function(){
		page.gotoHome();
	});
//------
	var img = new Image();
	img.src = '../images/cover.jpg';
	img.onload = function( ) {
    	$('.bgImg').css('opacity','1');
    	$('.nav').css('opacity', '1');
	};
	//drawTiles('bg', $('.bgImg'));
	//$('.tile').on('contextmenu', 'canvas', function(){ return false; });
});

function drawTiles(img, cont){
	'use strict';
	var msg = '';
	var postData = 'img='+img;
	$.post('http://joshjamesphotos.com/splitImage.php', postData, function(d){
		//console.log(d);
    	var data = d.split('<br />');
    	var dims = data[0].split(',');
    	var w = dims[0].replace('[','');
    	var h = dims[1].replace(']','');
    	msg = data[1];
   		var imgs = msg.split('|MTJG|');
    	var i, a, load;
    	i = a = load = 0;
		cont.children('.tile').each(function(){
			$(this).attr({width: w+'px', height: h+'px'});
    		if (i % 5 === 0 && i !== 0){
       	 		a -= 20;
    		}
    		else if (i !== 0) {
        		a += 4;
    		}
    		var e = i+a;
    		var canvas = cont.children('.tile')[e];
    		var ctx = canvas.getContext('2d');
    		var image = new Image();
    		image.src = 'data:image/jpg;base64,'+imgs[i];
    		image.onload = function() {
        		load++;
        		ctx.width = w;
        		ctx.height = h;
        		ctx.drawImage(image, 0, 0);
        		if (load === 25) { cont.css('opacity', '1'); $('.nav').css('opacity', '1');}
    		};
    		i++;
		});
	});
}

function resizeBG(){
	'use strict';
	console.log('Resizing BG');
	//var winWidth = $(window).width();
	var winHeight = $(window).height();
	var bg = $('.bgImg');
	bg.width(winHeight*1.79);
}

//Maybe just use img tags instead