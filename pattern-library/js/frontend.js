$(function(){

	// Set drawer column heights based on # of list items
	var mostItems = 0;
	$('.available-devices').find('ul').each(function(){
		var items = $(this).find('li');
		if (items.length > mostItems) mostItems = items.length;
	}).end().append("<style>@media (min-width: 768px){ .available-devices ul { height: " + mostItems*1.8 + "rem; } }</style>");

	// module23split video & module50pad video
	$('.btnPlay').on('click', function() {
		$(this).parent().fadeOut(800);
		$(this).parent().next().attr('controls','1').get(0).play();
		$(this).parent().next().addClass('show-controls');

	});

	// Module video play button behavior
	$('.btnPlay').parent().next().bind('ended', function() {
		$(this).prev().fadeIn(500);
		$(this).load().removeAttr('controls').removeClass('show-controls');
	});

	$('.btnPlay').parent().next().bind('webkitendfullscreen', function() {
		$(this).prev().fadeIn(500);
		$(this).load().removeAttr('controls').removeClass('show-controls');
	});

	// Slick Slider instantiation
	$('.slick--mobile').slick({
		mobileFirst:true,
		arrows: false,
		dots: true,
		dotsClass: "slickDots slickDots--default",
		responsive: [
		{
			breakpoint: 767,
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
				breakpoint: 991,
				settings: {
					row: 2,
					slidesToShow: 2
				}
			}
		]
	});


});


