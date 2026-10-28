/* Shared palettes and catalog. Every large room surface comes from its theme. */
const LittleSuite=(()=>{
  // Ordered light-to-dark, then warm-to-cool within each group.
  const seeds=[
    ['paper','Warm paper','#797366','#eee9de',false],
    ['lemon','Lemon chiffon','#8d751c','#fbefaa',false],
    ['morning','Sunlit honey','#a4712c','#f4c88f',false],
    ['peach','Peach sorbet','#b05a39','#ffd4bd',false],
    ['rose','Rosewater','#b45879','#f6c8da',false],
    ['lavender','Lavender haze','#8160a5','#dfd2fa',false],
    ['blue','Cloud nine','#3a79aa','#cde7ff',false],
    ['aqua','Sea glass','#3f847c','#c3e9e4',false],
    ['mint','Matcha meadow','#5b7d42','#dceccd',false],
    ['mocha','Cafe au lait','#89634c','#e2cbb5',false],
    ['ember','Fireside','#e8af80','#492b25',true],
    ['berry','Midnight berry','#df9cb9','#41213e',true],
    ['night','Night owl','#9ab5f1','#1e294c',true],
    ['ocean','Ocean after dark','#74d2dc','#073d4a',true],
    ['forest','Forest retreat','#a6d38b','#183a2b',true],
    ['mono','Charcoal & linen','#b7c6bf','#252b2b',true]
  ];
  function mix(a,b,n){const x=a.match(/\w\w/g).map(v=>parseInt(v,16)),y=b.match(/\w\w/g).map(v=>parseInt(v,16));return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*n).toString(16).padStart(2,'0')).join('');}
  const themes=Object.fromEntries(seeds.map(([id,name,accent,base,dark])=>{
    const p={id,name,accent,swatch:base,dark,
      page:dark?mix(base,'#10151b',.3):mix(base,'#ffffff',.72),surface:dark?mix(base,'#ffffff',.05):'#fffefa',
      ink:dark?mix(base,'#ffffff',.9):mix(accent,'#171c20',.63),muted:dark?mix(base,'#ffffff',.63):mix(accent,'#666961',.45),
      line:dark?mix(base,'#ffffff',.14):mix(base,'#ffffff',.27),soft:dark?mix(base,'#ffffff',.02):mix(base,'#ffffff',.42),
      wall:base,floor:dark?mix(base,'#0e1820',.2):mix(base,accent,.13),window:dark?mix(base,'#ffffff',.34):mix(base,'#fffbea',.73),
      sky:dark?mix(base,'#101a32',.43):mix(base,accent,.13),skyEnd:dark?mix(base,accent,.2):mix(base,'#ffe4c0',.27),
      hills:mix(base,accent,.4),hill2:mix(base,accent,.58),wood:dark?mix(base,'#ad8e76',.5):mix('#d5b394',base,.22),
      edge:dark?mix(base,'#a38b79',.34):mix('#ad856f',accent,.16),screen:mix(base,accent,.44),curtain:mix(base,accent,.34),
      chair:mix(base,accent,.37),chairEdge:mix(base,accent,.52),light:dark?'#ffdfa1':'#fff0bf'};return [id,p];
  }));
  function apply(id){const p=themes[id]||themes.lavender,root=document.documentElement;root.dataset.theme=p.id;root.style.colorScheme=p.dark?'dark':'light';
    const vars={page:p.page,surface:p.surface,ink:p.ink,muted:p.muted,line:p.line,accent:p.accent,'accent-light':p.soft,'accent-soft':p.soft,scene:p.wall,'theme-color':p.accent};
    Object.entries(vars).forEach(([key,v])=>root.style.setProperty('--'+key,v));try{localStorage.setItem('little-suite.theme',p.id);}catch{}
    try{const u=new URL(location.href);if(u.searchParams.has('theme')&&u.searchParams.get('theme')!==p.id){u.searchParams.set('theme',p.id);history.replaceState(null,'',u.href);}}catch{}
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',p.page);return p;
  }
  function current(){try{const q=new URLSearchParams(location.search).get('theme');return themes[q]?q:localStorage.getItem('little-suite.theme')||'lavender';}catch{return 'lavender';}}
  const categories=['School','Work','Home','Personal'];
  const catalog=[
    ['plant','Leafy friend',20,202,300,1.25],['books','One more chapter',0,264,343,.85],['matcha','Matcha moment',20,610,345,.8],
    ['lamp','Golden glow',40,700,267,1.6],['cat','Sleepy company',60,750,347,1.15],['lights','Tiny starlights',40,115,35,1.7],
    ['flowers','Fresh flowers',40,170,310,1.15],['candle','Slow evening',25,630,345,.8],['headphones','In my own world',45,297,338,.9],
    ['teddy','Little daydreamer',65,770,335,1.2],['crystal','Pocket of magic',35,625,356,.7],['clock','Time to bloom',35,180,345,.8],
    ['notebook','Bright ideas',25,290,360,.9],['terrarium','Tiny forest',60,200,290,1.3],['vase','Curves & calm',35,675,310,1.15],
    ['gamepad','After hours',55,605,362,.85],['record','Sunday soundtrack',70,230,304,1.2],['mushrooms','Forest finds',45,720,338,1],
    ['fishbowl','A little blue',80,670,280,1.5],['camera','Keep the moment',50,620,340,.95],['bunny','Soft little friend',80,720,325,1.25],
    ['globe','Anywhere someday',90,220,280,1.4]
  ].map(([id,name,price,x,y,scale])=>({id,name,price,x,y,scale}));
  return {themes,mix,apply,current,categories,catalog};
})();
