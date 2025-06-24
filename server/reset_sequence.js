import db from '@adonisjs/lucid/services/db'

async function resetSequence() {
  try {
    // Check current max ID
    const result = await db.from('SotParticipantFinding').max('Id as maxId').first();
    console.log('Current max ID:', result?.maxId || 0);
    
    // Reset sequence
    const newSeqVal = (result?.maxId || 0) + 1;
    await db.raw(`SELECT setval(pg_get_serial_sequence('"SotParticipantFinding"', 'Id'), ${newSeqVal})`);
    console.log('Sequence reset to:', newSeqVal);
    
    await db.manager.closeAll()
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetSequence();
