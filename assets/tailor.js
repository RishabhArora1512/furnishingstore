/* assets/tailor.js */
(function () {
    if (window.__tailorRegistered) return;
    window.__tailorRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/tailor/assign" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='assign'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Assign Tailor</a>
        <a href="#/tailor/list" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='list'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Tailor List</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        rose: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
        gray: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.gray}">${text}</span>`;
    };
  
    /* -------- Assign Tailor -------- */
    function renderAssign() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Tailor Management</h1>
            <p class="text-slate-500 text-sm mt-1">Assign tailors and track work progress</p>
          </div>
          <a href="#/tailor/assign" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg>
            Assign Tailor
          </a>
        </div>
        <div class="mt-5">${Pills('assign')}</div>
      `;
  
      const search = `
        <div class="mt-5 card p-3 flex items-center justify-between">
          <div class="relative w-full">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search assignments..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
          <div class="ml-4">
            <select class="rounded-xl border px-3 py-2 text-sm">
              <option>Filter by status</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Delayed</option>
            </select>
          </div>
        </div>
      `;
  
      const kpis = `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Total Assignments</div><div class="mt-1 text-2xl font-semibold">3</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">In Progress</div><div class="mt-1 text-2xl font-semibold text-amber-600">1</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Completed</div><div class="mt-1 text-2xl font-semibold text-emerald-600">1</div></div>
          <div class="card p-4 text-center"><div class="text-slate-500 text-sm">Delayed</div><div class="mt-1 text-2xl font-semibold text-rose-600">0</div></div>
        </div>
      `;
  
      const rows = [
        {
          order: 'ORD-2024-001', customer: 'Sarah Johnson', product: 'Premium Silk Curtains',
          tailor: 'Ramesh Kumar', code: 'TAILOR-001', status: Badge('amber','In Progress'),
          assigned:'2024-01-17', due:'2024-01-25', progress:'Customer prefers double-layered curtains'
        },
        {
          order: 'ORD-2024-002', customer: 'Rajesh Kumar', product: 'Office Sofa Set',
          tailor: 'Priya Singh', code: 'TAILOR-002', status: Badge('green','Completed'),
          assigned:'2024-01-15', due:'2024-01-30', progress: Badge('blue','Proof Uploaded')+' Corporate setting, professional finish required'
        },
        {
          order: 'ORD-2024-003', customer: 'Priya Sharma', product: 'Venetian Blinds',
          tailor: 'Mohammed Aslam', code: 'TAILOR-003', status: Badge('blue','Assigned'),
          assigned:'2024-01-19', due:'2024-01-28', progress:'Child-safe mechanism installation'
        }
      ];
  
      const table = `
        <div class="card mt-6 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Tailor</th>
                  <th>Status</th>
                  <th>Timeline</th>
                  <th>Progress</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.order}</div>
                      <div class="text-xs text-slate-500">${r.customer}</div>
                      <div class="text-[11px] text-slate-400">${r.product}</div>
                    </td>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="h-8 w-8 rounded-full bg-slate-100 grid place-items-center font-semibold text-slate-600">${r.tailor.split(' ').map(x=>x[0]).join('')}</div>
                        <div><div class="font-medium">${r.tailor}</div><div class="text-xs text-slate-500">${r.code}</div></div>
                      </div>
                    </td>
                    <td>${r.status}</td>
                    <td>
                      <div class="text-xs text-slate-500"><span class="mr-1">📅</span>Assigned: ${r.assigned}</div>
                      <div class="text-xs text-slate-500"><span class="mr-1">⏰</span>Due: ${r.due}</div>
                    </td>
                    <td>${r.progress}</td>
                    <td class="!pr-6 text-right">
                      <button class="p-2 rounded-lg hover:bg-slate-100"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.24 12.24l-8.48 8.48M3.76 12.24l8.48-8.48M12 4v16"/></svg></button>
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
  
    /* -------- Tailor List -------- */
    function renderTailorList() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Tailor Management</h1>
            <p class="text-slate-500 text-sm mt-1">Assign tailors and track work progress</p>
          </div>
          <a href="#/tailor/assign" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg>
            Assign Tailor
          </a>
        </div>
        <div class="mt-5">${Pills('list')}</div>
      `;
  
      const cards = [
        {name:'Ramesh Kumar', tag:'Curtains & Drapes', exp:'8 years', active:3, completed:145, rating:4.8, avail:Badge('green','Available')},
        {name:'Priya Singh', tag:'Upholstery & Furniture', exp:'12 years', active:5, completed:289, rating:4.9, avail:Badge('amber','Busy')},
        {name:'Mohammed Aslam', tag:'Blinds & Window Treatments', exp:'6 years', active:2, completed:98, rating:4.6, avail:Badge('green','Available')},
        {name:'Sunita Devi', tag:'Custom Furnishings', exp:'15 years', active:1, completed:356, rating:4.9, avail:Badge('green','Available')}
      ];
  
      const summary = `
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          ${cards.map(c=>`
            <div class="card p-5">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-slate-100 grid place-items-center font-semibold text-slate-600">${c.name.split(' ').map(x=>x[0]).join('')}</div>
                <div>
                  <div class="font-medium">${c.name}</div>
                  <div class="text-xs text-slate-500">${c.tag}</div>
                </div>
              </div>
              <div class="mt-3">${c.avail}</div>
              <div class="text-sm mt-2">
                <div><span class="font-medium">Experience:</span> ${c.exp}</div>
                <div><span class="font-medium">Active Orders:</span> ${c.active}</div>
                <div><span class="font-medium">Completed:</span> ${c.completed}</div>
                <div><span class="font-medium">Rating:</span> ⭐ ${c.rating}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
  
      const table = `
        <div class="card mt-6 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Tailor</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Current Workload</th>
                  <th>Performance</th>
                  <th>Availability</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${cards.map(c=>`
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="flex items-center gap-3">
                        <div class="h-8 w-8 rounded-full bg-slate-100 grid place-items-center font-semibold text-slate-600">${c.name.split(' ').map(x=>x[0]).join('')}</div>
                        <div><div class="font-medium">${c.name}</div><div class="text-xs text-slate-500">TAILOR-00${Math.floor(Math.random()*9)+1}</div></div>
                      </div>
                    </td>
                    <td>${c.tag}</td>
                    <td>${c.exp}</td>
                    <td>${c.active} active<br><span class="text-xs text-slate-500">${c.completed} completed</span></td>
                    <td>⭐ ${c.rating}</td>
                    <td>${c.avail}</td>
                    <td class="!pr-6 text-right">
                      <button class="p-2 rounded-lg hover:bg-slate-100"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7" r="4"/><path d="M5.5 22a7.5 7.5 0 0 1 13 0"/></svg></button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
  
      app().innerHTML = header + summary + table;
    }
  
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/tailor' || h === '/tailor/assign') return renderAssign();
      if (h === '/tailor/list') return renderTailorList();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/tailor')) onRoute();
  })();

/* Register: Assign Tailor modal */
(function(){
    if (window.__fpTailorTpl) return; window.__fpTailorTpl = true;
    function tpl(){
      return `
      <div class="fp-modal">
        <div class="m-head"><div class="m-title">Assign Tailor to Order</div><button class="btn btn-ghost" data-modal-close>&times;</button></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-sm text-slate-600">Order ID *</label><select class="fp-select mt-1"><option>Select order</option></select></div>
          <div><label class="text-sm text-slate-600">Assign Tailor *</label><select class="fp-select mt-1"><option>Select tailor</option></select></div>
          <div class="md:col-span-2"><label class="text-sm text-slate-600">Expected Completion Date *</label><input class="fp-input mt-1" placeholder="dd/mm/yyyy"></div>
          <div class="md:col-span-2"><label class="text-sm text-slate-600">Notes & Instructions</label><textarea rows="3" class="fp-textarea mt-1" placeholder="Special instructions for the tailor..."></textarea></div>
        </div>
        <div class="m-actions"><button class="btn btn-ghost" data-modal-close>Cancel</button><button class="btn btn-primary">Assign Tailor</button></div>
      </div>`;
    }
    window.fpRegisterModal('tailor', tpl);
    window.fpBindModals && window.fpBindModals();
  })();
  
  
  
  