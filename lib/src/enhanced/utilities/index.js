const { styleClass, generateFluidTypography } = require('../../../utils');

module.exports = (root, opts) => {
    // Enhanced utility classes that extend beyond basic functionality
    
    // Fluid typography
    if (opts.features?.fluidTypography) {
        const fluidTypographyUtilities = {};
        const fontSize = opts.fontSize || {};
        
        for (const [size, value] of Object.entries(fontSize)) {
            if (Array.isArray(value)) {
                const [minSize, { lineHeight }] = value;
                const maxSize = `calc(${minSize} * 1.5)`;
                fluidTypographyUtilities[`text-fluid-${size}`] = generateFluidTypography(minSize, maxSize);
            }
        }
        
        styleClass('font-size', fluidTypographyUtilities, root, opts, {
            responsive: false,
            states: false,
            withTheme: false
        });
    }
    
    // Advanced spacing utilities with CSS calc
    const advancedSpacingUtilities = {
        'space-safe-top': 'env(safe-area-inset-top)',
        'space-safe-right': 'env(safe-area-inset-right)',
        'space-safe-bottom': 'env(safe-area-inset-bottom)',
        'space-safe-left': 'env(safe-area-inset-left)',
        'space-viewport-sm': 'min(2rem, 5vw)',
        'space-viewport-md': 'min(4rem, 8vw)',
        'space-viewport-lg': 'min(6rem, 12vw)'
    };
    
    styleClass(['padding', 'margin'], advancedSpacingUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    // Enhanced interaction utilities
    const interactionUtilities = {
        'select-none': 'none',
        'select-text': 'text',
        'select-all': 'all',
        'select-auto': 'auto',
        'pointer-none': 'none',
        'pointer-auto': 'auto',
        'cursor-pointer': 'pointer',
        'cursor-wait': 'wait',
        'cursor-text': 'text',
        'cursor-move': 'move',
        'cursor-help': 'help',
        'cursor-not-allowed': 'not-allowed'
    };
    
    styleClass(['user-select', 'pointer-events', 'cursor'], interactionUtilities, root, opts, {
        responsive: true,
        states: true,
        withTheme: false
    });
    
    // Advanced layout utilities
    const layoutUtilities = {
        'aspect-square': '1 / 1',
        'aspect-video': '16 / 9',
        'aspect-photo': '4 / 3',
        'aspect-auto': 'auto',
        'object-contain': 'contain',
        'object-cover': 'cover',
        'object-fill': 'fill',
        'object-none': 'none',
        'object-scale-down': 'scale-down'
    };
    
    styleClass(['aspect-ratio', 'object-fit'], layoutUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    // Print utilities
    const printUtilities = {
        'print:hidden': 'none',
        'print:block': 'block',
        'print:inline': 'inline',
        'print:flex': 'flex'
    };
    
    // Add print media queries
    const printMedia = '@media print';
    for (const [className, value] of Object.entries(printUtilities)) {
        const [, printClass] = className.split(':');
        styleClass('display', { [printClass]: value }, root, { 
            ...opts, 
            breakpoints: { print: printMedia } 
        }, {
            responsive: true,
            states: false,
            withTheme: false
        });
    }
};