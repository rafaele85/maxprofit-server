import {MaxProfitInput} from "./maxprofilt.types";
import {maxProfit} from "./maxprofit.service";
import {logger} from "../util/logger";
import {Request, Response} from "express";

export const maxprofitController = async (request: Request, response: Response) => {
    const input: MaxProfitInput = request.body
    try {
        const bestChoice = await maxProfit(input)
        return response.status(200).json(bestChoice)
    } catch (err) {
        logger.error(err)
        return response.status(500).json(err)
    }
}
