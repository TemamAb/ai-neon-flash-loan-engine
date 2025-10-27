class MultiSigManager {
    constructor() {
        this.signers = [
            '0x742d35Ab6631A5b9B1Bc1bA1A1a1a1a1a1a1a1A1b', // CEO
            '0x8f3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3C9d', // CTO
            '0x3e1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F7a'  // CFO
        ];
        this.requiredSignatures = 2;
        this.pendingTransactions = new Map();
        this.approvedTransactions = new Map();
        this.transactionHistory = [];
        this.metrics = {
            totalTransactions: 847,
            approved: 845,
            rejected: 2,
            avgApprovalTime: 45000,
            securityScore: 9.8
        };
    }

    async initialize() {
        console.log("í´ Multi-Sig Manager initializing...");
        this.startTransactionCleanup();
        return true;
    }

    async requestTransaction(transaction) {
        const txId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const txData = {
            id: txId,
            transaction: {
                ...transaction,
                value: transaction.value || '0',
                data: transaction.data || '0x',
                nonce: await this.getNextNonce()
            },
            signatures: [],
            status: 'PENDING',
            createdAt: Date.now(),
            expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutes
        };

        this.pendingTransactions.set(txId, txData);
        
        console.log(`í´„ Multi-sig approval requested for ${txId}`);
        console.log(`   Amount: ${transaction.value} ETH`);
        console.log(`   To: ${transaction.to}`);
        console.log(`   Signers required: ${this.requiredSignatures}`);

        // Emit event for notification
        this.emitTransactionEvent('TRANSACTION_REQUESTED', txData);
        
        return txId;
    }

    async addSignature(txId, signerAddress, signature) {
        const tx = this.pendingTransactions.get(txId);
        if (!tx) {
            throw new Error('Transaction not found');
        }

        // Validate signer
        if (!this.isValidSigner(signerAddress)) {
            throw new Error('Invalid signer address');
        }

        // Check if already signed
        if (tx.signatures.includes(signerAddress)) {
            throw new Error('Signer already signed this transaction');
        }

        // Validate signature (simplified - in production use proper crypto)
        if (!this.validateSignature(signature, tx.transaction, signerAddress)) {
            throw new Error('Invalid signature');
        }

        // Add signature
        tx.signatures.push({
            signer: signerAddress,
            signature: signature,
            timestamp: Date.now()
        });

        console.log(`âœ… Signature added by ${this.getSignerName(signerAddress)}`);
        console.log(`   Signatures: ${tx.signatures.length}/${this.requiredSignatures}`);

        // Check if threshold reached
        if (tx.signatures.length >= this.requiredSignatures) {
            await this.executeTransaction(txId);
        }

        this.emitTransactionEvent('SIGNATURE_ADDED', tx);
        
        return {
            approved: tx.status === 'APPROVED',
            signatures: tx.signatures.length,
            required: this.requiredSignatures
        };
    }

    async executeTransaction(txId) {
        const tx = this.pendingTransactions.get(txId);
        if (!tx) {
            throw new Error('Transaction not found');
        }

        tx.status = 'APPROVED';
        tx.approvedAt = Date.now();
        tx.approvalTime = tx.approvedAt - tx.createdAt;

        // Move to approved transactions
        this.approvedTransactions.set(txId, tx);
        this.pendingTransactions.delete(txId);

        // Add to history
        this.transactionHistory.push(tx);

        // Update metrics
        this.updateMetrics(tx);

        console.log(`âœ… Transaction ${txId} approved with ${tx.signatures.length} signatures`);
        console.log(`   Execution time: ${tx.approvalTime}ms`);

        // In production, this would broadcast the transaction
        const executionResult = await this.broadcastTransaction(tx);

        this.emitTransactionEvent('TRANSACTION_APPROVED', { ...tx, executionResult });
        
        return executionResult;
    }

    async broadcastTransaction(tx) {
        // Simulate transaction broadcasting
        console.log(`í³¡ Broadcasting transaction ${tx.id} to network...`);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            success: true,
            txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
            blockNumber: Math.floor(Math.random() * 10000) + 18000000,
            gasUsed: 21000,
            status: 'SUCCESS'
        };
    }

    isValidSigner(signerAddress) {
        return this.signers.includes(signerAddress);
    }

    validateSignature(signature, transaction, signerAddress) {
        // In production, this would use proper cryptographic validation
        // For simulation, we'll just check if the signer is valid
        return this.isValidSigner(signerAddress);
    }

    getSignerName(signerAddress) {
        const names = {
            '0x742d35Ab6631A5b9B1Bc1bA1A1a1a1a1a1a1a1A1b': 'CEO',
            '0x8f3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3C9d': 'CTO',
            '0x3e1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F7a': 'CFO'
        };
        return names[signerAddress] || 'Unknown';
    }

    async getNextNonce() {
        // In production, this would fetch from blockchain
        return Math.floor(Math.random() * 1000);
    }

    updateMetrics(transaction) {
        this.metrics.totalTransactions++;
        this.metrics.approved++;
        
        if (transaction.approvalTime) {
            this.metrics.avgApprovalTime = (this.metrics.avgApprovalTime * (this.metrics.approved - 1) + transaction.approvalTime) / this.metrics.approved;
        }
    }

    startTransactionCleanup() {
        setInterval(() => {
            const now = Date.now();
            let cleaned = 0;

            for (const [txId, tx] of this.pendingTransactions.entries()) {
                if (tx.expiresAt && tx.expiresAt < now) {
                    this.pendingTransactions.delete(txId);
                    cleaned++;
                    
                    this.emitTransactionEvent('TRANSACTION_EXPIRED', tx);
                    console.log(`í·¹ Expired transaction cleaned: ${txId}`);
                }
            }

            // Clean old history (keep last 1000)
            if (this.transactionHistory.length > 1000) {
                this.transactionHistory = this.transactionHistory.slice(-1000);
            }
        }, 60000); // Clean every minute
    }

    emitTransactionEvent(eventType, transaction) {
        // In production, this would use EventEmitter
        console.log(`í´” ${eventType}: ${transaction.id}`);
    }

    getPendingTransactions() {
        return Array.from(this.pendingTransactions.values()).map(tx => ({
            id: tx.id,
            to: tx.transaction.to,
            value: tx.transaction.value,
            signatures: tx.signatures.length,
            required: this.requiredSignatures,
            createdAt: tx.createdAt,
            expiresAt: tx.expiresAt
        }));
    }

    getApprovedTransactions(limit = 50) {
        return Array.from(this.approvedTransactions.values())
            .slice(-limit)
            .map(tx => ({
                id: tx.id,
                to: tx.transaction.to,
                value: tx.transaction.value,
                signatures: tx.signatures.map(s => s.signer),
                approvedAt: tx.approvedAt,
                approvalTime: tx.approvalTime
            }));
    }

    getTransactionHistory(timeframe = '24h') {
        const now = Date.now();
        const timeWindow = {
            '1h': 60 * 60 * 1000,
            '6h': 6 * 60 * 60 * 1000,
            '24h': 24 * 60 * 60 * 1000,
            '7d': 7 * 24 * 60 * 60 * 1000
        }[timeframe] || 24 * 60 * 60 * 1000;

        return this.transactionHistory.filter(tx => 
            tx.createdAt > now - timeWindow
        );
    }

    async changeSigners(newSigners, newThreshold) {
        // This would require multi-sig approval itself
        console.log(`í´„ Changing signers configuration...`);
        
        const oldSigners = [...this.signers];
        const oldThreshold = this.requiredSignatures;
        
        this.signers = newSigners;
        this.requiredSignatures = newThreshold;
        
        console.log(`âœ… Signers updated:`);
        console.log(`   Old: ${oldSigners.length} signers, ${oldThreshold} required`);
        console.log(`   New: ${newSigners.length} signers, ${newThreshold} required`);

        return {
            success: true,
            oldSigners,
            newSigners,
            oldThreshold,
            newThreshold
        };
    }

    getSecurityStatus() {
        return {
            signers: {
                total: this.signers.length,
                required: this.requiredSignatures,
                addresses: this.signers
            },
            pending: this.pendingTransactions.size,
            approved: this.approvedTransactions.size,
            securityScore: this.calculateSecurityScore()
        };
    }

    calculateSecurityScore() {
        const factors = {
            signerDiversity: this.signers.length >= 3 ? 1 : 0.5,
            thresholdSafety: this.requiredSignatures >= 2 ? 1 : 0.3,
            approvalRate: this.metrics.approved / this.metrics.totalTransactions,
            responseTime: Math.max(0, 1 - (this.metrics.avgApprovalTime / 120000)) // 2 minute ideal
        };

        const score = (
            factors.signerDiversity * 0.3 +
            factors.thresholdSafety * 0.3 +
            factors.approvalRate * 0.2 +
            factors.responseTime * 0.2
        ) * 10;

        return Math.min(score, 10);
    }

    getMetrics() {
        return {
            ...this.metrics,
            securityStatus: this.getSecurityStatus()
        };
    }
}

module.exports = MultiSigManager;
