const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchAndSaveQuotes() {
    try {
        const { data } = await axios.get('https://www.pensador.com/citacoes/');
        const $ = cheerio.load(data);
        const quotes = [];

        $('.thought-card').each((index, element) => {
            const quote = $(element).find('.frase').text().trim();
            const author = $(element).find('.autor').text().trim();
            quotes.push({ quote, author });
        });

        fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2));
        console.log('Citações salvas com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar citações:', error);
    }
}

fetchAndSaveQuotes();