const categories = [
  ['🍔','مأكولات','1,240'],['🐕','حيوانات','382'],['📱','إلكترونيات','875'],['👕','ملابس','1,035'],
  ['🏠','منزل وأثاث','742'],['🚗','سيارات','260'],['🎮','ألعاب','490'],['🌿','زراعة','318']
];

const products = [
  {id:'P-1001',name:'هاتف ذكي Pro X',category:'إلكترونيات',price:1290,old:1390,seller:'متجر التقنية',icon:'📱',rating:4.8,desc:'هاتف حديث بذاكرة كبيرة وشاشة عالية الدقة.',stock:12},
  {id:'P-1002',name:'حقيبة ظهر مدرسية',category:'ملابس',price:85,old:110,seller:'بيت الأناقة',icon:'🎒',rating:4.7,desc:'حقيبة عملية ومريحة للاستخدام اليومي.',stock:28},
  {id:'P-1003',name:'سماعات لاسلكية',category:'إلكترونيات',price:120,old:150,seller:'متجر الصوت',icon:'🎧',rating:4.6,desc:'صوت واضح وبطارية تدوم لساعات.',stock:35},
  {id:'P-1004',name:'طقم أواني مطبخ',category:'منزل وأثاث',price:165,old:190,seller:'مفروشات البيت',icon:'🍽️',rating:4.9,desc:'طقم أنيق للاستخدام المنزلي اليومي.',stock:9},
  {id:'P-1005',name:'دجاج زينة',category:'حيوانات',price:75,old:90,seller:'مزرعة الخير',icon:'🐔',rating:4.5,desc:'دجاج زينة مع عناية جيدة وتجهيز للنقل.',stock:18},
  {id:'P-1006',name:'كرسي مكتب مريح',category:'منزل وأثاث',price:340,old:390,seller:'هوم ستايل',icon:'🪑',rating:4.8,desc:'كرسي داعم للظهر ومناسب للعمل والدراسة.',stock:7},
  {id:'P-1007',name:'صندوق حلويات مشكلة',category:'مأكولات',price:55,old:65,seller:'حلويات السعادة',icon:'🍰',rating:4.9,desc:'تشكيلة حلويات طازجة مناسبة للضيافة.',stock:21},
  {id:'P-1008',name:'نبتة زينة منزلية',category:'زراعة',price:35,old:45,seller:'حديقة البيت',icon:'🪴',rating:4.7,desc:'نبتة داخلية سهلة العناية تضيف لمسة جميلة.',stock:16}
];

let cart = JSON.parse(localStorage.getItem('market_cart') || '[]');
let currentCategory = 'الكل';

const app = document.getElementById('app');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');

