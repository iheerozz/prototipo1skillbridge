/* =================== STUDENT MOBILE APP =================== */
const SS={};
const TABS=[["home","Home","home"],["search","Search","search"],["projects","Projects","brief"],["wallet","Wallet","wallet"],["profile","Profile","user"]];
const TABROOT={home:1,search:1,projects:1,wallet:1,profile:1};

function stuRender(dir,keep){
  const [id,p]=S.stack[S.stack.length-1];const o=SS[id](p);
  const pg=$("#pg"),st=keep&&pg?pg.scrollTop:0;
  $("#sv").innerHTML=`<div class="page ${keep?"":dir==="r"?"in-r":dir==="l"?"in-l":"in-f"}" id="pg">${o.html}</div>${o.over||""}`;
  if(keep)$("#pg").scrollTop=st;
  const root=S.stack[0][0];
  $("#tabbar").hidden=!!o.bare;
  $("#tabbar").innerHTML=TABS.map(([k,l,i])=>`<button aria-current="${root===k&&!o.bare?"page":"false"}" onclick="stuReset('${k}')">${ic(i,23,1.9)}${l}${k==="projects"&&S.apps.p2&&S.apps.p2.st==="offer"?'<i class="dot"></i>':""}</button>`).join("");
  $("#sbar").classList.toggle("light",!!o.light);
  if(o.after)o.after();
  renderGuide();
}
const stuRefresh=()=>stuRender(null,true);
function stuGo(id,p){closeSheet();S.stack.push([id,p]);stuRender("r");}
function stuBack(){closeSheet();if(S.stack.length>1){S.stack.pop();stuRender("l");}}
function stuReset(id,p){closeSheet();S.stack=[[id,p]];stuRender("f");}
function stuJump(id,p){if(TABROOT[id]){stuReset(id,p);return;}const rootOf={project:"search",apply:"search",offer:"projects",contract:"projects",workspace:"projects",chat:"home",cert:"profile"};closeSheet();S.stack=[[rootOf[id]||"home"],[id,p]];stuRender("r");}
function openSheet(h){$("#sheet").innerHTML=`<div class="grab"></div>${h}`;$("#sheet").classList.add("on");$("#scrim").classList.add("on");}
function closeSheet(){const s=$("#sheet");if(s){s.classList.remove("on");$("#scrim").classList.remove("on");}}
function toast(m,i="check"){const t=$("#toast");t.innerHTML=ic(i,17,2.4)+esc(m);t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),2300);}
function banner(t,b,go){if(S.mode!=="stu"){S.banner=[t,b,go];return;}const el=$("#banner");el.innerHTML=`<span class="lg">${BRANDMARK(22,"#fff")}</span><div class="grow"><div class="between"><b class="s">SkillBridge</b><span class="xs muted">now</span></div><div class="s b">${esc(t)}</div><div class="xs muted">${esc(b)}</div></div>`;
  el.onclick=()=>{el.classList.remove("on");if(go)stuJump(go[0],go[1]);};el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("on"),4200);}
function confetti(host){const box=document.createElement("div");box.className="confetti";const cols=["#2348F5","#F2522B","#F5A400","#0B7A55","#7C3AED"];
  for(let i=0;i<46;i++){const c=document.createElement("i");c.style.left=Math.random()*100+"%";c.style.background=cols[i%5];c.style.animationDelay=Math.random()*.4+"s";c.style.transform=`rotate(${Math.random()*90}deg)`;box.appendChild(c);}
  host.appendChild(box);setTimeout(()=>box.remove(),2200);}

const navBar=(t,right="")=>`<div class="nav"><button class="ib" onclick="stuBack()" aria-label="Back">${ic("back",20,2.2)}</button><div class="t">${t}</div>${right||'<span style="width:40px"></span>'}</div>`;
const msSplit=p=>{const n=p.deliv.length,sp=n===3?[.3,.4,.3]:n===2?[.5,.5]:[1];return p.deliv.map((d,i)=>({t:d,a:Math.round(p.pay*sp[i]/1000)*1000}));};
const matchPill=m=>`<span class="pill ${m>=85?"p-brand":m>=70?"p-gray":"p-gray"}">${ic("bolt",12,2.2)}${m}% match</span>`;
const isSaved=id=>S.saved.has(id);
function toggleSave(id,ev){if(ev)ev.stopPropagation();isSaved(id)?S.saved.delete(id):S.saved.add(id);toast(isSaved(id)?"Saved to your list":"Removed from saved",isSaved(id)?"heart":"close");stuRefresh();}
const appSt=id=>S.apps[id]?S.apps[id].st:null;
const stLabel={sent:"Sent",viewed:"Viewed",shortlisted:"Shortlisted",offer:"Offer received",hired:"Hired",declined:"Not selected"};

/* ---------- onboarding ---------- */
SS.splash=()=>({bare:1,light:1,html:`<div class="splash"><div class="lgbig">${BRANDMARK(52)}</div><div style="font-size:1.7rem;font-weight:700;letter-spacing:-.03em">SkillBridge</div><div style="opacity:.8;font-size:.9rem">Real projects before your internship</div></div>`,
  after:()=>setTimeout(()=>{if(S.stack.at(-1)[0]==="splash"){S.onb=0;stuReset("onb");}},1500)});
const ONB=[
 ["Get experience before your internship","Local companies post short, paid projects. You build a real CV while you study.",
  `<svg width="290" height="250" viewBox="0 0 290 250" aria-hidden="true"><circle cx="145" cy="125" r="112" fill="var(--brand-soft)"/>
   <path d="M30 175 C80 85 210 85 260 175" fill="none" stroke="#2348F5" stroke-width="12" stroke-linecap="round"/><path d="M20 175h250" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>
   ${[70,108,145,182,220].map(x=>`<line x1="${x}" y1="${175-Math.max(8,62-Math.abs(145-x)*.62)}" x2="${x}" y2="175" stroke="#2348F5" stroke-width="4"/>`).join("")}
   <g transform="translate(18 116)"><rect width="50" height="50" rx="16" fill="var(--card)" stroke="var(--line)" stroke-width="2"/><g transform="translate(13 13)" stroke="#2348F5" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${I.cap}" transform="scale(1)"/></g></g>
   <g transform="translate(222 116)"><rect width="50" height="50" rx="16" fill="var(--card)" stroke="var(--line)" stroke-width="2"/><g transform="translate(13 13)" stroke="#F2522B" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${I.building}"/></g></g>
   <g transform="translate(112 46)"><rect width="66" height="30" rx="15" fill="#F2522B"/><text x="33" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">$350k</text></g></svg>`],
 ["Paid, and protected from day one","The company pays into SkillBridge before you start. Each milestone you finish is released to your wallet.",
  `<svg width="290" height="250" viewBox="0 0 290 250" aria-hidden="true"><circle cx="145" cy="125" r="112" fill="var(--ok-soft)"/>
   <rect x="62" y="70" width="166" height="108" rx="20" fill="#2348F5"/><rect x="62" y="98" width="166" height="16" fill="#1630C4"/><rect x="80" y="134" width="60" height="10" rx="5" fill="#fff" opacity=".7"/>
   <g transform="translate(176 132)"><circle r="34" fill="var(--ok)" stroke="var(--card)" stroke-width="6"/><path d="M-13 0l9 9 17-18" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`],
 ["A verified certificate for every project","Ratings and certificates you can add to LinkedIn. Your CV is ready before your internship starts.",
  `<svg width="290" height="250" viewBox="0 0 290 250" aria-hidden="true"><circle cx="145" cy="125" r="112" fill="var(--coral-soft)"/>
   <rect x="58" y="58" width="174" height="128" rx="16" fill="var(--card)" stroke="var(--line)" stroke-width="2.5"/>
   <rect x="80" y="82" width="90" height="11" rx="5" fill="#2348F5"/><rect x="80" y="104" width="128" height="8" rx="4" fill="var(--line)"/><rect x="80" y="120" width="104" height="8" rx="4" fill="var(--line)"/>
   <g transform="translate(200 172)"><circle r="30" fill="#F2522B"/><path d="M-11 0l7 7 14-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`]
];
SS.onb=()=>{const i=S.onb,o=ONB[i];return{bare:1,html:`<div class="onb">
  <div class="between"><span class="row" style="gap:8px">${BRANDMARK(24)}<b>SkillBridge</b></span><button class="link" onclick="stuGo('signup')">Skip</button></div>
  <div class="art">${o[2]}</div><div class="dots">${ONB.map((_,k)=>`<i class="${k===i?"on":""}"></i>`).join("")}</div>
  <h2>${o[0]}</h2><p>${o[1]}</p>
  <button class="btn" onclick="${i<2?"S.onb++;stuRender('r')":"stuGo('signup')"}">${i<2?"Continue":"Create my account"}</button>
  <button class="btn sec mt10" onclick="stuGo('signup')">I already have an account</button></div>`};};
SS.signup=()=>({bare:1,html:`${navBar("Create account")}<div class="pad">
  <h2 style="font-size:1.5rem;letter-spacing:-.03em;margin:6px 0 4px">Use your university email</h2><p class="muted s" style="margin:0 0 18px">Only verified students can apply. It keeps companies confident.</p>
  <div class="field"><label for="em">University email</label><input id="em" class="inp" value="guillaume.c@unisabana.edu.co" autocomplete="off"></div>
  <div class="field"><label for="pr">Program</label><input id="pr" class="inp" value="International Business"></div>
  <div class="field"><label>Semester</label><div class="opts">${["6th","7th","8th","9th","Last"].map(s=>`<button class="opt ${s==="Last"?"on":""}" onclick="this.parentNode.querySelectorAll('.opt').forEach(b=>b.classList.remove('on'));this.classList.add('on')">${s}</button>`).join("")}</div></div>
  <div class="card row" style="align-items:flex-start;margin-bottom:16px"><span style="color:var(--brand)">${ic("shield",22)}</span><p class="s muted" style="margin:0">We check your email domain against 74 Colombian universities. Your data is protected under Ley 1581 de 2012.</p></div>
  <button class="btn" onclick="stuGo('verify')">Send me a code</button></div>`});
