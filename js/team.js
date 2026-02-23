/*
© 2026–Present Jeffery Martin.
Dual-licensed: Commercial license required for business use.
Apache 2.0 applies only if explicitly included.
No implied rights granted.
*/

/* ============================================================
   CyberClean™ — Team JS
   Fetches data/team.json, renders bio cards dynamically.
   To update team: edit team.json only — no code changes needed.
   ============================================================ */

(function () {
  'use strict';

  const GRID_ID   = 'team-grid';
  const DATA_PATH = 'data/team.json';

  var _activeCard = null; // card that triggered open (for focus return)
  var _escHandler = null; // keydown listener reference for cleanup

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

  /* ── Initials avatar element ────────────────────────────── */
  function buildInitialsAvatar(name) {
    var hue    = nameToHue(name);
    var avatar = document.createElement('div');
    avatar.className   = 'team-initials-avatar';
    // White text — lightness 28%/20% ensures ≥7:1 contrast on all hues (WCAG AAA)
    avatar.textContent = getInitials(name) || '?';
    avatar.setAttribute('aria-label', name + ' avatar');
    avatar.style.background =
      'linear-gradient(135deg, hsl(' + hue + ',65%,28%), hsl(' + ((hue + 60) % 360) + ',65%,20%))';
    return avatar;
  }

  /* ── Build avatar: img with initials fallback ───────────── */
  function buildAvatar(member) {
    if (member.headshot) {
      var img = document.createElement('img');
      img.className = 'team-avatar';
      img.alt       = member.name;
      img.src       = member.headshot;
      img.addEventListener('error', function () {
        img.parentNode.replaceChild(buildInitialsAvatar(member.name), img);
      });
      return img;
    }
    return buildInitialsAvatar(member.name);
  }

  /* ── Build LinkedIn link element ────────────────────────── */
  function buildLinkedIn(member) {
    if (!member.linkedin) return null;
    var link = document.createElement('a');
    link.className  = 'team-linkedin';
    link.href       = member.linkedin;
    link.target     = '_blank';
    link.rel        = 'noopener noreferrer';
    link.setAttribute('aria-label', member.name + ' on LinkedIn');
    link.innerHTML  = linkedinIconSVG() + '<span>LinkedIn</span>';
    return link;
  }

  /* ── LinkedIn SVG icon ──────────────────────────────────── */
  function linkedinIconSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>';
  }

  /* ── Build a compact front card ─────────────────────────── */
  function buildCard(member) {
    var card = document.createElement('article');
    card.className = 'team-card card';
    card.setAttribute('data-reveal', '');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', member.name + ', click to read bio');

    /* Avatar */
    var avatarWrap = document.createElement('div');
    avatarWrap.className = 'team-avatar-wrap';
    avatarWrap.appendChild(buildAvatar(member));
    card.appendChild(avatarWrap);

    /* Name */
    var nameEl = document.createElement('h3');
    nameEl.className = 'team-name gradient-text';
    nameEl.textContent = member.name;
    card.appendChild(nameEl);

    /* Title */
    var titleEl = document.createElement('p');
    titleEl.className = 'team-title';
    titleEl.textContent = member.title || '';
    card.appendChild(titleEl);

    /* LinkedIn — stop propagation so card click doesn't also fire */
    var linkedin = buildLinkedIn(member);
    if (linkedin) {
      linkedin.addEventListener('click', function (e) { e.stopPropagation(); });
      card.appendChild(linkedin);
    }

    /* Interactions */
    card.addEventListener('click', function () { openCardModal(member, card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(member, card);
      }
    });

    return card;
  }

  /* ── Open modal with expanded card ─────────────────────── */
  function openCardModal(member, triggerCard) {
    _activeCard = triggerCard;

    /* Backdrop */
    var backdrop = document.createElement('div');
    backdrop.className = 'team-modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', member.name);

    /* Modal card */
    var modalCard = document.createElement('div');
    modalCard.className = 'team-modal-card card';
    modalCard.setAttribute('tabindex', '-1');

    /* Header: avatar left + meta right */
    var header = document.createElement('div');
    header.className = 'team-modal-header';

    header.appendChild(buildAvatar(member));

    var meta = document.createElement('div');
    meta.className = 'team-modal-meta';

    var nameEl = document.createElement('h3');
    nameEl.className = 'team-name gradient-text';
    nameEl.textContent = member.name;
    meta.appendChild(nameEl);

    var titleEl = document.createElement('p');
    titleEl.className = 'team-title';
    titleEl.textContent = member.title || '';
    meta.appendChild(titleEl);

    var linkedin = buildLinkedIn(member);
    if (linkedin) meta.appendChild(linkedin);

    header.appendChild(meta);
    modalCard.appendChild(header);

    /* Bio */
    if (member.bio) {
      var bioEl = document.createElement('p');
      bioEl.className = 'team-modal-bio';
      bioEl.innerText = member.bio;
      modalCard.appendChild(bioEl);
    }

    backdrop.appendChild(modalCard);
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';

    /* Card click stays inside — backdrop click closes */
    //modalCard.addEventListener('click', function (e) { e.stopPropagation(); });
    modalCard.addEventListener('click', function () { closeCardModal(backdrop, modalCard); });
    backdrop.addEventListener('click', function () { closeCardModal(backdrop, modalCard); });

    /* Escape key closes */
    _escHandler = function (e) {
      if (e.key === 'Escape') closeCardModal(backdrop, modalCard);
    };
    document.addEventListener('keydown', _escHandler);

    /* Focus for accessibility */
    modalCard.focus();
  }

  /* ── Close modal with animation ─────────────────────────── */
  function closeCardModal(backdrop, modalCard) {
    backdrop.classList.add('closing');
    modalCard.classList.add('closing');

    setTimeout(function () {
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      document.body.style.overflow = '';
      if (_escHandler) {
        document.removeEventListener('keydown', _escHandler);
        _escHandler = null;
      }
      if (_activeCard) {
        _activeCard.focus();
        _activeCard = null;
      }
    }, 320);
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
        // Stagger reveal delays across 3-column rows
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
