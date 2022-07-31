import express from "express"
import {maxprofitController} from "./maxprofit/maxprofit.controller";
import {logger} from "./util/logger";
import dotenv from 'dotenv'


const main = () => {
    dotenv.config()

    const app = express()
    const port = process.env.PORT || 5000

    app.use('/api/maxprofit', maxprofitController)

    app.listen(port, () => {
        logger.log('started at ', port)
    })
}


void main()
