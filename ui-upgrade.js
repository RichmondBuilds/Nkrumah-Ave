/**
 * NKRUMAH AVE — UI UPGRADE PATCH v2
 * - Full-width search bar (fixed, no expand on focus)
 * - Swipeable category filter strip
 * - Sticky cart pill (Temu-style)
 * - Bottom nav bar
 */
(function() {
'use strict';

const CSS = `
/* Hide original filter bar */
#mainFilterBar { display: none !important; }

/* Hide original cart FAB */
.cart-fab { display: none !important; }

/* ── SEARCH ROW ── */
#_searchRow {
  background: #0a0a0a;
  padding: 8px 12px;
  position: sticky;
  top: 52px;
  z-index: 97;
  width: 100%;
  box-sizing: border-box;
}
#_searchWrap {
  display: flex;
  align-items: center;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 0 12px;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}
#_searchIcon { font-size: 0.88em; color: #555; flex-shrink: 0; }
#_searchField {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.84em;
  padding: 11px 0;
  font-family: Arial, sans-serif;
  width: 100%;
  min-width: 0;
  -webkit-appearance: none;
}
#_searchField::placeholder { color: #444; }
#_searchClear {
  background: none;
  border: none;
  color: #555;
  font-size: 0.9em;
  cursor: pointer;
  padding: 0;
  display: none;
  line-height: 1;
  flex-shrink: 0;
}
#_searchClear.visible { display: block; }

/* ── CATEGORY STRIP ── */
#_catStrip {
  background: #0a0a0a;
  padding: 0 12px 9px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  position: sticky;
  top: 98px;
  z-index: 96;
  border-bottom: 1px solid #141414;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
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
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  -webkit-appearance: none;
}
._cat.on {
  background: #00ff00;
  color: #000;
  border-color: #00ff00;
}

/* ── STICKY CART PILL ── */
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
  border-radius: 10px 0 0 10px;
  padding: 10px 8px 8px;
  cursor: pointer;
  box-shadow: -2px 0 14px rgba(0,255,0,0.2);
  min-width: 44px;
  transition: opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  pointer-events: none;
}
#_cartPill.show {
  opacity: 1;
  pointer-events: auto;
}
#_cartPillIcon { font-size: 1.2em; line-height: 1; }
#_cartPillCount {
  background: #000;
  color: #00ff00;
  border-radius: 8px;
  padding: 1px 5px;
  font-size: 0.58em;
  font-weight: 900;
  margin-top: 3px;
  min-width: 16px;
  text-align: center;
  font-family: Arial, sans-serif;
}
#_cartPillLabel {
  font-size: 0.45em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
  font-family: Arial, sans-serif;
}

/* ── BOTTOM NAV ── */
#_bottomNav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 58px;
  background: #0d0d0d;
  border-top: 1px solid #1e1e1e;
  display: flex;
  align-items: stretch;
  z-index: 300;
}
._navTab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  border: none;
  background: none;
  color: #444;
  font-family: Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  transition: color 0.15s;
}
._navTab.on { color: #00ff00; }
._navTab:active { background: #111; }
._navIcon { font-size: 1.2em; line-height: 1; }
._navLabel {
  font-size: 0.5em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
._navBadge {
  position: absolute;
  top: 5px;
  right: calc(50% - 20px);
  background: #ff4444;
  color: #fff;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 0.48em;
  font-weight: 900;
  min-width: 14px;
  text-align: center;
  display: none;
  font-family: Arial, sans-serif;
}
._navBadge.on { display: block; }

/* Adjust spacing for nav bar */
.container { padding-bottom: 80px !important; }
.wa-bubble { bottom: 68px !important; right: 14px !important; }
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
    <input id="_searchField" type="search" placeholder="Search products, brands..." autocomplete="off">
    <button id="_searchClear" type="button">✕</button>
  </div>
`;

// ── BUILD CATEGORY STRIP ──────────────────────────────────────────────────────
const cats = [
  {label:'All', val:'all'},
  {label:'Tees', val:'tees'},
  {label:'Shorts', val:'shorts'},
  {label:'Hoodies', val:'hoodies'},
  {label:'Shoes', val:'shoes'},
  {label:'Bags', val:'bags'},
  {label:'Other', val:'other'},
];
const catStrip = document.createElement('div');
catStrip.id = '_catStrip';
catStrip.innerHTML = cats.map(c =>
  `<button class="_cat${c.val==='all'?' on':''}" data-val="${c.val}" type="button">${c.label}</button>`
).join('');

// ── BUILD CART PILL ───────────────────────────────────────────────────────────
const cartPill = document.createElement('div');
cartPill.id = '_cartPill';
cartPill.innerHTML = `
  <div id="_cartPillIcon">🛒</div>
  <div id="_cartPillCount">0</div>
  <div id="_cartPillLabel">Cart</div>
`;
cartPill.onclick = () => { if(typeof toggleCart==='function') toggleCart(); };

// ── BUILD BOTTOM NAV ──────────────────────────────────────────────────────────
const bottomNav = document.createElement('div');
bottomNav.id = '_bottomNav';
bottomNav.innerHTML = `
  <button class="_navTab on" id="_navHome" type="button">
    <span class="_navIcon">🏠</span>
    <span class="_navLabel">Home</span>
  </button>
  <button class="_navTab" id="_navStores" type="button">
    <span class="_navIcon">🏪</span>
    <span class="_navLabel">Stores</span>
  </button>
  <button class="_navTab" id="_navCart" type="button">
    <span class="_navIcon">🛒</span>
    <span class="_navLabel">Cart</span>
    <span class="_navBadge" id="_navBadge">0</span>
  </button>
  <button class="_navTab" id="_navMore" type="button">
    <span class="_navIcon">☰</span>
    <span class="_navLabel">More</span>
  </button>
`;

// ── INJECT ────────────────────────────────────────────────────────────────────
const header = document.querySelector('header');
if (header) {
  header.after(searchRow);
  searchRow.after(catStrip);
}
document.body.appendChild(cartPill);
document.body.appendChild(bottomNav);

// ── NAV TAP HANDLERS ─────────────────────────────────────────────────────────
function _setNavActive(id) {
  document.querySelectorAll('._navTab').forEach(t => t.classList.remove('on'));
  document.getElementById(id)?.classList.add('on');
}

document.getElementById('_navHome').onclick = function() {
  _setNavActive('_navHome');
  if(typeof closeStore==='function') closeStore();
  document.getElementById('cartModal')?.classList.remove('active');
  document.getElementById('storesModal')?.classList.remove('active');
  window.scrollTo({top:0, behavior:'smooth'});
};

document.getElementById('_navStores').onclick = function() {
  _setNavActive('_navStores');
  if(typeof openStores==='function') openStores();
};

document.getElementById('_navCart').onclick = function() {
  if(typeof toggleCart==='function') toggleCart();
};

document.getElementById('_navMore').onclick = function() {
  _setNavActive('_navMore');
  if(typeof openDrawer==='function') openDrawer();
};

// Reset home tab when cart/drawer closes
const cartModal = document.getElementById('cartModal');
if (cartModal) {
  new MutationObserver(() => {
    if (!cartModal.classList.contains('active')) {
      _setNavActive('_navHome');
    } else {
      _setNavActive('_navCart');
    }
  }).observe(cartModal, {attributes:true, attributeFilter:['class']});
}

// ── SEARCH LOGIC ──────────────────────────────────────────────────────────────
const field = document.getElementById('_searchField');
const clear = document.getElementById('_searchClear');

field.addEventListener('input', function() {
  const val = this.value.trim();
  clear.classList.toggle('visible', val.length > 0);
  window.searchQuery = val;
  window.currentFilter = 'all';
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  document.querySelector('._cat[data-val="all"]')?.classList.add('on');
  if (typeof window.renderProducts === 'function') window.renderProducts();
});

clear.addEventListener('click', function() {
  field.value = '';
  field.blur();
  this.classList.remove('visible');
  window.searchQuery = '';
  if (typeof window.renderProducts === 'function') window.renderProducts();
});

// ── CATEGORY LOGIC ────────────────────────────────────────────────────────────
catStrip.addEventListener('click', function(e) {
  const btn = e.target.closest('._cat');
  if (!btn) return;
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  window.currentFilter = btn.dataset.val;
  window.searchQuery = '';
  field.value = '';
  clear.classList.remove('visible');
  if (typeof window.renderProducts === 'function') window.renderProducts();
  btn.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
});

// ── UPDATE BADGES ─────────────────────────────────────────────────────────────
function _updateBadges() {
  const cnt = (window.cart||[]).reduce((s,i) => s+(i.qty||1), 0);
  // Cart pill
  const pill = document.getElementById('_cartPill');
  const pillCnt = document.getElementById('_cartPillCount');
  if (pill) pill.classList.toggle('show', cnt > 0);
  if (pillCnt) pillCnt.textContent = cnt;
  // Nav badge
  const badge = document.getElementById('_navBadge');
  if (badge) { badge.textContent = cnt; badge.classList.toggle('on', cnt > 0); }
  // Header badge
  const hdr = document.getElementById('cartCountHeader');
  if (hdr) { hdr.textContent = cnt; hdr.style.display = cnt ? 'inline-flex' : 'none'; }
  // Old FAB count
  const old = document.getElementById('cartCount');
  if (old) old.textContent = cnt;
}

// Hook into updateCartUI
const _prev = window.updateCartUI;
window.updateCartUI = function() {
  if (typeof _prev === 'function') _prev();
  _updateBadges();
};

// ── INIT ──────────────────────────────────────────────────────────────────────
_updateBadges();
console.log('✅ UI upgrade v2 loaded');
})();
