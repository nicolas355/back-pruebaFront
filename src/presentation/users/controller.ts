import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.erros";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { UserService } from "../services/user.service";


export class UserController {

    // DI
    constructor(
        private readonly userService: UserService,
    ) {}

    private handlerError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }   

        console.log({ error })
        res.status(500).json({ error: 'Unexpected error' })
    }

     public createUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.fromObject(req.body)

        if (error) return res.status(400).json({ error })

        this.userService.createUser(createUserDto!)
            .then(newUser => res.status(201).json({ user: newUser }))
            .catch(error => this.handlerError(res, error))
     }

     public getAll = (req: Request, res: Response) => {

        this.userService.getAll()
            .then(users => res.json({ users }))
            .catch(error => this.handlerError(res, error))
     }

     public getById = (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(+id)) return res.status(400).json({ error: 'id must be a number' })

        this.userService.getById(+id)
            .then(user => res.json({ user }))
            .catch(error => this.handlerError(res, error))
     }
}