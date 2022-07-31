import {MaxProfitInput, MaxProfitOutput} from "./maxprofit.types";
import {StorageEngineInterface} from "../storageEngine/storageEngine.interface";
import {validateInput} from "./validateInput";
import {getNextBestChoice} from "./getNextBestChoice";
import {PriceWithIndex} from "./priceWithIndex.type";
import {getNextMinPrice} from "./getNextMinPrice";



export const maxProfit = async (input: MaxProfitInput, storageEngine: StorageEngineInterface): Promise<MaxProfitOutput | undefined> => {

    validateInput(input, storageEngine)

    const {start, end, priceLimit} = input

    const prices = await storageEngine.getPrices(start, end)

    let currentMin: PriceWithIndex = getNextMinPrice(prices, 0, undefined)

    let bestChoice: MaxProfitOutput | undefined = undefined

    for (let i = 1; i < prices.length; i++) {
        const bestChoiceCandidate = getNextBestChoice({prices, index: i, currentMin, previousBestChoice: bestChoice, priceLimit})
        if (bestChoiceCandidate) {
            bestChoice = bestChoiceCandidate
        }
        currentMin = getNextMinPrice(prices, i, currentMin)
    }

    if (bestChoice) {
        const adjustedBestChoice: MaxProfitOutput = {...bestChoice, buyTime: bestChoice.buyTime + start, sellTime: bestChoice.sellTime + start}
        return adjustedBestChoice
    }
    return undefined
}

