import {StorageEngineInterface} from "./storageEngine.interface";

const prices = [1, 2]

const minTime = 0
const maxTime = prices.length - 1

export class SimpleStorageEngine implements StorageEngineInterface {
    public getMinTime(): number {
        return minTime
    }
    public getMaxTime(): number {
        return maxTime
    }
    public async getPrices(_start: number, _end: number): Promise<number[]> {
        return prices
    }
}