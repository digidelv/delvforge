const { generateCustomProperties } = require('../utils');
const { Rule } = require('postcss');

module.exports = (root, opts) => {
    const colors = opts.colors || {};
    const themes = opts.themes || {};
    const spacing = opts.spacing || {};
    const fontSize = opts.fontSize || {};
    const breakpoints = opts.breakpoints || {};
    
    // Generate base custom properties
    const baseVariables = {
        // Spacing scale
        spacing: spacing,
        
        // Font sizes
        fontSize: Object.fromEntries(
            Object.entries(fontSize).map(([key, value]) => [
                key,
                Array.isArray(value) ? value[0] : value
            ])
        ),
        
        // Breakpoints
        breakpoint: breakpoints,
        
        // Base color palette
        ...colors
    };
    
    // Generate base custom properties
    const baseProps = generateCustomProperties(baseVariables, opts);
    root.before(baseProps);
    
    // Generate theme-specific custom properties
    for (const [themeName, themeConfig] of Object.entries(themes)) {
        if (themeConfig.colors) {
            const themeSelector = themeConfig.default ? 
                ':root' : 
                `:root[data-df-theme="${themeName}"]`;
            
            const themeRule = new Rule({ selector: themeSelector });
            const prefix = opts.prefix.cssVariable;
            
            // Process theme colors
            function processThemeColors(obj, path = []) {
                for (const [key, value] of Object.entries(obj)) {
                    if (typeof value === 'object' && value !== null) {
                        processThemeColors(value, [...path, key]);
                    } else {
                        const varName = `--${prefix}${path.concat(key).join('-')}`;
                        themeRule.append({ prop: varName, value: String(value) });
                    }
                }
            }
            
            processThemeColors(themeConfig.colors);
            
            // Add theme-specific variables
            if (themeConfig.borderRadius) {
                themeRule.append({ prop: `--${prefix}border-radius`, value: themeConfig.borderRadius });
            }
            
            root.before(themeRule);
        }
    }
    
    // Generate utility custom properties
    const utilityVariables = {
        // Shadows
        shadow: {
            'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
            'none': '0 0 #0000'
        },
        
        // Border radius
        radius: {
            'none': '0px',
            'sm': '0.125rem',
            'DEFAULT': '0.25rem',
            'md': '0.375rem',
            'lg': '0.5rem',
            'xl': '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            'full': '9999px'
        },
        
        // Transitions
        transition: {
            'none': 'none',
            'all': 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            'DEFAULT': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            'opacity': 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            'shadow': 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            'transform': 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
        },
        
        // Z-index
        zIndex: {
            '0': '0',
            '10': '10',
            '20': '20',
            '30': '30',
            '40': '40',
            '50': '50',
            'auto': 'auto'
        }
    };
    
    const utilityProps = generateCustomProperties(utilityVariables, opts);
    root.before(utilityProps);
};