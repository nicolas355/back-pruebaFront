export class CreateUserDto {
    private constructor(
        public readonly nombre: string,
        public readonly apellido: string,
        public readonly numero: string,
        public readonly fecha: Date
    ) {}


    static fromObject(object:{ [key: string]:any }): [string?, CreateUserDto?] {
        const {
            nombre,
            apellido,
            numero,
            fecha
        } = object

        if (!nombre) return ['El nombre es requerido']
        if (!apellido) return ['El apellido es requerido']
        if (!numero) return ['El numero es requerido']
        if (!fecha) return ['La fecha es requerido']

        const isValidDate = new Date(fecha)

        if (isNaN(isValidDate.getTime())) return ['Se debe mandar una fecha valida']


        return [undefined, new CreateUserDto(nombre, apellido, numero, isValidDate)]
    }
}