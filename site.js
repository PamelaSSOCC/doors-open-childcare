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

/* Render + filter the participating centres on the Locations page */
(function () {
  var mount = document.getElementById('loc-grid');
  if (!mount || typeof CENTRES === 'undefined') return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); }

  function dayTags(c) {
    var d = String(c.days || '').toLowerCase(), both = d.indexOf('both') !== -1, t = [];
    if (both || d.indexOf('thu') !== -1) t.push('thu');
    if (both || d.indexOf('sat') !== -1) t.push('sat');
    return t;
  }
  function careTags(c) {
    var d = String(c.care || '').toLowerCase(), t = [];
    if (/preschool/.test(d)) t.push('preschool');
    if (/infant|toddler/.test(d)) t.push('infant');
    if (/30 months/.test(d)) t.push('mixed');
    if (/school-aged care/.test(d)) t.push('schoolage');
    return t;
  }
  function philTags(c) {
    var d = String(c.philosophy || '').toLowerCase(), t = [];
    if (/reggio/.test(d)) t.push('reggio');
    if (/montessori/.test(d)) t.push('montessori');
    if (/play/.test(d)) t.push('play');
    if (/academic|traditional/.test(d)) t.push('academic');
    if (/outdoor|nature|land[- ]based|place[- ]based/.test(d)) t.push('outdoor');
    if (/blended/.test(d)) t.push('blended');
    return t;
  }

  var CARE = [{ k: 'preschool', l: 'Preschool' }, { k: 'infant', l: 'Infant/Toddler' },
              { k: 'mixed', l: '30 months \u2013 school age' }, { k: 'schoolage', l: 'School-aged care' }];
  var PHIL = [{ k: 'reggio', l: 'Reggio-inspired' }, { k: 'montessori', l: 'Montessori' }, { k: 'play', l: 'Play-based' },
              { k: 'blended', l: 'Blended' }, { k: 'academic', l: 'Academic' }, { k: 'outdoor', l: 'Outdoor / nature' }];
  var DAY  = [{ k: 'thu', l: 'Thursday, Oct 1' }, { k: 'sat', l: 'Saturday, Oct 3' }];

  var I = {
    pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h9M9 3c0 6-2.5 11-6 13M6 8c0 3 2.5 5.5 6 6.5"/><path d="M13 20l4-9 4 9M14.5 17h5"/></svg>',
    tel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    web:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>'
  };
  var placeholderPin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var SOC = {
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.8-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19 4.7 12 4.7 12 4.7s-7 0-8.8.5A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.8.5 8.8.5 8.8.5s7 0 8.8-.5A2.6 2.6 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>'
  };
  function frow(icon, inner) { return '<dt aria-hidden="true">' + icon + '</dt><dd>' + inner + '</dd>'; }
  function drow(label, val) { return val ? '<dt>' + label + '</dt><dd>' + esc(val) + '</dd>' : ''; }

  function buildCard(c) {
    var media = c.photo
      ? '<img src="photos/' + esc(c.photo) + '" alt="' + esc(c.name) + '" loading="lazy">'
      : '<div class="ph ph--loc" aria-hidden="true">' + placeholderPin + '</div>';

    var tags = '';
    String(c.care || '').split(',').forEach(function (x) { x = x.trim(); if (x) tags += '<span class="care">' + esc(x) + '</span>'; });
    if (c.days) tags += '<span class="day">' + esc(c.days) + '</span>';

    var facts = '';
    if (c.address) {
      var q = encodeURIComponent(c.address.split(' (')[0]);
      facts += frow(I.pin, esc(c.address) +
        ' <a class="maplink" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">Map&nbsp;&#8599;</a>');
    }
    if (c.hours)     facts += frow(I.clock, esc(c.hours));
    if (c.languages) facts += frow(I.lang,  esc(c.languages));
    if (c.phone)     facts += frow(I.tel,   '<a href="tel:' + esc(c.phone.replace(/[^0-9+]/g, '')) + '">' + esc(c.phone) + '</a>');
    if (c.website)   facts += frow(I.web,   '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">Visit website</a>');

    var detail = drow('Closed', c.closures) + drow('Fees', c.fees) +
                 drow('Included in the fee', c.included) + drow('Available to purchase', c.extras) +
                 drow('Good to know', c.details);

    var soc = '';
    if (c.instagram) soc += '<a class="soc" href="https://www.instagram.com/' + esc(c.instagram) + '/" target="_blank" rel="noopener" aria-label="Instagram">' + SOC.ig + '</a>';
    if (c.facebook)  soc += '<a class="soc" href="' + esc(c.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + SOC.fb + '</a>';
    if (c.youtube)   soc += '<a class="soc" href="https://www.youtube.com/@' + esc(c.youtube) + '" target="_blank" rel="noopener" aria-label="YouTube">' + SOC.yt + '</a>';
    var social = soc ? '<div class="loc-social">' + soc + '</div>' : '';

    var reg = c.register ? '<p class="register"><span>Register</span>' + esc(c.register) + '</p>' : '';
    var phil = c.philosophy ? '<p class="phil">' + esc(c.philosophy) + '</p>' : '';

    return '<article class="loc-card" data-care="' + careTags(c).join(' ') + '" data-phil="' + philTags(c).join(' ') + '" data-day="' + dayTags(c).join(' ') + '">' +
             '<div class="loc-photo">' + media + '</div>' +
             '<div class="loc-body">' +
               (tags ? '<div class="loc-tags">' + tags + '</div>' : '') +
               '<h3>' + esc(c.name) + '</h3>' + phil +
               '<dl class="loc-facts">' + facts + '</dl>' +
               (detail ? '<dl class="loc-detail">' + detail + '</dl>' : '') +
               social + reg +
             '</div>' +
           '</article>';
  }

  var status = document.getElementById('loc-status');

  if (!CENTRES.length) {
    mount.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:2.5rem 0;">Participating locations are coming soon — check back closer to the event.</p>';
    if (status) status.textContent = 'Licensed Richmond programs are confirming their spots now.';
    return;
  }

  // Render all cards, alphabetical
  var items = CENTRES.slice().sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
  mount.innerHTML = items.map(buildCard).join('');

  var nAll = CENTRES.length;
  function count(tagFn, key) { return CENTRES.filter(function (c) { return tagFn(c).indexOf(key) !== -1; }).length; }

  var noneEl = document.createElement('p');
  noneEl.className = 'loc-none'; noneEl.hidden = true;
  noneEl.textContent = 'No programs match those choices — try widening a filter.';
  mount.appendChild(noneEl);

  var cur = { care: 'all', phil: 'all', day: 'all' };

  function has(card, attr, key) { return (' ' + card.getAttribute(attr) + ' ').indexOf(' ' + key + ' ') !== -1; }
  function apply() {
    var shown = 0;
    Array.prototype.forEach.call(mount.querySelectorAll('.loc-card'), function (card) {
      var ok = (cur.care === 'all' || has(card, 'data-care', cur.care)) &&
               (cur.phil === 'all' || has(card, 'data-phil', cur.phil)) &&
               (cur.day  === 'all' || has(card, 'data-day',  cur.day));
      card.hidden = !ok; if (ok) shown++;
    });
    noneEl.hidden = shown > 0;
    if (status) {
      if (cur.care === 'all' && cur.phil === 'all' && cur.day === 'all')
        status.textContent = nAll + ' Richmond programs are taking part. Filter by care type, approach, or event day.';
      else
        status.textContent = 'Showing ' + shown + ' of ' + nAll + ' programs.';
    }
  }

  function makeBar(id, label, dim, opts, allLabel) {
    var el = document.getElementById(id); if (!el) return;
    var html = '<span class="loc-filter-label">' + label + '</span>' +
      '<button class="loc-filter-btn is-active" data-k="all" aria-pressed="true">' + allLabel + ' <span>' + nAll + '</span></button>';
    opts.forEach(function (o) {
      var n = count(dim === 'care' ? careTags : dim === 'phil' ? philTags : dayTags, o.k);
      html += '<button class="loc-filter-btn" data-k="' + o.k + '" aria-pressed="false">' + esc(o.l) + ' <span>' + n + '</span></button>';
    });
    el.innerHTML = html;
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.loc-filter-btn'); if (!b) return;
      Array.prototype.forEach.call(el.querySelectorAll('.loc-filter-btn'), function (x) {
        var on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      cur[dim] = b.getAttribute('data-k'); apply();
    });
  }

  makeBar('loc-filter-care', 'Care type', 'care', CARE, 'Any');
  makeBar('loc-filter-phil', 'Approach',  'phil', PHIL, 'Any');
  makeBar('loc-filter-day',  'Event day', 'day',  DAY,  'Any day');
  apply();
})();
