class CapitalAllocator {
    constructor() {
        this.capacity = {
            total: 100000000,
            deployed: 68000000,
            available: 32000000,
            providers: {
                aave: { allocated: 35000000, max: 35000000 },
                dydx: { allocated: 25000000, max: 25000000 },
                uniswap: { allocated: 5000000, max: 5000000 },
                compound: { allocated: 3000000, max: 3000000 }
            }
        };
    }
    allocate(amount, strategy) {
        if (amount > this.capacity.available) {
            throw new Error(`Insufficient capacity. Available: $${this.capacity.available}`);
        }
        this.capacity.deployed += amount;
        this.capacity.available -= amount;
        return { allocated: amount, remaining: this.capacity.available };
    }
    getCapacity() { return this.capacity; }
}
module.exports = CapitalAllocator;
