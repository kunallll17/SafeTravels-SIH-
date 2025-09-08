import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/design';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

const { width, height } = Dimensions.get('window');

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onContinue }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const featureAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  useEffect(() => {
    // Logo animation
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Hero content animation
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
    ]).start();

    // Feature cards staggered animation
    const featureAnimations = featureAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      })
    );

    setTimeout(() => {
      Animated.parallel(featureAnimations).start();
    }, 400);
  }, []);

  const features = [
    {
      icon: 'shield-checkmark',
      title: 'AI-Powered Safety',
      description: 'Smart monitoring with real-time threat detection and instant alerts',
      gradient: ['#FF6B6B', '#FF8E53'],
      bgColor: '#FFE5E5'
    },
    {
      icon: 'location',
      title: 'Smart Navigation',
      description: 'GPS tracking with safe route suggestions and zone monitoring',
      gradient: ['#4ECDC4', '#44A08D'],
      bgColor: '#E0FFF4'
    },
    {
      icon: 'call',
      title: 'Emergency Network',
      description: 'Instant connection to local authorities and emergency services',
      gradient: ['#FFD93D', '#FF6B6B'],
      bgColor: '#FFF8DC'
    },
    {
      icon: 'people',
      title: 'Family Shield',
      description: 'Real-time updates to keep your loved ones connected and informed',
      gradient: ['#A8E6CF', '#88D8A3'],
      bgColor: '#F0FFF4'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBackground}>
            <View style={styles.heroGradient}>
              <Animated.View style={[
                styles.heroContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}>
                <Animated.View style={[
                  styles.logoContainer,
                  { transform: [{ scale: logoScale }] }
                ]}>
                  <Ionicons name="shield-checkmark" size={60} color="#FFFFFF" />
                  <View style={styles.logoGlow} />
                </Animated.View>
                <Text style={styles.heroTitle}>Safe Travels</Text>
                <Text style={styles.heroSubtitle}>
                  Discover the world with confidence{'\n'}Your AI-powered safety companion
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Why Choose Safe Travels?</Text>
            <Text style={styles.sectionSubtitle}>Advanced features designed for your safety</Text>
          </View>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Animated.View 
                key={index} 
                style={[
                  styles.modernFeatureCard,
                  {
                    opacity: featureAnims[index],
                    transform: [
                      {
                        translateY: featureAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                      {
                        scale: featureAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  }
                ]}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: feature.bgColor }]}>
                  <View style={[styles.iconGradient, { backgroundColor: feature.gradient[0] }]}>
                    <Ionicons
                      name={feature.icon as any}
                      size={28}
                      color="#FFFFFF"
                    />
                    <View style={[styles.iconPulse, { backgroundColor: feature.gradient[0] }]} />
                  </View>
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.modernFeatureTitle}>{feature.title}</Text>
                  <Text style={styles.modernFeatureDescription}>{feature.description}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to explore safely?</Text>
            <Text style={styles.ctaSubtitle}>Join thousands of travelers who trust Safe Travels</Text>
            
            <Button
              title="Start Your Journey"
              onPress={onContinue}
              size="lg"
              style={styles.ctaButton}
            />
            
            <View style={styles.trustIndicators}>
              <View style={styles.trustItem}>
                <Ionicons name="people" size={16} color="#10B981" />
                <Text style={styles.trustText}>50K+ Users</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.trustText}>4.9 Rating</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={16} color="#3B82F6" />
                <Text style={styles.trustText}>100% Secure</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Hero Section
  heroSection: {
    height: height * 0.5,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBackground: {
    flex: 1,
    backgroundColor: colors.primary[600],
  },
  heroGradient: {
    flex: 1,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    marginTop: spacing[10],
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[6],
    ...shadows.xl,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -10,
    left: -10,
  },
  heroTitle: {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.inverse,
    marginBottom: spacing[4],
    textAlign: 'center',
    letterSpacing: typography.letterSpacing.tighter,
  },
  heroSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
    fontWeight: typography.fontWeights.normal,
  },

  // Features Section
  featuresSection: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[10],
    paddingBottom: spacing[5],
    backgroundColor: colors.background.secondary,
  },
  sectionHeader: {
    marginBottom: spacing[8],
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
  },
  featuresContainer: {
    gap: spacing[5],
  },
  modernFeatureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius['3xl'],
    padding: spacing[6],
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  iconGradient: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconPulse: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    opacity: 0.3,
    top: -7,
    left: -7,
  },
  featureContent: {
    flex: 1,
    paddingTop: 4,
  },
  modernFeatureTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  modernFeatureDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[8],
    paddingBottom: spacing[12],
    backgroundColor: colors.background.primary,
  },
  ctaCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius['3xl'],
    padding: spacing[8],
    alignItems: 'center',
    marginBottom: spacing[6],
    ...shadows.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  ctaTitle: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.text.primary,
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[8],
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
  },
  ctaButton: {
    width: '100%',
    marginBottom: spacing[7],
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  trustText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  termsText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: spacing[5],
    lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
  },
});