SS.verify=()=>({bare:1,html:`${navBar("Verify email")}<div class="pad" style="text-align:center">
  <div style="width:72px;height:72px;border-radius:22px;background:var(--brand-soft);color:var(--brand);display:grid;place-items:center;margin:20px auto 14px">${ic("send",30)}</div>
  <h2 style="font-size:1.4rem;letter-spacing:-.03em;margin:0 0 6px">Check your inbox</h2><p class="muted s" style="margin:0">We sent a 6-digit code to<br><b style="color:var(--ink)">guillaume.c@unisabana.edu.co</b></p>
  <div class="otp">${"482916".split("").map((d,i)=>`<span class="${i===5?"f":""}">${d}</span>`).join("")}</div>
  <button class="btn" onclick="toast('Email verified');setTimeout(()=>stuGo('setup'),500)">Verify</button><p class="xs muted mt14">Resend code in 0:41</p></div>`});
SS.setup=()=>{const su=S.setup;const sk=["French teaching","Translation","Market research","Excel","Social media","Canva","Power BI","Copywriting","Surveys","Branding"];
 return{bare:1,html:`${navBar("Your profile")}<div class="stepper"><i class="on"></i><i class="on"></i><i class="on"></i></div><div class="pad">
  <h2 style="font-size:1.4rem;letter-spacing:-.03em;margin:0 0 4px">What can you do?</h2><p class="muted s" style="margin:0 0 14px">Pick at least 3 skills. We use them to match you.</p>
  <div class="opts">${sk.map(s=>`<button class="opt ${su.skills.has(s)?"on":""}" onclick="S.setup.skills.has('${s}')?S.setup.skills.delete('${s}'):S.setup.skills.add('${s}');stuRefresh()">${su.skills.has(s)?ic("check",14,2.6):""}${s}</button>`).join("")}</div>
  <div class="lbl mt20">Languages</div><div class="opts">${["FR","ES","EN","PT","DE"].map(l=>`<button class="opt ${su.langs.has(l)?"on":""}" onclick="S.setup.langs.has('${l}')?S.setup.langs.delete('${l}'):S.setup.langs.add('${l}');stuRefresh()">${l}</button>`).join("")}</div>
  <div class="lbl mt20">Hours per week</div><div class="opts">${["Up to 5 h","6 to 10 h","10 h+"].map(h=>`<button class="opt ${su.hours===h?"on":""}" onclick="S.setup.hours='${h}';stuRefresh()">${h}</button>`).join("")}</div>
  <button class="btn mt20" ${su.skills.size<3?"disabled":""} onclick="stuGo('matching')">Find my matches</button><div style="height:20px"></div></div>`};};
SS.matching=()=>({bare:1,html:`<div class="scan"><div class="orb"><span style="color:var(--brand)">${ic("spark",44,1.6)}</span></div>
  <h2 style="font-size:1.35rem;letter-spacing:-.03em;margin:6px 0 0">Finding projects for you</h2>
  <ul class="chk" id="chk">${["Reading your 4 skills and 3 languages","Checking 48 open projects","Ranking by match and distance from Chía"].map(t=>`<li>${ic("check",18,2.6)}${t}</li>`).join("")}</ul></div>`,
  after:()=>{const li=[...document.querySelectorAll("#chk li")];li.forEach((l,i)=>setTimeout(()=>l.classList.add("on"),300+i*600));setTimeout(()=>{if(S.stack.at(-1)[0]==="matching"){stuReset("home");toast("12 projects match your profile","spark");}},2400);}});

/* ---------- home ---------- */
function mcard(p){const c=CO[p.co];return `<article class="mcard" onclick="stuGo('project','${p.id}')"><div class="cv">${cover(p.area,118,p.id.length+p.pay%7)}<span class="mt">${p.match}% match</span>${logo(p.co,44)}</div>
  <div class="bd"><div class="ti">${esc(p.title)}</div><div class="xs muted ell mt6">${esc(c.n)} · ${p.mode==="Remote"?"Remote":p.town}</div>
  <div class="between mt10"><span class="money">${fmt(p.pay)}</span><span class="chip">${ic("clock",13)}${p.dur}</span></div></div></article>`;}
SS.home=()=>{
  const open=PROJECTS.filter(p=>p.status==="open"&&!S.apps[p.id]).sort((a,b)=>b.match-a.match);
  const offer=Object.entries(S.apps).find(([k,a])=>a.st==="offer");
  const act=myWorks();const u=unreadStu();
  return{html:`<div style="height:6px"></div><div class="hello">${av("s1",46)}<div class="grow"><span class="xs muted">Good morning</span><b>Guillaume</b></div>
   <button class="ib" onclick="stuGo('inbox')" aria-label="Messages">${ic("chat",20)}</button><button class="ib" onclick="stuGo('notifs')" aria-label="Notifications">${ic("bell",20)}${u?`<span class="bd">${u}</span>`:""}</button></div>
   <div class="card strength tap" onclick="stuReset('profile')">${ring(85,56,6,"var(--brand)")}<div class="grow"><div class="b">Profile strength: strong</div><div class="xs muted">Add one portfolio item to reach 100% and appear first in searches.</div></div>${ic("chev",18)}</div>
   ${offer?`<div class="card tap" style="margin:10px 16px 0;background:var(--coral-soft);border-color:transparent" onclick="stuJump('offer','${offer[0]}')"><div class="row">${logo(P(offer[0]).co,42)}<div class="grow"><div class="pill" style="background:var(--coral);color:#fff">New offer</div><div class="b s mt6">${esc(CO[P(offer[0]).co].n)} wants to hire you</div><div class="xs" style="color:var(--coral-ink)">${esc(P(offer[0]).title)} · ${fmt(P(offer[0]).pay)}</div></div>${ic("chev",18)}</div></div>`:""}
   ${act.map(([k,w])=>{const p=P(k),nx=w.ms.find(m=>m.st!=="paid");return `<div class="card tap" style="margin:10px 16px 0" onclick="stuJump('workspace','${k}')"><div class="between"><span class="xs b muted">Active project</span><span class="pill p-ok">${ic("lock",11,2.4)}${fmt(w.ms.filter(m=>m.st!=="paid").reduce((a,m)=>a+m.a,0))} in escrow</span></div>
     <div class="row mt10">${logo(p.co,40)}<div class="grow"><div class="b s ell">${esc(p.title)}</div><div class="xs muted">Next: ${nx?esc(nx.t):"All done"}</div></div><b class="s">${progress(w)}%</b></div><div class="bar mt10"><i style="width:${progress(w)}%"></i></div></div>`;}).join("")}
   <div class="sect"><h2>Top matches for you</h2><button class="link" onclick="S.sort='match';stuReset('search')">See all</button></div>
   <div class="carousel" aria-label="Top matches">${open.slice(0,5).map(mcard).join("")}</div>
   <div class="sect"><h2>Near you</h2><button class="link" onclick="S.view='map';stuReset('search')">Open map</button></div>
   <div class="mapcard" onclick="S.view='map';stuReset('search')">${mapSVG(PROJECTS.filter(p=>p.status==="open"&&p.mode!=="Remote"),null,150)}<div class="ft"><span class="s"><b>${PROJECTS.filter(p=>p.status==="open"&&p.mode!=="Remote").length} on-site projects</b> <span class="muted">around Chía</span></span>${ic("chev",18)}</div></div>
   <div class="sect"><h2>Explore by area</h2></div>
   <div class="catgrid">${Object.entries(AREAS).map(([a,A])=>`<button class="catbtn" style="background:linear-gradient(140deg,${A.c1},${A.c2})" onclick="S.f.areas=new Set(['${a}']);S.view='list';stuReset('search')"><span>${ic(A.ic,22,1.8)}</span><span><b>${a}</b><br><small>${PROJECTS.filter(p=>p.area===a&&p.status==="open").length} open</small></span></button>`).join("")}</div>
   <div class="sect"><h2>Closing soon</h2></div>
   <div class="pad">${open.filter(p=>p.closes<=3).map(p=>listCard(p)).join("")}</div><div style="height:22px"></div>`};};

/* ---------- search ---------- */
function filtered(){const q=S.q.trim().toLowerCase(),f=S.f;
  let l=PROJECTS.filter(p=>p.status==="open"&&(!f.areas.size||f.areas.has(p.area))&&(!f.modes.size||f.modes.has(p.mode))&&p.pay>=f.minPay&&[...f.langs].every(x=>p.langs.includes(x))
    &&(!q||(p.title+" "+CO[p.co].n+" "+p.area+" "+p.skills.join(" ")+" "+p.desc).toLowerCase().includes(q)));
  const so={match:(a,b)=>b.match-a.match,pay:(a,b)=>b.pay-a.pay,closing:(a,b)=>a.closes-b.closes,new:(a,b)=>parseInt(b.posted?.slice(4)||0)-parseInt(a.posted?.slice(4)||0)}[S.sort];return l.sort(so);}
