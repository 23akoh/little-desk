/* Checklists organise work; they never mint coins. Focus sessions plus a short
   reflection earn capped points. Browser-local coins are not proof of real work. */
const DeskModel=(()=>{
  const STORAGE_KEY='little-desk.v2',LEGACY_KEY='little-desk.v1',catalog=LittleSuite.catalog,ids=catalog.map(i=>i.id);
  const defaultLinks={timetable:'https://23akoh.github.io/little-desk/timetable.html',lofi:'https://23akoh.github.io/little-desk/focus.html'};
  const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  function safeURL(v){try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
  function fresh(day=dayKey()){
    const seeds=[['Choose one assignment to move forward','School'],['Practise the thing I found difficult','School'],['Get tomorrow’s materials ready','School'],['Move one project a little further','Work'],['Reply to one important message','Work'],['Clear a little space on my desk','Home'],['Help with one thing at home','Home'],['Read something just for me','Personal'],['Make time to move or stretch','Personal'],['Do one thing that makes me happy','Personal']];
    return {version:2,day,coins:60,theme:'lavender',habits:seeds.map(([text,category],i)=>({id:'h-'+i,text,category,minutes:25})),done:[],claimed:[],owned:['plant','books'],visible:['plant','books'],positions:{},dailyCoins:0,totalMinutes:0,sessions:[],pending:null,goal:'',companion:true,links:{...defaultLinks}};
  }
  function rollover(s,day=dayKey()){if(s.day===day)return false;s.day=day;s.done=[];s.claimed=[];s.dailyCoins=0;return true;}
  function position(s,id,x,y){if(!s.owned.includes(id)||!Number.isFinite(x)||!Number.isFinite(y))return false;const scale=catalog.find(i=>i.id===id).scale;s.positions[id]={x:Math.round(Math.max(5,Math.min(995-100*scale,x))),y:Math.round(Math.max(5,Math.min(620-100*scale,y)))};return true;}
  function restore(raw,day=dayKey()){
    const s=JSON.parse(raw);if(!s||![1,2].includes(s.version)||!Array.isArray(s.habits)||s.habits.length>60||!Number.isSafeInteger(s.coins)||s.coins<0||s.coins>1000000)throw new Error('Invalid saved desk');
    if(!s.habits.every(h=>h&&typeof h.id==='string'&&/^[a-zA-Z0-9_-]+$/.test(h.id)&&h.id.length<=90&&typeof h.text==='string'&&h.text.trim()&&h.text.length<=90)||new Set(s.habits.map(h=>h.id)).size!==s.habits.length)throw new Error('Invalid habits');
    for(const k of ['done','owned','visible'])if(!Array.isArray(s[k])||!s[k].every(id=>typeof id==='string'))throw new Error('Invalid item lists');
    if(typeof s.day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.day))throw new Error('Invalid day');
    const base=fresh(day),migrating=s.version===1;s.version=2;s.theme=LittleSuite.themes[s.theme]?s.theme:'lavender';
    s.habits=s.habits.map(h=>({...h,category:LittleSuite.categories.includes(h.category)?h.category:'Personal',minutes:Number.isInteger(h.minutes)&&h.minutes>=1&&h.minutes<=180?h.minutes:25}));
    if(migrating&&s.habits.length===3&&s.habits.every(h=>['h-read','h-focus','h-water'].includes(h.id))){s.habits=base.habits;s.done=[];}
    s.owned=[...new Set(s.owned.filter(id=>ids.includes(id)))];s.visible=[...new Set(s.visible.filter(id=>s.owned.includes(id)))];s.done=[...new Set(s.done.filter(id=>s.habits.some(h=>h.id===id)))];
    s.claimed=Array.isArray(s.claimed)?s.claimed.filter(x=>typeof x==='string').slice(0,100):[];s.dailyCoins=Number.isInteger(s.dailyCoins)?Math.max(0,Math.min(60,s.dailyCoins)):0;
    s.totalMinutes=Number.isFinite(s.totalMinutes)?Math.max(0,Math.min(1000000,s.totalMinutes)):0;s.sessions=Array.isArray(s.sessions)?s.sessions.filter(v=>v&&typeof v.id==='string'&&typeof v.reflection==='string'&&typeof v.goal==='string'&&Number.isFinite(v.minutes)).slice(-100):[];
    const old=s.positions;s.positions={};if(old&&typeof old==='object')for(const id of ids)if(old[id])position(s,id,old[id].x,old[id].y);
    s.goal=typeof s.goal==='string'?s.goal.slice(0,90):'';s.companion=s.companion!==false;s.pending=s.pending&&typeof s.pending.id==='string'&&typeof s.pending.goal==='string'&&Number.isFinite(s.pending.minutes)&&s.pending.minutes>=1&&s.pending.minutes<=180?s.pending:null;
    s.links={timetable:typeof s.links?.timetable==='string'?safeURL(s.links.timetable):defaultLinks.timetable,lofi:typeof s.links?.lofi==='string'?safeURL(s.links.lofi):defaultLinks.lofi};rollover(s,day);return s;
  }
  function toggleHabit(s,id,day=dayKey()){rollover(s,day);if(!s.habits.some(h=>h.id===id))return false;if(s.done.includes(id))s.done=s.done.filter(x=>x!==id);else s.done.push(id);return true;}
  function addHabit(s,text,id,category='Personal',minutes=25){text=text.trim();if(!text||text.length>90||s.habits.length>=60||s.habits.some(h=>h.id===id||h.text.toLowerCase()===text.toLowerCase()))return false;s.habits.push({id,text,category:LittleSuite.categories.includes(category)?category:'Personal',minutes:Number.isInteger(+minutes)&&+minutes>=1&&+minutes<=180?+minutes:25});return true;}
  function removeHabit(s,id){s.habits=s.habits.filter(h=>h.id!==id);s.done=s.done.filter(x=>x!==id);}
  function itemAction(s,id){const i=catalog.find(i=>i.id===id);if(!i)return 'invalid';if(!s.owned.includes(id)){if(s.coins<i.price)return 'insufficient';s.coins-=i.price;s.owned.push(id);s.visible.push(id);return 'unlocked';}if(s.visible.includes(id)){s.visible=s.visible.filter(x=>x!==id);return 'hidden';}s.visible.push(id);return 'shown';}
  function finishFocus(s,id,goal,minutes){if(typeof id!=='string'||!goal?.trim()||!Number.isFinite(minutes)||minutes<1||minutes>180||s.pending||s.sessions.some(v=>v.id===id))return false;s.pending={id,goal:goal.trim().slice(0,90),minutes};return true;}
  function claimFocus(s,reflection,day=dayKey()){rollover(s,day);reflection=reflection.trim();const v=s.pending;if(!v||reflection.length<10||reflection.length>300||s.sessions.some(x=>x.id===v.id))return null;const coins=Math.min(60-s.dailyCoins,v.minutes>=10?Math.floor(v.minutes/5)*4:0);s.coins=Math.min(1000000,s.coins+coins);s.dailyCoins+=coins;s.totalMinutes+=v.minutes;s.sessions.push({...v,reflection,day,coins});s.sessions=s.sessions.slice(-100);s.pending=null;return coins;}
  return {STORAGE_KEY,LEGACY_KEY,dayKey,fresh,restore,rollover,toggleHabit,addHabit,removeHabit,itemAction,safeURL,position,finishFocus,claimFocus};
})();
