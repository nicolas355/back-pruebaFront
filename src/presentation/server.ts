import express, { Router } from 'express'
import cors from 'cors'

export class Server {

    public readonly app = express()
    
    constructor(
        public readonly port: number,
        public readonly routes: Router
    ) {}


    public async start() {

        // Middlewares

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())


        // routes

        this.app.use('/api/prueba', this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}