function listCard(p){const c=CO[p.co],st=appSt(p.id);return `<div class="card tap" onclick="stuGo('project','${p.id}')"><div class="lcard">${logo(p.co,46)}<div class="grow">
  <div class="between" style="align-items:flex-start"><div class="ti">${esc(p.title)}</div><button class="save ${isSaved(p.id)?"on":""}" aria-label="${isSaved(p.id)?"Saved":"Save"}" onclick="toggleSave('${p.id}',event)">${ic("heart",20,2,isSaved(p.id)?"currentColor":"none")}</button></div>
  <div class="xs muted">${esc(c.n)} · ${p.mode==="Remote"?"Remote":p.mode+" · "+p.town}</div>
  <div class="row mt10" style="flex-wrap:wrap;gap:6px">${cat(p.area,1)}${matchPill(p.match)}${st?`<span class="pill p-coral">${stLabel[st]}</span>`:p.closes<=2?`<span class="pill p-warn">${ic("clock",11,2.4)}${p.closes} d left</span>`:""}</div>
  <div class="between mt10"><span class="money">${fmt(p.pay)}</span><span class="xs muted">${p.dur} · ~${p.hours} h</span></div></div></div></div>`;}
const fCount=()=>S.f.areas.size+S.f.modes.size+S.f.langs.size+(S.f.minPay?1:0);
SS.search=()=>{const l=filtered();const sorts={match:"Best match",pay:"Highest pay",closing:"Closing soon",new:"Newest"};
 const pins=l.filter(p=>TOWNS[p.town]);const sel=pins.find(p=>p.id===S.mapSel)||pins[0];
 return{html:`<div class="lt"><div class="grow"><h1>Search</h1><div class="sub">${PROJECTS.filter(p=>p.status==="open").length} open projects around Bogotá</div></div></div>
  <div class="pad"><div class="search">${ic("search",19)}<input id="q" placeholder="Try French, Excel, translation" value="${esc(S.q)}" aria-label="Search projects" oninput="S.q=this.value;clearTimeout(window._qt);window._qt=setTimeout(()=>{stuRefresh();const i=$('#q');i.focus();i.setSelectionRange(i.value.length,i.value.length)},250)">${S.q?`<button class="save" aria-label="Clear" onclick="S.q='';stuRefresh()">${ic("close",17)}</button>`:""}</div>
  <div class="row mt10"><div class="segc grow"><button aria-pressed="${S.view==="list"}" onclick="S.view='list';stuRefresh()">${ic("list",15)} List</button><button aria-pressed="${S.view==="map"}" onclick="S.view='map';stuRefresh()">${ic("map",15)} Map</button></div>
   <button class="ib" aria-label="Sort" onclick="sortSheet()">${ic("sort",19)}</button><button class="ib" aria-label="Filters" onclick="filterSheet()">${ic("filter",19)}${fCount()?`<span class="bd">${fCount()}</span>`:""}</button></div></div>
  <div class="hscroll mt10">${["All",...Object.keys(AREAS)].map(a=>{const on=a==="All"?!S.f.areas.size:S.f.areas.has(a)&&S.f.areas.size===1;return `<button class="opt ${on?"on":""}" style="flex:none" onclick="S.f.areas=new Set(${a==="All"?"[]":`['${a}']`});stuRefresh()">${a}</button>`;}).join("")}</div>
  <div class="between pad mt14"><span class="s"><b>${l.length} result${l.length===1?"":"s"}</b> <span class="muted">· ${sorts[S.sort]}</span></span>${fCount()?`<button class="link" onclick="S.f={areas:new Set(),modes:new Set(),minPay:0,langs:new Set()};stuRefresh()">Clear filters</button>`:""}</div>
  <div class="pad mt10">${!l.length?`<div class="card" style="text-align:center;padding:26px"><div style="color:var(--faint)">${ic("search",34)}</div><b>No project matches</b><p class="s muted" style="margin:6px 0 12px">Try another word or remove a filter.</p><button class="btn soft sm" onclick="S.q='';S.f={areas:new Set(),modes:new Set(),minPay:0,langs:new Set()};stuRefresh()">Reset search</button></div>`:
   S.view==="list"?l.map(listCard).join(""):
   `<div class="card" style="padding:0;overflow:hidden">${mapSVG(pins,sel&&sel.id,300)}</div>${sel?`<div class="mt10">${listCard(sel)}</div>`:""}<p class="xs muted" style="text-align:center">${l.length-pins.length} remote project${l.length-pins.length===1?"":"s"} not on the map · tap a pin</p>`}</div><div style="height:20px"></div>`,
  after:()=>document.querySelectorAll(".mpin").forEach(g=>g.addEventListener("click",()=>{S.mapSel=g.dataset.id;stuRefresh();}))};};
function sortSheet(){openSheet(`<h3>Sort by</h3><div class="mt10">${[["match","Best match"],["pay","Highest pay"],["closing","Closing soon"],["new","Newest"]].map(([k,l])=>`<div class="radio ${S.sort===k?"on":""}" onclick="S.sort='${k}';closeSheet();stuRefresh()"><span class="rd"></span><b class="s">${l}</b></div>`).join("")}</div>`);}
function filterSheet(){const f=S.f;openSheet(`<div class="between"><h3>Filters</h3><button class="link" onclick="S.f={areas:new Set(),modes:new Set(),minPay:0,langs:new Set()};filterSheet()">Reset</button></div>
  <div class="lbl mt14">Area</div><div class="opts">${Object.keys(AREAS).map(a=>`<button class="opt ${f.areas.has(a)?"on":""}" onclick="S.f.areas.has('${a}')?S.f.areas.delete('${a}'):S.f.areas.add('${a}');filterSheet()">${a}</button>`).join("")}</div>
  <div class="lbl mt14">Where</div><div class="opts">${["Remote","Hybrid","On-site"].map(a=>`<button class="opt ${f.modes.has(a)?"on":""}" onclick="S.f.modes.has('${a}')?S.f.modes.delete('${a}'):S.f.modes.add('${a}');filterSheet()">${a}</button>`).join("")}</div>
  <div class="lbl mt14">Required language</div><div class="opts">${["FR","EN","ES"].map(a=>`<button class="opt ${f.langs.has(a)?"on":""}" onclick="S.f.langs.has('${a}')?S.f.langs.delete('${a}'):S.f.langs.add('${a}');filterSheet()">${LANGN[a]}</button>`).join("")}</div>
  <div class="between mt14"><span class="lbl" style="margin:0">Minimum pay</span><b class="s num" id="mpv">${fmt(f.minPay)}</b></div>
  <input type="range" min="0" max="500000" step="50000" value="${f.minPay}" aria-label="Minimum pay" oninput="S.f.minPay=+this.value;$('#mpv').textContent=fmt(+this.value)">
  <button class="btn mt14" onclick="closeSheet();stuRefresh()">Show ${filtered().length} projects</button>`);}

/* ---------- project ---------- */
const CO_REV={andina:[["Sofía L.","Clear brief and fast payment. Laura answers in minutes."],["Mateo H.","Very organised team, good feedback on each milestone."]],
 aventura:[["Daniela R.","Friendly team. The brief changed a little but they paid for it."]],andes:[["Valentina R.","Professional and clear. Good first project for logistics."]],
 casa:[["Guillaume C.","Lovely team, very motivated to learn."]],raiz:[["Andrés M.","Great brief and very respectful of my class schedule."]]};
SS.project=pid=>{const p=P(pid),c=CO[p.co],st=appSt(pid),ms=msSplit(p);
 const sim=PROJECTS.filter(x=>x.status==="open"&&x.id!==pid&&(x.area===p.area||x.co===p.co)).slice(0,2);
 return{bare:0,light:1,html:`<div class="phero">${cover(p.area,210,pid.length*3)}<div class="ov"></div><div class="navf"><button class="ib" onclick="stuBack()" aria-label="Back">${ic("back",20,2.2)}</button>
   <span class="row" style="gap:8px"><button class="ib" aria-label="Share" onclick="shareSheet('${esc(p.title)}')">${ic("share",19)}</button><button class="ib" aria-label="Save" style="color:${isSaved(pid)?"var(--coral)":"#0E1320"}" onclick="toggleSave('${pid}')">${ic("heart",19,2,isSaved(pid)?"currentColor":"none")}</button></span></div></div>
  <div class="pbody"><div class="row" style="gap:6px">${cat(p.area)}${matchPill(p.match)}</div>
   <h1 style="font-size:1.45rem;letter-spacing:-.03em;line-height:1.15;margin:10px 0 12px;text-wrap:balance">${esc(p.title)}</h1>
   <div class="row">${logo(p.co,42)}<div class="grow"><div class="b s">${esc(c.n)} <span class="pill p-ok" style="margin-left:4px">${ic("check",11,2.8)}NIT verified</span></div><div class="xs muted">${esc(c.sector)} · ${c.town} · <span class="stars">★</span> ${c.rate} from ${c.done} projects</div></div></div>
   <div class="facts"><div class="fact"><small>You get</small><b class="num">${fmt(p.pay)}</b></div><div class="fact"><small>Duration</small><b>${p.dur}</b></div><div class="fact"><small>Effort</small><b>About ${p.hours} h</b></div><div class="fact"><small>Where</small><b>${p.mode}${p.mode==="Remote"?"":" · "+p.town}</b></div></div>
   <div class="row mt10 xs muted">${ic("clock",14)} Apply in the next ${p.closes} days · ${p.applicants} students applied</div>
   ${p.why?`<div class="card mt14"><div class="row">${ring(p.match,58,6)}<div class="grow"><div class="b">Why you match</div><div class="xs muted">From your skills, languages and past ratings</div></div></div>
     <ul class="reasons">${p.why.map(([k,t])=>`<li><span class="k ${k==="y"?"p-ok":k==="p"?"p-warn":"p-gray"}">${k==="y"?"Yes":k==="p"?"Partly":"Not yet"}</span><span>${t}</span></li>`).join("")}</ul></div>`:""}
   <h3 style="margin:22px 0 6px;font-size:1rem">About the project</h3><p style="margin:0;color:var(--ink2);line-height:1.55">${esc(p.desc)}</p>
   <h3 style="margin:22px 0 8px;font-size:1rem">Milestones and payment</h3><div class="card">${ms.map((m,i)=>`<div class="ms"><span class="ix">${i+1}</span><div class="grow s">${esc(m.t)}</div><b class="s num">${fmt(m.a)}</b></div>`).join("")}
     <div class="hr"></div><div class="row xs muted">${ic("lock",15)} Paid into escrow before you start. Released after each approval.</div></div>
   <h3 style="margin:22px 0 8px;font-size:1rem">Skills and languages</h3><div class="row" style="flex-wrap:wrap;gap:6px">${p.skills.map(s=>`<span class="chip">${s}</span>`).join("")}${p.langs.map(lang).join("")}</div>
   <h3 style="margin:22px 0 8px;font-size:1rem">What students say about ${esc(c.n)}</h3>
   <div class="card">${(CO_REV[p.co]||[["Juan P. S.","Clear brief, paid on time."]]).map(([n,t],i)=>`<div class="${i?"mt10":""}"><div class="between"><b class="s">${n}</b><span class="stars s">★★★★★</span></div><p class="s muted" style="margin:3px 0 0">${t}</p></div>`).join("")}</div>
   ${sim.length?`<h3 style="margin:22px 0 8px;font-size:1rem">Similar projects</h3>${sim.map(listCard).join("")}`:""}</div>`,
  over:`<div class="actionbar"><div><div class="xs muted">${p.dur}</div><div class="money" style="font-size:1.1rem">${fmt(p.pay)}</div></div>${st?`<button class="btn sec" onclick="stuReset('projects')">${stLabel[st]} · see status</button>`:`<button class="btn" onclick="startApply('${pid}')">Apply now</button>`}</div>`};};
