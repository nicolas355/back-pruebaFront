import { prisma } from "../../data/postgres"
import { PdfSendDto } from "../../domain/dtos/pdf/pdf-send.dto"
import { PdfEntity } from "../../domain/entities/pdf.entity"
import { CustomError } from "../../domain/errors/custom.erros"


export class PdfService {

    constructor() {}


    async saveFile(titulo: string, path: string): Promise<PdfEntity> {
        try {
          const newPdf = await prisma.pdf.create({
            data: { titulo, path }
          })

          return PdfEntity.fromObject(newPdf)
        } catch (error) {
            throw error
        }
    }

    async getByid(id: number): Promise<PdfEntity> {
       try {
         const pdf = await prisma.pdf.findUnique({
          where: { id }
         })

         if (!pdf) throw CustomError.notFound(`pdf with id ${id} not found`)

         return PdfEntity.fromObject( pdf )
       } catch (error) {
          throw error
       }
    }

    async getAll(): Promise<PdfSendDto[]> {
      try {
        const pdfs = await prisma.pdf.findMany()

        return pdfs.map( PdfSendDto.fromObject )
      } catch (error) {
        throw error
      }
    }
}