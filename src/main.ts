import express from "express"
import {maxprofitController} from "./maxprofit/maxprofit.controller";
import {logger} from "./util/logger";

const main = () => {
    const app = express()
    const port = process.env.PORT || 3000

    app.use('/api/maxprofit', maxprofitController)

    app.listen(port, () => {
        logger.log('started at ', port)
    })
}


void main()
