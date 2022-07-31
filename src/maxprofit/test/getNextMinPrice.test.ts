import {getNextMinPrice} from "../getNextMinPrice";
import {PriceWithIndex} from "../priceWithIndex.type";

describe('getNextMinPrice', () => {
    it('should return price at index if currentMin is undefined ', () => {
        const prices = [1, 2]
        const index = 0
        const currentMin = undefined
        const expected: PriceWithIndex = {price: 1, startIndex: 0}

        const result = getNextMinPrice(prices, index, currentMin)
        expect(result).toStrictEqual(expected)
    })

    it('should return currentMin if price at index is higher ', () => {
        const prices = [1, 2]
        const index = 1
        const currentMin: PriceWithIndex = {price: 1, startIndex: 0}
        const expected: PriceWithIndex = {price: 1, startIndex: 0}

        const result = getNextMinPrice(prices, index, currentMin)
        expect(result).toStrictEqual(expected)
    })

    it('should return currentMin if price at index is the same as currentMin ', () => {
        const prices = [1, 1]
        const index = 1
        const currentMin: PriceWithIndex = {price: 1, startIndex: 0}
        const expected: PriceWithIndex = {price: 1, startIndex: 0}

        const result = getNextMinPrice(prices, index, currentMin)
        expect(result).toStrictEqual(expected)
    })

    it('should return price at index if price at index is lower than currentMin ', () => {
        const prices = [2, 1]
        const index = 1
        const currentMin: PriceWithIndex = {price: 2, startIndex: 0}
        const expected: PriceWithIndex = {price: 1, startIndex: 1}

        const result = getNextMinPrice(prices, index, currentMin)
        expect(result).toStrictEqual(expected)
    })

})


