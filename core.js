/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>"$"+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
const kfmt=n=>n>=1e6?"$"+(n/1e6).toFixed(2).replace(/\.?0+$/,"").replace(".",",")+"M":"$"+Math.round(n/1000)+"k";
const ini=n=>n.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
const P=id=>PROJECTS.find(p=>p.id===id);
const ST=id=>STUDENTS.find(s=>s.id===id);
const nowT=()=>{const d=new Date();return d.getHours()+":"+String(d.getMinutes()).padStart(2,"0")};
let UID=0;

const I={
 home:"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
 search:"M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5",
 brief:"M4 7h16v13H4zM9 7V5h6v2M4 12.5h16",
 wallet:"M3 7a2 2 0 0 1 2-2h12v3M3 7v11a2 2 0 0 0 2 2h15V8H5a2 2 0 0 1-2-1zM16.5 14h.01",
 user:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
 bell:"M6 9a6 6 0 1 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9zM10 20.5a2 2 0 0 0 4 0",
 chat:"M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z",
 back:"M15 18l-6-6 6-6", chev:"M9 6l6 6-6 6", down:"M6 9l6 6 6-6", close:"M6 6l12 12M18 6 6 18",
 check:"M5 12.5l4.5 4.5L19 7", clock:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
 pin:"M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
 filter:"M4 6h16M7 12h10M10 18h4", heart:"M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.5 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z",
 star:"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z",
 shield:"M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4",
 lock:"M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
 upload:"M12 15V4M7.5 8.5 12 4l4.5 4.5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4",
 dl:"M12 4v11M7.5 10.5 12 15l4.5-4.5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4",
 file:"M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5",
 send:"M21 3 10 14M21 3l-7 18-4-7-7-4z", plus:"M12 5v14M5 12h14",
 map:"M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14", list:"M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01",
 grid:"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
 users:"M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
 card:"M3 6h18v12H3zM3 10h18M7 15h3", spark:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
 share:"M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3M8 7l4-4 4 4", cal:"M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
 pen:"M4 20h4L19 9l-4-4L4 16zM14 6l4 4", trend:"M3 17l6-6 4 4 8-8M15 7h6v6", dots:"M5 12h.01M12 12h.01M19 12h.01",
 globe:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z",
 cap:"M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5", bars:"M4 20V10M10 20V4M16 20v-7M22 20H2",
 mega:"M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 8.5a5 5 0 0 1 0 7M18 5.5a9 9 0 0 1 0 13",
 building:"M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M2 21h20",
 clip:"M21 11.5l-8.5 8.5a5 5 0 0 1-7-7l9-9a3.3 3.3 0 0 1 4.7 4.7l-9 9a1.7 1.7 0 0 1-2.4-2.4L16 7",
 arrow:"M5 12h14M13 6l6 6-6 6", info:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01",
 sort:"M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3", copy:"M9 9h11v11H9zM5 15H4V4h11v1",
 hand:"M7 11l4 4a2 2 0 0 0 3 0l5-5M2 9l4-4 4 2 3-1 6 4 3-1M6 14l-2 2", refresh:"M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5",
 eye:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
 out:"M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5M10 17l5-5-5-5M15 12H3", doc:"M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
 bolt:"M13 3 5 14h6l-1 7 8-11h-6z", gear:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
 qr:"M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2zM7 7h.01M17 7h.01M7 17h.01",
 linkedin:"M4 9h3v11H4zM5.5 4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h3v1.6c.5-1 1.8-1.8 3.4-1.8 3 0 3.6 2 3.6 4.6V20h-3v-5.6c0-1.3-.1-2.9-1.9-2.9s-2.1 1.4-2.1 2.8V20h-3z"
};
const ic=(n,s=20,w=1.9,fill="none")=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${I[n]}"/></svg>`;
const BRANDMARK=(s=22,c="#2348F5")=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 18c3-7 15-7 18 0" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M2 18h20" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M8 14v4M12 12.6V18M16 14v4" stroke="${c}" stroke-width="2" stroke-linecap="round"/><circle cx="6" cy="7" r="2.2" fill="#F2522B"/></svg>`;

