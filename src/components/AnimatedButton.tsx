import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AnimatedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;
    const sizeStyle = styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    
    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...sizeStyle, ...styles.primaryButton };
      case 'secondary':
        return { ...baseStyle, ...sizeStyle, ...styles.secondaryButton };
      case 'outline':
        return { ...baseStyle, ...sizeStyle, ...styles.outlineButton };
      case 'ghost':
        return { ...baseStyle, ...sizeStyle, ...styles.ghostButton };
      default:
        return { ...baseStyle, ...sizeStyle, ...styles.primaryButton };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.buttonText;
    const sizeStyle = styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    
    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...sizeStyle, color: Colors.text.white };
      case 'secondary':
        return { ...baseStyle, ...sizeStyle, color: Colors.text.white };
      case 'outline':
        return { ...baseStyle, ...sizeStyle, color: Colors.primary };
      case 'ghost':
        return { ...baseStyle, ...sizeStyle, color: Colors.primary };
      default:
        return { ...baseStyle, ...sizeStyle, color: Colors.text.white };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 18;
      case 'lg': return 20;
      default: return 18;
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconColor = variant === 'outline' || variant === 'ghost' 
      ? Colors.primary 
      : Colors.text.white;
    
    return (
      <MaterialIcons
        name={icon}
        size={getIconSize()}
        color={iconColor}
        style={[
          iconPosition === 'left' && styles.iconLeft,
          iconPosition === 'right' && styles.iconRight,
        ]}
      />
    );
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={[
          getButtonStyle(),
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {iconPosition === 'left' && renderIcon()}
        <Text style={[getTextStyle(), textStyle, disabled && styles.disabledText]}>
          {loading ? 'Loading...' : title}
        </Text>
        {iconPosition === 'right' && renderIcon()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  buttonSm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  buttonMd: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  buttonLg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    minHeight: 52,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghostButton: {
    backgroundColor: Colors.primaryUltraLight,
  },
  disabledButton: {
    backgroundColor: Colors.border.light,
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: Typography.weight.semibold as any,
    textAlign: 'center',
  },
  textSm: {
    fontSize: Typography.size.sm,
  },
  textMd: {
    fontSize: Typography.size.base,
  },
  textLg: {
    fontSize: Typography.size.lg,
  },
  disabledText: {
    color: Colors.text.tertiary,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
}); 