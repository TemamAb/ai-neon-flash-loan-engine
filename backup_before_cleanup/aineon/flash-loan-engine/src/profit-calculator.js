class ProfitCalculator {
    calculate(transaction) {
        const gasCost = transaction.gasUsed * transaction.gasPrice;
        const grossProfit = transaction.outputAmount - transaction.inputAmount;
        const netProfit = grossProfit - gasCost;
        const roi = (netProfit / transaction.inputAmount) * 100;
        
        return {
            grossProfit,
            netProfit,
            roi: roi.toFixed(2) + '%',
            gasCost,
            efficiency: ((netProfit / grossProfit) * 100).toFixed(1) + '%'
        };
    }
    
    calculatePortfolio(transactions) {
        const totalProfit = transactions.reduce((sum, tx) => sum + tx.netProfit, 0);
        const totalVolume = transactions.reduce((sum, tx) => sum + tx.inputAmount, 0);
        const avgROI = (totalProfit / totalVolume) * 100;
        
        return {
            totalProfit,
            totalVolume,
            avgROI: avgROI.toFixed(2) + '%',
            totalTransactions: transactions.length,
            dailyProfit: totalProfit * 365
        };
    }
}
module.exports = ProfitCalculator;
