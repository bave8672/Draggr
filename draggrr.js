/**
*
* Allows elements with class='drag' to be moved by mouse drag
*
**/

'use strict';

// Find all '.drag' elements and give them the necessary styles and callbacks
(function () {
    var dragEls = document.querySelectorAll('.drag, .drag-absolute, .drag-relative, .drag-fixed');
    for (var i = 0; i < dragEls.length; i++) {
        var el = dragEls[i];
        el.style['cursor'] = 'move';
        if (el.classList.contains('drag-absolute')) {
            el.style['position'] = 'absolute';
        }
        else if (el.classList.contains('drag-relative')) {
            el.style['position'] = 'relative';
        }
        else if (el.classList.contains('drag-fixed')) {
            el.style['position'] = 'fixed';
        }
        el.onmousedown = function (e) {
            grabbedEl = e.target;
            oldX = e.pageX;
            oldY = e.pageY;
            var offset = getOffset(grabbedEl);
            oldElX = offset.left;
            oldElY = offset.top;
            grabbedEl.classList.add('grabbed');
        }
    }
})();

// Remember where the mouse last clicked, and whether something is being dragged / what it is
var mouseX, mouseY, oldX, oldY, oldElX, oldElY;;
var grabbedEl = false;

// handle mousemove event
document.onmousemove = function (e) {
    if (grabbedEl) {
        var dX = e.pageX - oldX;
        var dY = e.pageY - oldY;
        grabbedEl.style['left'] = oldElX + dX + 'px';
        grabbedEl.style['top'] = oldElY + dY + 'px';
    }
}

// Stop dragging on mouseup
document.onmouseup = function (e) {
    grabbedEl.classList.remove('grabbed');
    grabbedEl = false;
}

// getoffset function http://stackoverflow.com/a/442474
function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

// Touch handler converts touches to clicks http://stackoverflow.com/a/6141093
function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch (event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove": type = "mousemove"; break;
        case "touchend": type = "mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

// Call this after the dom has loaded if you plan on handling touches
function touchInit() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
