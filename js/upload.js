"use strict";

(function() {
  var IMG_TYPES = ["jpg", "jpeg", "gif", "png"];
  var imageInput = document.querySelector(".upload-image input[type=file]");
  var imagePreview = document.querySelector(".effect-image-preview");
  var imagesEffect = document.querySelectorAll(".upload-effect-preview");

  imageInput.addEventListener("change", function() {
    var file = imageInput.files[0];
    var fileName = file.name.toLowerCase();

    var fileTypeCheck = IMG_TYPES.some(function(it) {
      return fileName.endsWith(it);
    });

    if (fileTypeCheck) {
      var reader = new FileReader();

      reader.addEventListener("load", function() {
        imagePreview.src = reader.result;
        imagesEffect.forEach(function(el) {
          el.style.backgroundImage = "url(" + reader.result + ")";
        })
      });
      reader.readAsDataURL(file);
    }
  });
})();
