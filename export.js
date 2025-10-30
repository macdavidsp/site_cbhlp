function gerarCodigoVerificacao(cpf) {
  // Gera um código único baseado no CPF (simples codificação base64)
  return "ID-" + btoa(cpf).slice(0, 8);
}

function exportarCSV() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  if (dados.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const cabecalho = "Nome,Instituição,Setor,Código de Verificação";
  const linhas = dados.map(p => {
    const codigo = gerarCodigoVerificacao(p.cpf);
    return `${p.nome},${codigo},${p.instituicao},${p.setor}`;
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

  doc.setFontSize(14);
  doc.text("Lista de Frequência", 10, 10);

  doc.setFontSize(10);
  doc.text("Assinaturas podem ser verificadas em:", 10, 18);
  doc.text("https://macdavidsp.github.io/cbhlp/verificar.html", 10, 24);

  let y = 35;
  dados.forEach((p, i) => {
    const codigo = gerarCodigoVerificacao(p.cpf);
    const linha = `${i + 1}. ${p.nome} - ${codigo} - ${p.instituicao} - ${p.setor}`;
    doc.text(linha, 10, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("frequencia.pdf");
}