// Run this after editing the sources: node build-single-file.cjs
// It produces the same app as one HTML file for a simple GitHub upload.
const fs=require('node:fs'),path=require('node:path');
let html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>\n'+fs.readFileSync(path.join(__dirname,'styles.css'),'utf8')+'</style>');
for(const name of ['suite.js','model.js','scene.js','planner.js','cloud.js','app.js']) {
  html=html.replace(`<script src="${name}" defer></script>`,()=>`<script defer>\n${fs.readFileSync(path.join(__dirname,name),'utf8').replace(/<\/script/gi,'<\\/script')}\n</script>`);
}
// Inline scripts do not honor defer. Move them after the page so the DOM exists.
const scripts=[];
html=html.replace(/<script defer>[\s\S]*?<\/script>/g,script=>{scripts.push(script.replace('<script defer>','<script>'));return '';});
html=html.replace('</body>',()=>scripts.join('\n')+'\n</body>');
const target=path.join(__dirname,'portable.html');
fs.writeFileSync(target,html);console.log('Wrote '+target);
