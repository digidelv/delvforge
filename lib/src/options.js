module.exports = {
    important: false,
    inheritThemes: true,
    prefix: {
        className: 'df-', // DelvForge prefix
        cssVariable: 'df-'
    },
    separator: '\\:',
    fixedRemLimit: {
        width: 100,  // Extended range
        height: 100
    },
    // Enhanced breakpoint system with more options
    breakpoints: {
        xs: '480px',    // Extra small devices
        sm: '640px',    // Small devices
        md: '768px',    // Medium devices
        lg: '1024px',   // Large devices
        xl: '1280px',   // Extra large devices
        '2xl': '1536px', // 2X large devices
        '3xl': '1920px'  // Ultra wide displays
    },
    // Enhanced container system
    containers: {
        'xs': '100%',
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px'
    },
    // Advanced grid system
    grid: {
        columns: 24,      // 24-column grid system
        gap: '0.5rem',
        gutters: {
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '3rem'
        }
    },
    // Enhanced spacing scale
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
        96: 24,
        128: 32,
        160: 40,
        192: 48,
        224: 56,
        256: 64
    },
    // Enhanced typography scale
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
    },
    // Extended color palette with more shades
    colors: {
        // Brand colors
        primary: {
            25: '#f8faff',
            50: '#f0f6ff',
            100: '#e0edff',
            200: '#b8d9ff',
            300: '#85c2ff',
            400: '#52a9ff',
            500: '#2196f3',
            600: '#1976d2',
            700: '#1565c0',
            800: '#0d47a1',
            900: '#0a3e82',
            950: '#0d2847'
        },
        secondary: {
            25: '#fafafa',
            50: '#f5f5f5',
            100: '#eeeeee',
            200: '#e0e0e0',
            300: '#bdbdbd',
            400: '#9e9e9e',
            500: '#757575',
            600: '#616161',
            700: '#424242',
            800: '#303030',
            900: '#212121',
            950: '#0f0f0f'
        },
        // Extended semantic colors
        success: {
            25: '#f6fef9',
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22'
        },
        warning: {
            25: '#fffcf5',
            50: '#fff8e1',
            100: '#ffecb3',
            200: '#ffe082',
            300: '#ffd54f',
            400: '#ffca28',
            500: '#ffc107',
            600: '#ffb300',
            700: '#ffa000',
            800: '#ff8f00',
            900: '#ff6f00',
            950: '#e65100'
        },
        danger: {
            25: '#fffbfa',
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
            950: '#450a0a'
        },
        info: {
            25: '#f8faff',
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554'
        }
    },
    // Advanced component system
    components: {
        card: {
            base: 'rounded-lg border bg-white shadow-sm',
            variants: {
                elevated: 'shadow-lg',
                bordered: 'border-2',
                flat: 'shadow-none'
            }
        },
        button: {
            base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
            sizes: {
                sm: 'h-9 px-3 text-sm',
                md: 'h-10 px-4',
                lg: 'h-11 px-8',
                xl: 'h-12 px-10 text-lg'
            },
            variants: {
                default: 'bg-primary-500 text-white hover:bg-primary-600',
                secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
                outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50'
            }
        }
    },
    // Enhanced theme system
    themes: {
        'light': {
            name: 'light',
            default: true,
            colorScheme: 'light',
            colors: {
                background: '#ffffff',
                foreground: '#0a0a0a',
                surface: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a'
                }
            }
        },
        'dark': {
            name: 'dark',
            colorScheme: 'dark',
            colors: {
                background: '#0a0a0a',
                foreground: '#fafafa',
                surface: {
                    50: '#0f172a',
                    100: '#1e293b',
                    200: '#334155',
                    300: '#475569',
                    400: '#64748b',
                    500: '#94a3b8',
                    600: '#cbd5e1',
                    700: '#e2e8f0',
                    800: '#f1f5f9',
                    900: '#f8fafc'
                }
            }
        }
    },
    // Animation system
    animations: {
        durations: {
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms'
        },
        easings: {
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
    },
    // Advanced features configuration
    features: {
        containerQueries: true,
        customProperties: true,
        modernSelectors: true,
        advancedGrid: true,
        fluidTypography: true,
        logicalProperties: true
    },
    plugins: []
};