/* SkillBridge demo data. Companies and students are fictional, except the founder's own profile (Guillaume). */
const AREAS={
  Languages:{c1:"#2348F5",c2:"#6E86FF",ic:"globe"},
  Teaching:{c1:"#0E6F86",c2:"#1FB5CF",ic:"cap"},
  Business:{c1:"#1F2937",c2:"#52617A",ic:"trend"},
  Finance:{c1:"#05664A",c2:"#2EBD86",ic:"bars"},
  Marketing:{c1:"#C2410C",c2:"#FB8A4C",ic:"mega"},
  Design:{c1:"#B8175A",c2:"#F06BA0",ic:"pen"}
};
const CO={
  andina:{n:"Exportadora Andina",sector:"Coffee & flower export",town:"Bogotá",size:"12 employees",rate:4.8,done:6,logo:"bean",c1:"#14532D",c2:"#2F8A57",since:"Mar 2025",nit:"901.482.317-5"},
  aventura:{n:"Aventura Tours",sector:"Tourism agency",town:"Villa de Leyva",size:"8 employees",rate:4.6,done:3,logo:"mount",c1:"#1E3A8A",c2:"#3B82F6",since:"Jun 2025"},
  raiz:{n:"Raíz Cosmética",sector:"Natural cosmetics",town:"Bogotá",size:"25 employees",rate:4.9,done:4,logo:"leaf",c1:"#6B21A8",c2:"#A855F7",since:"Jan 2026"},
  tornillo:{n:"Ferretería El Tornillo",sector:"Hardware store",town:"Chía",size:"6 employees",rate:4.5,done:2,logo:"nut",c1:"#334155",c2:"#64748B",since:"Aug 2025"},
  luna:{n:"Café Luna",sector:"Specialty café",town:"Chía",size:"5 employees",rate:4.7,done:3,logo:"moon",c1:"#9A3412",c2:"#EA580C",since:"Feb 2026"},
  abuela:{n:"Pan de la Abuela",sector:"Family bakery",town:"Cajicá",size:"4 employees",rate:4.4,done:1,logo:"wheat",c1:"#92400E",c2:"#D97706",since:"Sep 2026"},
  zona:{n:"Zona Co",sector:"Coworking space",town:"Chía",size:"7 employees",rate:4.6,done:2,logo:"grid",c1:"#115E59",c2:"#14B8A6",since:"Apr 2026"},
  casa:{n:"Hotel Casa Chía",sector:"Boutique hotel",town:"Chía",size:"18 employees",rate:4.8,done:5,logo:"key",c1:"#7C2D12",c2:"#C2410C",since:"Nov 2025"},
  bistrot:{n:"Le Petit Bistrot",sector:"French restaurant",town:"Bogotá",size:"9 employees",rate:4.5,done:2,logo:"fork",c1:"#1E293B",c2:"#B91C1C",since:"May 2025"},
  andes:{n:"Logística Andes",sector:"Freight & logistics",town:"Cajicá",size:"30 employees",rate:4.7,done:7,logo:"truck",c1:"#0C4A6E",c2:"#0EA5E9",since:"Oct 2025"}
};
/* map positions (viewBox 340x220) */
const TOWNS={"Cajicá":[205,48],"Chía":[170,104],"Cota":[96,150],"Bogotá":[205,180]};

