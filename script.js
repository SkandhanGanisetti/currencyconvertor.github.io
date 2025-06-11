const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');

// Load currency list
async function loadCurrencies() {
  const res = await fetch('https://api.frankfurter.app/currencies');
  const data = await res.json();
  for (const code in data) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = code;
    option1.text = option2.text = `${code} - ${data[code]}`;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  }
  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

loadCurrencies();

// Convert currency
async function convert() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    result.innerText = 'Please select different currencies.';
    return;
  }

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  const data = await res.json();
  result.innerText = `${amount} ${from} = ${data.rates[to]} ${to}`;
}
