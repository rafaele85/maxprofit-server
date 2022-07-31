import {MaxProfitOutput} from "./maxprofilt.types";

export const isBetterProfit = (profit: number, previousBestChoice: MaxProfitOutput | undefined) => {
    return (!previousBestChoice || previousBestChoice.profit < profit)
}

