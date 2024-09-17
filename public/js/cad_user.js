
    const contato = document.getElementById('contato');

    let login = document.getElementById('nome');
    let senha = document.getElementById('senha');
    let tel = document.getElementById('fone');

    contato.addEventListener('submit', async (e) => {
        e.preventDefault();

        
        carregarCad = {
            login: login.value,
            senha: senha.value,
            fone: tel.value
        }



        try {
            const response = await fetch('api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carregarCad),
            });

alert(response.status);
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = '/admin'; 
            } else {
                const errorData = await response.json();
                console.error('Erro:', errorData);
                alert('Ocorreu um erro ao cadastrar. Verifique o console para mais detalhes.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Ocorreu um erro ao se conectar ao servidor.');
        }
    });

