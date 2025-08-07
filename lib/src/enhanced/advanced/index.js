const { styleClass } = require('../../../utils');

module.exports = (root, opts) => {
    // Advanced CSS features that go beyond basic utilities
    
    // Container queries utilities
    if (opts.features?.containerQueries) {
        const containerQueryUtilities = {
            '@container-sm': '(min-width: 20rem)',
            '@container-md': '(min-width: 40rem)', 
            '@container-lg': '(min-width: 60rem)',
            '@container-xl': '(min-width: 80rem)'
        };
        
        styleClass('container', containerQueryUtilities, root, opts, {
            responsive: false,
            states: false,
            withTheme: false,
            containerQuery: true
        });
    }
    
    // CSS Grid advanced features
    if (opts.features?.advancedGrid) {
        const advancedGridUtilities = {
            'grid-auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
            'grid-auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
            'grid-dense': 'dense',
            'subgrid': 'subgrid'
        };
        
        styleClass(['grid-template-columns', 'grid-auto-flow'], advancedGridUtilities, root, opts, {
            responsive: true,
            states: false,
            withTheme: false
        });
    }
    
    // Modern CSS selectors
    if (opts.features?.modernSelectors) {
        const modernUtilities = {
            'has-hover': '&:has(:hover)',
            'not-last': '&:not(:last-child)',
            'not-first': '&:not(:first-child)',
            'where-focus': '&:where(:focus)',
            'is-active': '&:is(:active, :focus)'
        };
        
        // These would need special handling in the styleClass function
        // For now, just log that they're supported
        console.log('Modern selectors feature enabled');
    }
};