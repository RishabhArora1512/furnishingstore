/* assets/customers.js */
(function () {
    if (window.__customersRegistered) return;
    window.__customersRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/customers/list" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='list'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Customer List</a>
        <a href="#/customers/new"  class="px-3.5 py-1.5 text-sm rounded-xl ${active==='new'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Add Customer</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue:   'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        green:  'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        amber:  'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        slate:  'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200',
        violet: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
        red:    'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.blue}">${text}</span>`;
    };
  
    /* ---------- LIST ---------- */
    function renderList() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Customer Management</h1>
            <p class="text-slate-500 text-sm mt-1">Manage your customer database and relationships</p>
          </div>
          <a href="#/customers/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Customer
          </a>
        </div>
        <div class="mt-5">${Pills('list')}</div>
      `;
  
      const search = `
        <div class="mt-6 card p-3">
          <div class="relative">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search customers by name, phone, or email..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
        </div>
      `;
  
      const kpis = `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Customers</div><div class="mt-1 text-2xl font-semibold">4</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Active Customers</div><div class="mt-1 text-2xl font-semibold">3</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Avg. Orders</div><div class="mt-1 text-2xl font-semibold">10</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">New This Month</div><div class="mt-1 text-2xl font-semibold">3</div></div>
        </div>
      `;
  
      const rows = [
        {
          name:'Sarah Johnson', code:'CUST-001', orders:12, status: Badge('blue','Active'),
          phone:'+91 98765 43210', email:'sarah.johnson@email.com', addr:'123 Main Street, Mumbai, Maharashtra 400001',
          note:'Prefers premium fabrics, regular customer'
        },
        {
          name:'Rajesh Kumar', code:'CUST-002', orders:8, status: Badge('blue','Active'),
          phone:'+91 87654 32109', email:'rajesh.kumar@email.com', addr:'456 Park Avenue, Delhi, Delhi 110001',
          note:'Corporate client, bulk orders'
        },
        {
          name:'Priya Sharma', code:'CUST-003', orders:15, status: Badge('blue','Active'),
          phone:'+91 76543 21098', email:'priya.sharma@email.com', addr:'789 Garden Lane, Bangalore, Karnataka 560001',
          note:'Interior designer, prefers contemporary styles'
        },
        {
          name:'Mohammed Ali', code:'CUST-004', orders:6, status: Badge('slate','Inactive'),
          phone:'+91 65432 10987', email:'mohammed.ali@email.com', addr:'321 Beach Road, Chennai, Tamil Nadu 600001',
          note:'Hospitality industry client'
        }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Customer</th>
                  <th>Contact</th>
                  <th>Orders</th>
                  <th>Status</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.name}</div>
                      <div class="text-xs text-slate-500">${r.code}</div>
                      <div class="text-[11px] text-slate-400">${r.note}</div>
                    </td>
                    <td>
                      <div class="text-sm flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.77.73 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.27a2 2 0 0 1 2.11-.45c.81.36 1.68.61 2.58.73A2 2 0 0 1 22 16.92Z"/></svg>
                        ${r.phone}
                      </div>
                      <div class="text-sm flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z" opacity=".2"/><path d="M22 6.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5M22 6.5l-10 7-10-7"/></svg>
                        ${r.email}
                      </div>
                      <div class="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                        ${r.addr}
                      </div>
                    </td>
                    <td class="font-medium">${r.orders}</td>
                    <td>${r.status}</td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Edit">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21h18"/><path d="M7.5 17.5 17 8a2.121 2.121 0 1 0-3-3L4.5 14.5 3 21z"/></svg>
                        </button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Delete">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
  
      app().innerHTML = header + search + kpis + table;
    }
  
    /* ---------- ADD NEW ---------- */
    function field(label, inner, required=false) {
      return `
        <div>
          <label class="block text-sm font-medium text-slate-700">${label}${required?'<span class="text-red-500"> *</span>':''}</label>
          <div class="mt-1">${inner}</div>
        </div>`;
    }
    const input = (ph='') => `<input class="w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="${ph}"/>`;
    const textarea = (ph='') => `<textarea rows="3" class="w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="${ph}"></textarea>`;
  
    function renderNew() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Customer Management</h1>
            <p class="text-slate-500 text-sm mt-1">Manage your customer database and relationships</p>
          </div>
          <a href="#/customers/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Customer
          </a>
        </div>
        <div class="mt-5">${Pills('new')}</div>
      `;
  
      const form = `
        <div class="card mt-6 p-5 space-y-5">
          <h3 class="font-semibold">Add New Customer</h3>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${field('Customer Name', input('Enter customer name'), true)}
            ${field('Phone Number', input('+91 XXXXX XXXXX'), true)}
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
            ${field('Email Address', input('customer@email.com'))}
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
            ${field('Address', input('Enter complete address'))}
          </div>
  
          ${field('Notes', textarea('Additional notes about customer preferences'))}
  
          <div class="flex items-center justify-end gap-3">
            <a href="#/customers/list" class="px-4 py-2 rounded-xl border bg-white hover:bg-slate-50">Cancel</a>
            <button class="px-4 py-2 rounded-xl bg-brand-600 text-white shadow-soft">Save Customer</button>
          </div>
        </div>
      `;
  
      app().innerHTML = header + form;
    }
  
    /* ---------- ROUTER ---------- */
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/customers' || h === '/customers/list') renderList();
      else if (h === '/customers/new') renderNew();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/customers')) onRoute();
  })();
  