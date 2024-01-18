import { type Response, type Request } from "express";
import { CustomError } from "../../domain/errors/custom.erros";
import { ImageService } from "../services/image.service";
import path from 'node:path'


export class ImageController {

    constructor(
        public readonly imageService: ImageService,
    ){}

    private handlerError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }   

        console.log({ error })
        res.status(500).json({ error: 'Unexpected error' })
    }

    public saveImage = (req: Request, res: Response) => {
        const { titulo } = req.body
        const file = req.file
        if (!titulo) return res.status(400).json({ error: 'Titulo is required' })
        if (!file) return res.status(400).json({ error: 'Missing image' })

        const imagePath = path.join(__dirname, `../../../images/${file.filename}`)

        this.imageService.saveImage(titulo, imagePath)
            .then(newImage => res.status(201).json({ image: newImage }))
            .catch(error => this.handlerError(res, error))
    }
}