/* assets/app.js */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* modal core */
/* modal core */
(() => {
  if (window.__fpModalBootstrapped) return;
  window.__fpModalBootstrapped = true;

  const overlay = document.createElement('div');
  overlay.id = 'fp-modal-overlay';
  overlay.className = 'fixed inset-0 z-[100] hidden';
  overlay.innerHTML = `
    <div class="absolute inset-0 bg-slate-900/60"></div>
    <div class="relative h-full w-full grid place-items-center p-4">
      <div id="fp-modal-host"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const store = {};
  // plural API
  window.fpRegisterModals = (arr) => {
    arr.forEach(m => { store[m.id] = m.html; });
  };
  // ✅ backward-compatible alias for files calling fpRegisterModal(id, html)
  window.fpRegisterModal = (id, html) => {
    window.fpRegisterModals([{ id, html }]);
  };

  window.fpOpenModal = (id) => {
    const html = store[id];
    if (!html) return;
    const host = document.getElementById('fp-modal-host');
    host.innerHTML = html;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.fpCloseAllModals = () => {
    const host = document.getElementById('fp-modal-host');
    host.innerHTML = '';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      e.preventDefault();
      const id = openBtn.getAttribute('data-modal-open');
      if (id) window.fpOpenModal(id);
      return;
    }
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      e.preventDefault();
      window.fpCloseAllModals();
      return;
    }
    if (e.target.id === 'fp-modal-overlay') window.fpCloseAllModals();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.fpCloseAllModals();
  });

  window.fpBindModals = function(){};
})();


/* nav active helper */
function setActiveNav() {
  const hash = location.hash.replace(/^#\//, '') || 'dashboard';
  const top = hash.split('/')[0];
  $$('#sidebar [data-route]').forEach(a => {
    const r = a.getAttribute('data-route');
    const match = r === hash || r === top || hash.startsWith(r + '/');
    a.classList.toggle('active', !!match);
  });
}

/* layout helpers */
function card(inner){ return `<div class="card shadow-card">${inner}</div>` }

/* dashboard */
function renderDashboard(app){
  app.innerHTML = `
    <div class="card p-6 bg-gradient-to-r from-slate-50 to-amber-50/50 border-0">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-slate-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
      ${card(`
        <div class="kpi">
          <div class="title">New Orders</div>
          <div class="value flex items-center gap-2">15 <span class="badge bg-emerald-50 text-emerald-700">+12% vs yesterday</span></div>
        </div>
      `)}
      ${card(`
        <div class="kpi">
          <div class="title">Orders In Progress</div>
          <div class="value flex items-center gap-2">32 <i data-lucide="clock-8" class="h-5 w-5 text-amber-500"></i></div>
          <div class="text-xs text-slate-500">Average 5 days</div>
        </div>
      `)}
      ${card(`
        <div class="kpi">
          <div class="title">Completed Orders</div>
          <div class="value flex items-center gap-2">28 <i data-lucide="check-circle-2" class="h-5 w-5 text-emerald-600"></i></div>
          <div class="text-xs text-slate-500">98% satisfaction</div>
        </div>
      `)}
      ${card(`
        <div class="kpi">
          <div class="title">Pending Payments</div>
          <div class="value flex items-center gap-2">₹1.2L <span class="badge bg-rose-50 text-rose-700">8 overdue</span></div>
        </div>
      `)}
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
      ${card(`<div class="p-4">
        <div class="font-semibold mb-2">Orders by Status</div>
        <canvas id="pie"></canvas>
      </div>`)}
      ${card(`<div class="p-4">
        <div class="font-semibold mb-2">Revenue Trend</div>
        <canvas id="line"></canvas>
      </div>`)}
      ${card(`<div class="p-4">
        <div class="font-semibold mb-2">Delays by Department</div>
        <canvas id="bar"></canvas>
      </div>`)}
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
      ${card(`<div class="p-4">
        <div class="font-semibold mb-3">Quick Stats</div>
        <div class="stat-list space-y-3">
          <div class="item"><i data-lucide="users" class="text-brand-600"></i><div><div class="font-medium">Total Customers</div><div class="text-xs text-slate-500">Active customers</div></div><div class="ml-auto font-semibold">247</div></div>
          <div class="item bg-emerald-50/40 border-emerald-100"><i data-lucide="package" class="text-emerald-600"></i><div><div class="font-medium">Products</div><div class="text-xs text-slate-500">12 categories</div></div><div class="ml-auto font-semibold">89</div></div>
          <div class="item bg-amber-50/40 border-amber-100"><i data-lucide="timer" class="text-amber-600"></i><div><div class="font-medium">Avg. Completion</div><div class="text-xs text-slate-500">Time per order</div></div><div class="ml-auto font-semibold">7.2 days</div></div>
        </div>
      </div>`)}

      ${card(`<div class="p-4">
        <div class="font-semibold mb-3">Recent Notifications</div>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span> New order received from Sarah Johnson <span class="ml-auto text-slate-400">5 minutes ago</span></li>
          <li class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Payment overdue for Order #ORD-2024-055 <span class="ml-auto text-slate-400">1 hour ago</span></li>
          <li class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Tailor completed Order #ORD-2024-042 <span class="ml-auto text-slate-400">2 hours ago</span></li>
        </ul>
      </div>`)}
    </div>
  `;

  if (window.Chart) {
    new Chart($('#pie'), {
      type: 'pie',
      data: {
        labels: ['New Orders: 15','In Progress: 32','Completed: 28','Delayed: 8'],
        datasets: [{ data:[15,32,28,8] }]
      },
      options: { plugins:{ legend:{ position:'bottom' } } }
    });
    new Chart($('#line'), {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{ label:'Revenue', data:[42000,52000,47000,62000,56000,71000], tension:.4 }]
      },
      options: { plugins:{ legend:{ display:false } }, scales:{ y:{ ticks:{ callback:v=>'₹'+v.toLocaleString() }}} }
    });
    new Chart($('#bar'), {
      type: 'bar',
      data: { labels:['Vendor','Tailor','Measurement'], datasets:[{ label:'Delays', data:[5,12,7]}] },
      options:{ plugins:{ legend:{ display:false }}, scales:{ y:{ beginAtZero:true } } }
    });
  }
}

/* stub pages for simple routes kept here (others handled by their own files) */
function renderCustomers(app){
  app.innerHTML = `
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-semibold">Customers</h1>
      <span class="badge bg-slate-100 text-slate-700">Active · 247</span>
      <button class="ml-auto px-3 py-2 rounded-lg bg-brand-600 text-white shadow-soft text-sm flex items-center gap-2" data-modal-open="addCustomer"><i data-lucide="plus"></i> Add Customer</button>
    </div>
    <div class="card mt-4 p-0 overflow-hidden">
      <table class="table">
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Orders</th><th></th></tr></thead>
        <tbody class="divide-y divide-slate-100">
          ${[
            ['Sarah Johnson','+91 98765 43210','sarah@demo.com',12],
            ['Arjun Mehta','+91 99887 66554','arjun@demo.com',9],
            ['Priya Nair','+91 90909 80808','priya@demo.com',4]
          ].map(r => `<tr class="hover:bg-slate-50"><td class="font-medium">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="text-right"><button class="text-brand-600 hover:underline text-sm">View</button></td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;

  fpRegisterModals([{
    id: 'addCustomer',
    html: `
      <div class="w-full max-w-xl rounded-2xl bg-white shadow-card border p-5">
        <div class="flex items-start gap-3">
          <div class="h-9 w-9 rounded-lg bg-emerald-100 grid place-items-center text-emerald-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg>
          </div>
          <div class="flex-1">
            <div class="font-semibold">Add New Customer</div>
            <p class="text-sm text-slate-600 mt-1">Create a quick customer record.</p>
          </div>
          <button class="p-1.5 rounded-lg hover:bg-slate-100" data-modal-close>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 9-6 6M9 9l6 6"/></svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input placeholder="Full Name" class="px-3 py-2 rounded-xl border">
          <input placeholder="Phone" class="px-3 py-2 rounded-xl border">
          <input placeholder="Email" class="px-3 py-2 rounded-xl border md:col-span-2">
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50" data-modal-close>Cancel</button>
          <button class="px-3 py-2 rounded-xl bg-brand-600 text-white" data-modal-close>Save</button>
        </div>
      </div>
    `
  }]);
}

function renderOrders(app){
  app.innerHTML = `
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-semibold">Orders</h1>
      <button class="ml-auto px-3 py-2 rounded-lg bg-brand-600 text-white shadow-soft text-sm flex items-center gap-2" data-modal-open="newOrder"><i data-lucide="file-plus-2"></i> New Order</button>
    </div>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      ${['#ORD-2024-055','#ORD-2024-056','#ORD-2024-057','#ORD-2024-058','#ORD-2024-059','#ORD-2024-060'].map((n,i)=>`
        <div class="card p-4">
          <div class="flex items-center gap-2">
            <div class="h-9 w-9 rounded-lg bg-slate-100 grid place-items-center"><i data-lucide="receipt-text"></i></div>
            <div class="font-semibold">${n}</div>
            <span class="ml-auto badge ${i%3===0?'bg-amber-50 text-amber-700': i%3===1?'bg-emerald-50 text-emerald-700':'bg-blue-50 text-blue-700'}">
              ${i%3===0?'In Progress': i%3===1?'Completed':'New'}
            </span>
          </div>
          <div class="text-sm text-slate-500 mt-2">Customer: ${['Sarah','Arjun','Priya'][i%3]}</div>
          <div class="text-sm text-slate-500">Total: ₹${(Math.random()*5000+1500|0).toLocaleString()}</div>
        </div>
      `).join('')}
    </div>
  `;

  fpRegisterModals([{
    id: 'newOrder',
    html: `
      <div class="w-full max-w-2xl rounded-2xl bg-white shadow-card border p-5">
        <div class="flex items-start gap-3">
          <div class="h-9 w-9 rounded-lg bg-blue-100 grid place-items-center text-blue-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h13M3 12h13M3 17h13M16 5l5 5-5 5"/></svg>
          </div>
          <div class="flex-1">
            <div class="font-semibold">Create Order</div>
            <p class="text-sm text-slate-600 mt-1">Quick new order form.</p>
          </div>
          <button class="p-1.5 rounded-lg hover:bg-slate-100" data-modal-close>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 9-6 6M9 9l6 6"/></svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input placeholder="Customer Name" class="px-3 py-2 rounded-xl border">
          <input placeholder="Order Total" class="px-3 py-2 rounded-xl border">
          <input placeholder="Due Date" class="px-3 py-2 rounded-xl border md:col-span-2">
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50" data-modal-close>Cancel</button>
          <button class="px-3 py-2 rounded-xl bg-brand-600 text-white" data-modal-close>Create</button>
        </div>
      </div>
    `
  }]);
}

function renderProducts(app){
  app.innerHTML = `
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-semibold">Products</h1>
      <button class="ml-auto px-3 py-2 rounded-lg bg-brand-600 text-white shadow-soft text-sm flex items-center gap-2" data-modal-open="addProduct"><i data-lucide="plus"></i> Add Product</button>
    </div>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      ${['Curtain Fabric','Sofa Fabric','Blinds','Cushion','Rods & Tracks','Accessories'].map((p,i)=>`
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-slate-100 grid place-items-center"><i data-lucide="package"></i></div>
            <div>
              <div class="font-medium">${p}</div>
              <div class="text-xs text-slate-500">${[12,8,6,18,24,14][i]} items</div>
            </div>
            <div class="ml-auto text-xs px-2 py-1 rounded-full ${i%2?'bg-emerald-50 text-emerald-700':'bg-sky-50 text-sky-700'}">${i%2?'In Stock':'Low Stock'}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  fpRegisterModals([{
    id: 'addProduct',
    html: `
      <div class="w-full max-w-xl rounded-2xl bg-white shadow-card border p-5">
        <div class="flex items-start gap-3">
          <div class="h-9 w-9 rounded-lg bg-violet-100 grid place-items-center text-violet-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg>
          </div>
          <div class="flex-1">
            <div class="font-semibold">Add Product</div>
            <p class="text-sm text-slate-600 mt-1">Create a catalog item.</p>
          </div>
          <button class="p-1.5 rounded-lg hover:bg-slate-100" data-modal-close>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 9-6 6M9 9l6 6"/></svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input placeholder="Product Name" class="px-3 py-2 rounded-xl border">
          <input placeholder="Category" class="px-3 py-2 rounded-xl border">
          <input placeholder="Price" class="px-3 py-2 rounded-xl border md:col-span-2">
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50" data-modal-close>Cancel</button>
          <button class="px-3 py-2 rounded-xl bg-brand-600 text-white" data-modal-close>Save</button>
        </div>
      </div>
    `
  }]);
}

/* router */
function renderRoute() {
  const hash = location.hash.replace(/^#\//, '') || 'dashboard';
  const app = $('#app');

  if (hash === 'dashboard') renderDashboard(app);
  else if (hash === 'customers') renderCustomers(app);
  else if (hash === 'orders') renderOrders(app);
  else if (hash === 'products') renderProducts(app);
  else {
    /* external modules like measurements.js, vendor.js, tailor.js, delivery.js, payments.js, reports.js handle their own hashes */
    /* keep app as-is so those scripts can render */
  }

  setActiveNav();
  if (window.lucide) lucide.createIcons();
}

/* bootstrap */
window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  $('#menuBtn')?.addEventListener('click', () => {
    const sb = $('#sidebar');
    sb.classList.toggle('hidden');
    sb.classList.toggle('fixed');
    sb.classList.toggle('top-0');
    sb.classList.toggle('left-0');
    sb.classList.toggle('h-full');
    sb.classList.toggle('z-50');
  });
  renderRoute();
});
