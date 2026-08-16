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

/* Render + group the participating centres on the Locations page */
(function () {
  var groupsMount = document.getElementById('loc-groups');
  if (!groupsMount || typeof CENTRES === 'undefined') return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); }

  /* --- category tagging (a program can belong to several) --- */
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

  var DIMS = {
    care: { label: 'Care type', tags: careTags, cats: [
      { key: 'preschool', label: 'Preschool (4 hrs or less)' },
      { key: 'infant',    label: 'Infant/Toddler' },
      { key: 'mixed',     label: '30 months \u2013 school age' },
      { key: 'schoolage', label: 'School-aged care' }
    ]},
    phil: { label: 'Approach', tags: philTags, cats: [
      { key: 'reggio',     label: 'Reggio-inspired' },
      { key: 'montessori', label: 'Montessori' },
      { key: 'play',       label: 'Play-based' },
      { key: 'blended',    label: 'Blended' },
      { key: 'academic',   label: 'Academic' },
      { key: 'outdoor',    label: 'Outdoor / nature' }
    ]},
    day: { label: 'Event day', tags: dayTags, cats: [
      { key: 'thu', label: 'Thursday, Oct 1 (evening)' },
      { key: 'sat', label: 'Saturday, Oct 3 (morning)' }
    ]}
  };

  /* --- icons --- */
  var I = {
    pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h9M9 3c0 6-2.5 11-6 13M6 8c0 3 2.5 5.5 6 6.5"/><path d="M13 20l4-9 4 9M14.5 17h5"/></svg>',
    fund: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.2a2.4 2.4 0 0 1 2.5-1.7c1.3 0 2.3.8 2.3 1.9 0 2.5-4.8 1.5-4.8 4 0 1.1 1 1.9 2.5 1.9a2.5 2.5 0 0 0 2.5-1.6"/></svg>',
    fee:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-8.6-8.6A2 2 0 0 1 3 12V4h8a2 2 0 0 1 1.4.6l8.2 8.2a2 2 0 0 1 0 2.6Z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>',
    svc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3Z"/><path d="M18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z"/></svg>',
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

  function buildCard(c) {
    var media = c.photo
      ? '<img src="photos/' + esc(c.photo) + '" alt="' + esc(c.name) + '" loading="lazy">'
      : '<div class="ph ph--loc" aria-hidden="true">' + placeholderPin + '</div>';

    var tags = '';
    String(c.care || '').split(',').forEach(function (x) {
      x = x.trim(); if (x) tags += '<span class="care">' + esc(x) + '</span>';
    });
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
    if (c.fees)      rows += row(I.fee,   esc(c.fees));
    if (c.services)  rows += row(I.svc,   esc(c.services));
    if (c.phone)     rows += row(I.tel,   '<a href="tel:' + esc(c.phone.replace(/[^0-9+]/g, '')) + '">' + esc(c.phone) + '</a>');
    if (c.website)   rows += row(I.web,   '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">Visit website</a>');

    var soc = '';
    if (c.instagram) soc += '<a class="soc" href="https://www.instagram.com/' + esc(c.instagram) + '/" target="_blank" rel="noopener" aria-label="Instagram">' + SOC.ig + '</a>';
    if (c.facebook)  soc += '<a class="soc" href="' + esc(c.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + SOC.fb + '</a>';
    if (c.youtube)   soc += '<a class="soc" href="https://www.youtube.com/@' + esc(c.youtube) + '" target="_blank" rel="noopener" aria-label="YouTube">' + SOC.yt + '</a>';
    var social = soc ? '<div class="loc-social">' + soc + '</div>' : '';

    var reg = c.register ? '<p class="register"><span>Register</span>' + esc(c.register) + '</p>' : '';
    var phil = c.philosophy ? '<p class="phil">' + esc(c.philosophy) + '</p>' : '';

    return '<article class="loc-card">' +
             '<div class="loc-photo">' + media + '</div>' +
             '<div class="loc-body">' +
               (tags ? '<div class="loc-tags">' + tags + '</div>' : '') +
               '<h3>' + esc(c.name) + '</h3>' + phil +
               '<dl>' + rows + '</dl>' + social + reg +
             '</div>' +
           '</article>';
  }

  var status = document.getElementById('loc-status');
  var sortMount = document.getElementById('loc-sort');

  if (!CENTRES.length) {
    groupsMount.innerHTML = '<p style="text-align:center;color:var(--ink-soft);padding:2.5rem 0;">Participating locations are coming soon — check back closer to the event.</p>';
    if (status) status.textContent = 'Licensed Richmond programs are confirming their spots now.';
    return;
  }

  // Pre-build cards, sorted alphabetically by name
  var items = CENTRES.map(function (c) { return { c: c, html: buildCard(c) }; })
    .sort(function (a, b) { return a.c.name.toLowerCase().localeCompare(b.c.name.toLowerCase()); });

  function render(dimKey) {
    var dim = DIMS[dimKey];
    var out = '';
    dim.cats.forEach(function (cat) {
      var matches = items.filter(function (it) { return dim.tags(it.c).indexOf(cat.key) !== -1; });
      if (!matches.length) return;
      out += '<section class="loc-group">' +
               '<h3 class="loc-group-head">' + esc(cat.label) + ' <span>' + matches.length + '</span></h3>' +
               '<div class="loc-grid">' + matches.map(function (it) { return it.html; }).join('') + '</div>' +
             '</section>';
    });
    groupsMount.innerHTML = out;
    if (status) {
      status.textContent = CENTRES.length + ' Richmond programs are taking part, grouped by ' +
        dim.label.toLowerCase() + '. A program may appear under more than one heading.';
    }
  }

  // Group-by control
  if (sortMount) {
    var order = ['care', 'phil', 'day'];
    sortMount.innerHTML = '<span class="loc-filter-label">Group by</span>' +
      order.map(function (k, i) {
        return '<button class="loc-filter-btn' + (i === 0 ? ' is-active' : '') + '" data-dim="' + k + '"' +
               ' aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + esc(DIMS[k].label) + '</button>';
      }).join('');
    sortMount.addEventListener('click', function (e) {
      var b = e.target.closest('.loc-filter-btn'); if (!b) return;
      Array.prototype.forEach.call(sortMount.querySelectorAll('.loc-filter-btn'), function (x) {
        var on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      render(b.getAttribute('data-dim'));
    });
  }

  render('care');
})();
