const { styleClass, generateCustomProperties } = require('../../../utils');

module.exports = (root, opts) => {
    const containers = opts.containers || {};
    const breakpoints = opts.breakpoints || {};
    
    // Modern container system with container queries
    const containerUtilities = {
        'container': 'container',
        'container-fluid': '100%'
    };
    
    // Container size variants
    for (const [size, width] of Object.entries(containers)) {
        containerUtilities[`container-${size}`] = width;
    }
    
    // Container query utilities (if supported)
    if (opts.features?.containerQueries) {
        const containerQueryUtilities = {};
        
        // Container types
        containerQueryUtilities['@container'] = 'inline-size';
        containerQueryUtilities['@container-normal'] = 'normal';
        containerQueryUtilities['@container-size'] = 'size';
        
        // Container names
        for (const [name] of Object.entries(containers)) {
            containerQueryUtilities[`@container-${name}`] = `${name} inline-size`;
        }
        
        styleClass('container-type', containerQueryUtilities, root, opts, {
            responsive: false,
            states: false,
            withTheme: false
        });
    }
    
    // Responsive container behavior
    let responsiveContainerCSS = `
        .container {
            width: 100%;
            margin-inline: auto;
            padding-inline: var(--df-container-padding, 1rem);
        }
        
        .container-fluid {
            width: 100%;
            padding-inline: var(--df-container-padding, 1rem);
        }
    `;
    
    // Add responsive breakpoints for containers
    for (const [breakpoint, width] of Object.entries(breakpoints)) {
        if (containers[breakpoint]) {
            responsiveContainerCSS += `
                @media (min-width: ${width}) {
                    .container {
                        max-width: ${containers[breakpoint]};
                    }
                }
            `;
        }
    }
    
    // Advanced container features
    const advancedContainerUtilities = {
        // Centered containers with different max-widths
        'container-prose': '65ch',        // Optimal for reading
        'container-narrow': '36rem',      // 576px equivalent
        'container-wide': '80rem',        // 1280px equivalent
        'container-full': '100vw',        // Full viewport width
        
        // Container with specific aspect ratios
        'container-square': 'aspect-ratio: 1 / 1; width: 100%',
        'container-video': 'aspect-ratio: 16 / 9; width: 100%',
        'container-portrait': 'aspect-ratio: 3 / 4; width: 100%',
        
        // Scroll containers
        'container-scroll': 'overflow: auto; max-height: 100%',
        'container-scroll-x': 'overflow-x: auto; overflow-y: hidden',
        'container-scroll-y': 'overflow-y: auto; overflow-x: hidden',
        
        // Safe area containers (for mobile)
        'container-safe': `
            padding-top: env(safe-area-inset-top);
            padding-right: env(safe-area-inset-right);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left)
        `
    };
    
    styleClass(['width', 'max-width', 'container-type'], containerUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    // Add custom properties for container system
    const containerVariables = {
        'container-padding': '1rem',
        'container-padding-sm': '0.75rem',
        'container-padding-lg': '1.5rem',
    };
    
    const customProps = generateCustomProperties({ container: containerVariables }, opts);
    root.before(customProps);
    
    // Add the responsive container CSS directly
    root.before(responsiveContainerCSS);
};