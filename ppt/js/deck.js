/* ============================================================
   Deck — 슬라이드 이동, 단계별 등장, 화면 맞춤
   키보드
     → ↓ Space PageDown Enter : 다음 (단계 → 슬라이드)
     ← ↑ PageUp Backspace     : 이전
     Home / End               : 처음 / 끝
     H                        : 호버 내용 모두 펼치기/접기
     F                        : 전체 화면
   URL 해시 #5 = 5번째 슬라이드
   ============================================================ */
(function () {
  'use strict';

  var stage = document.querySelector('.stage');
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.slide'));
  var footerLabel = stage.getAttribute('data-footer') || '';
  var index = 0;
  var step = 0;

  /* ---------- 화면 맞춤 ---------- */
  function fit() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.setProperty('--scale', s);
  }

  /* ---------- 자동 꼬리말 ---------- */
  slides.forEach(function (slide, i) {
    if (i === 0 || slide.hasAttribute('data-no-footer')) return;
    var f = document.createElement('p');
    f.className = 'slide__footer';
    f.textContent = footerLabel + ' · ' + (i + 1);
    slide.appendChild(f);
  });

  function stepsOf(slide) {
    var max = 0;
    slide.querySelectorAll('[data-step]').forEach(function (el) {
      max = Math.max(max, parseInt(el.getAttribute('data-step'), 10) || 0);
    });
    return max;
  }

  /* ---------- 크롬 UI ---------- */
  var progress = document.createElement('div');
  progress.className = 'deck-progress';
  var counter = document.createElement('div');
  counter.className = 'deck-counter';
  var prevBtn = document.createElement('button');
  prevBtn.className = 'deck-nav deck-nav--prev';
  prevBtn.setAttribute('aria-label', '이전 슬라이드');
  prevBtn.textContent = '←';
  var nextBtn = document.createElement('button');
  nextBtn.className = 'deck-nav deck-nav--next';
  nextBtn.setAttribute('aria-label', '다음 슬라이드');
  nextBtn.textContent = '→';
  var hint = document.createElement('div');
  hint.className = 'deck-hint';
  hint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> 이동 · 카드와 코드에 마우스를 올려 보세요 · <kbd>H</kbd> 모두 펼치기';
  [progress, counter, prevBtn, nextBtn, hint].forEach(function (el) { document.body.appendChild(el); });
  setTimeout(function () { hint.classList.add('is-hidden'); }, 5000);

  var chromeTimer;
  document.addEventListener('mousemove', function () {
    document.body.classList.add('show-chrome');
    clearTimeout(chromeTimer);
    chromeTimer = setTimeout(function () { document.body.classList.remove('show-chrome'); }, 1800);
  });

  /* ---------- 렌더 ---------- */
  function render(dir) {
    stage.style.setProperty('--dir', dir || 1);
    slides.forEach(function (slide, i) {
      var active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.querySelectorAll('[data-step]').forEach(function (el) {
        var n = parseInt(el.getAttribute('data-step'), 10) || 0;
        el.classList.toggle('is-shown', active && n <= step);
      });
    });
    progress.style.width = ((index + 1) / slides.length * 100) + '%';
    counter.textContent = (index + 1) + ' / ' + slides.length;
    if (history.replaceState) history.replaceState(null, '', '#' + (index + 1));
  }

  function go(i, atStep, dir) {
    if (i < 0 || i >= slides.length) return;
    var d = dir || (i >= index ? 1 : -1);
    index = i;
    step = atStep === 'end' ? stepsOf(slides[i]) : (atStep || 0);
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    render(d);
  }

  function next() {
    if (step < stepsOf(slides[index])) { step++; render(1); }
    else go(index + 1, 0, 1);
  }
  function prev() {
    if (step > 0) { step--; render(-1); }
    else go(index - 1, 'end', -1);
  }

  /* ---------- 입력 ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(slides.length - 1, 'end'); break;
      case 'h': case 'H': stage.classList.toggle('reveal-all'); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        else document.exitFullscreen && document.exitFullscreen();
        break;
    }
  });
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  var touchX = null;
  document.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  });

  window.addEventListener('resize', fit);

  /* ---------- 시작 ---------- */
  fit();
  var fromHash = parseInt((location.hash || '').slice(1), 10);
  index = fromHash >= 1 && fromHash <= slides.length ? fromHash - 1 : 0;
  render(1);

  window.Deck = { next: next, prev: prev, go: go };
})();
