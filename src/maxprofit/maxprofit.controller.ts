import {MaxProfitInput} from "./maxprofilt.types";
import {maxProfit} from "./maxprofit.service";
import {logger} from "../util/logger";
import {Request, Response} from "express";
import {getStorageEngine} from "../storageEngine/storageEngine.interface";

export const maxprofitController = async (request: Request, response: Response) => {
    const input: MaxProfitInput = request.body
    try {
        const storageEngine = getStorageEngine()
        const bestChoice = await maxProfit(input, storageEngine)
        return response.status(200).json(bestChoice)
    } catch (err) {
        logger.error(err)
        return response.status(500).json(err)
    }
}
