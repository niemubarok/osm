/* eslint-disable @typescript-eslint/naming-convention */
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import { promises as fs, access } from 'node:fs'
import sharp from 'sharp'
import { join } from 'path'

export default class SotGroupController {
  /**
   * Display a list of resource
   */
  async allSotGroup({ request, response }: HttpContext) {
    const page = request.qs().page || 1
    const limit = request.qs().limit || 12

    try {
      const sotList = await db
        .from('Sot')
        .select('Sot.Id as SotId')
        .select('Sot.ZRef_LocationId')
        .select('Sot.Attendant1_EmployeeName')
        .select('Sot.Attendant1_PhoneNumber')
        .select('Sot.Attendant1_Picture')
        .select('Sot.Attendant2_EmployeeName')
        .select('Sot.Attendant2_PhoneNumber')
        .select('Sot.Attendant2_Picture')
        .select('Sot.Notes')
        .select('Sot.CLSR_Observation')
        .innerJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
        .select('Zref_Location.Name as LocationName')
        .select('Zref_Location.Id as LocationId')
        .select('Zref_Location.LocationImage')
      // .paginate(page, limit)
      const sotGroups = await Promise.all(
        sotList.map(async (sot: any) => {
          const sotObserver = await db
            .from('SotParticipant')
            .select('SotParticipant.Id as SotParticipantId')
            .select('SotParticipant.VehicleCode')
            .leftJoin('Participant', 'SotParticipant.ParticipantId', 'Participant.Id')
            .select('Participant.FullName as ObserverName')
            .select('Participant.Id as ObserverId')
            .where('SotParticipant.SotId', sot.SotId)

          let LocationImageData: string | null = null
          if (sot.LocationId) {
            try {
              const imageBuffer = await fs.readFile(`public/images/maps/${sot.LocationId}.png`)
              LocationImageData = imageBuffer.toString('base64')
            } catch (error) {
              // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
            }
          }

          const images = [sot.Attendant1_Picture, sot.Attendant2_Picture].filter(
            (image) => image !== null && image !== undefined
          )

          const imageBuffers = await Promise.all(
            images.map((image) =>
              fs.readFile(`public/images/attendants/${image}`).catch((error) => {
                // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
                return null
              })
            )
          )
          const imageBase64s = imageBuffers
            .filter((buffer) => buffer !== null)
            .map((buffer) => buffer.toString('base64'))
          return {
            ...sot,
            SotObserver: sotObserver,
            Attendant1_PictureData: imageBase64s[0],
            Attendant2_PictureData: imageBase64s[1],
            LocationImageData,
          }
        })
      )

      // const LocationImages = await Promise.all(
      //   sotGroups.map(async (sot: any) => {
      //     if (sot.LocationId) {
      //       try {
      //         const imageBuffer = await fs.readFile(`public/images/maps/${sot.LocationId}.png`)
      //         const imageBase64 = imageBuffer.toString('base64')
      //         return { LocationImageData: imageBase64 }
      //       } catch (error) {
      //         console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      //         return { LocationImageData: null }
      //       }
      //     }
      //     return { LocationImageData: null }
      //   })
      // )

      // const attendantImages = await Promise.all(
      //   sotGroups.map(async (sot: any) => {
      //     const images = [sot.Attendant1_Picture, sot.Attendant2_Picture].filter(
      //       (image) => image !== null && image !== undefined
      //     )

      //     const imageBuffers = await Promise.all(
      //       images.map((image) =>
      //         fs.readFile(`public/images/attendants/${image}.png`).catch((error) => {
      //           console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      //           return null
      //         })
      //       )
      //     )

      //     const imageBase64s = imageBuffers
      //       .filter((buffer) => buffer !== null)
      //       .map((buffer) => buffer.toString('base64'))

      //     return {
      //       Attendant1_PictureData: imageBase64s[0],
      //       Attendant2_PictureData: imageBase64s[1],
      //     }
      //   })
      // )

      // const data = {
      //   sotGroups,
      //   LocationImages,
      //   attendantImages,
      // }
      return response.status(200).json({
        data: sotGroups,
        meta: sotList.meta,
      })
    } catch (error) {
      // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async sotGroupById({ request, response }: HttpContext) {
    const Id = request.params().Id

    const sotId = await db.from('SotParticipant').select('SotId').where('ParticipantId', Id).first()

    try {
      const sotList = await db
        .from('Sot')
        .select('Sot.Id as SotId')
        .select('Sot.ZRef_LocationId')
        .select('Sot.Attendant1_EmployeeName')
        .select('Sot.Attendant1_PhoneNumber')
        .select('Sot.Attendant1_Picture')
        .select('Sot.Attendant2_EmployeeName')
        .select('Sot.Attendant2_PhoneNumber')
        .select('Sot.Attendant2_Picture')
        .select('Sot.Notes')
        .select('Sot.CLSR_Observation')
        .innerJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
        .select('Zref_Location.Name as LocationName')
        .select('Zref_Location.Id as LocationId')
        .select('Zref_Location.LocationImage')
        .where('Sot.Id', sotId.SotId)

      const sotGroups = await Promise.all(
        sotList.map(async (sot: any) => {
          const sotObserver = await db
            .from('SotParticipant')
            .select('SotParticipant.Id as SotParticipantId')
            .select('SotParticipant.VehicleCode')
            .leftJoin('Participant', 'SotParticipant.ParticipantId', 'Participant.Id')
            .select('Participant.FullName as ObserverName')
            .select('Participant.Id as ObserverId')
            .where('SotParticipant.SotId', sot.SotId)

          let LocationImageData: string | null = null
          if (sot.LocationId) {
            try {
              const imageBuffer = await fs.readFile(`public/images/maps/${sot.LocationId}.png`)
              LocationImageData = imageBuffer.toString('base64')
            } catch (error) {
              // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
            }
          }

          const images = [sot.Attendant1_Picture, sot.Attendant2_Picture].filter(
            (image) => image !== null && image !== undefined
          )

          const imageBuffers = await Promise.all(
            images.map((image) =>
              fs.readFile(`public/images/attendants/${image}`).catch((error) => {
                // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
                return null
              })
            )
          )
          const imageBase64s = imageBuffers
            .filter((buffer) => buffer !== null)
            .map((buffer) => buffer.toString('base64'))
          return {
            ...sot,
            SotObserver: sotObserver,
            Attendant1_PictureData: imageBase64s[0],
            Attendant2_PictureData: imageBase64s[1],
            LocationImageData,
          }
        })
      )

      // const LocationImages = await Promise.all(
      //   sotGroups.map(async (sot: any) => {
      //     if (sot.LocationId) {
      //       try {
      //         const imageBuffer = await fs.readFile(`public/images/maps/${sot.LocationId}.png`)
      //         const imageBase64 = imageBuffer.toString('base64')
      //         return { LocationImageData: imageBase64 }
      //       } catch (error) {
      //         console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      //         return { LocationImageData: null }
      //       }
      //     }
      //     return { LocationImageData: null }
      //   })
      // )

      // const attendantImages = await Promise.all(
      //   sotGroups.map(async (sot: any) => {
      //     const images = [sot.Attendant1_Picture, sot.Attendant2_Picture].filter(
      //       (image) => image !== null && image !== undefined
      //     )

      //     const imageBuffers = await Promise.all(
      //       images.map((image) =>
      //         fs.readFile(`public/images/attendants/${image}.png`).catch((error) => {
      //           console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      //           return null
      //         })
      //       )
      //     )

      //     const imageBase64s = imageBuffers
      //       .filter((buffer) => buffer !== null)
      //       .map((buffer) => buffer.toString('base64'))

      //     return {
      //       Attendant1_PictureData: imageBase64s[0],
      //       Attendant2_PictureData: imageBase64s[1],
      //     }
      //   })
      // )

      // const data = {
      //   sotGroups,
      //   LocationImages,
      //   attendantImages,
      // }
      return response.status(200).json({
        data: sotGroups,
        meta: sotList.meta,
      })
    } catch (error) {
      // console.error(' SotGroupController ~ allSotGroup ~ error:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { attendant, observer } = request.body()
    if (!attendant || !observer) {
      return response.status(400).json({ error: 'All fields are required' })
    }

    const attendant1PictureName = attendant.Attendant1_EmployeeName.replace(/ /g, '_')
    const attendant2PictureName = attendant.Attendant2_EmployeeName.replace(/ /g, '_')

    const trx = await db.transaction()

    try {
      const [sot] = await trx.table('Sot').returning('Id').insert({
        ZRef_LocationId: attendant.ZRef_LocationId,
        Attendant1_EmployeeName: attendant.Attendant1_EmployeeName,
        Attendant1_PhoneNumber: attendant.Attendant1_PhoneNumber,
        Attendant1_Picture: '',
        Attendant2_EmployeeName: attendant.Attendant2_EmployeeName,
        Attendant2_PhoneNumber: attendant.Attendant2_PhoneNumber,
        Attendant2_Picture: '',
        Notes: attendant.Notes,
        CLSR_Observation: attendant.CLSR_Observation,
      })

      // if (!sot) {
      //   return response.status(400).json({ error: 'Could not create SOT' })
      // }

      if (attendant1PictureName && typeof attendant.Attendant1_Picture === 'string') {
        const imageBuffer = Buffer.from(attendant.Attendant1_Picture, 'base64')
        const image = sharp(imageBuffer)
        const sotImagesDir = `public/images/attendants`
        // const sotImagesDir = join('public', 'images', 'attendants')
        try {
          await fs.stat(sotImagesDir)
        } catch (error) {
          if (error.code === 'ENOENT') {
            await fs.mkdir(sotImagesDir, { recursive: true })
          } else {
            throw error
          }
        }
        await image.png().toFile(`${sotImagesDir}/${attendant1PictureName}.png`)
        await trx
          .query()
          .from('Sot')
          .where('Id', sot.Id)
          .update('Attendant1_Picture', `${attendant1PictureName}.png`)
      }

      if (attendant2PictureName && typeof attendant.Attendant2_Picture === 'string') {
        const imageBuffer = Buffer.from(attendant.Attendant2_Picture, 'base64')
        const image = sharp(imageBuffer)
        const sotImagesDir = `public/images/attendants`
        try {
          await fs.stat(sotImagesDir)
        } catch (error) {
          if (error.code === 'ENOENT') {
            await fs.mkdir(sotImagesDir, { recursive: true })
          } else {
            throw error
          }
        }
        await image.png().toFile(`${sotImagesDir}/${attendant2PictureName}.png`)
        await trx
          .query()
          .from('Sot')
          .where('Id', sot.Id)
          .update('Attendant2_Picture', `${attendant2PictureName}.png`)
      }

      await Promise.all(
        observer.ParticipantId.map(async (Id: any) => {
          await trx.insertQuery().table('SotParticipant').insert({
            SotId: sot.Id,
            ParticipantId: Id,
            VehicleCode: observer.VehicleCode,
          })
        })
      )

      await trx.commit()

      return response.status(201).json({ sot })
    } catch (error) {
      console.error('Error creating SOT', error)
      await trx.rollback()
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { attendant, observer } = request.body()
    if (!attendant || !observer) {
      return response.status(400).json({ error: 'All fields are required' })
    }

    const attendant1PictureName = attendant.Attendant1_EmployeeName.replace(/ /g, '_')
    const attendant2PictureName = attendant.Attendant2_EmployeeName.replace(/ /g, '_')
    const trx = await db.transaction()
    try {
      await trx.query().from('Sot').where('Id', params.id).update({
        ZRef_LocationId: attendant.ZRef_LocationId,
        Attendant1_EmployeeName: attendant.Attendant1_EmployeeName,
        Attendant1_PhoneNumber: attendant.Attendant1_PhoneNumber,
        Attendant1_Picture: attendant1PictureName,
        Attendant2_EmployeeName: attendant.Attendant2_EmployeeName,
        Attendant2_PhoneNumber: attendant.Attendant2_PhoneNumber,
        Attendant2_Picture: attendant2PictureName,
        Notes: attendant.Notes,
        CLSR_Observation: attendant.CLSR_Observation,
      })

      if (attendant1PictureName && typeof attendant.Attendant1_Picture === 'string') {
        const imageBuffer = Buffer.from(attendant.Attendant1_Picture, 'base64')
        const image = sharp(imageBuffer)
        const sotImagesDir = `public/images/attendants`
        // const sotImagesDir = join('public', 'images', 'attendants')
        console.log('🚀 ~ update ~ sotImagesDir:', sotImagesDir)
        try {
          await fs.stat(sotImagesDir)
        } catch (error) {
          if (error.code === 'ENOENT') {
            await fs.mkdir(sotImagesDir, { recursive: true })
          } else {
            throw error
          }
        }
        await image.png().toFile(`${sotImagesDir}/${attendant1PictureName}.png`)
        await trx
          .query()
          .from('Sot')
          .where('Id', params.id)
          .update('Attendant1_Picture', `${attendant1PictureName}.png`)
      }

      if (attendant2PictureName && typeof attendant.Attendant2_Picture === 'string') {
        const imageBuffer = Buffer.from(attendant.Attendant2_Picture, 'base64')
        const image = sharp(imageBuffer)
        const sotImagesDir = `public/images/attendants`
        // const sotImagesDir = join('public', 'images', 'attendants')
        console.log('🚀 ~ update ~ sotImagesDir:', sotImagesDir)
        try {
          await fs.stat(sotImagesDir)
        } catch (error) {
          if (error.code === 'ENOENT') {
            await fs.mkdir(sotImagesDir, { recursive: true })
          } else {
            throw error
          }
        }
        await image.png().toFile(`${sotImagesDir}/${attendant2PictureName}.png`)
        await trx
          .query()
          .from('Sot')
          .where('Id', params.id)
          .update('Attendant2_Picture', `${attendant2PictureName}.png`)
      }
      if (observer.ParticipantId.length > 0) {
        const observerParticipantIds = observer.ParticipantId
        const existingParticipants = await trx
          .query()
          .from('SotParticipant')
          .where('SotId', params.id)
          .select('ParticipantId')
        // Update atau insert SotParticipant
        const existingParticipantIds = new Set(
          existingParticipants.map((p: { ParticipantId: any }) => p.ParticipantId)
        )
        const participantsToInsert = observerParticipantIds.filter(
          (id: unknown) => !existingParticipantIds.has(id)
        )
        const participantsToUpdate = new Set(
          observerParticipantIds.filter((id: unknown) => existingParticipantIds.has(id))
        )

        if (participantsToInsert.length > 0) {
          await trx
            .insertQuery()
            .table('SotParticipant')
            .multiInsert(
              participantsToInsert.map((id: any) => ({
                SotId: params.id,
                VehicleCode: observer.VehicleCode,
                ParticipantId: id,
              }))
            )
        }

        if (participantsToUpdate.size > 0) {
          await trx
            .query()
            .from('SotParticipant')
            .whereIn('ParticipantId', Array.from(participantsToUpdate))
            .update('VehicleCode', observer.VehicleCode)
        }

        // Hapus ParticipantId yang tidak ada di observer.ParticipantId
        //Hapus dulu di table sotparticipantfinding

        const sotParticipantsToDelete = await trx
          .query()
          .from('SotParticipant')
          .where('SotId', params.id)
          .whereNotIn('ParticipantId', observerParticipantIds)
          .select('Id')

        for (const participant of sotParticipantsToDelete) {
          await trx
            .query()
            .from('SotParticipantFinding')
            .where('SotParticipantId', participant.Id)
            .del()
        }

        await trx
          .query()
          .from('SotParticipant')
          .where('SotId', params.id)
          .whereNotIn('ParticipantId', observerParticipantIds)
          .del()
      }

      await trx.commit()

      return response.status(200).json({ success: true })
    } catch (error) {
      console.error('Error updating SOT', error)
      await trx.rollback()
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const sot = await db.from('Sot').where('Id', params.id).first()

    if (!sot) {
      return response.status(404).json({ error: 'SOT not found' })
    }

    try {
      await db.from('SotParticipant').where('SotId', params.id).delete()
      await db.from('Sot').where('Id', params.id).delete()
      return response.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting SOT', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // async getObserverOptions({ request, response }: HttpContext) {
  //   const participants = await db
  //     .from('Participants')
  //     .select('Id', 'FullName')
  //     .
}
