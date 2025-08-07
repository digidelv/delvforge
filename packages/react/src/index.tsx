/**
 * DelvForge React Integration
 * React-specific utilities and components
 */

import React, { createContext, useContext, ReactNode, HTMLAttributes } from 'react';
import { DelvForge, DelvForgeConfig, cn } from '@delvforge/core';

// Create React context for DelvForge
const DelvForgeContext = createContext<DelvForge | null>(null);

// Provider component
interface DelvForgeProviderProps {
  config?: Partial<DelvForgeConfig>;
  children: ReactNode;
}

export function DelvForgeProvider({ config = {}, children }: DelvForgeProviderProps) {
  const df = new DelvForge({ ...config, framework: 'react' });
  df.applyFrameworkOptimizations('react');
  
  return (
    <DelvForgeContext.Provider value={df}>
      {children}
    </DelvForgeContext.Provider>
  );
}

// Hook to use DelvForge in components
export function useDelvForge(): DelvForge {
  const context = useContext(DelvForgeContext);
  if (!context) {
    // Return default instance if no provider
    const df = new DelvForge({ framework: 'react' });
    df.applyFrameworkOptimizations('react');
    return df;
  }
  return context;
}

// Utility hook for className generation
export function useClassName() {
  const df = useDelvForge();
  
  return {
    cn: (...classes: (string | undefined | null | false)[]) => cn(...classes),
    df: (utility: string) => df.className(utility),
    responsive: (breakpoint: string, utility: string) => df.responsive(breakpoint, utility),
    state: (state: string, utility: string) => df.state(state, utility)
  };
}

// React component utilities
interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  df?: string; // DelvForge utility classes
}

export function Box({ 
  as: Component = 'div', 
  df = '', 
  className, 
  children, 
  ...props 
}: BoxProps) {
  const { cn } = useClassName();
  
  return (
    <Component 
      className={cn(df, className)} 
      {...props}
    >
      {children}
    </Component>
  );
}

// Container component
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fluid';
  center?: boolean;
}

export function Container({ 
  size = 'xl', 
  center = true, 
  className, 
  children, 
  ...props 
}: ContainerProps) {
  const { cn, df } = useClassName();
  
  const containerClass = cn(
    df('w-full'),
    center && df('mx-auto'),
    size === 'fluid' ? df('px-4') : df(`container-${size}`),
    className
  );

  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
}

// Grid component
interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: number | string;
  gap?: number | string;
  responsive?: Record<string, number>;
}

export function Grid({ 
  cols = 1, 
  gap = 4, 
  responsive = {}, 
  className, 
  children, 
  ...props 
}: GridProps) {
  const { cn, df } = useClassName();
  
  const gridClasses = cn(
    df('grid'),
    df(`grid-cols-${cols}`),
    df(`gap-${gap}`),
    ...Object.entries(responsive).map(([bp, col]) => df(`${bp}:grid-cols-${col}`)),
    className
  );

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

// Flex component
interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean;
  gap?: number | string;
}

export function Flex({ 
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap,
  className,
  children,
  ...props 
}: FlexProps) {
  const { cn, df } = useClassName();
  
  const flexClasses = cn(
    df('flex'),
    df(`flex-${direction}`),
    df(`justify-${justify}`),
    df(`items-${align}`),
    wrap && df('flex-wrap'),
    gap && df(`gap-${gap}`),
    className
  );

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  );
}

// Card component
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: number | string;
}

export function Card({ 
  variant = 'default',
  padding = 6,
  className,
  children,
  ...props 
}: CardProps) {
  const { cn, df } = useClassName();
  
  const cardClasses = cn(
    df('card'),
    variant !== 'default' && df(`card-${variant}`),
    df(`p-${padding}`),
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ...props 
}: ButtonProps) {
  const { cn, df } = useClassName();
  
  const buttonClasses = cn(
    df('btn'),
    df(`btn-${variant}`),
    size !== 'md' && df(`btn-${size}`),
    fullWidth && df('w-full'),
    loading && df('btn-loading'),
    className
  );

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className={df('animate-spin w-4 h-4 mr-2')}>⟳</div>
      ) : null}
      {children}
    </button>
  );
}

// Text component
interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export function Text({ 
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color,
  align,
  className,
  children,
  ...props 
}: TextProps) {
  const { cn, df } = useClassName();
  
  const textClasses = cn(
    df(`text-${size}`),
    weight !== 'normal' && df(`font-${weight}`),
    color && df(`text-${color}`),
    align && df(`text-${align}`),
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
}

// Form components
interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export function FormGroup({ 
  error,
  label,
  required = false,
  className,
  children,
  ...props 
}: FormGroupProps) {
  const { cn, df } = useClassName();
  
  return (
    <div className={cn(df('form-group'), className)} {...props}>
      {label && (
        <label className={df('form-label')}>
          {label}
          {required && <span className={df('text-danger-500 ml-1')}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <div className={df('form-error')}>{error}</div>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className, ...props }: InputProps) {
  const { cn, df } = useClassName();
  
  return (
    <input 
      className={cn(
        df('form-control'),
        error && df('form-invalid'),
        className
      )}
      {...props}
    />
  );
}

// Responsive utilities hook
export function useResponsive() {
  const df = useDelvForge();
  
  const responsive = (classes: Record<string, string>) => {
    return Object.entries(classes)
      .map(([breakpoint, utility]) => 
        breakpoint === 'default' ? df.className(utility) : df.responsive(breakpoint, utility)
      )
      .join(' ');
  };

  return { responsive };
}

// Export core utilities
export { cn, DelvForge, type DelvForgeConfig } from '@delvforge/core';

// Re-export everything for convenience
export * from '@delvforge/core';