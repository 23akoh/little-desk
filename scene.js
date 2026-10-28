/* Original SVG illustration. Keeping the scene vector-based makes the wallpaper
   crisp at any size, and avoids third-party image licenses or CORS restrictions. */
const DeskArt = (() => {
  const palettes=LittleSuite.themes;
  const items=LittleSuite.catalog;
  // Each item lives in a 100 x 100 coordinate box, reused in the shop and scene.
  const drawings = {
    plant:`<path d="M48 73Q54 39 40 13M50 57Q68 48 72 25M48 49Q31 43 26 28" fill="none" stroke="#6d8e71" stroke-width="4" stroke-linecap="round"/><path d="M41 33Q17 33 22 12Q44 10 41 33M48 48Q44 23 62 16Q78 36 48 48M55 61Q61 38 84 43Q84 65 55 61M40 50Q15 57 14 35Q33 29 40 50" fill="#8fae88"/><path d="M29 69h45l-6 28H35z" fill="#d49c8c"/><path d="M27 68h49v8H27z" rx="3" fill="#e3b29e"/><path d="M39 80l2 12M49 80v12M60 80l-2 12" stroke="#efc7b0" stroke-width="2"/>`,
    matcha:`<ellipse cx="47" cy="88" rx="35" ry="6" fill="#b69da8" opacity=".18"/><path d="M68 45h10c23 0 17 30-5 30h-6" fill="none" stroke="#f9f1dd" stroke-width="9"/><path d="M18 42h52v32q0 16-25 16T18 74z" fill="#f9f1dd"/><ellipse cx="44" cy="42" rx="26" ry="7" fill="#c6cf9f"/><ellipse cx="44" cy="42" rx="20" ry="4" fill="#9da973"/><path d="M39 17q-9 8 0 15M52 10q-8 8 0 15" fill="none" stroke="#fff8ed" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
    lamp:`<ellipse cx="52" cy="94" rx="30" ry="4" fill="#b49b9a" opacity=".2"/><path d="M49 44v42M31 88h39" stroke="#b08a73" stroke-width="6" stroke-linecap="round"/><path d="M29 14h40l13 32H16z" fill="#eed8ab"/><path d="M18 44h63" stroke="#d6b88c" stroke-width="4" stroke-linecap="round"/><path d="M72 47v15" stroke="#b08a73" stroke-width="2"/><circle cx="72" cy="64" r="3" fill="#b08a73"/>`,
    cat:`<ellipse cx="49" cy="82" rx="43" ry="9" fill="#a98b93" opacity=".17"/><path d="M37 42q29-16 46 6q17 35-17 36H29Q7 81 13 66" fill="#cfac99"/><path d="M27 54L19 24l24 14L59 22l9 34" fill="#cfac99"/><path d="M25 43l-2-11 10 8M53 39l5-9 3 13" fill="#e5b6ad"/><ellipse cx="43" cy="59" rx="30" ry="23" fill="#dec1a8"/><path d="M24 58q5 5 10 0m13 0q5 5 10 0" stroke="#7f6567" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M39 65h7l-3 4z" fill="#b78587"/><path d="M74 71q18 19 11-8" stroke="#b99081" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M29 42l4 8m8-10 1 9m11-8-3 8" stroke="#bc9481" stroke-width="3" stroke-linecap="round"/>`,
    books:`<path d="M11 74h78v16H11z" fill="#a7b5a2"/><path d="M17 76h68v10H17z" fill="#faf0d9"/><path d="M18 55h65v18H18z" fill="#be9cba"/><path d="M25 58h58v11H25z" fill="#f9efd9"/><path d="M10 39h72v16H10z" fill="#dfb4a4"/><path d="M15 42h61v9H15z" fill="#f8ecd7"/><path d="M28 76v10M67 42v9" stroke="#d6bea5" stroke-width="2"/><path d="M41 42v23l6-5 6 5V42" fill="#a58ba8"/>`,
    lights:`<path d="M2 28q46 55 96 0" stroke="#b99e87" stroke-width="2" fill="none"/><g fill="#f9db98" stroke="#e7bd79" stroke-width="1"><path d="M12 41l3-6 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5zM46 57l3-6 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5zM79 44l3-6 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5z"/></g>`
  };
  Object.assign(drawings,{
    flowers:`<path d="M32 61h37l-6 35H38z" fill="#e8b1a8"/><g stroke="#85a57c" stroke-width="3"><path d="M49 70V20m0 40 20-24M48 53 28 37"/></g><g fill="#edc0c5"><circle cx="49" cy="21" r="15"/><circle cx="27" cy="36" r="12"/><circle cx="71" cy="34" r="13"/></g><g fill="#f8df9d"><circle cx="49" cy="21" r="5"/><circle cx="27" cy="36" r="4"/><circle cx="71" cy="34" r="4"/></g>`,
    candle:`<ellipse cx="50" cy="86" rx="30" ry="6" fill="#bea09a" opacity=".2"/><rect x="25" y="42" width="50" height="44" rx="7" fill="#ead9b2"/><ellipse cx="50" cy="43" rx="25" ry="6" fill="#fff1ce"/><path d="M50 42v-9" stroke="#795f54" stroke-width="2"/><path d="M50 12q-16 17 0 22q15-6 0-22" fill="#edbd73"/><path d="M36 59h28v14H36z" fill="#fff7e5"/>`,
    headphones:`<path d="M20 62V44a30 30 0 0 1 60 0v18" stroke="#8c9eaf" stroke-width="9" fill="none"/><rect x="12" y="47" width="22" height="38" rx="9" fill="#b2c6cd"/><rect x="67" y="47" width="22" height="38" rx="9" fill="#b2c6cd"/><path d="M19 55v20m60-20v20" stroke="#e2e9df" stroke-width="3"/>`,
    teddy:`<g fill="#c9a184"><circle cx="27" cy="27" r="13"/><circle cx="73" cy="27" r="13"/><ellipse cx="50" cy="70" rx="27" ry="29"/><circle cx="50" cy="43" r="30"/><ellipse cx="20" cy="68" rx="13" ry="17"/><ellipse cx="80" cy="68" rx="13" ry="17"/></g><ellipse cx="50" cy="74" rx="16" ry="18" fill="#e8c8a5"/><ellipse cx="50" cy="50" rx="14" ry="10" fill="#e8c8a5"/><g fill="#69534c"><circle cx="39" cy="39" r="3"/><circle cx="61" cy="39" r="3"/><ellipse cx="50" cy="49" rx="5" ry="3"/></g>`,
    crystal:`<path d="M28 83 19 47 35 17 58 7 82 45 70 83z" fill="#b6c8dd"/><path d="M35 17 48 49 58 7m-10 42 22 34M19 47l29 2-20 34m20-34 34-4" fill="none" stroke="#edf1f6" stroke-width="2"/><path d="M10 85h76" stroke="#c0acbc" stroke-width="4" stroke-linecap="round"/>`,
    clock:`<path d="M25 83l-8 12m58-12 8 12" stroke="#ba8e76" stroke-width="5"/><circle cx="50" cy="51" r="37" fill="#e3b897"/><circle cx="50" cy="51" r="30" fill="#fff1da"/><path d="M50 30v23l15 10" stroke="#94715e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M21 10 11 25M78 10l11 15" stroke="#ba8e76" stroke-width="10" stroke-linecap="round"/>`,
    notebook:`<path d="M20 20h64v70H20z" fill="#b7c6a1"/><path d="M27 20v70" stroke="#839778" stroke-width="4"/><path d="M39 37h31v22H39z" fill="#fff2d8"/><path d="M44 43h21m-21 6h15" stroke="#bbbd9a" stroke-width="2"/><path d="M68 60l18-35 5 3-18 35-6 5z" fill="#e0b39c"/>`,
    terrarium:`<path d="M50 9 85 39 76 87H23L15 39z" fill="#d9e6d3" fill-opacity=".75" stroke="#acb79a" stroke-width="2"/><path d="M15 39h70M50 9v76M23 87l27-48 26 48" fill="none" stroke="#acb79a" stroke-width="2"/><path d="M26 79q24-45 48 0z" fill="#89a67b"/><path d="M39 76V48m0 9-9-7m9 18 9-10" stroke="#587b60" stroke-width="4"/>`,
    vase:`<path d="M39 21h22v16q0 12 17 26q12 26-28 30Q10 89 22 63q17-14 17-26z" fill="#d7ad9b"/><path d="M40 27h20M32 71q18 8 37 0" stroke="#f0d0bc" stroke-width="3" fill="none"/>`,
    gamepad:`<path d="M29 34h44q13 0 20 39q0 16-16 11L63 69H39L24 84Q7 89 8 73q5-39 21-39" fill="#aebecb"/><path d="M29 45v22m-11-11h22" stroke="#647b8e" stroke-width="5"/><circle cx="73" cy="49" r="5" fill="#ebc4bc"/><circle cx="82" cy="61" r="5" fill="#cbd6ae"/>`,
    record:`<rect x="7" y="25" width="87" height="60" rx="7" fill="#c8a18d"/><circle cx="44" cy="54" r="24" fill="#51515c"/><circle cx="44" cy="54" r="17" fill="none" stroke="#76727a"/><circle cx="44" cy="54" r="9" fill="#e4c299"/><path d="M81 34v24L65 69" stroke="#f1d8bc" stroke-width="4" fill="none"/><path d="M18 87v7m64-7v7" stroke="#977465" stroke-width="5"/>`,
    mushrooms:`<path d="M27 47v36q10 13 20 0V47M61 65v22q7 10 15 0V65" fill="#f5dfc1"/><path d="M8 49q29-65 59 0z" fill="#d39183"/><path d="M47 65q23-45 44 0z" fill="#d7b38a"/><g fill="#fff1d5"><circle cx="26" cy="32" r="5"/><circle cx="46" cy="37" r="5"/><circle cx="69" cy="55" r="4"/></g>`,
    fishbowl:`<path d="M26 22h48q-6 9 7 26q22 43-31 45Q-3 91 19 48q13-17 7-26" fill="#c6e0e4" stroke="#aecbd1" stroke-width="2"/><path d="M16 55q34 7 68 0" fill="none" stroke="#e9f4e8" stroke-width="2"/><path d="M42 66q12-13 26 0q-14 15-26 0l-11 8V59z" fill="#e7b488"/><circle cx="62" cy="65" r="2" fill="#7a6b63"/><path d="M29 85V69m0 7-6-5" stroke="#8eae89" stroke-width="3"/><g fill="#f5fcfb"><circle cx="71" cy="47" r="3"/><circle cx="65" cy="37" r="2"/></g>`,
    camera:`<rect x="10" y="36" width="80" height="51" rx="8" fill="#c2b8a5"/><path d="M25 36l7-14h27l7 14" fill="#b1a48f"/><circle cx="51" cy="61" r="22" fill="#e5ded0"/><circle cx="51" cy="61" r="15" fill="#687883"/><circle cx="47" cy="57" r="5" fill="#afc5cd"/><path d="M74 47h8" stroke="#faf1db" stroke-width="5"/>`,
    bunny:`<ellipse cx="50" cy="72" rx="27" ry="24" fill="#e4d5bd"/><ellipse cx="37" cy="24" rx="10" ry="24" fill="#e4d5bd"/><ellipse cx="63" cy="24" rx="10" ry="24" fill="#e4d5bd"/><circle cx="50" cy="51" r="28" fill="#f2e7d1"/><g fill="#aa8b7d"><circle cx="40" cy="49" r="3"/><circle cx="61" cy="49" r="3"/><path d="M46 58h9l-5 5z"/></g><path d="M37 6v27m26-27v27" stroke="#dfbab3" stroke-width="5" stroke-linecap="round"/>`,
    globe:`<path d="M49 71v15M29 89h40" stroke="#c09c75" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="41" r="31" fill="#b2ced3"/><path d="M31 19l10 8-3 11 12 10-4 18-13-12-8-3-3-16M60 15l-6 15 15 9 10-5" fill="#91ac88"/><path d="M25 14a36 36 0 0 0 50 54" fill="none" stroke="#c09c75" stroke-width="3"/>`
  });
  function thumbnail(id) {return `<svg viewBox="0 0 100 100" aria-hidden="true">${drawings[id]||''}</svg>`;}
  function scene(theme,visible,positions={}) {
    const p=palettes[theme]||palettes.lavender,night=p.dark;
    const show=(item)=>{const {id,scale}=item,pos=positions[id]||item;return `<g data-desk-item="${id}" role="button" tabindex="0" aria-label="Move ${item.name.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" transform="translate(${pos.x} ${pos.y}) scale(${scale})"><rect width="100" height="100" fill="transparent" pointer-events="all"/>${drawings[id]}</g>`;};
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="625" viewBox="0 0 1000 625">
      <defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${p.sky}"/><stop offset="1" stop-color="${p.skyEnd}"/></linearGradient><radialGradient id="glow"><stop stop-color="${p.light}" stop-opacity=".4"/><stop offset="1" stop-color="${p.light}" stop-opacity="0"/></radialGradient><clipPath id="window-clip"><rect x="423" y="75" width="356" height="280" rx="100"/></clipPath></defs>
      <path fill="${p.wall}" d="M0 0h1000v625H0z"/><path fill="${p.floor}" d="M0 490h1000v135H0z"/>
      <path d="M0 490h1000" stroke="${p.edge}" opacity=".13" stroke-width="3"/>
      <path d="M89 625V0M896 625V0" stroke="${p.edge}" opacity=".055" stroke-width="2"/>
      <ellipse cx="530" cy="548" rx="344" ry="29" fill="${p.ink}" opacity=".08"/>
      <rect x="409" y="61" width="384" height="307" rx="113" fill="${p.edge}" opacity=".12"/>
      <rect x="415" y="61" width="373" height="299" rx="108" fill="${p.window}"/>
      <g clip-path="url(#window-clip)"><path d="M423 75h356v280H423z" fill="url(#sky)"/>
      <circle cx="693" cy="135" r="32" fill="${night?'#f8e8c6':'#fff4d4'}"/>
      ${night?'<circle cx="707" cy="122" r="29" fill="#272e4d"/><g fill="#fff5de"><circle cx="464" cy="134" r="2"/><circle cx="535" cy="101" r="2"/><circle cx="628" cy="145" r="2"/><circle cx="738" cy="194" r="2"/><path d="M581 181v12m-6-6h12" stroke="#fff5de" stroke-width="2"/></g>':'<path d="M450 176q0-16 19-13q8-24 28-8q22-4 22 17H450M633 220q0-12 15-12q5-20 23-8q23-8 25 17H633" fill="#fff9ee" opacity=".7"/>'}
      <path d="M418 309q80-86 165-34t210-18v99H418" fill="${p.hills}"/><path d="M418 328q104-55 194-12t186-17v57H418" fill="${p.hill2}"/>
      <path d="M737 281v74m-14-49 14-22 15 22m-28 18 13-22 15 22" stroke="${p.ink}" stroke-width="3" fill="none" opacity=".3"/></g>
      <path d="M600 76v279M423 237h355" stroke="${p.window}" stroke-width="9"/><rect x="403" y="351" width="397" height="14" rx="6" fill="${p.window}"/>
      <path d="M400 67q-25 80-20 223l23 61h24q-16-134 9-281zM786 67q32 91 29 224l-18 60h-26q17-134-9-281z" fill="${p.curtain}" opacity=".8"/>
      <path d="M389 90q-8 98 5 186M802 93q15 106 1 183" stroke="${p.window}" opacity=".2" stroke-width="6" fill="none"/>
      <rect x="133" y="183" width="190" height="12" rx="4" fill="${p.wood}"/><path d="M153 196v15h12v-15M292 196v15h12v-15" fill="${p.edge}" opacity=".6"/>
      <path d="M150 144h19v39h-19z" fill="#a7b5a2"/><path d="M172 135h15v48h-15z" fill="#d1a9a2"/><path d="M190 143h13v40h-13z" fill="${p.curtain}"/><path d="M207 139l14-3 12 44-14 3z" fill="#ecceaa"/>
      <rect x="257" y="130" width="43" height="53" rx="3" fill="${p.window}"/><path d="M265 139h27v34h-27z" fill="#c5cfb3"/><path d="M268 168l13-19 8 19z" fill="#91a48c"/><circle cx="272" cy="145" r="3" fill="#fff2ca"/>
      <path d="M147 257l87-5 4 81-87 4z" fill="${p.ink}" opacity=".05"/><path d="M142 251l87-5 4 81-87 4z" fill="${p.window}"/><path d="M150 258l71-4 3 53-71 4z" fill="${p.hills}"/><path d="M154 302l18-28 16 16 13-19 19 29z" fill="${p.hill2}"/><circle cx="205" cy="265" r="7" fill="#f7dec6"/><path d="M174 245l20-1 1 10-20 1z" fill="#d6bf8e" opacity=".75"/>
      <circle cx="318" cy="101" r="31" fill="${p.window}"/><circle cx="318" cy="101" r="26" stroke="${p.edge}" stroke-width="1" fill="none" opacity=".5"/><path d="M318 83v19l12 7" stroke="${p.ink}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M165 450h37l-14 131h-23zM810 450h36v131h-23z" fill="${p.edge}"/><path d="M201 461h607v17H201z" fill="${p.wood}"/>
      <rect x="131" y="428" width="748" height="27" rx="9" fill="${p.edge}"/><rect x="130" y="422" width="750" height="22" rx="9" fill="${p.wood}"/><path d="M159 433h689" stroke="${p.window}" stroke-width="2" opacity=".25"/>
      <ellipse cx="490" cy="418" rx="162" ry="8" fill="${p.ink}" opacity=".12"/>
      <rect x="356" y="283" width="240" height="132" rx="9" fill="${p.ink}"/><rect x="363" y="291" width="226" height="113" rx="4" fill="${p.screen}"/>
      <path d="M366 389q68-53 124-12t96-3v27H366z" fill="${p.window}" opacity=".22"/><circle cx="477" cy="326" r="12" fill="${p.window}" opacity=".55"/>
      <text x="477" y="359" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="${p.window}">one thing at a time.</text>
      <path d="M355 411h244l25 12q0 5-11 5H339q-11 0-11-5z" fill="${p.window}"/><path d="M448 412h58l5 7h-68z" fill="${p.edge}" opacity=".3"/>
      ${visible.map(id=>items.find(i=>i.id===id)).filter(Boolean).map(show).join('')}
      <path d="M444 504q0-31 41-31h50q41 0 41 31v101H444z" fill="${p.chair}"/><path d="M458 503v93M563 504v93" stroke="${p.window}" opacity=".16" stroke-width="3"/><path d="M445 604h132v21H445z" fill="${p.chairEdge}"/>
      <path d="M895 489q-13-16-2-38q13 19 2 38M903 482q2-20 18-25q4 22-18 25" fill="#91a18b" opacity=".8"/><path d="M878 487h39l-6 33h-27z" fill="${p.edge}"/>
    </svg>`;
  }
  return {palettes,items,thumbnail,scene};
})();
