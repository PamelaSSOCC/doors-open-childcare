/* Mobile nav toggle */
(function () {
  var btn = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }
})();

/* Render participating centres on the Locations page */
(function () {
  var mount = document.getElementById('loc-grid');
  if (!mount || typeof CENTRES === 'undefined') return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); }

  var pin  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var tel  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>';
  var web  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>';

  var html = CENTRES.map(function (c) {
    var rows = '';
    if (c.address) rows += '<dt aria-hidden="true">' + pin + '</dt><dd>' + esc(c.address) + '</dd>';
    if (c.phone)   rows += '<dt aria-hidden="true">' + tel + '</dt><dd><a href="tel:' + esc(c.phone.replace(/[^0-9+]/g, '')) + '">' + esc(c.phone) + '</a></dd>';
    if (c.website) rows += '<dt aria-hidden="true">' + web + '</dt><dd><a href="' + esc(c.website) + '" target="_blank" rel="noopener">Visit website</a></dd>';
    return '<article class="loc-card">' +
             (c.care ? '<span class="care">' + esc(c.care) + '</span>' : '') +
             '<h3>' + esc(c.name) + '</h3>' +
             '<dl>' + rows + '</dl>' +
           '</article>';
  }).join('');

  mount.innerHTML = html;
  var status = document.getElementById('loc-status');
  if (!CENTRES.length) {
    mount.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:2.5rem 0;">Participating locations are coming soon — check back closer to the event.</p>';
    if (status) status.textContent = 'Licensed Richmond programs are confirming their spots now. The list and map will appear here as they\u2019re ready.';
  } else if (status) {
    var n = CENTRES.length;
    status.textContent = n + ' licensed Richmond program' + (n === 1 ? '' : 's') + ' ' + (n === 1 ? 'is' : 'are') +
      ' taking part. Tap any for its address, care type, and how to reach them.';
  }
})();
