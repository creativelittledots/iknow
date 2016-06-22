/*--------------------------------------------------*\
	#IKNOW CHURCH CUSTOM LAYOUT
	
	To start our script we wrap all of our code in a
	self-executing anonymous function. We then pass
	in 3 arguments to setup jQuery & our namespace.
	
	1. IKNOW is our namespace.
	2. $ is defined for jQuery.
	3. Lastly we ensure undefined really is undefined.
\*--------------------------------------------------*/

(function(IKNOW, $, undefined) {

    /*  'use strict' enforces correct syntax.  */
    
    'use strict';


    /*--------------------------------------------------*\
    	#SETUP GLOBALS
    \*--------------------------------------------------*/    
    
    var pathname = window.location.pathname;
    
    
    
    /*--------------------------------------------------*\
    	#LOAD STYLESHEET DEPENDENCIES
    \*--------------------------------------------------*/
    
    $('body')
        .append('<link href="//iknow.code-lab.co.uk/style.css" rel="stylesheet" type="text/css">')
        .append('<link href="//file.myfontastic.com/i3XTHDqptTuJvFUMSmSp5R/icons.css" rel="stylesheet">')
        .addClass('wrapper')
    ;
    
    
    
    /*----------------------------------------------*\
    	#FORM INPUT VALIDATION
    \*----------------------------------------------*/
    
    function filled(el) {   
    
        if ( el.val().length !== 0 || el.val() !== '' ) {
        
            el.closest('.input-wrap').addClass('input-wrap--filled');
        
        }  else {
            
            el.closest('.input-wrap').removeClass('input-wrap--filled');
            
        }

    }
     
     
        
    if (pathname !== '/secure_login') {
        
        
        
        /*--------------------------------------------------*\
        	#REMOVE ANY UNDESIRABLE ELEMENTS
        \*--------------------------------------------------*/    

        $('.navBarOption').children('a[href="/dashboard"]').remove();
    
    
        
        /*--------------------------------------------------*\
        	#SIDEBAR / OFFCANVAS MENU
        \*--------------------------------------------------*/
        
        /* Create offcanvas wrapper */
        $('.appmenu')
            .toggleClass('dropdown-menu appmenu offcanvas__menu')
            .parent()
                .replaceWith(function() { return '<aside class="offcanvas">' + this.innerHTML + '</aside>'; })
        ;
        
        $('.offcanvas').prependTo('body');
        
        // Remove the dropdown
        $('.offcanvas .btn.dropdown-toggle').remove();
    
        /* Create profile wrapper */
        $('.top.top-left')
            .toggleClass('top top-left offcanvas__profile')
            .unwrap()
            .prependTo('.offcanvas')
        ;
        
        /* Create profile name */
        $('.offcanvas__profile .text-info')
            .toggleClass('text-info h3')
            .wrap('<div class="offcanvas__name"></div>')
        ;
    
        /* Create profile avatar */    
        $('.col2ShowImg')
            .toggleClass('col2ShowImg offcanvas__pic')
            .removeAttr('style')
        ;
    
        /* Create profile dropdown */
        $('.top.top-right').replaceWith(function() { return '<ul class="offcanvas__dropdown">' + this.innerHTML + '</ul>'; });
        
        $('.offcanvas__dropdown')
            .appendTo('.offcanvas__name')
            .children('a')
                .wrap('<li class="offcanvas__dropdown__li"></li>')
                .addClass('offcanvas__dropdown__link')
        ;
            
        $('.offcanvas__dropdown br').remove();
        
        /* Create icon classes for each menu item */
        $('.offcanvas__menu li a').each(function() {
            var menuLink = $(this).attr('href').replace(' ', '-').replace('/', '');
            
            $(this).addClass('cld-' + menuLink);
            
        });
        
        /* Setup menu items */
        $('.offcanvas__menu li')
            .unwrap()
            .addClass('offcanvas__menu__li')
            .children('a').addClass('offcanvas__menu__link')
            .children('.dropmenu-img').remove()
        ;
        
        /* Add current page modifier class if we can determine it */
        $('.offcanvas__menu__li a[href="' + pathname + '"]').addClass('offcanvas__menu__link--current');
        
    
    
        /*--------------------------------------------------*\
        	#MAIN CONTENT
        \*--------------------------------------------------*/
        
        $('.navbar.navbar-fixed-top')
            .replaceWith(function() { return '<nav class="navbar navbar--fixed-top">' + this.innerHTML + '</nav>'; })
        ;
        
        $('.navbar.navbar--fixed-top .icon-bar').removeAttr('style');

        // Improve the burger icon
        $('.btn-navbar')
            .toggleClass('btn btn-navbar hamburger hamburger--squeeze')
            .empty()
            .html('<span class="hamburger-box"><span class="hamburger-inner"></span></span>')
        ;
        
        // Toggle the offcanvas--active class for mobile
        $(document).on('click', '.navbar--fixed-top .hamburger', function() {
            
            $(this).toggleClass('is-active');
            $('body').toggleClass('offcanvas--active');
            
        });
        
        /* Customise the help button */
        $('.icon-question-sign')
            .toggleClass('icon-question-sign cld-help')
        ;
        
        if (pathname === '/finances') {
            
            $('.navbar--fixed-top .container-fluid').prepend('<button class="cld-ios-cog-outline js-finance-options btn--finance-options">Show Finance Options</button>');
            
            $(document).on('click', '.js-finance-options', function() {
                
                var text = $(this).text();
                
                $(this).text(
                    text === "Show Finance Options" ? "Hide Finance Options" : "Show Finance Options")
                ;
               
                $('body').toggleClass('finance-options--active');
                
            });

        }
    
    
    } else {
    
    
    
        /*--------------------------------------------------*\
        	#LOGIN PAGE
        \*--------------------------------------------------*/
        
        /* Add a specific class to make targeting specific styles easier */
        $('body, html').addClass('login-page');
        
        /* Sort the form container out */
        $('.form-signin')
            .unwrap()
            .removeAttr('class')
            .addClass('login')
        ;

        /* Remove redundant elements. Some very strange stuff being output on this page. */
        $('.navbar, .login-image, style, iframe, #helpModal, #messagePeoplejModey, #missedPeople, #template-person, #saveProgress, label.string.optional').remove();

        $('#user_remember_me').removeAttr('style');
        
        /* Add a nice heading */
        $('#iknowLoginForm').prepend('<h1 class="login__heading">Log in</h1>');
        
        /* .each method is a little cleaner than targeting just the individual inputs */
        $('input').each(function() {

            var inputTitle = $(this).attr('placeholder');
            var inputId = $(this).attr('id');
            var inputClass = (inputId) ? inputId.replace('_','-') : 'item'; // Determine a nice new class, based on the ID
            
            if (inputTitle) {
                
                $(this)
                    .wrap('<div class="input-wrap input-wrap--' + inputClass + '"></div>')
                    .parent().append('<label for="' + inputId + '" class="input-label input-label__' + inputClass +'">' + inputTitle + '</label><hr>')
                ;
                
            }
            
            $(this)
                .removeAttr('class placeholder') // Remove the old nasty class
                .addClass('input input--' + inputClass) // Add our new one
                .prop('required', true)
            ;
        
            /* Trigger the form filled classes */    
            filled($(this));
            
        });


        /* Add proper classes to submit button */
        $('#loginBtn').addClass('btn-large btn-block btn--login');
        
        /* Make forgot password a bit neater */
        $('.passwordLink a').html('Forgot your password?').addClass('login__forgot-pw').appendTo('form.login');
        $('.passwordLink').remove();
        
        $('#user_remember_me').wrap('<label class="label--forgot-pw" for="user_remember_me">Remember me</label>');
        
        /* Give validation notifcation a decent class */
        $('#loginError').addClass('login__notice');
        
        /* Some basic validation using our filled function */
        $(document).on('change', 'input', function() {
           
            filled($(this));
               
        });
        
        $(document).on('focus', 'input', function() {
            
            $(this).closest('.input-wrap').addClass('input-wrap--filled');
               
        });
        
        $(document).on('focusout', 'input', function() {
           
            filled($(this));
               
        });
        
        /* Unwrap it, but also wrap it */
        $('.btn--login')
            .unwrap()
            .wrap('<div class="btn-wrap"></div>')
        ;
        
        /* Super neat active animation */
        $(document).on('click', '.btn--login', function() {
            
            $(this).parent().addClass('btn-wrap--active');
            
        });
        
    } 
    
}(window.IKNOW = window.IKNOW || {}, jQuery));