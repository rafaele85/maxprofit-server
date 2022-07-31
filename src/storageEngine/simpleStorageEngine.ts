import {StorageEngineInterface} from "./storageEngine.interface";
import * as fs from "fs";


export class SimpleStorageEngine implements StorageEngineInterface {
    private prices: Uint16Array = new Uint16Array(0)

    private minTime = 0
    private maxTime = this.prices.length - 1

    public getMinTime(): number {
        return this.minTime
    }
    public getMaxTime(): number {
        return this.maxTime
    }
    public async getPrices(_start: number, _end: number): Promise<Uint16Array> {
        if (!this.prices.length) {
            const buffer = fs.readFileSync('../data/data.bin')
            this.prices = new Uint16Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint16Array.BYTES_PER_ELEMENT);
        }
        console.log(this.prices[0], this.prices[this.prices.length - 1])
        return this.prices
    }
}