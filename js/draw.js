var start;
var rect;
var makeRectangle = false;
var textArray = [];

var guide = new Path.Rectangle({
    point: [0, 0],
    size: [1, 1],
    strokeColor: '#6996FF'
});




guide.dashArray = [8, 4];

tool.distanceThreshold = 50;

tool.onMouseDown = function(event)  {
    start = new Point(event.point);
    if (makeRectangle){
        guide.position = start;
    }
    textArray = [];
    // deselect text
    var allSelected = project.activeLayer.getItems({
            selected: true
        });
    for (i = 0; i < allSelected.length; i++) {
        allSelected[i].selected = false;
        if(allSelected[i].className === 'Path'){
            allSelected[i].fillColor = 'rgba(255,255,255,0.7)';    
        }
    }
    
}

function onMouseUp(event) {
    if (makeRectangle){
        var rect = new Path.Rectangle({
    from: start,
    to: new Point(event.point)
  });
  rect.strokeColor = 'black';
  rect.fillColor = 'rgba(255,255,255,0.7)';
    }
  
  guide.segments[0].point = [0,0];
  guide.segments[1].point = [0,0];
  guide.segments[2].point = [0,0];
  guide.segments[3].point = [0,0];
  makeRectangle = false;
}

tool.onMouseDrag = function(event) {
    var currentX = event.point.x;
    var currentY = event.point.y;
    var deltaX = event.point.x - start.x;
    var dragLength = (start - event.point).length;
    if(dragLength > 25){
        guide.segments[0].point = [start.x, event.point.y];; 
        guide.segments[1].point = start;
        guide.segments[2].point = [event.point.x, start.y];
        guide.segments[3].point = event.point;
        makeRectangle = true;
    }
}

var clickHandler = function(event) {
    console.log('run click')
    var active = project.activeLayer.hitTest(event.point);
    if (makeRectangle === false && active !== null){
        var item = active.item;
        if (item.className !== 'PointText'){
            if(item.selected === true){
                item.selected = false;
                item.fillColor = 'rgba(255,255,255,0.7)';
            } else {
                item.selected = true;
                item.fillColor = 'rgba(0,0,0,0.1)';
            }
        // if text
        } else if (item.className === 'PointText'){ 
            if(item.selected === true){
                item.selected = false;
            } else {
                item.selected = true;
            }
            
        } else{
            // do nothing
        }
    }
};

var typeHandler = function(event) {
    console.log('run 2x click');
    var text = new PointText({
        point: new Point(event.point),
        content: 'Click to add text',
        fillColor: '#333',
        fontFamily: 'helvetica',
        fontSize: 16
    });
    text.data = 'tag'
    text.selected = true;
};


project.activeLayer.on('click', clickHandler);
$('canvas').dblclick(typeHandler);


tool.onKeyDown = function(event){
    var thisKey = event.key;
    console.log(thisKey);
    if(thisKey === 'r'){
        var theseAreSelected = project.activeLayer.getItems({
            selected: true
        });
        console.log(theseAreSelected);
        for (i = 0; i < theseAreSelected.length ; i++) { 
            
            theseAreSelected[i].remove();
            
        }
    }


}


