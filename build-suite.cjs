// Little Focus is a separate page, not a hidden or reskinned desk builder.
const fs=require('node:fs'),path=require('node:path');
const {version}=require('./build-single-file.cjs');
let focus=fs.readFileSync(path.join(__dirname,'focus-template.html'),'utf8');
focus=focus.replace('<!-- MUSIC_DOCK -->',()=>fs.readFileSync(path.join(__dirname,'music-widget.html'),'utf8'));
focus=focus.replace(/(href|src)="([a-z-]+\.(?:css|js))"/g,(all,kind,file)=>`${kind}="${file}?v=${version}"`);
fs.writeFileSync(path.join(__dirname,'focus.html'),focus);console.log('Built independent Little Focus page.');
