$(function () {

    //BEGIN PAGE LOADER
    $(window).load(function() {
        $("#page-loader").fadeOut("slow");
    });
    //END PAGE LOADER

    //jQuery to collapse the navbar on scroll
    $(window).bind('scroll load', function() {
        if ($(".navbar").offset().top > 200) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'swing');
        event.preventDefault();
    });

    $('a#light-layout').live('click', function(event) {
        $('body').removeClass('dark-layout');
    });
    $('a#dark-layout').live('click', function(event) {
        $('body').addClass('dark-layout');
    });

    $('.layout-options select').on('change', function() {
        window.location.href = $(this).val();
    });

    //BEGIN JQUERY DATA HOVER TOOLTIP
    $("[data-hover='tooltip']").tooltip();
    //END JQUERY DATA HOVER TOOLTIP

    //BEGIN BACK TO TOP
    $(window).scroll(function(){
        if ($(this).scrollTop() < 200) {
            $('#totop') .fadeOut();
        } else {
            $('#totop') .fadeIn();
        }
    });
    $('#totop').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'fast');
        return false;
    });
    //END BACK TO TOP

    //BEGIN GOOGLE MAP
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        var myOptions = {
            scrollwheel: false,
            zoom: 15,
            center: new google.maps.LatLng(53.385873, -1.471471),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}]
        };

        var map = new google.maps.Map(document.getElementById('map'), myOptions);
    }
    //END GOOGLE MAP

    //BEGIN JQUERY ISOTOPE
    var $container = $('.isotope');
    $container.isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    $('#filters > ul > li > a').live( 'click', function() {
        var filterValue = $( this ).attr('data-filter');
        $container.isotope({ filter: filterValue });
        $('#filters > ul > li > a').removeClass('active');
        $(this).addClass('active');
    });
    //END JQUERY ISOTOPE

    //BEGIN HOVER EFFECT
    $('#gallery-full-width > li').each( function() { $(this).hoverdir(); } );
    //END HOVER EFFECT

    //BEGIN OWL CAROUSEL OUR TEAM
    $("#owl-our-team").owlCarousel({
        autoPlay: 4000,
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
    });
    //END OWL CAROUSEL OUR TEAM

    //BEGIN OWL CAROUSEL OUR CLIENT
    $("#owl-our-clients").owlCarousel({
        autoPlay: 4000,
        items : 1,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1]
    });
    //END OWL CAROUSEL OUR CLIENT

    //BEGIN JQUERY CIRCLIFUL
    $('#circliful-web-design, #circliful-mobile-apps, #circliful-social-media, #circliful-packaging').circliful({
        bgcolor: "#cdcdcd",
        fgcolor: "#454545",
        fontsize: "35"
    });
    //END JQUERY CIRCLIFUL

    //BEGIN THEME SETTING
    $('#theme-setting > a.btn-theme-setting').click(function(){
        if($('#theme-setting').css('right') < '0'){
            $('#theme-setting').css('right', '0');
        } else {
            $('#theme-setting').css('right', '-250px');
        }
    });

    // Begin Change Theme Color
    var list_color = $('#theme-setting > .theme-setting-content > ul.color-skins > li');

    var setTheme = function (color) {
        $('#color-skins').attr('href', 'assets/css/themes/'+ color + '.css');
    }
    list_color.on('click', function() {
        list_color.removeClass("active");
        $(this).addClass("active");
        setTheme($(this).attr('data-color'));
    });
    //END THEME SETTING

});

//BEGIN OWL CAROUSEL ABOUT 1
$(document).ready(function() {
    var time = 7; // time in seconds

    var $progressBar,
        $bar,
        $elem,
        isPause,
        tick,
        percentTime;

    //Init the carousel
    $("#owl-about1").owlCarousel({
        slideSpeed : 500,
        paginationSpeed : 500,
        singleItem : true,
        afterInit : progressBar,
        afterMove : moved,
        startDragging : pauseOnDragging
    });

    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem){
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

    //create div#progressBar and div#bar then prepend to $("#owl-demo")
    function buildProgressBar(){
        $progressBar = $("<div>",{
            id:"progressBar"
        });
        $bar = $("<div>",{
            id:"bar"
        });
        $progressBar.append($bar).prependTo($elem);
    }

    function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = setInterval(interval, 10);
    };

    function interval() {
        if(isPause === false){
            percentTime += 1 / time;
            $bar.css({
                width: percentTime+"%"
            });
            //if percentTime is equal or greater than 100
            if(percentTime >= 100){
                //slide to next item
                $elem.trigger('owl.next')
            }
        }
    }

    //pause while dragging
    function pauseOnDragging(){
        isPause = true;
    }

    //moved callback
    function moved(){
        //clear interval
        clearTimeout(tick);
        //start again
        start();
    }

});
//END OWL CAROUSEL ABOUT 1
