import {canAfford} from "../canAfford";

describe('maxProfit', () => {
    it('should return true if buyPrice is within priceLimit', () => {
        const result = canAfford(100, 1000)
        expect(result).toBe(true)
    })

    it('should return true if priceLimit is not set, regardless of buyPrice', () => {
        const result = canAfford(1000, undefined)
        expect(result).toBe(true)
    })

    it('should return false if priceLimit < buyPrice', () => {
        const result = canAfford(1000, 100)
        expect(result).toBe(false)
    })

})
