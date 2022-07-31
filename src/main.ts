import express from "express"
import {maxprofitController} from "./maxprofit/maxprofit.controller";
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

    app.get('/', (req, res) => res.end('hello') )
    app.use('/api/maxprofit', maxprofitController)

    return app
}


const app = main()

export default app


