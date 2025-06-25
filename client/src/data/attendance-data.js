// Attendance data dummy - menggunakan participant data sebagai base
import { participantData } from './participants-data.js';

// Generate attendance data berdasarkan participant data
export const attendanceData = participantData.map((participant, index) => {
  // Simulate some participants checked in on different days
  const hasDay1 = Math.random() > 0.2; // 80% chance checked in day 1
  const hasDay2 = Math.random() > 0.3; // 70% chance checked in day 2
  
  return {
    Id: participant.Id,
    ParticipantId: participant.Id,
    FullName: participant.FullName,
    CompanyId: participant.CompanyId,
    Day1: hasDay1 ? new Date('2024-06-26 08:00:00') : null,
    Day2: hasDay2 ? new Date('2024-06-27 08:00:00') : null,
    created_at: new Date(),
    updated_at: new Date()
  };
});

// Helper functions
export const getAttendanceByParticipantId = (participantId) => {
  return attendanceData.find(attendance => attendance.ParticipantId === participantId);
};

export const getCheckedInDay1 = () => {
  return attendanceData.filter(attendance => attendance.Day1 !== null);
};

export const getCheckedInDay2 = () => {
  return attendanceData.filter(attendance => attendance.Day2 !== null);
};

export const getTotalCheckedIn = () => {
  return {
    Day1: getCheckedInDay1().length,
    Day2: getCheckedInDay2().length
  };
};
