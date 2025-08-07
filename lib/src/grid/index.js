const { styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const gridColumns = opts.grid?.columns || 24;
    
    // Grid container utilities
    const gridUtilities = {
        'grid': 'grid',
        'inline-grid': 'inline-grid',
    };
    
    // Grid template columns - Enhanced 24-column system
    const gridTemplateColumnsUtilities = {
        'grid-cols-none': 'none',
        'grid-cols-subgrid': 'subgrid', // CSS Subgrid support
    };
    
    for (let i = 1; i <= gridColumns; i++) {
        gridTemplateColumnsUtilities[`grid-cols-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
    }
    
    // Grid column span
    const gridColumnUtilities = {
        'col-auto': 'auto',
        'col-span-full': '1 / -1',
    };
    
    for (let i = 1; i <= gridColumns; i++) {
        gridColumnUtilities[`col-span-${i}`] = `span ${i} / span ${i}`;
        gridColumnUtilities[`col-start-${i}`] = i.toString();
        gridColumnUtilities[`col-end-${i}`] = i.toString();
    }
    
    // Grid template rows
    const gridTemplateRowsUtilities = {
        'grid-rows-none': 'none',
        'grid-rows-subgrid': 'subgrid',
    };
    
    for (let i = 1; i <= 12; i++) {
        gridTemplateRowsUtilities[`grid-rows-${i}`] = `repeat(${i}, minmax(0, 1fr))`;
    }
    
    // Grid row span
    const gridRowUtilities = {
        'row-auto': 'auto',
        'row-span-full': '1 / -1',
    };
    
    for (let i = 1; i <= 12; i++) {
        gridRowUtilities[`row-span-${i}`] = `span ${i} / span ${i}`;
        gridRowUtilities[`row-start-${i}`] = i.toString();
        gridRowUtilities[`row-end-${i}`] = i.toString();
    }
    
    // Grid auto flow
    const gridAutoFlowUtilities = {
        'grid-flow-row': 'row',
        'grid-flow-col': 'column',
        'grid-flow-dense': 'dense',
        'grid-flow-row-dense': 'row dense',
        'grid-flow-col-dense': 'column dense',
    };
    
    // Grid auto columns and rows
    const gridAutoUtilities = {
        'auto-cols-auto': 'auto',
        'auto-cols-min': 'min-content',
        'auto-cols-max': 'max-content',
        'auto-cols-fr': 'minmax(0, 1fr)',
        'auto-rows-auto': 'auto',
        'auto-rows-min': 'min-content',
        'auto-rows-max': 'max-content',
        'auto-rows-fr': 'minmax(0, 1fr)',
    };
    
    // Gap utilities (integrated with spacing scale)
    const gapUtilities = {};
    const spacingScale = opts.spacing || {};
    
    for (const [scale, value] of Object.entries(spacingScale)) {
        const cssValue = typeof value === 'number' ? `${value}rem` : value;
        gapUtilities[`gap-${scale}`] = cssValue;
        gapUtilities[`gap-x-${scale}`] = cssValue;
        gapUtilities[`gap-y-${scale}`] = cssValue;
    }
    
    // Place utilities
    const placeUtilities = {
        'place-content-center': 'center',
        'place-content-start': 'start',
        'place-content-end': 'end',
        'place-content-between': 'space-between',
        'place-content-around': 'space-around',
        'place-content-evenly': 'space-evenly',
        'place-content-stretch': 'stretch',
        'place-items-start': 'start',
        'place-items-end': 'end',
        'place-items-center': 'center',
        'place-items-stretch': 'stretch',
        'place-self-auto': 'auto',
        'place-self-start': 'start',
        'place-self-end': 'end',
        'place-self-center': 'center',
        'place-self-stretch': 'stretch',
    };
    
    // Apply utilities with responsive support
    styleClass('display', gridUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('grid-template-columns', gridTemplateColumnsUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['grid-column', 'grid-column-start', 'grid-column-end'], gridColumnUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('grid-template-rows', gridTemplateRowsUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['grid-row', 'grid-row-start', 'grid-row-end'], gridRowUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('grid-auto-flow', gridAutoFlowUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['grid-auto-columns', 'grid-auto-rows'], gridAutoUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['gap', 'column-gap', 'row-gap'], gapUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['place-content', 'place-items', 'place-self'], placeUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};