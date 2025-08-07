const { styleClass } = require('../../utils');

module.exports = (root, opts) => {
    const displayUtilities = {
        'block': 'block',
        'inline-block': 'inline-block',
        'inline': 'inline',
        'flex': 'flex',
        'inline-flex': 'inline-flex',
        'table': 'table',
        'inline-table': 'inline-table',
        'table-caption': 'table-caption',
        'table-cell': 'table-cell',
        'table-column': 'table-column',
        'table-column-group': 'table-column-group',
        'table-footer-group': 'table-footer-group',
        'table-header-group': 'table-header-group',
        'table-row-group': 'table-row-group',
        'table-row': 'table-row',
        'flow-root': 'flow-root',
        'grid': 'grid',
        'inline-grid': 'inline-grid',
        'contents': 'contents',
        'list-item': 'list-item',
        'hidden': 'none'
    };
    
    styleClass('display', displayUtilities, root, opts, {
        responsive: true,
        states: false,
        withTheme: false
    });
};