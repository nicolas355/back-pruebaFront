import { prisma } from "../../data/postgres"
import { ImageSendDto } from "../../domain/dtos/image/image-send.dto"
import { ImageEntity } from "../../domain/entities/image.entity"
import { CustomError } from "../../domain/errors/custom.erros"


export class ImageService {

    constructor() {}


    async saveImage(titulo: string, path: string): Promise<ImageEntity> {
        try {
          const newImage = await prisma.image.create({
            data: { titulo, imagePath: path }
          })

          return ImageEntity.fromObject(newImage)
        } catch (error) {
            throw error
        }
    }

    async getByid(id: number): Promise<ImageEntity> {
       try {
         const image = await prisma.image.findUnique({
          where: { id }
         })

         if (!image) throw CustomError.notFound(`Image with id ${id} not found`)

         return ImageEntity.fromObject( image )
       } catch (error) {
          throw error
       }
    }

    async getAll(): Promise<ImageSendDto[]> {
      try {
        const images = await prisma.image.findMany()

        return images.map( ImageSendDto.fromObject )
      } catch (error) {
        throw error
      }
    }
}