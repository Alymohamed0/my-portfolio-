(function ($) {
    "use strict";
    
    // Enhanced loader with smooth transitions
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').fadeOut(800, function() {
                    $(this).removeClass('show');
                    // Trigger page load animation
                    $('body').addClass('loaded');
                });
            }
        }, 800);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    // Animate skill bars when in view
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            var $this = $(this);
            var percent = $this.data('percent');
            var $fill = $this.find('.skill-fill');
            
            if ($this.is(':in-viewport')) {
                $fill.css('width', percent + '%');
            }
        });
    }
    
    // Check skill bars on scroll
    $(window).scroll(function() {
        animateSkillBars();
    });
    

    
    // Animated titles - FIXED VERSION
    function animateTitles() {
        const titles = $('.title-item');
        if (titles.length === 0) return;
        
        let currentIndex = 0;
        
        function showNextTitle() {
            // Remove all classes first
            titles.removeClass('active next');
            
            // Add next class to current title
            titles.eq(currentIndex).addClass('next');
            
            // Move to next title
            currentIndex = (currentIndex + 1) % titles.length;
            
            // Add active class to new current title
            titles.eq(currentIndex).addClass('active');
        }
        
        // Start the first title
        titles.eq(0).addClass('active');
        
        // Change title every 2.5 seconds for better flow
        setInterval(showNextTitle, 2500);
    }
    
    // Initialize title animation when document is ready
    $(document).ready(function() {
        animateTitles();
    });
    
    // ORIGINAL SKILL BAR ANIMATION
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function (index) {
            var $this = $(this);
            var percentage = $this.attr("data-width");
            
            // Delay each progress bar animation
            setTimeout(function() {
                $this.css("width", percentage);
            }, index * 300); // 300ms delay between each bar
        });
    }, {offset: '80%'});
    
    
    // Enhanced back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1800, 'easeInOutQuart');
        return false;
    });
    
    
    // ORIGINAL STICKY NAVBAR
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Instant navigation - no delay
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            // Remove active class from all nav links
            $('.navbar-nav .nav-link').removeClass('active');
            // Add active class to clicked link
            $(this).addClass('active');
            
            // Instant scroll to section
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 80
            }, 300, 'linear');

            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Update active nav link based on scroll position
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();
        
        // Remove active class from all nav links
        $('.navbar-nav .nav-link').removeClass('active');
        
        // Add active class based on current section
        if (scrollDistance < $('#about').offset().top - 150) {
            $('.navbar-nav a[href="#home"]').addClass('active');
        } else if (scrollDistance < $('#experience').offset().top - 150) {
            $('.navbar-nav a[href="#about"]').addClass('active');
        } else if (scrollDistance < $('#skills').offset().top - 150) {
            $('.navbar-nav a[href="#experience"]').addClass('active');
        } else if (scrollDistance < $('#service').offset().top - 150) {
            $('.navbar-nav a[href="#skills"]').addClass('active');
        } else if (scrollDistance < $('#portfolio').offset().top - 150) {
            $('.navbar-nav a[href="#service"]').addClass('active');
        } else if (scrollDistance < $('#contact').offset().top - 150) {
            $('.navbar-nav a[href="#portfolio"]').addClass('active');
        } else {
            $('.navbar-nav a[href="#contact"]').addClass('active');
        }
    });
    
    
    // Typed animation removed - h2 stays static
    
    
    // Enhanced Skills Animation
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function (index) {
            var $this = $(this);
            var percentage = $this.attr("aria-valuenow");
            
            // Delay each progress bar animation
            setTimeout(function() {
                $this.css("width", percentage + '%');
                $this.addClass('animated');
                
                // Add a subtle bounce effect
                setTimeout(function() {
                    $this.css('transform', 'scale(1.02)');
                    setTimeout(function() {
                        $this.css('transform', 'scale(1)');
                    }, 200);
                }, 500);
            }, index * 300); // 300ms delay between each bar
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    // Contact Form Functionality
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        
        // Create mailto link
        var mailtoLink = 'mailto:alymohamedahmed1234@gmail.com' +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent('Name: ' + name + '\n\nEmail: ' + email + '\n\nMessage:\n' + message);
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open automatically.');
        
        // Clear form
        $('#contactForm')[0].reset();
    });
    
    // Project Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function changeSlide(direction) {
        showSlide(currentSlide + direction);
    }

    function goToSlide(n) {
        showSlide(n - 1);
    }

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Lightbox integration - open lightbox with current slide
    document.querySelector('.portfolio-wrap .btn[data-lightbox="project-gallery"]').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the current active slide image
        const activeSlide = document.querySelector('.carousel-slide.active img');
        const currentImageSrc = activeSlide.src;
        
        // Find the corresponding lightbox link and trigger it
        const lightboxLinks = document.querySelectorAll('a[data-lightbox="project-gallery"]');
        lightboxLinks.forEach(link => {
            if (link.href.includes(currentImageSrc.split('/').pop())) {
                link.click();
                return;
            }
        });
    });

    // Make functions globally available
    window.changeSlide = changeSlide;
    window.currentSlide = goToSlide;

})(jQuery);

