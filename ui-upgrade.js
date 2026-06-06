/**
 * NKRUMAH AVE — UI UPGRADE PATCH v3
 * Bold search bar + clear bottom nav
 */
(function() {
'use strict';

const CSS = `
#mainFilterBar { display: none !important; }
.cart-fab { display: none !important; }

/* ── SEARCH ROW ── */
#_searchRow {
  background: #111;
  padding: 10px 12px 8px;
  position: sticky;
  top: 52px;
  z-index: 97;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #1a1a1a;
}
#_searchWrap {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 12px;
  padding: 0 14px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 46px;
}
#_searchIcon { font-size: 1em; color: #888; flex-shrink: 0; }
#_searchField {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #111;
  font-size: 0.9em;
  font-family: Arial, sans-serif;
  min-width: 0;
  -webkit-appearance: none;
}
#_searchField::placeholder { color: #999; }
#_searchClear {
  background: #ccc;
  border: none;
  color: #555;
  font-size: 0.75em;
  cursor: pointer;
  padding: 3px 7px;
  border-radius: 50%;
  display: none;
  line-height: 1;
  flex-shrink: 0;
  font-weight: bold;
}
#_searchClear.visible { display: flex; align-items: center; justify-content: center; }
#_searchBtn {
  background: #00ff00;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

/* ── CATEGORY STRIP ── */
#_catStrip {
  background: #111;
  padding: 0 12px 10px;
  display: flex;
  gap: 7px;
  overflow-x: auto;
  position: sticky;
  top: 106px;
  z-index: 96;
  border-bottom: 1px solid #1a1a1a;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
#_catStrip::-webkit-scrollbar { display: none; }

._cat {
  flex-shrink: 0;
  padding: 7px 18px;
  background: #1e1e1e;
  color: #777;
  border: 1.5px solid #2a2a2a;
  border-radius: 20px;
  font-size: 0.72em;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: Arial, sans-serif;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  transition: all 0.15s;
}
._cat.on {
  background: #00ff00;
  color: #000;
  border-color: #00ff00;
  font-weight: 900;
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
  box-shadow: -3px 0 16px rgba(0,255,0,0.25);
  min-width: 46px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
}
#_cartPill.show { opacity: 1; pointer-events: auto; }
#_cartPillIcon { font-size: 1.3em; line-height: 1; }
#_cartPillCount {
  background: #000;
  color: #00ff00;
  border-radius: 8px;
  padding: 1px 6px;
  font-size: 0.6em;
  font-weight: 900;
  margin-top: 3px;
  min-width: 18px;
  text-align: center;
  font-family: Arial, sans-serif;
}
#_cartPillLabel {
  font-size: 0.46em;
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
  height: 62px;
  background: #0d0d0d;
  border-top: 1px solid #222;
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
  gap: 3px;
  cursor: pointer;
  border: none;
  background: none;
  color: #444;
  font-family: Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  transition: background 0.1s;
}
._navTab:active { background: #161616; }

/* Active tab — green glow on icon */
._navTab.on ._navIcon { 
  background: rgba(0,255,0,0.12);
  border-radius: 10px;
  padding: 4px 10px;
  color: #00ff00;
}
._navTab.on ._navLabel { color: #00ff00; }

._navIcon {
  font-size: 1.3em;
  line-height: 1;
  padding: 4px 10px;
  border-radius: 10px;
  transition: all 0.15s;
}
._navLabel {
  font-size: 0.5em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #444;
  transition: color 0.15s;
}
._navBadge {
  position: absolute;
  top: 6px;
  right: calc(50% - 22px);
  background: #ff4444;
  color: #fff;
  border-radius: 10px;
  padding: 2px 5px;
  font-size: 0.48em;
  font-weight: 900;
  min-width: 16px;
  text-align: center;
  display: none;
  font-family: Arial, sans-serif;
  border: 1.5px solid #0d0d0d;
}
._navBadge.on { display: block; }

/* spacing */
.container { padding-bottom: 80px !important; }
.wa-bubble { bottom: 70px !important; right: 14px !important; }
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── SEARCH ROW ────────────────────────────────────────────────────────────────
const searchRow = document.createElement('div');
searchRow.id = '_searchRow';
searchRow.innerHTML = `
  <div id="_searchWrap">
    <span id="_searchIcon">🔍</span>
    <input id="_searchField" type="search" placeholder="Search products, brands..." autocomplete="off">
    <button id="_searchClear" type="button">✕</button>
    <button id="_searchBtn" type="button">🔍</button>
  </div>
`;

// ── CATEGORY STRIP ────────────────────────────────────────────────────────────
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

// ── CART PILL ─────────────────────────────────────────────────────────────────
const cartPill = document.createElement('div');
cartPill.id = '_cartPill';
cartPill.innerHTML = `
  <div id="_cartPillIcon">🛒</div>
  <div id="_cartPillCount">0</div>
  <div id="_cartPillLabel">Cart</div>
`;
cartPill.onclick = () => { if(typeof toggleCart==='function') toggleCart(); };

// ── BOTTOM NAV ────────────────────────────────────────────────────────────────
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

// ── NAV HANDLERS ──────────────────────────────────────────────────────────────
function _setNav(id) {
  document.querySelectorAll('._navTab').forEach(t => t.classList.remove('on'));
  document.getElementById(id)?.classList.add('on');
}

document.getElementById('_navHome').onclick = function() {
  _setNav('_navHome');
  if(typeof closeStore==='function') closeStore();
  document.getElementById('cartModal')?.classList.remove('active');
  document.getElementById('storesModal')?.classList.remove('active');
  window.scrollTo({top:0, behavior:'smooth'});
};
document.getElementById('_navStores').onclick = function() {
  _setNav('_navStores');
  if(typeof openStores==='function') openStores();
};
document.getElementById('_navCart').onclick = function() {
  if(typeof toggleCart==='function') toggleCart();
};
document.getElementById('_navMore').onclick = function() {
  _setNav('_navMore');
  if(typeof openDrawer==='function') openDrawer();
};

// Sync nav with cart modal state
const cartModal = document.getElementById('cartModal');
if (cartModal) {
  new MutationObserver(() => {
    if (cartModal.classList.contains('active')) {
      _setNav('_navCart');
    } else {
      _setNav('_navHome');
    }
  }).observe(cartModal, {attributes:true, attributeFilter:['class']});
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
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

// ── CATEGORIES ────────────────────────────────────────────────────────────────
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

// ── BADGES ────────────────────────────────────────────────────────────────────
function _badges() {
  const cnt = (window.cart||[]).reduce((s,i) => s+(i.qty||1), 0);
  const pill = document.getElementById('_cartPill');
  const pillCnt = document.getElementById('_cartPillCount');
  if (pill) pill.classList.toggle('show', cnt > 0);
  if (pillCnt) pillCnt.textContent = cnt;
  const badge = document.getElementById('_navBadge');
  if (badge) { badge.textContent = cnt; badge.classList.toggle('on', cnt > 0); }
  const hdr = document.getElementById('cartCountHeader');
  if (hdr) { hdr.textContent = cnt; hdr.style.display = cnt ? 'inline-flex' : 'none'; }
  const old = document.getElementById('cartCount');
  if (old) old.textContent = cnt;
}

const _prev = window.updateCartUI;
window.updateCartUI = function() {
  if (typeof _prev === 'function') _prev();
  _badges();
};

_badges();
console.log('✅ UI upgrade v3 loaded');
})();
