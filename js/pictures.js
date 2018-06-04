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

photosGeneration(photos);

var similarListElement = document.querySelector(".pictures");
var similarPhotoTemplate = document.querySelector("#picture-template").content.querySelector(".picture");

var renderPhoto = function(photos) {
  var photoElement = similarPhotoTemplate.cloneNode("true");

  photoElement.querySelector("img").src = photos.url;
  photoElement.querySelector(".picture-likes").innerHTML = photos.likes;
  photoElement.querySelector(".picture-comments").innerHTML = photos.comments.length;

  return photoElement;
}

var creatFragment = function(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPhoto(array[i]));
  }

  similarListElement.appendChild(fragment);
};

creatFragment(photos);

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

    document.querySelector(".gallery-overlay").classList.remove("hidden");
    var pictureThis = this.querySelector(".picture img");
    var likesThis = this.querySelector(".picture-likes");
    var commentsThis = this.querySelector(".picture-comments");

    galleryImage.src = pictureThis.getAttribute("src");
    galleryLikes.innerHTML = likesThis.innerHTML;
    galleryComments.innerHTML = commentsThis.innerHTML;
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

uploadEffect.onclick = function(event) {
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
  } else {
    uploadImage.className = "effect-image-preview";
  }
};

var uplaodHash = document.querySelector(".upload-form-hashtags");
//var pattern = /(^#[a-zа-яё0-9]{1,30})/i;
var testUniqueArray = function(arrayTest) {
  var n = arrayTest.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = i + 1; j < n; j++) {
      if (arrayTest[i] === arrayTest[j]) return false;
    }
    if(arrayTest.length > 5) return false;
  }
  return true;
}

uploadForm.addEventListener("submit", function(evt) {
  var uplaodHash = document.querySelector(".upload-form-hashtags");
  var pattern = /(^#[a-zа-яё0-9]{1,20})/i;
  console.log(pattern.test(uplaodHash.value));
  var arr = uplaodHash.value.split(" ");
  var result = testUniqueArray(arr);
  if(!arr[0]) return true;
  console.log(testUniqueArray(arr));
  if(pattern.test(uplaodHash.value) && result) {
    return true;
  } else {
    evt.preventDefault();
  }
  uplaodHash.style.border = "5px solid red";
});
