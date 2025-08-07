/**
 * DelvForge Core - Universal CSS Utility Framework
 * Framework-agnostic core functionality
 */

export interface DelvForgeConfig {
  prefix?: {
    className?: string;
    cssVariable?: string;
  };
  breakpoints?: Record<string, string>;
  colors?: Record<string, any>;
  spacing?: Record<string, any>;
  themes?: Record<string, any>;
  features?: {
    containerQueries?: boolean;
    modernSelectors?: boolean;
    logicalProperties?: boolean;
    fluidTypography?: boolean;
    advancedGrid?: boolean;
  };
  framework?: 'react' | 'vue' | 'angular' | 'react-native' | 'vanilla';
}

export const defaultConfig: DelvForgeConfig = {
  prefix: {
    className: 'df-',
    cssVariable: 'df-'
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px'
  },
  spacing: {
    0: 0,
    px: '1px',
    0.5: 0.125,
    1: 0.25,
    1.5: 0.375,
    2: 0.5,
    2.5: 0.625,
    3: 0.75,
    3.5: 0.875,
    4: 1,
    5: 1.25,
    6: 1.5,
    7: 1.75,
    8: 2,
    9: 2.25,
    10: 2.5,
    11: 2.75,
    12: 3,
    14: 3.5,
    16: 4,
    20: 5,
    24: 6,
    28: 7,
    32: 8,
    36: 9,
    40: 10,
    44: 11,
    48: 12,
    52: 13,
    56: 14,
    60: 15,
    64: 16,
    72: 18,
    80: 20,
    96: 24
  },
  colors: {
    primary: {
      50: '#f0f6ff',
      100: '#e0edff',
      200: '#b8d9ff',
      300: '#85c2ff',
      400: '#52a9ff',
      500: '#2196f3',
      600: '#1976d2',
      700: '#1565c0',
      800: '#0d47a1',
      900: '#0a3e82'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  features: {
    containerQueries: true,
    modernSelectors: true,
    logicalProperties: false,
    fluidTypography: true,
    advancedGrid: true
  }
};

export class DelvForge {
  public config: DelvForgeConfig;

  constructor(config: Partial<DelvForgeConfig> = {}) {
    this.config = this.mergeConfig(defaultConfig, config);
  }

  private mergeConfig(base: DelvForgeConfig, override: Partial<DelvForgeConfig>): DelvForgeConfig {
    return {
      ...base,
      ...override,
      prefix: { ...base.prefix, ...override.prefix },
      breakpoints: { ...base.breakpoints, ...override.breakpoints },
      colors: { ...base.colors, ...override.colors },
      spacing: { ...base.spacing, ...override.spacing },
      features: { ...base.features, ...override.features }
    };
  }

  /**
   * Generate utility class name with prefix
   */
  public className(utility: string): string {
    return `${this.config.prefix?.className || ''}${utility}`;
  }

  /**
   * Generate CSS variable name with prefix
   */
  public cssVariable(variable: string): string {
    return `--${this.config.prefix?.cssVariable || ''}${variable}`;
  }

  /**
   * Get breakpoint value
   */
  public breakpoint(size: string): string | undefined {
    return this.config.breakpoints?.[size];
  }

  /**
   * Get color value
   */
  public color(name: string, shade?: string): string | undefined {
    const colorGroup = this.config.colors?.[name];
    if (!colorGroup) return undefined;
    
    if (shade && typeof colorGroup === 'object') {
      return colorGroup[shade];
    }
    
    return typeof colorGroup === 'string' ? colorGroup : colorGroup['500'];
  }

  /**
   * Get spacing value
   */
  public spacing(size: string): string | number | undefined {
    const value = this.config.spacing?.[size];
    if (typeof value === 'number') {
      return `${value}rem`;
    }
    return value;
  }

  /**
   * Generate responsive utility class name
   */
  public responsive(breakpoint: string, utility: string): string {
    return `${breakpoint}:${this.className(utility)}`;
  }

  /**
   * Generate state utility class name (hover, focus, etc.)
   */
  public state(state: string, utility: string): string {
    return `${state}:${this.className(utility)}`;
  }

  /**
   * Auto-detect framework and apply framework-specific configuration
   */
  public static autoDetectFramework(): DelvForgeConfig['framework'] {
    if (typeof window === 'undefined') {
      // Node.js environment - check for framework packages
      try {
        require.resolve('react');
        return 'react';
      } catch {}
      
      try {
        require.resolve('vue');
        return 'vue';
      } catch {}
      
      try {
        require.resolve('@angular/core');
        return 'angular';
      } catch {}
      
      return 'vanilla';
    }

    // Browser environment
    if ((window as any).React) return 'react';
    if ((window as any).Vue) return 'vue';
    if ((window as any).ng) return 'angular';
    
    return 'vanilla';
  }

  /**
   * Apply framework-specific optimizations
   */
  public applyFrameworkOptimizations(framework?: DelvForgeConfig['framework']): void {
    const detectedFramework = framework || DelvForge.autoDetectFramework();
    this.config.framework = detectedFramework;

    switch (detectedFramework) {
      case 'react':
        // React-specific optimizations
        this.config.features = {
          ...this.config.features,
          modernSelectors: true,
          containerQueries: true
        };
        break;
        
      case 'vue':
        // Vue-specific optimizations
        this.config.features = {
          ...this.config.features,
          modernSelectors: true
        };
        break;
        
      case 'angular':
        // Angular-specific optimizations
        this.config.features = {
          ...this.config.features,
          logicalProperties: true
        };
        break;
        
      case 'react-native':
        // React Native specific config
        this.config.features = {
          ...this.config.features,
          containerQueries: false,
          modernSelectors: false,
          logicalProperties: false
        };
        break;
        
      case 'vanilla':
        // Maximum compatibility for vanilla JS
        this.config.features = {
          ...this.config.features,
          modernSelectors: false
        };
        break;
    }
  }
}

// Utility functions for framework integrations
export const df = new DelvForge();

export function configure(config: Partial<DelvForgeConfig>): DelvForge {
  return new DelvForge(config);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Export types
export type { DelvForgeConfig };
export { DelvForge as default };