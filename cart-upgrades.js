/**
 * NKRUMAH AVE — CART UPGRADES v4
 * Clean rewrite — no override conflicts
 */
(function() {
'use strict';

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
@keyframes _cBounce {0%{transform:scale(1)}30%{transform:scale(1.35)}60%{transform:scale(.9)}100%{transform:scale(1)}}
@keyframes _cShake {0%,100%{transform:translateX(0)}15%{transform:translateX(-6px) rotate(-4deg)}30%{transform:translateX(6px) rotate(4deg)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}90%{transform:translateX(2px)}}
.cart-fab-bounce { animation: _cBounce .5s ease !important; }
.cart-fab-shake { animation: _cShake .9s ease !important; }

#_imgToast {
  position:fixed; top:70px; left:50%;
  transform:translateX(-50%) translateY(-10px);
  background:#111; border:1px solid #00ff00; border-radius:14px;
  padding:10px 12px; display:flex; align-items:center; gap:10px;
  z-index:9000; box-shadow:0 8px 24px rgba(0,255,0,.2);
  width:90%; max-width:320px; box-sizing:border-box;
  opacity:0; pointer-events:none;
  transition:opacity .25s, transform .25s;
}
#_imgToast.in  { opacity:1; transform:translateX(-50%) translateY(0); pointer-events:auto; }
#_imgToast.out { opacity:0; transform:translateX(-50%) translateY(-10px); pointer-events:none; }
._ti { width:44px; height:44px; border-radius:8px; overflow:hidden; background:#1a1a1a; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.4em; border:1px solid #2a2a2a; }
._ti img { width:100%; height:100%; object-fit:cover; }
._tn { flex:1; min-width:0; }
._tn b  { display:block; font-size:.78em; font-weight:bold; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
._tn s  { display:block; font-size:.8em; color:#00ff00; font-weight:bold; text-decoration:none; }
._tn sm { display:block; font-size:.62em; color:#666; }
._tv { background:#00ff00; color:#000; border:none; border-radius:8px; padding:6px 9px; font-size:.62em; font-weight:bold; cursor:pointer; white-space:nowrap; flex-shrink:0; }

.qty-row { display:flex; align-items:center; gap:8px; margin-top:8px; }
.qty-btn { width:28px; height:28px; background:#1a1a1a; border:1px solid #2a2a2a; color:#00ff00; border-radius:6px; font-size:1.1em; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qty-btn:active { background:#0f2a0f; }
.qty-num { font-size:.9em; font-weight:bold; color:#fff; min-width:22px; text-align:center; }
.save-later-btn { background:none; border:none; color:#444; font-size:.63em; cursor:pointer; padding:0; margin-top:5px; text-decoration:underline; display:block; }
.save-later-btn:hover { color:#00ff00; }

.cart-item { background:#0d0d0d; padding:12px; margin-bottom:8px; border-radius:10px; border:1px solid #1e1e1e; position:relative; overflow:hidden; }
._cit { display:flex; gap:10px; align-items:flex-start; overflow:hidden; }
._cimg { width:54px; height:54px; border-radius:8px; overflow:hidden; background:#1a1a1a; flex-shrink:0; border:1px solid #2a2a2a; display:flex; align-items:center; justify-content:center; font-size:1.5em; }
._cimg img { width:100%; height:100%; object-fit:cover; }
._cbody { flex:1; min-width:0; overflow:hidden; padding-right:30px; }
._cname { font-size:.8em; font-weight:bold; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }
._cmeta { font-size:.63em; color:#555; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }
._cprice { font-size:.9em; font-weight:bold; color:#00ff00; margin-top:4px; }
._crm { position:absolute; top:10px; right:10px; background:#1a1a1a; border:1px solid #2a2a2a; color:#666; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.75em; cursor:pointer; transition:all .15s; }
._crm:hover, ._crm:active { background:#2a0f0f; border-color:#ff4444; color:#ff4444; }

._ship { background:#0d0d0d; border:1px solid #1e1e1e; border-radius:10px; padding:10px 12px; margin-bottom:12px; }
._shiplbl { font-size:.68em; color:#aaa; margin-bottom:6px; display:flex; justify-content:space-between; }
._shiplbl span { color:#00ff00; font-weight:bold; }
._shiptrack { height:4px; background:#1a1a1a; border-radius:3px; overflow:hidden; }
._shipfill { height:100%; background:linear-gradient(90deg,#00ff00,#00cc44); border-radius:3px; transition:width .6s cubic-bezier(.34,1.56,.64,1); }
._shipdone { font-size:.68em; color:#00ff00; font-weight:bold; text-align:center; }

#_stickyBar { position:fixed; bottom:0; left:0; right:0; background:linear-gradient(0deg,#0a0a0a 80%,transparent); padding:10px 14px 18px; z-index:150; display:none; pointer-events:none; gap:8px; align-items:center; box-sizing:border-box; }
#_stickyBar.on { display:flex; pointer-events:auto; }
._stp { background:#111; border:1px solid #00ff00; border-radius:10px; padding:9px 13px; flex-shrink:0; }
._stplbl { font-size:.52em; color:#666; text-transform:uppercase; letter-spacing:1px; }
._stpamt { font-size:.95em; font-weight:bold; color:#00ff00; }
._stbtn { flex:1; padding:13px; background:linear-gradient(90deg,#00ff00,#00cc00); color:#000; border:none; border-radius:10px; font-size:.85em; font-weight:bold; cursor:pointer; text-transform:uppercase; }

._recs { border-top:1px solid #1e1e1e; padding-top:12px; margin-top:8px; }
._recstitle { font-size:.62em; color:#555; text-transform:uppercase; letter-spacing:2px; margin-bottom:10px; }
._recsrow { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; }
._recsrow::-webkit-scrollbar { display:none; }
._reccard { flex-shrink:0; width:95px; border:1px solid #1e1e1e; border-radius:8px; overflow:hidden; background:#0d0d0d; cursor:pointer; }
._recimg { width:95px; height:95px; background:#1a1a1a; display:flex; align-items:center; justify-content:center; font-size:1.8em; overflow:hidden; }
._recimg img { width:100%; height:100%; object-fit:cover; }
._recinfo { padding:5px 6px; }
._recname { font-size:.58em; color:#ccc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }
._recprice { font-size:.65em; color:#00ff00; font-weight:bold; }
._recatc { width:100%; padding:4px; background:#0f2a0f; color:#00ff00; border:none; font-size:.58em; font-weight:bold; cursor:pointer; text-transform:uppercase; }

._saved { border-top:1px dashed #1e1e1e; margin-top:12px; padding-top:12px; }
._savedtitle { font-size:.62em; color:#555; text-transform:uppercase; letter-spacing:2px; margin-bottom:8px; }
._saveditem { background:#0a0a0a; border:1px solid #1a1a1a; border-radius:8px; padding:10px; display:flex; align-items:center; gap:10px; margin-bottom:6px; }
._savedimg { width:38px; height:38px; border-radius:6px; overflow:hidden; background:#1a1a1a; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1em; }
._savedimg img { width:100%; height:100%; object-fit:cover; }
._savedname { font-size:.72em; color:#aaa; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
._m2c { background:none; border:1px solid #00ff00; color:#00ff00; border-radius:6px; padding:4px 8px; font-size:.6em; font-weight:bold; cursor:pointer; white-space:nowrap; flex-shrink:0; }

#cartModal .modal-content { overflow-x:hidden !important; width:94% !important; max-width:540px !important; box-sizing:border-box !important; }
`;
const st = document.createElement('style');
st.textContent = CSS;
document.head.appendChild(st);

// ── INJECT DOM ────────────────────────────────────────────────────────────────
const stickyBar = document.createElement('div');
stickyBar.id = '_stickyBar';
stickyBar.innerHTML = `<div class="_stp"><div class="_stplbl">Total</div><div class="_stpamt" id="_stpamt">GHS 0</div></div><button class="_stbtn" onclick="toggleCart()">🛒 Checkout</button>`;
document.body.appendChild(stickyBar);

const toast = document.createElement('div');
toast.id = '_imgToast';
document.body.appendChild(toast);

const mc = document.querySelector('#cartModal .modal-content');
if (mc) { const rd = document.createElement('div'); rd.id='_cartRecsContainer'; mc.appendChild(rd); }

// ── STATE ─────────────────────────────────────────────────────────────────────
const FREE_SHIP = 200;
let savedForLater = [];
try { savedForLater = JSON.parse(localStorage.getItem('nkrumah_saved')||'[]'); } catch(e){}
function _saveSFL() { localStorage.setItem('nkrumah_saved', JSON.stringify(savedForLater)); }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function _p(id)   { return (window.products||[]).find(p=>p.id===id); }
function _img(id) { const p=_p(id); return p&&p.media&&p.media[0]&&p.media[0].url ? p.media[0].url : null; }
function _shoe(id){ const p=_p(id); return p&&p.category==='shoes'; }
function _price(p){ return p.discount ? p.price-Math.round(p.price*p.discount/100) : p.price; }
function _fab()   { return document.querySelector('.cart-fab'); }
function _bounce(){ const f=_fab(); if(!f)return; f.classList.add('cart-fab-bounce'); setTimeout(()=>f.classList.remove('cart-fab-bounce'),500); }

// ── TOAST ─────────────────────────────────────────────────────────────────────
let _tt;
function _toast(p, imgSrc) {
  const t=document.getElementById('_imgToast'); if(!t)return;
  const f = p?_price(p):0;
  t.innerHTML=`<div class="_ti">${imgSrc?`<img src="${imgSrc}">`:(p&&p.category==='shoes'?'👟':'👕')}</div><div class="_tn"><b>${p?p.name:'Item'}</b><s>GHS ${f.toLocaleString()}</s><sm>✅ Added to cart</sm></div><button class="_tv" onclick="document.getElementById('_imgToast').className='out';toggleCart();">View →</button>`;
  t.className='in'; clearTimeout(_tt); _tt=setTimeout(()=>t.className='out',3000);
}

// ── FLY ANIMATION ─────────────────────────────────────────────────────────────
function _fly(btn, productId) {
  const p=_p(productId), imgSrc=_img(productId), fab=_fab();
  if(btn&&fab){
    try {
      const sr=btn.getBoundingClientRect(), dr=fab.getBoundingClientRect();
      const cl=document.createElement('div');
      cl.style.cssText=`position:fixed;z-index:9999;pointer-events:none;overflow:hidden;border-radius:8px;box-shadow:0 4px 20px rgba(0,255,0,.4);transition:left .5s cubic-bezier(.25,.46,.45,.94),top .5s,width .45s ease,height .45s ease,opacity .35s ease,border-radius .35s ease;left:${sr.left}px;top:${sr.top}px;width:${sr.width}px;height:${sr.height}px`;
      cl.innerHTML=imgSrc?`<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;">` :`<div style="width:100%;height:100%;background:#0f2a0f;display:flex;align-items:center;justify-content:center;font-size:2em;">${_shoe(productId)?'👟':'👕'}</div>`;
      document.body.appendChild(cl);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        const cx=dr.left+dr.width/2-15, cy=dr.top+dr.height/2-15;
        cl.style.left=cx+'px';cl.style.top=cy+'px';cl.style.width='30px';cl.style.height='30px';cl.style.opacity='0';cl.style.borderRadius='50%';
      }));
      setTimeout(()=>{cl.remove();_bounce();},550);
    } catch(e){_bounce();}
  } else { _bounce(); }
  _toast(p,imgSrc);
}

// ── MERGE / ADD ───────────────────────────────────────────────────────────────
function _merge(item) {
  if(!window.cart) window.cart=[];
  const ex=window.cart.find(i=>i.productId===item.productId&&i.size===item.size&&i.color===item.color);
  if(ex){ex.qty=(ex.qty||1)+1;return;}
  item.qty=1; window.cart.push(item);
}

// ── GLOBAL HELPERS (called from rendered HTML) ─────────────────────────────────
window._updateQty = function(idx,delta){
  if(!window.cart||!window.cart[idx])return;
  window.cart[idx].qty=Math.max(1,(window.cart[idx].qty||1)+delta);
  window.saveCart(); window.updateCartUI();
};
window._removeItem = function(idx){
  if(!window.cart)return;
  window.cart.splice(idx,1); window.saveCart(); window.updateCartUI();
};
window._saveForLater = function(idx){
  if(!window.cart)return;
  savedForLater.push(window.cart.splice(idx,1)[0]); _saveSFL();
  window.saveCart(); window.updateCartUI(); window.showNotification('💾 Saved for later');
};
window._moveToCart = function(idx){
  _merge(savedForLater.splice(idx,1)[0]); _saveSFL();
  window.saveCart(); window.updateCartUI(); window.showNotification('✅ Moved to cart');
};
window._recAdd = function(id,btn){
  const p=_p(id); if(!p||!p.available)return;
  _merge({id:Date.now(),productId:p.id,name:p.name,brand:p.brand,price:_price(p),size:(p.sizes&&p.sizes[0])||'',color:(p.colors&&p.colors[0])||''});
  window.saveCart(); window.updateCartUI(); _fly(btn,id);
};

// ── STICKY BAR ────────────────────────────────────────────────────────────────
function _sticky(){
  const bar=document.getElementById('_stickyBar'),amt=document.getElementById('_stpamt');
  if(!bar||!window.cart)return;
  if(!window.cart.length){bar.classList.remove('on');return;}
  let b=window.cart.reduce((s,i)=>s+i.price*(i.qty||1),0);
  if(window.appliedCoupon&&window.appliedCoupon.type==='percent')b-=Math.round(b*window.appliedCoupon.discount/100);
  if(amt)amt.textContent='GHS '+b.toLocaleString(); bar.classList.add('on');
}

// ── SHIPPING BAR ──────────────────────────────────────────────────────────────
function _shipBar(){
  if(!window.cart||!window.cart.length)return'';
  const tot=window.cart.reduce((s,i)=>s+i.price*(i.qty||1),0);
  const pct=Math.min(100,Math.round(tot/FREE_SHIP*100));
  if(tot>=FREE_SHIP)return'<div class="_ship"><div class="_shipdone">🎉 You qualify for free shipping!</div></div>';
  return`<div class="_ship"><div class="_shiplbl"><span>Free shipping</span><span>GHS ${(FREE_SHIP-tot).toLocaleString()} away</span></div><div class="_shiptrack"><div class="_shipfill" style="width:${pct}%"></div></div></div>`;
}

// ── RECS ──────────────────────────────────────────────────────────────────────
function _recs(){
  const ids=(window.cart||[]).map(i=>i.productId);
  const list=(window.products||[]).filter(p=>!ids.includes(p.id)&&p.available).slice(0,6);
  if(!list.length)return'';
  return'<div class="_recs"><div class="_recstitle">You might also like</div><div class="_recsrow">'+list.map(p=>{
    const f=_price(p),img=p.media&&p.media[0]&&p.media[0].url?`<img src="${p.media[0].url}">`:(p.category==='shoes'?'👟':'👕');
    return`<div class="_reccard" onclick="toggleCart();openProductDetail('${p.id}')"><div class="_recimg">${img}</div><div class="_recinfo"><div class="_recname">${p.name}</div><div class="_recprice">GHS ${f.toLocaleString()}</div></div><button class="_recatc" onclick="event.stopPropagation();_recAdd('${p.id}',this)">+ Add</button></div>`;
  }).join('')+'</div></div>';
}

// ── OVERRIDE updateCartUI ─────────────────────────────────────────────────────
window.updateCartUI = function(){
  const cnt=(window.cart||[]).reduce((s,i)=>s+(i.qty||1),0);
  ['cartCount','cartCountHeader'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    el.textContent=cnt;
    if(id==='cartCountHeader') el.style.display=cnt?'inline-flex':'none';
  });

  const itemsEl=document.getElementById('cartItems');
  const emptyEl=document.getElementById('emptyCartMsg');
  const summaryEl=document.getElementById('cartSummary');
  if(!itemsEl)return;

  const hasCart=(window.cart||[]).length>0;
  const hasSaved=savedForLater.length>0;

  if(!hasCart&&!hasSaved){
    itemsEl.innerHTML='';
    if(emptyEl)emptyEl.style.display='block';
    if(summaryEl)summaryEl.style.display='none';
    _sticky();return;
  }
  if(emptyEl)emptyEl.style.display='none';
  if(summaryEl)summaryEl.style.display='block';

  let base=(window.cart||[]).reduce((s,i)=>s+i.price*(i.qty||1),0),disc=0;
  if(window.appliedCoupon&&window.appliedCoupon.type==='percent')disc=Math.round(base*window.appliedCoupon.discount/100);

  let html=hasCart?_shipBar():'';
  html+=(window.cart||[]).map((item,i)=>{
    const imgSrc=_img(item.productId);
    const imgHTML=imgSrc?`<img src="${imgSrc}">`:(item.category==='shoes'?'👟':'👕');
    const qty=item.qty||1;
    return`<div class="cart-item">
      <button class="_crm" onclick="_removeItem(${i})">✕</button>
      <div class="_cit">
        <div class="_cimg">${imgHTML}</div>
        <div class="_cbody">
          <span class="_cname">${item.brand} — ${item.name}</span>
          <span class="_cmeta">${item.size||'-'} · ${item.color||'-'}</span>
          <div class="_cprice">GHS ${(item.price*qty).toLocaleString()}</div>
          <div class="qty-row">
            <button class="qty-btn" onclick="_updateQty(${i},-1)">−</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-btn" onclick="_updateQty(${i},1)">+</button>
          </div>
          <button class="save-later-btn" onclick="_saveForLater(${i})">Save for later</button>
        </div>
      </div>
    </div>`;
  }).join('');

  if(hasSaved){
    html+=`<div class="_saved"><div class="_savedtitle">💾 Saved for later (${savedForLater.length})</div>`;
    html+=savedForLater.map((item,i)=>{
      const imgSrc=_img(item.productId);
      return`<div class="_saveditem"><div class="_savedimg">${imgSrc?`<img src="${imgSrc}">`:'👕'}</div><div class="_savedname">${item.name}</div><button class="_m2c" onclick="_moveToCart(${i})">Move to cart</button></div>`;
    }).join('')+'</div>';
  }

  itemsEl.innerHTML=html;

  const totalEl=document.getElementById('totalAmount');
  if(totalEl)totalEl.innerHTML=disc>0
    ?`<span style="text-decoration:line-through;opacity:.5;font-size:.85em;">GHS ${base.toLocaleString()}</span> → GHS ${(base-disc).toLocaleString()}`
    :`Total: GHS ${(base-disc).toLocaleString()}`;

  const rc=document.getElementById('_cartRecsContainer');
  if(rc)rc.innerHTML=_recs();
  _sticky();
};

// ── OVERRIDE quickAddToCart ───────────────────────────────────────────────────
window.quickAddToCart = function(id){
  const p=_p(id); if(!p||!p.available)return;
  _merge({id:Date.now(),productId:p.id,name:p.name,brand:p.brand,price:_price(p),size:(p.sizes&&p.sizes[0])||'',color:(p.colors&&p.colors[0])||''});
  window.saveCart(); window.updateCartUI();
  _fly(event&&event.currentTarget?event.currentTarget:null, id);
};

// ── OVERRIDE addToCartFromDetail ─────────────────────────────────────────────
// This is the KEY fix — direct simple override, no wrapping, no interception
window.addToCartFromDetail = function(){
  const id = window.currentDetailId;
  if(!id){ console.log('No currentDetailId'); return; }
  const p = _p(id);
  if(!p){ console.log('Product not found:', id); return; }
  if(!p.available){ window.showNotification('Item is sold out'); return; }

  const sizeEl  = document.querySelector('.size-opt.selected');
  const colorEl = document.querySelector('.color-opt.selected');
  const size  = sizeEl  ? sizeEl.textContent.trim()  : (p.sizes&&p.sizes[0])||'';
  const color = colorEl ? colorEl.textContent.trim() : (p.colors&&p.colors[0])||'Black';

  _merge({id:Date.now(), productId:p.id, name:p.name, brand:p.brand, price:_price(p), size, color});
  window.saveCart();
  window.updateCartUI();
  _toast(p, _img(id));
  _bounce();
  window.showNotification('✅ Added to cart!');
};

// ── SHAKE REMINDER ────────────────────────────────────────────────────────────
let _idleT;
function _resetIdle(){
  clearTimeout(_idleT);
  _idleT=setTimeout(()=>{
    if(window.cart&&window.cart.length>0){
      const f=_fab();if(!f)return;
      f.classList.add('cart-fab-shake');setTimeout(()=>f.classList.remove('cart-fab-shake'),1000);
    }
  },45000);
}
['touchstart','mousemove','keydown','scroll'].forEach(e=>document.addEventListener(e,_resetIdle,{passive:true}));
_resetIdle();

// ── INIT ──────────────────────────────────────────────────────────────────────
if(window.cart)window.cart.forEach(i=>{if(!i.qty)i.qty=1;});
window.updateCartUI();
console.log('✅ cart-upgrades v4 loaded — ATC fixed');
})();
