import {MaxProfitOutput} from "./maxprofit.types";

export const isBetterProfit = (profit: number, previousBestChoice: MaxProfitOutput | undefined) => {
    return (profit > 0 && (!previousBestChoice || previousBestChoice.profit < profit))
}

