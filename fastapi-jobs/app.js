(() => {
  'use strict';
  const storageKey = 'fastapi-career-notes:saved:v1';
  let saved = new Set();
  try { const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(parsed)) saved = new Set(parsed.filter(x => typeof x === 'string')); } catch {}
  let toastTimer;
  const toast = message => {
    const el = document.querySelector('.toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  };
  const syncSaved = () => {
    document.querySelectorAll('[data-save]').forEach(button => {
      const isSaved = saved.has(button.dataset.save);
      button.setAttribute('aria-pressed', String(isSaved));
      button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/관심 공고 (저장|해제)$/, `관심 공고 ${isSaved ? '해제' : '저장'}`));
      button.title = isSaved ? '관심 공고 해제' : '관심 공고 저장';
    });
    document.querySelectorAll('.saved-count').forEach(el => el.textContent = saved.size);
  };
  document.querySelectorAll('[data-save]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.save;
    saved.has(id) ? saved.delete(id) : saved.add(id);
    let persisted = true;
    try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch { persisted = false; }
    syncSaved();
    toast(persisted ? (saved.has(id) ? '관심 공고에 저장했습니다.' : '관심 공고에서 해제했습니다.') : '현재 페이지에만 저장됩니다. 브라우저 저장소를 확인하세요.');
    if (document.body.dataset.page === 'index') render();
  }));
  syncSaved();
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    try { const parsed = JSON.parse(event.newValue || '[]'); saved = new Set(Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : []); syncSaved(); if (document.body.dataset.page === 'index') render(); } catch {}
  });
  const menu = document.querySelector('.mobile-menu');
  const sidebar = document.querySelector('.sidebar');
  const closeMenu = () => { sidebar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => { const open = sidebar.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  sidebar.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!sidebar.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
  if (document.body.dataset.page !== 'index') return;
  const params = new URLSearchParams(location.search);
  let onlySaved = params.get('saved') === '1';
  const search = document.querySelector('#search'), career = document.querySelector('#career'), region = document.querySelector('#region'), mention = document.querySelector('#mention'), sort = document.querySelector('#sort');
  search.value = params.get('q') || '';
  for (const [key, field] of [['career', career], ['region', region], ['mention', mention], ['sort', sort]]) {
    if ([...field.options].some(o => o.value === params.get(key))) field.value = params.get(key);
  }
  const rows = [...document.querySelectorAll('.job-row')];
  const originalOrder = new Map(rows.map((row, i) => [row.dataset.id, i]));
  const deadlineValue = row => {
    const match = row.dataset.deadline.match(/(\d{1,2})\/(\d{1,2})/);
    return match ? Number(match[1]) * 100 + Number(match[2]) : Infinity;
  };
  function render() {
    const query = search.value.trim().toLocaleLowerCase('ko');
    let total = 0;
    document.querySelectorAll('.chapter').forEach(chapter => {
      let shown = 0;
      const chapterRows = [...chapter.querySelectorAll('.job-row')];
      chapterRows.forEach(row => {
        const visible = (!query || query.split(/\s+/).every(word => row.dataset.search.includes(word))) && (career.value === 'all' || chapter.id === career.value) && (region.value === 'all' || row.dataset.region === region.value) && (mention.value === 'all' || row.dataset.mention.includes(mention.value)) && (!onlySaved || saved.has(row.dataset.id));
        row.hidden = !visible;
        if (visible) shown++;
      });
      chapter.hidden = shown === 0;
      chapter.querySelector('.chapter-count').textContent = `${shown}개 공고`;
      chapterRows.sort((a, b) => {
        if (sort.value === 'company') return a.querySelector('.company').textContent.localeCompare(b.querySelector('.company').textContent, 'ko') || originalOrder.get(a.dataset.id) - originalOrder.get(b.dataset.id);
        if (sort.value === 'deadline') { const diff = deadlineValue(a) - deadlineValue(b); if (!Number.isNaN(diff) && diff !== 0) return diff; }
        return originalOrder.get(a.dataset.id) - originalOrder.get(b.dataset.id);
      });
      chapter.querySelector('.job-list').append(...chapterRows);
      total += shown;
    });
    document.querySelector('#visible-count').textContent = total;
    document.querySelector('.result-count').textContent = total;
    document.querySelector('.empty-state').hidden = total !== 0;
    document.querySelector('#directory-title').firstChild.textContent = onlySaved ? '관심 공고 둘러보기 ' : '채용공고 둘러보기 ';
    document.querySelector('#filter-summary').textContent = onlySaved ? '· 이 브라우저에 저장한 공고' : '· 최소 경력 기준으로 분류';
    document.querySelector('.result-bar').setAttribute('aria-live', 'polite');
    const state = new URLSearchParams();
    if (search.value) state.set('q', search.value);
    if (onlySaved) state.set('saved', '1');
    for (const [key, field] of [['career', career], ['region', region], ['mention', mention], ['sort', sort]]) if (!['all', 'default'].includes(field.value)) state.set(key, field.value);
    try { history.replaceState(null, '', `${location.pathname}${state.size ? '?' + state : ''}${location.hash}`); } catch {}
    document.querySelectorAll('.nav-item').forEach(a => a.classList.remove('active'));
    const active = onlySaved ? document.querySelector('.saved-nav') : career.value !== 'all' ? document.querySelector(`[data-chapter="${career.value}"]`) : document.querySelector('nav .nav-item');
    active?.classList.add('active');
  }
  search.addEventListener('input', render);
  [career, region, mention, sort].forEach(field => field.addEventListener('change', render));
  document.querySelectorAll('.reset-filters').forEach(button => button.addEventListener('click', () => { search.value = ''; career.value = region.value = mention.value = 'all'; sort.value = 'default'; onlySaved = false; render(); }));
  document.querySelectorAll('[data-chapter]').forEach(link => link.addEventListener('click', () => { career.value = 'all'; onlySaved = false; render(); }));
  document.querySelector('.saved-nav').addEventListener('click', event => { event.preventDefault(); onlySaved = !onlySaved; career.value = 'all'; render(); document.querySelector('.directory').scrollIntoView({ behavior: 'auto' }); });
  document.querySelector('nav .nav-item').addEventListener('click', event => { event.preventDefault(); search.value = ''; career.value = region.value = mention.value = 'all'; sort.value = 'default'; onlySaved = false; render(); document.querySelector('.directory').scrollIntoView({ behavior: 'auto' }); });
  document.addEventListener('keydown', event => { if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.target.matches('input,textarea,select,[contenteditable]')) { event.preventDefault(); search.focus(); } });
  render();
})();
