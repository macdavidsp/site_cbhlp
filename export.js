const supabase = supabase.createClient(
  'https://wdxwgtkgkhdeslmbkmnt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeHdndGtna2hkZXNsbWJrbW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Nzk5NzgsImV4cCI6MjA3NzQ1NTk3OH0._UfUZYLU9tY-nmWYt88fO9sOifCugPxPfQ6rQ-d0t_M'
);

// Exporta CSV com os dados organizados por data
async function exportarCSV() {
  const { data: registros, error } = await supabase
    .from("presencas")
    .select("*")
    .order("data_reuniao", { ascending: false });

  if (error) {
    alert("Erro ao exportar CSV: " + error.message);
    return;
  }

  const cabecalho = "Data,Nome,Entidade,Representação,Setor,Código";
  const linhas = registros.map(r =>
    `${r.data_reuniao},${r.nome},${r.instituicao},${r.representacao},${r.setor},${r.codigo}`
  );
  const csv = [cabecalho, ...linhas].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "frequencia.csv";
  link.click();
}

// Exporta PDF com os dados organizados por data
async function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const { data: registros, error } = await supabase
    .from("presencas")
    .select("*")
    .order("data_reuniao", { ascending: false });

  if (error) {
    alert("Erro ao exportar PDF: " + error.message);
    return;
  }

  doc.setFontSize(16);
  doc.text("Comitê de Bacia do Lago de Palmas - CBHLP", 10, 15);
  doc.setFontSize(12);
  doc.text("Lista de Frequência da Reunião Ordinária", 10, 23);

  const hoje = new Date();
  const data = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth()+1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
  doc.setFontSize(10);
  doc.text(`Data da exportação: ${data}`, 10, 30);

  let y = 40;
  doc.text("Data", 10, y);
  doc.text("Nome", 35, y);
  doc.text("Entidade", 80, y);
  doc.text("Representação", 130, y);
  doc.text("Setor", 160, y);
  doc.text("Código", 185, y);
  y += 8;

  registros.forEach(r => {
    doc.text(r.data_reuniao, 10, y);
    doc.text(r.nome, 35, y);
    doc.text(r.instituicao, 80, y);
    doc.text(r.representacao, 130, y);
    doc.text(r.setor, 160, y);
    doc.text(r.codigo, 185, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += 10;
  doc.setFontSize(9);
  doc.text("Assinaturas podem ser verificadas em:", 10, y);
  doc.text("https://macdavidsp.github.io/cbhlp/verificar.html", 10, y + 6);

  doc.save("frequencia.pdf");
}