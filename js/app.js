/*jshint devel:true */


$(document).ready(function(){

  var catalog = $('.catalog-inner');
  var catalogContainer = $('.catalog-wrapper');
  $( ".box" ).draggable({
  appendTo: 'body',
  revert: "invalid",
  //revertDuration: 500,
  helper: "clone",
  drag: function( event, ui ) {
    var og = ui.helper.prevObject;
    console.log(ui.helper.prevObject);
    og.css('opacity',0);
    //ui.helper.context.css('opacity',0.5);

  }
});
  
  $( ".drop-zone" ).droppable({
    accept: ".box",
    activeClass: "target-highlight",
    drop: function(event, ui) {
      var topVal= ui.offset.top + 'px';
      var leftVal = ui.offset.left + 'px';

      var wut = $(this).append(ui.draggable);
      ui.draggable.css({
        top: topVal,
        left: leftVal,
        position: 'fixed',
        opacity:1
      });
      ui.draggable.addClass('in-the-zone');
      //ui.helper.find('i').css('display','block');
      //console.log(ui.helper.find('i').css('display','block');
      //window.alert('Item Dropped!');
    }
  });

  $('.delete-box').click(function() {
    var el = $(this).parent();
    //el.remove();
    el.appendTo(catalog);
    el.removeClass('in-the-zone');
    console.log('remove');
    el.css({
        top: 'auto',
        left: 'auto',
        position: 'relative'
      });

  });


  // toggle catalog

  $('.toggle-catalog').click(function() {
      catalogContainer.toggleClass('active-catalog');
      $('.drop-zone').toggleClass('active-zone');
  });

});