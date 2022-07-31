import {getNextBestChoice, GetNextBestChoiceParams} from "../getNextBestChoice";
import {MaxProfitOutput} from "../maxprofit.types";
import {PriceWithIndex} from "../priceWithIndex.type";

describe('getNextBestChoice', () => {
    it('should return best choice from current index if can afford and is better profit', () => {
        const prices = new Uint16Array([1, 2, 3])
        const index = 1
        const currentMin: PriceWithIndex = {price: 1, startIndex: 0}

        const expected: MaxProfitOutput = {
            buyTime: 0, sellTime: 1, buyPrice: 1, sellPrice: 2, profit: 1
        }

        const params: GetNextBestChoiceParams = {prices, index, currentMin, previousBestChoice: undefined}
        const result = getNextBestChoice(params)

        expect(result).toStrictEqual(expected)
    })

    it('should return undefined if can not afford', () => {
        const prices = new Uint16Array([4, 20])
        const index = 1
        const currentMin: PriceWithIndex = {price: 4, startIndex: 0}

        const params: GetNextBestChoiceParams = {prices, index, currentMin, previousBestChoice: undefined, priceLimit: 2}
        const result = getNextBestChoice(params)

        expect(result).toBeUndefined()
    })

})

