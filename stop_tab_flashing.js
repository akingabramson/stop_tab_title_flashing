let titleElement = document.getElementsByTagName('title')[0];

if (titleElement) {
  window.StopTabFlashingGlobalNamespaceOriginalTitle = titleElement.text;
} else {
  window.StopTabFlashingGlobalNamespaceOriginalTitle = '';
}

function titleModified() {
  var text = document.getElementsByTagName('title')[0].text;
  if (text != StopTabFlashingGlobalNamespaceOriginalTitle) {
    document.getElementsByTagName('title')[0].text = StopTabFlashingGlobalNamespaceOriginalTitle;
  }
}

window.onload = function() {
  var titleEl = document.getElementsByTagName("title")[0];
  var docEl = document.documentElement;

  if (docEl && docEl.addEventListener) {
    docEl.addEventListener("DOMSubtreeModified", function(evt) {
      var t = evt.target;
      if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
        titleModified();
      }
    }, false);
  } else {
    document.onpropertychange = function() {
      if (window.event.propertyName == "title") {
        titleModified();
      }
    };
  }
};
