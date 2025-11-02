/* assets/orders.js */
(function () {
    if (window.__ordersRegistered) return;
    window.__ordersRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/orders/list" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='list'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Order List</a>
        <a href="#/orders/new" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='new'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">New Order</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue:'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        amber:'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        violet:'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
        emerald:'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.blue}">${text}</span>`;
    };
  
    const Input = (placeholder='') => `<input placeholder="${placeholder}" class="w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>`;
    const Select = (placeholder='') => `
      <div class="relative">
        <select class="w-full px-3 py-2 pr-9 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100">
          <option>${placeholder}</option>
        </select>
        <svg class="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
      </div>`;
  
    const Field = (label, inner, req=false) => `
      <div>
        <label class="block text-sm font-medium text-slate-700">${label}${req?'<span class="text-red-500">*</span>':''}</label>
        <div class="mt-1">${inner}</div>
      </div>`;
  
    /* ------------ Order List ------------- */
    function renderList() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Order Management</h1>
            <p class="text-slate-500 text-sm mt-1">Track and manage all orders from creation to delivery</p>
          </div>
          <a href="#/orders/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            New Order
          </a>
        </div>
        <div class="mt-5">${Pills('list')}</div>`;
  
      const search = `
        <div class="mt-6 card p-3 flex items-center justify-between">
          <div class="relative w-full">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search orders by ID, customer, or product..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
          <div class="ml-4">
            <select class="rounded-xl border px-3 py-2 text-sm">
              <option>Filter by status</option>
              <option>Measurement</option>
              <option>Tailor</option>
              <option>Delivery</option>
            </select>
          </div>
        </div>`;
  
      const kpis = `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Total Orders</div><div class="mt-1 text-2xl font-semibold">3</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">In Progress</div><div class="mt-1 text-2xl font-semibold text-amber-600">3</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Completed</div><div class="mt-1 text-2xl font-semibold text-emerald-600">0</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Pending Amount</div><div class="mt-1 text-2xl font-semibold text-rose-600">₹15,000</div></div>
        </div>`;
  
      const rows = [
        {
          order:'ORD-2024-001', product:'Premium Silk Curtains', qty:2,
          customer:'Sarah Johnson', date:'2024-01-15', status:Badge('blue','Measurement'),
          payment:Badge('blue','Partial'), paid:'₹10,000 / ₹25,000', staff:'Raj Kumar', del:'2024-02-15'
        },
        {
          order:'ORD-2024-002', product:'Office Sofa Set', qty:1,
          customer:'Rajesh Kumar', date:'2024-01-10', status:Badge('amber','Tailor'),
          payment:Badge('emerald','Paid'), paid:'₹45,000 / ₹45,000', staff:'Priya Singh', del:'2024-02-10'
        },
        {
          order:'ORD-2024-003', product:'Venetian Blinds', qty:4,
          customer:'Priya Sharma', date:'2024-01-05', status:Badge('violet','Delivery'),
          payment:Badge('emerald','Paid'), paid:'₹9,000 / ₹18,000', staff:'Amit Patel', del:'2024-02-05'
        }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Assigned Staff</th>
                  <th>Delivery Date</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r=>`
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.order}</div>
                      <div class="text-xs text-slate-500">${r.product}</div>
                      <div class="text-[11px] text-slate-400">Qty: ${r.qty}</div>
                    </td>
                    <td>
                      <div class="font-medium">${r.customer}</div>
                      <div class="text-xs text-slate-500">Ordered: ${r.date}</div>
                    </td>
                    <td>${r.status}</td>
                    <td>
                      <div class="space-y-1">${r.payment}<div class="text-xs text-slate-500">${r.paid}</div></div>
                    </td>
                    <td>${r.staff}</td>
                    <td>${r.del}</td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="View"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Edit"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21h18"/><path d="M7.5 17.5 17 8a2.121 2.121 0 1 0-3-3L4.5 14.5 3 21l6.5-1.5Z"/></svg></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
  
      app().innerHTML = header + search + kpis + table;
    }
  
    /* ------------ New Order ------------- */
    function renderNew() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Order Management</h1>
            <p class="text-slate-500 text-sm mt-1">Track and manage all orders from creation to delivery</p>
          </div>
          <a href="#/orders/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            New Order
          </a>
        </div>
        <div class="mt-5">${Pills('new')}</div>`;
  
      const form = `
        <div class="card mt-6 p-6 space-y-6">
          <h3 class="font-semibold">Create New Order</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${Field('Customer', Select('Select customer'), true)}
            ${Field('Product', Select('Select product'), true)}
            ${Field('Quantity', Input('1'))}
            ${Field('Fabric/Material', Input('Enter fabric type'))}
          </div>
  
          ${Field('Color or Design Reference', `<div class="flex gap-2">${Input('Enter color or description')}<button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50 text-sm"><svg class="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg> Upload Image</button></div>`)}
  
          <div class="flex items-center gap-2 mt-3">
            <input type="checkbox" id="advance" class="rounded border-slate-300">
            <label for="advance" class="text-sm text-slate-600">Advance Payment</label>
          </div>
  
          ${Field('Delivery Address', Input('Enter delivery address'))}
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${Field('Assign Measurement Staff', Select('Select staff'))}
            ${Field('Expected Delivery Date', `<input type="date" class="w-full px-3 py-2 rounded-xl border focus:ring-4 focus:ring-brand-100"/>`)}
          </div>
  
          <div class="flex items-center justify-end gap-3 pt-4">
            <a href="#/orders/list" class="px-4 py-2 rounded-xl border bg-white hover:bg-slate-50">Cancel</a>
            <button class="px-4 py-2 rounded-xl bg-brand-600 text-white shadow-soft">Create Order</button>
          </div>
        </div>`;
  
      app().innerHTML = header + form;
    }
  
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/orders' || h === '/orders/list') renderList();
      else if (h === '/orders/new') renderNew();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/orders')) onRoute();
  })();
  