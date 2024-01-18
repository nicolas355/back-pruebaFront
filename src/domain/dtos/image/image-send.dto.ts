import { envs } from "../../../config/env.adapter"
import { CustomError } from "../../errors/custom.erros"


export class ImageSendDto {
    private constructor(
        public id: number,
        public titulo: string,
        public imagePath: string
    ) {}


    static fromObject(object:{[key:string]: any}): ImageSendDto {
        const { id, titulo, imagePath } = object

        if (!id) throw CustomError.badRequest('Missing id')
        if (!titulo) throw CustomError.badRequest('Missing titulo')
        if (!imagePath) throw CustomError.badRequest('Missing imagePath')

        const imageName = imagePath.split('\\').at(-1)
        const pathToGetImage = `http://localhost:${envs.PORT}/api/prueba/image/name/${imageName}`


        return new ImageSendDto(id, titulo, pathToGetImage)
    }
}