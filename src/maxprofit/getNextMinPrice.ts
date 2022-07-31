import {PriceWithIndex} from "./priceWithIndex.type";

export const getNextMinPrice = (prices: number[], index: number, currentMin: PriceWithIndex | undefined): PriceWithIndex => {
    const currentPrice = prices[index]
    if (!currentMin || currentMin.price > currentPrice) {
        currentMin = {price: currentPrice, startIndex: index}
    }
    return currentMin
}
