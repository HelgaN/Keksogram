"use strict";

(function() {
  var uploadResizeInput = document.querySelector(".upload-resize-controls-value");
  var buttonResizeDec = document.querySelector(".upload-resize-controls-button-dec");
  var buttonResizeInc = document.querySelector(".upload-resize-controls-button-inc");

  var uploadImage = document.querySelector(".effect-image-preview");

  var onClickButtonResizeDec = function() {
    var value = parseInt(uploadResizeInput.value, 10);

    if (value > 20 && value <= 100) {
      value -= 25;
      if (value <= 25) {
        value = 25;
      }
    }

    uploadResizeInput.value = value + "%";
    uploadImage.style.transform = "scale(" + value / 100 + ")";
  }

  var onClickButtonResizeInc = function() {
    var value = parseInt(uploadResizeInput.value, 10);

    if (value > 0) {
      value += 25;
      if (value > 100) {
        value = 100;
      }
    }

    uploadResizeInput.value = value + "%";
    uploadImage.style.transform = "scale(" + value / 100 + ")";
  }

  buttonResizeDec.addEventListener("click", onClickButtonResizeDec);

  buttonResizeInc.addEventListener("click", onClickButtonResizeInc);

  var uploadEffect = document.querySelector(".upload-effect-controls");

  var addEffectVal = function() {
    var effectSepia = document.querySelector(".effect-sepia");
    var effectChrome = document.querySelector(".effect-chrome");
    var effectMarvin = document.querySelector(".effect-marvin");
    var effectPhobos = document.querySelector(".effect-phobos");
    var effectHeat = document.querySelector(".effect-heat");

    var effectNone = document.querySelector(".effect-image-preview");
    effectNone.style.fiiiter = "blur(100px)";

    if (uploadImage.classList.contains("effect-sepia")) {
      var effectVal = parseInt(pin.style.left) / 100;
      effectSepia.style.filter = "sepia(" + effectVal + ")";
    } else if (uploadImage.classList.contains("effect-chrome")) {
      var effectVal = parseInt(pin.style.left) / 100;
      effectChrome.style.filter = "grayscale(" + effectVal + ")";
    } else if (uploadImage.classList.contains("effect-marvin")) {
      var effectVal = parseInt(pin.style.left);
      effectMarvin.style.filter = "invert(" + effectVal + "%)";
    } else if (uploadImage.classList.contains("effect-phobos")) {
      var effectVal = parseInt(pin.style.left) * 5 / 100;
      effectPhobos.style.filter = "blur(" + effectVal + "px)";
    } else if (uploadImage.classList.contains("effect-heat")) {
      var effectVal = parseInt(pin.style.left) * 3 / 100;
      effectHeat.style.filter = "brightness(" + effectVal + ")";
    }
  }

  var onAddEffect = function(event) {
    var target = event.target;

    if (target.value == "heat") {
      uploadImage.className = "effect-image-preview";
      uploadImage.classList.add("effect-heat");
    } else if (target.value == "phobos") {
      uploadImage.className = "effect-image-preview";
      uploadImage.classList.add("effect-phobos");
    } else if (target.value == "marvin") {
      uploadImage.className = "effect-image-preview";
      uploadImage.classList.add("effect-marvin");
    } else if (target.value == "sepia") {
      uploadImage.className = "effect-image-preview";
      uploadImage.classList.add("effect-sepia");
    } else if (target.value == "chrome") {
      uploadImage.className = "effect-image-preview";
      uploadImage.classList.add("effect-chrome");
    } else if (target.value == "none") {
      uploadImage.className = "effect-image-preview";
    }
    addEffectVal();
  };

  uploadEffect.addEventListener("click", onAddEffect);

  var effectLevelWrap = document.querySelector(".upload-effect-level");
  var line = effectLevelWrap.querySelector(".upload-effect-level-line");
  var pin = effectLevelWrap.querySelector(".upload-effect-level-pin");
  var val = effectLevelWrap.querySelector(".upload-effect-level-val");

  var getCoords = function(elem) { // центрирование при захвате
    var box = elem.getBoundingClientRect();

    return {
      x: box.left + pageXOffset
    };

  }

  pin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoords = getCoords(pin);

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.pageX > startCoords.x) {
        var shift = {
          x: moveEvt.pageX - startCoords.x
        }
      } else {
        var shift = {
          x: startCoords.x - moveEvt.pageX
        }

        startCoords = {
          x: shift.x
        }
      }

      pin.style.left = parseInt(shift.x / 445 * 100).toFixed() + "%";

      val.style.width = parseInt(shift.x / 445 * 100).toFixed() + "%";

      if (parseInt(pin.style.left, 10) > 100 || parseInt(val.style.width, 10) > 100) {
        pin.style.left = "100%";
        val.style.width = "100%";
      }

    }

    var onMouseUp = function(moveUp) {
      addEffectVal();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", onMouseUp);

    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

  })


})();
