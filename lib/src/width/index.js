const { styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const spacingScale = opts.spacing || {};
    
    const widthUtilities = {
        'w-auto': 'auto',
        'w-full': '100%',
        'w-screen': '100vw',
        'w-min': 'min-content',
        'w-max': 'max-content',
        'w-fit': 'fit-content',
    };
    
    // Add spacing-based widths
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        widthUtilities[`w-${scale}`] = cssValue;
    }
    
    // Add percentage-based widths
    const percentages = [0, 5, 10, 15, 20, 25, 30, 33, 40, 50, 60, 66, 70, 75, 80, 85, 90, 95, 100];
    percentages.forEach(percent => {
        if (percent === 33) {
            widthUtilities[`w-1/3`] = '33.333333%';
        } else if (percent === 66) {
            widthUtilities[`w-2/3`] = '66.666667%';
        } else {
            widthUtilities[`w-${percent}`] = `${percent}%`;
        }
    });
    
    styleClass('width', widthUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};