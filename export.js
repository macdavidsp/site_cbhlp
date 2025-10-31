function gerarCodigoVerificacao(cpf) {
  return "ID-" + btoa(cpf).slice(0, 8);
}

function exportarCSV() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  if (dados.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const cabecalho = "Nome,Entidade,Representação,Setor,Código de Verificação";
  const linhas = dados.map(p => {
    const codigo = gerarCodigoVerificacao(p.cpf);
    return `${p.nome},${p.instituicao},${p.representacao},${p.setor},${codigo}`;
  });

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

  // Título e subtítulo
  doc.setFontSize(16);
  doc.text("Comitê de Bacia do Lago de Palmas - CBHLP", 10, 15);
  doc.setFontSize(12);
  doc.text("Lista de Frequência da Reunião Ordinária", 10, 23);

  // Data atual
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  doc.setFontSize(10);
  doc.text(`Data da assinatura: ${dataFormatada}`, 10, 30);

  // Cabeçalho da tabela
  let y = 40;
  doc.setFontSize(10);
  doc.text("Nome", 10, y);
  doc.text("Entidade", 60, y);
  doc.text("Representação", 110, y);
  doc.text("Setor", 150, y);
  doc.text("Código", 180, y);

  y += 8;

  // Linhas da tabela
  dados.forEach((p, i) => {
    const codigo = gerarCodigoVerificacao(p.cpf);
    doc.text(p.nome, 10, y);
    doc.text(p.instituicao, 60, y);
    doc.text(p.representacao, 110, y);
    doc.text(p.setor, 150, y);
    doc.text(codigo, 180, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // Rodapé com link de verificação
  y += 10;
  doc.setFontSize(9);
  doc.text("Assinaturas podem ser verificadas em:", 10, y);
  doc.text("https://macdavidsp.github.io/cbhlp/verificar.html", 10, y + 6);

  doc.save("frequencia.pdf");
}