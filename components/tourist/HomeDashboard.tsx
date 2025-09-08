import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tourist } from '../../types';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/design';

interface HomeDashboardProps {
  tourist: Tourist;
  onPanicAlert: () => void;
  onCallPolice: () => void;
  onCallEmergency: () => void;
  onLogout: () => void;
}

const { width } = Dimensions.get('window');

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  tourist,
  onPanicAlert,
  onCallPolice,
  onCallEmergency,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial load animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulsing animation for SOS button
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getSafetyScoreText = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Caution';
    return 'Alert';
  };

  const renderHomeContent = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <Animated.View style={[
        styles.welcomeBanner,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome to Delhi!</Text>
          <Text style={styles.welcomeSubtitle}>Explore safely with real-time monitoring</Text>
        </View>
        <Animated.View style={[
          styles.weatherWidget,
          { transform: [{ scale: scaleAnim }] }
        ]}>
          <Ionicons name="sunny" size={24} color="#FFD93D" />
          <Text style={styles.weatherText}>28°C</Text>
        </Animated.View>
      </Animated.View>

      {/* Safety Score Card */}
      <View style={styles.modernSafetyCard}>
        <View style={styles.safetyCardHeader}>
          <View style={styles.safetyIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.safetyInfo}>
            <Text style={styles.safetyTitle}>Safety Status</Text>
            <Text style={styles.safetySubtitle}>Current area assessment</Text>
          </View>
          <View style={styles.safetyScoreContainer}>
            <View style={[styles.safetyBadge, { backgroundColor: getSafetyScoreColor(tourist.safetyScore) }]}>
              <Text style={styles.safetyBadgeText}>{getSafetyScoreText(tourist.safetyScore)}</Text>
            </View>
            <Text style={styles.safetyNumber}>{tourist.safetyScore}/100</Text>
          </View>
        </View>
        <View style={styles.safetyProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${tourist.safetyScore}%`, 
              backgroundColor: getSafetyScoreColor(tourist.safetyScore) 
            }]} />
          </View>
        </View>
      </View>

      {/* Location & Map */}
      <View style={styles.locationSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Location</Text>
          <TouchableOpacity style={styles.expandButton}>
            <Ionicons name="expand" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.modernMapCard}>
          <View style={styles.mapImagePlaceholder}>
            <View style={styles.mapOverlay}>
              <Ionicons name="location" size={32} color="#3B82F6" />
              <Text style={styles.mapTitle}>Interactive Safety Map</Text>
              <Text style={styles.mapSubtitle}>Tap to explore nearby areas</Text>
            </View>
          </View>
          {tourist.currentLocation && (
            <View style={styles.locationBadge}>
              <Ionicons name="navigate-circle" size={20} color="#10B981" />
              <Text style={styles.locationText}>{tourist.currentLocation.address}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.actionsSection}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="warning" size={24} color={colors.danger[500]} />
        <Text style={styles.sectionTitle}>Emergency Actions</Text>
        </View>
        
        {/* Emergency SOS - Primary */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.sosCard} onPress={onPanicAlert}>
            <View style={styles.sosIconContainer}>
              <Ionicons name="warning" size={32} color="#FFFFFF" />
              <View style={styles.sosGlow} />
            </View>
            <View style={styles.sosContent}>
              <Text style={styles.sosTitle}>Emergency SOS</Text>
              <Text style={styles.sosSubtitle}>Instant alert to authorities</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Other Actions Grid */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={onCallPolice}>
            <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="shield" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.actionTitle}>Police</Text>
            <Text style={styles.actionSubtitle}>Call 100</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} onPress={onCallEmergency}>
            <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="call" size={24} color="#10B981" />
            </View>
            <Text style={styles.actionTitle}>Emergency</Text>
            <Text style={styles.actionSubtitle}>Contact</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="medical" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionTitle}>Medical</Text>
            <Text style={styles.actionSubtitle}>Call 108</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#FDF2F8' }]}>
              <Ionicons name="information-circle" size={24} color="#EC4899" />
            </View>
            <Text style={styles.actionTitle}>Tourist</Text>
            <Text style={styles.actionSubtitle}>Helpline</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Safe zone entered</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="location" size={20} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Location updated</Text>
              <Text style={styles.activityTime}>5 minutes ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderProfileContent = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Profile Header Card */}
      <Card variant="elevated" style={styles.profileCard}>
        <View style={styles.profileHeaderSection}>
          <View style={styles.profileAvatarContainer}>
          <View style={styles.profileAvatar}>
              <Ionicons name="person" size={40} color={colors.primary[600]} />
          </View>
            <View style={styles.profileBadge}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{tourist.name}</Text>
            <View style={styles.profileNationalityRow}>
              <Ionicons name="flag" size={16} color={colors.text.secondary} />
            <Text style={styles.profileNationality}>{tourist.nationality}</Text>
          </View>
            <View style={styles.profileStatusRow}>
              <View style={styles.statusIndicator} />
              <Text style={styles.profileStatus}>Active Traveler</Text>
        </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="calendar" size={24} color={colors.primary[600]} />
          </View>
          <Text style={styles.statNumber}>
            {Math.ceil((new Date(tourist.tripDuration.endDate).getTime() - new Date(tourist.tripDuration.startDate).getTime()) / (1000 * 3600 * 24))}
            </Text>
          <Text style={styles.statLabel}>Days Trip</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color={colors.success} />
          </View>
          <Text style={styles.statNumber}>{tourist.safetyScore}</Text>
          <Text style={styles.statLabel}>Safety Score</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="location" size={24} color={colors.accent[500]} />
          </View>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Places Visited</Text>
        </Card>
      </View>

      {/* Trip Information */}
      <Card variant="elevated" style={styles.tripCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="airplane" size={24} color={colors.primary[600]} />
          <Text style={styles.cardTitle}>Trip Information</Text>
        </View>
        
        <View style={styles.tripInfoGrid}>
          <View style={styles.tripInfoItem}>
            <View style={styles.tripInfoIcon}>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} />
            </View>
            <View style={styles.tripInfoContent}>
              <Text style={styles.tripInfoLabel}>Start Date</Text>
              <Text style={styles.tripInfoValue}>
                {new Date(tourist.tripDuration.startDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
          
          <View style={styles.tripInfoItem}>
            <View style={styles.tripInfoIcon}>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} />
            </View>
            <View style={styles.tripInfoContent}>
              <Text style={styles.tripInfoLabel}>End Date</Text>
              <Text style={styles.tripInfoValue}>
                {new Date(tourist.tripDuration.endDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
          
          <View style={styles.tripInfoItem}>
            <View style={styles.tripInfoIcon}>
              <Ionicons name="time-outline" size={20} color={colors.text.secondary} />
            </View>
            <View style={styles.tripInfoContent}>
              <Text style={styles.tripInfoLabel}>Duration</Text>
              <Text style={styles.tripInfoValue}>
                {Math.ceil((new Date(tourist.tripDuration.endDate).getTime() - new Date(tourist.tripDuration.startDate).getTime()) / (1000 * 3600 * 24))} days
              </Text>
            </View>
          </View>
          
          <View style={styles.tripInfoItem}>
            <View style={styles.tripInfoIcon}>
              <Ionicons name="location-outline" size={20} color={colors.text.secondary} />
            </View>
            <View style={styles.tripInfoContent}>
              <Text style={styles.tripInfoLabel}>Current Location</Text>
              <Text style={styles.tripInfoValue}>
                {tourist.currentLocation?.address || 'Delhi, India'}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Emergency Contact */}
      <Card variant="elevated" style={styles.emergencyCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="people" size={24} color={colors.danger[500]} />
          <Text style={styles.cardTitle}>Emergency Contact</Text>
        </View>
        
        <View style={styles.emergencyContactInfo}>
          <View style={styles.emergencyContactAvatar}>
            <Ionicons name="person" size={24} color={colors.danger[500]} />
          </View>
          <View style={styles.emergencyContactDetails}>
            <Text style={styles.emergencyContactName}>{tourist.emergencyContact.name}</Text>
            <Text style={styles.emergencyContactRelation}>{tourist.emergencyContact.relationship}</Text>
            <View style={styles.emergencyContactPhone}>
              <Ionicons name="call" size={16} color={colors.text.secondary} />
              <Text style={styles.emergencyContactPhoneText}>{tourist.emergencyContact.phone}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color={colors.background.primary} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Digital ID */}
      <Card variant="elevated" style={styles.digitalIdCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="card" size={24} color={colors.secondary[600]} />
          <Text style={styles.cardTitle}>Digital Travel ID</Text>
        </View>
        
        <View style={styles.digitalIdContent}>
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCodePlaceholder}>
              <Ionicons name="qr-code" size={48} color={colors.text.secondary} />
              <Text style={styles.qrCodeText}>QR Code</Text>
            </View>
          </View>
          <View style={styles.digitalIdInfo}>
            <Text style={styles.digitalIdNumber}>ID: {tourist.id.toUpperCase()}</Text>
            <Text style={styles.digitalIdStatus}>✅ Verified Tourist</Text>
            <TouchableOpacity style={styles.shareIdButton}>
              <Ionicons name="share" size={16} color={colors.primary[600]} />
              <Text style={styles.shareIdText}>Share ID</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary[100] }]}>
              <Ionicons name="document-text" size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.quickActionText}>Travel Documents</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.secondary[100] }]}>
              <Ionicons name="heart" size={24} color={colors.secondary[600]} />
            </View>
            <Text style={styles.quickActionText}>Health Info</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.accent[100] }]}>
              <Ionicons name="camera" size={24} color={colors.accent[600]} />
            </View>
            <Text style={styles.quickActionText}>Trip Photos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.danger[100] }]}>
              <Ionicons name="shield" size={24} color={colors.danger[600]} />
            </View>
            <Text style={styles.quickActionText}>Insurance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderSettingsContent = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Account Settings */}
      <Card variant="elevated" style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={24} color={colors.primary[600]} />
          <Text style={styles.cardTitle}>Account Settings</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="person-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Edit Profile</Text>
            <Text style={styles.settingSubtitle}>Update your personal information</Text>
        </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="key-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Change Password</Text>
            <Text style={styles.settingSubtitle}>Update your account password</Text>
        </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="shield-outline" size={20} color={colors.text.secondary} />
        </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Privacy Settings</Text>
            <Text style={styles.settingSubtitle}>Manage your privacy preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </Card>

      {/* Safety & Security */}
      <Card variant="elevated" style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={24} color={colors.success} />
          <Text style={styles.cardTitle}>Safety & Security</Text>
        </View>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="people-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Family Tracking</Text>
            <Text style={styles.settingSubtitle}>Share your location with family</Text>
          </View>
          <View style={[styles.modernToggle, styles.toggleActive]}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="warning-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Emergency Alerts</Text>
            <Text style={styles.settingSubtitle}>Receive safety alerts and warnings</Text>
          </View>
          <View style={[styles.modernToggle, styles.toggleActive]}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="call-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Emergency Contacts</Text>
            <Text style={styles.settingSubtitle}>Manage emergency contact list</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </Card>

      {/* Notifications */}
      <Card variant="elevated" style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="notifications" size={24} color={colors.accent[500]} />
          <Text style={styles.cardTitle}>Notifications</Text>
        </View>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="notifications-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingSubtitle}>Receive app notifications</Text>
          </View>
          <View style={[styles.modernToggle, styles.toggleActive]}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="mail-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingSubtitle}>Receive updates via email</Text>
          </View>
          <View style={styles.modernToggle}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="chatbubble-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>SMS Alerts</Text>
            <Text style={styles.settingSubtitle}>Emergency SMS notifications</Text>
          </View>
          <View style={[styles.modernToggle, styles.toggleActive]}>
            <View style={styles.toggleThumb} />
          </View>
        </View>
      </Card>

      {/* App Preferences */}
      <Card variant="elevated" style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="settings" size={24} color={colors.neutral[600]} />
          <Text style={styles.cardTitle}>App Preferences</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="language-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Language</Text>
            <Text style={styles.settingSubtitle}>English</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <View style={styles.settingItemWithToggle}>
          <View style={styles.settingIcon}>
            <Ionicons name="color-palette-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingSubtitle}>{isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.modernToggle, isDarkMode && styles.toggleActive]}
            onPress={() => {
              console.log('Dark mode toggled:', !isDarkMode);
              setIsDarkMode(!isDarkMode);
            }}
          >
            <View style={styles.toggleThumb} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="map-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Map Preferences</Text>
            <Text style={styles.settingSubtitle}>Satellite view, traffic</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </Card>

      {/* Support & Help */}
      <Card variant="elevated" style={styles.settingsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="help-circle" size={24} color={colors.info} />
          <Text style={styles.cardTitle}>Support & Help</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="help-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Help Center</Text>
            <Text style={styles.settingSubtitle}>FAQs and support articles</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Contact Support</Text>
            <Text style={styles.settingSubtitle}>Get help from our team</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="star-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Rate App</Text>
            <Text style={styles.settingSubtitle}>Help us improve Safe Travels</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="information-circle-outline" size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>About</Text>
            <Text style={styles.settingSubtitle}>App version 1.0.0</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </Card>

      {/* Logout Button */}
      <Card variant="outlined" style={styles.logoutCard}>
        <Button
          title="Sign Out"
          onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Sign Out', 
              style: 'destructive',
              onPress: () => {
                console.log('Signing out user...');
                onLogout();
              }
            }
          ])}
          variant="danger"
          style={styles.logoutButton}
          size="lg"
        />
      </Card>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'settings':
        return renderSettingsContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Safe Travels</Text>
          <Text style={styles.headerSubtitle}>Welcome, {tourist.name}</Text>
        </View>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={24} color={colors.primary[600]} />
        </View>
      </View>

      {/* Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons
            name="home"
            size={24}
            color={activeTab === 'home' ? colors.primary[600] : colors.text.tertiary}
          />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name="person"
            size={24}
            color={activeTab === 'profile' ? colors.primary[600] : colors.text.tertiary}
          />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'settings' && styles.navItemActive]}
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons
            name="settings"
            size={24}
            color={activeTab === 'settings' ? colors.primary[600] : colors.text.tertiary}
          />
          <Text style={[styles.navLabel, activeTab === 'settings' && styles.navLabelActive]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6], // Increased top padding to avoid status bar overlap
    paddingBottom: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  headerSubtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  headerAvatar: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
  },

  // Welcome Banner
  welcomeBanner: {
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius['3xl'],
    padding: spacing[6],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[6],
    ...shadows.lg,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.inverse,
    marginBottom: spacing[1],
  },
  welcomeSubtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
  },
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    gap: spacing[2],
  },
  weatherText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.inverse,
  },

  // Modern Safety Card
  modernSafetyCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius['3xl'],
    padding: spacing[6],
    marginBottom: spacing[6],
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  safetyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  safetyIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: colors.secondary[500],
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[5],
    ...shadows.sm,
  },
  safetyInfo: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  safetySubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  safetyScoreContainer: {
    alignItems: 'flex-end',
  },
  safetyBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.md,
    marginBottom: spacing[1],
  },
  safetyBadgeText: {
    color: colors.text.inverse,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  },
  safetyNumber: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.black,
    color: colors.text.primary,
  },
  safetyProgress: {
    marginTop: spacing[2],
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },

  // Location Section
  locationSection: {
    marginBottom: spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  sectionTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
  },
  expandButton: {
    padding: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
  },
  modernMapCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    ...shadows.md,
  },
  mapImagePlaceholder: {
    height: 180,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapOverlay: {
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginTop: spacing[3],
    marginBottom: spacing[1],
  },
  mapSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[2],
  },
  locationText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    flex: 1,
  },

  // Actions Section
  actionsSection: {
    marginBottom: spacing[6],
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  sosCard: {
    backgroundColor: colors.danger[500],
    borderRadius: borderRadius['3xl'],
    padding: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[5],
    ...shadows.lg,
  },
  sosIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  sosContent: {
    flex: 1,
  },
  sosTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.inverse,
    marginBottom: spacing[1],
  },
  sosSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing[4], // Increased gap for better spacing
  },
  actionCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[5], // Increased padding for better touch targets
    alignItems: 'center',
    width: (width - (spacing[5] * 2) - spacing[4]) / 2, // Adjusted width calculation
    minHeight: 120, // Added minimum height for consistency
    justifyContent: 'center',
    ...shadows.sm,
  },
  actionIcon: {
    width: 56, // Slightly larger icons
    height: 56,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4], // More space below icon
  },
  actionTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
    textAlign: 'center', // Center align titles
  },
  actionSubtitle: {
    fontSize: typography.fontSizes.sm, // Slightly larger subtitle
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Activity Section
  activitySection: {
    marginBottom: spacing[24],
  },
  activityCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    ...shadows.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  activityTime: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  // Profile Styles
  profileCard: {
    marginBottom: spacing[4],
  },
  profileHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatarContainer: {
    position: 'relative',
    marginRight: spacing[4],
  },
  profileAvatar: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary[200],
  },
  profileBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.full,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  profileNationalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
    gap: spacing[1],
  },
  profileNationality: {
    fontSize: typography.fontSizes.base,
    color: colors.text.secondary,
  },
  profileStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
  },
  profileStatus: {
    fontSize: typography.fontSizes.sm,
    color: colors.success,
    fontWeight: typography.fontWeights.medium,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing[4],
  },
  statIconContainer: {
    marginBottom: spacing[2],
  },
  statNumber: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Card Headers
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  cardTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },

  // Trip Information
  tripCard: {
    marginBottom: spacing[4],
  },
  tripInfoGrid: {
    gap: spacing[4],
  },
  tripInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  tripInfoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripInfoContent: {
    flex: 1,
  },
  tripInfoLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing[1],
  },
  tripInfoValue: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },

  // Emergency Contact
  emergencyCard: {
    marginBottom: spacing[4],
  },
  emergencyContactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  emergencyContactAvatar: {
    width: 50,
    height: 50,
    backgroundColor: colors.danger[100],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyContactDetails: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  emergencyContactRelation: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  emergencyContactPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  emergencyContactPhoneText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  callButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.danger[500],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Digital ID
  digitalIdCard: {
    marginBottom: spacing[4],
  },
  digitalIdContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  qrCodePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.neutral[300],
  },
  qrCodeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
  digitalIdInfo: {
    flex: 1,
  },
  digitalIdNumber: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  digitalIdStatus: {
    fontSize: typography.fontSizes.sm,
    color: colors.success,
    marginBottom: spacing[2],
  },
  shareIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  shareIdText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary[600],
    fontWeight: typography.fontWeights.medium,
  },

  // Quick Actions
  quickActionsContainer: {
    marginBottom: spacing[10],
  },
  quickActionsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  quickActionItem: {
    width: (width - (spacing[5] * 2) - spacing[3]) / 2,
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  quickActionText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  // Settings Styles
  settingsCard: {
    marginBottom: spacing[4],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingItemWithToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  settingSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  modernToggle: {
    width: 52,
    height: 28,
    backgroundColor: colors.neutral[300],
    borderRadius: borderRadius.full,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  toggleActive: {
    backgroundColor: colors.primary[600],
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  logoutCard: {
    marginBottom: spacing[10],
    marginTop: spacing[4],
  },
  logoutButton: {
    width: '100%',
  },
  bottomNav: {
    backgroundColor: colors.background.primary,
    flexDirection: 'row',
    paddingVertical: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    ...shadows.sm,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  navItemActive: {
    // Active state styling handled by color changes
  },
  navLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.tertiary,
    marginTop: spacing[1],
    fontWeight: typography.fontWeights.medium,
  },
  navLabelActive: {
    color: colors.primary[600],
    fontWeight: typography.fontWeights.semibold,
  },
});
