# Database Seeding Guide

This directory contains comprehensive seeders for the OSM (Occupational Safety Management) system.

## Seeder Files (in dependency order):

1. **1_reference_data_seeder.ts**
   - Reference locations (8 locations)
   - CLSR categories (8 safety categories)
   - Companies (5 companies)
   - Vehicles (5 vehicles)

2. **2_users_seeder.ts**
   - System users (5 users)
   - Test credentials included

3. **3_meeting_seats_seeder.ts**
   - Meeting room seats (20 seats in A-D rows)

4. **4_participants_seeder.ts**
   - Event participants (15 people from various companies)

5. **5_participant_accommodations_seeder.ts**
   - Hotel and travel arrangements (7 external participants)

6. **6_participant_meeting_seats_seeder.ts**
   - Seat assignments for participants (15 assignments)

7. **7_participant_attendances_seeder.ts**
   - Check-in records for Day 1 and Day 2 (15 records)

8. **8_sots_seeder.ts**
   - Safety Observation Tours (8 SOTs across different locations)

9. **9_sot_participants_seeder.ts**
   - Participant assignments to SOT groups (21 assignments)

10. **10_sot_participant_findings_seeder.ts**
    - Safety findings and observations (17 findings, mix of safe/unsafe)

## Running Seeders

### Run all seeders:
```bash
node ace db:seed
```

### Run specific seeder:
```bash
node ace db:seed --files="1_reference_data_seeder.ts"
```

### Reset and reseed database:
```bash
node ace migration:rollback --batch=0
node ace migration:run
node ace db:seed
```

## Test User Credentials

- **Admin**: admin@sbi.co.id / password123
- **Safety Manager**: safety.manager@sbi.co.id / password123
- **HSE Coordinator**: hse.coordinator@sbi.co.id / password123
- **Plant Manager**: plant.manager@sbi.co.id / password123
- **Operations Supervisor**: ops.supervisor@sbi.co.id / password123

## Data Overview

The seeders create a realistic safety meeting scenario with:
- Multiple companies (SBI, SMIG, contractors, vendors)
- Comprehensive participant roster with contact details
- Meeting logistics (seats, accommodations, attendance)
- Safety observation tours across facility locations
- Realistic safety findings (both positive and areas for improvement)

## Notes

- All seeders respect foreign key constraints
- Timestamps are set to realistic dates (June 26-27, 2024)
- Data includes Indonesian company names and locations
- Safety findings cover all CLSR categories
- Vehicle assignments for transportation coordination
