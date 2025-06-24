import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AttendancesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const attendances = await db
      .from('Participant')
      .leftJoin('ParticipantAttendance', 'Participant.Id', 'ParticipantAttendance.ParticipantId')
      .leftJoin('Company', 'Participant.CompanyId', 'Company.id')
      .select('*')
    return response.json(attendances)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.body()
    if (!data.ParticipantId) {
      return response.status(400).json({ error: 'ParticipantId is required' })
    }

    const attendance = await db
      .from('ParticipantAttendance')
      .where('participantId', data.ParticipantId)
      .first()
    if (attendance) {
      try {
        await db
          .from('ParticipantAttendance')
          .where('ParticipantId', data.ParticipantId)
          .update(data)
      } catch (error) {
        console.error('Error updating attendance', error)
        return response.status(500).json({ error: 'Error updating attendance' })
      }
    } else {
      try {
        await db.table('ParticipantAttendance').insert(data)
      } catch (error) {
        console.error('Error inserting attendance', error)
        return response.status(500).json({ error: 'Error inserting attendance' })
      }
    }
    response.status(201).json(data)
  }

  /**
   * Show individual record
   */
  async showAttendanceById({ params, response }: HttpContext) {
    const meetingDate = await db.from('_Setting').select('Day1', 'Day2').where('id', 1).first()
    const meetingDay1 = meetingDate.Day1
    const meetingDay2 = meetingDate.Day2
    const participantId = Number.parseInt(params.id)

    const attendance = await db
      .from('ParticipantAttendance')
      .select('*')
      .where('ParticipantId', participantId)
      // .andWhere((query) => {
      //   query
      //     .whereRaw(`YEAR(Day1) = ${new Date(meetingDate.Day1).getFullYear()}`)
      //     .andWhereRaw(`MONTH(Day1) = ${new Date(meetingDate.Day1).getMonth() + 1}`)
      //     .andWhereRaw(`YEAR(Day2) = ${new Date(meetingDate.Day1).getFullYear()}`)
      //     .andWhereRaw(`MONTH(Day2) = ${new Date(meetingDate.Day1).getMonth() + 1}`)
      // })
      .andWhere((query) => {
        query
          .whereRaw(
            `YEAR(Day1) = '${meetingDay1.getFullYear()}' AND MONTH(Day1) = '${meetingDay1.getMonth() + 1}' `
          )
          .orWhereRaw(
            `YEAR(Day2) = '${meetingDay2.getFullYear()}' AND MONTH(Day2) = '${meetingDay2.getMonth() + 1}'`
          )
      })
      .first()
    response.status(200).json(attendance)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
