import {MaxProfitInput, MaxProfitOutput} from "./maxprofilt.types";
import {getStorageEngine} from "../storageEngine/storageEngine.interface";
import {validateInput} from "./validateInput";
import {getNextBestChoice} from "./getNextBestChoice";
import {calculateMinPrices} from "./calculateMinPrices";



export const maxProfit = async (input: MaxProfitInput): Promise<MaxProfitOutput | undefined> => {
    const storageEngine = getStorageEngine()

    validateInput(input, storageEngine)

    const {start, end, priceLimit} = input

    const prices = await storageEngine.getPrices(start, end)

    const minPrices = calculateMinPrices(prices)

    let bestChoice: MaxProfitOutput | undefined = undefined

    for (let i = 1; i < prices.length; i++) {
        const bestChoiceCandidate = getNextBestChoice({prices, index: i, minPrices, previousBestChoice: bestChoice, priceLimit})
        if (bestChoiceCandidate) {
            bestChoice = bestChoiceCandidate
        }
    }

    if (bestChoice) {
        const adjustedBestChoice: MaxProfitOutput = {...bestChoice, buyTime: bestChoice.buyTime + start, sellTime: bestChoice.sellTime + start}
        return adjustedBestChoice
    }
    return undefined
}

