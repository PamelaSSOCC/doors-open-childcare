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

/* Render participating centres + filters on the Locations page */
(function () {
  var mount = document.getElementById('loc-grid');
  if (!mount || typeof CENTRES === 'undefined') return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); }

  // Which day(s) is a program open? "Both days" counts for both.
  function dayFlags(days) {
    var d = String(days || '').toLowerCase();
    var both = d.indexOf('both') !== -1;
    return { thu: both || d.indexOf('thu') !== -1, sat: both || d.indexOf('sat') !== -1 };
  }
  // Which approach tags does a program carry? Blended programs carry each component.
  function philTags(p) {
    var d = String(p || '').toLowerCase(), t = [];
    if (/reggio/.test(d)) t.push('reggio');
    if (/montessori/.test(d)) t.push('montessori');
    if (/play/.test(d)) t.push('play');
    if (/academic|traditional/.test(d)) t.push('academic');
    if (/outdoor|nature|land[- ]based|place[- ]based/.test(d)) t.push('outdoor');
    if (/blended/.test(d)) t.push('blended');
    return t;
  }

  var I = {
    pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h9M9 3c0 6-2.5 11-6 13M6 8c0 3 2.5 5.5 6 6.5"/><path d="M13 20l4-9 4 9M14.5 17h5"/></svg>',
    fund: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.2a2.4 2.4 0 0 1 2.5-1.7c1.3 0 2.3.8 2.3 1.9 0 2.5-4.8 1.5-4.8 4 0 1.1 1 1.9 2.5 1.9a2.5 2.5 0 0 0 2.5-1.6"/></svg>',
    tel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    web:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>'
  };
  var placeholderPin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var SOC = {
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.8-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19 4.7 12 4.7 12 4.7s-7 0-8.8.5A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.8.5 8.8.5 8.8.5s7 0 8.8-.5A2.6 2.6 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>'
  };

  function row(icon, inner) { return '<dt aria-hidden="true">' + icon + '</dt><dd>' + inner + '</dd>'; }

  var html = CENTRES.map(function (c) {
    var f = dayFlags(c.days);
    var pt = philTags(c.philosophy).join(' ');
    var media = c.photo
      ? '<img src="photos/' + esc(c.photo) + '" alt="' + esc(c.name) + '" loading="lazy">'
      : '<div class="ph ph--loc" aria-hidden="true">' + placeholderPin + '</div>';

    var tags = '';
    if (c.care) tags += '<span class="care">' + esc(c.care) + '</span>';
    if (c.days) tags += '<span class="day">' + esc(c.days) + '</span>';

    var rows = '';
    if (c.address) {
      var q = encodeURIComponent(c.address.split(' (')[0]);
      rows += row(I.pin, esc(c.address) +
        ' <a class="maplink" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">Map&nbsp;&#8599;</a>');
    }
    if (c.hours)     rows += row(I.clock, esc(c.hours));
    if (c.languages) rows += row(I.lang,  esc(c.languages));
    if (c.funding)   rows += row(I.fund,  esc(c.funding));
    if (c.phone)     rows += row(I.tel,   '<a href="tel:' + esc(c.phone.replace(/[^0-9+]/g, '')) + '">' + esc(c.phone) + '</a>');
    if (c.website)   rows += row(I.web,   '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">Visit website</a>');

    var soc = '';
    if (c.instagram) soc += '<a class="soc" href="https://www.instagram.com/' + esc(c.instagram) + '/" target="_blank" rel="noopener" aria-label="Instagram">' + SOC.ig + '</a>';
    if (c.facebook)  soc += '<a class="soc" href="' + esc(c.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + SOC.fb + '</a>';
    if (c.youtube)   soc += '<a class="soc" href="https://www.youtube.com/@' + esc(c.youtube) + '" target="_blank" rel="noopener" aria-label="YouTube">' + SOC.yt + '</a>';
    var social = soc ? '<div class="loc-social">' + soc + '</div>' : '';

    var reg = c.register ? '<p class="register"><span>Register</span>' + esc(c.register) + '</p>' : '';
    var phil = c.philosophy ? '<p class="phil">' + esc(c.philosophy) + '</p>' : '';

    return '<article class="loc-card" data-thu="' + (f.thu ? 1 : 0) + '" data-sat="' + (f.sat ? 1 : 0) + '" data-phil="' + pt + '">' +
             '<div class="loc-photo">' + media + '</div>' +
             '<div class="loc-body">' +
               (tags ? '<div class="loc-tags">' + tags + '</div>' : '') +
               '<h3>' + esc(c.name) + '</h3>' +
               phil +
               '<dl>' + rows + '</dl>' +
               social +
               reg +
             '</div>' +
           '</article>';
  }).join('');

  var status = document.getElementById('loc-status');
  var dayMount = document.getElementById('loc-filter');
  var philMount = document.getElementById('loc-filter-phil');

  if (!CENTRES.length) {
    mount.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:2.5rem 0;">Participating locations are coming soon — check back closer to the event.</p>';
    if (status) status.textContent = 'Licensed Richmond programs are confirming their spots now. The list and map will appear here as they\u2019re ready.';
    return;
  }

  mount.innerHTML = html;

  var nAll = CENTRES.length;
  var dayCount = {
    thu: CENTRES.filter(function (c) { return dayFlags(c.days).thu; }).length,
    sat: CENTRES.filter(function (c) { return dayFlags(c.days).sat; }).length
  };
  var philCats = ['reggio', 'montessori', 'play', 'academic', 'outdoor', 'blended'];
  var philLabel = { reggio: 'Reggio-inspired', montessori: 'Montessori', play: 'Play-based', academic: 'Academic', outdoor: 'Outdoor / nature', blended: 'Blended' };
  var philCount = {};
  philCats.forEach(function (k) { philCount[k] = CENTRES.filter(function (c) { return philTags(c.philosophy).indexOf(k) !== -1; }).length; });

  var curDay = 'all', curPhil = 'all';

  // "No match" message (lives inside the grid)
  var noneEl = document.createElement('p');
  noneEl.className = 'loc-none'; noneEl.hidden = true;
  noneEl.textContent = 'No programs match those filters — try a different day or approach.';
  mount.appendChild(noneEl);

  function setStatus(shown) {
    if (!status) return;
    if (curDay === 'all' && curPhil === 'all') {
      status.textContent = nAll + ' Richmond programs taking part so far. Filter by day or approach below, and open any address on the map.';
      return;
    }
    var bits = [];
    if (curDay !== 'all') bits.push(curDay === 'thu' ? 'open Thursday, Oct 1' : 'open Saturday, Oct 3');
    if (curPhil !== 'all') bits.push(philLabel[curPhil].toLowerCase());
    status.textContent = shown + ' program' + (shown === 1 ? '' : 's') + (bits.length ? ' ' + bits.join(' · ') : '') + '.';
  }

  function apply() {
    var shown = 0;
    Array.prototype.forEach.call(mount.querySelectorAll('.loc-card'), function (card) {
      var dayOK = curDay === 'all' || card.getAttribute('data-' + curDay) === '1';
      var philOK = curPhil === 'all' || (' ' + card.getAttribute('data-phil') + ' ').indexOf(' ' + curPhil + ' ') !== -1;
      var show = dayOK && philOK;
      card.hidden = !show;
      if (show) shown++;
    });
    noneEl.hidden = shown > 0;
    setStatus(shown);
  }

  function makeBar(el, label, options, onPick) {
    var out = '<span class="loc-filter-label">' + label + '</span>';
    options.forEach(function (o) {
      var active = o.f === 'all';
      out += '<button class="loc-filter-btn' + (active ? ' is-active' : '') + '" data-f="' + o.f + '" aria-pressed="' + (active ? 'true' : 'false') + '">' +
             esc(o.label) + ' <span>' + o.n + '</span></button>';
    });
    el.innerHTML = out;
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.loc-filter-btn'); if (!b) return;
      Array.prototype.forEach.call(el.querySelectorAll('.loc-filter-btn'), function (x) {
        var on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      onPick(b.getAttribute('data-f'));
    });
  }

  if (dayMount) {
    makeBar(dayMount, 'Open', [
      { f: 'all', label: 'Any day', n: nAll },
      { f: 'thu', label: 'Thu, Oct 1', n: dayCount.thu },
      { f: 'sat', label: 'Sat, Oct 3', n: dayCount.sat }
    ], function (f) { curDay = f; apply(); });
  }
  if (philMount) {
    var opts = [{ f: 'all', label: 'Any approach', n: nAll }].concat(
      philCats.map(function (k) { return { f: k, label: philLabel[k], n: philCount[k] }; }));
    makeBar(philMount, 'Approach', opts, function (f) { curPhil = f; apply(); });
  }

  setStatus(nAll);
})();
