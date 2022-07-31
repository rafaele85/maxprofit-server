import {maxProfit} from "../maxprofit.service";
import {StorageEngineInterface} from "../../storageEngine/storageEngine.interface";
import {MaxProfitOutput} from "../maxprofit.types";

describe('maxProfit', () => {
    it('should return 1 for profit for simple case [1,2] without price limit', async () => {
        const prices = new Uint16Array([1, 2])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected = {buyTime: 0, buyPrice: 1, sellTime: 1, sellPrice: 2, profit: 1}
        const bestChoice = await maxProfit({start: 0, end: 1}, mockStorageEngine)
        expect(bestChoice).toEqual(expected)
    })

    it('correctly handle negative case when all prices are higher than priceLimit', async () => {
        const prices = new Uint16Array([10, 20])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const bestChoice = await maxProfit({start: 0, end: 1, priceLimit: 1}, mockStorageEngine)
        expect(bestChoice).toBeUndefined()
    })

    it('correctly handle negative case when prices are not ascending', async () => {
        const prices = new Uint16Array([6, 5, 4])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const bestChoice = await maxProfit({start: 0, end: 2}, mockStorageEngine)
        expect(bestChoice).toBeUndefined()
    })

    it('find best profit out if several choices w/o priceLimit: second min is lower but first profit is higher', async () => {
        const prices = new Uint16Array([4, 100, 2, 10])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected: MaxProfitOutput = { buyTime: 0, sellTime: 1, buyPrice: 4, sellPrice: 100, profit: 96}
        const bestChoice = await maxProfit({start: 0, end: 3}, mockStorageEngine)
        expect(bestChoice).toStrictEqual(expected)
    })

    it('find best profit out if several choices w/o priceLimit: second min is lower, second max is lower', async () => {
        const prices = new Uint16Array([4, 100, 2, 99])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected: MaxProfitOutput = { buyTime: 2, sellTime: 3, buyPrice: 2, sellPrice: 99, profit: 97}
        const bestChoice = await maxProfit({start: 0, end: 3}, mockStorageEngine)
        expect(bestChoice).toStrictEqual(expected)
    })

    it('find best profit out if several choices w/o priceLimit: second min is lower, second max is higher', async () => {
        const prices = new Uint16Array([4, 100, 2, 101])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected: MaxProfitOutput = { buyTime: 2, sellTime: 3, buyPrice: 2, sellPrice: 101, profit: 99}
        const bestChoice = await maxProfit({start: 0, end: 3}, mockStorageEngine)
        expect(bestChoice).toStrictEqual(expected)
    })

    it('correctly pick first index in case of multiple points with the same price', async () => {
        const prices = new Uint16Array([1, 1, 2, 2])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected: MaxProfitOutput = { buyTime: 0, sellTime: 2, buyPrice: 1, sellPrice: 2, profit: 1}
        const bestChoice = await maxProfit({start: 0, end: 3}, mockStorageEngine)
        expect(bestChoice).toStrictEqual(expected)
    })

    it('correctly calculate profit if first price > priceLimit', async () => {
        const prices = new Uint16Array([10, 1, 2, 2])
        const mockStorageEngine: StorageEngineInterface = {
            getMinTime: jest.fn(() => 0),
            getMaxTime: jest.fn(() => prices.length),
            getPrices: jest.fn(async (_start: number, _end: number) => prices)
        }
        const expected: MaxProfitOutput = { buyTime: 1, sellTime: 2, buyPrice: 1, sellPrice: 2, profit: 1}
        const bestChoice = await maxProfit({start: 0, end: 3, priceLimit: 5}, mockStorageEngine)
        expect(bestChoice).toStrictEqual(expected)
    })

})


