const maxPrice = 650
const maxPriceWithDecimals = maxPrice * 100

export const generateRandomPrices = (numPrices: number): Uint16Array => {
    const prices = new Uint16Array(numPrices)
    for(let i=0; i<numPrices; i++) {
        const price = Math.floor(Math.random() * maxPriceWithDecimals)

        prices[i] = price
    }
    return prices
}
