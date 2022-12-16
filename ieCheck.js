function isIE() {
  return window.navigator.userAgent.match(/(MSIE|Trident)/);
}
if (isIE()) {
  var nodeDiv = document.createElement('div');
  nodeDiv.className = 'browser-alert';

  var nodeSpan = document.createElement('span');
  nodeSpan.className = 'browser-msg';

  var browsehappy = document.createElement('a');
  browsehappy.className = 'btn-link';
  browsehappy.href = 'https://browsehappy.com/';
  browsehappy.target = '_blank';
  browsehappy.rel = 'noopener noreferrer';
  browsehappy.appendChild(document.createTextNode('upgrade your browser'));

  var browserName = document.createElement('strong');
  browserName.appendChild(document.createTextNode('Internet Explorer'));

  nodeSpan.appendChild(browserName);
  nodeSpan.appendChild(
    document.createTextNode(' is not supported by this site. Please ')
  );
  nodeSpan.appendChild(browsehappy);
  nodeSpan.appendChild(document.createTextNode(' to improve your experience.'));

  nodeDiv.appendChild(nodeSpan);
  document.body.appendChild(nodeDiv);
}
