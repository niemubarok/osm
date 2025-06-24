import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MeetingSeatsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const MeetingSeats = await db
      .from('MeetingSeat')
      .select(
        'MeetingSeat.Id',
        'MeetingSeat.SeatCode',
        'MeetingSeat.SeatPosition',
        'Participant.Id as ParticipantId',
        'Participant.FullName as ParticipantName'
      )
      .join('ParticipantMeetingSeat', 'MeetingSeat.Id', 'ParticipantMeetingSeat.MeetingSeatId')
      .join('Participant', 'ParticipantMeetingSeat.ParticipantId', 'Participant.Id')
    console.log('🚀 ~ MeetingSeatsController ~ index ~ MeetingSeats:', MeetingSeats)
    return response.json(MeetingSeats)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
