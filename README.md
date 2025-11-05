Sistema de Gestão de Quórum e Frequência

🎯 Objetivo do Projeto

Este projeto é uma solução web desenvolvida para gerenciar em tempo real a presença (frequência) e o quórum de reuniões, assembleias, ou eventos que exigem um controle rigoroso de participação. Ele oferece uma interface de registro simples para o participante e um dashboard administrativo poderoso para o controle da sessão e exportação de dados.

💻 Tecnologias Utilizadas

Frontend: HTML5, JavaScript (Módulos ES6), Tailwind CSS (para estilização responsiva e moderna).

Backend & Database: Google Firebase / Firestore (utilizado para armazenamento de dados em tempo real e controle transacional).

Bibliotecas: Chart.js (para visualização do Quórum) e jsPDF/autotable (para exportação de PDF).


✨ Funcionalidades Principais

O sistema é dividido em quatro áreas principais de acesso a partir do menu inicial:

1. Registro (Presença)

Formulário Simples: Coleta Nome, CPF, Instituição, Setor e Representação.

Anti-Duplicidade: O sistema impede que o mesmo CPF seja registrado mais de uma vez na mesma reunião, garantindo a integridade dos dados.

Código de Validação: A cada registro bem-sucedido, um código de 6 dígitos é gerado e exibido para que o participante possa comprovar sua presença posteriormente.

Controle de Estado: O registro só é permitido se o administrador tiver iniciado a reunião (estado "ABERTA").


2. Quórum

Visualização em Tempo Real: Exibe o número total de participantes presentes.

Gráficos de Distribuição: Apresenta gráficos de pizza e rosca mostrando a distribuição dos participantes por Setor e por Representação (Titular/Suplente).


3. Validação

Permite que qualquer pessoa insira o Código de Validação único (fornecido no registro) para verificar a autenticidade e os detalhes do registro (Nome, Instituição, Reunião).


4. Dashboard de Administração (Acesso Restrito)

Controle de Reunião: Botões dedicados para INICIAR NOVA REUNIÃO (abrindo o registro) e FINALIZAR REUNIÃO (fechando o registro).

Registros Detalhados: Tabela completa e em tempo real de todos os participantes da reunião atual.

Exportação de Dados:

Download CSV: Exporta todos os dados brutos para planilhas.

Download PDF: Gera um relatório formatado e pronto para impressão da lista de frequência.


 Configuração e Administração

1. Senha de Administrador

O acesso à área administrativa está protegido por uma senha, definida no código-fonte:



2. Estrutura de Dados (Firebase Firestore)

O sistema utiliza duas coleções públicas principais, garantindo que os dados sejam centralizados para o aplicativo em execução:

Coleção

Propósito

Caminho de Exemplo

Registros

Armazena todos os dados de frequência.

artifacts/<appId>/public/data/meeting_registrations

Estado da Reunião

Documento único que armazena o status atual (isActive, meetingId, meetingName).

artifacts/<appId>/public/data/meeting_state/current_meeting

Para iniciar, acesse o menu Admin, insira a senha padrão e clique em INICIAR NOVA REUNIÃO.