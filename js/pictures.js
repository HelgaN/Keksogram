"use strict";

(function() {

window.showPic = function() {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var pictures = document.querySelectorAll(".picture");

  var galleryImage = document.querySelector(".gallery-overlay-image");
  var galleryLikes = document.querySelector(".likes-count");
  var galleryComments = document.querySelector(".comments-count");


  for (var k = 0; k < pictures.length; k++) {
    pictures[k].addEventListener("click", function(evt) {
      evt.preventDefault();

      document.querySelector(".gallery-overlay").classList.remove("hidden");
      var pictureThis = this.querySelector(".picture img");
      var likesThis = this.querySelector(".picture-likes");
      var commentsThis = this.querySelector(".picture-comments");
      var arrCommentsThis = commentsThis.innerText.split(",");
      console.log(arrCommentsThis);

      galleryImage.src = pictureThis.getAttribute("src");
      galleryLikes.innerHTML = likesThis.innerHTML;
      /*galleryComments.innerHTML = commentsThis.innerHTML;*/

      arrCommentsThis.forEach(function(item, i, array) {
        galleryComments.innerHTML = arrCommentsThis[i].length;
      });
    });
  }

  var buttonClose = document.querySelector(".gallery-overlay-close");

  var closePicture = function() {
    var pictureFull = document.querySelector(".gallery-overlay");
    pictureFull.classList.add("hidden");
  };

  buttonClose.addEventListener("click", closePicture);

  document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === ESC_CODE) {
      closePicture();
    }
  })
}
})();
