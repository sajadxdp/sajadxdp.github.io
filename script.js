/* Progressive enhancement: footer year, active nav, copy email.
   Dark only - there is no theme toggle and no stored theme. */
(function () {
  'use strict';

  /* Footer year. */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Mark where the reader is. Exact match wins; otherwise highlight the section. */
  function path(href) {
    var p = new URL(href, location.href).pathname
      .replace(/index\.html?$/, '')
      .replace(/\.html$/, '/');
    return p.slice(-1) === '/' ? p : p + '/';
  }
  function markNav() {
    var links = document.querySelectorAll('nav[aria-label="Primary"] a[href]');
    if (!links.length) return;
    var here = path(location.href);
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var to = path(a.getAttribute('href'));
      if (to === here) {
        a.setAttribute('aria-current', 'page');
      } else if (to !== '/' && here.indexOf(to) === 0) {
        a.setAttribute('data-section', '');
      }
    }
  }
  markNav();

  /* A copy button next to any link that displays a bare email address. */
  if (document.querySelectorAll('a[href^="mailto:"]').length) {
    var supportsClipboard = !!(navigator.clipboard && window.isSecureContext);
    var status = document.createElement('span');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.className = 'visually-hidden';

    var created = 0;
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      var addr = a.getAttribute('href').replace(/^mailto:/, '').split('?')[0].trim();
      if (!addr || a.textContent.indexOf('@') === -1) return;
      created++;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy email address');
      a.insertAdjacentElement('afterend', btn);

      var reset;
      btn.addEventListener('click', function () {
        var ok = function () {
          btn.textContent = 'Copied';
          btn.classList.add('is-done');
          status.textContent = 'Email address copied';
          clearTimeout(reset);
          reset = setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('is-done');
            status.textContent = '';
          }, 1600);
        };
        var fail = function () {
          /* Clipboard unavailable or refused: select-and-copy via
             execCommand, manual prompt as the last resort. */
          var ta = document.createElement('textarea');
          ta.value = addr;
          ta.setAttribute('readonly', '');
          ta.className = 'visually-hidden';
          document.body.appendChild(ta);
          ta.select();
          var done = false;
          try { done = document.execCommand('copy'); } catch (e) {}
          ta.remove();
          if (done) ok();
          else window.prompt('Copy email address', addr);
        };
        if (supportsClipboard) navigator.clipboard.writeText(addr).then(ok, fail);
        else fail();
      });
    });

    /* the live region matters only where a copy button exists */
    if (created) document.body.appendChild(status);
  }
})();