const PROJECTS=[
  {id:"p1",co:"andina",area:"Teaching",title:"French lessons for our export sales team",pay:520000,dur:"3 weeks",hours:24,mode:"Hybrid",town:"Bogotá",closes:0,applicants:2,match:96,status:"active",stu:"s1",
   desc:"Four of our sales people travel to a trade fair in Lyon in January. We need short, practical sessions so they can greet buyers, present our coffee and handle simple negotiations in French.",
   deliv:["Course plan and 6 sessions of 1h30","One-page negotiation phrasebook","Final role-play with a mock French buyer"],skills:["French native","Teaching adults","Business French"],langs:["FR","ES"]},
  {id:"c2",co:"andina",area:"Languages",title:"Translate our product catalogue into French",pay:350000,dur:"2 weeks",hours:18,mode:"Remote",town:"Bogotá",closes:4,applicants:6,match:97,status:"open",posted:"Nov 16",
   desc:"Our 20-page catalogue of specialty coffee and cut flowers needs a natural French version for the Lyon fair. Product names stay in Spanish, everything else in French.",
   deliv:["20 pages translated in our template","Glossary of coffee and flower terms","One round of corrections"],skills:["French native or C1","Translation","Proofreading"],langs:["FR","ES"],
   why:[["y","French native, translation is one of your validated skills"],["y","You already work with this company (rated 5.0)"],["p","Flower vocabulary: no project yet"]]},
  {id:"p5",co:"andes",area:"Languages",title:"French version of our export documents",pay:380000,dur:"2 weeks",hours:20,mode:"Remote",town:"Cajicá",closes:5,applicants:3,match:93,status:"open",posted:"Nov 18",
   desc:"We are opening a route to French-speaking clients. We need our quote template, service terms and 3 standard emails translated and adapted into French.",
   deliv:["Quote template in French","Service terms (6 pages)","3 email templates: quote, follow-up, delay notice"],skills:["French native or C1","Business writing","Logistics vocabulary"],langs:["FR","ES","EN"],
   why:[["y","French native from France"],["y","International Business student: export vocabulary"],["p","Legal wording: listed but not validated"]]},
  {id:"p2",co:"aventura",area:"Languages",title:"Translate our tourism website into English",pay:240000,dur:"1 week",hours:12,mode:"Remote",town:"Villa de Leyva",closes:5,applicants:7,match:91,status:"open",posted:"Nov 14",
   desc:"12 pages of our website from Spanish into natural English. No machine translation: it has to sound right for travellers from the US and the UK.",
   deliv:["12 pages translated in a shared doc","Short glossary of tourism terms","One round of corrections"],skills:["English C1","Translation","Tourism copy"],langs:["EN","ES"],
   why:[["y","English fluent, lived 2 years in New Zealand"],["y","Translation is one of your validated skills"],["n","No tourism project yet"]]},
  {id:"p9",co:"casa",area:"Teaching",title:"Welcome scripts in English and French for reception",pay:260000,dur:"1 week",hours:10,mode:"On-site",town:"Chía",closes:3,applicants:4,match:89,status:"open",posted:"Nov 19",
   desc:"Our reception team welcomes more and more foreign guests. We want short scripts (check-in, directions, complaints) and two practice sessions with the team.",
   deliv:["Scripts for 8 common situations","Pronunciation audio notes","2 practice sessions at the hotel"],skills:["French","English","Teaching adults"],langs:["FR","EN","ES"],
   why:[["y","You already taught this hotel's staff (rated 5.0)"],["y","Trilingual"],["y","You live in Chía, 10 min away"]]},
  {id:"p3",co:"raiz",area:"Business",title:"Market study for a men's skincare line",pay:560000,dur:"3 weeks",hours:30,mode:"Remote",town:"Bogotá",closes:6,applicants:5,match:88,status:"open",posted:"Nov 12",
   desc:"We want to launch a men's line next year. We need a short market study: main competitors, price ranges in Colombia, and a small survey with clear conclusions.",
   deliv:["Competitor map (8 to 10 brands)","Online survey with 60+ answers","10-page report with recommendations"],skills:["Market research","Surveys","Report writing"],langs:["ES"],
   why:[["y","Last semester of International Business"],["y","One market study done, rated 5.0"],["p","Survey tools: listed, not validated"]]},
  {id:"p4",co:"zona",area:"Business",title:"Why members leave: survey for a coworking space",pay:200000,dur:"1 week",hours:10,mode:"On-site",town:"Chía",closes:2,applicants:3,match:84,status:"open",posted:"Nov 20",
   desc:"Some members leave after two months. Design a short survey, interview 10 members and give us five clear ideas to keep them.",
   deliv:["Survey (10 questions max)","10 short interviews","One-page summary with 5 ideas"],skills:["Interviews","Research","Synthesis"],langs:["ES"],
   why:[["y","You live in Chía"],["y","Research and business skills"],["n","No interview project yet"]]},
  {id:"p10",co:"bistrot",area:"Marketing",title:"Bilingual menu and Google Maps profile",pay:180000,dur:"1 week",hours:8,mode:"Hybrid",town:"Bogotá",closes:6,applicants:2,match:80,status:"open",posted:"Nov 17",
   desc:"Update our menu in Spanish, English and French, and clean up our Google Maps profile with good descriptions and photos.",
   deliv:["Menu in 3 languages","Google Maps profile updated","10 photo captions"],skills:["Copywriting","Translation","Local SEO"],langs:["FR","EN","ES"],
   why:[["y","You translated this restaurant's menu before"],["p","Local SEO: no project yet"]]},
  {id:"p6",co:"tornillo",area:"Finance",title:"Excel cash-flow model for a bank loan",pay:430000,dur:"2 weeks",hours:20,mode:"Remote",town:"Chía",closes:4,applicants:4,match:74,status:"open",posted:"Nov 15",
   desc:"We need a clean 3-year projection (sales, costs, cash flow) in Excel to show the bank. We give you last year's real numbers.",
   deliv:["3-year sales and cost projection","Monthly cash flow","Summary sheet for the bank"],skills:["Excel","Financial modelling"],langs:["ES"],
   why:[["y","Excel listed in your skills"],["p","Finance is not your main area"],["n","No finance project yet"]]},
  {id:"p7",co:"luna",area:"Marketing",title:"Instagram content for our first month",pay:280000,dur:"2 weeks",hours:16,mode:"Remote",town:"Chía",closes:1,applicants:9,match:68,status:"open",posted:"Nov 11",
   desc:"Eight posts and four stories for our first month, plus a simple content calendar. We provide the photos.",
   deliv:["8 posts and 4 stories","Monthly content calendar","Captions in Spanish and English"],skills:["Social media","Canva","Copywriting"],langs:["ES","EN"],
   why:[["y","Bilingual captions"],["p","Social media: some experience"],["n","No design portfolio"]]},
  {id:"p8",co:"abuela",area:"Design",title:"Logo and brand guide for a family bakery",pay:300000,dur:"2 weeks",hours:18,mode:"On-site",town:"Cajicá",closes:7,applicants:6,match:41,status:"open",posted:"Nov 18",
   desc:"A logo, a colour palette and a one-page brand guide for a bakery that wants to look more professional.",
   deliv:["Logo in 3 versions","Palette and fonts","One-page brand guide"],skills:["Illustrator","Branding"],langs:["ES"],
   why:[["n","Design is not one of your skills"],["n","No portfolio"]]},
  /* company-only projects of Exportadora Andina */
  {id:"c3",co:"andina",area:"Finance",title:"Power BI dashboard for export volumes",pay:450000,dur:"3 weeks",hours:28,mode:"Remote",town:"Bogotá",status:"active",stu:"s7",
   desc:"One dashboard with volumes by country, product and month, fed from our Excel files.",deliv:["Data model","Dashboard with 4 pages","30-min handover call"],skills:["Power BI","Excel"],langs:["ES"]},
  {id:"c4",co:"andina",area:"Design",title:"Booth design for the Lyon trade fair",pay:300000,dur:"2 weeks",hours:20,mode:"Remote",town:"Bogotá",status:"active",stu:"s3",
   desc:"Visuals for a 3x3 m booth: back wall, table banner and a flyer in French.",deliv:["Back wall design","Table banner","Flyer in French"],skills:["Illustrator","Print"],langs:["ES","FR"]},
  {id:"c5",co:"andina",area:"Business",title:"Survey of European coffee buyers",pay:380000,dur:"3 weeks",hours:26,mode:"Remote",town:"Bogotá",status:"done",stu:"s6",
   desc:"Survey 25 buyers in France and Belgium about what they look for in specialty coffee.",deliv:["Survey","25 answers","Report"],skills:["Research","French"],langs:["FR"]},
  {id:"c6",co:"andina",area:"Languages",title:"Coffee glossary Spanish to English",pay:150000,dur:"1 week",hours:8,mode:"Remote",town:"Bogotá",status:"draft",
   desc:"Glossary of 150 coffee terms.",deliv:["150 terms with definitions"],skills:["Translation"],langs:["EN"]}
];

