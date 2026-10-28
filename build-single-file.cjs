// Rebuild the shared soundtrack fragment and the portable desk, then version all
// runtime assets by their content so returning visitors receive the new features.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const assets=['styles.css','suite.js','model.js','scene.js','planner.js','cloud.js','music.js','app.js','focus.css','focus.js'];
const version=crypto.createHash('sha256').update(assets.map(f=>fs.readFileSync(path.join(__dirname,f))).join('\n')).digest('hex').slice(0,12);
const music=fs.readFileSync(path.join(__dirname,'music-widget.html'),'utf8');
let source=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const block='<!-- MUSIC_DOCK_START -->\n'+music+'\n<!-- MUSIC_DOCK_END -->';
source=source.includes('<!-- MUSIC_DOCK_START -->')?source.replace(/<!-- MUSIC_DOCK_START -->[\s\S]*?<!-- MUSIC_DOCK_END -->/,()=>block):source.replace('<!-- MUSIC_DOCK -->',()=>block);
source=source.replace(/(href|src)="([a-z-]+\.(?:css|js))(?:\?v=[^"]*)?"/g,(all,kind,file)=>assets.includes(file)?`${kind}="${file}?v=${version}"`:all);
fs.writeFileSync(path.join(__dirname,'index.html'),source);
let html=source.replace(`href="styles.css?v=${version}"`,'href="styles.css"');
html=html.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>\n'+fs.readFileSync(path.join(__dirname,'styles.css'),'utf8')+'</style>');
for(const name of ['suite.js','model.js','scene.js','planner.js','cloud.js','music.js','app.js'])html=html.replace(`<script src="${name}?v=${version}" defer></script>`,()=>'<script defer>\n'+fs.readFileSync(path.join(__dirname,name),'utf8').replace(/<\/script/gi,'<\\/script')+'\n</script>');
const scripts=[];html=html.replace(/<script defer>[\s\S]*?<\/script>/g,s=>{scripts.push(s.replace('<script defer>','<script>'));return '';});html=html.replace('</body>',()=>scripts.join('\n')+'\n</body>');
fs.writeFileSync(path.join(__dirname,'portable.html'),html);console.log('Built desk and portable HTML, assets '+version);module.exports={version};
