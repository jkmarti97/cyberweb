/* ============================================================
   CyberClean™ — Team JS
   Fetches data/team.json, renders bio cards dynamically.
   To update team: edit team.json only — no code changes needed.
   ============================================================ */

(function () {
  'use strict';

  const GRID_ID       = 'team-grid';
  const DATA_PATH     = 'data/team.json';
  const BIO_MAX_LINES = 3;

  /* ── Utility: generate initials from a full name ────────── */
  function getInitials(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .map(function (w) { return w[0]; })
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  /* ── Utility: gradient hue from name (deterministic) ───── */
  function nameToHue(name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
  }

  /* ── Build a single team card ───────────────────────────── */
  function buildCard(member) {
    var card = document.createElement('article');
    card.className = 'team-card card';
    card.setAttribute('data-reveal', '');

    /* ── Headshot / Initials avatar ── */
    var avatarWrap = document.createElement('div');
    avatarWrap.className = 'team-avatar-wrap';

    if (member.headshot) {
      var img = document.createElement('img');
      img.className = 'team-avatar';
      img.alt       = member.name;
      img.src       = member.headshot;

      // Fallback to initials if image fails
      img.addEventListener('error', function () {
        avatarWrap.replaceChild(buildInitialsAvatar(member.name), img);
      });

      avatarWrap.appendChild(img);
    } else {
      avatarWrap.appendChild(buildInitialsAvatar(member.name));
    }

    card.appendChild(avatarWrap);

    /* ── Name & Title ── */
    var nameEl = document.createElement('h3');
    nameEl.className = 'team-name gradient-text';
    nameEl.textContent = member.name;
    avatarWrap.appendChild(nameEl);

    var titleEl = document.createElement('p');
    titleEl.className = 'team-title';
    titleEl.textContent = member.title || '';
    avatarWrap.appendChild(titleEl);

    /* ── Bio with truncation ── */
    var bioText = (member.bio || '').trim();
    if (bioText) {
      var bioWrap = document.createElement('div');
      bioWrap.className = 'team-bio-wrap';

      var bioEl = document.createElement('p');
      bioEl.className = 'team-bio';
      bioEl.id = 'bio-' + member.name.replace(/\s+/g, '-').toLowerCase();
      bioEl.innerText = bioText;
      bioWrap.appendChild(bioEl);

      // Add "Read more" toggle after paint so we can measure line count
      card.appendChild(bioWrap);

      requestAnimationFrame(function () {
        var lineHeight  = parseFloat(getComputedStyle(bioEl).lineHeight) || 24;
        var maxHeight   = Math.ceil(lineHeight) * BIO_MAX_LINES;
        var fullHeight  = bioEl.scrollHeight;

        // Only add toggle if bio is genuinely longer than 3 lines (8px buffer)
        if (fullHeight > maxHeight + 8) {
          bioEl.style.maxHeight  = maxHeight + 'px';
          bioEl.style.overflow   = 'hidden';
          bioEl.style.transition = 'max-height 0.35s ease';

          var toggle = document.createElement('button');
          toggle.className          = 'bio-toggle';
          toggle.textContent        = 'Read more';
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-controls', bioEl.id);
          toggle.setAttribute('aria-label', 'Read more about ' + member.name);
          toggle.dataset.expanded   = 'false';

          toggle.addEventListener('click', function () {
            var expanded = toggle.dataset.expanded === 'true';
            if (expanded) {
              bioEl.style.maxHeight           = maxHeight + 'px';
              toggle.textContent              = 'Read more';
              toggle.setAttribute('aria-expanded', 'false');
              toggle.setAttribute('aria-label', 'Read more about ' + member.name);
              toggle.dataset.expanded         = 'false';
            } else {
              bioEl.style.maxHeight           = fullHeight + 'px';
              toggle.textContent              = 'Read less';
              toggle.setAttribute('aria-expanded', 'true');
              toggle.setAttribute('aria-label', 'Read less about ' + member.name);
              toggle.dataset.expanded         = 'true';
            }
          });

          bioWrap.appendChild(toggle);
        }
      });
    }

    /* ── LinkedIn link ── */
    if (member.linkedin) {
      var linkedinLink = document.createElement('a');
      linkedinLink.className  = 'team-linkedin';
      linkedinLink.href       = member.linkedin;
      linkedinLink.target     = '_blank';
      linkedinLink.rel        = 'noopener noreferrer';
      linkedinLink.setAttribute('aria-label', member.name + ' on LinkedIn');
      linkedinLink.innerHTML  = linkedinIconSVG() + '<span>LinkedIn</span>';
      card.appendChild(linkedinLink);
    }

    return card;
  }

  /* ── Initials avatar element ────────────────────────────── */
  function buildInitialsAvatar(name) {
    var hue    = nameToHue(name);
    var avatar = document.createElement('div');
    avatar.className   = 'team-initials-avatar';
    // Use white text — lightness 28%/20% ensures ≥7:1 contrast on all hues (WCAG AAA)
    avatar.textContent = getInitials(name) || '?';
    avatar.setAttribute('aria-label', name + ' avatar');
    avatar.style.background =
      'linear-gradient(135deg, hsl(' + hue + ',65%,28%), hsl(' + ((hue + 60) % 360) + ',65%,20%))';
    return avatar;
  }

  /* ── LinkedIn SVG icon ──────────────────────────────────── */
  function linkedinIconSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>';
  }

  /* ── Placeholder shown if JSON array is empty ───────────── */
  function renderPlaceholder(grid) {
    var msg = document.createElement('p');
    msg.className   = 'team-placeholder';
    msg.textContent = 'Team bios coming soon.';
    grid.appendChild(msg);
  }

  /* ── Main: fetch + render ───────────────────────────────── */
  var grid = document.getElementById(GRID_ID);
  if (!grid) return;

  // Loading state
  var spinner = document.createElement('div');
  spinner.className = 'spinner';
  grid.appendChild(spinner);

  fetch(DATA_PATH)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (members) {
      grid.removeChild(spinner);

      if (!Array.isArray(members) || members.length === 0) {
        renderPlaceholder(grid);
        return;
      }

      members.forEach(function (member, i) {
        var card = buildCard(member);
        // Stagger reveal delays
        if (i < 6) {
          card.setAttribute('data-delay', String((i % 3) * 100 + 100));
        }
        grid.appendChild(card);
      });

      // Trigger reveal observer for newly added cards
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        grid.querySelectorAll('[data-reveal]').forEach(function (el) {
          observer.observe(el);
        });
      } else {
        grid.querySelectorAll('[data-reveal]').forEach(function (el) {
          el.classList.add('visible');
        });
      }
    })
    .catch(function (err) {
      console.error('Failed to load team data:', err);
      grid.removeChild(spinner);
      var errMsg = document.createElement('p');
      errMsg.className   = 'team-placeholder';
      errMsg.textContent = 'Unable to load team information. Please try again later.';
      grid.appendChild(errMsg);
    });
})();
