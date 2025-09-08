import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/design';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  disabled = false
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: size === 'sm' ? spacing[4] : size === 'lg' ? spacing[8] : spacing[5],
      paddingVertical: size === 'sm' ? spacing[2] : size === 'lg' ? spacing[4] : spacing[3],
      borderRadius: size === 'sm' ? borderRadius.md : size === 'lg' ? borderRadius.xl : borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: size === 'sm' ? 40 : size === 'lg' ? 56 : 48,
      ...shadows.md,
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.neutral[400] : colors.primary[600],
        shadowColor: disabled ? colors.neutral[400] : colors.primary[600],
      },
      secondary: {
        backgroundColor: disabled ? colors.neutral[100] : colors.background.primary,
        borderWidth: 1.5,
        borderColor: disabled ? colors.border.light : colors.primary[200],
        ...shadows.sm,
      },
      danger: {
        backgroundColor: disabled ? colors.danger[300] : colors.danger[500],
        shadowColor: disabled ? colors.danger[300] : colors.danger[500],
      },
      success: {
        backgroundColor: disabled ? colors.secondary[300] : colors.secondary[500],
        shadowColor: disabled ? colors.secondary[300] : colors.secondary[500],
      },
      ghost: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'sm' ? typography.fontSizes.sm : size === 'lg' ? typography.fontSizes.lg : typography.fontSizes.base,
      fontWeight: size === 'lg' ? typography.fontWeights.bold : typography.fontWeights.semibold,
      letterSpacing: size === 'lg' ? typography.letterSpacing.wide : typography.letterSpacing.normal,
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: {
        color: colors.text.inverse,
      },
      secondary: {
        color: disabled ? colors.text.muted : colors.primary[600],
        fontWeight: typography.fontWeights.semibold,
      },
      danger: {
        color: colors.text.inverse,
      },
      success: {
        color: colors.text.inverse,
      },
      ghost: {
        color: colors.text.primary,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
