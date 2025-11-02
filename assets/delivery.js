/* assets/delivery.js */
(function () {
    if (window.__deliveryRegistered) return;
    window.__deliveryRegistered = true;
  
    const app = () => document.getElementById('app');
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/delivery/assign" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='assign'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Assign Delivery</a>
        <a href="#/delivery/status" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='status'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Delivery Status</a>
      </div>`;
  
    const Badge = (tone, text) => {
      const map = {
        blue:'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        green:'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        amber:'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
        violet:'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
        gray:'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200'
      };
      return `<span class="text-[11px] px-2 py-0.5 rounded-full ${map[tone]||map.gray}">${text}</span>`;
    };
  
    function headerBlock() {
      return `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Delivery Management</h1>
            <p class="text-slate-500 text-sm mt-1">Schedule and track product deliveries</p>
          </div>
          <a href="#/delivery/assign" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3.5 py-2 shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Assign Delivery
          </a>
        </div>`;
    }
  
    function searchBar(placeholder) {
      return `
        <div class="mt-6 card p-3">
          <div class="relative">
            <svg class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input placeholder="${placeholder}" class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"/>
          </div>
        </div>`;
    }
  
    function kpis(total, out, delivered, staff) {
      return `
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="card p-4"><div class="text-slate-500 text-sm">Total Deliveries</div><div class="mt-1 text-2xl font-semibold">${total}</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Out for Delivery</div><div class="mt-1 text-2xl font-semibold">${out}</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Delivered</div><div class="mt-1 text-2xl font-semibold">${delivered}</div></div>
          <div class="card p-4"><div class="text-slate-500 text-sm">Available Staff</div><div class="mt-1 text-2xl font-semibold">${staff}</div></div>
        </div>`;
    }
  
    function renderAssign() {
      const rows = [
        {
          order:'ORD-2024-001', product:'Premium Silk Curtains', code:'DELV-001',
          customer:'Sarah Johnson', addr:'123 Main Street, Mumbai, Maharashtra 400001', phone:'+91 98765 43210',
          staffInit:'SY', staff:'Suresh Yadav', staffCode:'DEL-001',
          date:'2024-01-25', time:'10:00 AM - 12:00 PM',
          status: Badge('blue','Scheduled'), proof:''
        },
        {
          order:'ORD-2024-002', product:'Office Sofa Set', code:'DELV-002',
          customer:'Rajesh Kumar', addr:'456 Park Avenue, Delhi, Delhi 110001', phone:'+91 87654 32109',
          staffInit:'AS', staff:'Amit Singh', staffCode:'DEL-003',
          date:'2024-01-23', time:'2:00 PM - 4:00 PM',
          status: Badge('green','Delivered'), proof: Badge('violet','Proof Available')
        },
        {
          order:'ORD-2024-003', product:'Venetian Blinds', code:'DELV-003',
          customer:'Priya Sharma', addr:'789 Garden Lane, Bangalore, Karnataka 560001', phone:'+91 76543 21098',
          staffInit:'RP', staff:'Rajesh Patel', staffCode:'DEL-002',
          date:'2024-01-24', time:'9:00 AM - 11:00 AM',
          status: Badge('amber','Out for Delivery'), proof:''
        }
      ];
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="px-5 py-4 font-semibold">Delivery Assignments</div>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Customer Info</th>
                  <th>Delivery Staff</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th class="!pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${rows.map(r=>`
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.order}</div>
                      <div class="text-xs text-slate-500">${r.product}</div>
                      <div class="text-[11px] text-slate-400">${r.code}</div>
                    </td>
                    <td>
                      <div class="font-medium">${r.customer}</div>
                      <div class="text-xs text-slate-500 flex items-center gap-2">
                        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.657 16.657 13.414 12m0 0L7.05 5.636M13.414 12l6.364-6.364"/></svg>
                        ${r.addr}
                      </div>
                      <div class="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.35a2 2 0 0 1-.45 2.11L10 10a16 16 0 0 0 6 6l.82-1.18a2 2 0 0 1 2.11-.45c.75.24 1.54.42 2.35.54A2 2 0 0 1 22 16.92Z"/></svg>
                        ${r.phone}
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="h-7 w-7 rounded-full bg-slate-100 grid place-items-center text-[11px] font-semibold text-slate-700">${r.staffInit}</div>
                        <div>
                          <div class="font-medium">${r.staff}</div>
                          <div class="text-xs text-slate-500">${r.staffCode}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-sm flex items-center gap-2">
                        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        ${r.date}
                      </div>
                      <div class="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        ${r.time}
                      </div>
                    </td>
                    <td>
                      <div class="space-y-1">
                        ${r.status}
                        ${r.proof}
                      </div>
                    </td>
                    <td class="!pr-6">
                      <div class="flex items-center justify-end gap-2">
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="Mark Done"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg></button>
                        <button class="p-2 rounded-lg hover:bg-slate-100" title="More"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
      app().innerHTML = headerBlock() + `<div class="mt-5">${Pills('assign')}</div>` + searchBar('Search deliveries...') + kpis(3,1,1,2) + table;
    }
  
    function renderStatus() {
      const cards = [
        {init:'SY', name:'Suresh Yadav', area:'North Mumbai', avail:Badge('green','Available'), vehicle:'Tempo (MH-01-AB-1234)', active:2, completed:156, rating:'4.7', phone:'+91 98765 43210'},
        {init:'RP', name:'Rajesh Patel', area:'South Mumbai', avail:Badge('amber','Busy'), vehicle:'Van (MH-02-CD-5678)', active:4, completed:203, rating:'4.8', phone:'+91 87654 32109'},
        {init:'AS', name:'Amit Singh', area:'Central Delhi', avail:Badge('green','Available'), vehicle:'Pickup (DL-03-EF-9012)', active:1, completed:89, rating:'4.5', phone:'+91 76543 21098'}
      ];
  
      const staff = `
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          ${cards.map(c=>`
            <div class="card p-5">
              <div class="flex items-start gap-3">
                <div class="h-10 w-10 rounded-full bg-slate-100 grid place-items-center text-[12px] font-semibold text-slate-700">${c.init}</div>
                <div class="flex-1">
                  <div class="font-semibold">${c.name}</div>
                  <div class="text-xs text-slate-500">${c.area}</div>
                </div>
                ${c.avail}
              </div>
              <div class="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm">
                <div class="text-slate-500">Vehicle</div><div>${c.vehicle}</div>
                <div class="text-slate-500">Active</div><div>${c.active}</div>
                <div class="text-slate-500">Completed</div><div>${c.completed}</div>
                <div class="text-slate-500">Rating</div><div>⭐ ${c.rating}</div>
                <div class="text-slate-500">Phone</div><div>${c.phone}</div>
              </div>
            </div>
          `).join('')}
        </div>`;
  
      const today = [
        {dot:'bg-blue-500', order:'ORD-2024-001 - Sarah Johnson', assignee:'Suresh Yadav', time:'10:00 AM - 12:00 PM', status:Badge('blue','Scheduled')},
        {dot:'bg-amber-500', order:'ORD-2024-003 - Priya Sharma', assignee:'Rajesh Patel', time:'9:00 AM - 11:00 AM', status:Badge('amber','Out for Delivery')}
      ];
  
      const schedule = `
        <div class="card mt-6 p-0 overflow-hidden">
          <div class="px-5 py-4 font-semibold">Today's Scheduled Deliveries</div>
          <div class="divide-y">
            ${today.map(t=>`
              <div class="px-5 py-4 flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full ${t.dot}"></span>
                <div class="flex-1">
                  <div class="font-medium">${t.order}</div>
                  <div class="text-xs text-slate-500">${t.assignee} · ${t.time}</div>
                </div>
                ${t.status}
                <button class="ml-3 p-2 rounded-lg hover:bg-slate-100" title="Proof"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg></button>
              </div>
            `).join('')}
          </div>
        </div>`;
  
      app().innerHTML = headerBlock() + `<div class="mt-5">${Pills('status')}</div>` + staff + schedule;
    }
  
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/delivery' || h === '/delivery/assign') renderAssign();
      else if (h === '/delivery/status') renderStatus();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/delivery')) onRoute();
  })();
  