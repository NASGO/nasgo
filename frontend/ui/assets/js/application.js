//Custom js code for the App

//Mobile menu slide out
jQuery('.mobile-nav-toggle').click(function(e){	
	if (!(jQuery(this).hasClass('nav-open'))) {
		jQuery(this).addClass('nav-open');
		jQuery('.mobile-shift').addClass('nav-open');
	} else {
		jQuery(this).removeClass('nav-open');
		jQuery('.mobile-shift').removeClass('nav-open');
	}
});

jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	jQuery('.mobile-shift').removeClass('nav-open');
	jQuery('.mobile-nav-toggle').removeClass('nav-open');
})