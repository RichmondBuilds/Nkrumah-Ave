/**
 * NKRUMAH AVE — CART UPGRADES PATCH v2
 * Place just before </body> in index.html:
 * <script src="cart-upgrades.js"></script>
 */
(function() {
'use strict';

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
@keyframes _cBounce {0%{transform:scale(1)}30%{transform:scale(1.35)}60%{transform:scale(.9)}100%{transform:scale(1)}}
@keyframes _cShake {0%,100%{transform:translateX(0)}15%{transform:translateX(-6px) rotate(-5deg)}30%{transform:translateX(6px) rotate(5deg)}45%{transform:translateX(-5px)}60%{transform:translateX(5px)}75%{transform:translateX(-3px)}90%{transform:translateX(3px)}}
.cart-fab-bounce{animation:_cBounce .5s ease!important}
.cart-fab-shake{animation:_cShake .9s ease!important}

#_imgToast{position:fixed;top:70px;left:50%;transform:translateX(-50%) translateY(-12px);background:#111;border:1px solid #00ff00;border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px;z-index:9000;box-shadow:0 8px 32px rgba(0,255,0,.2);min-width:260px;max-width:340px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}
#_imgToast.in{opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto}
#_imgToast.out{opacity:0;transform:translateX(-50%) translateY(-12px);pointer-events:none}
._ti{width:48px;height:48px;border-radius:8px;overflow:hidden;background:#1a1a1a;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.5em;border:1px solid #2a2a2a}
._ti img{width:100%;height:100%;object-fit:cover}
._tn{flex:1;min-width:0}
._tn b{display:block;font-size:.78em;font-weight:bold;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
._tn s{display:block;font-size:.82em;color:#00ff00;font-weight:bold;text-decoration:none}
._tn small{display:block;font-size:.65em;color:#666}
._tv{background:#00ff00;color:#000;border:none;border-radius:8px;padding:6px 10px;font-size:.65em;font-weight:bold;cursor:pointer;white-space:nowrap;flex-shrink:0}

.qty-row{display:flex;align-items:center;gap:6px;margin-top:6px}
.qty-btn{width:26px;height:26px;background:#1a1a1a;border:1px solid #2a2a2a;color:#00ff00;border-radius:6px;font-size:1em;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.qty-btn:hover{background:#0f2a0f;border-color:#00ff00}
.qty-num{font-size:.88em;font-weight:bold;color:#fff;min-width:20px;text-align:center}
.save-later-btn{background:none;border:none;color:#555;font-size:.65em;cursor:pointer;padding:0;margin-top:4px;text-decoration:underline;text-underline-offset:2px;display:block}
.save-later-btn:hover{color:#00ff00}

.cart-item{background:#0d0d0d;padding:10px;margin-bottom:8px;border-radius:10px;border:1px solid #1e1e1e}
._cit{display:flex;gap:10px;align-items:flex-start}
._cimg{width:52px;height:52px;border-radius:8px;overflow:hidden;background:#1a1a1a;flex-shrink:0;border:1px solid #2a2a2a;display:flex;align-items:center;justify-content:center;font-size:1.4em}
._cimg img{width:100%;height:100%;object-fit:cover}
._cbody{flex:1;min-width:0}
._cname{font-size:.82em;font-weight:bold;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
._cmeta{font-size:.65em;color:#555;margin-top:1px}
._cprice{font-size:.92em;font-weight:bold;color:#00ff00;margin-top:3px}
._crm{background:none;border:none;color:#333;font-size:1.1em;cursor:pointer;padding:0 4px;line-height:1}
._crm:hover{color:#ff4444}

._ship{background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:10px 12px;margin-bottom:12px}
._shiplbl{font-size:.7em;color:#aaa;margin-bottom:6px;display:flex;justify-content:space-between}
._shiplbl span{color:#00ff00;font-weight:bold}
._shiptrack{height:5px;background:#1a1a1a;border-radius:3px;overflow:hidden}
._shipfill{height:100%;background:linear-gradient(90deg,#00ff00,#00cc44);border-radius:3px;transition:width .5s cubic-bezier(.34,1.56,.64,1)}
._shipdone{font-size:.7em;color:#00ff00;font-weight:bold;text-align:center;margin-top:4px}

#_stickyBar{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(0deg,#0a0a0a 70%,transparent);padding:12px 16px 20px;z-index:150;display:none;pointer-events:none;gap:8px;align-items:center}
#_stickyBar.on{display:flex;pointer-events:auto}
._stp{background:#111;border:1px solid #00ff00;border-radius:10px;padding:10px 14px;flex-shrink:0}
._stplbl{font-size:.55em;color:#666;text-transform:uppercase;letter-spacing:1px}
._stpamt{font-size:1em;font-weight:bold;color:#00ff00}
._stbtn{flex:1;padding:13px;background:linear-gradient(90deg,#00ff00,#00cc00);color:#000;border:none;border-radius:10px;font-size:.88em;font-weight:bold;cursor:pointer;text-transform:uppercase;letter-spacing:1px;box-shadow:0 4px 20px rgba(0,255,0,.3)}

._recs{border-top:1px solid #1e1e1e;padding-top:12px;margin-top:4px}
._recstitle{font-size:.65em;color:#666;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px}
._recsrow{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}
._recsrow::-webkit-scrollbar{display:none}
._reccard{flex-shrink:0;width:100px;cursor:pointer;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;background:#0d0d0d;transition:border-color .2s}
._reccard:hover{border-color:#00ff00}
._recimg{width:100px;height:100px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:2em;overflow:hidden}
._recimg img{width:100%;height:100%;object-fit:cover}
._recinfo{padding:6px}
._recname{font-size:.6em;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
._recprice{font-size:.7em;color:#00ff00;font-weight:bold}
._recatc{width:100%;padding:4px;background:#0f2a0f;color:#00ff00;border:none;font-size:.6em;font-weight:bold;cursor:pointer;text-transform:uppercase}

._saved{border-top:1px dashed #1e1e1e;margin-top:10px;padding-top:10px}
._savedtitle{font-size:.65em;color:#555;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}
._saveditem{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px;padding:10px;display:flex;align-items:center;gap:10px;margin-bottom:6px}
._savedimg{width:40px;height:40px;border-radius:6px;overflow:hidden;background:#1a1a1a;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.1em}
._savedimg img{width:100%;height:100%;object-fit:cover}
._savedname{font-size:.75em;color:#aaa;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
._m2c{background:none;border:1px solid #00ff00;color:#00ff00;border-radius:6px;padding:4px 8px;font-size:.62em;font-weight:bold;cursor:pointer;white-space:nowrap}
`;
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── INJECT DOM ────────────────────────────────────────────────────────────────
// Sticky bar
const stickyBar = document.createElement('div');
stickyBar.id = '_stickyBar';
stickyBar.innerHTML = `<div class="_stp"><div class="_stplbl">Total</div><div class="_stpamt" id="_stpamt">GHS 0</div></div><button class="_stbtn" onclick="toggleCart()">🛒 Checkout</button>`;
document.body.appendChild(stickyBar);

// Image toast
const toast = document.createElement('div');
toast.id = '_imgToast';
document.body.appendChild(toast);

// Cart recs container (appended inside cart modal content)
const cartModalContent = document.querySelector('#cartModal .modal-content');
if (cartModalContent) {
  const recDiv = document.createElement('div');
  recDiv.id = '_cartRecsContainer';
  cartModalContent.appendChild(recDiv);
}

// ── STATE ─────────────────────────────────────────────────────────────────────
const FREE_SHIP = 200;
let savedForLater = [];
try { savedForLater = JSON.parse(localStorage.getItem('nkrumah_saved') || '[]'); } catch(e) {}
function _saveSFL() { localStorage.setItem('nkrumah_saved', JSON.stringify(savedForLater)); }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function _getProduct(id) { return (window.products||[]).find(p => p.id === id); }
function _getImg(id) { const p=_getProduct(id); return p&&p.media&&p.media[0]&&p.media[0].url ? p.media[0].url : null; }
function _isShoe(id) { const p=_getProduct(id); return p && p.category === 'shoes'; }
function _final(p) { return p.discount ? p.price - Math.round(p.price*p.discount/100) : p.price; }
function _fab() { return document.querySelector('.cart-fab'); }
function _bounceFab() { const f=_fab(); if(!f)return; f.classList.add('cart-fab-bounce'); setTimeout(()=>f.classList.remove('cart-fab-bounce'),500); }

// ── 1 & 2: FLY + TOAST ───────────────────────────────────────────────────────
function flyToCart(srcEl, productId) {
  const p = _getProduct(productId);
  const imgSrc = _getImg(productId);
  const fab = _fab();

  // Fly animation
  if (srcEl && fab) {
    try {
      const sr = srcEl.getBoundingClientRect(), dr = fab.getBoundingClientRect();
      const clone = document.createElement('div');
      clone.style.cssText = `position:fixed;z-index:9999;pointer-events:none;overflow:hidden;border-radius:8px;box-shadow:0 4px 20px rgba(0,255,0,.4);transition:left .55s cubic-bezier(.25,.46,.45,.94),top .55s,width .5s ease,height .5s ease,opacity .4s ease,border-radius .4s ease;left:${sr.left}px;top:${sr.top}px;width:${sr.width}px;height:${sr.height}px`;
      clone.innerHTML = imgSrc
        ? `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div style="width:100%;height:100%;background:#0f2a0f;display:flex;align-items:center;justify-content:center;font-size:2em;">${_isShoe(productId)?'👟':'👕'}</div>`;
      document.body.appendChild(clone);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const cx = dr.left+dr.width/2-15, cy = dr.top+dr.height/2-15;
        clone.style.left=cx+'px'; clone.style.top=cy+'px';
        clone.style.width='30px'; clone.style.height='30px';
        clone.style.opacity='0'; clone.style.borderRadius='50%';
      }));
      setTimeout(() => { clone.remove(); _bounceFab(); }, 600);
    } catch(e) { _bounceFab(); }
  } else {
    _bounceFab();
  }

  // Toast
  _showToast(p, imgSrc);
}

let _toastTimer;
function _showToast(p, imgSrc) {
  const t = document.getElementById('_imgToast');
  if (!t) return;
  const final = p ? _final(p) : 0;
  t.innerHTML = `
    <div class="_ti">${imgSrc?`<img src="${imgSrc}">`:(p&&p.category==='shoes'?'👟':'👕')}</div>
    <div class="_tn">
      <b>${p?p.name:'Item'}</b>
      <s>GHS ${final.toLocaleString()}</s>
      <small>✅ Added to cart</small>
    </div>
    <button class="_tv" onclick="document.getElementById('_imgToast').className='out';toggleCart();">View Cart →</button>
  `;
  t.className = 'in';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'out'; }, 3000);
}

// ── 4: STICKY BAR ────────────────────────────────────────────────────────────
function _updateStickyBar() {
  const bar = document.getElementById('_stickyBar');
  const amt = document.getElementById('_stpamt');
  if (!bar || !window.cart) return;
  if (!window.cart.length) { bar.classList.remove('on'); return; }
  let base = window.cart.reduce((s,i) => s+i.price*(i.qty||1), 0);
  if (window.appliedCoupon && window.appliedCoupon.type==='percent')
    base -= Math.round(base*window.appliedCoupon.discount/100);
  if (amt) amt.textContent = 'GHS '+base.toLocaleString();
  bar.classList.add('on');
}

// ── 5: SHIPPING BAR ──────────────────────────────────────────────────────────
function _shippingBar() {
  if (!window.cart || !window.cart.length) return '';
  const total = window.cart.reduce((s,i) => s+i.price*(i.qty||1), 0);
  const pct = Math.min(100, Math.round(total/FREE_SHIP*100));
  if (total >= FREE_SHIP)
    return '<div class="_ship"><div class="_shipdone">🎉 You qualify for free shipping!</div></div>';
  return `<div class="_ship"><div class="_shiplbl"><span>Free shipping</span><span>GHS ${(FREE_SHIP-total).toLocaleString()} away</span></div><div class="_shiptrack"><div class="_shipfill" style="width:${pct}%"></div></div></div>`;
}

// ── 6: AUTO-MERGE ────────────────────────────────────────────────────────────
function _merge(item) {
  if (!window.cart) window.cart = [];
  const ex = window.cart.find(i => i.productId===item.productId && i.size===item.size && i.color===item.color);
  if (ex) { ex.qty = (ex.qty||1)+1; return; }
  item.qty = 1;
  window.cart.push(item);
}

// ── 3: QTY STEPPER ───────────────────────────────────────────────────────────
window._updateQty = function(idx, delta) {
  if (!window.cart || !window.cart[idx]) return;
  window.cart[idx].qty = Math.max(1, (window.cart[idx].qty||1)+delta);
  window.saveCart(); window.updateCartUI();
};

// ── 7: SAVE FOR LATER ────────────────────────────────────────────────────────
window._saveForLater = function(idx) {
  if (!window.cart) return;
  const item = window.cart.splice(idx,1)[0];
  savedForLater.push(item); _saveSFL();
  window.saveCart(); window.updateCartUI();
  window.showNotification('💾 Saved for later');
};
window._moveToCart = function(idx) {
  const item = savedForLater.splice(idx,1)[0];
  _saveSFL(); _merge(item);
  window.saveCart(); window.updateCartUI();
  window.showNotification('✅ Moved to cart');
};

// ── 8: CART RECS ─────────────────────────────────────────────────────────────
function _cartRecs() {
  const ids = (window.cart||[]).map(i=>i.productId);
  const recs = (window.products||[]).filter(p=>!ids.includes(p.id)&&p.available).slice(0,5);
  if (!recs.length) return '';
  return '<div class="_recs"><div class="_recstitle">You might also like</div><div class="_recsrow">'
    +recs.map(p=>{
      const f=_final(p);
      const img=p.media&&p.media[0]&&p.media[0].url?`<img src="${p.media[0].url}">`:(p.category==='shoes'?'👟':'👕');
      return `<div class="_reccard" onclick="toggleCart();openProductDetail('${p.id}')"><div class="_recimg">${img}</div><div class="_recinfo"><div class="_recname">${p.name}</div><div class="_recprice">GHS ${f.toLocaleString()}</div></div><button class="_recatc" onclick="event.stopPropagation();_addById('${p.id}',this)">+ Add</button></div>`;
    }).join('')
    +'</div></div>';
}

// ── 9: SHAKE REMINDER ────────────────────────────────────────────────────────
let _idleT;
function _resetIdle() {
  clearTimeout(_idleT);
  _idleT = setTimeout(()=>{
    if (window.cart && window.cart.length>0) {
      const f=_fab(); if(!f)return;
      f.classList.add('cart-fab-shake');
      setTimeout(()=>f.classList.remove('cart-fab-shake'),1000);
    }
  }, 45000);
}
['touchstart','mousemove','keydown','scroll'].forEach(e=>document.addEventListener(e,_resetIdle,{passive:true}));
_resetIdle();

// ── CORE: ADD BY ID (used by recs + card buttons) ────────────────────────────
window._addById = function(id, btn) {
  const p = _getProduct(id);
  if (!p || !p.available) return;
  const item = {
    id: Date.now(),
    productId: p.id,
    name: p.name,
    brand: p.brand,
    price: _final(p),
    size: (p.sizes&&p.sizes[0])||'',
    color: (p.colors&&p.colors[0])||''
  };
  _merge(item);
  window.saveCart();
  window.updateCartUI();
  flyToCart(btn, id);
};

// ── OVERRIDE: updateCartUI ────────────────────────────────────────────────────
window.updateCartUI = function() {
  // Badge counts
  const cnt = (window.cart||[]).reduce((s,i)=>s+(i.qty||1),0);
  const countEl = document.getElementById('cartCount');
  const hdr = document.getElementById('cartCountHeader');
  if (countEl) countEl.textContent = cnt;
  if (hdr) { hdr.textContent = cnt; hdr.style.display = cnt?'inline-flex':'none'; }

  const items = document.getElementById('cartItems');
  const empty = document.getElementById('emptyCartMsg');
  const summary = document.getElementById('cartSummary');
  if (!items) return;

  const hasCart = (window.cart||[]).length > 0;
  const hasSaved = savedForLater.length > 0;

  if (!hasCart && !hasSaved) {
    items.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (summary) summary.style.display = 'none';
    _updateStickyBar(); return;
  }

  if (empty) empty.style.display = 'none';
  if (summary) summary.style.display = 'block';

  let base = (window.cart||[]).reduce((s,i)=>s+i.price*(i.qty||1),0), disc=0;
  if (window.appliedCoupon && window.appliedCoupon.type==='percent')
    disc = Math.round(base*window.appliedCoupon.discount/100);
  const final = base - disc;

  // Cart items HTML
  let html = hasCart ? _shippingBar() : '';
  html += (window.cart||[]).map((item,i) => {
    const imgSrc = _getImg(item.productId);
    const imgHTML = imgSrc ? `<img src="${imgSrc}">` : (_isShoe(item.productId)?'👟':'👕');
    const qty = item.qty||1;
    return `<div class="cart-item">
      <div class="_cit">
        <div class="_cimg">${imgHTML}</div>
        <div class="_cbody">
          <div class="_cname">${item.brand} — ${item.name}</div>
          <div class="_cmeta">${item.size||'-'} · ${item.color||'-'}</div>
          <div class="_cprice">GHS ${(item.price*qty).toLocaleString()}</div>
          <div class="qty-row">
            <button class="qty-btn" onclick="_updateQty(${i},-1)">−</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-btn" onclick="_updateQty(${i},1)">+</button>
          </div>
          <button class="save-later-btn" onclick="_saveForLater(${i})">Save for later</button>
        </div>
        <button class="_crm" onclick="removeFromCart(${i})">✕</button>
      </div>
    </div>`;
  }).join('');

  // Saved for later
  if (hasSaved) {
    html += `<div class="_saved"><div class="_savedtitle">💾 Saved for later (${savedForLater.length})</div>`;
    html += savedForLater.map((item,i) => {
      const imgSrc = _getImg(item.productId);
      return `<div class="_saveditem"><div class="_savedimg">${imgSrc?`<img src="${imgSrc}">`:'👕'}</div><div class="_savedname">${item.name}</div><button class="_m2c" onclick="_moveToCart(${i})">Move to cart</button></div>`;
    }).join('')+'</div>';
  }

  items.innerHTML = html;

  const totalEl = document.getElementById('totalAmount');
  if (totalEl) totalEl.innerHTML = disc>0
    ? `<span style="text-decoration:line-through;opacity:.5;font-size:.85em;">GHS ${base.toLocaleString()}</span> → GHS ${final.toLocaleString()}`
    : `Total: GHS ${final.toLocaleString()}`;

  const recC = document.getElementById('_cartRecsContainer');
  if (recC) recC.innerHTML = _cartRecs();

  _updateStickyBar();
};

// ── OVERRIDE: quickAddToCart ──────────────────────────────────────────────────
// Called as onclick="quickAddToCart('id')" so we use document.activeElement as the btn
window.quickAddToCart = function(id) {
  const btn = document.activeElement || null;
  window._addById(id, btn);
};

// ── OVERRIDE: addToCartFromDetail ─────────────────────────────────────────────
window.addToCartFromDetail = function() {
  const id = window.currentDetailId;
  const p = _getProduct(id);
  if (!p || !p.available) return;
  const size = document.querySelector('.size-opt.selected')?.textContent||'';
  const color = document.querySelector('.color-opt.selected')?.textContent||'';
  const item = {id:Date.now(), productId:p.id, name:p.name, brand:p.brand, price:_final(p), size, color};
  _merge(item);
  window.saveCart(); window.updateCartUI();
  _showToast(p, _getImg(id));
  _bounceFab();
};

// ── INIT ──────────────────────────────────────────────────────────────────────
// Migrate old cart items (no qty field)
if (window.cart) window.cart.forEach(i => { if (!i.qty) i.qty = 1; });
window.updateCartUI();
_resetIdle();

console.log('✅ Nkrumah Ave cart upgrades v2 — all 9 features active');
})();
