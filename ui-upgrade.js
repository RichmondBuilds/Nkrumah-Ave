/**
 * NKRUMAH AVE — UI UPGRADE PATCH
 * - Full-width search bar (own row)
 * - Swipeable category filter strip (own row)
 * - Sticky floating cart pill (Temu-style)
 * - Bottom nav bar (Home, Stores, Cart, More)
 */
(function() {
'use strict';

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
/* Hide original filter bar */
#mainFilterBar { display: none !important; }

/* Hide original cart FAB and WA bubble (we reposition them) */
.cart-fab { display: none !important; }

/* ── SEARCH ROW ── */
#_searchRow {
  background: #0a0a0a;
  padding: 10px 12px 0;
  position: sticky;
  top: 52px;
  z-index: 97;
}
#_searchWrap {
  display: flex;
  align-items: center;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 0 12px;
  gap: 8px;
  transition: border-color 0.2s;
}
#_searchWrap:focus-within { border-color: #00ff00; }
#_searchIcon { font-size: 0.9em; color: #555; flex-shrink: 0; }
#_searchField {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.85em;
  padding: 11px 0;
  font-family: Arial, sans-serif;
}
#_searchField::placeholder { color: #444; }
#_searchClear {
  background: none;
  border: none;
  color: #444;
  font-size: 1em;
  cursor: pointer;
  padding: 0;
  display: none;
  line-height: 1;
}
#_searchClear.visible { display: block; }

/* ── CATEGORY STRIP ── */
#_catStrip {
  background: #0a0a0a;
  padding: 8px 12px 9px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  position: sticky;
  top: 104px;
  z-index: 96;
  border-bottom: 1px solid #141414;
  scrollbar-width: none;
}
#_catStrip::-webkit-scrollbar { display: none; }

._cat {
  flex-shrink: 0;
  padding: 6px 16px;
  background: #141414;
  color: #666;
  border: 1px solid #222;
  border-radius: 20px;
  font-size: 0.7em;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: Arial, sans-serif;
  white-space: nowrap;
  transition: all 0.18s;
  -webkit-tap-highlight-color: transparent;
}
._cat.on {
  background: #00ff00;
  color: #000;
  border-color: #00ff00;
}
._cat:not(.on):active { background: #1e1e1e; }

/* ── STICKY CART PILL (Temu style) ── */
#_cartPill {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 201;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #00ff00;
  color: #000;
  border-radius: 12px 0 0 12px;
  padding: 10px 10px 8px;
  cursor: pointer;
  box-shadow: -3px 0 16px rgba(0,255,0,0.25);
  min-width: 48px;
  transition: transform 0.2s, opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
}
#_cartPill:active { transform: translateY(-50%) scale(0.95); }
#_cartPill.hidden { opacity: 0; pointer-events: none; }
#_cartPillIcon { font-size: 1.3em; line-height: 1; }
#_cartPillCount {
  background: #000;
  color: #00ff00;
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 0.6em;
  font-weight: 900;
  margin-top: 3px;
  min-width: 18px;
  text-align: center;
}
#_cartPillLabel {
  font-size: 0.48em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
  line-height: 1;
}

