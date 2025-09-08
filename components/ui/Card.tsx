import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/design';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'default',
  padding = 'md'
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.xl,
      padding: padding === 'sm' ? spacing[3] : padding === 'lg' ? spacing[6] : spacing[4],
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        ...shadows.sm,
      },
      elevated: {
        ...shadows.lg,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.border.light,
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};