function shareSheet(t){openSheet(`<h3>Share</h3><p class="s muted" style="margin:0 0 14px">${t}</p><div class="row" style="justify-content:center">${qr(t,140)}</div>
 <div class="search mt14"><input readonly value="skillbridge.co/p/${t.toLowerCase().replace(/[^a-z]+/g,"-").slice(0,30)}" aria-label="Link"><button class="btn sm soft" onclick="copyTxt('skillbridge.co/p/link')">Copy</button></div>`);}
function copyTxt(t){try{navigator.clipboard.writeText(t).then(()=>toast("Link copied"),()=>toast("Link ready to copy"));}catch(e){toast("Link ready to copy");}}

/* ---------- apply ---------- */
function startApply(pid){const p=P(pid);S.ap={pid,step:1,price:p.pay,counter:false,start:"Mon, Nov 24",hours:"8 h",att:new Set(["Profile","3 certificates"]),
  text:p.area==="Languages"?`Bonjour! I'm a French native and I've been translating between French, Spanish and English for years. On SkillBridge I already translated a restaurant menu (rated 4.8). I can deliver everything in ${p.dur}, with one round of corrections.`:
   p.area==="Teaching"?"Bonjour! I'm a French native and a French teacher, and I run my own online French school. I'll prepare short, practical sessions with real situations from your business.":
   "Hi! I'm in my last semester of International Business at La Sabana. I already did a competitor study for a cosmetics brand (rated 5.0) and I can start this week."};stuGo("apply",pid);}
SS.apply=pid=>{const p=P(pid),a=S.ap,lo=Math.round(p.pay*.85/1000)*1000,hi=Math.round(p.pay*1.15/1000)*1000;
 let body="";
 if(a.step===1)body=`<h2 class="ah">Your proposal</h2><p class="s muted" style="margin:0 0 12px">Tell ${esc(CO[p.co].n)} why you are the right person. Short and concrete works best.</p>
   <textarea id="ptx" class="inp" rows="8" oninput="S.ap.text=this.value;$('#cc').textContent=this.value.length" aria-label="Proposal">${esc(a.text)}</textarea>
   <div class="between mt6"><button class="btn soft sm" onclick="improve()">${ic("spark",15)} Improve with assistant</button><span class="xs muted"><span id="cc">${a.text.length}</span>/800</span></div>
   <div class="card mt14" style="background:var(--brand-soft);border-color:transparent"><div class="b s" style="color:var(--brand-ink)">Tips from companies</div><ul class="s" style="margin:6px 0 0;padding-left:18px;color:var(--brand-ink)"><li>Mention one similar thing you did</li><li>Say when you can deliver</li><li>Keep it under 120 words</li></ul></div>`;
 if(a.step===2)body=`<h2 class="ah">Price and timing</h2><p class="s muted" style="margin:0 0 12px">The company proposed ${fmt(p.pay)}.</p>
   <div class="segc"><button aria-pressed="${!a.counter}" onclick="S.ap.counter=false;S.ap.price=${p.pay};stuRefresh()">Accept ${kfmt(p.pay)}</button><button aria-pressed="${a.counter}" onclick="S.ap.counter=true;stuRefresh()">Propose a price</button></div>
   ${a.counter?`<div class="card mt10"><div class="between"><span class="s muted">Your price</span><b class="num" id="pv" style="font-size:1.3rem">${fmt(a.price)}</b></div>
     <input type="range" min="${Math.round(p.pay*.6/10000)*10000}" max="${Math.round(p.pay*1.4/10000)*10000}" step="10000" value="${a.price}" aria-label="Your price" oninput="S.ap.price=+this.value;$('#pv').textContent=fmt(+this.value);$('#pz').textContent=(+this.value<${lo}?'Below what similar projects paid':+this.value>${hi}?'Above what similar projects paid: fewer chances':'In the usual range')">
     <div class="xs muted">Similar projects paid ${fmt(lo)} to ${fmt(hi)}. <b id="pz" style="color:var(--ink)">In the usual range</b></div></div>`:""}
   <div class="lbl mt20">I can start</div><div class="opts">${["Mon, Nov 24","Wed, Nov 26","Mon, Dec 1"].map(d=>`<button class="opt ${a.start===d?"on":""}" onclick="S.ap.start='${d}';stuRefresh()">${ic("cal",15)}${d}</button>`).join("")}</div>
   <div class="lbl mt20">Hours per week for this project</div><div class="opts">${["4 h","8 h","12 h"].map(d=>`<button class="opt ${a.hours===d?"on":""}" onclick="S.ap.hours='${d}';stuRefresh()">${d}</button>`).join("")}</div>`;
 if(a.step===3)body=`<h2 class="ah">Review and send</h2>
   <div class="card"><div class="row">${logo(p.co,40)}<div class="grow"><div class="b s">${esc(p.title)}</div><div class="xs muted">${esc(CO[p.co].n)}</div></div></div>
    <div class="hr"></div><div class="lines"><div><span class="muted">Your price</span><b class="num">${fmt(a.price)}</b></div><div><span class="muted">SkillBridge fee for you</span><b style="color:var(--ok)">$0</b></div><div><span class="muted">Start</span><b>${a.start}</b></div><div><span class="muted">Time</span><b>${a.hours} per week</b></div></div></div>
   <div class="card"><div class="b s">Proposal</div><p class="s muted" style="margin:6px 0 0;line-height:1.5">${esc(a.text)}</p></div>
   <div class="lbl mt14">Attach to your application</div><div class="opts">${["Profile","3 certificates","CV.pdf","Portfolio"].map(x=>`<button class="opt ${a.att.has(x)?"on":""}" onclick="S.ap.att.has('${x}')?S.ap.att.delete('${x}'):S.ap.att.add('${x}');stuRefresh()">${a.att.has(x)?ic("check",14,2.6):ic("clip",14)}${x}</button>`).join("")}</div>`;
 return{bare:1,html:`${navBar("Apply")}<div class="stepper">${[1,2,3].map(i=>`<i class="${i<=a.step?"on":""}"></i>`).join("")}</div><div class="pad" style="padding-bottom:110px"><style>.ah{font-size:1.35rem;letter-spacing:-.03em;margin:0 0 4px}</style>${body}</div>`,
  over:`<div class="actionbar">${a.step>1?`<button class="btn sec" style="flex:0 0 110px" onclick="S.ap.step--;stuRender('l')">Back</button>`:""}<button class="btn" onclick="${a.step<3?"S.ap.step++;stuRender('r')":`sendApp('${pid}')`}">${a.step<3?"Continue":ic("send",17)+" Send application"}</button></div>`};};
function improve(){const p=P(S.ap.pid);S.ap.text=`Hello ${CO[p.co].n} team,\n\nI'm a French native in my last semester of International Business, and I work every day in French, Spanish and English.\n\nWhat I'll deliver: ${p.deliv.join("; ").toLowerCase()}.\nRelevant experience: 3 finished projects on SkillBridge, all rated 4.8 or more.\nTiming: I can start this week and deliver within ${p.dur}.\n\nGuillaume`;
  stuRefresh();toast("Proposal restructured","spark");}
function sendApp(pid){S.apps[pid]={st:"sent",d:"Today",price:S.ap.price};S.notifs.unshift({t:`Application sent to ${CO[P(pid).co].n}`,w:"now",go:["projects"]});
  if(pid==="c2"){const a=S.coApps.c2.find(x=>x[0]==="s1");if(a)a[3]=S.ap.price;}
  S.stack=[["projects"],["applied",pid]];stuRender("r");}
SS.applied=pid=>{const p=P(pid);return{bare:1,html:`<div class="done"><div class="tick">${ic("check",46,3)}</div><h2>Application sent</h2><p class="muted" style="margin:0">${esc(CO[p.co].n)} usually answers in 2 days.</p></div>
 <div class="pad"><div class="card"><div class="b s">What happens next</div><div class="pipeline">${["Sent","Viewed","Shortlisted","Offer"].map((s,i)=>`<div class="st ${i===0?"done cur":""}"><span class="d"></span>${s}</div>`).join("")}</div></div>
 <div class="card"><div class="row">${ic("bell",20)}<p class="s muted" style="margin:0">We'll notify you as soon as the company views your application.</p></div></div>
 <button class="btn mt14" onclick="stuReset('projects')">Track my applications</button><button class="btn sec mt10" onclick="stuReset('search')">Keep exploring</button></div>`};};

