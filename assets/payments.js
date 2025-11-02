/* assets/payments.js */
(function () {
    if (window.__paymentsRegistered) return;
    window.__paymentsRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/payments/entry"    class="px-3.5 py-1.5 text-sm rounded-xl ${active==='entry'   ?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Payment Entry</a>
        <a href="#/payments/invoices" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='invoice' ?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Invoice Generation</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue:   'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        green:  'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        amber:  'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        red:    'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
        violet: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.blue}">${text}</span>`;
    };
  
    function headerBlock() {
      return `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Payments & Billing</h1>
            <p class="text-slate-500 text-sm mt-1">Manage payments and generate invoices</p>
          </div>
          <a href="javascript:void(0)" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Payment
          </a>
        </div>
      `;
    }
  
    function renderEntry() {
      const header = headerBlock() + `<div class="mt-5">${Pills('entry')}</div>`;
  
      const kpis = `
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Received</div><div class="mt-1 text-2xl font-semibold">₹45,000</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Pending Amount</div><div class="mt-1 text-2xl font-semibold">₹24,000</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Overdue</div><div class="mt-1 text-2xl font-semibold text-rose-600">₹17,000</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Orders</div><div class="mt-1 text-2xl font-semibold">4</div></div>
        </div>
      `;
  
      const search = `
        <div class="mt-4 card p-3">
          <div class="relative">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search by Order ID or customer..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
        </div>
      `;
  
      const rows = [
        { id:'ORD-2024-001', cust:'Sarah Johnson',  total:'₹25,000', paid:'₹10,000', bal:'₹15,000', method:'UPI',          last:'2024-01-15', status: Badge('amber','Partial'), due:'2024-01-30' },
        { id:'ORD-2024-002', cust:'Rajesh Kumar',   total:'₹45,000', paid:'₹45,000', bal:'₹0',      method:'Bank Transfer', last:'2024-01-20', status: Badge('green','Paid'),   due:'2024-01-25' },
        { id:'ORD-2024-003', cust:'Priya Sharma',   total:'₹18,000', paid:'₹9,000',  bal:'₹9,000',  method:'Cash',          last:'2024-01-10', status: Badge('amber','Partial'), due:'2024-01-20' },
        { id:'ORD-2024-004', cust:'Mohammed Ali',   total:'₹32,000', paid:'₹15,000', bal:'₹17,000', method:'UPI',           last:'2024-01-05', status: Badge('red','Overdue'),  due:'2024-01-15' }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Amount Breakdown</th>
                  <th>Payment Info</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.id}</div>
                      <div class="text-xs text-slate-500">${r.cust}</div>
                    </td>
                    <td>
                      <div>Total: ${r.total}</div>
                      <div class="text-slate-500 text-sm">Paid: ${r.paid}</div>
                      <div class="text-rose-600 text-sm">Balance: ${r.bal}</div>
                    </td>
                    <td>
                      <div>${r.method}</div>
                      <div class="text-slate-500 text-sm">Last: ${r.last}</div>
                    </td>
                    <td>${r.status}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4M16 2v4M3 10h18M7 14h.01M11 14h.01M15 14h.01M7 18h.01M11 18h.01M15 18h.01"/></svg>
                        ${r.due}
                      </div>
                    </td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="View">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Receipt">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21V8a2 2 0 0 0-2-2h-5l-2-2H6a2 2 0 0 0-2 2v15l2-1 2 1 2-1 2 1 2-1 2 1 2-1z"/>
                          </svg>
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
  
      app().innerHTML = header + kpis + search + table;
    }
  
    function renderInvoices() {
      const header = headerBlock() + `<div class="mt-5">${Pills('invoice')}</div>`;
  
      const kpis = `
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Invoices</div><div class="mt-1 text-2xl font-semibold">2</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Paid Invoices</div><div class="mt-1 text-2xl font-semibold">1</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Pending Payment</div><div class="mt-1 text-2xl font-semibold">1</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Value</div><div class="mt-1 text-2xl font-semibold text-violet-700">₹82,600</div></div>
        </div>
      `;
  
      const actionBar = `
        <div class="mt-4 flex items-center justify-end">
          <a href="javascript:void(0)" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4M16 2v4M3 10h18M7 14h.01M11 14h.01M15 14h.01M7 18h.01M11 18h.01M15 18h.01"/></svg>
            Generate Invoice
          </a>
        </div>
      `;
  
      const rows = [
        { inv:'INV-2024-001', order:'ORD-2024-001', customer:'Sarah Johnson', amount:'₹29,500', sub:'₹25,000', status: Badge('blue','Sent'), due:'2024-01-30' },
        { inv:'INV-2024-002', order:'ORD-2024-002', customer:'Rajesh Kumar',  amount:'₹53,100', sub:'₹45,000', status: Badge('green','Paid'), due:'2024-01-25' }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Invoice Details</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.inv}</div>
                      <div class="text-xs text-slate-500">${r.order}</div>
                      <div class="text-[11px] text-slate-400">Generated: 2024-01-15</div>
                    </td>
                    <td>${r.customer}</td>
                    <td>
                      <div class="font-medium">${r.amount}</div>
                      <div class="text-slate-500 text-sm">Subtotal: ${r.sub}</div>
                    </td>
                    <td>${r.status}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4M16 2v4M3 10h18M7 14h.01M11 14h.01M15 14h.01M7 18h.01M11 18h.01M15 18h.01"/></svg>
                        ${r.due}
                      </div>
                    </td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Preview">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Download">
                          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
                          </svg>
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
  
      app().innerHTML = header + kpis + actionBar + table;
    }
  
    function onRoute() {
      const h = location.hash.replace('#', '');
      if (h === '/payments' || h === '/payments/entry') renderEntry();
      else if (h === '/payments/invoices') renderInvoices();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/payments')) onRoute();
  })();

  /* Register: Add Payment Entry modal */
(function(){
    if (window.__fpPaymentsTpl) return; window.__fpPaymentsTpl = true;
    function tpl(){
      return `
      <div class="fp-modal">
        <div class="m-head"><div class="m-title">Add Payment Entry</div><button class="btn btn-ghost" data-modal-close>&times;</button></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-sm text-slate-600">Order ID *</label><select class="fp-select mt-1"><option>Select order</option></select></div>
          <div><label class="text-sm text-slate-600">Payment Date *</label><input class="fp-input mt-1" placeholder="dd/mm/yyyy"></div>
          <div><label class="text-sm text-slate-600">Advance Amount (₹)</label><input class="fp-input mt-1" placeholder="Enter advance amount"></div>
          <div><label class="text-sm text-slate-600">Balance Amount (₹)</label><input class="fp-input mt-1" placeholder="Enter balance amount"></div>
          <div class="md:col-span-2"><label class="text-sm text-slate-600">Mode of Payment *</label>
            <select class="fp-select mt-1"><option>Select payment mode</option><option>UPI</option><option>Cash</option><option>Card</option><option>Bank Transfer</option></select>
          </div>
        </div>
        <div class="m-actions"><button class="btn btn-ghost" data-modal-close>Cancel</button><button class="btn btn-primary">Save Payment</button></div>
      </div>`;
    }
    window.fpRegisterModal('payment', tpl);
    window.fpBindModals && window.fpBindModals();
  })();
  
  