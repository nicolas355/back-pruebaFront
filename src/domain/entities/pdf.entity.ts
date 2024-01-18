import { CustomError } from "../errors/custom.erros"


export class PdfEntity {

    private constructor(
        public id: number,
        public titulo: string,
        public path: string
    ) {}


    static fromObject(object:{ [key:string]:any }): PdfEntity {
        const {
            id,
            titulo,
            path
        } = object


        if (!id) throw CustomError.badRequest('Missing id')
        if (!titulo) throw CustomError.badRequest('Missing titulo')
        if (!path) throw CustomError.badRequest('Missing file path')


        return new PdfEntity(id, titulo, path)
    }
}