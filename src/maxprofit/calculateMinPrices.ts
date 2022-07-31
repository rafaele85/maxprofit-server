import {PriceWithIndex} from "./priceWithIndex.type";
import {getNextMinPrice} from "./getNextMinPrice";

export const calculateMinPrices = (prices: number[]): PriceWithIndex[] => {
    const minPrices: PriceWithIndex[] = []

    let currentMin: PriceWithIndex | undefined = undefined

    for (let i=0; i<prices.length; i++) {
        currentMin = getNextMinPrice(prices, i, currentMin)
        minPrices.push(currentMin)
    }
    return minPrices
}