/* ── BOTTOM NAV ── */
#_bottomNav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 60px;
  background: #0d0d0d;
  border-top: 1px solid #1e1e1e;
  display: flex;
  align-items: stretch;
  z-index: 300;
  padding-bottom: env(safe-area-inset-bottom);
}
._navTab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  border: none;
  background: none;
  color: #444;
  font-family: Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s;
  position: relative;
}
._navTab.on { color: #00ff00; }
._navTab:active { background: #111; }
._navIcon { font-size: 1.25em; line-height: 1; }
._navLabel { font-size: 0.52em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; }
._navBadge {
  position: absolute;
  top: 6px; right: calc(50% - 18px);
  background: #ff4444;
  color: #fff;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 0.5em;
  font-weight: 900;
  min-width: 14px;
  text-align: center;
  display: none;
}
._navBadge.visible { display: block; }

/* Adjust container bottom padding for nav bar */
.container { padding-bottom: 80px !important; }

/* WA bubble moves up */
.wa-bubble { bottom: 72px !important; }

/* Sticky cart pill hides when cart modal open */
body.cart-open #_cartPill { opacity: 0; pointer-events: none; }
`;
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── BUILD SEARCH ROW ──────────────────────────────────────────────────────────
const searchRow = document.createElement('div');
searchRow.id = '_searchRow';
searchRow.innerHTML = `
  <div id="_searchWrap">
    <span id="_searchIcon">🔍</span>
    <input id="_searchField" type="text" placeholder="Search products, brands...">
    <button id="_searchClear">✕</button>
  </div>
`;

// ── BUILD CATEGORY STRIP ──────────────────────────────────────────────────────
const cats = [
  { label: 'All', val: 'all' },
  { label: 'Tees', val: 'tees' },
  { label: 'Shorts', val: 'shorts' },
  { label: 'Hoodies', val: 'hoodies' },
  { label: 'Shoes', val: 'shoes' },
  { label: 'Bags', val: 'bags' },
  { label: 'Other', val: 'other' },
];
const catStrip = document.createElement('div');
catStrip.id = '_catStrip';
catStrip.innerHTML = cats.map(c =>
  `<button class="_cat${c.val==='all'?' on':''}" data-val="${c.val}">${c.label}</button>`
).join('');

// ── BUILD STICKY CART PILL ────────────────────────────────────────────────────
const cartPill = document.createElement('div');
cartPill.id = '_cartPill';
cartPill.innerHTML = `
  <div id="_cartPillIcon">🛒</div>
  <div id="_cartPillCount">0</div>
  <div id="_cartPillLabel">Cart</div>
`;
cartPill.onclick = () => toggleCart();

// ── BUILD BOTTOM NAV ──────────────────────────────────────────────────────────
const bottomNav = document.createElement('div');
bottomNav.id = '_bottomNav';
bottomNav.innerHTML = `
  <button class="_navTab on" id="_navHome" onclick="_navGo('home',this)">
    <span class="_navIcon">🏠</span>
    <span class="_navLabel">Home</span>
  </button>
  <button class="_navTab" id="_navStores" onclick="_navGo('stores',this)">
    <span class="_navIcon">🏪</span>
    <span class="_navLabel">Stores</span>
  </button>
  <button class="_navTab" id="_navCart" onclick="_navGo('cart',this)">
    <span class="_navIcon">🛒</span>
    <span class="_navLabel">Cart</span>
    <span class="_navBadge" id="_navCartBadge">0</span>
  </button>
  <button class="_navTab" id="_navMore" onclick="_navGo('more',this)">
    <span class="_navIcon">☰</span>
    <span class="_navLabel">More</span>
  </button>
`;

// ── INJECT ────────────────────────────────────────────────────────────────────
// Insert search row + cat strip after header
const header = document.querySelector('header');
if (header) {
  header.after(searchRow);
  searchRow.after(catStrip);
}
document.body.appendChild(cartPill);
document.body.appendChild(bottomNav);

// ── SEARCH LOGIC ──────────────────────────────────────────────────────────────
const searchField = document.getElementById('_searchField');
const searchClear = document.getElementById('_searchClear');

searchField.addEventListener('input', function() {
  const val = this.value.trim();
  searchClear.classList.toggle('visible', val.length > 0);
  // Use existing search logic
  window.searchQuery = val;
  window.currentFilter = 'all';
  // Deactivate all cats
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  document.querySelector('._cat[data-val="all"]').classList.add('on');
  window.renderProducts();
});

searchClear.addEventListener('click', function() {
  searchField.value = '';
  this.classList.remove('visible');
  window.searchQuery = '';
  window.renderProducts();
});

// ── CATEGORY LOGIC ────────────────────────────────────────────────────────────
catStrip.addEventListener('click', function(e) {
  const btn = e.target.closest('._cat');
  if (!btn) return;
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  const val = btn.dataset.val;
  window.currentFilter = val;
  window.searchQuery = '';
  searchField.value = '';
  searchClear.classList.remove('visible');
  window.renderProducts();
  // Smooth scroll cat into view
  btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
});

// ── NAV LOGIC ────────────────────────────────────────────────────────────────
window._navGo = function(tab, el) {
  document.querySelectorAll('._navTab').forEach(t => t.classList.remove('on'));
  if (el) el.classList.add('on');
  if (tab === 'home') {
    // Close any open views
    if (typeof closeStore === 'function') closeStore();
    if (typeof closeStores === 'function') closeStores();
    document.getElementById('cartModal')?.classList.remove('active');
    document.body.classList.remove('cart-open');
  } else if (tab === 'stores') {
    if (typeof openStores === 'function') openStores();
  } else if (tab === 'cart') {
    if (typeof toggleCart === 'function') toggleCart();
    document.body.classList.toggle('cart-open');
  } else if (tab === 'more') {
    if (typeof openDrawer === 'function') openDrawer();
  }
};

// ── CART PILL + BADGE UPDATES ─────────────────────────────────────────────────
const _origUpdateCartUI = window.updateCartUI;
window.updateCartUI = function() {
  if (_origUpdateCartUI) _origUpdateCartUI();
  const cnt = (window.cart||[]).reduce((s,i)=>s+(i.qty||1),0);
  // Pill
  const pillCount = document.getElementById('_cartPillCount');
  if (pillCount) pillCount.textContent = cnt;
  const pill = document.getElementById('_cartPill');
  if (pill) pill.classList.toggle('hidden', cnt === 0);
  // Nav badge
  const badge = document.getElementById('_navCartBadge');
  if (badge) {
    badge.textContent = cnt;
    badge.classList.toggle('visible', cnt > 0);
  }
};

// Sync on cart modal open/close
const cartModal = document.getElementById('cartModal');
if (cartModal) {
  const observer = new MutationObserver(() => {
    document.body.classList.toggle('cart-open', cartModal.classList.contains('active'));
    // Highlight cart tab when open
    document.querySelectorAll('._navTab').forEach(t => t.classList.remove('on'));
    if (cartModal.classList.contains('active')) {
      document.getElementById('_navCart')?.classList.add('on');
    } else {
      document.getElementById('_navHome')?.classList.add('on');
    }
  });
  observer.observe(cartModal, { attributes: true, attributeFilter: ['class'] });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
window.updateCartUI();
console.log('✅ UI upgrade loaded — search, categories, cart pill, bottom nav');
})();
