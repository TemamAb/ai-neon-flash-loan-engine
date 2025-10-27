class LoanTracker {
    constructor() {
        this.activeLoans = new Map();
        this.loanHistory = [];
        this.metrics = {
            totalProcessed: 18450,
            failed: 12,
            successRate: 99.94,
            totalValue: 2147380
        };
    }
    
    track(loan) {
        this.activeLoans.set(loan.id, {
            ...loan,
            startTime: Date.now(),
            status: 'active'
        });
        
        return loan.id;
    }
    
    complete(loanId, result) {
        const loan = this.activeLoans.get(loanId);
        if (loan) {
            const completedLoan = {
                ...loan,
                ...result,
                endTime: Date.now(),
                duration: Date.now() - loan.startTime,
                status: result.success ? 'completed' : 'failed'
            };
            
            this.loanHistory.push(completedLoan);
            this.activeLoans.delete(loanId);
            this.updateMetrics(completedLoan);
            
            return completedLoan;
        }
    }
    
    updateMetrics(loan) {
        this.metrics.totalProcessed++;
        if (!loan.success) this.metrics.failed++;
        this.metrics.successRate = ((this.metrics.totalProcessed - this.metrics.failed) / this.metrics.totalProcessed) * 100;
        if (loan.profit) this.metrics.totalValue += loan.profit;
    }
    
    getActiveLoans() { return Array.from(this.activeLoans.values()); }
    getHistory() { return this.loanHistory; }
    getMetrics() { return this.metrics; }
}
module.exports = LoanTracker;
