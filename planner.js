/* A tiny, dependency-free PDF writer. It uses PDF's built-in Helvetica fonts and
   ASCII text so exported bytes, stream lengths and xref offsets stay predictable.
   The planner is deliberately blank: private task text never leaves the device. */
function makePlannerPDF(theme) {
  const accent=(LittleSuite.themes[theme]||LittleSuite.themes.lavender).accent.match(/\w\w/g).map(v=>Math.round(parseInt(v,16)/255*1000)/1000);
  const commands=[];
  const color=c=>c.join(' ');
  const text=(x,y,size,value,bold=false)=>commands.push(`BT /${bold?'F2':'F1'} ${size} Tf 0.25 0.23 0.30 rg ${x} ${y} Td (${value.replace(/[\\()]/g,'\\$&')}) Tj ET`);
  const line=(x,y,x2,y2)=>commands.push(`0.87 0.85 0.90 RG 0.6 w ${x} ${y} m ${x2} ${y2} l S`);
  const box=(x,y,w,h)=>commands.push(`0.78 0.75 0.82 RG 0.7 w ${x} ${y} ${w} ${h} re S`);
  commands.push('1 0.995 0.98 rg 0 0 595 842 re f',`${color(accent)} rg 40 774 515 4 re f`);
  text(40,803,12,'little desk.',true);text(40,733,32,'A little space for today.');
  text(40,708,10,'Small steps. Clear intentions. Room to breathe.');
  text(423,805,10,'DATE: ______________');
  text(40,662,11,'MY THREE LITTLE PRIORITIES',true);
  for(let i=0;i<3;i++){box(42,628-i*33,10,10);line(66,628-i*33,554,628-i*33);}
  text(40,518,11,'ONE THING AT A TIME',true);text(40,499,9,'My focus sessions - write one task, then give it your attention.');
  for(let i=0;i<4;i++){box(42,465-i*29,10,10);line(66,465-i*29,439,465-i*29);text(460,467-i*29,9,'____ min');}
  text(40,311,11,'A LITTLE ROOM FOR THOUGHT',true);
  for(let i=0;i<5;i++)line(40,283-i*25,554,283-i*25);
  text(40,124,11,'TODAY, I AM GLAD I...',true);line(40,95,554,95);
  text(40,47,9,'No falling behind. Just one small step forward.');text(477,47,9,'LITTLE DESK');
  const stream=commands.join('\n');
  const objects=[
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  ];
  let pdf='%PDF-1.4\n',offsets=[0];
  objects.forEach((obj,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${obj}\nendobj\n`;});
  const xref=pdf.length;
  pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach(offset=>pdf+=`${String(offset).padStart(10,'0')} 00000 n \n`);
  pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf],{type:'application/pdf'});
}
