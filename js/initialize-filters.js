"use strict";

(function() {
  window.initializeFilters = function(effect, callback) {
    var uploadImage = document.querySelector(".effect-image-preview");
    var pin = document.querySelector(".upload-effect-level-pin");
    var val = document.querySelector(".upload-effect-level-val");

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
      callback();
    };

    effect.addEventListener("click", onAddEffect);

    var onResetStylePin = function() {
      pin.style.left = "20%";
      val.style.width = "20%";
    };

    var labelsEffect = document.querySelectorAll(".upload-effect-label");
    for (var i = 0; i < labelsEffect.length; i++) {
      labelsEffect[i].addEventListener("click", function() {
        onResetStylePin();
      })
    }

  };
})();
