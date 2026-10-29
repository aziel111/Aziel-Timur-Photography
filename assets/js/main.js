// Words → frame picker
(function () {
  var buttons = document.querySelectorAll('.picker button');
  var imgs = document.querySelectorAll('.screen .frame img');
  var cap = document.getElementById('frame-cap');
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

// YouTube loads only after a click (privacy)
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
