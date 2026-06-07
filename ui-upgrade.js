/**
 * NKRUMAH AVE — UI UPGRADE PATCH v4
 * - Compact header
 * - Bold search bar
 * - Swipeable categories (no cutoff)
 * - Cart pill
 * - Bottom nav
 * - Fix add to cart on detail page
 * - Fix tap to open product from anywhere
 */
(function() {
'use strict';

const CSS = `
#mainFilterBar { display: none !important; }
.cart-fab { display: none !important; }

/* ── COMPACT HEADER ── */
header {
  padding: 8px 12px !important;
  height: 48px !important;
  min-height: 48px !important;
}
header h1, #logoTap {
  font-size: 0.9em !important;
  letter-spacing: 2px !important;
}

/* ── SEARCH ROW ── */
#_searchRow {
  background: #0f0f0f;
  padding: 8px 10px 6px;
  position: sticky;
  top: 48px;
  z-index: 97;
  width: 100%;
  box-sizing: border-box;
}
#_searchWrap {
  display: flex;
  align-items: center;
  background: #efefef;
  border-radius: 10px;
  padding: 0 10px;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 42px;
}
#_searchIcon { font-size: 0.9em; color: #999; flex-shrink: 0; }
#_searchField {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #111;
  font-size: 0.88em;
  font-family: Arial, sans-serif;
  min-width: 0;
  -webkit-appearance: none;
  padding: 0;
}
#_searchField::placeholder { color: #aaa; }
#_searchClear {
  background: #ccc;
  border: none;
  color: #555;
  font-size: 0.7em;
  font-weight: bold;
  cursor: pointer;
  width: 18px; height: 18px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
}
#_searchClear.visible { display: flex; }
#_searchBtn {
  background: #00ff00;
  border: none;
  border-radius: 7px;
  width: 34px; height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85em;
  cursor: pointer;
  flex-shrink: 0;
}

/* ── CATEGORY STRIP ── */
#_catStrip {
  background: #0f0f0f;
  padding: 6px 10px 8px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  position: sticky;
  top: 100px;
  z-index: 96;
  border-bottom: 1px solid #181818;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
#_catStrip::-webkit-scrollbar { display: none; }

._cat {
  flex-shrink: 0;
  padding: 6px 16px;
  background: #1c1c1c;
  color: #666;
  border: 1px solid #282828;
  border-radius: 20px;
  font-size: 0.7em;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: Arial, sans-serif;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  transition: all 0.15s;
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
  box-shadow: -3px 0 14px rgba(0,255,0,0.2);
  min-width: 46px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
#_cartPill.show { opacity: 1; pointer-events: auto; }
#_cpIcon { font-size: 1.2em; line-height: 1; }
#_cpCount {
  background: #000;
  color: #00ff00;
  border-radius: 8px;
  padding: 1px 6px;
  font-size: 0.58em;
  font-weight: 900;
  margin-top: 3px;
  min-width: 16px;
  text-align: center;
  font-family: Arial, sans-serif;
}
#_cpLabel {
  font-size: 0.44em;
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
  color: #3a3a3a;
  font-family: Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  transition: background 0.1s;
}
._navTab:active { background: #141414; }
._navIcon {
  font-size: 1.25em;
  line-height: 1;
  padding: 3px 12px;
  border-radius: 10px;
  transition: all 0.15s;
}
._navLabel {
  font-size: 0.48em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #3a3a3a;
  transition: color 0.15s;
}
._navTab.on ._navIcon {
  background: rgba(0,255,0,0.13);
  color: #00ff00;
}
._navTab.on ._navLabel { color: #00ff00; }
._navBadge {
  position: absolute;
  top: 5px; right: calc(50% - 22px);
  background: #ff3b3b;
  color: #fff;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 0.46em;
  font-weight: 900;
  min-width: 15px;
  text-align: center;
  display: none;
  border: 1.5px solid #0d0d0d;
  font-family: Arial, sans-serif;
}
._navBadge.on { display: block; }

.container { padding-bottom: 76px !important; }
.wa-bubble { bottom: 66px !important; right: 12px !important; }
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── DOM ───────────────────────────────────────────────────────────────────────
const searchRow = document.createElement('div');
searchRow.id = '_searchRow';
searchRow.innerHTML = `<div id="_searchWrap">
  <span id="_searchIcon">🔍</span>
  <input id="_searchField" type="search" placeholder="Search products, brands..." autocomplete="off">
  <button id="_searchClear" type="button">✕</button>
  <button id="_searchBtn" type="button">🔍</button>
</div>`;

const cats = ['All','Tees','Shorts','Hoodies','Shoes','Bags','Other'];
const catStrip = document.createElement('div');
catStrip.id = '_catStrip';
catStrip.innerHTML = cats.map((c,i) =>
  `<button class="_cat${i===0?' on':''}" data-val="${c.toLowerCase()}" type="button">${c}</button>`
).join('');

const cartPill = document.createElement('div');
cartPill.id = '_cartPill';
cartPill.innerHTML = `<div id="_cpIcon">🛒</div><div id="_cpCount">0</div><div id="_cpLabel">Cart</div>`;
cartPill.onclick = () => { if(typeof toggleCart==='function') toggleCart(); };

const bottomNav = document.createElement('div');
bottomNav.id = '_bottomNav';
bottomNav.innerHTML = `
  <button class="_navTab on" id="_nHome" type="button"><span class="_navIcon">🏠</span><span class="_navLabel">Home</span></button>
  <button class="_navTab" id="_nStores" type="button"><span class="_navIcon">🏪</span><span class="_navLabel">Stores</span></button>
  <button class="_navTab" id="_nCart" type="button"><span class="_navIcon">🛒</span><span class="_navLabel">Cart</span><span class="_navBadge" id="_nBadge">0</span></button>
  <button class="_navTab" id="_nMore" type="button"><span class="_navIcon">☰</span><span class="_navLabel">More</span></button>
`;

const header = document.querySelector('header');
if (header) { header.after(searchRow); searchRow.after(catStrip); }
document.body.appendChild(cartPill);
document.body.appendChild(bottomNav);

// ── NAV ───────────────────────────────────────────────────────────────────────
function _setNav(id) {
  document.querySelectorAll('._navTab').forEach(t => t.classList.remove('on'));
  document.getElementById(id)?.classList.add('on');
}
document.getElementById('_nHome').onclick = () => {
  _setNav('_nHome');
  if(typeof closeStore==='function') closeStore();
  document.getElementById('cartModal')?.classList.remove('active');
  document.getElementById('storesModal')?.classList.remove('active');
  window.scrollTo({top:0,behavior:'smooth'});
};
document.getElementById('_nStores').onclick = () => { _setNav('_nStores'); if(typeof openStores==='function') openStores(); };
document.getElementById('_nCart').onclick = () => { if(typeof toggleCart==='function') toggleCart(); };
document.getElementById('_nMore').onclick = () => { _setNav('_nMore'); if(typeof openDrawer==='function') openDrawer(); };

const cartModal = document.getElementById('cartModal');
if (cartModal) {
  new MutationObserver(() => {
    _setNav(cartModal.classList.contains('active') ? '_nCart' : '_nHome');
  }).observe(cartModal, {attributes:true, attributeFilter:['class']});
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
const field = document.getElementById('_searchField');
const clear = document.getElementById('_searchClear');
field.addEventListener('input', function() {
  clear.classList.toggle('visible', this.value.trim().length > 0);
  window.searchQuery = this.value.trim();
  window.currentFilter = 'all';
  document.querySelectorAll('._cat').forEach(b=>b.classList.remove('on'));
  document.querySelector('._cat[data-val="all"]')?.classList.add('on');
  if(typeof window.renderProducts==='function') window.renderProducts();
});
clear.addEventListener('click', () => {
  field.value=''; field.blur();
  clear.classList.remove('visible');
  window.searchQuery='';
  if(typeof window.renderProducts==='function') window.renderProducts();
});

// ── CATEGORIES ────────────────────────────────────────────────────────────────
catStrip.addEventListener('click', e => {
  const btn = e.target.closest('._cat'); if(!btn) return;
  document.querySelectorAll('._cat').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  window.currentFilter = btn.dataset.val;
  window.searchQuery = '';
  field.value=''; clear.classList.remove('visible');
  if(typeof window.renderProducts==='function') window.renderProducts();
  btn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
});

// ── BADGES ────────────────────────────────────────────────────────────────────
function _badges() {
  const cnt = (window.cart||[]).reduce((s,i)=>s+(i.qty||1),0);
  document.getElementById('_cartPill')?.classList.toggle('show', cnt>0);
  const cc = document.getElementById('_cpCount'); if(cc) cc.textContent=cnt;
  const nb = document.getElementById('_nBadge');
  if(nb){nb.textContent=cnt;nb.classList.toggle('on',cnt>0);}
  const hdr=document.getElementById('cartCountHeader');
  if(hdr){hdr.textContent=cnt;hdr.style.display=cnt?'inline-flex':'none';}
  const old=document.getElementById('cartCount');
  if(old) old.textContent=cnt;
}

// ── FIX: ADD TO CART ON DETAIL PAGE ──────────────────────────────────────────
// The detail ATC button calls addToCartFromDetail() — make sure it's wired
document.addEventListener('click', function(e) {
  const atcBtn = e.target.closest('#detailAtcBtn');
  if (atcBtn && typeof window.addToCartFromDetail === 'function') {
    window.addToCartFromDetail();
  }
}, true);

// ── FIX: TAPPING PRODUCT OPENS DETAIL PAGE ────────────────────────────────────
// Delegate from document so it works for dynamically rendered cards too
document.addEventListener('click', function(e) {
  // Card image or info tap
  const card = e.target.closest('.product-card, .new-in-card, ._reccard, .related-item');
  if (!card) return;
  // Don't intercept buttons inside cards
  if (e.target.closest('button, a')) return;
  // Get product id from onclick attr or data attr
  const atcBtn = card.querySelector('.card-atc, ._recatc');
  const onclick = card.getAttribute('onclick') || card.querySelector('[onclick*="openProductDetail"]')?.getAttribute('onclick') || '';
  const match = onclick.match(/openProductDetail\(['"](.+?)['"]\)/);
  if (match && typeof window.openProductDetail === 'function') {
    window.openProductDetail(match[1]);
  }
});

const _prev = window.updateCartUI;
window.updateCartUI = function() {
  if(typeof _prev==='function') _prev();
  _badges();
};

_badges();
console.log('✅ UI upgrade v4');
})();
