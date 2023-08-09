import 'dotenv/config'
import express, { Request, Response } from 'express'

const server = express()

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Hello World' });
})

server.listen(process.env.PORT, () => {
    console.log('Server is listening on', process.env.PORT)
})