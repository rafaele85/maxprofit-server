import {MaxProfitInput} from "./maxprofit.types";
import {maxProfit} from "./maxprofit.service";
import {logger} from "../util/logger";
import {Request, Response} from "express";
import {getStorageEngine} from "../storageEngine/storageEngine.interface";

export const maxprofitController = async (request: Request, response: Response ) => {
    const str = JSON.stringify({test: 2222})
    response.send(str)
    return
    const input: Partial<MaxProfitInput> = {
        start: request.query.start ? parseInt('' + request.query.start) : undefined,
        end: request.query.end ? parseInt('' + request.query.end) : undefined,
        priceLimit: request.query.priceLimit ? parseFloat('' + request.query.priceLimit) : undefined
    }
    try {
        const storageEngine = getStorageEngine()
        const bestChoice = await maxProfit(input, storageEngine)
        response.json(bestChoice).end()
    } catch (err) {
        logger.error(err)
        if (err instanceof Error) {
            response.json({
                message: '' + (err as any).message || '' + err
            }).end()
            return
        }
        response.json({
            message: '' + err
        }).end()
    }
}
