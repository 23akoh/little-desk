from pathlib import Path
from urllib.parse import quote
root=Path(__file__).resolve().parent
original=(root/'original-timetable-source.txt').read_text()
s=original.replace('AceMyGCSEs - Smart Revision Hub','Little Timetable — make room for your day').replace('AceMyGCSEs','Little Timetable')
logo="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='26' fill='#f0e8f6'/><path d='M20 44h60v12H20zm7 12h6v26h-6zm40 0h6v26h-6z' fill='#9876b7'/><rect x='39' y='20' width='30' height='24' rx='4' fill='#c4aed8'/><path d='M25 43V28m0 7q-15 0-13-12 14-1 13 12m1-5q0-15 14-13 1 14-14 13' fill='#97b389'/></svg>"
logo='data:image/svg+xml,'+quote(logo,safe='')
s=s.replace('Blue White Modern Learning Logo.png',logo)
s=s.replace('family=Comic+Neue:wght=700','family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600')
s=s.replace("font-family: 'Comic Neue', cursive, sans-serif;", "font-family: 'Outfit', system-ui, sans-serif;")
s=s.replace('<body class=', '<body class=',1)
css='''
/* The same complete theme palette as Little Desk; original planner behavior retained. */
body{background:var(--page)!important;color:var(--ink)!important;font-family:'DM Sans',system-ui,sans-serif}
h1,h2,h3,.brand-title{font-family:'Outfit',system-ui,sans-serif!important;letter-spacing:-.4px}
nav{background:var(--surface)!important;border:0!important;border-bottom:1px solid var(--line)!important;box-shadow:none!important;padding:20px max(4vw,20px)!important}
.brand-title{font-size:24px!important;font-weight:500!important}
.bg-white{background:var(--surface)!important}body.bg-slate-50{background:var(--page)!important}.bg-gray-900,.bg-slate-900{background:var(--accent)!important;color:var(--surface)!important}.bg-gray-900 .text-yellow-300,.bg-slate-900 .text-yellow-300{color:var(--surface)!important}
.bg-purple-50,.bg-blue-50,.bg-emerald-50,.bg-indigo-50,.bg-rose-50,.bg-slate-50,.bg-gray-50,.bg-slate-100,.bg-gray-100,.bg-amber-50{background:var(--accent-soft)!important}
.bg-purple-100,.bg-emerald-100,.bg-gray-200,.bg-blue-100,.bg-amber-100{background:var(--accent-light)!important}
.bg-indigo-600,.bg-rose-600,.bg-blue-600,.bg-slate-800{background:var(--accent)!important;color:var(--surface)!important}
.text-gray-900,.text-gray-800,.text-gray-700,.text-black,.text-slate-900{color:var(--ink)!important}
.text-gray-600,.text-gray-500,.text-gray-400{color:var(--muted)!important}
.text-purple-700,.text-indigo-900,.text-indigo-700,.text-blue-900,.text-emerald-900,.text-emerald-800,.text-rose-900,.text-amber-900,.text-amber-800{color:var(--accent)!important}
.border,.border-b,.border-r,.border-t,.divide-y>*{border-color:var(--line)!important}
.border-purple-100,.border-purple-200,.border-indigo-100,.border-rose-100,.border-emerald-200,.border-blue-200,.border-amber-200{border-color:var(--line)!important}
.dynamic-bg{background:var(--accent)!important;color:var(--surface)!important}
.dynamic-text{color:var(--accent)!important}.dynamic-border{border-color:var(--accent)!important}
input,select,textarea{background:var(--surface)!important;color:var(--ink)!important;border-color:var(--line)!important;border-radius:9px!important}
button{transition:filter .2s}button:hover{filter:brightness(.96)}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.rounded-xl{border-radius:18px!important}.shadow-md,.shadow-sm{box-shadow:0 4px 24px #00000005!important}
.suite-banner{max-width:1280px;margin:28px auto 0;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}.suite-banner h2{font-size:30px;font-weight:400;line-height:1.3}.suite-banner p{font-size:12px;color:var(--muted);margin-top:6px}.suite-theme{display:flex;align-items:center;gap:12px;font-size:12px;color:var(--muted)}.suite-theme select{padding:9px 12px;border:1px solid var(--line)}
main{gap:24px!important}#onboarding-section>div:first-child h2{font-size:23px!important;font-weight:500!important}#links-sidebar>div{border:1px solid var(--line);border-radius:18px}#links-sidebar .bg-white\\/10{background:var(--accent-light)!important;color:var(--ink)!important}
.suite-footer{max-width:1280px;margin:25px auto;padding:22px 24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:15px;font-size:11px;color:var(--muted)}
@media(max-width:600px){.suite-banner h2{font-size:26px}.suite-banner{margin-top:22px}.suite-footer{font-size:10px}}
@media print{.suite-banner,.suite-footer{display:none!important}body,.bg-white{background:white!important;color:#222!important}}
'''
suite=(root/'suite.js').read_text()
s=s.replace('</head>', '<style>'+css+'</style>\n<script>'+suite+'</script>\n</head>')
bar='''<section class="suite-banner"><div><h2>A little plan for your big ideas.</h2><p>Your day has room for learning, living and a little breathing space.</p></div><label class="suite-theme">Set the mood <select id="suite-theme" aria-label="Timetable theme"></select></label></section>'''
s=s.replace('</nav>', '</nav>'+bar,1)
s=s.replace("document.documentElement.style.setProperty('--theme-color', profile.theme);", "LittleSuite.apply(document.documentElement.dataset.theme||LittleSuite.current());")
s=s.replace('<input type="color" id="input-theme"', '<input hidden aria-hidden="true" type="color" id="input-theme"')
s=s.replace('Build Custom Timetable','Build my little timetable').replace('Your Custom Study Schedule','My little study plan')
# Keep the original storage key, subjects, timetable algorithm and homework records.
addon='''
<script>
const themeSelect=document.getElementById('suite-theme');
const suiteLogoTemplate=decodeURIComponent(document.querySelector('nav img').src.split(',')[1]);
for(const [id,p] of Object.entries(LittleSuite.themes)){const o=document.createElement('option');o.value=id;o.textContent=p.name;themeSelect.append(o);}
function applySuiteTheme(id){const p=LittleSuite.apply(id);themeSelect.value=p.id;document.getElementById('input-theme').value=p.accent;const logo=document.querySelector('nav img');if(logo){logo.style.background=p.soft;logo.src='data:image/svg+xml,'+encodeURIComponent(suiteLogoTemplate.replaceAll('#9876b7',p.accent).replaceAll('#f0e8f6',p.soft).replaceAll('#c4aed8',p.wall));document.getElementById('dynamic-favicon').href=logo.src;}const avatar=document.getElementById('setup-pfp-preview');if(!globalBase64PFP){if(avatar)avatar.src=logo.src;document.getElementById('nav-pfp').src=logo.src;}}
applySuiteTheme(LittleSuite.current());
themeSelect.addEventListener('change',()=>applySuiteTheme(themeSelect.value));
window.addEventListener('DOMContentLoaded',()=>applySuiteTheme(LittleSuite.current()));
window.addEventListener('storage',e=>{if(e.key==='little-suite.theme')applySuiteTheme(e.newValue);});
</script>
<footer class="suite-footer"><span>✿ Little Timetable · part of Little Desk</span><span>A little space to make your own · by Audrey</span></footer>
'''
s=s.replace('</body>',addon+'</body>')
# A separate data key makes this a separate app, even on the same GitHub origin.
s=s.replace('acemygcses_v8_data','little-timetable.v1')
s=s.replace("localStorage.getItem('little-timetable.v1')","localStorage.getItem('little-timetable.v1') || localStorage.getItem('acemygcses_v8_data')")
s=s.replace("document.getElementById('dynamic-favicon').setAttribute('href', globalBase64PFP);",'')
s=s.replace("document.getElementById('dynamic-favicon').setAttribute('href', profile.pfp);",'')
(root/'timetable.html').write_text(s)
print('Prepared Little Timetable with original schedule and homework functions.')
