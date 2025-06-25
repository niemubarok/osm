// Meeting seats data dummy
export const meetingSeatData = [
  // Meeting Room Layout with 20 seats
  {
    Id: 1,
    SeatNumber: 'A1',
    Row: 'A',
    Position: 1,
    IsOccupied: true,
    ParticipantId: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 2,
    SeatNumber: 'A2',
    Row: 'A',
    Position: 2,
    IsOccupied: true,
    ParticipantId: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 3,
    SeatNumber: 'A3',
    Row: 'A',
    Position: 3,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 4,
    SeatNumber: 'A4',
    Row: 'A',
    Position: 4,
    IsOccupied: true,
    ParticipantId: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 5,
    SeatNumber: 'A5',
    Row: 'A',
    Position: 5,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 6,
    SeatNumber: 'B1',
    Row: 'B',
    Position: 1,
    IsOccupied: true,
    ParticipantId: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 7,
    SeatNumber: 'B2',
    Row: 'B',
    Position: 2,
    IsOccupied: true,
    ParticipantId: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 8,
    SeatNumber: 'B3',
    Row: 'B',
    Position: 3,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 9,
    SeatNumber: 'B4',
    Row: 'B',
    Position: 4,
    IsOccupied: true,
    ParticipantId: 6,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 10,
    SeatNumber: 'B5',
    Row: 'B',
    Position: 5,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 11,
    SeatNumber: 'C1',
    Row: 'C',
    Position: 1,
    IsOccupied: true,
    ParticipantId: 7,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 12,
    SeatNumber: 'C2',
    Row: 'C',
    Position: 2,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 13,
    SeatNumber: 'C3',
    Row: 'C',
    Position: 3,
    IsOccupied: true,
    ParticipantId: 8,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 14,
    SeatNumber: 'C4',
    Row: 'C',
    Position: 4,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 15,
    SeatNumber: 'C5',
    Row: 'C',
    Position: 5,
    IsOccupied: true,
    ParticipantId: 9,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 16,
    SeatNumber: 'D1',
    Row: 'D',
    Position: 1,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 17,
    SeatNumber: 'D2',
    Row: 'D',
    Position: 2,
    IsOccupied: true,
    ParticipantId: 10,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 18,
    SeatNumber: 'D3',
    Row: 'D',
    Position: 3,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 19,
    SeatNumber: 'D4',
    Row: 'D',
    Position: 4,
    IsOccupied: true,
    ParticipantId: 11,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 20,
    SeatNumber: 'D5',
    Row: 'D',
    Position: 5,
    IsOccupied: false,
    ParticipantId: null,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Helper functions
export const getOccupiedSeats = () => {
  return meetingSeatData.filter(seat => seat.IsOccupied);
};

export const getAvailableSeats = () => {
  return meetingSeatData.filter(seat => !seat.IsOccupied);
};

export const getSeatByParticipantId = (participantId) => {
  return meetingSeatData.find(seat => seat.ParticipantId === participantId);
};

export const assignSeat = (seatId, participantId) => {
  const seatIndex = meetingSeatData.findIndex(seat => seat.Id === seatId);
  if (seatIndex !== -1 && !meetingSeatData[seatIndex].IsOccupied) {
    meetingSeatData[seatIndex].IsOccupied = true;
    meetingSeatData[seatIndex].ParticipantId = participantId;
    meetingSeatData[seatIndex].updated_at = new Date();
    return meetingSeatData[seatIndex];
  }
  return null;
};

export const releaseSeat = (seatId) => {
  const seatIndex = meetingSeatData.findIndex(seat => seat.Id === seatId);
  if (seatIndex !== -1) {
    meetingSeatData[seatIndex].IsOccupied = false;
    meetingSeatData[seatIndex].ParticipantId = null;
    meetingSeatData[seatIndex].updated_at = new Date();
    return meetingSeatData[seatIndex];
  }
  return null;
};
