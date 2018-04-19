var mousePosition;
var offset = [0,0];
var isDown = false;
var windowe = document.querySelector('#window');

windowe.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
      //calculate new cursor position
        windowe.offsetLeft - e.clientX,
        windowe.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
          //get cursor position
            x : event.clientX,
            y : event.clientY

        };
        //set element's new position
        windowe.style.left = (mousePosition.x + offset[0]) + 'px';
        windowe.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
