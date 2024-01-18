import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.erros";


export class UserController {

    // DI
    constructor() {}

    private handlerError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }   

        console.log({ error })
        res.status(500).json({ error: 'Unexpected error' })
    }

     public createUser = async (req: Request, res: Response) => {}
}