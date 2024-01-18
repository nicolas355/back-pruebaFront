import { Router } from "express";
import { uuid } from "../../config/uuid.adapter";
import { PdfController } from "./controller";
import { PdfService } from "../services/pdf.service";
import multer from 'multer'

const allowExtensions = ['pdf']
export class PdfRoutes {

    static get routes(): Router {
        const router = Router()
        const pdfService = new PdfService()
        const pdfController = new PdfController(pdfService)

        const storage = multer.diskStorage({
            destination: 'pdf/',
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
                    cb(new Error('The File must be pdf'))
                 }
             } })

            
            
        router.post('/', upload.single('file') ,pdfController.saveFIle)
        router.get('/', pdfController.getAll)
        router.get('/name/:name', pdfController.getByName)
        router.get('/:id', pdfController.getById)
        return router
    }
}