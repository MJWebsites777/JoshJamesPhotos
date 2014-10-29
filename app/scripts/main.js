//console.log('\'Allo \'Allo!');
//change url hash on page change

var currentPage = "home", lastPage = "";
$(document).ready(function(e) {
	onload=onresize=function(){	
		$('.nav div').css("height", Math.ceil($(window).height()/2)+"px");
		//$('.bgImg').height($(window).height());
		resizeBG();
	}
//Clicks
	$(document).on("click", ".nav1", function(){
		gotoGallery();
	});
	$(document).on("click", ".nav2", function(){
		gotoBio();
	});
	$(document).on("click", ".nav3", function(){
		gotoContact();
	});
	$(document).on("click", ".logo", function(){
		gotoHome();
	});
//------
	drawTiles("bg", $('.bgImg'));
	$('.tile').on('contextmenu', 'canvas', function(e){ return false; });
});
function gotoHome(){
	lastPage = currentPage;
	switch (lastPage) {
		case "gallery":
			$('.nav1').css("opacity", "");
			$('.galNav').css("opacity", "0");
			$('.nav1 h1').css("display", "");
			$('.logo').css("transform", "translateY(0%) rotateZ(-45deg)  scale(1)");
			setTimeout(function(){$('.nav1 h1').css({"transform": "", "opacity": 1});},10);
			$('.nav1').css("transform", "scale(1)").addClass('navHover');
			$('.nav3').css("transform", "rotateZ(0deg)");
			$('.nav2').css("transform", "rotateZ(0deg)");
			break;
		case "bio":
		
			break;
		case "contact":
		
			break;
		default:
			break;
	}
	currentPage = "home";
}
function gotoGallery(){
	lastPage = currentPage;
	$('.nav2').css("transform", "rotateZ(90deg)");
	$('.nav3').css("transform", "rotateZ(-90deg)");
	$('.nav1').css("transform", "scale(1,2)").removeClass('navHover');
	$('.nav1 h1').css({"transform": "translateY(50%)", "opacity": 0});
	$('.logo').css("transform", "translateY(-150%) rotateZ(-45deg) scale(0.5)");
	currentPage = "gallery";
	setTimeout(function(){
		$('.nav1 h1').css("display", "none");
		$('.galNav').animate({opacity: "1"}, 500);
		$('.nav1').css("opacity", "0.75");
	}, 500);
}
function gotoBio(){
	lastPage = currentPage;
	
	currentPage = "bio";
}
function gotoContact(){
	/*lastPage = currentPage;
	$('.nav3').css("transform", "rotateZ(0deg) scale(2,2) translateY(-50%)").removeClass('navHover');
	$('.nav1').css("transform", "scale(1) rotateX(180deg)");
	$('.nav2').css("transform", "rotateZ(0deg) rotateY(180deg)");
	$('.nav3 h1').css({"transform": "translateY(50%)", "opacity": 0});
	$('.logo').css("transform", "translateY(-150%) rotateZ(-45deg) scale(0.5)");
	currentPage = "contact";
	setTimeout(function(){
		$('.nav3 h1').css("display", "none");
	}, 500);*/
}

function drawTiles(img, cont){
	var msg = "";
	var postData = 'img='+img;
	$.post('www.joshjamesphotos.com/splitImage.php', postData, function(d){
		//console.log(d);
    	var data = d.split("<br />");
    	var dims = data[0].split(",");
    	var w = dims[0].replace("[","");
    	var h = dims[1].replace("]","");
    	msg = data[1];
   		var imgs = msg.split("|MTJG|");
    	var i = a = load = 0;
		$('.tile').each(function(){
			$(this).attr({width: w+"px", height: h+"px"});
    		if (i % 5 == 0 && i != 0){
       	 		a -= 20;
    		}
    		else if (i != 0) {
        		a += 4;
    		}
    		var e = i+a;
    		var canvas = cont.children('.tile')[e];
    		var ctx = canvas.getContext("2d");
    		var image = new Image();
    		image.src = "data:image/jpg;base64,"+imgs[i];
    		image.onload = function() {
        		load++;
        		ctx.width = w;
        		ctx.height = h;
        		ctx.drawImage(image, 0, 0);
        		if (load == 25) { cont.css("opacity", "1"); $('.nav').css("opacity", "1");}
    		};
    		i++;
		});
	});
}

function resizeBG(){
	console.log("Resizing BG");
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var bg = $('.bgImg');
	bg.width(winHeight*1.79);
}