function money(n){ return `${new Intl.NumberFormat('ar').format(n)} ₪`; }
function saveCart(){ localStorage.setItem('market_cart', JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){ cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0); }
function toast(msg){ const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200); }
function productCard(p){
  return `<article class="product-card">
    <div class="product-media"><span class="product-badge">${p.category}</span><button class="heart" onclick="toast('تمت إضافة المنتج للمفضلة')">♡</button><span>${p.icon}</span></div>
    <div class="product-body">
      <h3>${p.name}</h3><div class="product-desc">${p.desc}</div>
      <div class="product-meta"><div class="rating">★ ${p.rating}</div><div class="product-price">${money(p.price)} <small>بدل ${money(p.old)}</small></div></div>
      <div class="product-actions"><button class="primary" onclick="addToCart('${p.id}')">أضف للسلة</button><button class="secondary" onclick="showProduct('${p.id}')">عرض</button></div>
    </div>
  </article>`;
}
function renderCategories(){
  document.getElementById('sideCategories').innerHTML = categories.map(([icon,name,count])=>`<button onclick="setCategory('${name}')">${icon}<span>${name}</span><small style="margin-right:auto;color:#9aa1b2">${count}</small></button>`).join('');
}
function setCategory(name){ currentCategory=name; location.hash='products'; }
function filteredProducts(){
  const q=(searchInput.value||'').trim().toLowerCase();
  return products.filter(p=> (currentCategory==='الكل'||p.category===currentCategory) && (!q || `${p.name} ${p.category} ${p.seller}`.toLowerCase().includes(q)) );
}
function home(){
  currentCategory='الكل';
  app.innerHTML=`
    <section class="hero">
      <div class="hero-main">
        <div class="hero-tag">✦ سوق واحد — آلاف المنتجات والبائعين</div>
        <h1>اشترِ بسهولة… وابدأ البيع من نفس الحساب</h1>
        <p>منصة سوق إلكتروني متعددة البائعين مصممة لتجمع المنتجات والخدمات في واجهة واضحة، مع نظام عمولات وسحب أرباح للبائعين.</p>
        <div class="hero-actions"><button class="primary" data-route="products">تصفح المنتجات</button><button class="secondary" data-route="seller">ابدأ البيع</button></div>
      </div>
      <div class="hero-art">
        <div class="art-top"><b>ملخص المنصة</b><small>اليوم</small></div>
        <div class="art-card"><div class="art-img">🛒</div><div><small>طلبات نشطة</small><div class="price">1,284</div><div class="rating">↑ 12.8% هذا الأسبوع</div></div></div>
        <div><small style="color:var(--muted);font-size:9px">حالة السوق</small><div class="art-progress"><span></span></div></div>
      </div>
    </section>

    <section class="section"><div class="section-head"><div><h2>تسوق حسب القسم</h2><p>اختَر ما تبحث عنه في ثوانٍ</p></div><button class="link-btn" data-route="products">كل الأقسام ←</button></div>
      <div class="categories">${categories.map(([icon,name,count])=>`<button class="cat-card" onclick="setCategory('${name}')"><div class="cat-icon">${icon}</div><b>${name}</b><small>${count} منتج</small></button>`).join('')}</div>
    </section>

    <section class="section"><div class="section-head"><div><h2>منتجات مميزة</h2><p>اختيارات تجريبية لواجهة السوق</p></div><button class="link-btn" data-route="products">عرض الكل ←</button></div><div class="product-grid">${products.slice(0,4).map(productCard).join('')}</div></section>

    <section class="section"><div class="section-head"><div><h2>لماذا سوقنا؟</h2><p>تجربة واحدة للمشتري والبائع والإدارة</p></div></div><div class="trust-grid">
      <div class="trust"><div class="t-icon">🛡️</div><div><b>حسابات وصلاحيات</b><p>مشتري، بائع، وإدارة ضمن نظام واضح.</p></div></div>
      <div class="trust"><div class="t-icon">💸</div><div><b>عمولة تلقائية</b><p>حساب نسبة المنصة لكل عملية بيع.</p></div></div>
      <div class="trust"><div class="t-icon">📦</div><div><b>تتبع الطلب</b><p>من إنشاء الطلب حتى التسليم.</p></div></div>
      <div class="trust"><div class="t-icon">📲</div><div><b>سحب الأرباح</b><p>البائع يطلب التحويل برقم طلب ورقم هاتف.</p></div></div>
    </div></section>`;
}
function productsPage(){
  const list=filteredProducts();
  app.innerHTML=`<section class="section"><div class="page-head"><div><h1>كل المنتجات</h1><p>تصفح المنتجات وابحث حسب الاسم أو القسم.</p></div><div class="filters"><button class="filter-btn ${currentCategory==='الكل'?'active':''}" onclick="setAll()">الكل</button>${categories.map(x=>`<button class="filter-btn ${currentCategory===x[1]?'active':''}" onclick="setCategory('${x[1]}')">${x[0]} ${x[1]}</button>`).join('')}</div></div></section>
  <section class="section"><div class="product-grid">${list.length?list.map(productCard).join(''):`<div class="empty" style="grid-column:1/-1">لا توجد منتجات مطابقة لبحثك.</div>`}</div></section>`;
}
function setAll(){ currentCategory='الكل'; location.hash='products'; }
function cartPage(){
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0); const commission=0; 
  app.innerHTML=`<section class="section"><div class="page-head"><div><h1>السلة</h1><p>${cart.length?`لديك ${cart.reduce((s,i)=>s+i.qty,0)} من المنتجات في السلة.`:'السلة فارغة حاليًا.'}</p></div><button class="secondary" data-route="products">متابعة التسوق</button></div></section>
  <section class="section">${cart.length?`<div class="panel"><div class="panel-head"><h3>منتجات السلة</h3><span style="font-size:10px;color:var(--muted)">${money(total)}</span></div><div class="table-wrap"><table class="table"><thead><tr><th>المنتج</th><th>السعر</th><th>الكمية</th><th>الإجمالي</th><th></th></tr></thead><tbody>${cart.map((i,idx)=>`<tr><td><b>${i.icon} ${i.name}</b><br><small style="color:#9aa1b2">${i.id}</small></td><td>${money(i.price)}</td><td><div class="quantity"><button onclick="changeQty(${idx},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${idx},1)">+</button></div></td><td>${money(i.price*i.qty)}</td><td><button onclick="removeCart(${idx})" style="color:var(--danger)">حذف</button></td></tr>`).join('')}</tbody></table></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px"><div><small style="color:var(--muted)">الإجمالي</small><div style="font-size:25px;font-weight:800">${money(total)}</div></div><button class="primary" style="padding:0 22px" onclick="toast('تم إنشاء طلب تجريبي — سنربط الدفع لاحقًا')">إتمام الطلب</button></div></div>`:`<div class="empty">🛒<h3 style="color:var(--ink)">لا توجد منتجات</h3><p>أضف منتجات من صفحة السوق وستظهر هنا.</p><button class="primary" style="padding:0 18px" data-route="products">تصفح المنتجات</button></div>`}</section>`;
}
function sellerPage(){
  app.innerHTML=`<section class="section"><div class="page-head"><div><h1>لوحة البائع</h1><p>إدارة منتجاتك ومتابعة أرباحك وطلبات السحب.</p></div><button class="primary" style="padding:0 16px" onclick="toast('سيتم فتح نموذج إضافة منتج')">+ إضافة منتج</button></div></section>
  <section class="section dashboard"><div class="stats"><div class="stat"><div class="stat-top"><small>المبيعات</small><div class="stat-icon">🧾</div></div><strong>18,450 ₪</strong><span class="up">↑ 8.4%</span></div><div class="stat"><div class="stat-top"><small>الرصيد المتاح</small><div class="stat-icon">💰</div></div><strong>4,280 ₪</strong><span class="up">جاهز للسحب</span></div><div class="stat"><div class="stat-top"><small>الطلبات</small><div class="stat-icon">📦</div></div><strong>72</strong><span class="up">11 طلبًا جديدًا</span></div><div class="stat"><div class="stat-top"><small>تقييم المتجر</small><div class="stat-icon">⭐</div></div><strong>4.8</strong><span class="up">من 5</span></div></div>
  <div class="withdraw-box"><div class="balance"><small>الرصيد المتاح للسحب</small><strong>4,280 ₪</strong><span>بعد خصم عمولة المنصة</span></div><div class="panel withdraw-form"><b>طلب تحويل الأرباح</b><label>رقم الطلب / العملية<input placeholder="مثال: ORD-10482" id="withdrawOrder"></label><label>رقم الهاتف للتحويل<input placeholder="059 XXX XXXX" id="withdrawPhone"></label><button class="primary" onclick="submitWithdraw()">إرسال طلب التحويل</button></div></div>
  <div class="panel"><div class="panel-head"><h3>آخر الطلبات</h3><button class="link-btn">عرض الكل</button></div><div class="table-wrap"><table class="table"><thead><tr><th>رقم الطلب</th><th>المنتج</th><th>الإجمالي</th><th>العمولة</th><th>المستحق</th><th>الحالة</th></tr></thead><tbody>${[['#ORD-10482','هاتف ذكي Pro X',1290,64.5,1225.5,'قيد التنفيذ'],['#ORD-10477','سماعات لاسلكية',240,12,228,'مكتمل'],['#ORD-10465','حقيبة ظهر مدرسية',170,8.5,161.5,'مكتمل']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${money(r[2])}</td><td>${money(r[3])}</td><td><b>${money(r[4])}</b></td><td><span class="status ${r[5]==='مكتمل'?'green':'yellow'}">${r[5]}</span></td></tr>`).join('')}</tbody></table></div></div></section>`;
}
function submitWithdraw(){ const order=document.getElementById('withdrawOrder').value.trim(),phone=document.getElementById('withdrawPhone').value.trim(); if(!order||!phone){toast('أدخل رقم الطلب ورقم الهاتف أولًا');return;} toast('تم إرسال طلب السحب للإدارة بنجاح'); document.getElementById('withdrawOrder').value=''; document.getElementById('withdrawPhone').value=''; }
function adminPage(){
  app.innerHTML=`<section class="section"><div class="page-head"><div><h1>لوحة الإدارة</h1><p>مراقبة المنصة، المنتجات، العمولات، وطلبات تحويل أرباح البائعين.</p></div><span class="status green">النظام يعمل</span></div></section>
  <section class="section dashboard"><div class="stats"><div class="stat"><div class="stat-top"><small>إجمالي المبيعات</small><div class="stat-icon">💳</div></div><strong>128,760 ₪</strong><span class="up">↑ 14.2%</span></div><div class="stat"><div class="stat-top"><small>عمولات المنصة</small><div class="stat-icon">%</div></div><strong>6,438 ₪</strong><span class="up">5% متوسط العمولة</span></div><div class="stat"><div class="stat-top"><small>البائعون</small><div class="stat-icon">👥</div></div><strong>486</strong><span class="up">+23 هذا الشهر</span></div><div class="stat"><div class="stat-top"><small>طلبات السحب</small><div class="stat-icon">📲</div></div><strong>17</strong><span class="up">بانتظار المعالجة</span></div></div>
  <div class="panel"><div class="panel-head"><h3>طلبات سحب الأرباح</h3><button class="secondary" style="padding:0 12px" onclick="toast('تم تحديث القائمة')">تحديث</button></div><div class="table-wrap"><table class="table"><thead><tr><th>البائع</th><th>رقم الطلب</th><th>الهاتف</th><th>المستحق</th><th>العمولة</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${[['متجر التقنية','#ORD-10482','0591234567',1225.5,64.5,'بانتظار التحويل'],['مزرعة الخير','#ORD-10450','0597654321',285,15,'بانتظار التحويل'],['بيت الأناقة','#ORD-10427','0599876123',513,27,'تم التحويل']].map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td><b>${money(r[3])}</b></td><td>${money(r[4])}</td><td><span class="status ${r[5]==='تم التحويل'?'green':'yellow'}">${r[5]}</span></td><td>${r[5]==='تم التحويل'?'<span style="color:var(--green);font-size:9px">✓ مكتمل</span>':`<button class="primary" style="height:30px;padding:0 10px;font-size:9px" onclick="confirmTransfer('${r[1]}')">تأكيد التحويل</button>`}</td></tr>`).join('')}</tbody></table></div></div>
  <div class="withdraw-box"><div class="panel"><div class="panel-head"><h3>العمولة الحالية</h3></div><div style="display:flex;align-items:center;gap:14px"><div class="stat-icon" style="width:52px;height:52px;font-size:22px">%</div><div><div style="font-size:30px;font-weight:800">5%</div><small style="font-size:9px;color:var(--muted)">يتم خصمها من صافي كل عملية بيع</small></div></div><button class="secondary full" style="margin-top:14px" onclick="toast('يمكن ربط هذا الزر بإعدادات العمولة')">تعديل النسبة</button></div><div class="panel"><div class="panel-head"><h3>إحصائيات سريعة</h3></div><div class="info-row"><span>منتجات قيد المراجعة</span><b>34</b></div><div class="info-row"><span>طلبات جديدة</span><b>58</b></div><div class="info-row"><span>حسابات بانتظار التحقق</span><b>12</b></div><div class="info-row"><span>عمليات التحويل هذا الشهر</span><b>284</b></div></div></div></section>`;
}
function showProduct(id){ const p=products.find(x=>x.id===id); if(!p)return; document.getElementById('productModalBody').innerHTML=`<div class="modal-product"><div class="modal-product-media">${p.icon}</div><div><span class="status green">متوفر ${p.stock} قطعة</span><h2>${p.name}</h2><div class="rating">★ ${p.rating} • ${p.seller}</div><div class="modal-price">${money(p.price)}</div><p>${p.desc}</p><div class="info-row"><span>القسم</span><b>${p.category}</b></div><div class="info-row"><span>رمز المنتج</span><b>${p.id}</b></div><div class="info-row"><span>البائع</span><b>${p.seller}</b></div><button class="primary full" style="margin-top:16px" onclick="addToCart('${p.id}');closeModal('productModal')">أضف للسلة</button></div></div>`; document.getElementById('productModal').classList.add('show'); document.getElementById('productModal').setAttribute('aria-hidden','false'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); document.getElementById(id).setAttribute('aria-hidden','true'); }
function addToCart(id){ const p=products.find(x=>x.id===id); if(!p)return; const ex=cart.find(x=>x.id===id); if(ex)ex.qty++; else cart.push({...p,qty:1}); saveCart(); toast(`تمت إضافة «${p.name}» إلى السلة`); }
function removeCart(index){ cart.splice(index,1); saveCart(); render(); }
function changeQty(index,delta){ cart[index].qty=Math.max(1,cart[index].qty+delta); saveCart(); render(); }
function render(){ const page=(location.hash||'#home').replace('#','')||'home'; document.querySelectorAll('[data-route]').forEach(()=>{}); if(page==='home')home(); else if(page==='products')productsPage(); else if(page==='cart')cartPage(); else if(page==='seller')sellerPage(); else if(page==='admin')adminPage(); else home(); document.querySelectorAll('.side-link').forEach(btn=>btn.classList.toggle('active',btn.dataset.route===page)); window.scrollTo({top:0,behavior:'instant'}); }

