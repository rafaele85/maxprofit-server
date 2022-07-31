import {MaxProfitInput} from "./maxprofit.types";
import {maxProfit} from "./maxprofit.service";
import {logger} from "../util/logger";
import {Request, Response} from "express";
import {getStorageEngine} from "../storageEngine/storageEngine.interface";

export const maxprofitController = async (request: Request, response: Response ) => {
    const input: Partial<MaxProfitInput> = {
        start: request.query.start ? parseInt('' + request.query.start) : undefined,
        end: request.query.end ? parseInt('' + request.query.end) : undefined,
        priceLimit: request.query.priceLimit ? parseFloat('' + request.query.priceLimit) : undefined
    }
    console.log('---input=', input, typeof input.start, typeof input.end)
    try {
        const storageEngine = getStorageEngine()
        const bestChoice = await maxProfit(input, storageEngine)
        response.status(200).json(bestChoice)
    } catch (err) {
        logger.error(err)
        if (err instanceof Error) {
            response.status(500).send(err.message)
        }
    }
}