/* company logos: white glyph on the company's colours */
const GLYPH={
 bean:'<ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(30 12 12)"/><path d="M14.5 4.8c-3 3-1 6.5-2.5 9.5s-3.5 3.6-3.5 3.6"/>',
 mount:'<path d="M2.5 19 9 8l4 6.5 2.5-3.5L21.5 19z"/><circle cx="17" cy="6" r="1.8"/>',
 leaf:'<path d="M5 19C5 10 11 5 19.5 4.5 19.5 13 14 19 5 19z"/><path d="M5 19l8.5-8.5"/>',
 nut:'<path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z"/><circle cx="12" cy="12" r="3.2"/>',
 moon:'<path d="M18.5 14.5A7.5 7.5 0 0 1 9.5 5.5a7.5 7.5 0 1 0 9 9z"/>',
 wheat:'<path d="M12 21V8"/><path d="M12 8c-2.3 0-3.5-1.7-3.5-3.8C10.8 4.2 12 6 12 8zM12 8c2.3 0 3.5-1.7 3.5-3.8C13.2 4.2 12 6 12 8zM12 12.5c-2.3 0-3.5-1.7-3.5-3.8 2.3 0 3.5 1.8 3.5 3.8zM12 12.5c2.3 0 3.5-1.7 3.5-3.8-2.3 0-3.5 1.8-3.5 3.8zM12 17c-2.3 0-3.5-1.7-3.5-3.8 2.3 0 3.5 1.8 3.5 3.8zM12 17c2.3 0 3.5-1.7 3.5-3.8-2.3 0-3.5 1.8-3.5 3.8z"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="3.5"/><rect x="4" y="13" width="7" height="7" rx="3.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
 key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M17.5 12v3M20.5 12v2"/>',
 fork:'<path d="M7 3v7a2.5 2.5 0 0 0 5 0V3M9.5 3v18M17 3c-2.2 1.5-2.5 6 0 8v10"/>',
 truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3.5 3.5v2.5h-7.5z"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>'
};
function logo(key,s=44){const c=CO[key];const g="lg"+(UID++);return `<span class="logo" style="width:${s}px;height:${s}px;border-radius:${Math.round(s*.28)}px" title="${esc(c.n)}"><svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.c2}"/><stop offset="1" stop-color="${c.c1}"/></linearGradient></defs><rect width="24" height="24" fill="url(#${g})"/><g transform="translate(4.2 4.2) scale(.65)" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${GLYPH[c.logo]}</g></svg></span>`;}
function av(s,size=40){const st=typeof s==="string"?ST(s):s;return `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size*.36)}px;background:linear-gradient(140deg,${st.c2},${st.c1})">${ini(st.n)}</span>`;}
function avP(n,c1,c2,size=40){return `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size*.36)}px;background:linear-gradient(140deg,${c2},${c1})">${ini(n)}</span>`;}
function cat(a,sm){const A=AREAS[a];return `<span class="cat" style="background:${A.c1}">${ic(A.ic,sm?12:13,2.2)}${a}</span>`;}
function lang(l){return `<span class="chip" title="${LANGN[l]}"><b style="font-size:.66rem;letter-spacing:.02em">${l}</b> ${LANGN[l]}</span>`;}
function langS(l){return `<span class="pill p-gray" title="${LANGN[l]}">${l}</span>`;}
function cover(area,h=118,seed=1){
  const A=AREAS[area],g="cv"+(UID++);let dots="";
  for(let i=0;i<7;i++){const x=((seed*37+i*53)%100),y=((seed*17+i*29)%100),r=10+((seed+i*7)%5)*9;dots+=`<circle cx="${x}%" cy="${y}%" r="${r}" fill="#fff" opacity="${.05+((i+seed)%3)*.03}"/>`;}
  return `<svg width="100%" height="${h}" preserveAspectRatio="none" aria-hidden="true" style="display:block"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${A.c1}"/><stop offset="1" stop-color="${A.c2}"/></linearGradient></defs>
   <rect width="100%" height="100%" fill="url(#${g})"/>${dots}
   <g transform="translate(0 0)"><svg x="58%" y="${Math.round(h*.08)}" width="${Math.round(h*.95)}" height="${Math.round(h*.95)}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${I[A.ic]}"/></svg></g></svg>`;
}
function ring(pct,size=54,stroke=6,col="var(--brand)",label){const r=(size-stroke)/2,c=2*Math.PI*r;return `<span class="ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--chip)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" style="transition:stroke-dashoffset .6s"/></svg><b>${label??pct+"%"}</b></span>`;}
function qr(code,size=78){let h=0;for(const ch of code)h=(h*31+ch.charCodeAt(0))>>>0;const n=21,c=size/n;let r="";
  const fin=(x,y)=>{for(const[a,b]of[[0,0],[14,0],[0,14]]){if(x>=a&&x<a+7&&y>=b&&y<b+7){const dx=x-a,dy=y-b;return(dx===0||dx===6||dy===0||dy===6||(dx>1&&dx<5&&dy>1&&dy<5))?1:0;}}return -1;};
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){let on=fin(x,y);if(on<0){h=(h*1103515245+12345)>>>0;on=(h>>>16)&1;}if(on)r+=`<rect x="${(x*c).toFixed(2)}" y="${(y*c).toFixed(2)}" width="${(c+.3).toFixed(2)}" height="${(c+.3).toFixed(2)}"/>`;}
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="var(--ink)" aria-label="QR code">${r}</svg>`;}

/* stylised map of Sabana Centro */
function mapSVG(pins,sel,h){
  const towns=Object.entries(TOWNS).map(([n,[x,y]])=>`<g><circle cx="${x}" cy="${y}" r="${n==="Bogotá"?30:16}" fill="var(--brand)" opacity=".07"/><text x="${x}" y="${y+(n==="Bogotá"?44:30)}" text-anchor="middle" font-size="10.5" font-weight="650" fill="var(--muted)">${n}</text></g>`).join("");
  const pp=pins.map((p,i)=>{const t=TOWNS[p.town];if(!t)return"";const ox=((i*23)%34)-17,oy=((i*13)%22)-11;const x=t[0]+ox,y=t[1]+oy;const on=sel===p.id;
    return `<g class="mpin" data-id="${p.id}" style="cursor:pointer" transform="translate(${x} ${y})"><circle r="${on?15:12}" fill="${on?"var(--coral)":"var(--brand)"}" stroke="var(--card)" stroke-width="3"/><text y="3.5" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">${Math.round(p.pay/1000)}k</text></g>`}).join("");
  return `<svg class="mapsvg" viewBox="0 0 340 220" ${h?`style="height:${h}px;width:100%"`:""} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of projects around Chía, Cajicá and Bogotá">
   <rect width="340" height="220" fill="var(--chip)"/>
   <path d="M0 160 C60 140 90 190 150 170 S260 120 340 150 V220 H0z" fill="var(--card)" opacity=".55"/>
   <path d="M120 0 C140 60 110 90 140 130 S150 190 120 220" fill="none" stroke="#7FB2F0" stroke-width="5" opacity=".55" stroke-linecap="round"/>
   <path d="M210 0 L205 48 L178 100 L205 180 L215 220" fill="none" stroke="var(--card)" stroke-width="7" stroke-linecap="round"/>
   <path d="M210 0 L205 48 L178 100 L205 180 L215 220" fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="5 5"/>
   <path d="M60 120 L96 150 L178 100 L260 90" fill="none" stroke="var(--card)" stroke-width="5" stroke-linecap="round"/>
   ${towns}${pp}
   <text x="330" y="14" text-anchor="end" font-size="9" fill="var(--faint)">Sabana Centro</text></svg>`;}

