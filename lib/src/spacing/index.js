const { generateSpacingUtilities, styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const spacingScale = opts.spacing || {};
    
    // Generate margin utilities
    const marginUtilities = generateSpacingUtilities(spacingScale, 'margin', opts);
    styleClass(['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'margin-inline', 'margin-block'], marginUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    // Generate padding utilities  
    const paddingUtilities = generateSpacingUtilities(spacingScale, 'padding', opts);
    styleClass(['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'padding-inline', 'padding-block'], paddingUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    // Generate gap utilities
    const gapUtilities = {};
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        gapUtilities[`gap-${scale}`] = cssValue;
        gapUtilities[`gap-x-${scale}`] = `0 ${cssValue}`;
        gapUtilities[`gap-y-${scale}`] = `${cssValue} 0`;
    }
    
    styleClass('gap', gapUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};