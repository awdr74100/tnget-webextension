const script = document.createElement("script");

script.src = chrome.runtime.getURL("scripts/injected.js");
script.addEventListener("load", function () {
  this.remove();
});

const rootElement = document.documentElement;

rootElement.appendChild(script);
