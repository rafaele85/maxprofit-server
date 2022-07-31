import express from "express"
import {maxprofitController} from "./maxprofit/maxprofit.controller";
import cors from 'cors'
import {logger} from "./util/logger";

const main = () => {

    const port = process.env.PORT || 5000

    const app = express()
    app.use(cors())

    app.use('/api/maxprofit', maxprofitController)

    app.listen(port, () => {
        logger.log('started at ', port)
    })
}


void main()
