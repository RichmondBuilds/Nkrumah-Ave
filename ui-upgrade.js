/**
 * NKRUMAH AVE — UI UPGRADE v7
 * Fixes category filter, search, compact header
 */
(function() {
'use strict';

const CSS = `
#mainFilterBar { display: none !important; }
.cart-fab { display: flex !important; }

header { padding: 8px 12px !important; min-height: 48px !important; }
header h1, #logoTap { font-size: 0.92em !important; letter-spacing: 2px !important; }

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

.container { padding-bottom: 90px !important; }
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── BUILD UI ──────────────────────────────────────────────────────────────────
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

const header = document.querySelector('header');
if (header) {
  header.after(searchRow);
  searchRow.after(catStrip);
}

// ── OVERRIDE renderProducts to respect filter ─────────────────────────────────
// Wait for original functions to load, then replace renderProducts
function _patchRender() {
  if (typeof window.renderProducts !== 'function') return;

  window.renderProducts = function() {
    // Render new-in row if it exists
    if (typeof window.renderNewIn === 'function') window.renderNewIn();

    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let list = [...(window.products || [])];

    // Apply category filter
    const cat = window._activeFilter || 'all';
    if (cat !== 'all') {
      list = list.filter(p => p.category === cat);
    }

    // Apply search
    const q = (window._searchQuery || '').toLowerCase().trim();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (!list.length) {
      const msg = cat !== 'all'
        ? `No ${cat} available right now. Check back soon! 👀`
        : 'No products found.';
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#555;padding:60px 20px;font-size:0.9em;">${msg}</div>`;
      return;
    }

    // Use existing renderCardHTML if available
    if (typeof window.renderCardHTML === 'function') {
      grid.innerHTML = list.map(p => window.renderCardHTML(p)).join('');
    } else {
      // Fallback to original render logic
      grid.innerHTML = list.map(p => {
        const media = p.media && p.media.length ? p.media : [{url:null,type:'image'}];
        const img = media[0];
        const disc = p.discount ? Math.round(p.price*p.discount/100) : 0;
        const final = p.price - disc;
        const inWL = (window.wishlist||[]).includes(p.id);
        const soldCount = p.id.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % 47 + 5;
        const imgHTML = img.url
          ? (img.type==='video'
              ? `<video src="${img.url}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;"></video>`
              : `<img src="${img.url}" alt="${p.name}" loading="lazy">`)
          : `<div class="img-placeholder">${p.category==='shoes'?'👟':'👕'}</div>`;
        return `<div class="product-card ${!p.available?'sold-out':''}">
          <div class="img-wrap" onclick="openProductDetail('${p.id}')">
            ${imgHTML}
            <div class="badge ${p.available?'av':'so'}">${p.available?'In Stock':'Sold Out'}</div>
            ${p.discount?`<div class="badge discount">${p.discount}%</div>`:''}
            ${!p.available?'<div class="sold-out-overlay">SOLD OUT</div>':''}
            <button class="wishlist-btn-card" onclick="event.stopPropagation();quickWishlist('${p.id}')">${inWL?'❤️':'🤍'}</button>
          </div>
          <div class="card-info" onclick="openProductDetail('${p.id}')">
            <div class="store-badge ${p.store==='Alltime Legits'?'alltime':'nkrumah'}">${p.store==='Alltime Legits'?'🛍️':'🟢'} ${p.store||'Nkrumah Ave'}</div>
            <div class="card-name">${p.name}</div>
            <div class="card-brand">${p.brand}</div>
            <div class="card-price">${p.discount?`<span class="card-orig-price">GHS ${p.price.toLocaleString()}</span>`:''}GHS ${final.toLocaleString()}</div>
            <div class="sold-count">🛍️ ${soldCount} sold</div>
            ${p.stock!==undefined?`<div class="card-stock ${p.stock<=3&&p.available?'low':''}">${!p.available?'❌ Out of stock':p.stock<=3?`🔥 Only ${p.stock} left`:`📦 ${p.stock} in stock`}</div>`:''}
          </div>
          <div style="padding:0 8px 8px;">
            <button class="card-atc" onclick="quickAddToCart('${p.id}')" ${!p.available?'disabled':''}>${p.available?'+ ADD TO CART':'SOLD OUT'}</button>
          </div>
        </div>`;
      }).join('');
    }
  };
}

// ── SEARCH LOGIC ──────────────────────────────────────────────────────────────
const field = document.getElementById('_searchField');
const clear = document.getElementById('_searchClear');

field.addEventListener('input', function() {
  const val = this.value.trim();
  clear.classList.toggle('visible', val.length > 0);
  window._searchQuery = val;
  window._activeFilter = 'all';
  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  document.querySelector('._cat[data-val="all"]')?.classList.add('on');
  window.renderProducts();
});

clear.addEventListener('click', () => {
  field.value = ''; field.blur();
  clear.classList.remove('visible');
  window._searchQuery = '';
  window.renderProducts();
});

// ── CATEGORY LOGIC ────────────────────────────────────────────────────────────
catStrip.addEventListener('click', e => {
  const btn = e.target.closest('._cat');
  if (!btn) return;

  document.querySelectorAll('._cat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');

  const val = btn.dataset.val;
  window._activeFilter = val;
  window._searchQuery = '';
  field.value = '';
  clear.classList.remove('visible');

  window.renderProducts();
  btn.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
});

// ── INIT ──────────────────────────────────────────────────────────────────────
window._activeFilter = 'all';
window._searchQuery = '';

// Patch render after everything loads
_patchRender();
setTimeout(_patchRender, 500);
setTimeout(_patchRender, 1500);

console.log('✅ UI upgrade v7 — category filter fixed');
})();
