"use strict";

(function() {
  window.initializeScale = function(element, callback) {
    var uploadResizeInput = document.querySelector(".upload-resize-controls-value");
    var buttonResizeDec = element.querySelector(".upload-resize-controls-button-dec");
    var buttonResizeInc = element.querySelector(".upload-resize-controls-button-inc");

    var onClickButtonResizeDec = function() {
      var value = parseInt(uploadResizeInput.value, 10);

      if (value > 20 && value <= 100) {
        value -= 25;
        if (value <= 25) {
          value = 25;
        }
      }

      callback(value);
    }

    var onClickButtonResizeInc = function() {
      var value = parseInt(uploadResizeInput.value, 10);

      if (value > 0) {
        value += 25;
        if (value > 100) {
          value = 100;
        }
      }

      callback(value);
    }

    buttonResizeDec.addEventListener("click", onClickButtonResizeDec);

    buttonResizeInc.addEventListener("click", onClickButtonResizeInc);

  };
})();
