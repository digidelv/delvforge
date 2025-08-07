const { styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const spacingScale = opts.spacing || {};
    
    const heightUtilities = {
        'h-auto': 'auto',
        'h-full': '100%',
        'h-screen': '100vh',
        'h-min': 'min-content',
        'h-max': 'max-content',
        'h-fit': 'fit-content',
    };
    
    // Add spacing-based heights
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        heightUtilities[`h-${scale}`] = cssValue;
    }
    
    styleClass('height', heightUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};