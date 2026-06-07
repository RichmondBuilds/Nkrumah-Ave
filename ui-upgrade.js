/**
 * NKRUMAH AVE — UI UPGRADE PATCH v5
 * - Bold search bar + swipeable categories
 * - Restore original cart FAB (no bottom nav)
 * - Fix add to cart on product detail page
 * - Fix cart item text overflow
 */
(function() {
'use strict';

const CSS = `
/* Hide original filter bar only */
#mainFilterBar { display: none !important; }

/* Restore cart FAB */
.cart-fab { display: flex !important; }

/* ── COMPACT HEADER ── */
header {
  padding: 8px 12px !important;
  min-height: 48px !important;
}
header h1, #logoTap {
  font-size: 0.92em !important;
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
  height: 44px;
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

/* ── FIX CART ITEM TEXT OVERFLOW ── */
.cart-item, ._cit { overflow: hidden !important; }
._cbody {
  min-width: 0 !important;
  flex: 1 !important;
  padding-right: 32px !important;
  overflow: hidden !important;
}
._cname {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
}
._cmeta {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* Fix cart modal width */
#cartModal .modal-content {
  overflow-x: hidden !important;
  width: 94% !important;
  max-width: 540px !important;
  box-sizing: border-box !important;
}

/* More space at bottom for FAB */
.container { padding-bottom: 90px !important; }
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

// ── SEARCH LOGIC ──────────────────────────────────────────────────────────────
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

// ── CATEGORY LOGIC ────────────────────────────────────────────────────────────
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

// ── FIX: ADD TO CART ON PRODUCT DETAIL PAGE ───────────────────────────────────
// The detail modal renders a button with id="detailAtcBtn" and onclick="addToCartFromDetail()"
// Sometimes the function reference is lost — we re-wire it on every modal open
function _wireDetailAtc() {
  const btn = document.getElementById('detailAtcBtn');
  if (!btn) return;
  // Remove old listeners by cloning
  const fresh = btn.cloneNode(true);
  btn.parentNode.replaceChild(fresh, btn);
  fresh.addEventListener('click', function(e) {
    e.stopPropagation();
    if (typeof window.addToCartFromDetail === 'function') {
      window.addToCartFromDetail();
    }
  });
}

// Watch for product detail modal opening
const detailModal = document.getElementById('productDetailModal');
if (detailModal) {
  new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.target.classList.contains('active')) {
        // Wait for render then wire button
        setTimeout(_wireDetailAtc, 100);
      }
    });
  }).observe(detailModal, {attributes: true, attributeFilter: ['class']});
}

// Also intercept clicks on the detail ATC button at document level as backup
document.addEventListener('click', function(e) {
  const btn = e.target.closest('#detailAtcBtn');
  if (btn && !btn.disabled) {
    if (typeof window.addToCartFromDetail === 'function') {
      window.addToCartFromDetail();
    }
  }
}, true);

// ── UPDATE CART COUNT ON FAB ───────────────────────────────────────────────────
const _prev = window.updateCartUI;
window.updateCartUI = function() {
  if (typeof _prev === 'function') _prev();
  // Keep original FAB badge in sync
  const cnt = (window.cart||[]).reduce((s,i) => s+(i.qty||1), 0);
  const fabCount = document.getElementById('cartCount');
  if (fabCount) fabCount.textContent = cnt;
  const hdrCount = document.getElementById('cartCountHeader');
  if (hdrCount) { hdrCount.textContent = cnt; hdrCount.style.display = cnt ? 'inline-flex' : 'none'; }
};

console.log('✅ UI upgrade v5 — search + categories + ATC fix + original FAB restored');
})();
