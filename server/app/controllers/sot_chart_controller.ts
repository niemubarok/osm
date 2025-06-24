import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SotChartController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const observationType = await db
      .from('SotParticipantFinding')
      .select(db.raw('count(*) as count'), 'IsSafe')
      .groupBy('IsSafe')

    // Handle case when no data exists
    const totalSafe = observationType.find(item => item.IsSafe === true)?.count || 0
    const totalUnsafe = observationType.find(item => item.IsSafe === false)?.count || 0
    const totalFindings = Number(totalSafe) + Number(totalUnsafe)

    const observationTypePerLocation = await db
      .from('SotParticipantFinding')
      .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
      .leftJoin('Sot', 'SotParticipant.SotId', 'Sot.Id')
      .leftJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
      .select('Zref_Location.Name as Name', db.raw('count(*) as NumberOfFindings'))
      .groupBy('Zref_Location.Name')
      
    const numberOfFindingsPerLocation = await db
      .from('SotParticipantFinding')
      .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
      .leftJoin('Sot', 'SotParticipant.SotId', 'Sot.Id')
      .leftJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
      .select('Zref_Location.Name as Name', db.raw('count(*) as NumberOfFindings'))
      .groupBy('Zref_Location.Name')
      
    const numberOfFindingsPerObserver = await db
      .from('SotParticipantFinding')
      .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
      .leftJoin('Participant', 'SotParticipant.ParticipantId', 'Participant.Id')
      .select('Participant.FullName as ObserverName', db.raw('count(*) as NumberOfFindings'))
      .groupBy('Participant.FullName')

    const numberOfFindingsPerClsr = await db
      .from('SotParticipantFinding')
      .leftJoin('SotParticipant', 'SotParticipantFinding.SotParticipantId', 'SotParticipant.Id')
      .leftJoin('Sot', 'SotParticipant.SotId', 'Sot.Id')
      .leftJoin('Zref_Location', 'Sot.ZRef_LocationId', 'Zref_Location.Id')
      .leftJoin('ZRef_Clsr', 'SotParticipantFinding.ZRef_ClsrId', 'ZRef_Clsr.Id')
      .select('ZRef_Clsr.Name as ClsrName', db.raw('count(*) as NumberOfFindings'))
      .groupBy('ZRef_Clsr.Name')

    const sotCharts = {
      totalSafe,
      totalUnsafe,
      totalFindings,
      observationTypePerLocation,
      numberOfFindingsPerLocation,
      numberOfFindingsPerObserver,
      numberOfFindingsPerClsr,
    }

    return response.json(sotCharts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