document.addEventListener('click',e=>{ const route=e.target.closest('[data-route]')?.dataset.route; if(route){e.preventDefault();location.hash=route;document.getElementById('sidebar').classList.remove('open');} const close=e.target.closest('[data-close]')?.dataset.close; if(close)closeModal(close); if(e.target.classList.contains('modal')) closeModal(e.target.id); });
searchInput.addEventListener('input',()=>{ if((location.hash||'#home')==='#home'){location.hash='products'} else render(); });
document.getElementById('accountBtn').addEventListener('click',()=>document.getElementById('accountModal').classList.add('show'));
document.getElementById('notifBtn').addEventListener('click',()=>toast('لديك 3 إشعارات جديدة'));
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('demoLogin').addEventListener('click',()=>{closeModal('accountModal');toast('تم تسجيل الدخول بوضع العرض التجريبي');});
window.addEventListener('hashchange',render);
renderCategories(); updateCartCount(); render();

window.addToCart=addToCart;window.showProduct=showProduct;window.closeModal=closeModal;window.changeQty=changeQty;window.removeCart=removeCart;window.setCategory=setCategory;window.setAll=setAll;window.submitWithdraw=submitWithdraw;window.confirmTransfer=(order)=>toast(`تم تأكيد تحويل ${order} وتسجيل العملية في النظام`);window.toast=toast;
