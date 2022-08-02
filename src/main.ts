import express from "express"
import cors from 'cors'
import {maxprofitController} from "./maxprofit/maxprofit.controller";
import {logger} from "./util/logger";

const main = () => {

    const app = express()
    app.use(cors({
        origin: '*'
    }))

    app.get('/api/maxprofit', maxprofitController)

    const port = process.env.PORT || 5000

    app.listen(port, () => {
        logger.log('---listening to ', port)
    })
}


void main()
