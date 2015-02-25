//TODO
//change url hash on page change?
//remove headings from nav and add background images to show user where that nav takes them

var currentPage = 'home', lastPage = '';
$(document).ready(function() {
	var page = new Page();

	onload=onresize=function(){	
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
	img.onload = function() {
		$('.bgImg').css('opacity','1');
		$('.nav').css('opacity', '1');
		slideShow.load();
	};
	//drawTiles('bg', $('.bgImg'));
	//$('.tile').on('contextmenu', 'canvas', function(){ return false; });
});