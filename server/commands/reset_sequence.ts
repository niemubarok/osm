import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class ResetSequence extends BaseCommand {
  static commandName = 'check:data'
  static description = 'Check database data'

  static options: CommandOptions = {}

  async run() {
    try {
      const findings = await db.from('SotParticipantFinding').count('* as total').first();
      this.logger.info(`Total SotParticipantFinding: ${findings?.total || 0}`);
      
      const participants = await db.from('Participant').count('* as total').first();
      this.logger.info(`Total Participants: ${participants?.total || 0}`);
      
      const users = await db.from('users').count('* as total').first();
      this.logger.info(`Total Users: ${users?.total || 0}`);
      
      // Check some sample participants
      const sampleParticipants = await db.from('Participant').select('Id', 'FullName', 'Email', 'UserName').limit(3);
      this.logger.info('Sample participants:', sampleParticipants);
      
      // Check some sample users
      const sampleUsers = await db.from('users').select('id', 'fullName', 'email').limit(3);
      this.logger.info('Sample users:', sampleUsers);
      
    } catch (error) {
      this.logger.error('Error:', error.message);
    }
  }
}