/* ---------- my projects ---------- */
SS.projects=()=>{const tab=S.ptab||"active";const act=myWorks();const apps=Object.entries(S.apps).filter(([k,a])=>a.st!=="hired");
 const order=["sent","viewed","shortlisted","offer"];
 let body="";
 if(tab==="active")body=act.length?act.map(([k,w])=>{const p=P(k),nx=w.ms.find(m=>m.st!=="paid");return `<div class="card tap" onclick="stuGo('workspace','${k}')"><div class="row">${logo(p.co,44)}<div class="grow"><div class="b s">${esc(p.title)}</div><div class="xs muted">${esc(CO[p.co].n)}</div></div>${ring(progress(w),46,5)}</div>
   <div class="hr"></div><div class="between s"><span class="muted">Next milestone</span><b class="ell" style="max-width:60%">${nx?esc(nx.t):"Finished"}</b></div>
   <div class="between s mt6"><span class="muted">Status</span>${nx?nx.st==="review"?'<span class="pill p-warn">Waiting for approval</span>':'<span class="pill p-brand">In progress</span>':'<span class="pill p-ok">Done</span>'}</div>
   <div class="between s mt6"><span class="muted">In escrow</span><b class="num">${fmt(w.ms.filter(m=>m.st!=="paid").reduce((a,m)=>a+m.a,0))}</b></div></div>`;}).join(""):`<div class="card" style="text-align:center;padding:24px"><b>No active project</b><p class="s muted">When a company hires you, it appears here.</p></div>`;
 if(tab==="apps")body=apps.length?apps.map(([k,a])=>{const p=P(k),i=order.indexOf(a.st);return `<div class="card"><div class="row tap" onclick="stuGo('project','${k}')">${logo(p.co,42)}<div class="grow"><div class="b s">${esc(p.title)}</div><div class="xs muted">${esc(CO[p.co].n)} · ${fmt(a.price)} · applied ${a.d}</div></div></div>
   ${a.st==="declined"?`<div class="mt10"><span class="pill p-gray">Not selected this time</span><p class="xs muted" style="margin:6px 0 0">The company chose another student. Your profile stays visible to them.</p></div>`:
   `<div class="pipeline">${order.map((s,j)=>`<div class="st ${j<=i?"done":""} ${j===i?"cur":""}"><span class="d"></span>${stLabel[s].replace(" received","")}</div>`).join("")}</div>
   ${a.st==="offer"?`<button class="btn coral mt14" onclick="stuGo('offer','${k}')">Review offer</button>`:""}`}</div>`;}).join(""):`<div class="card" style="text-align:center;padding:24px"><b>No applications yet</b></div>`;
 if(tab==="done")body=S.certs.map(c=>`<div class="card tap" onclick="stuGo('cert','${c.id}')"><div class="row">${logo(c.co,42)}<div class="grow"><div class="b s">${esc(c.title)}</div><div class="xs muted">${esc(CO[c.co].n)} · ${c.date}</div></div></div>
   <div class="between mt10"><span class="row" style="gap:6px"><span class="pill p-ok">Paid ${kfmt(c.pay)}</span><span class="pill p-gray"><span class="stars">★</span> ${c.rate.toFixed(1)}</span></span><span class="link">Certificate ›</span></div></div>`).join("");
 return{html:`<div class="lt"><div class="grow"><h1>Projects</h1><div class="sub">Your work and applications</div></div><button class="ib" onclick="stuGo('inbox')" aria-label="Messages">${ic("chat",20)}</button></div>
  <div class="pad"><div class="segc">${[["active","Active",act.length],["apps","Applications",apps.length],["done","Completed",S.certs.length]].map(([k,l,n])=>`<button aria-pressed="${tab===k}" onclick="S.ptab='${k}';stuRefresh()">${l} ${n}</button>`).join("")}</div><div class="mt14">${body}</div></div><div style="height:20px"></div>`};};

/* ---------- offer + contract ---------- */
SS.offer=pid=>{const p=P(pid),c=CO[p.co],ms=msSplit(p);return{bare:1,html:`${navBar("Offer")}<div class="pad" style="padding-bottom:110px">
 <div class="card" style="text-align:center;padding:20px 16px">${logo(p.co,58)}<div class="xs muted mt10">${esc(c.n)} wants to hire you for</div><h2 style="font-size:1.25rem;letter-spacing:-.02em;margin:6px 0 4px;text-wrap:balance">${esc(p.title)}</h2>
  <div class="money" style="font-size:1.7rem;color:var(--brand-ink)">${fmt(S.apps[pid].price)}</div><div class="xs muted">Funded into escrow when you sign</div></div>
 <div class="card"><div class="row">${avP("Camilo Ortiz","#1E3A8A","#3B82F6",36)}<div class="grow"><b class="s">Camilo Ortiz</b><div class="xs muted">Marketing lead</div></div></div><p class="s" style="margin:10px 0 0;line-height:1.5">"We loved your sample page. It sounds natural, exactly what our US clients need. Can you start on Monday?"</p></div>
 <div class="card"><div class="lines"><div><span class="muted">Start</span><b>Mon, Nov 24</b></div><div><span class="muted">Deadline</span><b>Mon, Dec 1</b></div><div><span class="muted">Effort</span><b>About ${p.hours} h</b></div></div>
  <div class="hr"></div><div class="b s" style="margin-bottom:4px">Milestones</div>${ms.map((m,i)=>`<div class="ms"><span class="ix">${i+1}</span><div class="grow s">${esc(m.t)}</div><b class="s num">${fmt(m.a)}</b></div>`).join("")}</div>
 <p class="xs muted" style="text-align:center">Offer expires in 47 hours</p></div>`,
 over:`<div class="actionbar"><button class="btn sec" style="flex:0 0 110px" onclick="declineOffer('${pid}')">Decline</button><button class="btn" onclick="stuGo('contract','${pid}')">Accept and sign</button></div>`};};
function declineOffer(pid){openSheet(`<h3>Decline this offer?</h3><p class="s muted">The company will be told politely. You can still apply to other projects.</p><div class="opts mt10">${["Not enough time","Price too low","Other project"].map(r=>`<button class="opt" onclick="this.classList.toggle('on')">${r}</button>`).join("")}</div>
 <button class="btn mt14" style="background:var(--bad)" onclick="S.apps['${pid}'].st='declined';closeSheet();stuReset('projects');toast('Offer declined')">Decline offer</button><button class="btn sec mt10" onclick="closeSheet()">Keep the offer</button>`);}
SS.contract=pid=>{const p=P(pid),c=CO[p.co];S.sig=S.sig||{drawn:false,ok:false};return{bare:1,html:`${navBar("Contract")}<div class="pad" style="padding-bottom:110px">
 <div class="row" style="margin-bottom:12px"><span class="pill p-brand">${ic("doc",12,2.2)}Standard SkillBridge contract</span><span class="xs muted">v2.1 · 2 min read</span></div>
 <div class="doc"><h4>1. The parties</h4><p>${esc(c.n)} S.A.S. (NIT ${c.nit||"900.215.774-1"}) and Guillaume C., student at Universidad de La Sabana.</p>
  <h4>2. Scope</h4><p>${p.deliv.map(esc).join("; ")}. Anything else needs a new milestone agreed in the app.</p>
  <h4>3. Payment</h4><p>${fmt(S.apps[pid].price)}, paid by the company into SkillBridge escrow today. Each milestone is released within 48 hours of approval. If the company does not answer in 5 days, it is released automatically.</p>
  <h4>4. Intellectual property</h4><p>The final deliverables belong to the company once paid. The student may show the work in their portfolio, without confidential data.</p>
  <h4>5. Personal data</h4><p>Both parties handle personal data under Ley 1581 de 2012. This is a service contract, not an employment contract.</p>
  <h4>6. Problems</h4><p>If there is a disagreement, SkillBridge mediates within 72 hours using the chat and files on the platform.</p></div>
 <div class="lbl mt20">Sign with your finger</div><div class="sigpad" id="sig"><span class="ln"></span><span class="ph" id="sph">Draw your signature here</span><canvas id="sigc"></canvas></div>
 <div class="between mt6"><span class="xs muted">Signed electronically · Nov 23, 2026</span><button class="link" onclick="clearSig()">Clear</button></div>
 <div class="subt mt10" onclick="S.sig.ok=!S.sig.ok;this.classList.toggle('on');this.querySelector('.cb').classList.toggle('on');updSign()"><span class="cb ${S.sig.ok?"on":""}">${ic("check",13,3)}</span><span style="text-decoration:none!important;color:var(--ink)!important">I read and accept the contract</span></div></div>`,
 over:`<div class="actionbar"><button class="btn" id="signb" disabled onclick="signContract('${pid}')">${ic("pen",17)} Sign contract</button></div>`,after:initSig};};
function initSig(){const cv=$("#sigc"),box=$("#sig");const r=box.getBoundingClientRect(),dp=devicePixelRatio||1;cv.width=r.width*dp;cv.height=r.height*dp;const x=cv.getContext("2d");x.scale(dp,dp);x.lineWidth=2.4;x.lineCap="round";x.lineJoin="round";x.strokeStyle=getComputedStyle(document.body).getPropertyValue("--ink")||"#0E1320";
 let d=false;const pos=e=>{const b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top];};
 cv.onpointerdown=e=>{d=true;cv.setPointerCapture(e.pointerId);const[a,b]=pos(e);x.beginPath();x.moveTo(a,b);$("#sph").style.display="none";};
 cv.onpointermove=e=>{if(!d)return;const[a,b]=pos(e);x.lineTo(a,b);x.stroke();S.sig.drawn=true;};
 cv.onpointerup=()=>{d=false;updSign();};S.sig={drawn:false,ok:false};updSign();}
