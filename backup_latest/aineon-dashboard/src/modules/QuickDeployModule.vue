<template>
  <div class="module quick-deploy">
    <div class="module-header">
      <h3>íº€ Quick Deploy</h3>
      <div class="module-badge">3-Touch Setup</div>
    </div>
    
    <div class="module-content">
      <div class="deployment-flow">
        <div class="step" :class="{ active: currentStep === 1 }">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Connect Wallet</h4>
            <button @click="connectWallet" class="wallet-btn" v-if="!walletConnected">
              Connect MetaMask
            </button>
            <div v-else class="wallet-connected">
              âœ… {{ shortenedAddress }}
            </div>
          </div>
        </div>
        
        <div class="step" :class="{ active: currentStep === 2 }">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Enable AI Mode</h4>
            <label class="toggle">
              <input type="checkbox" v-model="aiEnabled" @change="nextStep">
              <span class="slider"></span>
            </label>
            <span class="toggle-label">AI Intelligence</span>
          </div>
        </div>
        
        <div class="step" :class="{ active: currentStep === 3 }">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Deploy Live</h4>
            <button @click="deployLive" class="deploy-btn" :disabled="!riskAccepted">
              íº€ DEPLOY $100M
            </button>
            <label class="risk-check">
              <input type="checkbox" v-model="riskAccepted">
              Accept risks & start trading
            </label>
          </div>
        </div>
      </div>
      
      <div v-if="deployed" class="deployment-success">
        <div class="success-icon">í¾‰</div>
        <h4>Live Trading Active!</h4>
        <div class="success-metrics">
          <div class="metric">
            <div class="value">$153,384</div>
            <div class="label">Daily Target</div>
          </div>
          <div class="metric">
            <div class="value">98.7%</div>
            <div class="label">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickDeployModule',
  data() {
    return {
      currentStep: 1,
      walletConnected: false,
      walletAddress: '',
      aiEnabled: false,
      riskAccepted: false,
      deployed: false
    }
  },
  computed: {
    shortenedAddress() {
      return this.walletAddress ? `${this.walletAddress.slice(0,6)}...${this.walletAddress.slice(-4)}` : ''
    }
  },
  methods: {
    connectWallet() {
      // Simulate wallet connection
      this.walletConnected = true
      this.walletAddress = '0x742d35Ab6631A5b9B1Bc1bA1A1a1a1a1a1a1a1A1b'
      this.nextStep()
    },
    nextStep() {
      if (this.currentStep < 3) this.currentStep++
    },
    deployLive() {
      this.deployed = true
      // Trigger deployment across all modules
      this.$emit('deployment-live', {
        wallet: this.walletAddress,
        aiEnabled: this.aiEnabled,
        timestamp: Date.now()
      })
    }
  }
}
</script>

<style scoped>
.quick-deploy {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.module-badge {
  background: var(--accent-color);
  color: black;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}

.module-content {
  padding: 20px;
}

.deployment-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  gap: 16px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step.active .step-number {
  border-color: var(--accent-color);
  background: var(--accent-color);
  color: black;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin-bottom: 8px;
  color: var(--text-primary);
}

.wallet-btn, .deploy-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-color);
  color: black;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.wallet-btn:hover, .deploy-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.deploy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 12px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-secondary);
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.toggle-label {
  vertical-align: super;
}

.risk-check {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 14px;
}

.deployment-success {
  text-align: center;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-top: 16px;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.success-metrics {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.metric {
  text-align: center;
}

.metric .value {
  font-size: 18px;
  font-weight: bold;
  color: var(--accent-color);
}

.metric .label {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
