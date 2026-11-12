// Aziel Timur — aziel.me

// Kopfzeile: dunkler Hintergrund nach dem ersten Scrollen
(function () {
  var kopf = document.getElementById('kopf');
  if (!kopf) return;
  var update = function () { kopf.classList.toggle('ist-gescrollt', window.scrollY > 24); };
  update();
  window.addEventListener('scroll', update, { passive: true });

  // Menü auf dem Handy
  var knopf = kopf.querySelector('.menue-knopf');
  var nav = document.getElementById('menue');
  if (!knopf || !nav) return;
  var setze = function (offen) {
    knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    kopf.classList.toggle('menue-offen', offen);
    document.body.classList.toggle('menue-offen', offen);
  };
  knopf.addEventListener('click', function () { setze(knopf.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setze(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setze(false); });
})();

// Elemente tauchen beim Scrollen auf
(function () {
  var els = document.querySelectorAll('.auftauchen');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('ist-sichtbar'); }); return; }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('ist-sichtbar'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();

// YouTube erst nach Klick laden (Datenschutz) — Startseite: Player im Dialog
(function () {
  var dialog = document.getElementById('player');
  var knoepfe = document.querySelectorAll('[data-video]');
  if (!dialog || !knoepfe.length) return;
  var buehne = dialog.querySelector('.player-buehne');
  var titel = dialog.querySelector('.player-titel');
  var zuletzt = null;

  var schliessen = function () {
    buehne.replaceChildren();
    if (dialog.open) dialog.close();
    if (zuletzt) zuletzt.focus();
  };

  knoepfe.forEach(function (k) {
    k.addEventListener('click', function () {
      var id = k.getAttribute('data-video');
      var name = k.getAttribute('data-titel') || '';
      // Ohne <dialog>-Unterstützung direkt zu YouTube
      if (typeof dialog.showModal !== 'function') { window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener'); return; }
      zuletzt = k;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      f.title = name;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      buehne.replaceChildren(f);
      titel.textContent = name;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-zu]').addEventListener('click', schliessen);
  dialog.addEventListener('click', function (e) { if (e.target === dialog) schliessen(); });
  dialog.addEventListener('close', function () { buehne.replaceChildren(); });
})();

// Kursseite: Worte → Kadr
(function () {
  var buttons = document.querySelectorAll('.picker button');
  var imgs = document.querySelectorAll('.screen .frame img');
  var cap = document.getElementById('frame-cap');
  if (!buttons.length) return;
  var caps = [
    'Лицо справа, три фигуры слева вдалеке — правило третей и малая глубина резкости.',
    'Резкость переходит на ближний профиль, женщины растворяются за ним.',
    'Пять профилей уходят в глубину: ближний и дальние — в мягком фокусе.',
    'Общий план, руки раскрыты, все взгляды — в объектив.'
  ];
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.i;
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === i); });
      if (cap) cap.textContent = caps[i];
    });
  });
})();

// Kursseite: Video ersetzt das Vorschaubild erst nach Klick
(function () {
  var box = document.getElementById('video');
  if (!box) return;
  var btn = box.querySelector('button');
  btn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/KwhI8lrwSGo?autoplay=1&rel=0';
    f.title = 'ЫРАЙЫМЫҢ ТҮБӨЛҮК — Aziel';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    box.replaceChildren(f);
  });
})();
