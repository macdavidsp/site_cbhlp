function exportarCSV() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  const csv = "Nome,CPF,Instituição,Setor\n" + dados.map(p => `${p.nome},${p.cpf},${p.instituicao},${p.setor}`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "frequencia.csv";
  link.click();
}

function exportarPDF() {
  const dados = JSON.parse(localStorage.getItem("frequencia")) || [];
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Lista de Frequência", 10, 10);
  dados.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.nome} - ${p.cpf} - ${p.instituicao} - ${p.setor}`, 10, 20 + i * 10);
  });
  doc.save("frequencia.pdf");
}