import {isBetterProfit} from "../isBetterProfit";
import {MaxProfitOutput} from "../maxprofilt.types";

describe('isBetterProfit', () => {
    it('return true if previous best choice is undefined', () => {
        const prevBestChoice: MaxProfitOutput | undefined = undefined
        const result = isBetterProfit(100, prevBestChoice)
        expect(result).toBe(true)
    })

    it('return true if previous profit is lower', () => {
        const prevBestChoice: MaxProfitOutput = {profit: 10, buyPrice: 1, sellPrice: 11, sellTime: 10, buyTime: 1}
        const result = isBetterProfit(100, prevBestChoice)
        expect(result).toBe(true)
    })

    it('return false if previous profit is higher', () => {
        const prevBestChoice: MaxProfitOutput = {profit: 10, buyPrice: 1, sellPrice: 11, sellTime: 10, buyTime: 1}
        const result = isBetterProfit(4, prevBestChoice)
        expect(result).toBe(false)
    })

    it('return false if previous profit is the same', () => {
        const prevBestChoice: MaxProfitOutput = {profit: 10, buyPrice: 1, sellPrice: 11, sellTime: 10, buyTime: 1}
        const result = isBetterProfit(10, prevBestChoice)
        expect(result).toBe(false)
    })

})
