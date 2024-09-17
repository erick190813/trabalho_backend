const buscar = document.getElementById('buscar');
const listarPtable = document.getElementById("listarProdutos");

buscar.onkeyup = async function() {
    let searchTerm = buscar.value.toLowerCase();

    try {
        // Faz a requisição para a API para obter a lista de produtos
        const response = await fetch('/api/paginas');
        const produtos = await response.json();

        // Filtra os produtos com base no termo de busca
        const filteredProdutos = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(searchTerm)
        );

        // Atualiza a lista de produtos exibida
        listarProdutos(filteredProdutos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
};

// Função para listar produtos no DOM
const listarProdutos = (produtos) => {
    listarPtable.innerHTML = '';

    produtos.forEach(produto => {
        let col = document.createElement('div');
        col.classList.add('col');

        let card = document.createElement('div');
        card.classList.add('card', 'h-100');
        col.appendChild(card);

        let img = document.createElement('img');
        img.src = produto.img_produto;
        img.classList.add('card-img-top');
        img.alt = produto.nome;
        card.appendChild(img);

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        let h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = produto.nome;
        cardBody.appendChild(h5);

        let valor = document.createElement('p');
        valor.classList.add('card-text');
        valor.innerHTML = `<strong>Valor:</strong> R$ ${produto.valor}`;
        cardBody.appendChild(valor);

        let fab = document.createElement('p');
        fab.classList.add('card-text');
        fab.innerHTML = `<strong>Fabricante:</strong> ${produto.fabricante}`;
        cardBody.appendChild(fab);

        let qtde = document.createElement('p');
        qtde.classList.add('card-text');
        qtde.innerHTML = `<strong>Quantidade:</strong> ${produto.quantidade}`;
        cardBody.appendChild(qtde);

        let cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');
        card.appendChild(cardFooter);

        let ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating');
        for (let i = 1; i <= 5; i++) {
            let star = document.createElement('i');
            star.classList.add('fa', 'fa-star');
            star.setAttribute('data-value', i);
            ratingDiv.appendChild(star);
        }
        cardFooter.appendChild(ratingDiv);

        listarPtable.appendChild(col);
    });

    // Adiciona o comportamento de seleção das estrelas
    const stars = document.querySelectorAll('.rating .fa-star');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedValue = parseInt(star.getAttribute('data-value'));

            stars.forEach(star => {
                const starValue = parseInt(star.getAttribute('data-value'));
                if (starValue <= selectedValue) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        });
    });
};

// Inicialmente, carrega todos os produtos
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/paginas');
        const produtos = await response.json();
        listarProdutos(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
});


// Aqui, você pode enviar a avaliação para o servidor, se necessário
// enviarAvaliacao(produto.id, selectedValue);
// Exemplo de função para enviar a avaliação para o servidor (não implementada)
// const enviarAvaliacao = async (id, valor) => {
//     try {
//         const response = await fetch(`/api/avaliacoes`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ produtoId: id, avaliacao: valor })
//         });
//         if (!response.ok) {
//             console.error('Erro ao enviar avaliação');
//         }
//     } catch (error) {
//         console.error('Erro de rede:', error);
//     }
// };
