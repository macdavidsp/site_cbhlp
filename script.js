const participantes = JSON.parse(localStorage.getItem("frequencia")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(form));
      if (participantes.some(p => p.cpf === dados.cpf)) {
        document.getElementById("mensagem").textContent = "Você já registrou presença.";
        return;
      }
      participantes.push(dados);
      localStorage.setItem("frequencia", JSON.stringify(participantes));
      document.getElementById("mensagem").textContent = "Presença registrada com sucesso!";
      form.reset();
    });
  }

  const total = document.getElementById("total");
  const percentual = document.getElementById("percentual");
  if (total && percentual) {
    total.textContent = participantes.length;
    percentual.textContent = ((participantes.length / 10) * 100).toFixed(0);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { usuario, senha } = Object.fromEntries(new FormData(loginForm));
      if (usuario === "admin" && senha === "1234") {
        document.getElementById("painel").style.display = "block";
        loginForm.style.display = "none";
        const tabela = document.getElementById("tabelaFrequencia");
        tabela.innerHTML = "<tr><th>Nome</th><th>CPF</th><th>Instituição</th><th>Setor</th></tr>" +
          participantes.map(p => `<tr><td>${p.nome}</td><td>${p.cpf}</td><td>${p.instituicao}</td><td>${p.setor}</td></tr>`).join("");
      } else {
        alert("Credenciais inválidas.");
      }
    });
  }
});