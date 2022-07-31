import {MaxProfitInput} from "./maxprofit.types";
import {maxProfit} from "./maxprofit.service";
import {logger} from "../util/logger";
import {Request, Response} from "express";
import {getStorageEngine} from "../storageEngine/storageEngine.interface";
import {formatObjectForVercel} from "../util/formatObjectForVercel";

export const maxprofitController = async (request: Request, response: Response ) => {
    const isVercel = process.env.IS_VERCEL
    const input: Partial<MaxProfitInput> = {
        start: request.query.start ? parseInt('' + request.query.start) : undefined,
        end: request.query.end ? parseInt('' + request.query.end) : undefined,
        priceLimit: request.query.priceLimit ? parseFloat('' + request.query.priceLimit) : undefined
    }
    let error = 'unknown error'
    try {
        const storageEngine = getStorageEngine()
        const bestChoice = await maxProfit(input, storageEngine)
        if (isVercel) {
            response.json(bestChoice).end()
        } else {
            response.send(formatObjectForVercel(bestChoice))
        }
        return
    } catch (err) {
        error = (err as any).message || '' + (err as any) || error
    }
    logger.error(error)
    response.status(500).send(error)
}
