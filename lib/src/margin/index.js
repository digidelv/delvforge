const { generateSpacingUtilities, styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const spacingScale = opts.spacing || {};
    
    // Generate comprehensive margin utilities
    const marginUtilities = {};
    
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        const negativeValue = typeof value === 'number' ? `-${value}rem` : `-${value}`;
        
        // All sides
        marginUtilities[`m-${scale}`] = cssValue;
        
        // Individual sides (with logical properties support)
        if (opts.features?.logicalProperties) {
            marginUtilities[`mt-${scale}`] = { 'margin-block-start': cssValue };
            marginUtilities[`mr-${scale}`] = { 'margin-inline-end': cssValue };
            marginUtilities[`mb-${scale}`] = { 'margin-block-end': cssValue };
            marginUtilities[`ml-${scale}`] = { 'margin-inline-start': cssValue };
            marginUtilities[`mx-${scale}`] = { 'margin-inline': cssValue };
            marginUtilities[`my-${scale}`] = { 'margin-block': cssValue };
        } else {
            marginUtilities[`mt-${scale}`] = cssValue;
            marginUtilities[`mr-${scale}`] = cssValue;
            marginUtilities[`mb-${scale}`] = cssValue;
            marginUtilities[`ml-${scale}`] = cssValue;
            marginUtilities[`mx-${scale}`] = `0 ${cssValue}`;
            marginUtilities[`my-${scale}`] = `${cssValue} 0`;
        }
        
        // Negative margins
        if (scale !== '0') {
            marginUtilities[`-m-${scale}`] = negativeValue;
            marginUtilities[`-mt-${scale}`] = negativeValue;
            marginUtilities[`-mr-${scale}`] = negativeValue;
            marginUtilities[`-mb-${scale}`] = negativeValue;
            marginUtilities[`-ml-${scale}`] = negativeValue;
            marginUtilities[`-mx-${scale}`] = `0 ${negativeValue}`;
            marginUtilities[`-my-${scale}`] = `${negativeValue} 0`;
        }
    }
    
    // Auto margins
    marginUtilities['m-auto'] = 'auto';
    marginUtilities['mt-auto'] = 'auto';
    marginUtilities['mr-auto'] = 'auto';
    marginUtilities['mb-auto'] = 'auto';
    marginUtilities['ml-auto'] = 'auto';
    marginUtilities['mx-auto'] = '0 auto';
    marginUtilities['my-auto'] = 'auto 0';
    
    const propName = opts.features?.logicalProperties ? 
        ['margin', 'margin-block-start', 'margin-inline-end', 'margin-block-end', 'margin-inline-start', 'margin-inline', 'margin-block'] :
        ['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'];
    
    styleClass(propName, marginUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};