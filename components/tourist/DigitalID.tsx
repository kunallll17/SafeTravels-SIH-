import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tourist } from '../../types';

interface DigitalIDProps {
  tourist: Tourist;
  onContinue: () => void;
}

export const DigitalID: React.FC<DigitalIDProps> = ({ tourist, onContinue }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Digital Tourist ID</Text>
          <Text style={styles.subtitle}>Your official tourist identification card</Text>
        </View>

        {/* ID Card */}
        <Card style={styles.idCard}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.photoContainer}>
              {tourist.photo ? (
                <Image source={{ uri: tourist.photo }} style={styles.photo} />
              ) : (
                <Ionicons name="person" size={40} color="#FFFFFF" />
              )}
            </View>
            <View style={styles.basicInfo}>
              <Text style={styles.name}>{tourist.name}</Text>
              <View style={styles.nationalityContainer}>
                <Ionicons name="globe" size={16} color="#FFFFFF" />
                <Text style={styles.nationality}>{tourist.nationality}</Text>
              </View>
            </View>
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            {/* Tourist ID */}
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="person" size={16} color="#2563EB" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>TOURIST ID</Text>
                <Text style={styles.infoValue}>{tourist.id}</Text>
              </View>
            </View>

            {/* Trip Duration */}
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="calendar" size={16} color="#10B981" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>TRIP DURATION</Text>
                <Text style={styles.infoValue}>
                  {new Date(tourist.tripDuration.startDate).toLocaleDateString()} - {' '}
                  {new Date(tourist.tripDuration.endDate).toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Emergency Contact */}
            <View style={styles.infoRow}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="call" size={16} color="#DC2626" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>EMERGENCY CONTACT</Text>
                <Text style={styles.infoValue}>{tourist.emergencyContact.name}</Text>
                <Text style={styles.infoSubValue}>{tourist.emergencyContact.phone}</Text>
              </View>
            </View>

            {/* Current Location */}
            {tourist.currentLocation && (
              <View style={styles.infoRow}>
                <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
                  <Ionicons name="location" size={16} color="#7C3AED" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>CURRENT LOCATION</Text>
                  <Text style={styles.infoValue}>{tourist.currentLocation.address}</Text>
                </View>
              </View>
            )}

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <View style={styles.qrCodePlaceholder}>
                <Ionicons name="qr-code" size={64} color="#9CA3AF" />
              </View>
              <Text style={styles.qrLabel}>Scan for verification</Text>
              <Text style={styles.qrCode}>{tourist.qrCode}</Text>
            </View>
          </View>
        </Card>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue to Dashboard"
            onPress={onContinue}
            size="lg"
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF4FF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  idCard: {
    marginBottom: 30,
    padding: 0,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#2563EB',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nationalityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationality: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  cardBody: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoSubValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  qrContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  qrCodePlaceholder: {
    width: 96,
    height: 96,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  qrLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  qrCode: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    width: '100%',
  },
});
