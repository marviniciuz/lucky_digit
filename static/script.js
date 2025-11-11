// Aguarda o DOM ser carregado para rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos da página
    const btnSortear = document.getElementById('btn-sortear');
    const inputQuantidade = document.getElementById('quantidade');
    const inputMin = document.getElementById('min');
    const inputMax = document.getElementById('max');
    const checkCountdown = document.getElementById('check-countdown');
    const statusMessage = document.getElementById('status-message');
    const resultadosContainer = document.getElementById('resultados-container');

    // Adiciona o "escutador" de evento de clique no botão
    btnSortear.addEventListener('click', iniciarProcesso);

    function iniciarProcesso() {
        // Desabilita o botão para evitar cliques múltiplos
        btnSortear.disabled = true;
        
        // Limpa resultados e mensagens anteriores
        resultadosContainer.innerHTML = '';
        statusMessage.textContent = '';
        statusMessage.style.color = '#ffc107'; // Cor de contagem/aviso

        // Verifica se a contagem regressiva está marcada
        if (checkCountdown.checked) {
            iniciarContagemRegressiva(5); // Inicia contagem de 5 segundos
        } else {
            realizarSorteio(); // Sorteia imediatamente
        }
    }

    // RECURSO 1: Contagem Regressiva
    function iniciarContagemRegressiva(segundos) {
        if (segundos > 0) {
            statusMessage.textContent = segundos;
            setTimeout(() => {
                iniciarContagemRegressiva(segundos - 1);
            }, 1000);
        } else {
            statusMessage.textContent = 'Sorteando...';
            realizarSorteio();
        }
    }

    // Função principal que chama a API Flask
    async function realizarSorteio() {
        // Pega os valores dos inputs
        const data = {
            quantidade: inputQuantidade.value,
            min: inputMin.value,
            max: inputMax.value
        };

        try {
            // Chama a API usando fetch (método POST)
            const response = await fetch('http://127.0.0.1:5000/sortear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Converte o objeto JS em JSON
            });

            // Converte a resposta da API para um objeto JS
            const resultado = await response.json();

            // Verifica se a resposta da API foi um erro (tratado no Flask)
            if (response.status !== 200 || resultado.error) {
                // Se foi um erro, exibe no status
                exibirErro(resultado.error || 'Ocorreu um erro desconhecido.');
            } else {
                // Se foi sucesso, exibe os números
                statusMessage.textContent = '';
                exibirResultados(resultado.numeros);
            }

        } catch (error) {
            // Captura erros de rede (ex: API desligada)
            exibirErro('Não foi possível conectar ao servidor de sorteio.');
            console.error('Erro no fetch:', error);
        } finally {
            // Reabilita o botão após o fim do processo
            btnSortear.disabled = false;
        }
    }

    // Função para exibir os números na tela
    function exibirResultados(numeros) {
        numeros.forEach(num => {
            // Cria o 'card' para o número
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numero-sorteado');
            
            // Armazena o número secretamente
            numeroDiv.dataset.numero = num;

            // RECURSO 2: Revelar ao clicar
            numeroDiv.addEventListener('click', () => {
                // Adiciona a classe 'revealed' que ativa a animação CSS
                numeroDiv.classList.add('revealed');
                // Coloca o número dentro do 'card'
                numeroDiv.textContent = num;
            }, { once: true }); // O evento só pode ser disparado uma vez

            // Adiciona o 'card' na tela
            resultadosContainer.appendChild(numeroDiv);
        });
    }

    // Função para exibir mensagens de erro
    function exibirErro(mensagem) {
        statusMessage.textContent = mensagem;
        statusMessage.style.color = '#dc3545'; // Cor vermelha para erro
        btnSortear.disabled = false;
    }
});