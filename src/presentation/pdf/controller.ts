import { type Response, type Request } from "express";
import { CustomError } from "../../domain/errors/custom.erros";
import { PdfService } from "../services/pdf.service";
import path from 'node:path'
import fs from 'node:fs'

export class PdfController {

    constructor(
        public readonly pdfService: PdfService,
    ){}

    private handlerError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }   

        console.log({ error })
        res.status(500).json({ error: 'Unexpected error' })
    }

    public saveFIle = (req: Request, res: Response) => {
        const { titulo } = req.body
        const file = req.file
        if (!titulo) return res.status(400).json({ error: 'Titulo is required' })
        if (!file) return res.status(400).json({ error: 'Missing file' })

        const filePath = path.join(__dirname, `../../../pdf/${file.filename}`)

        this.pdfService.saveFile(titulo, filePath)
            .then(newPDf => res.status(201).json({ file: newPDf }))
            .catch(error => this.handlerError(res, error))
    }

    public getById = (req: Request, res: Response) => {
        const { id } = req.params

        if (isNaN(+id)) return res.status(400).json({ error: 'Id must be a number' })

        this.pdfService.getByid(+id)
            .then(pdf => res.sendFile(pdf.path))
            .catch(error => this.handlerError(res, error))
    }


    public getByName = (req: Request, res: Response) => {
        const { name } = req.params
        const filePath = path.join(__dirname, `../../../pdf/${name}`)

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: `Pdf ${name} not found` })
        }

        res.sendFile(filePath)

    }

    public getAll = (req: Request, res: Response) => {

        this.pdfService.getAll()
            .then(pdfs => res.json({ files: pdfs }))
            .catch(error => this.handlerError(res, error))
    }
}