document.addEventListener('DOMContentLoaded', () => {
    fetch('quotes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ao tentar carregar o arquivo JSON');
            }
            return response.text(); // Use text() para inspecionar o conteúdo bruto
        })
        .then(text => {
            console.log('Resposta bruta:', text); // Log da resposta bruta
            return JSON.parse(text); // Converta manualmente para JSON
        })
        .then(quotes => {
            document.getElementById('new-quote').addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                document.getElementById('quote').textContent = `${randomQuote.quote} - ${randomQuote.author}`;
            });
        })
        .catch(error => console.error('Erro ao carregar citações:', error));
});