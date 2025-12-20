let selectedTip = 15;

        const tipBtns = document.querySelectorAll('.tip-btn');
        const customTipInput = document.getElementById('customTip');
        const poupeAmountInput = document.getElementById('poupeAmount');
        const resultBtn = document.querySelector('.result-btn');
        const resetBtn = document.getElementById('resetBtn');

        tipBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tipBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedTip = parseFloat(this.dataset.tip);
                customTipInput.value = '';
            });
        });

        customTipInput.addEventListener('input', function() {
            if (this.value) {
                tipBtns.forEach(b => b.classList.remove('active'));
                selectedTip = parseFloat(this.value) || 0;
            }
        });

        resultBtn.addEventListener('click', calculateSavings);

        function calculateSavings() {
            const amount = parseFloat(poupeAmountInput.value) || 0;
            
            if (amount <= 0) {
                alert('Por favor, insira um valor válido!');
                return;
            }

            const savingsPercentage = selectedTip;
            const savingsAmount = (amount * savingsPercentage) / 100;
            const monthlySavings = savingsAmount;
            const yearlyTotal = savingsAmount * 12;
            const monthlyTotal = amount - savingsAmount;

            document.getElementById('tipAmount').textContent = savingsAmount.toFixed(2) + ' AOA';
            document.getElementById('tipPerPerson').textContent = monthlySavings.toFixed(2) + ' AOA';
            document.getElementById('totalAmount').textContent = yearlyTotal.toFixed(2) + ' AOA';
            document.getElementById('totalPerPerson').textContent = monthlyTotal.toFixed(2) + ' AOA';
        }

        resetBtn.addEventListener('click', function() {
            poupeAmountInput.value = '';
            customTipInput.value = '';
            selectedTip = 15;
            
            tipBtns.forEach(b => b.classList.remove('active'));
            tipBtns[2].classList.add('active');
            
            document.getElementById('tipAmount').textContent = '0.00 AOA';
            document.getElementById('tipPerPerson').textContent = '0.00 AOA';
            document.getElementById('totalAmount').textContent = '0.00 AOA';
            document.getElementById('totalPerPerson').textContent = '0.00 AOA';
        });

        poupeAmountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateSavings();
            }
        });

        customTipInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateSavings();
            }
        });