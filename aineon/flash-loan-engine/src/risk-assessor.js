class RiskAssessor {
    constructor() {
        this.riskParams = {
            maxPositionSize: 500000,
            maxSlippage: 0.005,
            maxDailyLoss: 50000,
            minProfitThreshold: 1000,
            riskScoreThreshold: 7.0
        };
    }
    
    assess(opportunity) {
        const riskScore = this.calculateRiskScore(opportunity);
        const approved = riskScore >= this.riskParams.riskScoreThreshold;
        
        return {
            approved,
            riskScore,
            maxAmount: this.calculateMaxAmount(opportunity),
            reasons: approved ? [] : ['Risk score too low']
        };
    }
    
    calculateRiskScore(opportunity) {
        const factors = {
            liquidity: opportunity.liquidity > 1000000 ? 1 : 0.5,
            volatility: opportunity.volatility < 0.1 ? 1 : 0.3,
            history: opportunity.successRate > 0.95 ? 1 : 0.6
        };
        
        return (factors.liquidity + factors.volatility + factors.history) * 3.33;
    }
    
    calculateMaxAmount(opportunity) {
        return Math.min(
            this.riskParams.maxPositionSize,
            opportunity.availableLiquidity * 0.1
        );
    }
}
module.exports = RiskAssessor;
