"use strict";

(function() {
  var URL_UPLOAD = "";
  var URL_DOWNLOAD = "https://js.dump.academy/kekstagram/data";

  window.load = function(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("GET", URL_DOWNLOAD);

    xhr.addEventListener("load", function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        showPic();
      } else {
        onError("Неизвестный статус" + xhr.status + " " + xhr.statusText);
      };
    });

    xhr.addEventListener("error", function() {
      onError("Произошла ошибка соединения");
    });

    xhr.addEventListener("timeout", function() {
      onError("Запрос не успел выполниться за " + xhr.timeout + " мс");
    });

    xhr.timeout = 10000;    //10s

    xhr.send();

  };


})();
