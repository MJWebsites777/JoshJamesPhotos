function Info (){
	var navHL = $('.navHighlight');
	var iChanger = $('.infoChanger');

	this.gotoBio = function(){
		navHL.css({
		  '-webkit-transform' : '',
		  '-moz-transform'    : '',
		  '-ms-transform'     : '',
		  '-o-transform'      : '',
		  'transform'         : ''
		});
		iChanger.css({
		  '-webkit-transform' : '',
		  '-moz-transform'    : '',
		  '-ms-transform'     : '',
		  '-o-transform'      : '',
		  'transform'         : ''
		});
	}
	this.gotoContact = function(){
		navHL.css({
		  '-webkit-transform' : 'translateX(100%)',
		  '-moz-transform'    : 'translateX(100%)',
		  '-ms-transform'     : 'translateX(100%)',
		  '-o-transform'      : 'translateX(100%)',
		  'transform'         : 'translateX(100%)'
		});
		iChanger.css({
		  '-webkit-transform' : 'translateX(-50%)',
		  '-moz-transform'    : 'translateX(-50%)',
		  '-ms-transform'     : 'translateX(-50%)',
		  '-o-transform'      : 'translateX(-50%)',
		  'transform'         : 'translateX(-50%)'
		});
	}
}
var Info = new Info();