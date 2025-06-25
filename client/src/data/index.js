// Export semua data dummy
export { clsrData, locationData, companyData, vehicleData } from './reference-data.js';
export { userData } from './users-data.js';
export { participantData } from './participants-data.js';
export { sotData } from './sot-data.js';
export { sotParticipantFindingsData } from './sot-findings-data.js';
export { 
  attendanceData, 
  getAttendanceByParticipantId, 
  getCheckedInDay1, 
  getCheckedInDay2, 
  getTotalCheckedIn 
} from './attendance-data.js';
export {
  meetingSeatData,
  getOccupiedSeats,
  getAvailableSeats,
  getSeatByParticipantId,
  assignSeat,
  releaseSeat
} from './meeting-seat-data.js';

// Import data untuk helper functions
import { companyData } from './reference-data.js';
import { locationData } from './reference-data.js';
import { clsrData } from './reference-data.js';
import { participantData } from './participants-data.js';
import { sotData } from './sot-data.js';
import { sotParticipantFindingsData } from './sot-findings-data.js';

// Helper functions untuk mencari data
export const findCompanyById = (id) => {
  return companyData.find(company => company.id === id);
};

export const findLocationById = (id) => {
  return locationData.find(location => location.Id === id);
};

export const findClsrById = (id) => {
  return clsrData.find(clsr => clsr.Id === id);
};

export const findParticipantById = (id) => {
  return participantData.find(participant => participant.Id === id);
};

export const getSotsByLocation = (locationId) => {
  return sotData.filter(sot => sot.ZRef_LocationId === locationId);
};

export const getFindingsBySot = (sotId) => {
  return sotParticipantFindingsData.filter(finding => finding.SotParticipantId === sotId);
};

export const getSafeFindings = () => {
  return sotParticipantFindingsData.filter(finding => finding.IsSafe === true);
};

export const getUnsafeFindings = () => {
  return sotParticipantFindingsData.filter(finding => finding.IsSafe === false);
};

export const getFindingsByClsr = (clsrId) => {
  return sotParticipantFindingsData.filter(finding => finding.ZRef_ClsrId === clsrId);
};
