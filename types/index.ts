export interface Tourist {
  id: string;
  name: string;
  nationality: string;
  photo?: string;
  tripDuration: {
    startDate: string;
    endDate: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  safetyScore: number;
  isActive: boolean;
  qrCode: string;
}

export interface Alert {
  id: string;
  touristId: string;
  type: 'panic' | 'geofence' | 'emergency';
  message: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  status: 'active' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'safe' | 'caution' | 'restricted' | 'danger';
  coordinates: Array<{lat: number; lng: number}>;
  description: string;
  alertMessage?: string;
}

export interface TouristSettings {
  familyTracking: boolean;
  notifications: boolean;
  language: 'en' | 'hi';
}
