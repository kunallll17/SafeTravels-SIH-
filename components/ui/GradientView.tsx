import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, gradients } from '../../constants/design';

interface GradientViewProps {
  children: React.ReactNode;
  gradient?: keyof typeof gradients;
  style?: ViewStyle;
}

export const GradientView: React.FC<GradientViewProps> = ({ 
  children, 
  gradient = 'primary', 
  style 
}) => {
  const gradientColors = gradients[gradient];
  
  // For React Native, we'll use a solid color as fallback
  // In a real implementation, you'd use react-native-linear-gradient
  const gradientStyle: ViewStyle = {
    backgroundColor: gradientColors[0],
    ...style,
  };

  return (
    <View style={gradientStyle}>
      {children}
    </View>
  );
};
