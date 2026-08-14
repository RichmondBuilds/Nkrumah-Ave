/**
 * NKRUMAH AVE — FARFETCH COLOR PATCH
 * Applies clean white/black palette site-wide
 * No changes needed to index.html
 */
(function() {

const CSS = `
  /* ── BASE ── */
  body { background: #fff !important; color: #1D1D1D !important; }

  /* ── HEADER ── */
  header {
    background: #fff !important;
    box-shadow: none !important;
    border-bottom: 1px solid #E8E8E8 !important;
  }
  header h1, #logoTap { color: #1D1D1D !important; }
  header button { color: #1D1D1D !important; background: none !important; }
  #cartCountHeader { background: #1D1D1D !important; color: #fff !important; }

  /* ── ADMIN BANNER ── */
  .admin-banner { background: #1D1D1D !important; color: #fff !important; }

  /* ── FILTER BAR ── */
  .filter-bar { background: #fff !important; border-bottom: 1px solid #E8E8E8 !important; top: 52px !important; }
  .filter-btn { background: #fff !important; color: #999 !important; border: none !important; border-bottom: 2px solid transparent !important; border-radius: 0 !important; padding: 12px 14px !important; font-size: 0.7em !important; letter-spacing: 1px !important; }
  .filter-btn.active, .filter-btn:hover { background: #fff !important; color: #1D1D1D !important; border-bottom-color: #1D1D1D !important; }
  .search-input { background: #F5F5F5 !important; color: #1D1D1D !important; border: none !important; border-radius: 4px !important; }
  .price-filter { background: #F5F5F5 !important; color: #1D1D1D !important; border: none !important; border-radius: 4px !important; }

  /* ── CART FAB ── */
  .cart-fab { background: #1D1D1D !important; color: #fff !important; box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important; }
  .cart-count { background: #E40000 !important; color: #fff !important; border-color: #E40000 !important; }

  /* ── WA BUBBLE ── */
  .wa-bubble { background: #25D366 !important; }

  /* ── CONTAINER ── */
  .container { background: #fff !important; }

  /* ── ADD PRODUCT BTNS ── */
  .add-product-btn, .view-orders-btn { background: #1D1D1D !important; color: #fff !important; }

  /* ── PREORDER BANNER ── */
  .preorder-banner { background: #F9F9F9 !important; border: 1px solid #E8E8E8 !important; border-radius: 4px !important; }
  .preorder-banner strong { color: #1D1D1D !important; }
  .preorder-banner p { color: #888 !important; }
  .preorder-banner-btn { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; }

  /* ── COUNTDOWN ── */
  .countdown-block { background: #F0F0F0 !important; }
  .countdown-num { color: #1D1D1D !important; }
  .countdown-label { color: #888 !important; }

  /* ── NEW IN ── */
  .new-in-section { border-bottom: 1px solid #E8E8E8 !important; padding-bottom: 16px !important; }
  .new-in-title { color: #1D1D1D !important; }
  .new-in-card { background: #fff !important; border: 1px solid #E8E8E8 !important; border-radius: 2px !important; }
  .new-in-placeholder { background: #F0F0F0 !important; }
  .new-in-badge { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; }
  .new-in-name { color: #1D1D1D !important; }
  .new-in-price { color: #1D1D1D !important; }

  /* ── PRODUCT CARDS ── */
  .product-card { background: #fff !important; border-radius: 0 !important; border: none !important; border-bottom: 1px solid #E8E8E8 !important; }
  .products-grid { gap: 1px !important; background: #E8E8E8 !important; }
  .img-wrap { background: #F5F5F5 !important; }
  .img-placeholder { background: #F0F0F0 !important; }

  /* ── BADGES ── */
  .badge.av { background: #fff !important; color: #1D1D1D !important; border: 1px solid #E8E8E8 !important; }
  .badge.so { background: #F5F5F5 !important; color: #888 !important; border: 1px solid #E8E8E8 !important; }
  .badge.discount { background: #E40000 !important; color: #fff !important; }
  .badge.new-arrival { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; }
  .badge.bestseller { background: #1D1D1D !important; color: #fff !important; }
  .sold-out-overlay { background: rgba(255,255,255,0.7) !important; color: #1D1D1D !important; }

  /* ── CARD INFO ── */
  .card-info { background: #fff !important; }
  .card-name { color: #1D1D1D !important; }
  .card-brand { color: #888 !important; }
  .card-price { color: #1D1D1D !important; }
  .card-orig-price { color: #AAAAAA !important; }
  .card-stock { color: #E40000 !important; }
  .sold-count { color: #AAAAAA !important; }
  .card-stars { color: #1D1D1D !important; }

  /* ── STORE BADGE ── */
  .store-badge { background: #F5F5F5 !important; color: #888 !important; border-color: #E8E8E8 !important; }
  .store-badge.nkrumah { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .store-badge.alltime, .store-badge.external { background: #FFF8E7 !important; color: #8B6914 !important; border-color: #E8D5A0 !important; }

  /* ── ADD TO CART BUTTON ── */
  .card-atc { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; margin-top: 8px !important; }
  .card-atc:disabled { background: #fff !important; color: #1D1D1D !important; border: 1.5px solid #1D1D1D !important; }

  /* ── ADMIN CARD ACTIONS ── */
  .stock-btn.av { background: #F0F0F0 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .stock-btn.so { background: #FEE2E2 !important; color: #E40000 !important; border-color: #E40000 !important; }
  .del-btn { background: #FEE2E2 !important; color: #E40000 !important; border-color: #E40000 !important; }
  .edit-overlay-btn { background: #1D1D1D !important; color: #fff !important; }

  /* ── DRAWER ── */
  .drawer { background: #fff !important; border-left: 1px solid #E8E8E8 !important; }
  .drawer-header { background: #1D1D1D !important; }
  .drawer-logo { color: #fff !important; }
  .drawer-close { color: #fff !important; }
  .drawer-section { border-bottom-color: #F0F0F0 !important; }
  .drawer-section-title { color: #AAAAAA !important; }
  .drawer-label { color: #1D1D1D !important; }
  .drawer-sublabel { color: #AAAAAA !important; }
  .drawer-item:hover, .drawer-item:active { background: #F5F5F5 !important; }
  .drawer-arrow { color: #AAAAAA !important; }
  .drawer-badge { background: #E40000 !important; }

  /* ── MODALS ── */
  .modal-content { background: #fff !important; border-color: #E8E8E8 !important; color: #1D1D1D !important; }
  .modal-header { color: #1D1D1D !important; }
  .close-btn { color: #1D1D1D !important; }
  .overlay-modal { background: rgba(0,0,0,0.5) !important; }

  /* ── CART ── */
  .cart-item { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .cart-total { background: #1D1D1D !important; color: #fff !important; }
  .checkout-btn { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; }
  .checkout-btn:hover { background: #333 !important; }
  .empty-message { color: #AAAAAA !important; }
  .remove-btn { background: #FEE2E2 !important; color: #E40000 !important; border: 1px solid #E40000 !important; border-radius: 2px !important; }
  .coupon-input { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .coupon-btn { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .coupon-result.valid { background: #F0FFF4 !important; color: #1B7A3E !important; border-color: #A3D9B0 !important; }
  .coupon-result.invalid { background: #FEE2E2 !important; color: #E40000 !important; border-color: #E40000 !important; }

  /* ── PRODUCT DETAIL ── */
  .modal-inner { background: #fff !important; }
  .detail-header { background: #fff !important; border-bottom-color: #E8E8E8 !important; }
  .back-btn { color: #1D1D1D !important; }
  .detail-title { color: #1D1D1D !important; }
  .detail-gallery { background: #F5F5F5 !important; }
  .g-dot { background: rgba(0,0,0,0.2) !important; }
  .g-dot.on { background: #1D1D1D !important; }
  .thumb-row { background: #F9F9F9 !important; }
  .thumb { border-color: #E8E8E8 !important; }
  .thumb.active { border-color: #1D1D1D !important; }
  .detail-brand { color: #888 !important; }
  .detail-name { color: #1D1D1D !important; }
  .detail-price { color: #1D1D1D !important; font-size: 1.3em !important; }
  .detail-orig { color: #AAAAAA !important; }
  .detail-save { color: #E40000 !important; }
  .detail-stock { color: #1D1D1D !important; }
  .detail-stock.low { color: #E40000 !important; }
  .detail-stars { color: #1D1D1D !important; }
  .detail-desc { background: #F9F9F9 !important; border-left-color: #1D1D1D !important; color: #555 !important; }
  .detail-divider { background: #E8E8E8 !important; }
  .detail-label { color: #AAAAAA !important; }
  .size-opt { background: #F9F9F9 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .size-opt.selected { background: #1D1D1D !important; color: #fff !important; border-color: #1D1D1D !important; }
  .color-opt { background: #F9F9F9 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .color-opt.selected { background: #1D1D1D !important; color: #fff !important; border-color: #1D1D1D !important; }
  .detail-atc { background: #1D1D1D !important; color: #fff !important; border-radius: 2px !important; }
  .detail-atc:disabled { background: #F5F5F5 !important; color: #AAAAAA !important; }
  .detail-secondary { background: #fff !important; color: #1D1D1D !important; border-color: #1D1D1D !important; }
  .share-btn { background: #F9F9F9 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .tab { color: #AAAAAA !important; }
  .tab.active { color: #1D1D1D !important; border-bottom-color: #1D1D1D !important; }
  .tabs { border-bottom-color: #E8E8E8 !important; }
  .review-item { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .review-stars { color: #1D1D1D !important; }
  .review-author { color: #AAAAAA !important; }
  .review-text { color: #555 !important; }
  .size-table td { color: #555 !important; border-bottom-color: #F0F0F0 !important; }
  .size-table th { background: #F5F5F5 !important; color: #1D1D1D !important; }

  /* ── WISHLIST BTN ── */
  .wishlist-btn-card { background: rgba(255,255,255,0.9) !important; }

  /* ── FORMS ── */
  .form-group label { color: #1D1D1D !important; }
  .form-group input, .form-group select, .form-group textarea { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .type-btn { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .type-btn.on { background: #1D1D1D !important; color: #fff !important; border-color: #1D1D1D !important; }
  .tag-btn { background: #F5F5F5 !important; color: #888 !important; border-color: #E8E8E8 !important; }
  .tag-btn.on { background: #1D1D1D !important; color: #fff !important; border-color: #1D1D1D !important; }
  #sizesCheckboxes { background: #F5F5F5 !important; border-color: #E8E8E8 !important; }
  .sz-cb { background: #fff !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .sz-cb input { accent-color: #1D1D1D !important; }
  .upload-area { background: #F5F5F5 !important; border-color: #E8E8E8 !important; border-style: dashed !important; }
  .upload-area p { color: #888 !important; }
  .upload-progress { background: #F5F5F5 !important; border-color: #E8E8E8 !important; }
  .progress-bar { background: #1D1D1D !important; }
  .progress-text { color: #1D1D1D !important; }

  /* ── STORES ── */
  .stores-inner { background: #fff !important; }
  .stores-header { background: #fff !important; border-bottom-color: #E8E8E8 !important; }
  .stores-title { color: #1D1D1D !important; }
  .add-store-btn { background: #1D1D1D !important; color: #fff !important; }
  .store-card { background: #fff !important; border-color: #E8E8E8 !important; border-radius: 4px !important; }
  .store-card-name { color: #1D1D1D !important; }
  .store-card-location { color: #888 !important; }
  .store-card-count { color: #1D1D1D !important; }
  .store-page { background: #fff !important; }
  .store-page-name { color: #1D1D1D !important; }
  .store-page-meta { color: #888 !important; }
  .store-page-desc { color: #555 !important; }
  .store-page-products-title { color: #AAAAAA !important; }
  .store-page-filter { background: #fff !important; border-bottom-color: #E8E8E8 !important; }

  /* ── DELIVERY ── */
  .delivery-card { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .delivery-region { color: #1D1D1D !important; }
  .delivery-fee { color: #1D1D1D !important; }
  .delivery-time { color: #888 !important; }

  /* ── FAQ ── */
  .faq-question { color: #1D1D1D !important; }
  .faq-arrow { color: #1D1D1D !important; }
  .faq-answer { color: #555 !important; }
  .faq-item { border-bottom-color: #E8E8E8 !important; }

  /* ── RETURNS ── */
  .returns-text strong { color: #1D1D1D !important; }
  .returns-text p { color: #888 !important; }

  /* ── TRACKING ── */
  .tracking-dot { background: #F5F5F5 !important; border-color: #E8E8E8 !important; }
  .tracking-dot.done { background: #1D1D1D !important; border-color: #1D1D1D !important; }
  .tracking-line { background: #E8E8E8 !important; }
  .tracking-line.done { background: #1D1D1D !important; }
  .tracking-label { color: #1D1D1D !important; }

  /* ── NEWSLETTER ── */
  .newsletter-box { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .newsletter-box h3 { color: #1D1D1D !important; }
  .newsletter-box p { color: #888 !important; }
  .newsletter-input { background: #fff !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }
  .newsletter-btn { background: #1D1D1D !important; color: #fff !important; }

  /* ── PASSWORD MODAL ── */
  #passwordInput { background: #F5F5F5 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; letter-spacing: 4px !important; }
  .wrong-msg { color: #E40000 !important; }

  /* ── NOTIFICATION ── */
  .notification { background: #1D1D1D !important; color: #fff !important; }

  /* ── REFERRAL ── */
  .referral-box { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .referral-code { background: #F5F5F5 !important; color: #1D1D1D !important; }

  /* ── ORDER ── */
  .order-item { background: #F9F9F9 !important; border-color: #E8E8E8 !important; }
  .order-date { color: #AAAAAA !important; }
  .order-total { color: #1D1D1D !important; }
  .order-items-list { color: #555 !important; }
  .clear-orders-btn { background: #E40000 !important; }

  /* ── SYNC STATUS ── */
  .sync-status { color: #AAAAAA !important; }
  .sync-status.error { color: #E40000 !important; }

  /* ── LOADING ── */
  .loading-screen { color: #1D1D1D !important; }
  .loading-spinner { border-color: #E8E8E8 !important; border-top-color: #1D1D1D !important; }

  /* ── PAYMENT BTN ── */
  .payment-btn { background: #F9F9F9 !important; color: #1D1D1D !important; border-color: #E8E8E8 !important; }

  /* ── SECTION LABELS ── */
  [style*="color:#555"], [style*="color: #555"] { color: #AAAAAA !important; }

  /* ── DISCOUNT TIMER ── */
  .disc-timer, .detail-disc-timer { color: #E40000 !important; }

  /* ── UI UPGRADE SEARCH (if active) ── */
  #_searchWrap { background: #F5F5F5 !important; border: 1px solid #E8E8E8 !important; }
  #_searchField { color: #1D1D1D !important; }
  #_searchField::placeholder { color: #AAAAAA !important; }
  #_searchBtn { background: #1D1D1D !important; color: #fff !important; }
  #_catStrip { background: #fff !important; border-bottom-color: #E8E8E8 !important; }
  ._cat { background: #fff !important; color: #999 !important; border-color: transparent !important; border-bottom: 2px solid transparent !important; border-radius: 0 !important; }
  ._cat.on { background: #fff !important; color: #1D1D1D !important; border-bottom-color: #1D1D1D !important; }
  #_searchRow { background: #fff !important; }
`;

const st = document.createElement('style');
st.textContent = CSS;
document.head.appendChild(st);

// Fix header gradient
function fixHeader() {
    const h = document.querySelector('header');
    if (h) {
        h.style.cssText += 'background: #fff !important; box-shadow: none !important; border-bottom: 1px solid #E8E8E8 !important;';
    }
    // Fix meta theme color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#ffffff');
}

fixHeader();
document.addEventListener('DOMContentLoaded', fixHeader);
setTimeout(fixHeader, 500);
setTimeout(fixHeader, 1500);

console.log('✅ Farfetch color patch loaded');
})();
