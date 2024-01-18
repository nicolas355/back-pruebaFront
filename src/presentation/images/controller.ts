import { type Response, type Request } from "express";
import { CustomError } from "../../domain/errors/custom.erros";
import { ImageService } from "../services/image.service";
import path from 'node:path'
import fs from 'node:fs'

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

    public getById = (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(+id)) return res.status(400).json({ error: 'Id must be a number' })

        this.imageService.getByid(+id)
            .then(image => res.sendFile(image.imagePath))
            .catch(error => this.handlerError(res, error))
    }


    public getByName = (req: Request, res: Response) => {
        const { name } = req.params
        const imagePath = path.join(__dirname, `../../../images/${name}`)

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: `Image ${name} not found` })
        }

        res.sendFile(imagePath)

    }

    public getAll = (req: Request, res: Response) => {

        this.imageService.getAll()
            .then(images => res.json({ images }))
            .catch(error => this.handlerError(res, error))
    }
}