import { CustomError } from "../errors/custom.erros"


export class UserEntity {
    private constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public numero: string,
        public fecha: Date,
    ) {}


    static fromObject(object: { [key: string]: any }): UserEntity {
        const {
            id,
            nombre,
            apellido,
            numero,
            fecha,
        } = object


        if (!id) throw CustomError.badRequest('Missing id')
        if (!nombre) throw CustomError.badRequest('Missing nombre')
        if (!apellido) throw CustomError.badRequest('Missing apellido')
        if (!numero) throw CustomError.badRequest('Missing numero')
        if (!fecha) throw CustomError.badRequest('Missing fecha')

        const isValidDate = new Date(fecha)

        if (isNaN(isValidDate.getTime())) throw CustomError.badRequest('Fecha must be a valid date')

        return new UserEntity(id, nombre, apellido, numero, isValidDate)
    } 
}