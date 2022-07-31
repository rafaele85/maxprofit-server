
export const canAfford = (buyPrice: number, priceLimit: number|undefined): boolean => {
    if (!priceLimit) {
        return true
    }
    return buyPrice <= priceLimit
}
