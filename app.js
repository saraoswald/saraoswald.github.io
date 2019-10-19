function toggleNav(event) {
    $('.no_content').hide();

    const $target = $(event.target);
    if ($target.hasClass('active')) {
        doHide();
        $target.removeClass('active');
    } else {
        $('.nav_button').removeClass('active');
        $target.addClass('active');

        const showSection = $(event.target).attr('id').replace('btn-', '');
        doShow($('#' + showSection));
    }
}

function doHide() {
    $('.content-cont').addClass('hidden');
}

function doShow($section) {
    doHide();
    $section.removeClass('hidden');
    $('.nav').addClass('active');
}

function closeOverlay() {
    $('body').off('keydown.overlay');
    $('.close-overlay').off('click tap');
    $('.overlay').removeClass('active').off('click tap');
    $('.overlay-content').empty();
}

function openOverlay() {
    const $overlay = $('.overlay');
    // click outside the overlay

    // if($(event.target).hasClass('overlay-wide')) 
    $overlay.addClass('active')
        .off('click tap').on('click tap', e => {
            if ($(e.target).is('.overlay')) closeOverlay();
        });
    // press Esc
    $('body').off('keydown.overlay').on('keydown.overlay', e => {
        if (e.which == 27) closeOverlay()
    });
    // click close button
    $('.close-overlay').off('click tap').on('click tap',
        closeOverlay);
}

function moveOverlay() {
    const $overlay = $('.overlay > div');
    const bottom = $('body').height() - window.outerHeight - $overlay.outerHeight();
    const newCoord = window.scrollY;
    const yCoord = newCoord > bottom ?
        bottom :
        newCoord;

    $overlay.css('top', yCoord);

}

function handleOverlayClick(event) {
    const $newImg = $(event.target).clone().removeClass('has-overlay');
    $('.overlay > div').toggleClass('wide', $newImg.hasClass('wide'));
    $('.overlay-content').append($newImg);
    openOverlay();
    moveOverlay();
}

function doInit(isIndexPage) {
    if (isIndexPage) doHide();
    $('.nav_button').on('click', toggleNav);
    $('.has-overlay').on('click', handleOverlayClick);
}

function init(isIndexPage) {
    $(document).ready(() => doInit(isIndexPage));
}