function clearSig(){initSig();$("#sph").style.display="";}
function updSign(){const b=$("#signb");if(b)b.disabled=!(S.sig.drawn&&S.sig.ok);}
function signContract(pid){const p=P(pid),ms=msSplit(p);S.apps[pid].st="hired";p.status="active";p.stu="s1";
 S.work[pid]={stu:"s1",ms:ms.map((m,i)=>({t:m.t,a:m.a,st:i===0?"active":"todo",due:["Nov 26","Nov 28","Dec 1"][i],sub:[["Start "+m.t.toLowerCase(),0],["Send draft to the company",0]]})),files:[],act:[["Contract signed by both parties","Today"],[`${CO[p.co].n} funded ${fmt(S.apps[pid].price)} into escrow`,"Today"]]};
 S.threads[p.co+"-s1"]?.msgs.push(["co","Welcome aboard! Talk on Monday.",nowT()]);
 S.stack=[["projects"],["signed",pid]];stuRender("r");setTimeout(()=>confetti($("#screen")),150);}
SS.signed=pid=>{const p=P(pid);return{bare:1,html:`<div class="done"><div class="tick">${ic("check",46,3)}</div><h2>You're hired</h2><p class="muted" style="margin:0">Contract signed. ${esc(CO[p.co].n)} put <b style="color:var(--ink)">${fmt(S.apps[pid].price)}</b> in escrow for you.</p></div>
 <div class="pad"><div class="card"><div class="row">${ic("lock",22)}<p class="s" style="margin:0">The money is safe with SkillBridge. You get it milestone by milestone.</p></div></div><button class="btn mt14" onclick="S.stack=[['projects'],['workspace','${pid}']];stuRender('r')">Open workspace</button></div>`};};

/* ---------- workspace ---------- */
SS.workspace=pid=>{const p=P(pid),w=S.work[pid],c=CO[p.co],tab=S.wtab||"ms";
 const esc0=w.ms.filter(m=>m.st!=="paid").reduce((a,m)=>a+m.a,0),rel=w.ms.filter(m=>m.st==="paid").reduce((a,m)=>a+m.a,0),nx=w.ms.find(m=>m.st!=="paid");
 let body="";
 if(tab==="ms")body=`<div class="card">${w.ms.map((m,i)=>{const subs=m.sub||[];const all=subs.every(s=>s[1]);return `<div class="msrow"><span class="msix ix ${m.st}">${m.st==="paid"?ic("check",15,3):i+1}</span><div class="grow">
   <div class="between" style="align-items:flex-start"><b class="s">${esc(m.t)}</b><b class="s num">${fmt(m.a)}</b></div>
   <div class="row mt6" style="gap:6px">${{paid:'<span class="pill p-ok">Paid</span>',review:'<span class="pill p-warn">Waiting for approval</span>',active:'<span class="pill p-brand">In progress</span>',todo:'<span class="pill p-gray">Up next</span>'}[m.st]}<span class="xs muted">Due ${m.due}</span></div>
   ${m.st==="active"&&subs.length?`<div class="mt10">${subs.map((s,j)=>`<div class="subt ${s[1]?"on":""}" onclick="S.work['${pid}'].ms[${i}].sub[${j}][1]=${s[1]?0:1};stuRefresh()"><span class="cb ${s[1]?"on":""}">${ic("check",13,3)}</span><span>${esc(s[0])}</span></div>`).join("")}</div>
     <button class="btn ${all?"":"soft"} sm mt10" style="width:100%" onclick="submitMs('${pid}',${i})">${ic("send",15)} Submit for approval</button>`:""}</div></div>`;}).join("")}</div>`;
 if(tab==="files")body=`<div class="card">${w.files.length?w.files.map(fileRow).join(""):`<p class="s muted" style="margin:0">No files yet.</p>`}</div>
   <label class="btn sec mt10" style="cursor:pointer">${ic("upload",18)} Upload files<input type="file" multiple hidden onchange="upFiles('${pid}',this.files)"></label><p class="xs muted" style="text-align:center">Files stay in the project, the company sees them instantly.</p>`;
 if(tab==="act")body=`<div class="card"><ul class="feed">${w.act.slice().reverse().map(a=>`<li><span class="dt"></span><div class="grow"><div>${esc(a[0])}</div><div class="xs muted">${a[1]}</div></div></li>`).join("")}</ul></div>`;
 return{bare:0,html:`${navBar("Workspace",`<button class="ib" aria-label="Chat" onclick="stuGo('chat','${p.co}-s1')">${ic("chat",20)}</button>`)}
  <div class="wshead"><div class="row">${logo(p.co,40)}<div class="grow"><div class="b ell">${esc(p.title)}</div><div class="xs" style="opacity:.85">${esc(c.n)}</div></div><b style="font-size:1.4rem">${progress(w)}%</b></div>
   <div class="bar mt10" style="background:rgba(255,255,255,.25)"><i style="width:${progress(w)}%;background:#fff"></i></div>
   <div class="esc"><div><small>In escrow</small><b class="num">${kfmt(esc0)}</b></div><div><small>Released</small><b class="num">${kfmt(rel)}</b></div><div><small>Next payment</small><b class="num">${nx?kfmt(nx.a):"–"}</b></div></div></div>
  <div class="pad mt14"><div class="segc">${[["ms","Milestones"],["files",`Files ${w.files.length}`],["act","Activity"]].map(([k,l])=>`<button aria-pressed="${tab===k}" onclick="S.wtab='${k}';stuRefresh()">${l}</button>`).join("")}</div><div class="mt10">${body}</div></div><div style="height:24px"></div>`};};
function fileRow(f,co){const col={PDF:["var(--bad-soft)","var(--bad)"],DOC:["var(--brand-soft)","var(--brand-ink)"],PPT:["var(--coral-soft)","var(--coral-ink)"],PBI:["var(--warn-soft)","var(--warn)"],XLS:["var(--ok-soft)","var(--ok)"],IMG:["var(--chip)","var(--ink2)"]}[f.k]||["var(--chip)","var(--muted)"];
 return `<div class="tx"><span class="fileic" style="background:${col[0]};color:${col[1]}">${f.k}</span><div class="grow"><div class="s b ell">${esc(f.n)}</div><div class="xs muted">${f.by==="s1"&&!co?"You":ST(f.by)?ST(f.by).n:"Company"} · ${f.d}</div></div><span class="muted">${ic("dl",18)}</span></div>`;}
function upFiles(pid,fl){const w=S.work[pid];[...fl].forEach(f=>{const e=(f.name.split(".").pop()||"").toUpperCase();const k=e.startsWith("PDF")?"PDF":/DOC/.test(e)?"DOC":/PPT|KEY/.test(e)?"PPT":/XLS|CSV/.test(e)?"XLS":/PNG|JPG|JPEG|SVG|GIF|WEBP/.test(e)?"IMG":"DOC";w.files.unshift({k,n:f.name,d:"Today",by:"s1"});w.act.push([`You uploaded ${f.name}`,"Today"]);});
 S.wtab="files";stuRefresh();toast(`${fl.length} file${fl.length>1?"s":""} uploaded`,"upload");}
function submitMs(pid,i){const m=S.work[pid].ms[i];const left=(m.sub||[]).filter(s=>!s[1]).length;
 const go=()=>{m.st="review";(m.sub||[]).forEach(s=>s[1]=1);S.work[pid].act.push([`You submitted "${m.t}" for approval`,"Today"]);S.coNotif.unshift([pid,i]);closeSheet();toast("Sent to the company for approval","send");stuRefresh();};
 if(left)openSheet(`<h3>${left} task${left>1?"s":""} not ticked</h3><p class="s muted">You can still submit. The company will review what you sent and can ask for changes.</p><button class="btn mt14" onclick="window._go()">Submit anyway</button><button class="btn sec mt10" onclick="closeSheet()">Finish the tasks first</button>`),window._go=go;else go();}

/* ---------- messages ---------- */
const myThreads=()=>Object.entries(S.threads).filter(([k,t])=>t.stu==="s1");
SS.inbox=()=>({html:`${navBar("Messages")}<div class="pad">${myThreads().map(([k,t])=>{const l=t.msgs[t.msgs.length-1];const un=l[0]==="co"&&!S.readStu.has(k);
  return `<div class="card tap" onclick="S.readStu.add('${k}');stuGo('chat','${k}')"><div class="row">${logo(t.co,46)}<div class="grow"><div class="between"><b class="s">${esc(t.who)}</b><span class="xs ${un?"b":"muted"}" style="${un?"color:var(--brand-ink)":""}">${l[2]}</span></div>
   <div class="xs muted">${esc(CO[t.co].n)} · ${t.ctx}</div><div class="s ell mt6 ${un?"b":"muted"}">${l[0]==="stu"?"You: ":""}${typeof l[1]==="string"?esc(l[1]):"Sent a file"}</div></div>${un?'<span style="width:9px;height:9px;border-radius:50%;background:var(--brand)"></span>':""}</div></div>`;}).join("")}</div>`});
function bubble(m,me){const t=m[1];return typeof t==="string"?`<div class="bub ${me?"me":"them"}">${esc(t)}<span class="tm">${m[2]}${me?ic("check",12,2.6):""}</span></div>`:
 `<div class="bub file ${me?"me":"them"}"><span class="fileic" style="background:rgba(255,255,255,.2);color:inherit;width:34px;height:34px">${ic("file",18)}</span><div><div class="s b">${esc(t.f)}</div><div class="xs" style="opacity:.75">2.4 MB · ${m[2]}</div></div></div>`;}
