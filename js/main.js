(() => {
  let shops = [];
  let guides = [];
  let activeStatus = 'all';
  let activeCat = 'all';
  let searchQuery = '';
  let activeTab = 'shops';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  async function init() {
    [shops, guides] = await Promise.all([
      fetch('data/shops.json').then(r => r.json()),
      fetch('data/guides.json').then(r => r.json())
    ]);
    buildCategoryChips();
    bindEvents();
    render();
  }

  function getAllCategories() {
    const cats = new Set();
    shops.forEach(s => s.categories.forEach(c => cats.add(c)));
    return [...cats].sort();
  }

  function buildCategoryChips() {
    const container = $('.cat-filters');
    const allCats = getAllCategories();
    container.innerHTML = '<button class="cat-chip active" data-cat="all">All Categories</button>' +
      allCats.map(c => `<button class="cat-chip" data-cat="${c}">${c}</button>`).join('');
  }

  function bindEvents() {
    // Search
    $('#search').addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });

    // Status chips
    $('.filters').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      activeStatus = chip.dataset.status;
      $$('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });

    // Category chips
    $('.cat-filters').addEventListener('click', e => {
      const chip = e.target.closest('.cat-chip');
      if (!chip) return;
      activeCat = chip.dataset.cat;
      $$('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });

    // Tabs
    $$('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        $$('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        $$('.section').forEach(s => s.classList.remove('active'));
        $(`.section[data-section="${activeTab}"]`).classList.add('active');
      });
    });
  }

  function filterShops() {
    return shops.filter(s => {
      if (activeStatus !== 'all' && s.status !== activeStatus) return false;
      if (activeCat !== 'all' && !s.categories.includes(activeCat)) return false;
      if (searchQuery) {
        const haystack = (s.name + ' ' + s.categories.join(' ') + ' ' + s.status + ' ' + s.notes).toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  function badgeClass(status) {
    return 'badge badge-' + status;
  }

  function renderCard(s) {
    const urlHtml = s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener" class="card-url">${s.url.replace('https://', '').replace('http://', '')}</a>`
      : '<span class="card-url" style="color:#666">Domain changes frequently</span>';
    const sourcesHtml = s.sources.map(src => `<span>${src}</span>`).join('');
    return `<div class="card">
      <div class="card-header">
        <div><div class="card-name">${s.name}</div>${urlHtml}</div>
        <span class="${badgeClass(s.status)}">${s.status}</span>
      </div>
      <div class="card-cats">${s.categories.map(c => `<span class="card-cat">${c}</span>`).join('')}</div>
      <div class="card-notes">${s.notes}</div>
      <div class="card-sources">${sourcesHtml}</div>
      <div class="card-date">Verified: ${s.last_verified}</div>
    </div>`;
  }

  function render() {
    const filtered = filterShops();
    const container = $('#shop-cards');
    const statsEl = $('.stats');

    const trusted = filtered.filter(s => s.status === 'trusted').length;
    const warning = filtered.filter(s => s.status === 'warning').length;
    const blacklisted = filtered.filter(s => s.status === 'blacklisted').length;
    statsEl.textContent = `Showing ${filtered.length} shops — ${trusted} trusted, ${warning} warning, ${blacklisted} blacklisted`;

    if (filtered.length === 0) {
      container.innerHTML = '<div class="no-results">No shops match your search. Try different keywords or filters.</div>';
      return;
    }

    // Sort: blacklisted first, then warning, then trusted
    const order = { blacklisted: 0, warning: 1, trusted: 2 };
    filtered.sort((a, b) => order[a.status] - order[b.status]);
    container.innerHTML = filtered.map(renderCard).join('');
  }

  // Render guides
  function renderGuides() {
    const container = $('#guide-cards');
    container.innerHTML = guides.map(g => `<div class="guide-card">
      <div class="guide-title">${g.icon} ${g.title}</div>
      ${g.tips.map(t => `<div class="guide-tip">${t}</div>`).join('')}
    </div>`).join('');
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await init();
    renderGuides();
  });
})();
