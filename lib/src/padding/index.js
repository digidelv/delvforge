const { generateSpacingUtilities, styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const spacingScale = opts.spacing || {};
    
    // Generate comprehensive padding utilities
    const paddingUtilities = {};
    
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        
        // All sides
        paddingUtilities[`p-${scale}`] = cssValue;
        
        // Individual sides (with logical properties support)
        if (opts.features?.logicalProperties) {
            paddingUtilities[`pt-${scale}`] = { 'padding-block-start': cssValue };
            paddingUtilities[`pr-${scale}`] = { 'padding-inline-end': cssValue };
            paddingUtilities[`pb-${scale}`] = { 'padding-block-end': cssValue };
            paddingUtilities[`pl-${scale}`] = { 'padding-inline-start': cssValue };
            paddingUtilities[`px-${scale}`] = { 'padding-inline': cssValue };
            paddingUtilities[`py-${scale}`] = { 'padding-block': cssValue };
        } else {
            paddingUtilities[`pt-${scale}`] = cssValue;
            paddingUtilities[`pr-${scale}`] = cssValue;
            paddingUtilities[`pb-${scale}`] = cssValue;
            paddingUtilities[`pl-${scale}`] = cssValue;
            paddingUtilities[`px-${scale}`] = `0 ${cssValue}`;
            paddingUtilities[`py-${scale}`] = `${cssValue} 0`;
        }
    }
    
    const propName = opts.features?.logicalProperties ? 
        ['padding', 'padding-block-start', 'padding-inline-end', 'padding-block-end', 'padding-inline-start', 'padding-inline', 'padding-block'] :
        ['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'];
    
    styleClass(propName, paddingUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};