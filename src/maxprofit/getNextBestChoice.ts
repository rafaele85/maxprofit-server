import {MaxProfitOutput} from "./maxprofilt.types";
import {canAfford} from "./canAfford";
import {PriceWithIndex} from "./priceWithIndex.type";
import {isBetterProfit} from "./isBetterProfit";


export type GetNextBestChoiceParams = {
    prices: number[],
    index: number,
    minPrices: PriceWithIndex[],
    previousBestChoice: MaxProfitOutput | undefined,
    priceLimit?: number
}

export const getNextBestChoice = (params: GetNextBestChoiceParams): MaxProfitOutput | undefined => {
    const {prices, index, minPrices, previousBestChoice, priceLimit} = params

    const sellPrice = prices[index]
    const buyPriceRecord = minPrices[index-1]
    const buyPrice = buyPriceRecord.price
    const profit = sellPrice - buyPrice

    if (canAfford(buyPrice, priceLimit) && isBetterProfit(profit, previousBestChoice)) {
        return {
            buyTime: buyPriceRecord.startIndex,
            buyPrice,
            sellTime: index,
            sellPrice,
            profit,
        }
    }
}
