import { Tourist, Alert, SafetyZone } from '../types';

export const mockTourists: Tourist[] = [
  {
    id: '1',
    name: 'John Smith',
    nationality: 'USA',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    tripDuration: {
      startDate: '2024-01-15',
      endDate: '2024-01-25'
    },
    emergencyContact: {
      name: 'Jane Smith',
      phone: '+1-555-0123',
      relationship: 'Spouse'
    },
    currentLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'India Gate, New Delhi'
    },
    safetyScore: 85,
    isActive: true,
    qrCode: 'QR_TOURIST_001'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    nationality: 'UK',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    tripDuration: {
      startDate: '2024-01-10',
      endDate: '2024-01-20'
    },
    emergencyContact: {
      name: 'Robert Johnson',
      phone: '+44-20-7946-0958',
      relationship: 'Father'
    },
    currentLocation: {
      lat: 27.1751,
      lng: 78.0421,
      address: 'Taj Mahal, Agra'
    },
    safetyScore: 92,
    isActive: true,
    qrCode: 'QR_TOURIST_002'
  }
];

export const mockSafetyZones: SafetyZone[] = [
  {
    id: 'zone_1',
    name: 'Tourist Safe Zone - India Gate',
    type: 'safe',
    coordinates: [
      { lat: 28.6129, lng: 77.2080 },
      { lat: 28.6149, lng: 77.2080 },
      { lat: 28.6149, lng: 77.2100 },
      { lat: 28.6129, lng: 77.2100 }
    ],
    description: 'Well-patrolled tourist area with security presence'
  },
  {
    id: 'zone_2',
    name: 'Restricted Area - Construction Site',
    type: 'restricted',
    coordinates: [
      { lat: 28.6100, lng: 77.2050 },
      { lat: 28.6110, lng: 77.2050 },
      { lat: 28.6110, lng: 77.2070 },
      { lat: 28.6100, lng: 77.2070 }
    ],
    description: 'Construction zone - entry prohibited',
    alertMessage: 'You are entering a restricted construction area. Please turn back immediately.'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert_1',
    touristId: '1',
    type: 'panic',
    message: 'Emergency assistance requested by tourist',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'India Gate, New Delhi'
    },
    timestamp: '2024-01-16T14:30:00Z',
    status: 'active',
    severity: 'high'
  }
];

// Current user tourist data
export const mockCurrentTourist: Tourist = mockTourists[0];
