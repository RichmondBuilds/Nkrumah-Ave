/**
 * NKRUMAH AVE — UI UPGRADE PATCH v6
 * - Bold search + swipeable categories
 * - Original cart FAB kept
 * - ATC fix: no more event interception (was blocking the button)
 * - Cart text overflow fixed
 */
(function() {
'use strict';

const CSS = `
#mainFilterBar { display: none !important; }
.cart-fab { display: flex !important; }

/* Compact header */
header { padding: 8px 12px !important; min-height: 48px !important; }
header h1, #logoTap { font-size: 0.92em !important; letter-spacing: 2px !important; }

/* Search row */
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
  height: 44px;
  box-sizing: border-box;
}
#_searchIcon { font-size: 0.9em; color: #999; flex-shrink: 0; }
#_searchField {
  flex: 1; min-width: 0;
  background: none; border: none; outline: none;
  color: #111; font-size: 0.88em;
  font-family: Arial, sans-serif;
  -webkit-appearance: none; padding: 0;
}
#_searchField::placeholder { color: #aaa; }
#_searchClear {
  background: #ccc; border: none; color: #555;
  font-size: 0.7em; font-weight: bold; cursor: pointer;
  width: 18px; height: 18px; border-radius: 50%;
  display: none; align-items: center; justify-content: center; flex-shrink: 0;
}
#_searchClear.visible { display: flex; }
#_searchBtn {
  background: #00ff00; border: none; border-radius: 7px;
  width: 34px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85em; cursor: pointer; flex-shrink: 0;
}

/* Category strip */
#_catStrip {
  background: #0f0f0f;
  padding: 6px 10px 8px;
  display: flex; gap: 6px;
  overflow-x: auto;
  position: sticky; top: 100px; z-index: 96;
  border-bottom: 1px solid #181818;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
#_catStrip::-webkit-scrollbar { display: none; }
._cat {
  flex-shrink: 0;
  padding: 6px 16px;
  background: #1c1c1c; color: #666;
  border: 1px solid #282828; border-radius: 20px;
  font-size: 0.7em; font-weight: 700;
  cursor: pointer; text-transform: uppercase;
  letter-spacing: 0.8px; font-family: Arial, sans-serif;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  transition: all 0.15s;
}
._cat.on { background: #00ff00; color: #000; border-color: #00ff00; }

/* Fix cart modal overflow */
#cartModal .modal-content {
  overflow-x: hidden !important;
  width: 94% !important;
  max-width: 540px !important;
  box-sizing: border-box !important;
}
/* Fix cart item text cutoff */
.cart-item { overflow: hidden !important; }
._cit { overflow: hidden !important; width: 100% !important; }
._cbody { min-width: 0 !important; overflow: hidden !important; padding-right: 30px !important; }
._cname, ._cmeta {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  display: block !important;
}

.container { padding-bottom: 90px !important; }

/* Make detail ATC button look clearly tappable */
#detailAtcBtn {
  position: relative !important;
  z-index: 10 !important;
  pointer-events: auto !important;
  touch-action: manipulation !important;
}
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── SEARCH ROW ────────────────────────────────────────────────────────────────
const searchRow = document.createElement('div');
searchRow.id = '_searchRow';
searchRow.innerHTML = `<div id="_searchWrap">
  <span id="_searchIcon">🔍</span>
  <input id="_searchField" type="search" placeholder="Search products, brands..." autocomplete="off">
  <button id="_searchClear" type="button">✕</button>
  <button id="_searchBtn" type="button">🔍</button>
</div>`;

// ── CATEGORY STRIP ────────────────────────────────────────────────────────────
const cats = ['All','Tees','Shorts','Hoodies','Shoes','Bags','Other'];
const catStrip = document.createElement('div');
catStrip.id = '_catStrip';
catStrip.innerHTML = cats.map((c,i) =>
  `<button class="_cat${i===0?' on':''}" data-val="${c.toLowerCase()}" type="button">${c}</button>`
).join('');

// ── INJECT ────────────────────────────────────────────────────────────────────
const header = document.querySelector('header');
if (header) {
  header.after(searchRow);
  searchRow.after(catStrip);
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
const field = document.getElementById('_searchField');
const clear = document.getElementById('_searchClear');

field.addEventListener('input', function() {
  clear.classList.toggle('visible', this.value.trim().length > 0);
  window.searchQuery = this.value.trim();
  window.currentFilter = 'all';
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  document.querySelector('._cat[data-val="all"]')?.classList.add('on');
  if (typeof window.renderProducts === 'function') window.renderProducts();
});

clear.addEventListener('click', () => {
  field.value = ''; field.blur();
  clear.classList.remove('visible');
  window.searchQuery = '';
  if (typeof window.renderProducts === 'function') window.renderProducts();
});

// ── CATEGORIES ────────────────────────────────────────────────────────────────
catStrip.addEventListener('click', e => {
  const btn = e.target.closest('._cat'); if (!btn) return;
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  window.currentFilter = btn.dataset.val;
  window.searchQuery = '';
  field.value = ''; clear.classList.remove('visible');
  if (typeof window.renderProducts === 'function') window.renderProducts();
  btn.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
});

// ── FIX DETAIL ATC: patch addToCartFromDetail to also update badge ────────────
// Wait for the page functions to be available then wrap
function _patchATC() {
  if (typeof window.addToCartFromDetail !== 'function') return;
  const _orig = window.addToCartFromDetail;
  window.addToCartFromDetail = function() {
    _orig.apply(this, arguments);
    // Update FAB badge count
    const cnt = (window.cart||[]).reduce((s,i) => s+(i.qty||1), 0);
    const fc = document.getElementById('cartCount'); if(fc) fc.textContent = cnt;
    const hc = document.getElementById('cartCountHeader');
    if(hc){hc.textContent=cnt;hc.style.display=cnt?'inline-flex':'none';}
  };
}

// Patch immediately and also after a short delay (in case scripts load async)
_patchATC();
setTimeout(_patchATC, 1000);
setTimeout(_patchATC, 2500);

// ── BADGE SYNC ────────────────────────────────────────────────────────────────
const _prevUI = window.updateCartUI;
window.updateCartUI = function() {
  if (typeof _prevUI === 'function') _prevUI();
  const cnt = (window.cart||[]).reduce((s,i) => s+(i.qty||1), 0);
  const fc = document.getElementById('cartCount'); if(fc) fc.textContent = cnt;
  const hc = document.getElementById('cartCountHeader');
  if(hc){hc.textContent=cnt;hc.style.display=cnt?'inline-flex':'none';}
};

console.log('✅ UI upgrade v6 loaded');
})();