/* bars chart in real pixels */
function barChart(el,data,opt={}){
  const draw=()=>{const W=el.clientWidth||300,H=opt.h||150,pt=20,pb=22,max=Math.max(...data.map(d=>d.v+(d.p||0)),1);const n=data.length,bw=W/n,w=Math.min(34,bw*.56);
   let s=`<svg width="${W}" height="${H}" role="img" aria-label="${esc(opt.label||"Bar chart")}">`;
   [0,.5,1].forEach(f=>{const y=pt+(H-pt-pb)*(1-f);s+=`<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)" ${f?'stroke-dasharray="3 4"':""}/>`;});
   data.forEach((d,i)=>{const x=i*bw+(bw-w)/2,hh=(H-pt-pb)*d.v/max,hp=(H-pt-pb)*(d.p||0)/max,y=H-pb-hh;
     if(hp)s+=`<rect x="${x}" y="${y-hp}" width="${w}" height="${hp}" rx="5" fill="none" stroke="${opt.c||"var(--brand)"}" stroke-width="1.8" stroke-dasharray="4 3"/>`;
     s+=hh?`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="5" fill="${d.hi?"var(--coral)":opt.c||"var(--brand)"}"/>`:`<rect x="${x}" y="${H-pb-2}" width="${w}" height="2" fill="var(--line)"/>`;
     if(d.v+(d.p||0)&&W>240)s+=`<text x="${x+w/2}" y="${y-hp-6}" text-anchor="middle" font-size="10.5" font-weight="650" fill="var(--ink)">${kfmt(d.v+(d.p||0)).replace("$","")}</text>`;
     s+=`<text x="${x+w/2}" y="${H-6}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${d.l}</text>`;});
   el.innerHTML=s+"</svg>";};
  draw(); const ro=new ResizeObserver(draw); ro.observe(el);
}

