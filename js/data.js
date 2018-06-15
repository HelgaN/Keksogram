"use strict";

(function() {
  var numPhotoes = [];

  for (var i = 0; i < 25; i++) {
    numPhotoes[i] = i + 1;
  }

  function shuffleArray(numPhotoes) {
    for (var i = numPhotoes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numPhotoes[i];
      numPhotoes[i] = numPhotoes[j];
      numPhotoes[j] = temp;
    }
    return numPhotoes;
  }

  numPhotoes = shuffleArray(numPhotoes);

  var comments = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];

  var photos = [];
/* случайная генерация фоток
  var photosGeneration = function(array) {
    for (var i = 0; i < 25; i++) {
      array[i] = {
        url: "photos/" + numPhotoes[i] + ".jpg",
        likes: Math.floor(Math.random() * (200 - 15)) + 15,
        comments: [comments[Math.floor(Math.random() * (comments.length))], comments[Math.floor(Math.random() * (comments.length + 1))]]
      }

      var selection = Math.random();

      if (selection > 0.5) {
        array[i].comments.pop();
      }
    }
  };

  photosGeneration(photos);*/

  var similarListElement = document.querySelector(".pictures");
  var similarPhotoTemplate = document.querySelector("#picture-template").content.querySelector(".picture");

  var renderPhoto = function(photos) {
    var photoElement = similarPhotoTemplate.cloneNode("true");

    photoElement.querySelector("img").src = photos.url;
    photoElement.querySelector(".picture-likes").innerHTML = photos.likes;
    photoElement.querySelector(".picture-comments").innerHTML = photos.comments;

    return photoElement;
  }
/* случайная генерация фоток
  var creatFragment = function(array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPhoto(array[i]));
    }

    similarListElement.appendChild(fragment);
  };

  creatFragment(photos);*/

  var successHandler = function(photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var successHandlerUpload = function() {
    var uploadOverlay = document.querySelector(".upload-overlay");
    var uploadMessage = document.querySelector(".upload-message");
    uploadOverlay.classList.add("hidden");
    uploadMessage.classList.add("hidden");
  }

  var errorHandler = function(errorMessage) {
    var node = document.createElement("div");
    node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
    node.style.left = "0";
    node.style.right = "0";
    node.style.fontSize = "30px;";

    node.textContent = errorMessage;

    document.body.insertAdjacentElement("afterbegin", node);
  };

  window.load(successHandler, errorHandler);

  var uploadForm = document.querySelector(".upload-form");

  uploadForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    window.upload(new FormData(uploadForm), successHandlerUpload, errorHandler);
  });



  //document.querySelector(".gallery-overlay").classList.remove("hidden");

  var galleryImage = document.querySelector(".gallery-overlay-image");
  var galleryLikes = document.querySelector(".likes-count");
  var galleryComments = document.querySelector(".comments-count");
/* для случайной генерации данных
  var countComments = function() {

    if (photos[0].comments[0] === undefined && photos[0].comments[1] === undefined) {
      return galleryComments.innerHTML = "0";
    }

    if (photos[0].comments[0] !== undefined && photos[0].comments[1] === undefined || photos[0].comments[0] === undefined && photos[0].comments[1] !== undefined) {
      photos[0].comments.join('');
      return galleryComments.innerHTML = "1";
    }

    if (photos[0].comments[0] !== undefined && photos[0].comments[1] !== undefined) {
      return galleryComments.innerHTML = "2";
    }
  }

  countComments();
*/

})();
