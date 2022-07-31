import {maxProfit} from "../maxprofit.service";

describe('maxProfit', () => {
    it('should return 1 for simple case [1,2] without price limit', async () => {
        const expected = {buyTime: 0, buyPrice: 1, sellTime: 1, sellPrice: 2, profit: 1}
        const bestChoice = await maxProfit({start: 0, end: 1})
        expect(bestChoice).toEqual(expected)
    })
})

