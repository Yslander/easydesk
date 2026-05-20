// 1. Mapeando os elementos do DOM (Trazendo o HTML para o JavaScript)
const formChamado = document.getElementById('form-chamado');
const inputSolicitante = document.getElementById('solicitante');
const inputDescricao = document.getElementById('descricao');
const selectPrioridade = document.getElementById('prioridade');

// 2. Nosso Estado Global (O Array que vai guardar todos os chamados)
let chamados = [];

// 3. Interceptando o envio do formulário
formChamado.addEventListener('submit', function(evento) {
    // Impede o navegador de recarregar a página (comportamento padrão)
    evento.preventDefault();

    // 4. Criando o objeto do chamado com os dados digitados
    const novoChamado = {
        id: Date.now(), // Gera um número único baseado nos milissegundos atuais
        solicitante: inputSolicitante.value.trim(),
        descricao: inputDescricao.value.trim(),
        prioridade: selectPrioridade.value,
        status: 'Pendente', // Todo chamado novo nasce como "Pendente"
        data: new Date().toLocaleDateString('pt-BR') // Salva a data de hoje (DD/MM/AAAA)
    };

    // 5. Adicionando o novo chamado dentro do nosso array
    chamados.push(novoChamado);

    // 6. Imprimindo no Console para testarmos a captura
    console.log("Chamado capturado com sucesso:", novoChamado);
    console.log("Todos os chamados no sistema:", chamados);

    // 7. Redesenha a lista na tela com o novo chamado
    renderizarChamados();

    // 8. Limpando os campos do formulário para o próximo registro
    formChamado.reset();
});

// 9. Mapeando a lista (ul) onde os chamados vão aparecer
const listaChamados = document.getElementById('lista-chamados');

// 10. Função responsável por desenhar a interface
function renderizarChamados() {
    // A) Limpa a lista antes de desenhar para não duplicar o que já está lá
    listaChamados.innerHTML = '';

    // B) Se não houver chamados, mostra a mensagem vazia
    if (chamados.length === 0) {
        listaChamados.innerHTML = `
            <div class="estado-vazio">
                <p>Nenhum chamado registrado no momento.</p>
            </div>
        `;
        return; // Interrompe a função aqui
    }

    // C) Percorre o array e cria um card HTML para cada chamado
    chamados.forEach(function(chamado) {
        
        // [NOVO] Lógica de sinalização visual: Qual é a cor da prioridade?
        let classePrioridade = '';
        if (chamado.prioridade === 'Baixa') {
            classePrioridade = 'badge-baixa';
        } else if (chamado.prioridade === 'Média') {
            classePrioridade = 'badge-media';
        } else if (chamado.prioridade === 'Alta') {
            classePrioridade = 'badge-alta';
        }

        const li = document.createElement('li');
        li.classList.add('card-chamado');
        
        // Preenche o conteúdo injetando a classe de cor dinâmica na tag <span>
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
            </div>
        `;

        // Injeta esse novo <li> dentro da nossa <ul> na tela
        listaChamados.appendChild(li);
    });
}