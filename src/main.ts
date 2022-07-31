import express from "express"
import maxprofitRouter from "./maxprofit/maxprofit.controller";
import cors from 'cors'

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

    app.use('/api/maxprofit', maxprofitRouter)

    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log('---listening to ', port)
    })
}


void main()