function msgsHTML(th,side){let last="";return th.msgs.map(m=>{const day=/:/.test(m[2])?"Today":m[2];const sep=day!==last?`<span class="day">${day}</span>`:"";last=day;return sep+bubble(m,m[0]===side);}).join("");}
SS.chat=tid=>{const th=S.threads[tid];S.readStu.add(tid);return{bare:1,html:`<div class="nav"><button class="ib" onclick="stuBack()" aria-label="Back">${ic("back",20,2.2)}</button>${logo(th.co,36)}<div class="grow" style="text-align:left"><div class="b s">${esc(th.who)}</div><div class="xs muted">${esc(CO[th.co].n)} · usually answers in 1 h</div></div></div>
 <div class="msgs" id="msgs" style="padding-bottom:130px">${msgsHTML(th,"stu")}</div>`,
 over:`<div class="composer"><div class="qr">${["Sounds good!","I'll send it tonight","Can we move it to Friday?","Merci 🙏"].map(q=>`<button onclick="sendStu('${tid}','${q}')">${q}</button>`).join("")}</div>
  <div class="in"><label class="ib flat" style="cursor:pointer" aria-label="Attach">${ic("clip",20)}<input type="file" hidden onchange="sendStu('${tid}',{f:this.files[0].name})"></label><input id="cin" placeholder="Message" aria-label="Message" onkeydown="if(event.key==='Enter')sendStu('${tid}')"><button class="sendb" aria-label="Send" onclick="sendStu('${tid}')">${ic("send",18)}</button></div></div>`,
 after:()=>{const pg=$("#pg");pg.scrollTop=pg.scrollHeight;}};};
const REPLY={andina:["Super, merci!","Thursday 7am works for us 👍","The team is practising the phrasebook already."],aventura:["Great, talk on Monday!","Perfect, thank you."],raiz:["Thanks! We'll confirm on Friday."]};
function sendStu(tid,v){const th=S.threads[tid];if(v===undefined){const i=$("#cin");v=i.value.trim();if(!v)return;i.value="";}
 th.msgs.push(["stu",v,nowT()]);const box=$("#msgs");box.insertAdjacentHTML("beforeend",bubble(th.msgs.at(-1),true));const pg=$("#pg");pg.scrollTop=pg.scrollHeight;
 box.insertAdjacentHTML("beforeend",`<div class="typing" id="typ"><i></i><i></i><i></i></div>`);pg.scrollTop=pg.scrollHeight;
 setTimeout(()=>{const r=(REPLY[th.co]||["Thanks!"])[th.msgs.length%(REPLY[th.co]||[1]).length];th.msgs.push(["co",r,nowT()]);S.unreadCo++;
  const t=$("#typ");if(t)t.remove();if(S.stack.at(-1)[0]==="chat"&&S.stack.at(-1)[1]===tid){box.insertAdjacentHTML("beforeend",bubble(th.msgs.at(-1),false));pg.scrollTop=pg.scrollHeight;}},1500);}

/* ---------- wallet ---------- */
SS.wallet=()=>{const bal=balance(),escw=escrowStu(),pend=myWorks().reduce((a,[k,w])=>a+w.ms.filter(m=>m.st==="review").reduce((x,m)=>x+m.a,0),0);
 return{html:`<div class="lt"><div class="grow"><h1>Wallet</h1><div class="sub">Your earnings on SkillBridge</div></div></div>
  <div class="bcard"><div class="between"><span class="s" style="opacity:.85">Available balance</span><span class="chipc"></span></div><div><div class="big num" id="balv">${fmt(bal)}</div><div class="xs" style="opacity:.75;margin-top:6px">COP · Guillaume C.</div></div>
   <div class="row2"><div><span style="opacity:.8">In escrow</span><b class="num">${fmt(escw)}</b></div><div><span style="opacity:.8">Waiting approval</span><b class="num">${fmt(pend)}</b></div><div><span style="opacity:.8">Earned in 2026</span><b class="num">${kfmt(earnedTotal())}</b></div></div></div>
  <div class="qa"><button onclick="withdrawSheet()"><span>${ic("out",18)}</span>Withdraw</button><button onclick="methodsSheet()"><span>${ic("card",18)}</span>Methods</button><button onclick="toast('Certificate of income sent to your email','doc')"><span>${ic("doc",18)}</span>Income cert.</button><button onclick="toast('November statement ready','dl')"><span>${ic("dl",18)}</span>Statement</button></div>
  <div class="sect"><h2>Earnings by month</h2><span class="xs muted">2026</span></div>
  <div class="pad"><div class="card"><div class="fig" id="wchart" style="height:160px"></div><div class="row xs muted mt6" style="gap:14px"><span class="row" style="gap:5px"><i style="width:12px;height:10px;border-radius:3px;background:var(--brand);display:inline-block"></i>Paid</span><span class="row" style="gap:5px"><i style="width:12px;height:10px;border-radius:3px;border:1.8px dashed var(--brand);display:inline-block"></i>In escrow, coming</span></div></div></div>
  <div class="sect"><h2>Activity</h2></div>
  <div class="pad"><div class="card">${S.tx.map(t=>`<div class="tx"><span class="fileic" style="background:${t.a>0?"var(--ok-soft)":"var(--chip)"};color:${t.a>0?"var(--ok)":"var(--muted)"}">${ic(t.a>0?"dl":"out",17)}</span><div class="grow"><div class="s b">${esc(t.t)}</div><div class="xs muted">${t.w?esc(t.w)+" · ":""}${t.d}</div></div><b class="s num" style="color:${t.a>0?"var(--ok)":"var(--ink)"}">${t.a>0?"+":"−"}${fmt(Math.abs(t.a))}</b></div>`).join("")}</div></div><div style="height:22px"></div>`,
  after:()=>{const data=MONTHS.map(m=>({l:m,v:S.tx.filter(t=>t.m===m&&t.a>0).reduce((a,t)=>a+t.a,0),p:m==="Nov"?escw:0}));barChart($("#wchart"),data,{h:160,label:"Earnings per month in 2026"});}};};
