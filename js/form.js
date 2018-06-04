"use strict";

(function() {
  var effectLevelWrap = document.querySelector(".upload-effect-level");
  var line = effectLevelWrap.querySelector(".upload-effect-level-line");
  var pin = effectLevelWrap.querySelector(".upload-effect-level-pin");
  var val = effectLevelWrap.querySelector(".upload-effect-level-val");

  pin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    }
    console.log(startCoords.x);

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      }
      console.log(shift.x + " shift");
      startCoords = {
        x: moveEvt.clientX
      }

      pin.style.left = startCoords.x + shift.x;

    }

    document.addEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseMove);

  })
})();
