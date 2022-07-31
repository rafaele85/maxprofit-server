import {StorageEngineInterface} from "./storageEngine.interface";
import * as fs from "fs";
import {convertDateToUnixTime} from "../util/convertDate";

export class SimpleStorageEngine implements StorageEngineInterface {
    private prices: Uint16Array = new Uint16Array(0)

    private startDate = new Date('2022-07-01 00:00:00 GMT+3')
    private endDate = new Date('2022-08-01 00:00:00 GMT+3')

    private minTime = convertDateToUnixTime(this.startDate)
    private maxTime = convertDateToUnixTime(this.endDate)

    public getMinTime(): number {
        return this.minTime
    }
    public getMaxTime(): number {
        return this.maxTime
    }
    public async getPrices(_start: number, _end: number): Promise<Uint16Array> {
        if (!this.prices.length) {
            const buffer = fs.readFileSync(__dirname + '/../../data/data.bin')
            this.prices = new Uint16Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint16Array.BYTES_PER_ELEMENT);
        }
        return this.prices
    }
}