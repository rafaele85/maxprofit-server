import {MaxProfitInput} from "./maxprofit.types";
import {StorageEngineInterface} from "../storageEngine/storageEngine.interface";

export const validateInput = (input: Partial<MaxProfitInput>, storageEngine: StorageEngineInterface): MaxProfitInput => {
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

    const validated: MaxProfitInput = {
        start: input.start!,
        end: input.end!,
    }
    if (input.priceLimit) {
        validated.priceLimit = input.priceLimit
    }

    return validated
}