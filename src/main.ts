import express from "express"
import cors from 'cors'
import {maxprofitController} from "./maxprofit/maxprofit.controller";

const main = () => {

    const corsOrigin = process.env.CORS_ORIGIN
    let corsOptions
    if (corsOrigin) {
        corsOptions = {
            origin: corsOrigin
        }
    }

    const app = express()
    app.use(cors(corsOptions))

    app.use('/api/maxprofit', maxprofitController)

    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log('---listening to ', port)
    })
}


void main()
