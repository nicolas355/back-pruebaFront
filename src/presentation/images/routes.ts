import { Router } from "express";
import multer from 'multer'
import { uuid } from "../../config/uuid.adapter";
import { ImageController } from "./controller";
import { ImageService } from "../services/image.service";

const allowExtensions = ['png', 'jpg', 'jpeg']
export class ImageRoutes {

    static get routes(): Router {
        const router = Router()
        const imageService = new ImageService()
        const imageController = new ImageController(imageService)

        const storage = multer.diskStorage({
            destination: 'images/',
            filename: function(req, file, cb) {
                cb(null, `${uuid()}-${file.originalname}`)
            }
        })

        const upload = multer({
             storage, 
             fileFilter: function(req, file, cb) {
                 if (allowExtensions.includes(file.mimetype.split('/').at(1)!)) {
                    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
                    cb(null, true)
                 }else {
                    cb(new Error('The image must be png, jpg or jpeg'))
                 }
             } })

            
            
        router.post('/', upload.single('image') ,imageController.saveImage)
        router.get('/', imageController.getAll)
        router.get('/name/:name', imageController.getByName)
        router.get('/:id', imageController.getById)
        return router
    }
}