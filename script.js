// 1. Mapeando os elementos do DOM
const formChamado = document.getElementById('form-chamado');
const inputSolicitante = document.getElementById('solicitante');
const inputDescricao = document.getElementById('descricao');
const selectPrioridade = document.getElementById('prioridade');

// 2. Nosso Estado Global
let chamados = [];
let filtroAtual = 'Todos'; // [NOVO] Aba inicial do filtro

// 3. Interceptando o envio do formulário
formChamado.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const novoChamado = {
        id: Date.now(),
        solicitante: inputSolicitante.value.trim(),
        descricao: inputDescricao.value.trim(),
        prioridade: selectPrioridade.value,
        status: 'Pendente',
        data: new Date().toLocaleDateString('pt-BR')
    };

    chamados.push(novoChamado);
    console.log("Chamado capturado com sucesso:", novoChamado);

    renderizarChamados();
    formChamado.reset();
});

// 4. Mapeando a lista
const listaChamados = document.getElementById('lista-chamados');

// 5. Função responsável por desenhar a interface
function renderizarChamados() {
    listaChamados.innerHTML = '';

    // [NOVO] Filtra o array antes de desenhar, baseado na aba escolhida
    let chamadosFiltrados = chamados;
    if (filtroAtual !== 'Todos') {
        chamadosFiltrados = chamados.filter(c => c.status === filtroAtual);
    }

    // Se a lista FILTRADA estiver vazia, mostra a mensagem
    if (chamadosFiltrados.length === 0) {
        listaChamados.innerHTML = `
            <div class="estado-vazio">
                <p>Nenhum chamado encontrado nesta categoria.</p>
            </div>
        `;
        return; 
    }

    // Percorre a lista FILTRADA para criar os cards
    chamadosFiltrados.forEach(function(chamado) {
        
        let classePrioridade = '';
        if (chamado.prioridade === 'Baixa') classePrioridade = 'badge-baixa';
        else if (chamado.prioridade === 'Média') classePrioridade = 'badge-media';
        else if (chamado.prioridade === 'Alta') classePrioridade = 'badge-alta';

        let botaoStatus = '';
        if (chamado.status !== 'Concluído') {
            botaoStatus = `<button class="btn-status" onclick="avancarStatus(${chamado.id})">Avançar Status ➔</button>`;
        }

        let botaoExcluir = `<button class="btn-excluir" onclick="excluirChamado(${chamado.id})">🗑️</button>`;

        const li = document.createElement('li');
        li.classList.add('card-chamado');
        
        li.innerHTML = `
            <div class="card-cabecalho">
                <span class="id-chamado">#${chamado.id}</span>
                <span class="data-chamado">${chamado.data}</span>
            </div>
            <h3 class="nome-solicitante">${chamado.solicitante}</h3>
            <p class="descricao-chamado">${chamado.descricao}</p>
            <div class="card-rodape">
                <span class="badge ${classePrioridade}">Prioridade: ${chamado.prioridade}</span>
                <span class="badge">Status: ${chamado.status}</span>
                ${botaoStatus}
                ${botaoExcluir}
            </div>
        `;

        listaChamados.appendChild(li);
    });
}

// 6. Função para avançar o status
function avancarStatus(idDoChamado) {
    const chamadoClicado = chamados.find(c => c.id === idDoChamado);

    if (chamadoClicado) {
        if (chamadoClicado.status === 'Pendente') {
            chamadoClicado.status = 'Em Progresso';
        } else if (chamadoClicado.status === 'Em Progresso') {
            chamadoClicado.status = 'Concluído';
        }
        renderizarChamados();
    }
}

// 7. Função para excluir
function excluirChamado(idDoChamado) {
    chamados = chamados.filter(chamado => chamado.id !== idDoChamado);
    renderizarChamados();
}

// 8. [NOVO] Função para mudar a aba do filtro
function filtrarChamados(status) {
    filtroAtual = status;

    // Atualiza o visual dos botões
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(botao => botao.classList.remove('ativo'));
    event.target.classList.add('ativo');

    // Manda desenhar a tela respeitando o filtro
    renderizarChamados();
}