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


});