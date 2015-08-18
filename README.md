# Draggr

Make DOM elements user-positionable in a UI-friendly way.

### How to use

1. Download the script and include below your body content or copy it into a project file.
2. Give any html elemtents you want to be draggable either a `.drag-absolute`, `.drag-ralative` or `.drag-fixed`  class.
3. Done!

Optional:
* Use the `.drag` class if you want to set an elements position manually (it must still be either absolute, relative or fixed)
* Add CSS for the `.grabbed` selector to modify objects appearance whilst they are being grabbed
* Call the `touchInit()` function after the DOM has loaded to allow this to work on touch-enabled devices

### Example
```HTML
<html>
  <body>
    <div class='circle drag-absolute'></div>
    <script src='*/scripts/draggr.min.js'></script>
    <script>touchInit()</script>
  </body>
</html>
```

```CSS
.circle {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50px;
}

.grabbed {
  background-color: red;
}
```

[Also see this slightly more complex example on codepen](http://codepen.io/bave8782/pen/rVgVOE)

