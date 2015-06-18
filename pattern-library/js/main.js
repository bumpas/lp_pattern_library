$(function(){

	// Set drawer column heights based on # of list items
	var mostItems = 0;
	$('.available-devices').find('ul').each(function(){
		var items = $(this).find('li');
		if (items.length > mostItems) mostItems = items.length;
	}).end().append("<style>@media (min-width: 768px){ .available-devices ul { height: " + mostItems*1.8 + "rem; } }</style>");

	// module23split video & module50pad video
	$('.btnPlay').on("click", function(e) {
	    var element = $(this).parent().next();
	    var vidId = $(element).data("vid-src");
	    var youtube = '<iframe src="//www.youtube.com/embed/'+ vidId +'?autoplay=1&showinfo=0&modestbranding=1&rel=0&autohide=1" frameborder="0" allowfullscreen></iframe>';
	    e.preventDefault();
	    $(element).append(youtube).dialog({
	    	dialogClass: "moduleVideo",
	    	width: "75%",
			resizable: false,
			draggable: false,
			modal: true,
			show: {
				effect: "fadeIn",
				duration: 300
			},
			hide: {
				effect: "fadeOut",
				duration: 300
			},
			open: function(event, ui) { 
				// Close dialog when outside is clicked
				$('.ui-widget-overlay').bind('click', function(){ 
					$(element).dialog('close'); 
				}); 
			},
			close: function () {
				// necessary as it stops the video when the dialog is closed
				var iframe = $(this).children();
				$(this).dialog('destroy');
    			iframe.remove('iframe');
			}
	    });
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


