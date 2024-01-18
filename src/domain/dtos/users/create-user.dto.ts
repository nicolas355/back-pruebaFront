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

        if (!nombre) return ['nombre is required']
        if (!apellido) return ['apellido is required']
        if (!numero) return ['numero is required']
        if (!fecha) return ['fecha is required']

        const isValidDate = new Date(fecha)

        if (isNaN(isValidDate.getTime())) return ['Fecha must be a valid Date']


        return [undefined, new CreateUserDto(nombre, apellido, numero, isValidDate)]
    }
}