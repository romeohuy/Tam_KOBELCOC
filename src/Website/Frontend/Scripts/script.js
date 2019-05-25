$(document).ready(function () {
    //initialize navigation when docuemnt is ready
    $('ul.sf-menu').supersubs({
        minWidth: 12,	 // minimum width of submenus in em units
        maxWidth: 27,	 // maximum width of submenus in em units
        extraWidth: 1	 // extra width can ensure lines don't sometimes turn over
        // due to slight rounding differences and font-family
    }).superfish();	

    //initialize swiper when document ready
    var homeSwiper = new Swiper('.home-slider', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        autoplay: {
            delay: 3000
        },
        simulateTouch: false
    });

    var swiper = new Swiper('.product-gallery', {
        slidesPerView: 3,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row',
        spaceBetween: 30,
        slidesPerGroup: 12,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    $('#toggle').click(function () {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    $(function () {
        $('.model-title').matchHeight();
        $('.spec-link').matchHeight();
            //remove video on smaller screens (more or less for mobile browsers.)

        if (window.matchMedia("(min-width: 768px)").matches) {
            // do nothing (Desktop / iPad)
        } else {
            $(".video-contain").remove();
        }
    });

        // Do not name the function "play()"
   
    $("#header-video").one("ended", function () {
        $(".video-contain").fadeOut();
    });
	
	$("#single-header-video").one("ended", function() {
		$(".video-contain").fadeOut();
	});

    $("#slider-video").one("ended", function () {
        $(".video-contain").fadeOut();
    });
	
	if( $('.video-contain').parents().hasClass('single-header-wrapper') ) {
		var elem = document.querySelector('.outer-header-wrapper');
		elem.parentNode.removeChild(elem);
	}

    
});