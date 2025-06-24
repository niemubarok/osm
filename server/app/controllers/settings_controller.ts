import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { promises as fs } from 'node:fs'

export default class SettingsController {
  async updateMeetingDate({ request, response }: HttpContext) {
    const meetingDate = request.body().meetingDate
    const update = await db
      .from('_Setting')
      .update({ Day1: meetingDate.Day1, Day2: meetingDate.Day2 })
      .where('id', 1)

    response.status(200).json({ message: 'Meeting Date updated successfully', update })
  }

  async getMeetingDate({ response }: HttpContext) {
    const meetingDate = await db.from('_Setting').select('Day1', 'Day2').where('id', 1).first()
    response.status(200).json({ message: 'Meeting Date fetched successfully', meetingDate })
  }

  async getAvailableMeetingSeats({ response }: HttpContext) {
    const meetingSeats = await db
      .from('MeetingSeat')
      .select('*')
      .whereNotExists(
        db
          .from('ParticipantMeetingSeat')
          .select('MeetingSeatId')
          .whereRaw('MeetingSeatId = MeetingSeat.Id')
      )
    response.status(200).json({ message: 'Meeting Seat fetched successfully', meetingSeats })
  }

  async addMeetingSeat({ request, response }: HttpContext) {
    const meetingSeat = request.body()
    const insert = await db.table('MeetingSeat').insert({
      SeatCode: meetingSeat.SeatCode,
      SeatPosition: db.raw('CONVERT(varbinary(max), ?)', meetingSeat.SeatPosition),
    })

    response.status(200).json({ message: 'Meeting Seat created successfully', insert })
  }

  async getCompanies({ response }: HttpContext) {
    const companies = await db.from('Company').select('id', 'Code', 'Name')
    response.status(200).json({ message: 'Companies fetched successfully', companies })
  }

  async addCompany({ request, response }: HttpContext) {
    const company = request.body()
    const insert = await db.table('Company').insert(company)
    response.status(200).json({ message: 'Company created successfully', insert })
  }

  async getVehicles({ response }: HttpContext) {
    const vehicles = await db.from('Vehicle').select('*')
    response.status(200).json({ message: 'Vehicle Details fetched successfully', vehicles })
  }

  async addVehicle({ request, response }: HttpContext) {
    const vehicle = request.body()
    if (!vehicle) {
      return response.status(400).json({ error: 'Vehicle data is required' })
    }

    try {
      const insert = await db.table('Vehicle').insert(vehicle)
      response.status(200).json({ message: 'Vehicle created successfully', insert })
    } catch (error) {
      console.error('Error inserting vehicle', error)
      return response.status(500).json({ error: 'Error inserting vehicle' })
    }
  }

  async updateVehicle({ params, request, response }: HttpContext) {
    const vehicle = request.body()
    const id = decodeURIComponent(params.id)

    if (!vehicle) {
      return response.status(400).json({ error: 'Vehicle data is required' })
    }

    try {
      const update = await db.from('Vehicle').update(vehicle).where('id', id)
      response.status(200).json({ message: 'Vehicle updated successfully', update })
    } catch (error) {
      console.error('Error updating vehicle', error)
      return response.status(500).json({ error: 'Error updating vehicle' })
    }
  }

  async deleteVehicle({ params, response }: HttpContext) {
    const id = decodeURIComponent(params.id)
    try {
      const deleteVehicle = await db.from('Vehicle').where('id', id).delete()
      response.status(200).json({ message: 'Vehicle deleted successfully', deleteVehicle })
    } catch (error) {
      console.error('Error deleting vehicle', error.message)
      if (error.message.includes('FK_ParticipantAccomodation_Vehicle')) {
        console.log(
          "🚀 ~ SettingsController ~ deleteVehicle ~ error.code === 'SQLITE_CONSTRAINT':",
          error.message.includes('FK_ParticipantAccomodation_Vehicle')
        )
        return response.status(200).json({ error: 'Vehicle in use cannot be deleted' })
      }
      return response.status(500).json({ error: 'Error deleting vehicle' })
    }
  }

  async getLocations({ response }: HttpContext) {
    const locations = await db.from('ZRef_Location').select('*')
    const locationsWithImage = await Promise.all(
      locations.map(async (location: { Id: { toString: () => string }; Code: any }) => {
        let images: string[] = []
        try {
          images = await fs.readdir(`public/images/maps/`)
        } catch (error) {
          console.error('🚀 ~ SettingsController ~ maps.map ~ error:', error)
        }
        const imageFileNames = images
          .filter((image) => image.startsWith(location.Id.toString()))
          .map((image) => image.replace('.png', ''))
        if (imageFileNames.length > 0) {
          const imageBuffer = await fs.readFile(`public/images/maps/${imageFileNames[0]}.png`)
          const imageBase64 = imageBuffer.toString('base64')
          return { ...location, ImageData: imageBase64 || null }
        }
        return { ...location, ImageData: null }
      })
    )
    response.status(200).json({ message: 'Locations fetched successfully', locationsWithImage })
  }
}