function withdrawSheet(amt){const bal=balance();if(!bal){toast("Nothing to withdraw yet","info");return;}const a=amt||bal;
 openSheet(`<h3>Withdraw</h3><p class="s muted" style="margin:0 0 10px">Arrives in less than 24 h. No fee.</p>
 <div style="text-align:center;margin:8px 0 12px"><div class="money" style="font-size:2.2rem">${fmt(a)}</div><div class="xs muted">of ${fmt(bal)} available</div></div>
 <div class="opts" style="justify-content:center">${[[bal,"All"],[Math.round(bal/2000)*1000,"Half"],[200000,"$200.000"]].filter(x=>x[0]<=bal).map(([v,l])=>`<button class="opt ${v===a?"on":""}" onclick="withdrawSheet(${v})">${l}</button>`).join("")}</div>
 <div class="lbl mt14">To</div>${[["Nequi","300 •••• 4821","#4B1E78"],["Bancolombia","Savings •••• 1907","#E5B700"],["Daviplata","310 •••• 2290","#C8102E"]].map(([n,d,c])=>`<div class="radio ${S.wd===n?"on":""}" onclick="S.wd='${n}';withdrawSheet(${a})"><span class="rd"></span><span class="pm" style="background:${c};${n==="Bancolombia"?"color:#111":""}">${n.slice(0,3).toUpperCase()}</span><div><b class="s">${n}</b><div class="xs muted">${d}</div></div></div>`).join("")}
 <button class="btn mt10" onclick="doWithdraw(${a})">Withdraw ${fmt(a)}</button>`);}
function doWithdraw(a){S.tx.unshift({t:"Withdrawal to "+S.wd,w:"",a:-a,d:"Today",m:"Nov"});openSheet(`<div class="done" style="padding:10px 0"><div class="tick">${ic("check",40,3)}</div><h2>On its way</h2><p class="muted" style="margin:0">${fmt(a)} to ${S.wd}. Usually arrives in minutes.</p></div><button class="btn" onclick="closeSheet()">Done</button>`);stuRefresh();setTimeout(()=>$("#sheet").classList.add("on"),0);$("#scrim").classList.add("on");}
function methodsSheet(){openSheet(`<h3>Payout methods</h3>${[["Nequi","300 •••• 4821 · default","#4B1E78"],["Bancolombia","Savings •••• 1907","#E5B700"],["Daviplata","310 •••• 2290","#C8102E"]].map(([n,d,c])=>`<div class="tx"><span class="pm" style="background:${c};${n==="Bancolombia"?"color:#111":""}">${n.slice(0,3).toUpperCase()}</span><div class="grow"><b class="s">${n}</b><div class="xs muted">${d}</div></div>${ic("chev",18)}</div>`).join("")}<button class="btn sec mt14">${ic("plus",17)} Add a method</button>`);}

/* ---------- profile ---------- */
SS.profile=()=>{const g=ST("s1");const days=["M","T","W","T","F","S","S"];
 return{light:0,html:`<div class="pcover"><svg viewBox="0 0 400 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M-10 120 C80 40 320 40 410 120" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="10"/><path d="M-10 132h420" stroke="#fff" stroke-opacity=".2" stroke-width="6"/>${[60,120,200,280,340].map(x=>`<line x1="${x}" y1="${132-Math.max(10,72-Math.abs(200-x)*.42)}" x2="${x}" y2="132" stroke="#fff" stroke-opacity=".18" stroke-width="4"/>`).join("")}</svg>
  <div style="position:absolute;top:6px;right:12px;display:flex;gap:8px"><button class="ib" aria-label="Share profile" onclick="shareProfile()">${ic("qr",19)}</button><button class="ib" aria-label="Settings" onclick="settingsSheet()">${ic("gear",19)}</button></div></div>
  <div class="phead"><div class="between" style="align-items:flex-end">${av("s1",92)}<button class="btn sec sm" onclick="toast('Edit mode coming in the next version','pen')">${ic("pen",15)} Edit</button></div>
   <h1 style="font-size:1.5rem;letter-spacing:-.03em;margin:10px 0 2px">Guillaume C. <span style="color:var(--brand)">${ic("shield",19,2.2)}</span></h1>
   <div class="s">${g.head}</div><div class="xs muted mt6">${ic("cap",13)} International Business · last semester · U. de La Sabana · ${ic("pin",13)} Chía</div>
   <div class="card row mt14" style="padding:11px 13px"><div class="grow"><b class="s">Open to projects</b><div class="xs muted">${S.open?"Companies can invite you":"Hidden from company searches"}</div></div><button class="switch" role="switch" aria-checked="${S.open}" aria-label="Open to projects" onclick="S.open=!S.open;stuRefresh();toast(S.open?'You are visible to companies':'You are hidden from searches')"></button></div>
   <div class="stats3 mt10"><div><b>4.9 <span class="stars">★</span></b><small>Rating</small></div><div><b>${S.certs.length+4}</b><small>Projects</small></div><div><b>100%</b><small>On time</small></div></div></div>
  <div class="sect"><h2>About</h2></div><div class="pad"><div class="card"><p style="margin:0;line-height:1.6" class="s">French native from Bayonne, living in Colombia for 7 years. I teach French and A-Level Business at a school in Chía, and I run my own online French school, Français avec Guillaume. I lived 2 years in New Zealand, so I work every day in three languages.</p></div></div>
  <div class="sect"><h2>Languages</h2></div><div class="pad"><div class="card">${[["FR","Native"],["ES","Fluent · C1"],["EN","Fluent · C1"]].map(([l,lv])=>`<div class="langrow"><span class="pill p-brand" style="min-width:34px;justify-content:center">${l}</span><div class="grow"><b class="s">${LANGN[l]}</b><div class="xs muted">${lv}</div></div><div class="lv">${[1,2,3,4,5].map(()=>`<i class="on"></i>`).join("")}</div></div>`).join("")}</div></div>
  <div class="sect"><h2>Experience</h2></div><div class="pad"><div class="card"><ul class="tl">
   ${[["Founder and French teacher","Français avec Guillaume · online","Own business · current","#7C3AED","#A78BFA","F G"],["Teacher, French and A-Level Business","St. Matthew School, Chía","Current","#0E6F86","#1FB5CF","S M"],["Living and working abroad","New Zealand","2 years","#1E3A8A","#3B82F6","N Z"],["International Business","Universidad de La Sabana","Last semester","#14532D","#2F8A57","L S"]].map(([a,b,c,c1,c2,n])=>`<li>${avP(n,c1,c2,40)}<div class="grow"><b class="s">${a}</b><div class="s muted">${b}</div><div class="xs faint">${c}</div></div></li>`).join("")}</ul></div></div>
  
  <div class="sect"><h2>Skills</h2><span class="xs muted">Validated by companies</span></div><div class="pad"><div class="card">${[["French teaching",3],["Translation FR·ES·EN",2],["Market research",1],["Excel",0],["Social media",0]].map(([s,n])=>`<div class="between" style="padding:7px 0"><span class="s b">${s}</span>${n?`<span class="pill p-ok">${ic("check",11,3)}${n} project${n>1?"s":""}</span>`:`<span class="pill p-gray">Self-declared</span>`}</div>`).join("")}</div></div>
  <div class="sect"><h2>Certificates</h2><span class="pill p-brand">${S.certs.length}</span></div>
  <div class="carousel">${S.certs.map(c=>`<article class="pf tap" onclick="stuGo('cert','${c.id}')"><div class="cv">${cover(c.area,92,c.id.length*5)}</div><div style="padding:10px 12px"><div class="s b" style="line-height:1.3;height:2.6em;overflow:hidden">${esc(c.title)}</div><div class="between mt6"><span class="xs muted">${esc(CO[c.co].n)}</span><span class="xs"><span class="stars">★</span> ${c.rate.toFixed(1)}</span></div></div></article>`).join("")}</div>
  <div class="sect"><h2>Reviews</h2><span class="xs muted">${S.certs.length} reviews</span></div><div class="pad"><div class="card">
   ${[["raiz","Clear market study with real conclusions. Delivered two days early.",5],["casa","Our reception team now welcomes French guests with confidence. Very practical classes.",5],["bistrot","Good translation, fast. Only one small correction needed.",4]].map(([k,t,r],i)=>`<div class="${i?"mt14":""}"><div class="row">${logo(k,30)}<b class="s grow">${esc(CO[k].n)}</b><span class="stars s">${"★".repeat(r)}${"☆".repeat(5-r)}</span></div><p class="s muted" style="margin:6px 0 0">"${t}"</p></div>`).join("")}</div></div>
  <div class="sect"><h2>Availability</h2><span class="xs muted">Tap to change</span></div><div class="pad"><div class="card"><div class="avail"><span></span>${days.map(d=>`<span>${d}</span>`).join("")}
   ${["Morning","Afternoon","Evening"].map((r,i)=>`<span style="text-align:left">${r}</span>${S.avail[i].map((v,j)=>`<button class="${v?"on":""}" aria-label="${r} ${days[j]} ${v?"available":"busy"}" onclick="S.avail[${i}][${j}]=${v?0:1};stuRefresh()"></button>`).join("")}`).join("")}</div></div></div>
  <div style="height:24px"></div>`};};
function shareProfile(){openSheet(`<h3>Share your profile</h3><p class="s muted" style="margin:0 0 14px">Companies can scan it at a fair or a class presentation.</p><div class="card" style="text-align:center">${qr("skillbridge.co/guillaume-c",170)}<div class="b mt10">skillbridge.co/guillaume-c</div></div><button class="btn mt14" onclick="copyTxt('skillbridge.co/guillaume-c')">${ic("copy",17)} Copy link</button>`);}
function settingsSheet(){openSheet(`<h3>Settings</h3>${[["bell","Notifications","Matches, offers, payments"],["card","Payout methods","Nequi (default)"],["shield","Privacy and data","Ley 1581 · download or delete your data"],["globe","Language","English"],["info","Help center","Answers in under 2 h"]].map(([i,a,b])=>`<div class="tx tap">${`<span class="fileic" style="background:var(--chip);color:var(--ink2)">${ic(i,18)}</span>`}<div class="grow"><b class="s">${a}</b><div class="xs muted">${b}</div></div>${ic("chev",18)}</div>`).join("")}
 <button class="btn sec mt14" style="color:var(--bad)" onclick="closeSheet();restart()">${ic("out",17)} Log out and restart demo</button>`);}
SS.cert=id=>{const c=S.certs.find(x=>x.id===id)||S.certs[0];return{bare:1,html:`${navBar("Certificate")}<div class="pad">
 <div class="cert"><div class="between"><span class="row" style="gap:7px">${BRANDMARK(22)}<b class="s">SkillBridge</b></span><span class="pill p-ok">${ic("shield",12,2.2)}Verified</span></div>
  <div style="text-align:center;margin-top:16px" class="xs muted">Certificate of project experience</div><div class="nm">Guillaume C.</div><div class="xs muted" style="text-align:center">International Business · Universidad de La Sabana</div>
  <p class="s" style="text-align:center;margin:14px 0;line-height:1.55">completed the paid project<br><b>${esc(c.title)}</b><br>for <b>${esc(CO[c.co].n)}</b></p>
  <div class="stats3"><div><b>${c.hours} h</b><small>Work</small></div><div><b>${c.rate.toFixed(1)} <span class="stars">★</span></b><small>Rating</small></div><div><b style="font-size:.88rem">${c.date.replace(", 2026","")}</b><small>Finished</small></div></div>
  <div class="row mt14" style="justify-content:center;flex-wrap:wrap;gap:6px">${c.skills.map(s=>`<span class="pill p-brand">${s}</span>`).join("")}</div>
  <div class="between mt20" style="align-items:flex-end"><div class="xs muted" style="line-height:1.6">Verify at<br><b style="color:var(--ink)">skillbridge.co/v/${c.code}</b><br>Code ${c.code}</div>${qr(c.code,78)}</div></div>
 <button class="btn mt14" style="background:#0A66C2" onclick="toast('Added to your LinkedIn profile','linkedin')">${ic("linkedin",17,0,"currentColor")} Add to LinkedIn</button>
 <button class="btn sec mt10" onclick="copyTxt('skillbridge.co/v/${c.code}')">${ic("copy",17)} Copy verification link</button><div style="height:20px"></div></div>`};};
SS.notifs=()=>({html:`${navBar("Notifications",`<button class="link" style="width:40px" onclick="S.notifs.forEach(n=>n.u=0);stuRefresh()">Read</button>`)}<div class="pad">${S.notifs.map((n,i)=>`<div class="card tap" style="${n.u?"border-color:var(--brand-soft);background:color-mix(in srgb,var(--brand-soft) 45%,var(--card))":""}" onclick="S.notifs[${i}].u=0;${n.go?`stuJump('${n.go[0]}'${n.go[1]?`,'${n.go[1]}'`:""})`:""}"><div class="row" style="align-items:flex-start"><span class="fileic" style="background:var(--brand-soft);color:var(--brand-ink)">${ic("bell",18)}</span><div class="grow"><div class="s ${n.u?"b":""}">${esc(n.t)}</div><div class="xs muted">${n.w}</div></div>${n.u?'<span style="width:9px;height:9px;border-radius:50%;background:var(--brand);margin-top:6px"></span>':""}</div></div>`).join("")}</div>`});