/* ---------- shared state ---------- */
let S;const PROJECTS0=JSON.parse(JSON.stringify(PROJECTS));
function initState(){
  PROJECTS.length=0;PROJECTS0.forEach(x=>PROJECTS.push(JSON.parse(JSON.stringify(x))));
  S={
    mode:"stu",
    /* student */
    stack:[], saved:new Set(["p3","p9"]), q:"", sort:"match", view:"list", mapSel:null,
    f:{areas:new Set(),modes:new Set(),minPay:0,langs:new Set()},
    onb:0, setup:{skills:new Set(["French teaching","Translation","Market research","Excel"]),langs:new Set(["FR","ES","EN"]),hours:"6 to 10 h"},
    apps:{c2:{st:"viewed",d:"Nov 17",price:350000},p3:{st:"shortlisted",d:"Nov 13",price:560000},p2:{st:"offer",d:"Nov 15",price:240000}},
    open:true, avail:[[1,1,0,1,0,1,0],[0,1,0,1,0,1,1],[1,0,1,0,1,0,0]],
    certs:[
      {id:"d1",title:"Competitor study for a cosmetics brand",co:"raiz",pay:560000,rate:5,hours:30,skills:["Market research","Report writing"],code:"SB-26-4821",date:"Oct 24, 2026",area:"Business"},
      {id:"d2",title:"French crash course for hotel staff",co:"casa",pay:480000,rate:5,hours:20,skills:["French teaching","Hospitality French"],code:"SB-26-3307",date:"Sep 19, 2026",area:"Teaching"},
      {id:"d3",title:"Restaurant menu translation FR to ES",co:"bistrot",pay:180000,rate:4.8,hours:8,skills:["Translation FR·ES"],code:"SB-26-2156",date:"Aug 12, 2026",area:"Languages"}
    ],
    tx:[{t:"Milestone 1 paid",w:"Exportadora Andina",a:208000,d:"Nov 6",m:"Nov"},{t:"Project paid",w:"Raíz Cosmética",a:560000,d:"Oct 24",m:"Oct"},{t:"Withdrawal to Nequi",w:"",a:-480000,d:"Sep 30",m:"Sep"},
        {t:"Project paid",w:"Hotel Casa Chía",a:480000,d:"Sep 19",m:"Sep"},{t:"Project paid",w:"Le Petit Bistrot",a:180000,d:"Aug 12",m:"Aug"}],
    wd:"Nequi",
    notifs:[{t:"Aventura Tours sent you an offer for the website translation",w:"2 h ago",go:["offer","p2"],u:1},
            {t:"Laura from Exportadora Andina sent a message",w:"3 h ago",go:["chat","andina-s1"],u:1},
            {t:"New match: French export documents for Logística Andes (93%)",w:"Yesterday",go:["project","p5"],u:1},
            {t:"Raíz Cosmética shortlisted you",w:"Nov 19",go:["projects"]}],
    /* workspaces shared by both sides */
    work:{
      p1:{stu:"s1",ms:[{t:"Course plan and sessions 1 to 3",a:208000,st:"paid",due:"Nov 4",sub:[["Course plan",1],["Session 1",1],["Session 2",1],["Session 3",1]]},
                       {t:"Sessions 4 to 6 and phrasebook",a:208000,st:"active",due:"Nov 25",sub:[["Session 4: presenting our coffee",1],["Session 5: prices and terms",1],["Session 6: emails",0],["Negotiation phrasebook",0]]},
                       {t:"Final role-play with a mock buyer",a:104000,st:"todo",due:"Dec 2",sub:[["Prepare buyer scenario",0],["Role-play session",0]]}],
          files:[{k:"PDF",n:"Course_plan_Andina.pdf",d:"Oct 28",by:"s1"},{k:"PPT",n:"Session_4_presenting_coffee.pptx",d:"Nov 18",by:"s1"},{k:"DOC",n:"Phrasebook_draft_v1.docx",d:"Nov 20",by:"s1"}],
          act:[["Laura approved milestone 1. $208.000 released","Nov 6"],["You uploaded Session_4_presenting_coffee.pptx","Nov 18"],["You uploaded Phrasebook_draft_v1.docx","Nov 20"]]},
      c3:{stu:"s7",ms:[{t:"Data model",a:135000,st:"paid",due:"Nov 8"},{t:"Dashboard pages",a:180000,st:"active",due:"Nov 28"},{t:"Handover call",a:135000,st:"todo",due:"Dec 3"}],files:[{k:"PBI",n:"Export_volumes_v2.pbix",d:"Nov 21",by:"s7"}],act:[]},
      c4:{stu:"s3",ms:[{t:"Concepts (2 options)",a:120000,st:"paid",due:"Nov 10"},{t:"Final booth files",a:180000,st:"review",due:"Nov 22"}],files:[{k:"PDF",n:"Booth_backwall_final.pdf",d:"Nov 22",by:"s3"},{k:"PDF",n:"Flyer_FR_final.pdf",d:"Nov 22",by:"s3"}],act:[]},
      c5:{stu:"s6",ms:[{t:"Survey design",a:120000,st:"paid",due:"Oct 2"},{t:"25 answers + report",a:260000,st:"paid",due:"Oct 20"}],files:[{k:"PDF",n:"European_buyers_report.pdf",d:"Oct 20",by:"s6"}],act:[]}
    },
    /* company side */
    coRoute:["overview"], coApps:{c2:[["s1",97,"I'm a French native and I already translated menus and websites on SkillBridge. I can deliver the 20 pages in 8 days, with a coffee glossary.",350000,"Nov 17"],
      ["s2",93,"I translate EN and FR every week for publishers. Two revision rounds included, delivery in 7 days.",320000,"Nov 16"],
      ["s6",86,"I did an exchange semester in Lyon and know export vocabulary well.",300000,"Nov 17"],
      ["s8",58,"I can help, my French is basic but I'm motivated.",250000,"Nov 18"],
      ["s3",52,"I can do the layout of the catalogue in French if you provide the translation.",280000,"Nov 18"],
      ["s5",44,"I could redesign the catalogue too.",260000,"Nov 19"]]},
    shortlist:new Set(["s2"]), tf:{areas:new Set(),langs:new Set(["FR"]),rate:0,maxPrice:600000,q:""}, appSort:"match",
    draft:null, coSpend:[0,280000,0,430000,500000,328000], invoices:[
      {n:"SB-INV-1043",p:"c5",d:"Oct 20",a:380000,st:"Paid"},{n:"SB-INV-1037",p:"p1",d:"Nov 6",a:208000,st:"Paid"},{n:"SB-INV-1039",p:"c3",d:"Nov 8",a:135000,st:"Paid"},{n:"SB-INV-1040",p:"c4",d:"Nov 10",a:120000,st:"Paid"}],
    threads:{
      "andina-s1":{co:"andina",stu:"s1",ctx:"French lessons",who:"Laura Méndez",msgs:[["co","Bonjour Guillaume! The team loved session 3, they keep using the greetings.","Nov 19"],["stu","Merci Laura! Session 4 is about presenting your coffee. I'll share the slides tonight.","Nov 19"],["stu",{f:"Session_4_presenting_coffee.pptx"},"Nov 19"],["co","Perfect. Can we do session 5 on Thursday at 7am, before work?","9:12"]]},
      "aventura-s1":{co:"aventura",stu:"s1",ctx:"Website translation",who:"Camilo Ortiz",msgs:[["stu","Hi! I just applied, happy to share a sample page.","Nov 15"],["co","We loved your sample. We just sent you an offer, take a look when you can.","10:41"]]},
      "raiz-s1":{co:"raiz",stu:"s1",ctx:"Market study",who:"Paula Rincón",msgs:[["co","Thanks for applying! You're on our shortlist, we decide on Friday.","Nov 19"]]},
      "andina-s3":{co:"andina",stu:"s3",ctx:"Booth design",who:"Laura Méndez",msgs:[["stu","Hi Laura, the final booth files are uploaded. Let me know if you want changes.","Nov 22"]]},
      "andina-s7":{co:"andina",stu:"s7",ctx:"Power BI dashboard",who:"Laura Méndez",msgs:[["co","Can you add a filter by country?","Nov 20"],["stu","Sure, it will be in the next version on Monday.","Nov 20"]]},
      "andina-s2":{co:"andina",stu:"s2",ctx:"Catalogue translation",who:"Laura Méndez",msgs:[["stu","Hello! I applied to the catalogue translation, happy to do a test page.","Nov 16"]]}
    },
    readStu:new Set(), unreadCo:2, coThread:"andina-s1", coNotif:[],
    banner:null, ratedP1:false
  };
}

