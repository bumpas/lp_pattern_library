$(function(){

	(function(){
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
	})();

	(function(){
		// Slick Slider instantiation
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
	})();

	(function(){
		var buttonSection = $('section.buttons');
		$('select#buttons-background').on('change', function(){
			var value = $(this).val();
			var pattern = /#[0-9a-fA-F]{6,6}/;
			console.log(value);
			if (pattern.test(value)) {
				// Color
				buttonSection.css('background-color', value).css('background-image','');

			} else {
				// Image
				buttonSection.css('background-image', 'url('+value+')').css('background-color','');

			}
		});

		$('select#buttons-text-color').on('change', function(){
			buttonSection.css('color', $(this).val());
		});
	})();

});

scrollToElement = function(element){
	$('html,body').animate({
		scrollTop: element.offset().top
	});
	$('.menu-btn').click();
}