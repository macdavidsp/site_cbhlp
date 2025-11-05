# Sistema de Gestão On-line de Reuniões

Este sistema é uma aplicação web de página única (Single-Page Application - SPA) desenvolvida para gerenciar e acompanhar o registro de frequência e quórum de participantes em reuniões.

A aplicação utiliza uma arquitetura moderna e ferramentas em tempo real para fornecer uma visão clara da participação.

## 1. Visão Geral e Tecnologias

| Característica | Detalhes |
| :--- | :--- |
| **Nome** | Sistema de Gestão On-line de Reuniões: Registro de Frequência e Quórum |
| **Frontend** | HTML5, JavaScript (Módulo), **Tailwind CSS** (para estilização) |
| **Backend/Dados** | **Firebase** (Google Cloud) |
| **Serviços Firebase** | Firestore (Banco de Dados em Tempo Real), Authentication |
| **Bibliotecas Adicionais** | **Chart.js** (para gráficos de quórum), **jsPDF** e **jspdf-autotable** (para exportação de PDF) |

## 2. Funcionalidades Principais

O sistema apresenta um Menu Principal com quatro módulos distintos:

### 2.1. Registro de Presença (Marcar Presença)

Este módulo permite que os participantes registrem sua presença na reunião do dia.

* **Coleta de Dados:** O formulário exige informações como Nome Completo, CPF (apenas 11 dígitos numéricos), Instituição/Órgão, Setor (Usuário, Poder Público ou Sociedade Civil) e Representação (Titular ou Suplente).
* **Validação:** O sistema realiza uma verificação para evitar duplicidade de registro de CPF na mesma reunião.
* **Código de Validação:** Após o registro bem-sucedido, é gerado e exibido um código de validação exclusivo para o participante.
* **Transação Segura:** O registro é feito utilizando uma transação no Firestore para garantir a integridade e a verificação de duplicidade.

### 2.2. Acompanhamento do Quórum (Ver Status)

Este painel fornece uma visão em tempo real da participação na reunião.

* **Tempo Real:** Utiliza o listener `onSnapshot` do Firebase Firestore para atualizar os dados automaticamente sempre que um novo registro é feito.
* **Indicadores:** Exibe o total de presentes e a data da reunião em vigor.
* **Gráficos:** Apresenta dois gráficos de pizza (Chart.js) para visualização rápida da distribuição dos participantes:
    * Distribuição por **Setor** (Usuário, Poder Público, Sociedade Civil).
    * Distribuição por **Representação** (Titular, Suplente).

### 2.3. Verificação de Validação (Verificar Código)

Permite a terceiros ou ao próprio usuário verificar a autenticidade de um registro.

* **Consulta:** O usuário insere o Código de Validação de 6 dígitos.
* **Resultado:** Em caso de código válido, exibe os detalhes do registro: Nome, Instituição, Setor, Data da Reunião e o carimbo de data/hora do registro.

### 2.4. Acesso de Administrador (Acesso Restrito)

Esta área permite o gerenciamento e a exportação dos dados de frequência.

* **Login:** Acesso protegido por uma senha de administrador simples (`minhasenhasecreta123` no código atual).
* **Dashboard:** Uma vez logado, o administrador visualiza uma tabela detalhada (Admin Dashboard) com todos os registros, incluindo Nome, CPF, Setor, Representação e o Código de Validação.
* **Exportação de Dados:** O administrador pode baixar os dados completos da reunião em dois formatos:
    * **CSV:** Para manipulação em planilhas eletrônicas.
    * **PDF:** Gera um documento formatado com cabeçalho, tabela detalhada e link de validação, utilizando as bibliotecas jsPDF e jspdf-autotable.