/* derived */
const balance=()=>S.tx.reduce((a,t)=>a+t.a,0);
const earnedTotal=()=>S.tx.filter(t=>t.a>0).reduce((a,t)=>a+t.a,0);
const myWorks=()=>Object.entries(S.work).filter(([k,w])=>w.stu==="s1"&&P(k).status!=="done");
const escrowStu=()=>myWorks().reduce((a,[k,w])=>a+w.ms.filter(m=>m.st!=="paid").reduce((x,m)=>x+m.a,0),0);
const progress=w=>{const t=w.ms.reduce((a,m)=>a+m.a,0),p=w.ms.filter(m=>m.st==="paid").reduce((a,m)=>a+m.a,0),r=w.ms.filter(m=>m.st==="review").reduce((a,m)=>a+m.a,0);return Math.round((p+r*.8)/t*100);};
const coProjects=()=>PROJECTS.filter(p=>p.co==="andina");
const unreadStu=()=>S.notifs.filter(n=>n.u).length;

/* ---------- guide (presenter notes) ---------- */
const NOTES={
 splash:["Onboarding","The first screens state the problem in one sentence: companies want experience, students can't get it before their internship.",["Lean Canvas · Problem","UVP"],[["Target user","Final-semester students"]]],
 onb:["Onboarding","Three short screens: real paid projects, protected payment, a certificate for each project.",["UVP"],[["Time to sign up","Under 2 minutes"]]],
 signup:["Verified students only","Sign-up needs a university email. Companies know they are talking to real students, which answers the trust weakness in our SWOT.",["SWOT · W: trust","WT strategy"],[["Check","University email + code"]]],
 setup:["Skills and availability","The student picks skills, languages and hours. This feeds the matching score.",["Lean Canvas · Solution"],[]],
 matching:["Matching","The platform builds the first list of matches right after sign-up.",["Unfair advantage · data"],[]],
 home:["Personal home","Matches are ranked by a score from skills, languages, past ratings and distance. The map shows projects around Chía and Bogotá.",["Lean Canvas · Solution","Key metric"],[["Hypothesis H1","Students want paid micro-projects"],["Metric","Applications per project"]]],
 search:["Search, filters and map","Students filter by area, mode, pay and language, sort by match or pay, and switch to a map of the Sabana Centro.",["Lean Canvas · Channels"],[["Avg. project","1 to 3 weeks"],["Pay range","$180k to $560k COP"]]],
 project:["Project page","Everything to decide: deliverables, milestones with amounts, why you match, and company reviews written by other students.",["UVP","SWOT · W: quality"],[["Payment","Split in milestones"]]],
 apply:["Applying in 3 steps","A proposal, a price (accept or counter) and a start date. Price data from similar projects keeps offers fair.",["Hypothesis H1"],[["Metric","Applications sent"]]],
 applied:["Application sent","The student sees what happens next and when to expect an answer.",["Customer relationship"],[]],
 projects:["Projects","Active work, applications with a status pipeline (sent, viewed, shortlisted, offer) and completed projects.",["Key metrics"],[["Metric","% projects completed"]]],
 offer:["Offer","The company sends a formal offer with scope, dates and pay. The student can accept or decline.",["Hypothesis H2","SMEs will pay students"],[]],
 contract:["Digital contract","A short standard contract covers payment, intellectual property and data protection (Ley 1581). Both sides sign in the app. This solves the legal weakness from our SWOT.",["SWOT · W: legal issues","WT strategy"],[["Signature","In-app, with timestamp"]]],
 workspace:["Workspace and escrow","Work is split in milestones. The money is already held by SkillBridge. The student ticks tasks, uploads files and submits each milestone for approval.",["SWOT · W: quality control","WT strategy"],[["Escrow","Released per milestone"]]],
 inbox:["Messages","All conversations stay in the platform, so there is a trace if a problem appears.",["Customer relationship"],[]],
 chat:["Chat","Real-time chat with files and quick replies. Type a message and the other side answers.",["Lean Canvas · Solution"],[]],
 wallet:["Wallet","Balance, money held in escrow, monthly earnings and withdrawal to Nequi, Bancolombia or Daviplata. Students pay no fee.",["UVP · earn money"],[["Fee for students","$0"]]],
 profile:["Real profile","The founder's own profile: three languages, teaching and business experience, skills validated by projects, certificates and reviews.",["Unfair advantage · track record"],[["Rating","4.9"]]],
 cert:["Certificate","Each finished project gives a certificate with a code and a QR that anyone can check. Students can add it to LinkedIn.",["UVP · experience for the CV","Unfair advantage"],[]],
 notifs:["Notifications","Matches, offers and payments bring students back to the app.",["Channels"],[]],
 overview:["Company dashboard","What needs attention, active projects, money in escrow and how much the company saved compared with a temporary hire.",["Customer segment · SMEs","Key metrics"],[["Metric","% companies that come back"]]],
 board:["Projects board","Every project from draft to completed, like a small Trello made for short projects.",["Lean Canvas · Solution"],[]],
 post:["Post a project","A 4-step form with a live preview. We suggest a budget from similar projects and show how many students match before publishing.",["SO strategy","Hypothesis H2"],[["Time to post","About 2 minutes"]]],
 talent:["Find talent","Companies don't only wait for applicants: they search, filter by language and rating, shortlist and compare.",["SO strategy","Customer segment · SMEs"],[]],
 proj:["Project and applicants","Applicants ranked by match, with their proposal and price. Hiring opens a checkout that funds the escrow.",["Revenue · 12% fee","Hypothesis H2"],[["Commission","12% paid by company (to validate)"]]],
 projwork:["Approve and pay","The company checks each milestone and the files, then releases that part of the escrow. It can also ask for changes: the money stays protected until the work is right. The last approval opens the rating and gives the student a certificate.",["SWOT · W: quality control","WT strategy","Revenue · 12% fee"],[["Release","Within 48 h of approval"],["No answer in 5 days","Released automatically"]]],
 cmessages:["Messages","Same conversations, company side.",["Customer relationship"],[]],
 payments:["Payments","Invoices, money in escrow and fees. The student always gets 100% of the agreed pay.",["Lean Canvas · Revenue streams","Cost structure"],[["Student pays","Nothing"]]]
};
const JOURNEYS={
 stu:[["Onboarding","Sign-up with university email",()=>stuReset("splash")],["Personal matches","Home, score, map",()=>stuReset("home")],
      ["Search and map","Filters, sort, map view",()=>{S.view="map";stuReset("search");}],["Project page","Milestones, reasons, reviews",()=>stuJump("project","p5")],
      ["Apply in 3 steps","Proposal, price, date",()=>stuJump("apply","p5")],["Offer and contract","Sign inside the app",()=>stuJump("offer","p2")],
      ["Workspace","Tasks, files, submit milestone",()=>stuJump("workspace","p1")],["Wallet","Escrow and withdrawal",()=>stuReset("wallet")],["Profile and certificate","Verified experience",()=>stuReset("profile")]],
 co:[["Dashboard","What needs attention",()=>coGo("overview")],["Post a project","Budget advice, live preview",()=>{coGo("board");openPost();}],
     ["Find talent","Filter, shortlist, compare",()=>coGo("talent")],["Hire with escrow","Applicants and checkout",()=>coGo("proj","c2")],
     ["Approve and pay","Release a milestone",()=>coGo("proj","c4")],["Payments","Invoices and fees",()=>coGo("payments")]]
};
function curNoteKey(){if(S.mode==="stu")return S.stack.length?S.stack[S.stack.length-1][0]:"home";const r=S.coRoute[0];if(r==="proj"){const p=P(S.coRoute[1]);return p&&p.status!=="open"?"projwork":"proj";}return({overview:"overview",board:"board",talent:"talent",messages:"cmessages",payments:"payments"}[r]||"overview");}
function renderGuide(){
  const k=curNoteKey(),n=NOTES[k]||NOTES.home,steps=JOURNEYS[S.mode];
  const active=i=>{const map={stu:["splash|onb|signup|setup|matching","home","search","project","apply|applied","offer|contract","workspace","wallet","profile|cert"],co:["overview","board","talent","proj:c2","proj:c4","payments"]}[S.mode];
    const key=S.mode==="co"?(S.coRoute[0]==="proj"?"proj:"+S.coRoute[1]:S.coRoute[0]):k;return map[i].split("|").includes(key);};
  const stepsH=steps.map(([b,s],i)=>`<button class="gstep ${active(i)?"on":""}" onclick="JOURNEYS.${S.mode}[${i}][2]()"><span class="n">${i+1}</span><span><b>${b}</b><small>${s}</small></span></button>`).join("");
  const labs=n[2].map(l=>`<span class="glab ${/SWOT|strategy/.test(l)?"sw":/Hypothesis/.test(l)?"hy":"lc"}">${l}</span>`).join("");
  const noteH=`<h3>Behind this screen</h3><div class="gt">${n[0]}</div><div class="gnote"><p>${n[1]}</p></div><div class="glabs">${labs}</div>${n[3].length?`<div class="gkv">${n[3].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join("")}</div>`:""}`;
  if(S.mode==="stu"){
    $("#gSteps").innerHTML=`<h3>Guided demo</h3><div class="gt">Student journey</div><div class="gsteps">${stepsH}</div><div class="gtip">Everything is clickable. What the company does on the web app shows up here, in the student's phone.</div>`;
    $("#gNotes").innerHTML=noteH;
  }else{
    $("#cSteps").innerHTML=`<h3>Guided demo · company journey</h3><div class="gsteps mt10">${stepsH}</div>`;
    $("#cNotes").innerHTML=noteH;
  }
}

/* ---------- mode ---------- */
function setMode(m){
  S.mode=m;
  $("#mStu").setAttribute("aria-pressed",m==="stu");$("#mCo").setAttribute("aria-pressed",m==="co");
  $("#stuStage").hidden=m!=="stu";$("#coStage").hidden=m!=="co";
  if(m==="stu"){if(!S.stack.length)stuReset("home");else stuRender("f");if(S.banner){const b=S.banner;S.banner=null;setTimeout(()=>banner(b[0],b[1],b[2]),450);}}
  else coRender();
  renderGuide();
}
function restart(){const bn=$("#banner");if(bn)bn.classList.remove("on");initState();S.stack=[];stuReset("splash");setMode("stu");}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeSheet();coClose();}});
