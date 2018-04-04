"use strict";

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

for (var i = 0; i < 25; i++) {
  photos[i] = {
    url: "photos/" + numPhotoes[i] + ".jpg",
    likes: Math.floor(Math.random() * (200 - 15)) + 15,
    comments: [comments[Math.floor(Math.random() * (comments.length))], comments[Math.floor(Math.random() * (comments.length+1))]]
  }

  console.log(photos[i].comments);

  var Y = Math.random();
  console.log(Y);

  if(Y > 0.5) {
    this.comments[1].pop;
  }
}

var similarListElement = document.querySelector(".pictures");
var similarPhotoTemplate = document.querySelector("#picture-template").content.querySelector(".picture");

var renderPhoto = function(photos) {
  var photoElement = similarPhotoTemplate.cloneNode("true");

  photoElement.querySelector("img").src = photos.url;
  photoElement.querySelector(".picture-likes").innerHTML = photos.likes;
  photoElement.querySelector(".picture-comments").innerHTML = photos.comments.length;

  return photoElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

similarListElement.appendChild(fragment);

//document.querySelector(".gallery-overlay").classList.remove("hidden");

var galleryImage = document.querySelector(".gallery-overlay-image");
var galleryLikes = document.querySelector(".likes-count");
var galleryComments = document.querySelector(".comments-count");

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

var ESC_CODE = 27;
var ENTER_CODE = 13;
var pictures = document.querySelectorAll(".picture");

var galleryImage = document.querySelector(".gallery-overlay-image");
var galleryLikes = document.querySelector(".likes-count");
var galleryComments = document.querySelector(".comments-count");

for (var k = 0; k < pictures.length; k++) {
  pictures[k].addEventListener("click", function(evt) {
    evt.preventDefault();
    console.log(this);

      document.querySelector(".gallery-overlay").classList.remove("hidden");
      var pictureThis = this.querySelector(".picture img");
      var likesThis = this.querySelector(".picture-likes");
      var commentsThis = this.querySelector(".picture-comments");

      galleryImage.src = pictureThis.getAttribute('Src');
      galleryLikes.innerHTML = likesThis.innerHTML;
      galleryComments.innerHTML = commentsThis.innerHTML;
      console.log(galleryComments);

  }  );
}



var buttonClose = document.querySelector(".gallery-overlay-close");

var closePicture = function() {
  var pictureFull = document.querySelector(".gallery-overlay");
  pictureFull.classList.add("hidden");
};

buttonClose.addEventListener("click", closePicture);

document.addEventListener("keydown", function(evt) { // DOCUMENT ???
  if (evt.keyCode === ESC_CODE) {
    closePicture();
  }
})
