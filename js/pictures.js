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

        /*  var arrCommentsThis = commentsThis.innerText.split(/[.!?],/);*/

        galleryImage.src = pictureThis.getAttribute("src");
        galleryLikes.innerHTML = likesThis.innerHTML;
        galleryComments.innerHTML = commentsThis.childNodes.length;

        /*  arrCommentsThis.forEach(function(item, i, array) {
            galleryComments.innerHTML = arrCommentsThis[i].length;
          });*/

        var galleryControls = document.querySelector(".gallery-overlay-controls");
        var commentsThis = commentsThis.querySelectorAll("p");

        commentsThis.forEach(function(item, i, arr) {
          console.log(item + "   " +  i);
          var b = item.cloneNode(true)
          galleryControls.appendChild(b);
          b.classList.add("comment-item");
        })

      });

    }

    var buttonClose = document.querySelector(".gallery-overlay-close");

    var closePicture = function() {
      var pictureFull = document.querySelector(".gallery-overlay");
      pictureFull.classList.add("hidden");
      clearLike();
      clearComments();
    };

    buttonClose.addEventListener("click", closePicture);

    document.addEventListener("keydown", function(evt) {
      if (evt.keyCode === ESC_CODE) {
        closePicture();
      }
    })

  }

  var likeButton = document.querySelector(".likes-count");

  var onClickLike = function() {
    likeButton.classList.toggle("likes-count-liked");
    var countLikes = Number.parseInt(likeButton.innerText);
    if (likeButton.classList.contains("likes-count-liked")) {
      likeButton.innerText = countLikes += 1;
    } else {
      likeButton.innerText = countLikes -= 1;
    }
  }

  var clearLike = function() {
    var countLikes = Number.parseInt(likeButton.innerText);
    if (likeButton.classList.contains("likes-count-liked")) {
      likeButton.innerText = countLikes -= 1;
      likeButton.classList.remove("likes-count-liked");
    }
  }

  var clearComments = function() {
    var galleryControls = document.querySelector(".gallery-overlay-controls");
    var commentsThis = galleryControls.querySelectorAll("p");
    commentsThis.forEach(function(item, i, arr) {
      galleryControls.removeChild(item);
    })
  };

  likeButton.addEventListener("click", onClickLike);

})();
