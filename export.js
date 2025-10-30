function exportarCSV() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  if (dados.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const cabecalho = "Nome,CPF,Instituição,Setor";
  const linhas = dados.map(p => `${p.nome},${p.cpf},${p.instituicao},${p.setor}`);
  const csv = [cabecalho, ...linhas].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "frequencia.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportarPDF() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  if (dados.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Lista de Frequência", 10, 10);

  let y = 20;
  dados.forEach((p, i) => {
    const linha = `${i + 1}. ${p.nome} - ${p.cpf} - ${p.instituicao} - ${p.setor}`;
    doc.text(linha, 10, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("frequencia.pdf");
}