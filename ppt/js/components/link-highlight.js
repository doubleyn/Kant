/* ============================================================
   Link highlight — 같은 data-link 값을 가진 요소끼리 함께 강조
   예) 표의 행 data-link="list"  ↔  코드 줄 data-link="list"
   한 요소가 여러 그룹에 속하면 공백으로 구분: data-link="a b"
   강조된 요소에는 .is-linked 클래스가 붙음 (같은 .slide 안에서만)
   ============================================================ */
(function () {
  'use strict';

  function keysOf(el) {
    return (el.getAttribute('data-link') || '').split(/\s+/).filter(Boolean);
  }

  function setLinked(source, on) {
    var scope = source.closest('.slide') || document;
    var keys = keysOf(source);
    scope.querySelectorAll('[data-link]').forEach(function (el) {
      if (el === source) return;
      var match = keysOf(el).some(function (k) { return keys.indexOf(k) !== -1; });
      if (match) el.classList.toggle('is-linked', on);
    });
  }

  function bind(el) {
    el.addEventListener('pointerenter', function () { setLinked(el, true); });
    el.addEventListener('pointerleave', function () { setLinked(el, false); });
    el.addEventListener('focus', function () { setLinked(el, true); });
    el.addEventListener('blur', function () { setLinked(el, false); });
  }

  function init(root) {
    (root || document).querySelectorAll('[data-link]').forEach(bind);
  }

  window.LinkHighlight = { init: init };
  document.addEventListener('DOMContentLoaded', function () { init(document); });
})();
