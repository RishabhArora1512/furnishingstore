/* assets/vendor.js */
(function () {
    if (window.__vendorRegistered) return;
    window.__vendorRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/vendor/orders"   class="px-3.5 py-1.5 text-sm rounded-xl ${active==='orders'  ?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Vendor Orders</a>
        <a href="#/vendor/tracking" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='tracking'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Transport Tracking</a>
      </div>`;
  
    const Stat = (title, value) => `
      <div class="card p-4">
        <div class="text-slate-500 text-sm">${title}</div>
        <div class="mt-1 text-2xl font-semibold">${value}</div>
      </div>`;
  
    function renderOrders() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Vendor & Transport</h1>
            <p class="text-slate-500 text-sm mt-1">Track vendor orders and manage transport logistics</p>
          </div>
          <a class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft" href="javascript:void(0)">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Vendor Dispatch
          </a>
        </div>
        <div class="mt-5">${Pills('orders')}</div>
      `;
  
      const search = `
        <div class="mt-6 card p-3">
          <div class="relative">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search by Order ID, vendor, or AWB..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
        </div>
      `;
  
      const kpis = `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          ${Stat('Total Dispatches','3')}
          ${Stat('In Transit','1')}
          ${Stat('Delivered','1')}
          ${Stat('Delayed','1')}
        </div>
      `;
  
      const rows = [
        { order:'ORD-2024-001', code:'VND-001', vendor:'Premium Textiles Ltd.', transport:'Air',  awb:'AI–789456123', status:'In Transit',  date:'2024-01-22' },
        { order:'ORD-2024-002', code:'VND-002', vendor:'Fabric World Inc.',    transport:'Land', awb:'TRK–456789012', status:'Delivered',  date:'2024-01-20' },
        { order:'ORD-2024-003', code:'VND-003', vendor:'Quality Blinds Co.',   transport:'Train', awb:'IRN–123456789', status:'Delayed',    date:'2024-01-25' },
      ];
  
      const badge = (s) => ({
        'In Transit':'bg-amber-50 text-amber-700',
        'Delivered':'bg-emerald-50 text-emerald-700',
        'Delayed':'bg-rose-50 text-rose-700'
      })[s] || 'bg-slate-100 text-slate-700';
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Vendor</th>
                  <th>Transport</th>
                  <th>AWB Number</th>
                  <th>Status</th>
                  <th>Delivery Date</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.order}</div>
                      <div class="text-[11px] text-slate-500">${r.code}</div>
                    </td>
                    <td>${r.vendor}</td>
                    <td>${r.transport}</td>
                    <td>${r.awb}</td>
                    <td><span class="badge ${badge(r.status)}">${r.status}</span></td>
                    <td><span class="flex items-center gap-2"><svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>${r.date}</span></td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="View"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Track"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 12H2"/><path d="m15 5-7 14"/></svg></button>
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
  
    function renderTracking() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Vendor & Transport</h1>
            <p class="text-slate-500 text-sm mt-1">Track vendor orders and manage transport logistics</p>
          </div>
          <a class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft" href="javascript:void(0)">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Vendor Dispatch
          </a>
        </div>
        <div class="mt-5">${Pills('tracking')}</div>
      `;
  
      const card = (status, mode, title, expected, items) => `
        <div class="card p-5">
          <div class="flex items-start justify-between">
            <div>
              <div class="text-slate-900 font-semibold">${title}</div>
              <div class="text-slate-500 text-sm mt-0.5">AWB: ${mode.awb}</div>
            </div>
            <span class="badge ${status==='In Transit'?'bg-amber-50 text-amber-700':'bg-rose-50 text-rose-700'}">${status}</span>
          </div>
          <div class="mt-2 text-slate-500 text-sm flex items-center gap-2">
            <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18"/></svg>
            ${mode.icon} ${mode.name}
          </div>
  
          <div class="mt-4 space-y-2 text-sm">
            ${items.map(i => `
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full ${i.color}"></span>
                <span>${i.text}</span>
              </div>
            `).join('')}
          </div>
  
          <div class="mt-4 text-sm text-slate-600">Expected: ${expected}</div>
        </div>
      `;
  
      const left = card(
        'In Transit',
        { name:'Air', icon:'✈️', awb:'AI-789456123' },
        'ORD-2024-001 — Premium Textiles Ltd.',
        '2024-01-22',
        [
          { color:'bg-slate-300', text:'Package dispatched from Mumbai' },
          { color:'bg-slate-300', text:'In transit to Delhi' },
          { color:'bg-blue-600',  text:'Expected delivery today' }
        ]
      );
  
      const right = card(
        'Delayed',
        { name:'Train', icon:'🚆', awb:'IRN-123456789' },
        'ORD-2024-003 — Quality Blinds Co.',
        '2024-01-25',
        [
          { color:'bg-slate-300', text:'Package dispatched from Chennai' },
          { color:'bg-slate-300', text:'Delayed due to weather conditions' },
          { color:'bg-blue-600',  text:'Rescheduled for delivery' }
        ]
      );
  
      const recent = `
        <div class="card p-4">
          <div class="font-medium mb-3">Recent Deliveries</div>
          <div class="rounded-xl bg-emerald-50 text-emerald-800 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span>✅</span>
              <div>
                <div class="font-medium">ORD-2024-002</div>
                <div class="text-xs text-emerald-700">Fabric World Inc.</div>
              </div>
            </div>
            <div class="text-sm text-emerald-800/80">Delivered · 2024-01-20</div>
          </div>
        </div>
      `;
  
      app().innerHTML = header + `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          ${left}
          ${right}
        </div>
        <div class="mt-4">${recent}</div>
      `;
    }
  
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/vendor/orders')   renderOrders();
      else if (h === '/vendor/tracking') renderTracking();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/vendor/')) onRoute();
  })();
  
  /* Register: Add Vendor Dispatch modal */
(function(){
    if (window.__fpVendorTpl) return; window.__fpVendorTpl = true;
    function tpl(){
      return `
      <div class="fp-modal">
        <div class="m-head"><div class="m-title">Add Vendor Dispatch</div><button class="btn btn-ghost" data-modal-close>&times;</button></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-sm text-slate-600">Order ID *</label><select class="fp-select mt-1"><option>Select order</option></select></div>
          <div><label class="text-sm text-slate-600">Vendor Name *</label><select class="fp-select mt-1"><option>Select vendor</option></select></div>
          <div><label class="text-sm text-slate-600">Transport Mode *</label><select class="fp-select mt-1"><option>Select transport mode</option><option>Air</option><option>Land</option><option>Train</option></select></div>
          <div><label class="text-sm text-slate-600">AWB Number *</label><input class="fp-input mt-1" placeholder="Enter AWB/Tracking number"></div>
          <div class="md:col-span-2"><label class="text-sm text-slate-600">Dispatch Date *</label><input class="fp-input mt-1" placeholder="dd/mm/yyyy"></div>
          <div class="md:col-span-2"><label class="text-sm text-slate-600">Invoice Upload</label><label class="fp-input mt-1 cursor-pointer"><input type="file" class="hidden"> Upload Invoice</label></div>
        </div>
        <div class="m-actions"><button class="btn btn-ghost" data-modal-close>Cancel</button><button class="btn btn-primary">Save Vendor Order</button></div>
      </div>`;
    }
    window.fpRegisterModal('vendor', tpl);
    window.fpBindModals && window.fpBindModals();
  })();
  