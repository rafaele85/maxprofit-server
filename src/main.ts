import express from "express"
import {maxprofitController} from "./maxprofit/maxprofit.controller";
import {logger} from "./util/logger";

//62137 51045
const main = () => {

    const app = express()
    const port = process.env.PORT || 5000

    app.use('/api/maxprofit', maxprofitController)

    app.listen(port, () => {
        logger.log('started at ', port)
    })
}


void main()
