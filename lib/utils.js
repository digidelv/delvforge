const { Rule, AtRule } = require('postcss');
const chroma = require('chroma-js');

// Enhanced selector generation with better theme support
function getSelector(selector, themeName, options = {}) {
    const { prefix = '', important = false, pseudo = '' } = options;
    const importantStr = important ? ' !important' : '';
    
    if (themeName) {
        return `:is([data-df-theme="${themeName}"] .${themeName}\\:${prefix}${selector}${pseudo})`;
    }
    
    return `.${prefix}${selector}${pseudo}`;
}

// Advanced theme system with inheritance
function getThemes(opts = {}) {
    const themes = opts.themes || {};
    const themeKeys = Object.keys(themes);
    const defaultThemeKey = themeKeys.find(key => themes[key].default) || themeKeys[0];
    const themeNames = themeKeys.map(key => (defaultThemeKey === key ? '' : themes[key].name || key));

    return {
        themes,
        themeNames,
        defaultTheme: defaultThemeKey,
        forEach(fn) {
            themeNames.forEach(fn);
        },
        always(fn) {
            themeNames.length ? themeNames.forEach(fn) : fn('');
        },
        withTheme(themeName, fn) {
            if (themes[themeName]) {
                fn(themes[themeName]);
            }
        }
    };
}

// Enhanced style class generation with advanced features
function styleClass(propName, obj, parent, opts, options = {}) {
    const {
        responsive = false,
        states = false,
        withTheme = false,
        containerQuery = false,
        modernSelectors = false
    } = options;

    const _styleClass = function (themeName = '') {
        const prefix = opts.prefix.className;
        const { important, separator, breakpoints } = opts;
        const pseudoStates = ['hover', 'focus', 'active', 'focus-visible', 'disabled'];
        const propNames = Array.isArray(propName) ? propName : [propName];

        // Base utilities
        for (const className in obj) {
            const selector = getSelector(className, themeName, { prefix, important });
            const rule = new Rule({ selector });

            propNames.forEach(p => {
                const value = typeof obj[className] === 'function' 
                    ? obj[className](themeName, opts) 
                    : obj[className];
                rule.append({ prop: p, value, important });
            });
            
            parent.before(rule);
        }

        // State variants
        if (states) {
            for (const className in obj) {
                for (const state of pseudoStates) {
                    const selector = getSelector(`${state}${separator}${className}`, themeName, { 
                        prefix, 
                        important, 
                        pseudo: `:${state}` 
                    });
                    const rule = new Rule({ selector });

                    propNames.forEach(p => {
                        const value = typeof obj[className] === 'function' 
                            ? obj[className](themeName, opts) 
                            : obj[className];
                        rule.append({ prop: p, value, important });
                    });
                    
                    parent.before(rule);
                }
            }
        }

        // Responsive variants
        if (responsive) {
            for (const breakpoint in breakpoints) {
                const mediaRule = new AtRule({ 
                    name: 'media', 
                    params: `screen and (min-width: ${breakpoints[breakpoint]})` 
                });

                for (const className in obj) {
                    const selector = getSelector(`${breakpoint}${separator}${className}`, themeName, { prefix });
                    const rule = new Rule({ selector });

                    propNames.forEach(p => {
                        const value = typeof obj[className] === 'function' 
                            ? obj[className](themeName, opts) 
                            : obj[className];
                        rule.append({ prop: p, value, important });
                    });
                    
                    mediaRule.append(rule);
                }

                // Responsive state variants
                if (states) {
                    for (const className in obj) {
                        for (const state of pseudoStates) {
                            const selector = getSelector(
                                `${breakpoint}${separator}${state}${separator}${className}`, 
                                themeName, 
                                { prefix, pseudo: `:${state}` }
                            );
                            const rule = new Rule({ selector });

                            propNames.forEach(p => {
                                const value = typeof obj[className] === 'function' 
                                    ? obj[className](themeName, opts) 
                                    : obj[className];
                                rule.append({ prop: p, value, important });
                            });
                            
                            mediaRule.append(rule);
                        }
                    }
                }

                parent.before(mediaRule);
            }
        }

        // Container queries (modern feature)
        if (containerQuery && opts.features.containerQueries) {
            const containers = opts.containers || {};
            for (const container in containers) {
                const containerRule = new AtRule({
                    name: 'container',
                    params: `(min-width: ${containers[container]})`
                });

                for (const className in obj) {
                    const selector = getSelector(`@${container}${separator}${className}`, themeName, { prefix });
                    const rule = new Rule({ selector });

                    propNames.forEach(p => {
                        const value = typeof obj[className] === 'function' 
                            ? obj[className](themeName, opts) 
                            : obj[className];
                        rule.append({ prop: p, value, important });
                    });
                    
                    containerRule.append(rule);
                }

                parent.before(containerRule);
            }
        }
    };

    // Apply theme-aware or standard generation
    withTheme ? getThemes(opts).always(_styleClass) : _styleClass();
}

