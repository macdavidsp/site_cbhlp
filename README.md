# 💧 Sistema de Registro de Presença - CBHLP

Este projeto é um sistema simples de registro de presença para reuniões do Comitê da Bacia Hidrográfica do Lago de Palmas (CBHLP), hospedado no GitHub Pages e integrado ao Google Sheets via Google Apps Script.

---

## 🚀 Funcionalidades

- Registro de presença com nome, CPF, instituição, setor e representação
- Verificação de presença por CPF
- Consulta de quórum por setor
- Painel administrativo com exportação em CSV e PDF
- Integração com Google Sheets (sem backend)

---

## 🛠️ Como usar

1. **Clone ou baixe este repositório**
2. **Configure sua planilha no Google Sheets**:
   - Crie uma planilha com colunas: `Data, Nome, CPF, Instituição, Setor, Representação, Código`
   - Crie um script com o código Apps Script fornecido
   - Implante como aplicativo da web com acesso público
3. **Atualize a URL da API nos arquivos HTML**:
   - Substitua a URL do Apps Script em todos os arquivos por sua própria URL
4. **Publique no GitHub Pages**:
   - Vá em Settings > Pages > selecione a branch `main` e clique em Save

---

## 📁 Estrutura dos arquivos

| Arquivo         | Função                                      |
|------------------|---------------------------------------------|
| `index.html`     | Página inicial                              |
| `cadastro.html`  | Registro de presença                        |
| `verificar.html` | Verificação de presença por CPF             |
| `quorum.html`    | Consulta de quórum por setor                |
| `admin.html`     | Painel administrativo com exportações       |
| `style.css`      | Estilo visual do site                       |
| `README.md`      | Este guia                                   |

## 📦 Tecnologias usadas

- HTML5 + CSS3
- JavaScript puro (sem frameworks)
- Google Sheets + Google Apps Script
- GitHub Pages

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comunitários. Sinta-se à vontade para adaptar e reutilizar.

---
