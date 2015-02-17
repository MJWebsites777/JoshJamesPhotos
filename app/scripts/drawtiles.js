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