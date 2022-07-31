import {MaxProfitInput} from "./maxprofit.types";
import {StorageEngineInterface} from "../storageEngine/storageEngine.interface";

export const validateInput = (input: MaxProfitInput, storageEngine: StorageEngineInterface): void => {
    if (!input) {
        throw new Error('input params not specified')
    }

    let {start, end} = input;

    if (start === undefined || start === null || start < 0) {
        throw new Error('start of the interval not specified')
    }
    if (!end) {
        throw new Error('end of the interval not specified')
    }
    if (start >= end) {
        throw new Error('start time should be < end time ')
    }

    const minTime = storageEngine.getMinTime()
    const maxTime = storageEngine.getMaxTime()

    if (start < minTime || start >= maxTime || end <= minTime || end > maxTime) {
        throw new Error('start and end time should be within the interval ' + minTime +' , ' + maxTime)
    }
}