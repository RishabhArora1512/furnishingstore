/* assets/reports.js */
(function () {
    if (window.__reportsRegistered) return;
    window.__reportsRegistered = true;
  
    const app = () => document.getElementById('app');
    const $  = (sel, ctx=document) => ctx.querySelector(sel);
  
    const Pills = (active) => `
      <div class="inline-flex rounded-2xl bg-slate-100 p-1">
        <a href="#/reports/order-status" class="px-3.5 py-1.5 text-sm rounded-xl ${active==='order'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Order Status</a>
        <a href="#/reports/delay"        class="px-3.5 py-1.5 text-sm rounded-xl ${active==='delay'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Delay Analysis</a>
        <a href="#/reports/payments"     class="px-3.5 py-1.5 text-sm rounded-xl ${active==='pay'  ?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Payment Tracking</a>
        <a href="#/reports/complaints"   class="px-3.5 py-1.5 text-sm rounded-xl ${active==='compl'?'bg-white shadow-soft text-slate-900':'text-slate-500 hover:text-slate-700'}">Complaint Log</a>
      </div>`;
  
    const Card = (inner) => `<div class="card p-4">${inner}</div>`;
    const KPI  = (label, value, tone='slate') => `
      <div class="card p-4">
        <div class="text-slate-500 text-sm">${label}</div>
        <div class="mt-1 text-2xl font-semibold text-${tone}-700">${value}</div>
      </div>`;
  
    /* ---------- ORDER STATUS ---------- */
    function renderOrderStatus() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Reports & Analytics</h1>
            <p class="text-slate-500 text-sm mt-1">Comprehensive business insights and performance metrics</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center gap-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>
              Export Report
            </button>
            <button class="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center gap-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 3h4M3 7h18M6 7v14h12V7"/></svg>
              Advanced Filters
            </button>
          </div>
        </div>
        <div class="mt-5">${Pills('order')}</div>
      `;
  
      const filters = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
          ${Card(`
            <label class="text-sm text-slate-500">From Date</label>
            <input class="mt-1 px-3 py-2 w-full rounded-xl border bg-white" placeholder="01/01/2024" />
          `)}
          ${Card(`
            <label class="text-sm text-slate-500">To Date</label>
            <input class="mt-1 px-3 py-2 w-full rounded-xl border bg-white" placeholder="31/01/2024" />
          `)}
          ${Card(`
            <label class="text-sm text-slate-500">Filter By</label>
            <select class="mt-1 px-3 py-2 w-full rounded-xl border bg-white">
              <option>All Reports</option>
            </select>
          `)}
          <div class="flex items-end">
            <button class="w-full px-3 py-2 rounded-xl bg-brand-600 text-white shadow-soft">Apply Filters</button>
          </div>
        </div>
      `;
  
      const topCharts = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          ${Card(`
            <div class="font-semibold mb-2">Order Status Distribution</div>
            <canvas id="rep_order_pie"></canvas>
          `)}
          ${Card(`
            <div class="font-semibold mb-2">Monthly Performance Trend</div>
            <canvas id="rep_order_line"></canvas>
          `)}
        </div>
      `;
  
      const table = `
        <div class="card mt-4 overflow-hidden">
          <div class="p-4 font-semibold">Detailed Order Status Report</div>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="!pl-6">Order Details</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Timeline</th>
                  <th>Team Assigned</th>
                  <th class="!pr-6">Performance</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${[
                  {id:'ORD-2024-001', cust:'Sarah Johnson', status:'Completed', exp:'2024-01-30', act:'2024-01-28', team:'Vendor: Premium Textiles / Tailor: Ramesh / Delivery: Suresh', perf:'✔️'},
                  {id:'ORD-2024-002', cust:'Rajesh Kumar', status:'In Progress', exp:'2024-02-05', act:'—', team:'Vendor: Fabric World / Tailor: Priya / Delivery: —', perf:'•'}
                ].map(r=>`
                  <tr class="hover:bg-slate-50/60">
                    <td class="!pl-6">
                      <div class="font-medium">${r.id}</div>
                      <div class="text-xs text-slate-500">Premium Silk Curtains</div>
                    </td>
                    <td>${r.cust}</td>
                    <td><span class="text-[11px] px-2 py-0.5 rounded-full ${r.status==='Completed'?'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200':'bg-amber-50 text-amber-700 ring-1 ring-amber-200'}">${r.status}</span></td>
                    <td class="text-sm">
                      <div>Expected: ${r.exp}</div>
                      <div class="text-slate-500">Actual: ${r.act}</div>
                    </td>
                    <td class="text-sm">${r.team}</td>
                    <td class="!pr-6">${r.perf}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
  
      app().innerHTML = header + filters + topCharts + table;
  
      if (window.Chart) {
        new Chart($('#rep_order_pie'), {
          type: 'pie',
          data: { labels:['New: 15','In Progress: 32','Completed: 28','Delayed: 8'], datasets:[{ data:[15,32,28,8] }] },
          options: { plugins:{ legend:{ position:'bottom' } } }
        });
        new Chart($('#rep_order_line'), {
          type: 'line',
          data: { labels:['Oct','Nov','Dec','Jan'], datasets:[{ label:'Orders', data:[45,52,47,60], tension:.35 }, { label:'Complaints', data:[1,1,3,3], tension:.35 }] },
          options: { plugins:{ legend:{ position:'bottom' } }, scales:{ y:{ beginAtZero:true } } }
        });
      }
    }
  
    /* ---------- DELAY ANALYSIS ---------- */
    function renderDelay() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Reports & Analytics</h1>
            <p class="text-slate-500 text-sm mt-1">Comprehensive business insights and performance metrics</p>
          </div>
        </div>
        <div class="mt-5">${Pills('delay')}</div>
      `;
  
      const charts = `
        <div class="card mt-5">
          <div class="font-semibold mb-2">Department-wise Delay Analysis</div>
          <canvas id="rep_delay_bar"></canvas>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          ${KPI('Delayed Orders','1','rose')}
          ${KPI('Avg. Delay (Days)','2','amber')}
          ${KPI('On-Time Delivery','67%','emerald')}
        </div>
      `;
  
      app().innerHTML = header + charts;
  
      if (window.Chart) {
        new Chart($('#rep_delay_bar'), {
          type: 'bar',
          data: {
            labels:['Vendor','Tailor','Delivery','Measurement'],
            datasets:[
              { label:'On Time %', data:[82,76,90,86], stack:'s' },
              { label:'Delayed %', data:[18,24,10,14], stack:'s' }
            ]
          },
          options: {
            plugins:{ legend:{ position:'bottom' } },
            scales:{ y:{ beginAtZero:true, max:100 } }
          }
        });
      }
    }
  
    /* ---------- PAYMENT TRACKING ---------- */
    function renderPayments() {
      const header = `
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-[22px] font-semibold">Reports & Analytics</h1>
            <p class="text-slate-500 text-sm mt-1">Comprehensive business insights and performance metrics</p>
          </div>
        </div>
        <div class="mt-5">${Pills('pay')}</div>
      `;
  
      const charts = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-5">
          ${Card(`<div class="font-semibold mb-2">Payment Status Distribution</div><canvas id="rep_pay_pie"></canvas>`)}
          ${Card(`<div class="font-semibold mb-2">Revenue Trend</div><canvas id="rep_pay_line"></canvas>`)}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          ${KPI('Total Collected','₹8.2L','emerald')}
          ${KPI('Pending Amount','₹2.1L','amber')}
          ${KPI('Overdue Amount','₹0.8L','rose')}
          ${KPI('Collection Rate','92%','blue')}
        </div>
      `;
  
      app().innerHTML = header + charts;
  
      if (window.Chart) {
        new Chart($('#rep_pay_pie'), {
          type:'pie',
          data:{ labels:['Paid: 65%','Partial: 25%','Pending: 10%'], datasets:[{ data:[65,25,10] }] },
          options:{ plugins:{ legend:{ position:'bottom' } } }
        });
        new Chart($('#rep_pay_line'), {
          type:'line',
          data:{ labels:['Oct','Nov','Dec','Jan'], datasets:[{ label:'Revenue', data:[450000,510000,480000,600000], tension:.35 }] },
          options:{ plugins:{ legend:{ position:'bottom' } }, scales:{ y:{ beginAtZero:false } } }
        });
      }
    }
  
    /* ---------- COMPLAINT LOG ---------- */
    /* replace the whole renderComplaints function in assets/reports.js */
function renderComplaints() {
    const header = `
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-[22px] font-semibold">Reports & Analytics</h1>
          <p class="text-slate-500 text-sm mt-1">Comprehensive business insights and performance metrics</p>
        </div>
      </div>
      <div class="mt-5">${Pills('compl')}</div>
    `;
  
    const kpis = `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        ${KPI('Total Complaints','3')}
        ${KPI('Open Issues','1','amber')}
        ${KPI('Resolved','1','emerald')}
        ${KPI('Resolution Rate','33%','violet')}
      </div>
    `;
  
    const table = `
      <div class="card mt-4 overflow-hidden">
        <div class="p-4 font-semibold">Complaint Log</div>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th class="!pl-6">Complaint Details</th>
                <th>Customer & Order</th>
                <th>Type & Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th class="!pr-6">Resolution</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              ${[
                ['CMP-001','Curtain fabric has slight color variation from sample','Sarah Johnson / ORD-2024-001','Quality / Medium','Resolved','Quality Team','Replacement provided with exact color match','2024-01-29'],
                ['CMP-002','Order delivered 3 days late without prior notice','Mohammed Ali / ORD-2024-004','Delivery / High','In Progress','Delivery Manager','Investigating delivery process delays','2024-01-20'],
                ['CMP-003','Measurement staff was unprofessional during visit','Alice Smith / ORD-2024-005','Service / High','Open','HR Team','Pending resolution','2024-01-22']
              ].map(r=>`
                <tr class="hover:bg-slate-50/60">
                  <td class="!pl-6">
                    <div class="font-medium">${r[0]}</div>
                    <div class="text-sm">${r[1]}</div>
                    <div class="text-[11px] text-slate-400">Reported: ${r[7]}</div>
                  </td>
                  <td>${r[2]}</td>
                  <td>
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">${r[3].split(' / ')[0]}</span>
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200 ml-1">${r[3].split(' / ')[1]}</span>
                  </td>
                  <td>
                    <span class="text-[11px] px-2 py-0.5 rounded-full ${r[4]==='Resolved'?'bg-emerald-50 text-emerald-700 ring-emerald-200':r[4]==='Open'?'bg-rose-50 text-rose-700 ring-rose-200':'bg-amber-50 text-amber-700 ring-amber-200'} ring-1">${r[4]}</span>
                  </td>
                  <td>${r[5]}</td>
                  <td class="!pr-6">${r[6]}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  
    const form = `
      <div class="card mt-4 p-5 space-y-4">
        <div class="font-semibold">Log New Complaint</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-slate-700">Order ID</label>
            <div class="relative mt-1">
              <select class="w-full appearance-none px-3 py-2 pr-9 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100">
                <option>Select order</option>
                <option>ORD-2024-001 — Sarah Johnson</option>
                <option>ORD-2024-002 — Rajesh Kumar</option>
                <option>ORD-2024-003 — Priya Sharma</option>
              </select>
              <svg class="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700">Complaint Type</label>
            <div class="relative mt-1">
              <select class="w-full appearance-none px-3 py-2 pr-9 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100">
                <option>Select type</option>
                <option>Quality</option>
                <option>Delivery</option>
                <option>Service</option>
                <option>Billing</option>
              </select>
              <svg class="h-4 w-4 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-slate-700">Complaint Description</label>
          <textarea rows="3" class="mt-1 w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="Describe the complaint in detail..."></textarea>
        </div>
  
        <div class="flex items-center justify-end">
          <button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white shadow-soft">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01"/></svg>
            Log Complaint
          </button>
        </div>
      </div>
    `;
  
    app().innerHTML = header + kpis + table + form;
  }
  
  
    /* ---------- ROUTER ---------- */
    function onRoute() {
      const h = location.hash.replace('#','');
      if (h === '/reports' || h === '/reports/order-status') return renderOrderStatus();
      if (h === '/reports/delay')         return renderDelay();
      if (h === '/reports/payments')      return renderPayments();
      if (h === '/reports/complaints')    return renderComplaints();
    }
  
    window.addEventListener('hashchange', onRoute);
    if (location.hash.startsWith('#/reports')) onRoute();
  })();
  