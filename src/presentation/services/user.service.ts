import { prisma } from "../../data/postgres";
import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { CustomError } from "../../domain/errors/custom.erros";


export class UserService {
    constructor() {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
          const newUser = await prisma.user.create({
            data: createUserDto
          })

          return UserEntity.fromObject(newUser)
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<UserEntity[]> {
        try {
          const users = await prisma.user.findMany()

          return users.map( UserEntity.fromObject )
        } catch (error) {
            throw error
        }
    }

    async getById(id: number): Promise<UserEntity> {
        try {
          const user = await prisma.user.findUnique({
            where: { id }
          })            

          if (!user) throw CustomError.notFound(`User with id ${id} not found`)

          return UserEntity.fromObject( user )
        } catch (error) {
            throw error
        }
    }
}