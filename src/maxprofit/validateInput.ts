import {MaxProfitInput} from "./maxprofit.types";
import {StorageEngineInterface} from "../storageEngine/storageEngine.interface";
import {convertUnixTimeToDate} from "../util/convertDate";

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

    if (start < minTime || start >= maxTime) {
        throw new Error('Start time ' +
            convertUnixTimeToDate(start) +
            '. Start time should be between ' +
            convertUnixTimeToDate(minTime) +
            ' and ' +
            convertUnixTimeToDate(maxTime - 1)
        )
    }

    if (end <= minTime || end > maxTime) {
        throw new Error('End time ' +
            convertUnixTimeToDate(end) +
            '. End time should be between ' +
            convertUnixTimeToDate(minTime + 1) +
            ' and ' +
            convertUnixTimeToDate(maxTime)
        )
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