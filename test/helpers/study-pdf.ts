/** Small generated PDF for tests; no private study content is checked in. */
export function studyPdf(pageCount = 5): Buffer {
  const objects: string[] = [];
  objects.push('<< /Type /Catalog /Pages 2 0 R >>');
  objects.push(`<< /Type /Pages /Count ${pageCount} /Kids [${Array.from({length:pageCount},(_,i)=>`${3+i*2} 0 R`).join(' ')}] >>`);
  for (let i=0;i<pageCount;i++) {
    const text=`BT /F1 16 Tf 40 100 Td (Searchable security library page ${i+1}) Tj ET`;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents ${4+i*2} 0 R >>`);
    objects.push(`<< /Length ${text.length} >>\nstream\n${text}\nendstream`);
  }
  let pdf='%PDF-1.4\n';
  const offsets=[0];
  objects.forEach((body,i)=>{offsets.push(Buffer.byteLength(pdf));pdf+=`${i+1} 0 obj\n${body}\nendobj\n`;});
  const xref=Buffer.byteLength(pdf);
  pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
  for(const offset of offsets.slice(1)) pdf+=`${String(offset).padStart(10,'0')} 00000 n \n`;
  pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf);
}
