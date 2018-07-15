function toggleNav(event){
    $('.no_content').hide();
    $('.nav_button').removeClass('active');
    $(event.target).addClass('active');

    const showSection = $(event.target).attr('id').replace('btn-', '');
    doShow($('#' + showSection));
}

function doHide() {
    $('.content-cont').addClass('hidden');
}

function doShow($section) {
    doHide();
    $section.removeClass('hidden');
    $('.nav').addClass('active');
};

function init() {
    doHide();
    $('.nav_button').on('click', toggleNav);
}

$(document).ready(init);