import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { ImageRoutes } from "./images/routes";
import { PdfRoutes } from "./pdf/routes";


export class AppRoutes {

    static get routes():Router {
        const router = Router()


        router.use('/users', UserRoutes.routes)
        router.use('/image', ImageRoutes.routes)
        router.use('/pdf', PdfRoutes.routes)
        return router
    }
}