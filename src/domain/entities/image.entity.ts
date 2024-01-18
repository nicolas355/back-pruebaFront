import { CustomError } from "../errors/custom.erros"


export class ImageEntity {

    private constructor(
        public id: number,
        public titulo: string,
        public imagePath: string
    ) {}


    static fromObject(object:{ [key:string]:any }): ImageEntity {
        const {
            id,
            titulo,
            imagePath
        } = object


        if (!id) throw CustomError.badRequest('Missing id')
        if (!titulo) throw CustomError.badRequest('Missing titulo')
        if (!imagePath) throw CustomError.badRequest('Missing imagePath')


        return new ImageEntity(id, titulo, imagePath)
    }
}