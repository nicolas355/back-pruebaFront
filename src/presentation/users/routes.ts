import { Router } from "express";
import { UserController } from "./controller";


export class UserRoutes {

    static get routes(): Router {
        const router = Router()
        const userController = new UserController()

        router.post('/', userController.createUser)

        return router
    }
}