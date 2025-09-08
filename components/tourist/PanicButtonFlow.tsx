import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/Button';

interface PanicButtonFlowProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PanicButtonFlow: React.FC<PanicButtonFlowProps> = ({
  isVisible,
  onClose
}) => {
  const [step, setStep] = useState<'trigger' | 'confirm' | 'success'>('trigger');
  const [countdown, setCountdown] = useState(5);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (step === 'confirm' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 'confirm' && countdown === 0) {
      setStep('success');
    }
  }, [step, countdown]);

  useEffect(() => {
    if (isVisible) {
      setStep('trigger');
      setCountdown(5);
    }
  }, [isVisible]);

  const handlePanicPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setStep('confirm');
  };

  const handleCancel = () => {
    setStep('trigger');
    setCountdown(5);
  };

  const handleClose = () => {
    setStep('trigger');
    setCountdown(5);
    onClose();
  };

  const renderTriggerStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Emergency Alert</Text>
        <Text style={styles.subtitle}>
          Tap the emergency button below to send an SOS alert
        </Text>

        <Animated.View style={[styles.panicButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity
            style={styles.panicButton}
            onPress={handlePanicPress}
            activeOpacity={0.8}
          >
            <Ionicons name="warning" size={64} color="#FFFFFF" />
            <Text style={styles.panicButtonText}>SOS</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.instructionText}>
          Tap to activate emergency alert
        </Text>
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.content}>
        <View style={styles.alertIcon}>
          <Ionicons name="warning" size={40} color="#DC2626" />
        </View>
        
        <Text style={styles.title}>Sending Emergency Alert</Text>
        <Text style={styles.subtitle}>
          Alert will be sent in {countdown} seconds
        </Text>

        <View style={styles.countdownContainer}>
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel Alert"
            onPress={handleCancel}
            variant="secondary"
            size="lg"
            style={styles.cancelButton}
          />
          
          <Text style={styles.warningText}>
            Police and emergency contacts will be notified
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.content}>
        <View style={[styles.alertIcon, { backgroundColor: '#DCFCE7' }]}>
          <Ionicons name="checkmark-circle" size={40} color="#10B981" />
        </View>
        
        <Text style={styles.title}>Help is on the way!</Text>
        <Text style={styles.subtitle}>
          Your emergency alert has been sent successfully
        </Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Alert sent to emergency services</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Emergency contact notified</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#2563EB' }]} />
            <Text style={styles.statusText}>Location shared with authorities</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Return to Safety Dashboard"
            onPress={handleClose}
            size="lg"
            style={styles.returnButton}
          />
          
          <Button
            title="Call Emergency Services"
            onPress={() => Alert.alert('Calling', 'Emergency services: 911')}
            variant="secondary"
            size="lg"
            style={styles.callButton}
          />
        </View>

        <Text style={styles.safetyText}>
          Stay calm and follow safety instructions from authorities
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'confirm':
        return renderConfirmStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderTriggerStep();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {renderCurrentStep()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    padding: 20,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  panicButtonContainer: {
    marginVertical: 20,
  },
  panicButton: {
    width: 200,
    height: 200,
    backgroundColor: '#DC2626',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  panicButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
  },
  alertIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#FEE2E2',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownContainer: {
    marginVertical: 30,
  },
  countdownCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    marginBottom: 10,
  },
  returnButton: {
    marginBottom: 10,
  },
  callButton: {
    marginBottom: 20,
  },
  warningText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 10,
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  safetyText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
