/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.2 by Matt Varone
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/
(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
    			text: '',
    			min: 200,
    			inDelay:600,
    			outDelay:400,
      			containerID: 'toTop',
    			containerHoverID: 'toTopHover',
    			scrollSpeed: 1000,
    			easingType: 'linear'
 		    },
            settings = $.extend(defaults, options),
            containerIDhash = '#' + settings.containerID,
            containerHoverIDHash = '#'+settings.containerHoverID;
		
		$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
		$(containerIDhash).hide().on('click.UItoTop',function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});
					
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': sd + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});
};
})(jQuery);


/***************************************************************************************************/

function printMe(id) {
    if (!id)
        id = 'printMe';
    var d = document.getElementById(id);
    if (d == null)
        return false;

    var w = window.open('', 'printme', 'width=700,height=600,toolbar=0,directories=0,menubar=0,status=0,resizable=1,location=0,scrollbars=yes,copyhistory=0,top=10,left=10');
    w.document.write('<!DOCTYPE html>');
    w.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
    w.document.write('<style>');
    w.document.write('body,td { font-size:12px; font-family: verdana; }');
    w.document.write('table.table1 { font-size:8pt; border-collapse: collapse; font-family: verdana; }');
    w.document.write('table.table1 td { padding: 4px; border: 1px solid #333333 }');
    w.document.write('table.table0 { font-size:8pt; border-collapse: collapse; font-family: verdana; }');
    w.document.write('table.table0 td { padding: 4px; border-width: 0px; }');
    w.document.write('</style>');
    w.document.write('<body onload="window.print()">');
    w.document.write(d.innerHTML);
    w.document.write('</body></html>');
    w.document.close();
    w.focus();
}

/***************************************************************************************************/


var navLinks;

$(document).ready(function() {

  $('html').removeClass('no-js');
  
  var isMobile,
    isAndroid = (/android/gi).test(navigator.appVersion),
    isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion),
    isPlaybook = (/playbook/gi).test(navigator.appVersion),
    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);

  isMobile = (isAndroid || isIDevice || isPlaybook || isTouchPad);

  if (isMobile) {

    $("html").addClass("mobile");
    $("section.phone em").each(function() {
      $(this).wrap('<a href="tel:' + $(this).text() + '"></a>');
    });
  
  }

  var k = true;

  $(window).scroll(function() {

    var top = $(this).scrollTop(),
      panel = $('nav');

    if (top >= panel.offset().top) {
      panel.addClass('fixed');
    } else {
      panel.removeClass('fixed');
    };

    if (k) {
      panel.find('a').removeClass('active');
      for (var i = 0; i < panel.find('a').length; i++) {
        hash = panel.find('a').eq(i).attr('href');
        if (hash.split('#').length > 1) {
          if (top >= $(hash).offset().top - 30) {
            panel.find('a').removeClass('active');
            panel.find('a').eq(i).addClass('active');
          };
        };
      };
    };

  });


  $("nav li a").click(function() {
    
    var elementClick = $(this).attr("href");
    var elementPos = $(elementClick).offset().top;
    k = false;

    $("nav li a").removeClass('active');
    $(this).addClass('active');
    $('html,body').animate({
      scrollTop: elementPos - 30
    }, 500);
    
    $('#toTop').fadeIn(300);
    $('body').append($('<div></div>').addClass('iosfix'));
  
    setTimeout(function() {
      $('.iosfix').remove();
      k = true;
    }, 1000);
  
    return false;
  
  });

  $().UItoTop({
    scrollSpeed: 400
  });

});