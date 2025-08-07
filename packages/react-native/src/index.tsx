/**
 * DelvForge React Native Integration
 * React Native specific utilities with NativeWind compatibility
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { 
  View, 
  Text as RNText, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  ViewStyle,
  TextStyle,
  StyleProp,
  ViewProps,
  TextProps as RNTextProps,
  TouchableOpacityProps,
  TextInputProps
} from 'react-native';
import { DelvForge, DelvForgeConfig, cn } from '@delvforge/core';

// React Native optimized config
const reactNativeConfig: Partial<DelvForgeConfig> = {
  framework: 'react-native',
  features: {
    containerQueries: false,
    modernSelectors: false,
    logicalProperties: false,
    fluidTypography: false,
    advancedGrid: false
  },
  // React Native compatible spacing
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128
  }
};

// Context for DelvForge
const DelvForgeContext = createContext<DelvForge | null>(null);

// Provider component
interface DelvForgeProviderProps {
  config?: Partial<DelvForgeConfig>;
  children: ReactNode;
}

export function DelvForgeProvider({ config = {}, children }: DelvForgeProviderProps) {
  const df = new DelvForge({ ...reactNativeConfig, ...config });
  df.applyFrameworkOptimizations('react-native');
  
  return (
    <DelvForgeContext.Provider value={df}>
      {children}
    </DelvForgeContext.Provider>
  );
}

// Hook to use DelvForge
export function useDelvForge(): DelvForge {
  const context = useContext(DelvForgeContext);
  if (!context) {
    const df = new DelvForge(reactNativeConfig);
    df.applyFrameworkOptimizations('react-native');
    return df;
  }
  return context;
}

// Utility hook for style generation
export function useStyle() {
  const df = useDelvForge();
  
  // Convert utility classes to React Native styles
  const toStyle = (utilities: string): StyleProp<ViewStyle | TextStyle> => {
    const classes = utilities.split(' ').filter(Boolean);
    const styles: any = {};
    
    classes.forEach(cls => {
      const cleanClass = cls.replace(df.config.prefix?.className || '', '');
      
      // Map utility classes to React Native styles
      if (cleanClass.startsWith('p-')) {
        const value = df.spacing(cleanClass.substring(2));
        styles.padding = typeof value === 'string' ? parseInt(value) : value;
      } else if (cleanClass.startsWith('px-')) {
        const value = df.spacing(cleanClass.substring(3));
        const numValue = typeof value === 'string' ? parseInt(value) : value;
        styles.paddingHorizontal = numValue;
      } else if (cleanClass.startsWith('py-')) {
        const value = df.spacing(cleanClass.substring(3));
        const numValue = typeof value === 'string' ? parseInt(value) : value;
        styles.paddingVertical = numValue;
      } else if (cleanClass.startsWith('m-')) {
        const value = df.spacing(cleanClass.substring(2));
        styles.margin = typeof value === 'string' ? parseInt(value) : value;
      } else if (cleanClass.startsWith('mx-')) {
        const value = df.spacing(cleanClass.substring(3));
        const numValue = typeof value === 'string' ? parseInt(value) : value;
        styles.marginHorizontal = numValue;
      } else if (cleanClass.startsWith('my-')) {
        const value = df.spacing(cleanClass.substring(3));
        const numValue = typeof value === 'string' ? parseInt(value) : value;
        styles.marginVertical = numValue;
      } else if (cleanClass.startsWith('bg-')) {
        const colorName = cleanClass.substring(3);
        const [colorKey, shade] = colorName.split('-');
        const color = df.color(colorKey, shade);
        if (color) styles.backgroundColor = color;
      } else if (cleanClass.startsWith('text-')) {
        const colorName = cleanClass.substring(5);
        if (!['xs', 'sm', 'base', 'lg', 'xl'].includes(colorName.split('-')[0])) {
          const [colorKey, shade] = colorName.split('-');
          const color = df.color(colorKey, shade);
          if (color) styles.color = color;
        }
      } else if (cleanClass === 'flex') {
        styles.display = 'flex';
      } else if (cleanClass === 'flex-row') {
        styles.flexDirection = 'row';
      } else if (cleanClass === 'flex-col') {
        styles.flexDirection = 'column';
      } else if (cleanClass === 'justify-center') {
        styles.justifyContent = 'center';
      } else if (cleanClass === 'justify-between') {
        styles.justifyContent = 'space-between';
      } else if (cleanClass === 'items-center') {
        styles.alignItems = 'center';
      } else if (cleanClass === 'flex-1') {
        styles.flex = 1;
      } else if (cleanClass === 'rounded') {
        styles.borderRadius = 8;
      } else if (cleanClass === 'rounded-full') {
        styles.borderRadius = 9999;
      } else if (cleanClass === 'font-bold') {
        styles.fontWeight = 'bold';
      } else if (cleanClass === 'text-center') {
        styles.textAlign = 'center';
      }
    });
    
    return styles;
  };

  return {
    cn: (...classes: (string | undefined | null | false)[]) => cn(...classes),
    toStyle,
    df: (utility: string) => df.className(utility)
  };
}

// Enhanced Box component for React Native
interface BoxProps extends ViewProps {
  df?: string;
  children?: ReactNode;
}

export function Box({ df: utilities = '', style, children, ...props }: BoxProps) {
  const { toStyle } = useStyle();
  const computedStyle = utilities ? toStyle(utilities) : {};
  
  return (
    <View style={[computedStyle, style]} {...props}>
      {children}
    </View>
  );
}

// Container component
interface ContainerProps extends ViewProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  children?: ReactNode;
}

export function Container({ 
  size = 'xl', 
  center = true, 
  style, 
  children, 
  ...props 
}: ContainerProps) {
  const containerStyle: ViewStyle = {
    width: '100%',
    ...(center && { alignItems: 'center' }),
    ...(size !== 'full' && { maxWidth: getContainerWidth(size) }),
    paddingHorizontal: 16
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
}

function getContainerWidth(size: string): number {
  const widths = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  return (widths as any)[size] || 1280;
}

// Flex component
interface FlexProps extends ViewProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  children?: ReactNode;
}

export function Flex({ 
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'nowrap',
  gap,
  style,
  children,
  ...props 
}: FlexProps) {
  const flexStyle: ViewStyle = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    ...(gap && { gap })
  };

  return (
    <View style={[flexStyle, style]} {...props}>
      {children}
    </View>
  );
}

// Card component
interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
  children?: ReactNode;
}

export function Card({ 
  variant = 'default',
  padding = 16,
  style,
  children,
  ...props 
}: CardProps) {
  const { toStyle } = useStyle();
  
  const cardStyle: ViewStyle = {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding,
    ...(variant === 'elevated' && {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8
    }),
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: '#e2e8f0'
    })
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
}

// Button component
interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  style,
  children,
  ...props 
}: ButtonProps) {
  const df = useDelvForge();
  
  const buttonColors = {
    primary: df.color('primary', '500') || '#3b82f6',
    secondary: '#f1f5f9',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    outline: 'transparent'
  };

  const textColors = {
    primary: '#ffffff',
    secondary: '#334155',
    success: '#ffffff',
    warning: '#ffffff',
    danger: '#ffffff',
    outline: df.color('primary', '500') || '#3b82f6'
  };

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 12, fontSize: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 24, fontSize: 18 }
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: buttonColors[variant],
    borderRadius: 8,
    ...sizes[size],
    ...(fullWidth && { width: '100%' }),
    ...(variant === 'outline' && { 
      borderWidth: 1, 
      borderColor: df.color('primary', '500') || '#3b82f6' 
    }),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled || loading ? 0.6 : 1
  };

  const textStyle: TextStyle = {
    color: textColors[variant],
    fontSize: sizes[size].fontSize,
    fontWeight: '600'
  };

  return (
    <TouchableOpacity 
      style={[buttonStyle, style]} 
      disabled={disabled || loading}
      {...props}
    >
      <RNText style={textStyle}>
        {loading ? 'Loading...' : children}
      </RNText>
    </TouchableOpacity>
  );
}

// Text component
interface TextProps extends RNTextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
}

export function Text({ 
  size = 'base',
  weight = 'normal',
  color,
  align,
  style,
  children,
  ...props 
}: TextProps) {
  const df = useDelvForge();
  
  const sizes = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30
  };

  const weights = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  };

  const textStyle: TextStyle = {
    fontSize: sizes[size],
    fontWeight: weights[weight],
    ...(color && { color: df.color(color.split('-')[0], color.split('-')[1]) || color }),
    ...(align && { textAlign: align })
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
}

// Input component
interface InputProps extends TextInputProps {
  error?: boolean;
  df?: string;
}

export function Input({ error = false, df: utilities, style, ...props }: InputProps) {
  const { toStyle } = useStyle();
  const computedStyle = utilities ? toStyle(utilities) : {};
  
  const inputStyle: TextStyle = {
    borderWidth: 1,
    borderColor: error ? '#ef4444' : '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#ffffff'
  };

  return (
    <TextInput 
      style={[inputStyle, computedStyle, style]}
      {...props}
    />
  );
}

// SafeArea component
interface SafeAreaProps extends ViewProps {
  children?: ReactNode;
}

export function SafeArea({ style, children, ...props }: SafeAreaProps) {
  return (
    <View style={[{ flex: 1, paddingTop: 44 }, style]} {...props}>
      {children}
    </View>
  );
}

// ScrollContainer component
interface ScrollContainerProps extends ViewProps {
  children?: ReactNode;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

export function ScrollContainer({ 
  children, 
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  ...props 
}: ScrollContainerProps) {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

// Export core utilities
export { cn, DelvForge, type DelvForgeConfig } from '@delvforge/core';

// Export React Native specific style utilities
export const rnStyles = {
  shadow: (elevation: number = 4): ViewStyle => ({
    elevation,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: elevation / 2 },
    shadowOpacity: 0.1,
    shadowRadius: elevation
  }),
  
  absoluteFill: (): ViewStyle => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }),
  
  center: (): ViewStyle => ({
    justifyContent: 'center',
    alignItems: 'center'
  })
};