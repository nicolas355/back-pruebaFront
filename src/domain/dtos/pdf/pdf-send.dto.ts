import { envs } from "../../../config/env.adapter"
import { CustomError } from "../../errors/custom.erros"


export class PdfSendDto {
    private constructor(
        public id: number,
        public titulo: string,
        public path: string
    ) {}


    static fromObject(object:{[key:string]: any}): PdfSendDto {
        const { id, titulo, path } = object

        if (!id) throw CustomError.badRequest('Missing id')
        if (!titulo) throw CustomError.badRequest('Missing titulo')
        if (!path) throw CustomError.badRequest('Missing path')

        const imageName = path.split('\\').at(-1)
        const pathToGetImage = `http://localhost:${envs.PORT}/api/prueba/pdf/name/${imageName}`


        return new PdfSendDto(id, titulo, pathToGetImage)
    }
}