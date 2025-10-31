const supabase = supabase.createClient(
  'https://wdxwgtkgkhdeslmbkmnt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeHdndGtna2hkZXNsbWJrbW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Nzk5NzgsImV4cCI6MjA3NzQ1NTk3OH0._UfUZYLU9tY-nmWYt88fO9sOifCugPxPfQ6rQ-d0t_M'
);

async function exportarCSV() {
  const { data: registros } = await supabase.from("presencas").select("*");
  const cabecalho = "Nome,Entidade,Representação,Setor,Código";
  const linhas = registros.map(r => `${r.nome},${r.instituicao},${r.representacao},${r.setor},${r.codigo}`);
  const csv = [cabecalho, ...linhas].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "frequencia.csv";
  link.click();
}

async function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const { data: registros } = await supabase.from("presencas").select("*");

  doc.setFontSize(16);
  doc.text("Comitê de Bacia do Lago de Palmas - CBHLP", 10, 15);
  doc.setFontSize(12);
  doc.text("Lista de Frequência da Reunião Ordinária", 10, 23);

  const hoje = new Date();
  const data = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth()+1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
  doc.setFontSize(10);
  doc.text(`Data da assinatura: ${data}`, 10, 30);

  let y = 40;
  doc.text("Nome", 10, y);
  doc.text("Entidade", 60, y);
  doc.text("Representação", 110, y);
  doc.text("Setor", 150, y);
  doc.text("Código", 180, y);
  y += 8;

  registros.forEach(r => {
    doc.text(r.nome, 10, y);
    doc.text(r.instituicao, 60, y);
    doc.text(r.representacao, 110, y);
    doc.text(r.setor, 150, y);
    doc.text(r.codigo, 180, y);
    y += 8;
  });

  y += 10;
  doc.setFontSize(9);
  doc.text("Assinaturas podem ser verificadas em:", 10, y);
  doc.text("https://macdavidsp.github.io/cbhlp/verificar.html", 10, y + 6);

  doc.save("frequencia.pdf");
}