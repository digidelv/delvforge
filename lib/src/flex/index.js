const { styleClass } = require('../../utils');

module.exports = (root, opts) => {
    // Flex container utilities
    const flexUtilities = {
        'flex': 'flex',
        'inline-flex': 'inline-flex',
    };
    
    // Flex direction
    const flexDirectionUtilities = {
        'flex-row': 'row',
        'flex-row-reverse': 'row-reverse',
        'flex-col': 'column',
        'flex-col-reverse': 'column-reverse',
    };
    
    // Flex wrap
    const flexWrapUtilities = {
        'flex-wrap': 'wrap',
        'flex-wrap-reverse': 'wrap-reverse',
        'flex-nowrap': 'nowrap',
    };
    
    // Flex grow and shrink
    const flexGrowShrinkUtilities = {
        'flex-1': '1 1 0%',
        'flex-auto': '1 1 auto',
        'flex-initial': '0 1 auto',
        'flex-none': 'none',
        'grow': '1',
        'grow-0': '0',
        'shrink': '1',
        'shrink-0': '0',
    };
    
    // Justify content
    const justifyContentUtilities = {
        'justify-start': 'flex-start',
        'justify-end': 'flex-end',
        'justify-center': 'center',
        'justify-between': 'space-between',
        'justify-around': 'space-around',
        'justify-evenly': 'space-evenly',
        'justify-stretch': 'stretch',
    };
    
    // Align items
    const alignItemsUtilities = {
        'items-start': 'flex-start',
        'items-end': 'flex-end',
        'items-center': 'center',
        'items-baseline': 'baseline',
        'items-stretch': 'stretch',
    };
    
    // Align content
    const alignContentUtilities = {
        'content-start': 'flex-start',
        'content-end': 'flex-end',
        'content-center': 'center',
        'content-between': 'space-between',
        'content-around': 'space-around',
        'content-evenly': 'space-evenly',
        'content-stretch': 'stretch',
    };
    
    // Align self
    const alignSelfUtilities = {
        'self-auto': 'auto',
        'self-start': 'flex-start',
        'self-end': 'flex-end',
        'self-center': 'center',
        'self-baseline': 'baseline',
        'self-stretch': 'stretch',
    };
    
    // Order utilities
    const orderUtilities = {};
    for (let i = 0; i <= 12; i++) {
        orderUtilities[`order-${i}`] = i.toString();
    }
    orderUtilities['order-first'] = '-9999';
    orderUtilities['order-last'] = '9999';
    orderUtilities['order-none'] = '0';
    
    // Apply utilities with responsive support
    styleClass('display', flexUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('flex-direction', flexDirectionUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('flex-wrap', flexWrapUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass(['flex', 'flex-grow', 'flex-shrink'], flexGrowShrinkUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('justify-content', justifyContentUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('align-items', alignItemsUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('align-content', alignContentUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('align-self', alignSelfUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
    
    styleClass('order', orderUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};