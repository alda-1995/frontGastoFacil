const formatAmount = function(amount) {
    amount = parseFloat(amount).toFixed(2);
    return Number(amount).toLocaleString('en');
}

export default formatAmount;