/* assets/measurements.js */
(function () {
    if (window.__measurementsRegistered) return;
    window.__measurementsRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/measurements/list" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='list'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Measurement List</a>
        <a href="#/measurements/new"  class="px-3.5 py-1.5 text-sm rounded-xl ${active==='new'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Add Measurement</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue:   'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        green:  'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        amber:  'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        violet: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.blue}">${text}</span>`;
    };
  
    function renderList() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Measurements</h1>
            <p class="text-slate-500 text-sm mt-1">Record and manage precise measurements for all orders</p>
          </div>
          <a href="#/measurements/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Measurement
          </a>
        </div>
        <div class="mt-5">${Pills('list')}</div>
      `;
  
      const search = `
        <div class="mt-6 card p-3">
          <div class="relative">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="Search by Order ID, customer, or area..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
        </div>
      `;
  
      const kpis = `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Measurements</div><div class="mt-1 text-2xl font-semibold">3</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Pending</div><div class="mt-1 text-2xl font-semibold">1</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Approved</div><div class="mt-1 text-2xl font-semibold">1</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">With Sketches</div><div class="mt-1 text-2xl font-semibold">2</div></div>
        </div>
      `;
  
      const rows = [
        {
          order: 'ORD-2024-001', customer: 'Sarah Johnson', code: 'MEAS-001',
          location: 'Living Room', type: 'Curtains',
          dims: '240 × 180 cm', notes: '94.5" × 70.9"',
          staff: 'Raj Kumar', date: '2024-01-16', status: Badge('blue','Completed'), sketch:true
        },
        {
          order: 'ORD-2024-002', customer: 'Rajesh Kumar', code: 'MEAS-002',
          location: 'Conference Room', type: 'Sofa',
          dims: '85 × 220 × 95 cm', notes: '33.5" × 86.6" × 37.4"',
          staff: 'Priya Singh', date: '2024-01-12', status: Badge('green','Approved'), sketch:true
        },
        {
          order: 'ORD-2024-003', customer: 'Priya Sharma', code: 'MEAS-003',
          location: 'Home Office', type: 'Blinds',
          dims: '120 × 100 cm', notes: '47.2" × 39.4"',
          staff: 'Amit Patel', date: '2024-01-18', status: Badge('amber','Pending'), sketch:false
        }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Location & Type</th>
                  <th>Dimensions</th>
                  <th>Staff & Date</th>
                  <th>Status</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.order}</div>
                      <div class="text-xs text-slate-500">${r.customer}</div>
                      <div class="text-[11px] text-slate-400">${r.code}</div>
                    </td>
                    <td>
                      <div class="font-medium">${r.location}</div>
                      <div class="text-xs text-slate-500">${r.type}</div>
                      ${r.sketch?`<div class="mt-1">${Badge('violet','Sketch Available')}</div>`:''}
                    </td>
                    <td>
                      <div class="font-medium flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8h18M3 16h18M7 4v16m10-16v16"/></svg>
                        ${r.dims}
                      </div>
                      <div class="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18"/></svg>
                        ${r.notes}
                      </div>
                    </td>
                    <td>
                      <div class="font-medium">${r.staff}</div>
                      <div class="text-xs text-slate-500">${r.date}</div>
                    </td>
                    <td>${r.status}</td>
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
        </div>
      `;
  
      app().innerHTML = header + search + kpis + table;
    }
  
    function field(label, inner, required=false) {
      return `
        <div>
          <label class="block text-sm font-medium text-slate-700">${label}${required?'<span class="text-red-500"> *</span>':''}</label>
          <div class="mt-1">${inner}</div>
        </div>`;
    }
  
    function input(placeholder='') {
      return `<input class="w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="${placeholder}"/>`;
    }
  
    function select(placeholder='') {
      return `<div class="relative">
        <select class="w-full appearance-none px-3 py-2 pr-9 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100">
          <option>${placeholder}</option>
        </select>
        <svg class="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
      </div>`;
    }
  
    function renderNew() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Measurements</h1>
            <p class="text-slate-500 text-sm mt-1">Record and manage precise measurements for all orders</p>
          </div>
          <a href="#/measurements/new" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Measurement
          </a>
        </div>
        <div class="mt-5">${Pills('new')}</div>
      `;
  
      const form = `
        <div class="card mt-6 p-5 space-y-5">
          <h3 class="font-semibold">Add New Measurement</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${field('Order ID', select('Select order'), true)}
            ${field('Room or Area', input('e.g., Living Room, Bedroom'), true)}
            ${field('Measurement Type', select('Select measurement type'), true)}
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            ${field('Height', input('Height'), true)}
            ${field('Width', input('Width'), true)}
            ${field('Depth (optional)', input('Depth'), false)}
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${field('Unit', select('Centimeters (cm)'), false)}
            ${field('Upload Sketch or Image',
              `<label class="cursor-pointer block px-3 py-2 rounded-xl border bg-white hover:bg-slate-50">
                 <input type="file" class="hidden"/> <span class="text-slate-600">Upload Sketch/Photo</span>
               </label>`, false)}
          </div>
  
          ${field('Notes', `<textarea rows="3" class="w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="Special instructions, considerations, or notes"></textarea>`, false)}
  
          <div class="flex items-center justify-end gap-3">
            <a href="#/measurements/list" class="px-4 py-2 rounded-xl border bg-white hover:bg-slate-50">Cancel</a>
            <button class="px-4 py-2 rounded-xl bg-brand-600 text-white shadow-soft">Save Measurement</button>
          </div>
        </div>
      `;
  
      app().innerHTML = header + form;
    }
  
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/measurements' || h === '/measurements/list') renderList();
      else if (h === '/measurements/new') renderNew();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/measurements')) onRoute();
  })();
  