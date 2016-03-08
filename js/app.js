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

      //make it resizeable
      console.log('make it resizeable');
      $('.drop-zone').find('.in-the-zone' ).resizable({
        aspectRatio: true,
        maxHeight: 300,
        minHeight: 100
      });
      //ui.helper.find('i').css('display','block');
      //console.log(ui.helper.find('i').css('display','block');
      //window.alert('Item Dropped!');
    }
  });

  $('.delete-box').click(function() {
    var el = $(this).parent();
    //el.remove();
    el.appendTo($('.scroller'));
    el.removeClass('in-the-zone');
    console.log('remove');
    el.css({
        top: 'auto',
        left: 'auto',
        position: 'relative'
      });
    var removedItem = $('.catalog-wrapper').find('.ui-resizable' )
    removedItem.resizable( "destroy" );
    removedItem.css({
      'width': '150px',
      'height': 'auto'
    });
    

  });


  // toggle catalog

  $('.toggle-catalog').click(function() {
      catalogContainer.toggleClass('active-catalog');
      $('.drop-zone').toggleClass('active-zone');
  });

  var canAdd = false;

$( window ).keydown(function(event) {
  var thisKey = event.which;
  if(thisKey === 84){
    canAdd = true;
  }
});

$( window ).keyup(function(event) {
  canAdd = false;
});

$('.drop-zone').click(function(event){
  
  var xVal =event.pageX;
  var yVal =event.pageY;
  
  if (canAdd){
  
  var newText = $('<span class="newText"><input type="text"><em>X</em></span>').appendTo('.drop-zone');
  newText.css({
    'left':xVal + 'px',
    'top': yVal + 'px'
  });
    
    newText.draggable();
  }
  
  
  
});


$( ".drop-zone" ).delegate( "em", "click", function() {
  $( this ).parent().remove();
});





});

