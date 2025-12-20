// Elementos do DOM
const billAmountInput = document.getElementById('billAmount');
const customTipInput = document.getElementById('customTip');
const numPeopleInput = document.getElementById('numPeople');
const tipButtons = document.querySelectorAll('.tip-btn');
const resetBtn = document.getElementById('resetBtn');

// Elementos de resultado
const tipAmountEl = document.getElementById('tipAmount');
const tipPerPersonEl = document.getElementById('tipPerPerson');
const totalAmountEl = document.getElementById('totalAmount');
const totalPerPersonEl = document.getElementById('totalPerPerson');

// Variável para armazenar a percentagem de gorjeta selecionada
let selectedTipPercent = 15;

// Event listeners para os botões de gorjeta
tipButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove a classe active de todos os botões
        tipButtons.forEach(b => b.classList.remove('active'));
        
        this.classList.add('active');
        
        // Atualiza a percentagem selecionada
        selectedTipPercent = parseFloat(this.dataset.tip);
        
        // Limpa o input personalizado
        customTipInput.value = '';
        
        calculateTip();
    });
});

// Event listener para gorjeta personalizada
customTipInput.addEventListener('input', function() {
    // Remove active de todos os botões
    tipButtons.forEach(b => b.classList.remove('active'));
    
    // Atualiza a percentagem
    selectedTipPercent = parseFloat(this.value) || 0;
    
    // Calcula
    calculateTip();
});

// Event listeners para recalcular quando os valores mudam
billAmountInput.addEventListener('input', calculateTip);
numPeopleInput.addEventListener('input', calculateTip);

// Função principal de cálculo
function calculateTip() {
    // Obter valores
    const billAmount = parseFloat(billAmountInput.value) || 0;
    const numPeople = parseInt(numPeopleInput.value) || 1;
    
    // Calcular gorjeta
    const tipAmount = billAmount * (selectedTipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    
    // Calcular por pessoa
    const tipPerPerson = tipAmount / numPeople;
    const totalPerPerson = totalAmount / numPeople;
    
    // Atualizar interface
    tipAmountEl.textContent = formatCurrency(tipAmount);
    tipPerPersonEl.textContent = formatCurrency(tipPerPerson);
    totalAmountEl.textContent = formatCurrency(totalAmount);
    totalPerPersonEl.textContent = formatCurrency(totalPerPerson);
}

// Função para formatar valores em moeda
function formatCurrency(value) {
    return value.toFixed(2) + ' AOA';
}

// Função de reset
resetBtn.addEventListener('click', function() {
    // Limpar inputs
    billAmountInput.value = '';
    customTipInput.value = '';
    numPeopleInput.value = '1';
    
    // Resetar para 15%
    selectedTipPercent = 15;
    
    // Reativar botão de 15%
    tipButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tip === '15') {
            btn.classList.add('active');
        }
    });
    
    // Resetar displays
    tipAmountEl.textContent = '0.00 AOA';
    tipPerPersonEl.textContent = '0.00 AOA';
    totalAmountEl.textContent = '0.00 AOA';
    totalPerPersonEl.textContent = '0.00 AOA';
});

// Calcular inicialmente
calculateTip();