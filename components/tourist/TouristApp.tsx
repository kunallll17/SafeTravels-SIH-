import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AuthWrapper } from '../auth/AuthWrapper';
import { OnboardingWelcome } from './OnboardingWelcome';
import { DigitalID } from './DigitalID';
import { HomeDashboard } from './HomeDashboard';
import { GeofencingAlert } from './GeofencingAlert';
import { PanicButtonFlow } from './PanicButtonFlow';
import { mockCurrentTourist, mockSafetyZones } from '../../data/mockData';

type AppStep = 'auth' | 'welcome' | 'digitalId' | 'dashboard';

export const TouristApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('auth');
  const [showGeofenceAlert, setShowGeofenceAlert] = useState(false);
  const [showPanicFlow, setShowPanicFlow] = useState(false);
  
  const currentTourist = mockCurrentTourist;
  const restrictedZone = mockSafetyZones.find(zone => zone.type === 'restricted') || mockSafetyZones[0];

  const handleAuthenticated = () => {
    console.log('TouristApp: User authenticated, moving to welcome screen');
    setCurrentStep('welcome');
  };

  const handleLogout = () => {
    console.log('TouristApp: User logged out, returning to auth');
    setCurrentStep('auth');
  };

  const handleWelcomeContinue = () => {
    setCurrentStep('digitalId');
  };

  const handleDigitalIdContinue = () => {
    setCurrentStep('dashboard');
    // Simulate geofence alert after 3 seconds
    setTimeout(() => {
      setShowGeofenceAlert(true);
    }, 3000);
  };

  const handlePanicAlert = () => {
    setShowPanicFlow(true);
  };

  const handleCallPolice = () => {
    Alert.alert(
      'Emergency Call',
      'Calling police: 100',
      [{ text: 'OK' }]
    );
  };

  const handleCallEmergency = () => {
    Alert.alert(
      'Emergency Contact',
      `Calling ${currentTourist.emergencyContact.name}: ${currentTourist.emergencyContact.phone}`,
      [{ text: 'OK' }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Tourist Support',
      'Contacting tourist support: 1800-111-363',
      [{ text: 'OK' }]
    );
  };

  switch (currentStep) {
    case 'auth':
      return <AuthWrapper onAuthenticated={handleAuthenticated} />;
      
    case 'welcome':
      return <OnboardingWelcome onContinue={handleWelcomeContinue} />;
    
    case 'digitalId':
      return (
        <>
          <DigitalID 
            tourist={currentTourist}
            onContinue={handleDigitalIdContinue}
          />
        </>
      );
    
    case 'dashboard':
      return (
        <>
          <HomeDashboard
            tourist={currentTourist}
            onPanicAlert={handlePanicAlert}
            onCallPolice={handleCallPolice}
            onCallEmergency={handleCallEmergency}
            onLogout={handleLogout}
          />

          <GeofencingAlert
            isVisible={showGeofenceAlert}
            onClose={() => setShowGeofenceAlert(false)}
            onContactSupport={handleContactSupport}
            zone={restrictedZone}
          />

          <PanicButtonFlow
            isVisible={showPanicFlow}
            onClose={() => setShowPanicFlow(false)}
          />
        </>
      );
    
    default:
      return <OnboardingWelcome onContinue={handleWelcomeContinue} />;
  }
};
