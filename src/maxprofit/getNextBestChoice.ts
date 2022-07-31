import {canAfford} from "./canAfford";
import {PriceWithIndex} from "./priceWithIndex.type";
import {isBetterProfit} from "./isBetterProfit";
import {MaxProfitOutput} from "./maxprofit.types";


export type GetNextBestChoiceParams = {
    prices: Uint16Array,
    index: number,
    currentMin: PriceWithIndex,
    previousBestChoice: MaxProfitOutput | undefined,
    priceLimit?: number
}

export const getNextBestChoice = (params: GetNextBestChoiceParams): MaxProfitOutput | undefined => {
    const {prices, index, currentMin, previousBestChoice, priceLimit} = params

    const sellPrice = prices[index]
    const buyPriceRecord = currentMin
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
