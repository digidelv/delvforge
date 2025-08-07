const { styleClass, generateColorVariants } = require('../../utils');

module.exports = (root, opts) => {
    const colors = opts.colors || {};
    
    // Generate text color utilities
    const textColorUtilities = {};
    
    for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
            // Color palette with shades
            const variants = generateColorVariants(colorValue, `text-${colorName}`);
            Object.assign(textColorUtilities, variants);
        } else {
            // Single color value
            textColorUtilities[`text-${colorName}`] = colorValue;
        }
    }
    
    // Add semantic colors and special values
    textColorUtilities['text-inherit'] = 'inherit';
    textColorUtilities['text-current'] = 'currentColor';
    textColorUtilities['text-transparent'] = 'transparent';
    textColorUtilities['text-black'] = '#000000';
    textColorUtilities['text-white'] = '#ffffff';
    
    // Generate background color utilities
    const backgroundColorUtilities = {};
    
    for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
            // Color palette with shades
            const variants = generateColorVariants(colorValue, `bg-${colorName}`);
            Object.assign(backgroundColorUtilities, variants);
        } else {
            // Single color value
            backgroundColorUtilities[`bg-${colorName}`] = colorValue;
        }
    }
    
    // Add semantic colors and special values
    backgroundColorUtilities['bg-inherit'] = 'inherit';
    backgroundColorUtilities['bg-current'] = 'currentColor';
    backgroundColorUtilities['bg-transparent'] = 'transparent';
    backgroundColorUtilities['bg-black'] = '#000000';
    backgroundColorUtilities['bg-white'] = '#ffffff';
    
    // Generate border color utilities
    const borderColorUtilities = {};
    
    for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
            // Color palette with shades
            const variants = generateColorVariants(colorValue, `border-${colorName}`);
            Object.assign(borderColorUtilities, variants);
        } else {
            // Single color value
            borderColorUtilities[`border-${colorName}`] = colorValue;
        }
    }
    
    // Add semantic colors and special values
    borderColorUtilities['border-inherit'] = 'inherit';
    borderColorUtilities['border-current'] = 'currentColor';
    borderColorUtilities['border-transparent'] = 'transparent';
    borderColorUtilities['border-black'] = '#000000';
    borderColorUtilities['border-white'] = '#ffffff';
    
    // Apply color utilities with theme support and states
    styleClass('color', textColorUtilities, root, opts, {
        responsive: true,
        states: true,
        withTheme: true
    });
    
    styleClass('background-color', backgroundColorUtilities, root, opts, {
        responsive: true,
        states: true,
        withTheme: true
    });
    
    styleClass('border-color', borderColorUtilities, root, opts, {
        responsive: true,
        states: true,
        withTheme: true
    });
};