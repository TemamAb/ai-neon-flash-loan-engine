class OpportunityScorer {
    constructor() {
        this.scoringWeights = {
            profitMargin: 0.35,
            successProbability: 0.25,
            liquidity: 0.20,
            speed: 0.15,
            risk: 0.05
        };
    }
    
    score(opportunity) {
        const scores = {
            profitMargin: this.scoreProfitMargin(opportunity.estimatedProfit, opportunity.amount),
            successProbability: opportunity.historicalSuccessRate,
            liquidity: this.scoreLiquidity(opportunity.availableLiquidity),
            speed: this.scoreSpeed(opportunity.estimatedDuration),
            risk: this.scoreRisk(opportunity.riskFactors)
        };
        
        const totalScore = Object.keys(scores).reduce((sum, key) => {
            return sum + (scores[key] * this.scoringWeights[key]);
        }, 0);
        
        return {
            totalScore: Math.min(totalScore * 10, 10),
            breakdown: scores,
            grade: this.getGrade(totalScore),
            recommendation: totalScore > 7 ? 'HIGH_PRIORITY' : totalScore > 5 ? 'MEDIUM_PRIORITY' : 'LOW_PRIORITY'
        };
    }
    
    scoreProfitMargin(profit, amount) {
        const roi = (profit / amount) * 100;
        return Math.min(roi / 5, 1);
    }
    
    scoreLiquidity(liquidity) {
        return Math.min(liquidity / 5000000, 1);
    }
    
    scoreSpeed(duration) {
        return duration < 1000 ? 1 : duration < 5000 ? 0.7 : 0.3;
    }
    
    scoreRisk(riskFactors) {
        return Math.max(0, 1 - (riskFactors.length * 0.2));
    }
    
    getGrade(score) {
        if (score >= 0.8) return 'A';
        if (score >= 0.6) return 'B';
        if (score >= 0.4) return 'C';
        return 'D';
    }
}
module.exports = OpportunityScorer;
