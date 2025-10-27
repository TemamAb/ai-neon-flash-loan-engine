const crypto = require('crypto');

class RequestSigner {
    constructor() {
        this.privateKey = process.env.SIGNING_PRIVATE_KEY;
        this.signatureTTL = 300000; // 5 minutes
    }
    
    signRequest(request) {
        const timestamp = Date.now();
        const nonce = crypto.randomBytes(16).toString('hex');
        
        const payload = {
            ...request,
            timestamp,
            nonce
        };
        
        const signature = this.generateSignature(payload);
        
        return {
            ...payload,
            signature,
            expires: timestamp + this.signatureTTL
        };
    }
    
    verifyRequest(signedRequest) {
        // Check expiration
        if (Date.now() > signedRequest.expires) {
            throw new Error('Request signature expired');
        }
        
        // Verify signature
        const { signature, ...requestData } = signedRequest;
        const expectedSignature = this.generateSignature(requestData);
        
        if (signature !== expectedSignature) {
            throw new Error('Invalid request signature');
        }
        
        // Check for replay attacks
        if (this.isReplayAttack(signedRequest.nonce, signedRequest.timestamp)) {
            throw new Error('Possible replay attack detected');
        }
        
        return true;
    }
    
    generateSignature(payload) {
        const data = JSON.stringify(payload);
        return crypto
            .createHmac('sha256', this.privateKey)
            .update(data)
            .digest('hex');
    }
    
    isReplayAttack(nonce, timestamp) {
        // In production, store used nonces and check against them
        // For now, simple timestamp check
        return Date.now() - timestamp > this.signatureTTL;
    }
    
    signTransaction(txData) {
        const signedRequest = this.signRequest({
            type: 'transaction',
            data: txData,
            network: txData.network || 'mainnet'
        });
        
        return {
            ...txData,
            signature: signedRequest.signature,
            signedAt: signedRequest.timestamp
        };
    }
}
module.exports = RequestSigner;
