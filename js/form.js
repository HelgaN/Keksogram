"use strict";

(function() {
  var uploadResizeInput = document.querySelector(".upload-resize-controls-value");
  var uploadImage = document.querySelector(".effect-image-preview");

  var scaleElement = document.querySelector(".upload-resize-controls");

  var adjustScale = function(scale) {
    uploadResizeInput.value = scale + "%";
    uploadImage.style.transform = "scale(" + scale / 100 + ")";
  };

  window.initializeScale(scaleElement, adjustScale);

  var uploadEffect = document.querySelector(".upload-effect-controls");
  var effectLevelWrap = document.querySelector(".upload-effect-level");
  effectLevelWrap.style.display = "none";

  var addEffectVal = function() {
    var effectSepia = document.querySelector(".effect-sepia");
    var effectChrome = document.querySelector(".effect-chrome");
    var effectMarvin = document.querySelector(".effect-marvin");
    var effectPhobos = document.querySelector(".effect-phobos");
    var effectHeat = document.querySelector(".effect-heat");

    var effectNone = document.querySelector(".effect-image-preview");

    if (uploadImage.classList.contains("effect-sepia")) {
      var effectVal = parseInt(pin.style.left) / 100;
      effectSepia.style.filter = "sepia(" + effectVal + ")";
      effectLevelWrap.style.display = "block";
    } else if (uploadImage.classList.contains("effect-chrome")) {
      var effectVal = parseInt(pin.style.left) / 100;
      effectChrome.style.filter = "grayscale(" + effectVal + ")";
      effectLevelWrap.style.display = "block";
    } else if (uploadImage.classList.contains("effect-marvin")) {
      var effectVal = parseInt(pin.style.left);
      effectMarvin.style.filter = "invert(" + effectVal + "%)";
      effectLevelWrap.style.display = "block";
    } else if (uploadImage.classList.contains("effect-phobos")) {
      var effectVal = parseInt(pin.style.left) * 5 / 100;
      effectPhobos.style.filter = "blur(" + effectVal + "px)";
      effectLevelWrap.style.display = "block";
    } else if (uploadImage.classList.contains("effect-heat")) {
      var effectVal = parseInt(pin.style.left) * 3 / 100;
      effectHeat.style.filter = "brightness(" + effectVal + ")";
      effectLevelWrap.style.display = "block";
    } else if (uploadImage.classList.contains("effect-image-preview")) {
      effectNone.style.filter = "";
      effectLevelWrap.style.display = "none";
    }
  }

  window.initializeFilters(uploadEffect, addEffectVal);

  var line = effectLevelWrap.querySelector(".upload-effect-level-line");
  var pin = effectLevelWrap.querySelector(".upload-effect-level-pin");
  var val = effectLevelWrap.querySelector(".upload-effect-level-val");

  pin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.pageX
    }

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

  });

  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var uploadForm = document.querySelector(".upload-form");
  var uploadFile = document.querySelector("#upload-file"); //   ???
  var buttonClose = document.querySelector(".upload-form-cancel");
  var uploadOverlay = document.querySelector(".upload-overlay");
  var uploadMessage = document.querySelector(".upload-message");
  var comment = document.querySelector(".upload-form-description");

  var openPopup = function(e) {
    e.preventDefault();
    uploadOverlay.classList.remove("hidden");
    uploadMessage.classList.remove("hidden");
  };

  var closePopup = function() {
    uploadOverlay.classList.add("hidden");
    uploadMessage.classList.add("hidden");
  };

  var onClosePopupEsc = function(e) {
    var focusedElem = document.querySelector(":focus");
    if (e.keyCode === ESC_CODE && focusedElem != comment) {
      closePopup();
    }
  };

  uploadFile.addEventListener("change", openPopup);

  buttonClose.addEventListener("click", closePopup);

  document.addEventListener("keydown", function(e) {
    onClosePopupEsc(e);
  });

  var uplaodHash = document.querySelector(".upload-form-hashtags");

  var testUniqueArray = function(arrayTest) {
    var n = arrayTest.length;
    for (var i = 0; i < n - 1; i++) {
      for (var j = i + 1; j < n; j++) {
        if (arrayTest[i] === arrayTest[j]) return false;
      }
      if (arrayTest.length > 5) return false;
    }
    return true;
  }

  uploadForm.addEventListener("click", function(evt) {   /* не лучший вариант, но прокатило вроде :) */
    var uplaodHash = document.querySelector(".upload-form-hashtags");
    var pattern = /(^#[a-zа-яё0-9]{1,20})/i;
    console.log(pattern.test(uplaodHash.value));
    var arr = uplaodHash.value.split(" ");
    var result = testUniqueArray(arr);
    if (!arr[0]) return true;
    console.log(testUniqueArray(arr));
    if (pattern.test(uplaodHash.value) && result) {
      return true;
    } else {
      evt.preventDefault();
    }
    uplaodHash.style.border = "5px solid red";
  });

})();
