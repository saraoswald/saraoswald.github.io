$(document).ready(function(){
  $('.box').click(function(e){
    fillModal(".modal", $(e.currentTarget).find('img'));
    $("#overlay").toggle();
  });

  //  handle close of modal
  $('#overlay').click(function(e){$(e.target).toggle()}); //clicked outside of modal
  $('.modal').click(function(e){
    e.stopPropagation();
    if(e.target.className == 'flipper right' || e.target.className == 'flipper left'){
      fillModal(e.currentTarget, getNeighbor(e.currentTarget, (e.target.className == 'flipper left')?'left':'right'));
    }
  });

  $(document).keydown(function(e){
      if(e.keyCode == 27 && isModal()) closeModals();
      else if(isModal() && (e.keyCode == 37 || e.keyCode == 39)){
        e.preventDefault();
        fillModal(e.currentTarget, getNeighbor(e.currentTarget, (e.keyCode == 37)?'left':'right'));
      }
    });

  function closeModals(){
    $('#overlay').hide();
    $('.modal').empty();
  };

  function fillModal(target, content){
    var flippers = 
      $('<div />',{
        'class': 'flippers'
      });

    flippers.append([$('<div />',{
        'class': 'flipper left'
      }),
      $('<div />',{
        'class': 'flipper right'
      })]);

    var img = $('<img />',{
      'src': content.attr('src'),
      'class': 'modal-img'
    })[0];

    $('.modal').empty();
    $('.modal').append([img,flippers]);
  };

  function isModal(){
    return $('#overlay').css('display') != "none";
  };

  function getNeighbor(target, direction){
    var index = getCurrModalIndex(),
      imgs = $('.box').find('img');

    if((direction == 'left' && index > 0) || (direction == 'right' && index < imgs.length)){
      (direction == 'left') ? index-- : index++;
    }

    return $('<img />',{
      'src': imgs[index].src,
      'class': 'modal-img'
    });
  }

  function getCurrModalIndex(){
    try{
        var imgs = $('.box').find('img');
        var curr = $('.modal').find('img')[0];
        var res,i;
        for(i=0;i<imgs.length;i++){
          if(imgs[i].src == curr.src) res = i;
        }
        return res;
      } catch(e){}; 
  }

});