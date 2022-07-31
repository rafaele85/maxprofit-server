import express from "express"
import cors from 'cors'
import maxprofitRouter from "./maxprofit/maxprofit.controller";

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

    app.get('/api/test', (req, res) => res.send('hello'))
    app.get('/api/maxprofit', (req, res) => res.send('hello'))
    // app.use('/api/maxprofit', maxprofitRouter)

    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log('---listening to ', port)
    })
}


void main()
