const history = [];

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');

    if (!amount || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }

    resultDiv.textContent = 'Converting...';

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultDiv.textContent = 'Error fetching conversion rates. Please try again later.';
    }
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

function saveConversion() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const result = document.getElementById('result').textContent;

    if (result && !result.startsWith('Error')) {
        const entry = `${amount} ${fromCurrency} to ${toCurrency}: ${result.split('=')[1].trim()}`;
        history.push(entry);
        updateHistory();
    }
}

function updateHistory() {
    const historyDiv = document.getElementById('conversion-history');
    historyDiv.innerHTML = '<h3>Conversion History:</h3>';
    history.forEach((item, index) => {
        historyDiv.innerHTML += `<div>${index + 1}. ${item}</div>`;
    });
}

document.getElementById('amount').addEventListener('input', () => {
    document.getElementById('result').textContent = '';
});

document.getElementById('from-currency').addEventListener('change', () => {
    document.getElementById('result').textContent = '';
});

document.getElementById('to-currency').addEventListener('change', () => {
    document.getElementById('result').textContent = '';
});