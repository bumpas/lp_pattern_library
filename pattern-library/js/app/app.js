scrollToElement = function(element){
	$('html,body').animate({
		scrollTop: element.offset().top
	});
	$('.menu-btn').click();
}

$(function(){

	// Auto populate offcanvas nav items
	var nav = $('nav.pushy ul');
	$('div#container > section').each(function(i){
		var anchor = $(this).find('a:first');
		var item = $("<a></a>");
		item
			.attr('href', "javascript:scrollToElement($('a[name=" + anchor.attr('name') + "]'));")
			.text(anchor.attr('title'))
			.wrap("<li></li>");
		nav.append(item);
	});


});
//slick plugin for small screen sizes only < 768px
$(document).ready(function(){
  $('.slick--mobile').slick({
  	mobileFirst:true,
  	arrows: false,
  	dots: true,
    responsive: [
    {
      breakpoint: 768,
      settings: "unslick"
    }
  ]
  });
});