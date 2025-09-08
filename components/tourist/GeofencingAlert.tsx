import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/Button';
import { SafetyZone } from '../../types';

interface GeofencingAlertProps {
  isVisible: boolean;
  onClose: () => void;
  onContactSupport: () => void;
  zone: SafetyZone;
}

export const GeofencingAlert: React.FC<GeofencingAlertProps> = ({
  isVisible,
  onClose,
  onContactSupport,
  zone
}) => {
  const getZoneColor = (type: string) => {
    switch (type) {
      case 'danger':
        return '#DC2626';
      case 'restricted':
        return '#EA580C';
      case 'caution':
        return '#D97706';
      default:
        return '#2563EB';
    }
  };

  const getZoneIcon = (type: string): any => {
    switch (type) {
      case 'danger':
      case 'restricted':
        return 'warning';
      default:
        return 'location';
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'danger':
        return 'DANGER ZONE ALERT';
      case 'restricted':
        return 'RESTRICTED AREA';
      case 'caution':
        return 'CAUTION REQUIRED';
      default:
        return 'ZONE NOTIFICATION';
    }
  };

  const getSafetyGuidelines = (type: string) => {
    switch (type) {
      case 'danger':
        return [
          'Avoid this area if possible',
          'Stay with groups if you must pass through',
          'Keep emergency contacts ready'
        ];
      case 'restricted':
        return [
          'Entry may be prohibited',
          'Check with local authorities',
          'Have proper documentation ready'
        ];
      case 'caution':
        return [
          'Exercise increased vigilance',
          'Stay aware of your surroundings',
          'Avoid displaying valuables'
        ];
      default:
        return ['Follow local guidelines'];
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: getZoneColor(zone.type) }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Ionicons
                name={getZoneIcon(zone.type)}
                size={64}
                color="#FFFFFF"
              />
              <Text style={styles.alertTitle}>
                {getAlertTitle(zone.type)}
              </Text>
              <Text style={styles.zoneName}>
                {zone.name}
              </Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                {zone.alertMessage || zone.description}
              </Text>
            </View>

            {/* Zone Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailHeader}>
                <View style={styles.detailIcon}>
                  <Ionicons name="location" size={16} color="#2563EB" />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Zone Type</Text>
                  <Text style={styles.detailValue}>{zone.type.charAt(0).toUpperCase() + zone.type.slice(1)}</Text>
                </View>
              </View>
              
              <View style={styles.guidelinesContainer}>
                <Text style={styles.guidelinesTitle}>Safety Guidelines:</Text>
                {getSafetyGuidelines(zone.type).map((guideline, index) => (
                  <View key={index} style={styles.guidelineItem}>
                    <Text style={styles.guidelineBullet}>•</Text>
                    <Text style={styles.guidelineText}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="Contact Support"
                onPress={onContactSupport}
                size="lg"
                style={styles.supportButton}
              />
              
              <Button
                title="I Understand"
                onPress={onClose}
                variant="secondary"
                size="lg"
                style={styles.understandButton}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Your safety is our priority. This alert is for your protection.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
  },
  detailsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  guidelinesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  guidelineBullet: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
    marginTop: -2,
  },
  guidelineText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  supportButton: {
    marginBottom: 12,
  },
  understandButton: {
    marginBottom: 12,
  },
  footer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});
