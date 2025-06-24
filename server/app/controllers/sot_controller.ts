/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { promises as fsPromise } from 'node:fs'
import sharp from 'sharp'
import path from 'node:path'

export default class SotController {
  /**
   * Display a list of resource
   */
  async allFindings({ request, response }: HttpContext) {
    const page = Number(request.qs().page) || 1
    const limit = Number(request.qs().limit) || 12
    const sots = await db
      .from('SotParticipantFinding')
      .select(
        'Participant.FullName as ParticipantName',
        'Participant.UserName',
        'SotParticipantFinding.SotParticipantId',
        'SotParticipantFinding.CreatedBy',
        'SotParticipantFinding.CreatedDate',
        'SotParticipantFinding.ImageFileName',
        'SotParticipantFinding.IsSafe',
        'SotParticipantFinding.Description',
        'SotParticipant.SotId',
        'SotParticipant.VehicleCode',
        'Sot.*',
        'Zref_Location.Name as LocationName',
        'ZRef_Clsr.Name as ClsrName',
        'ZRef_Clsr.Description as ClsrDescription'
      )
      .leftJoin('Participant', 'SotParticipantFinding.CreatedBy', 'Participant.Id')
      .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
      .leftJoin('Sot', 'SotParticipant.SotId', 'Sot.Id')
      .leftJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
      .leftJoin('ZRef_Clsr', 'SotParticipantFinding.ZRef_ClsrId', 'ZRef_Clsr.Id')
      .orderBy('SotParticipantFinding.CreatedDate', 'desc')
      .paginate(page, limit)
    // const data = await Promise.all(sots)
    const sotsWithImage = await Promise.all(
      sots.rows.map(async (sot: { ImageFileName: any; UserName: any }) => {
        try {
          // Extract username from ImageFileName (prefix before first underscore)
          const usernameFromFile = sot.ImageFileName?.split('_')[0]
          if (!usernameFromFile) {
            return { ...sot, ImageData: null }
          }
          
          const dirPath = `public/images/findings/${usernameFromFile}`
          
          // Check if directory exists
          try {
            await fsPromise.access(dirPath)
          } catch {
            // Directory doesn't exist, return sot without image
            return { ...sot, ImageData: null }
          }
          
          const fileNames = await fsPromise.readdir(dirPath)
          const imageFileNames = fileNames
            .filter((image) => image.startsWith(sot.ImageFileName))
            .map((image) => image.replace('.png', ''))
            
          if (imageFileNames.length > 0) {
            const imageBuffer = await fsPromise.readFile(
              `${dirPath}/${imageFileNames[0]}.png`
            )
            const imageBase64 = imageBuffer.toString('base64')
            return { ...sot, ImageData: imageBase64 }
          }
          return { ...sot, ImageData: null }
        } catch (error) {
          console.error(`Error processing image for ${sot.ImageFileName}:`, error)
          return { ...sot, ImageData: null }
        }
      })
    )

    return response.status(200).json({
      data: sotsWithImage,
      meta: sots,
    })
  }

