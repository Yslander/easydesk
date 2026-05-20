# 🖥️ EasyDesk - Fluxo de Suporte Inteligente

O **EasyDesk** é uma Single Page Application (SPA) responsiva voltada para o gerenciamento de chamados técnicos (Help Desk). Desenvolvido do zero, o sistema permite que usuários registrem problemas, enquanto técnicos podem gerenciar o ciclo de vida de cada chamado (Pendente ➔ Em Progresso ➔ Concluído) e filtrar demandas em tempo real.

O projeto foi construído para demonstrar o domínio sobre controle de estado, manipulação avançada de DOM e persistência de dados no navegador, eliminando a dependência de frameworks externos ou recarregamentos de página.

---

## 🚀 Links do Projeto

* 🔗 **Aplicação Online:** [Acessar o EasyDesk](https://yslander.github.io/easydesk/)
* 📋 **Quadro Kanban (Sprints):** [Acompanhamento do Desenvolvimento](https://github.com/users/Yslander/projects/2/views/1)
---

## 📑 Índice
1. [Funcionalidades Principais](#-funcionalidades-principais)
2. [Arquitetura e Conceitos Técnicos](#-arquitetura-e-conceitos-técnicos)
3. [Como Utilizar](#-como-utilizar)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)

---

## 🎯 Funcionalidades Principais

* **Captura Valida:** Formulário de registro exigindo nome, descrição e nível de prioridade, com geração automática de um ID único e carimbo de data.
* **Renderização Dinâmica:** Injeção de cards de chamados na interface em tempo real utilizando JavaScript.
* **Sinalização Visual de Estados:** O sistema altera dinamicamente a interface com base nos dados lógicos (ex: cores diferentes para prioridades Baixa, Média e Alta).
* **Gestão do Ciclo de Vida:** Botões interativos que permitem avançar o status da tarefa através do fluxo de trabalho e lixeira para exclusão.
* **Motor de Busca Reativo:** Filtros em tempo real (Todos, Pendentes, Em Progresso, Concluídos) que reconstroem a visualização da tela instantaneamente.
* **Persistência Local Permanente:** Integração completa com a API nativa do `LocalStorage`, convertendo objetos em JSON para garantir que os dados sobrevivam ao fechamento da aba.

---

## 🧠 Arquitetura e Conceitos Técnicos

O desenvolvimento foi segmentado em Sprints ágeis focados em robustez:
1.  **Imutabilidade e Paradigma Funcional:** O sistema evita laços de repetição imperativos em favor de High-Order Array Methods como `.filter()` para exclusão lógica e filtragem de visualização, e `.forEach()` para iterações de renderização.
2.  **Separação de Responsabilidades (SoC):** Lógica de estado e marcação visual operam separadamente. A interface reage exclusivamente às mudanças no Array principal (`chamados`), funcionando como uma verdadeira "fonte da verdade".
3.  **Higienização de Entradas:** Uso do método `.trim()` para sanitizar espaços vazios não intencionais no momento do cadastro.

---

## 📖 Como Utilizar

1. **Abrir um Chamado:** Preencha os dados no painel lateral esquerdo (ou superior, em dispositivos móveis) e clique em Registrar. O card aparecerá imediatamente na lista com o status "Pendente".
2. **Avançar Status:** No card do chamado, clique no botão escuro "Avançar Status". A cada clique, o chamado evolui no ciclo de trabalho. Ao atingir "Concluído", a ação é bloqueada.
3. **Filtrar Demandas:** Utilize os botões de navegação no topo do histórico ("Pendentes", "Em Progresso") para visualizar apenas os chamados daquela categoria.
4. **Exclusão:** Caso um chamado tenha sido inserido por engano, clique no ícone da lixeira vermelha para apagá-lo definitivamente do sistema.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Semântica estrita estrutural.
* **CSS3:** Layouts fluídos e responsivos usando `Grid Layout` (painéis) e `Flexbox` (cards e filtros).
* **JavaScript (ES6+):** Lógica algorítmica, High-Order Array Methods e manipulação assíncrona do DOM.
* **API LocalStorage:** Persistência serverless baseada em `JSON.stringify` e `JSON.parse`.

---
Desenvolvido com foco em lógica algorítmica e experiência do usuário por **Yslander**. 🚀