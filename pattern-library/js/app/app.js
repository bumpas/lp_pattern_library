scrollToElement = function(element){
	$('html,body').animate({
		scrollTop: element.offset().top
	});
	$('.menu-btn').click();
}

$(function(){

	// Auto populate offcanvas nav items
	var nav = $('nav.pushy ul');
	$('div#container > a').each(function(i){
		var anchor = $(this);
		var item = $("<a></a>");
		item
			.attr('href', "javascript:scrollToElement($('a[name=" + anchor.attr('name') + "]'));")
			.text(anchor.attr('title'))
			.wrap("<li></li>");
		nav.append(item);
	});

	//slick plugin for small screen sizes < 768px
	$('.slick--mobile').slick({
		mobileFirst: true,
		arrows: false,
		dots: true,
		dotsClass: "slickDots slickDots--default",
		responsive: [
			{
	  			breakpoint: 768,
	  			settings: "unslick"
			}
		]
	});

	//slick plugin for module50pad
	$('.slick--module50pad').slick({
		mobileFirst: true,
		arrowsClass: "slickArrows",
		dots: true,
		dotsClass: "slickDots slickDots--default",
		responsive: [
			{
				breakpoint: 768,
				settings: {
					row: 2,
					slidesToShow: 2
				}
			}
		]
	});
});