  async getSotFindingsByParticipantId({ request, response }: HttpContext) {
    const page = request.qs().page || 1
    const limit = request.qs().limit || 12
    const ParticipantId = request.params().id

    // Validate ParticipantId
    if (!ParticipantId || ParticipantId === 'undefined' || isNaN(Number(ParticipantId))) {
      return response.status(400).json({ error: 'Invalid participant ID' })
    }

    const participantIdNumber = Number(ParticipantId)
    let sots: any[]

    try {
      sots = await db
        .from('SotParticipantFinding')
        .leftJoin('Participant', 'SotParticipantFinding.CreatedBy', 'Participant.Id')
        .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
        .leftJoin('Sot', 'SotParticipant.SotId', 'Sot.Id')
        .leftJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
        .leftJoin('ZRef_Clsr', 'SotParticipantFinding.ZRef_ClsrId', 'ZRef_Clsr.Id')
        .select(
          'Participant.FullName as ParticipantName',
          'Participant.UserName',
          // 'SotParticipantFinding.SotParticipantId',
          'SotParticipantFinding.CreatedBy',
          'SotParticipantFinding.CreatedDate',
          'SotParticipantFinding.ImageFileName',
          'SotParticipantFinding.IsSafe',
          'SotParticipantFinding.Description',
          'SotParticipant.SotId',
          // 'SotParticipant.VehicleCode',
          'Sot.*',
          'Zref_Location.Name as LocationName',
          'ZRef_Clsr.Name as ClsrName',
          'ZRef_Clsr.Description as ClsrDescription'
        )
        .where('SotParticipantFinding.CreatedBy', participantIdNumber)
        .orderBy('SotParticipantFinding.CreatedDate', 'desc')
        // .distinct('SotParticipantFinding.Id') // <--- added distinct
        .paginate(page, limit)
    } catch (error) {
      console.error('🚀 ~ SotController ~ getSotFindingsByParticipantId ~ error:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
    if (!sots) {
      return response.status(404).json({ error: 'Sot findings not found' })
    }
    const sotsWithImage = await Promise.all(
      sots.map(async (sot: { ImageFileName: any; UserName: any }) => {
        if (sot.ImageFileName) {
          let images: string[] = []
          try {
            images = await fsPromise.readdir(`public/images/findings/${sot.UserName}`)
          } catch (error) {
            if (error.code !== 'ENOENT') {
              console.error(' SotController ~ sots.map ~ error:', error)
              return response.status(200).json({ data: [], meta: sots })
            }
          }
          const imageFileNames = images
            .filter((image) => image.startsWith(sot.ImageFileName))
            .map((image) => image.replace('.png', ''))
          if (imageFileNames.length > 0) {
            const imageBuffer = await fsPromise.readFile(
              `public/images/findings/${sot.UserName}/${imageFileNames[0]}.png`
            )
            const imageBase64 = imageBuffer.toString('base64')
            return { ...sot, ImageData: imageBase64 || null }
          }
        }
        return { ...sot, ImageData: null }
      })
    )

    // const { rows, ...meta } = sots
    return response.status(200).json({
      data: sotsWithImage,
      meta: sots,
    })
  }

  /**
   * Handle form submission for the create action
   */

  async storeSotFinding({ request, response }: HttpContext) {
    const {
      CreatedBy,
      CreatedDate,
      ImageFileName,
      IsSafe,
      Description,
      ZRef_ClsrId,
      chunkIndex,
      totalChunks,
    } = request.body()

    // Cari SotParticipant berdasarkan CreatedBy (ParticipantId)
    const SotParticipant = await db.from('SotParticipant').where('ParticipantId', CreatedBy).first()

    if (!SotParticipant) {
      return response
        .status(200)
        .json({ isGroupMember: false, message: 'not a member of any group' })
    }

    const SotParticipantId = SotParticipant.Id
    const uploadDir = path.join('public', 'images', 'findings', ImageFileName.split('_')[0])

    try {
      // Membuat direktori jika belum ada
      try {
        await fsPromise.stat(uploadDir)
      } catch (error) {
        if (error.code === 'ENOENT') {
          await fsPromise.mkdir(uploadDir, { recursive: true })
        } else {
          throw error
        }
      }

      // Menyimpan chunk yang diterima sementara waktu
      const chunkFilePath = path.join(uploadDir, `${ImageFileName}_chunk_${chunkIndex}`)
      const imageChunk = request.file('ImageData') // Mengambil file chunk dari request

      // Simpan chunk file ke filesystem
      if (imageChunk) {
        await imageChunk.move(uploadDir, {
          name: `${ImageFileName}_chunk_${chunkIndex}`,
          overwrite: true,
        })
      }

      // Setelah menerima semua chunk, gabungkan menjadi satu file
      // Setelah menerima semua chunk, gabungkan menjadi satu file
      if (Number.parseInt(chunkIndex) === Number.parseInt(totalChunks) - 1) {
        // Gabungkan semua chunk menjadi satu file
        const finalFilePath = path.join(uploadDir, `${ImageFileName}.png`)
        const writeStream = fs.createWriteStream(finalFilePath)

        for (let i = 0; i < totalChunks; i++) {
          const chunkPath = chunkFilePath
          const chunk = await fsPromise.readFile(chunkPath)
          writeStream.write(chunk)
          await fsPromise.unlink(chunkPath) // Hapus chunk setelah digabungkan
        }
        writeStream.end()

        // Proses file menggunakan Sharp
        const processedFilePath = path.join(uploadDir, `${ImageFileName}_processed.png`)
        await sharp(finalFilePath).toFile(processedFilePath)

        // Simpan data ke database
        const sot = await db.table('SotParticipantFinding').insert({
          SotParticipantId,
          CreatedBy,
          CreatedDate,
          IsSafe,
          ImageFileName: ImageFileName + '.png',
          Description,
          ZRef_ClsrId,
        })

        return response.status(200).json({ sot })
      }

      return response
        .status(200)
        .json({ message: `Chunk ${chunkIndex + 1}/${totalChunks} uploaded successfully` })
    } catch (error) {
      console.error('Error handling SOT finding upload', error)
      return response.status(500).json({ error: 'Error handling SOT finding upload' })
    }
  }

  async processChunk(chunk: string | ArrayBuffer | undefined, ImageFileName: string) {
    const extension = 'png'
    const filename = `${ImageFileName.replace(/\./g, '_')}`
    const dirname = `${ImageFileName.split('_')[0]}`
    const dir = `public/images/findings/${dirname}`

    try {
      fsPromise.stat(dir)
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('Directory not found, creating new directory...')
        fsPromise.mkdir(dir, { recursive: true })
      } else {
        throw error
      }
    }

    await sharp(chunk, { density: 300 })
      .png({ compressionLevel: 9 })
      .toFile(`${dir}/${filename}.${extension}`)
  }
}