const STUDENTS=[
  {id:"s1",n:"Guillaume C.",c1:"#1B37D6",c2:"#4F7BFF",prog:"International Business",sem:"Last semester",uni:"U. de La Sabana",town:"Chía",rate:4.9,done:7,langs:["FR","ES","EN"],areas:["Languages","Teaching","Business"],
   skills:["French teaching","Translation FR·ES·EN","Market research","Excel"],avail:"8 h/week",price:[250000,550000],resp:"1 h",
   head:"Trilingual business student, French native",note:"French native from Bayonne, 7 years in Colombia and 2 years in New Zealand. Teaches French and A-Level Business, runs his own online French school."},
  {id:"s2",n:"Sofía Lozano",c1:"#7C3AED",c2:"#A78BFA",prog:"Modern Languages",sem:"8th semester",uni:"U. Nacional",town:"Bogotá",rate:5.0,done:5,langs:["ES","EN","FR"],areas:["Languages"],
   skills:["Translation","Subtitling","Proofreading"],avail:"10 h/week",price:[200000,400000],resp:"3 h",head:"English and French translator",note:"Translates English and French every week for two publishers. Very fast turnaround."},
  {id:"s3",n:"Daniela Ruiz",c1:"#0F766E",c2:"#2DD4BF",prog:"Social Communication",sem:"7th semester",uni:"U. de La Sabana",town:"Chía",rate:4.7,done:4,langs:["ES","EN"],areas:["Marketing","Design"],
   skills:["Social media","Canva","Copywriting","Print"],avail:"12 h/week",price:[200000,350000],resp:"2 h",head:"Content and visual design",note:"Strong Canva and content portfolio, did two event campaigns."},
  {id:"s4",n:"Andrés Molina",c1:"#1D4ED8",c2:"#60A5FA",prog:"Finance",sem:"8th semester",uni:"U. de los Andes",town:"Bogotá",rate:4.8,done:6,langs:["ES","EN"],areas:["Finance","Business"],
   skills:["Excel","Financial models","Power BI"],avail:"6 h/week",price:[300000,600000],resp:"4 h",head:"Financial models banks understand",note:"Builds clean financial models and cash-flow projections."},
  {id:"s5",n:"Camila Torres",c1:"#BE185D",c2:"#F472B6",prog:"Industrial Design",sem:"6th semester",uni:"U. Javeriana",town:"Bogotá",rate:0,done:0,langs:["ES"],areas:["Design"],
   skills:["Illustrator","Branding","Figma"],avail:"15 h/week",price:[150000,300000],resp:"5 h",head:"Branding and packaging",note:"New on SkillBridge. Fresh portfolio and lower price."},
  {id:"s6",n:"Mateo Herrera",c1:"#B45309",c2:"#F59E0B",prog:"International Business",sem:"8th semester",uni:"U. del Rosario",town:"Bogotá",rate:4.6,done:3,langs:["ES","EN","FR"],areas:["Business","Languages"],
   skills:["Export documents","French B2","Market research"],avail:"8 h/week",price:[250000,450000],resp:"2 h",head:"Export and market research",note:"Did an exchange semester in Lyon."},
  {id:"s7",n:"Valentina Ríos",c1:"#0369A1",c2:"#38BDF8",prog:"Systems Engineering",sem:"9th semester",uni:"U. EAN",town:"Bogotá",rate:4.9,done:8,langs:["ES","EN"],areas:["Finance","Business"],
   skills:["Power BI","SQL","Excel"],avail:"10 h/week",price:[300000,550000],resp:"1 h",head:"Dashboards and data",note:"Builds Power BI dashboards for small companies."},
  {id:"s8",n:"Juan Pablo Suárez",c1:"#475569",c2:"#94A3B8",prog:"Marketing",sem:"7th semester",uni:"U. Sergio Arboleda",town:"Cajicá",rate:4.5,done:2,langs:["ES","EN"],areas:["Marketing"],
   skills:["Meta Ads","Copywriting"],avail:"12 h/week",price:[180000,320000],resp:"6 h",head:"Paid social and copy",note:"Runs ads for two local shops."}
];

const LANGN={FR:"French",ES:"Spanish",EN:"English"};
const MONTHS=["Jun","Jul","Aug","Sep","Oct","Nov"];
