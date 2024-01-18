import { prisma } from "../../data/postgres"
import { ImageEntity } from "../../domain/entities/image.entity"


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
}