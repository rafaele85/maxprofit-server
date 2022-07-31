import {SimpleStorageEngine} from "./simpleStorageEngine";

export interface StorageEngineInterface {
    getMinTime: () => number,
    getMaxTime: () => number,
    getPrices: (start: number, end: number) => Promise<Uint16Array>,
}

const storageEngine: StorageEngineInterface = new SimpleStorageEngine()

export const getStorageEngine = () => {
    return storageEngine
}