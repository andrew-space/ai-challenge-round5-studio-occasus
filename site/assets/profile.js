(function () {
  'use strict';

  var BADGE_DEFS = [
    { id: 'first-draft',   icon: '\uD83D\uDCDD', name: 'First Draft',     desc: 'Used any tool once' },
    { id: 'daily-grinder', icon: '\uD83D\uDCAA', name: 'Daily Grinder',   desc: '7-day streak' },
    { id: 'tool-explorer', icon: '\uD83C\uDFC6', name: 'Tool Explorer',   desc: 'Used every tool' },
    { id: 'headline-hero', icon: '\uD83C\uDF1F', name: 'Headline Hero',   desc: 'Scored 3 headlines' },
    { id: 'clarity-master',icon: '\u2600\uFE0F', name: 'Clarity Master',  desc: '20 rewrites done' },
    { id: 'word-wizard',   icon: '\uD83D\uDCDA', name: 'Word Wizard',     desc: '10 000 words analyzed' },
    { id: 'power-user',    icon: '\u26A1',        name: 'Power User',      desc: '3+ tools, 5 days' },
    { id: 'perfectionist', icon: '\uD83D\uDC8E',  name: 'Perfectionist',  desc: '3 rewrites in a session' }
  ];

  var XP_LEVELS = [
    { min: 0,    label: 'Intern' },
    { min: 100,  label: 'Copywriter' },
    { min: 300,  label: 'Strategist' },
    { min: 600,  label: 'Director' },
    { min: 1000, label: 'CMO' }
  ];

  function getLevel(xp) {
    for (var i = XP_LEVELS.length - 1; i >= 0; i--) {
      if (xp >= XP_LEVELS[i].min) return XP_LEVELS[i].label;
    }
    return 'Intern';
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase();
  }

  function showToast(msg) {
    var tc = document.getElementById('toast-container');
    if (!tc) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    tc.appendChild(t);
    setTimeout(function () { t.remove(); }, 3000);
  }

  function renderBadges(earnedIds) {
    var grid = document.getElementById('pf-badges-grid');
    if (!grid) return;
    grid.innerHTML = '';
    BADGE_DEFS.forEach(function (bd) {
      var earned = earnedIds.indexOf(bd.id) !== -1;
      var card = document.createElement('div');
      card.className = 'badge-card' + (earned ? '' : ' badge-card--locked');
      card.innerHTML =
        '<span class="badge-card__icon">' + bd.icon + '</span>' +
        '<span class="badge-card__name">' + bd.name + '</span>';
      card.title = earned ? bd.desc : 'Locked: ' + bd.desc;
      grid.appendChild(card);
    });
    var countEl = document.getElementById('pf-badges-count');
    if (countEl) countEl.textContent = earnedIds.length;
  }

  function renderSavedVersions() {
    var raw = localStorage.getItem('occ_cv');
    var list = document.getElementById('pf-saved-list');
    if (!list) return;
    if (!raw) return;
    var versions;
    try { versions = JSON.parse(raw); } catch (_) { return; }
    if (!Array.isArray(versions) || versions.length === 0) return;
    list.innerHTML = '';
    versions.slice().reverse().forEach(function (v) {
      var item = document.createElement('div');
      item.className = 'saved-item';
      var date = v.ts ? new Date(v.ts).toLocaleString() : 'Unknown date';
      item.innerHTML =
        '<span class="saved-item__date">' + date + '</span>' +
        '<p class="saved-item__text">' + (v.text || '').replace(/</g, '&lt;') + '</p>' +
        '<button class="btn btn--sm btn--ghost saved-item__copy" type="button">Copy</button>';
      item.querySelector('.saved-item__copy').addEventListener('click', function () {
        navigator.clipboard.writeText(v.text || '').then(function () {
          showToast('Copied to clipboard.');
        });
      });
      list.appendChild(item);
    });
  }

  function renderProfile(user, isPro) {
    var signedIn  = document.getElementById('profile-signed-in');
    var signedOut = document.getElementById('profile-signed-out');
    if (signedIn)  signedIn.classList.remove('hidden');
    if (signedOut) signedOut.classList.add('hidden');

    // Avatar
    var avatarWrap = document.getElementById('profile-avatar-wrap');
    var initEl = document.getElementById('profile-initials');
    if (user.photoURL && avatarWrap) {
      avatarWrap.innerHTML = '<img class="profile-avatar" src="' + user.photoURL + '" alt="" width="72" height="72">';
    } else if (initEl) {
      initEl.textContent = getInitials(user.displayName || user.email);
    }

    // Name / email
    var nameEl = document.getElementById('profile-name');
    var emailEl = document.getElementById('profile-email');
    if (nameEl)  nameEl.textContent  = user.displayName || 'Anonymous';
    if (emailEl) emailEl.textContent = user.email || '';

    // Plan badge
    var planBadge = document.getElementById('profile-plan-badge');
    if (planBadge) {
      planBadge.textContent = isPro ? 'Pro plan' : 'Free plan';
      planBadge.className   = 'plan-badge-inline plan-badge-inline--' + (isPro ? 'pro' : 'free');
    }

    // Stats from localStorage
    var xp     = parseInt(localStorage.getItem('occ_xp'), 10)     || 0;
    var streak = parseInt(localStorage.getItem('occ_streak'), 10)  || 0;
    var badges = JSON.parse(localStorage.getItem('occ_badges') || '[]');

    var xpEl     = document.getElementById('pf-xp');
    var levelEl  = document.getElementById('pf-level');
    var streakEl = document.getElementById('pf-streak');
    if (xpEl)     xpEl.textContent     = xp;
    if (levelEl)  levelEl.textContent  = getLevel(xp);
    if (streakEl) streakEl.textContent = streak + ' \uD83D\uDD25';

    renderBadges(badges);
    renderSavedVersions();
  }

  function showSignedOut() {
    var signedIn  = document.getElementById('profile-signed-in');
    var signedOut = document.getElementById('profile-signed-out');
    if (signedIn)  signedIn.classList.add('hidden');
    if (signedOut) signedOut.classList.remove('hidden');
  }

  function init() {
    // Sign-in button on profile page
    var btnSignin = document.getElementById('btn-signin-profile');
    if (btnSignin) {
      btnSignin.addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function (err) {
          showToast('Sign-in failed: ' + err.message);
        });
      });
    }

    // Sign-out button
    var btnSignout = document.getElementById('btn-signout');
    if (btnSignout) {
      btnSignout.addEventListener('click', function () {
        firebase.auth().signOut().then(function () {
          showToast('Signed out.');
          setTimeout(function () { window.location.href = 'index.html'; }, 800);
        });
      });
    }

    // Auth listener
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        showSignedOut();
        return;
      }

      var db = firebase.firestore();
      db.collection('users').doc(user.uid).onSnapshot(function (doc) {
        var isPro = doc.exists && doc.data().isPro === true;
        renderProfile(user, isPro);
      }, function () {
        // Firestore error (e.g. offline) — still render with free plan
        renderProfile(user, false);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
