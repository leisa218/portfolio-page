

jQuery(function( $ ){
    $('.pushpin-nav').each(function() {
        var $this = $(this);
        var $target = $('#' + $(this).attr('data-target'));
        $this.pushpin({
          top: $target.offset().top + 60,
          bottom: $target.offset().top + $target.outerHeight() - $this.height()
      });
    });
    $('.scrollspy').scrollSpy({
      scrollOffset: 0
    });
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) {
            $(this).addClass('open');
        }, 
        onClose: function(el) {
            $(this).removeClass('open'); 
        }
        }
    );
});