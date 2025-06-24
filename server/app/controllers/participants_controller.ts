import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import CryptoJS from 'crypto-js'

const decryptUsername = (username: string | undefined | null): string | null => {
  if (!username) {
    return null
  }

  try {
    const userName = atob(username)
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined')
    }

    const decryptedUsername = CryptoJS.AES.decrypt(userName, secretKey).toString(CryptoJS.enc.Utf8)
    return decryptedUsername
  } catch (error) {
    console.error('🚀 ~ decryptUsername ~ error:', error)
    return null
  }
}

export default class ParticipantsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = Number(request.qs().page) || 1
    const limit = Number(request.qs().limit) || 100

    const participants = await db
      .from('Participant')
      .leftJoin('Company', 'Participant.CompanyId', 'Company.id')
      .leftJoin(
        'ParticipantAccomodation',
        'Participant.Id',
        'ParticipantAccomodation.ParticipantId'
      )
      .leftJoin('ParticipantMeetingSeat', 'Participant.Id', 'ParticipantMeetingSeat.ParticipantId')
      .leftJoin('MeetingSeat', 'ParticipantMeetingSeat.MeetingSeatId', 'MeetingSeat.Id')
      .leftJoin(
        'ParticipantAttendance',
        'Participant.Id',
        '=',
        'ParticipantAttendance.ParticipantId'
      )
      .leftJoin('Vehicle', 'ParticipantAccomodation.VehicleId', '=', 'Vehicle.Id')
      .select(
        'Participant.Id as ParticipantId',
        'Participant.FullName',
        'Participant.PositionName',
        'Participant.PhoneNumber',
        'Participant.Email',
        'Participant.UserName',
        'Participant.Unit',
        'Company.Name as CompanyName',
        'Company.id as CompanyId',
        'ParticipantAccomodation.VehicleId',
        'ParticipantAccomodation.Arrival_FlightName',
        'ParticipantAccomodation.Arrival_FlightDate',
        'ParticipantAccomodation.Arrival_PickupTime',
        'ParticipantAccomodation.Hotel_Name',
        'ParticipantAccomodation.Hotel_RoomNumber',
        'ParticipantAccomodation.Hotel_CheckInTime',
        'ParticipantAccomodation.Hotel_CheckOutTime',
        'ParticipantAccomodation.Departure_FlightName',
        'ParticipantAccomodation.Departure_FlightDate',
        'ParticipantAccomodation.Departure_PickupTime',
        'ParticipantMeetingSeat.MeetingSeatId',
        'MeetingSeat.SeatCode',
        'MeetingSeat.SeatPosition',
        'ParticipantAttendance.Day1',
        'ParticipantAttendance.Day2',
        'Vehicle.DriverName',
        'Vehicle.DriverPhone',
        'Vehicle.PlatNumber'
      )
      .orderBy('Participant.FullName', 'asc')
      .paginate(page, limit)

    // const meta = {
    //   total: participants.total,
    //   perPage: participants.perPage,
    //   currentPage: participants.currentPage,
    //   lastPage: participants.lastPage,
    // }
    // const nextPageUrl =
    //   participants.currentPage < participants.lastPage
    //     ? `${request.url()}?page=${participants.currentPage + 1}&limit=${limit}`
    //     : null

    console.log('🚀 ~ ParticipantsController ~ index ~ participants:', participants)
    return response.status(200).json(participants || [])
  }

  async searchParticipants({ request, response }: HttpContext) {
    const name = request.qs().name
    const participants = await db
      .from('Participant')
      .leftJoin('Company', 'Participant.CompanyId', 'Company.Id')
      .leftJoin(
        'ParticipantAccomodation',
        'Participant.Id',
        'ParticipantAccomodation.ParticipantId'
      )
      .leftJoin('ParticipantMeetingSeat', 'Participant.Id', 'ParticipantMeetingSeat.ParticipantId')
      .leftJoin('MeetingSeat', 'ParticipantMeetingSeat.MeetingSeatId', 'MeetingSeat.Id')
      .leftJoin('Vehicle', 'ParticipantAccomodation.VehicleId', '=', 'Vehicle.Id')
      .select(
        'participant.Id as ParticipantId',
        'participant.FullName',
        'participant.PositionName',
        'participant.PhoneNumber',
        'participant.Email',
        'participant.UserName',
        'participant.Unit',
        'Company.Name as CompanyName',
        'Company.id as CompanyId',
        'ParticipantAccomodation.VehicleId',
        'ParticipantAccomodation.Arrival_FlightName',
        'ParticipantAccomodation.Arrival_FlightDate',
        'ParticipantAccomodation.Arrival_PickupTime',
        'ParticipantAccomodation.Hotel_Name',
        'ParticipantAccomodation.Hotel_RoomNumber',
        'ParticipantAccomodation.Hotel_CheckInTime',
        'ParticipantAccomodation.Hotel_CheckOutTime',
        'ParticipantAccomodation.Departure_FlightName',
        'ParticipantAccomodation.Departure_FlightDate',
        'ParticipantAccomodation.Departure_PickupTime',
        'ParticipantMeetingSeat.MeetingSeatId',
        'MeetingSeat.SeatCode',
        'MeetingSeat.SeatPosition',
        'Vehicle.*'
      )
      .whereRaw(`LOWER(Participant.FullName) LIKE '%${name?.toLowerCase()}%'`)
      .orderBy('Participant.Id', 'asc')
    // .paginate(1, 10)
    return response.status(200).json({ data: participants } || [])
  }

  async showById({ params }: HttpContext) {
    const participant = await db
      .from('Participant as p')
      .innerJoin('Company', 'p.CompanyId', '=', 'Company.id')
      .innerJoin('ParticipantAccomodation', 'p.Id', '=', 'ParticipantAccomodation.ParticipantId')
      .innerJoin('ParticipantMeetingSeat', 'ParticipantMeetingSeat.ParticipantId', '=', 'p.Id')
      .innerJoin('MeetingSeat', 'ParticipantMeetingSeat.MeetingSeatId', '=', 'MeetingSeat.Id')
      .select('p.*')
      .select('Company.Name as CompanyName')
      .select('ParticipantAccomodation.*')
      .select('MeetingSeat.*')
      .where('p.Id', params.id)
      .first()
    return participant
  }
  async showByUserName({ request, response }: HttpContext) {
    const username = decryptUsername(request.body().username)
    if (username === null || username === undefined) {
      // Handle the case where username is null or undefined
      // For example, you could return an error response or throw an exception
      return response.status(400).json({ error: 'Invalid username' })
    }
    console.log('🚀 ~ ParticipantsController ~ showByUserName ~ username:', username)
    // return username
    const participant = await db
      .from('Participant as p')
      .innerJoin('Company', 'p.CompanyId', '=', 'Company.id')
      .leftJoin('ParticipantAccomodation', 'p.Id', '=', 'ParticipantAccomodation.ParticipantId')
      .leftJoin('ParticipantMeetingSeat', 'p.Id', '=', 'ParticipantMeetingSeat.ParticipantId')
      .leftJoin('MeetingSeat', 'ParticipantMeetingSeat.MeetingSeatId', '=', 'MeetingSeat.Id')
      .leftJoin('ParticipantAttendance', 'p.Id', '=', 'ParticipantAttendance.ParticipantId')
      .leftJoin('Vehicle', 'ParticipantAccomodation.VehicleId', '=', 'Vehicle.Id')
      .select(
        'p.Id as ParticipantId',
        'p.FullName',
        'p.PositionName',
        'p.PhoneNumber',
        'p.Email',
        'p.UserName',
        'p.Unit',
        'Company.Name as CompanyName',
        'Company.id as CompanyId',
        'ParticipantAccomodation.VehicleId',
        'ParticipantAccomodation.Arrival_FlightName',
        'ParticipantAccomodation.Arrival_FlightDate',
        'ParticipantAccomodation.Arrival_PickupTime',
        'ParticipantAccomodation.Hotel_Name',
        'ParticipantAccomodation.Hotel_RoomNumber',
        'ParticipantAccomodation.Hotel_CheckInTime',
        'ParticipantAccomodation.Hotel_CheckOutTime',
        'ParticipantAccomodation.Departure_FlightName',
        'ParticipantAccomodation.Departure_FlightDate',
        'ParticipantAccomodation.Departure_PickupTime',
        'Vehicle.*',
        'ParticipantMeetingSeat.MeetingSeatId',
        'MeetingSeat.SeatCode',
        'MeetingSeat.SeatPosition'
        // 'ParticipantAttendance.Day1',
        // 'ParticipantAttendance.Day2'
      )
      .where('p.UserName', username.toUpperCase())
      .first()
    console.log('🚀 ~ ParticipantsController ~ showByUserName ~ participant:', participant)
    response.status(200).json(participant)
  }

  async store({ request, response }: HttpContext) {
    const { participant, MeetingSeatId, VehicleId, accomodations } = request.body()
    console.log('🚀 ~ ParticipantsController ~ store ~ VehicleId:', VehicleId)

    if (
      !participant ||
      Object.values(participant).some(
        (value) => value === undefined || value === null || value === ''
      )
    ) {
      return response.status(400).json({ error: 'All fields in participant object are required' })
    }

    const trx = await db.transaction()

    try {
      const participantInsert = await trx.table('Participant').returning('id').insert(participant)
      if (VehicleId) {
        await trx.table('ParticipantAccomodation').insert({
          ParticipantId: participantInsert[0].id,
          VehicleId,
          ...accomodations,
        })
      }
      if (MeetingSeatId) {
        await trx.table('ParticipantMeetingSeat').insert({
          ParticipantId: participantInsert[0].id,
          MeetingSeatId,
        })
      }
      await trx.commit()
      console.log('🚀 ~ ParticipantsController ~ store ~ participantInsert:', participantInsert)
      response.status(200).json(participantInsert)
    } catch (error) {
      console.error('Error inserting participant', error)
      await trx.rollback()
      return response.status(500).json({ error: 'Error inserting participant' })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    const participant = await db.from('Participant').where('id', params.id).firstOrFail()

    return participant
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    console.log('🚀 ~ ParticipantsController ~ update ~ params:', params)
    // const participant = await db.from('Participant').where('id', params.id).firstOrFail()
    const data = request.body()
    console.log('🚀 ~ ParticipantsController ~ update ~ data:', data)
    const Participants = {
      FullName: data?.participant?.FullName,
      PositionName: data?.participant?.PositionName,
      PhoneNumber: data?.participant?.PhoneNumber,
      Email: data?.participant?.Email,
      UserName: data?.participant?.UserName,
      Unit: data?.participant?.Unit,
      CompanyId: Array.isArray(data?.participant?.Company?.id)
        ? data?.participant?.Company?.id[0]
        : data?.participant?.Company?.id,
    }

    const ParticipantAccomodation = {
      ParticipantId: params.id,
      VehicleId: data?.Vehicle?.Id || 26,
      Arrival_FlightName: data?.accomodations?.Arrival_FlightName,
      Arrival_FlightDate: data?.accomodations?.Arrival_FlightDate,
      Arrival_PickupTime: data?.accomodations?.Arrival_PickupTime,
      Hotel_Name: data?.accomodations?.Hotel_Name,
      Hotel_RoomNumber: data?.accomodations?.Hotel_RoomNumber,
      Hotel_CheckInTime: data?.accomodations?.Hotel_CheckInTime,
      Hotel_CheckOutTime: data?.accomodations?.Hotel_CheckOutTime,
      Departure_FlightName: data?.accomodations?.Departure_FlightName,
      Departure_FlightDate: data?.accomodations?.Departure_FlightDate,
      Departure_PickupTime: data?.accomodations?.Departure_PickupTime,
    }
    console.log(
      '🚀 ~ ParticipantsController ~ update ~ ParticipantAccomodation:',
      ParticipantAccomodation
    )

    const ParticipantMeetingSeat = {
      ParticipantId: params.id,
      MeetingSeatId: data?.MeetingSeat.Id,
    }
    console.log(
      '🚀 ~ ParticipantsController ~ update ~ ParticipantMeetingSeat:',
      ParticipantMeetingSeat
    )

    const trx = await db.transaction({
      isolationLevel: 'serializable',
    })
    try {
      await trx.from('Participant').where('id', params.id).update(Participants)
      const participantAccomodationExist = await trx
        .from('ParticipantAccomodation')
        .where('ParticipantId', params.id)
        .first()

      if (participantAccomodationExist) {
        await trx
          .from('ParticipantAccomodation')
          .where('ParticipantId', params.id)
          .update(ParticipantAccomodation)
      } else if (data.accomodations) {
        await trx.table('ParticipantAccomodation').insert(ParticipantAccomodation)
      }

      const participantMeetingSeatExist = await trx
        .from('ParticipantMeetingSeat')
        .where('ParticipantId', params.id)
        .first()
      console.log(
        '🚀 ~ ParticipantsController ~ update ~ participantMeetingSeatExist:',
        participantMeetingSeatExist
      )

      if (participantMeetingSeatExist) {
        console.log('🚀 ~ ParticipantsController ~ update ~ participantMeetingSeatExist:')
        await trx
          .from('ParticipantMeetingSeat')
          .where('ParticipantId', params.id)
          .update(ParticipantMeetingSeat)
      } else if (ParticipantMeetingSeat.MeetingSeatId) {
        console.log('🚀 ~ ParticipantsController ~ INSERT ~ participantMeetingSeatExist:')
        await trx.table('ParticipantMeetingSeat').insert(ParticipantMeetingSeat)
      }
      await trx.commit()

      return await db.from('Participant').where('id', params.id).first()
    } catch (error) {
      console.error('Error updating participant', error)
      throw error
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const id = Array.isArray(params.id) ? Number.parseInt(params.id[0]) : Number.parseInt(params.id)
    if (Number.isNaN(id)) {
      throw new Error('Invalid id')
    }
    console.log('🚀 ~ ParticipantsController ~ destroy ~ id:', id)
    let participant: any
    try {
      participant = await db.from('Participant').where('id', id).firstOrFail()
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        throw new Error(`Participant with id ${id} not found`)
      }
      throw error
    }
    try {
      await db.transaction(async (trx) => {
        try {
          await trx.from('ParticipantMeetingSeat').where('ParticipantId', id).del()
        } catch (error) {
          if (error.code === '23503') {
            throw new Error(`Participant with id ${id} still has meeting seat`)
          }
          throw error
        }
        try {
          await trx.from('ParticipantAccomodation').where('ParticipantId', id).del()
        } catch (error) {
          if (error.code === '23503') {
            throw new Error(`Participant with id ${id} still has accomodation`)
          }
          throw error
        }
        await trx.from('Participant').where('id', id).del()
      })
    } catch (error) {
      throw new Error(`Error deleting participant with id ${id}`)
    }
    return participant
  }
}