// Advanced color utilities
function generateColorVariants(colorObj, baseProperty) {
    const variants = {};
    
    for (const [shade, value] of Object.entries(colorObj)) {
        variants[`${baseProperty}-${shade}`] = value;
        
        // Generate opacity variants
        for (let opacity = 10; opacity <= 90; opacity += 10) {
            const opacityValue = opacity / 100;
            try {
                const color = chroma(value).alpha(opacityValue);
                variants[`${baseProperty}-${shade}/${opacity}`] = color.css();
            } catch (e) {
                // Fallback for invalid colors
                variants[`${baseProperty}-${shade}/${opacity}`] = `color-mix(in srgb, ${value} ${opacity}%, transparent)`;
            }
        }
    }
    
    return variants;
}

// Fluid typography generator
function generateFluidTypography(minSize, maxSize, minViewport = '20rem', maxViewport = '80rem') {
    return `clamp(${minSize}, ${minSize} + (${parseFloat(maxSize) - parseFloat(minSize)}) * ((100vw - ${minViewport}) / (${parseFloat(maxViewport) - parseFloat(minViewport)})), ${maxSize})`;
}

// Advanced spacing utilities with logical properties
function generateSpacingUtilities(spacingScale, property, opts) {
    const utilities = {};
    const logicalProperties = opts.features.logicalProperties;
    
    const directions = {
        '': property,
        't': logicalProperties ? `${property}-block-start` : `${property}-top`,
        'r': logicalProperties ? `${property}-inline-end` : `${property}-right`,
        'b': logicalProperties ? `${property}-block-end` : `${property}-bottom`,
        'l': logicalProperties ? `${property}-inline-start` : `${property}-left`,
        'x': logicalProperties ? `${property}-inline` : [`${property}-left`, `${property}-right`],
        'y': logicalProperties ? `${property}-block` : [`${property}-top`, `${property}-bottom`]
    };

    for (const [scale, value] of Object.entries(spacingScale)) {
        for (const [dir, prop] of Object.entries(directions)) {
            const className = dir ? `${property.charAt(0)}${dir}-${scale}` : `${property.charAt(0)}-${scale}`;
            const cssValue = typeof value === 'number' ? `${value}rem` : value;
            
            if (Array.isArray(prop)) {
                utilities[className] = (themeName, opts) => {
                    return prop.map(p => `${p}: ${cssValue}`).join('; ');
                };
            } else {
                utilities[className] = cssValue;
            }
        }
    }
    
    return utilities;
}

// Component class utilities
function generateComponentUtilities(components) {
    const utilities = {};
    
    for (const [componentName, config] of Object.entries(components)) {
        const { base, variants = {}, sizes = {} } = config;
        
        // Base component
        utilities[componentName] = base;
        
        // Variants
        for (const [variantName, variantClasses] of Object.entries(variants)) {
            utilities[`${componentName}-${variantName}`] = `${base} ${variantClasses}`;
        }
        
        // Sizes
        for (const [sizeName, sizeClasses] of Object.entries(sizes)) {
            utilities[`${componentName}-${sizeName}`] = `${base} ${sizeClasses}`;
            
            // Size + variant combinations
            for (const [variantName, variantClasses] of Object.entries(variants)) {
                utilities[`${componentName}-${sizeName}-${variantName}`] = `${base} ${sizeClasses} ${variantClasses}`;
            }
        }
    }
    
    return utilities;
}

// Advanced rule generation
function appendRules(root, opts, classNames, options = {}) {
    const { responsive = false, states = false } = options;
    
    for (const className in classNames) {
        const rule = new Rule({ selector: getSelector(className, undefined, { prefix: opts.prefix.className }) });
        const properties = classNames[className].split(';');

        properties.forEach((prop) => {
            const [key, value] = prop.split(':');
            if (key && value) {
                rule.append({ prop: key.trim(), value: value.trim() });
            }
        });
        
        root.before(rule);
    }
}

// CSS custom property generator
function generateCustomProperties(vars, opts) {
    const root = new Rule({ selector: ':root' });
    const prefix = opts.prefix.cssVariable;
    
    function processObject(obj, path = []) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                processObject(value, [...path, key]);
            } else {
                const varName = `--${prefix}${path.concat(key).join('-')}`;
                root.append({ prop: varName, value: String(value) });
            }
        }
    }
    
    processObject(vars);
    return root;
}

module.exports = {
    styleClass,
    appendRules,
    getSelector,
    getThemes,
    generateColorVariants,
    generateFluidTypography,
    generateSpacingUtilities,
    generateComponentUtilities,
    generateCustomProperties
};