import {calculateMinPrices} from "../calculateMinPrices";
import {PriceWithIndex} from "../priceWithIndex.type";

describe('calculateMinPrices', () => {
    it('should return array with the same min price if prices are non-decreasing', () => {
        const prices = [1, 2, 2, 3]
        const expected: PriceWithIndex[] = [ {price: 1, startIndex: 0}, {price: 1, startIndex: 0}, {price: 1, startIndex: 0}, {price: 1, startIndex: 0} ]
        const result = calculateMinPrices(prices)
        expect(result).toStrictEqual(expected)
    })

    it('should return array with the each element being new min if prices are only decreasing', () => {
        const prices = [3,2,1]
        const expected: PriceWithIndex[] = [ {price: 3, startIndex: 0}, {price: 2, startIndex: 1}, {price: 1, startIndex: 2} ]
        const result = calculateMinPrices(prices)
        expect(result).toStrictEqual(expected)
    })

    it('should return array with new min each time min gets lower', () => {
        const prices = [5, 6, 4, 7, 3, 8, 2, 9, 1, 10]
        const expected: PriceWithIndex[] = [
            {price: 5, startIndex: 0},
            {price: 5, startIndex: 0},
            {price: 4, startIndex: 2},
            {price: 4, startIndex: 2},
            {price: 3, startIndex: 4},
            {price: 3, startIndex: 4},
            {price: 2, startIndex: 6},
            {price: 2, startIndex: 6},
            {price: 1, startIndex: 8},
            {price: 1, startIndex: 8},
        ]
        const result = calculateMinPrices(prices)
        expect(result).toStrictEqual(expected)
    })

})
