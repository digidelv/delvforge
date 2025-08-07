const { styleClass, generateComponentUtilities } = require('../../../utils');

module.exports = (root, opts) => {
    const components = opts.components || {};
    
    // Generate component utilities from configuration
    const componentUtilities = generateComponentUtilities(components);
    
    // Enhanced card components
    const cardUtilities = {
        // Base card
        'card': 'background-color: var(--df-surface-section); border: 1px solid var(--df-surface-border); border-radius: var(--df-border-radius); padding: 1rem; box-shadow: var(--df-shadow-sm)',
        
        // Card variants
        'card-flat': 'background-color: var(--df-surface-section); border: 1px solid var(--df-surface-border); border-radius: var(--df-border-radius); padding: 1rem',
        'card-elevated': 'background-color: var(--df-surface-section); border-radius: var(--df-border-radius); padding: 1rem; box-shadow: var(--df-shadow-lg)',
        'card-outlined': 'background-color: var(--df-surface-section); border: 2px solid var(--df-primary-500); border-radius: var(--df-border-radius); padding: 1rem',
        
        // Card sections
        'card-header': 'padding: 1rem 1rem 0.5rem; border-bottom: 1px solid var(--df-surface-border)',
        'card-body': 'padding: 1rem',
        'card-footer': 'padding: 0.5rem 1rem 1rem; border-top: 1px solid var(--df-surface-border)',
        
        // Card sizes
        'card-sm': 'padding: 0.75rem',
        'card-lg': 'padding: 1.5rem',
        'card-xl': 'padding: 2rem'
    };
    
    // Enhanced button components
    const buttonUtilities = {
        // Base button
        'btn': 'display: inline-flex; align-items: center; justify-content: center; border-radius: var(--df-border-radius); font-weight: 500; transition: all 150ms ease; cursor: pointer; text-decoration: none; border: 1px solid transparent; font-size: 0.875rem; padding: 0.5rem 1rem; line-height: 1.25rem',
        
        // Button variants
        'btn-primary': 'background-color: var(--df-primary-500); color: var(--df-primary-invert); border-color: var(--df-primary-500)',
        'btn-secondary': 'background-color: var(--df-surface-100); color: var(--df-text-primary); border-color: var(--df-surface-300)',
        'btn-success': 'background-color: var(--df-success-500); color: white; border-color: var(--df-success-500)',
        'btn-warning': 'background-color: var(--df-warning-500); color: white; border-color: var(--df-warning-500)',
        'btn-danger': 'background-color: var(--df-danger-500); color: white; border-color: var(--df-danger-500)',
        'btn-outline': 'background-color: transparent; color: var(--df-primary-500); border-color: var(--df-primary-500)',
        'btn-ghost': 'background-color: transparent; color: var(--df-text-primary); border-color: transparent',
        
        // Button sizes
        'btn-xs': 'padding: 0.25rem 0.5rem; font-size: 0.75rem; line-height: 1rem',
        'btn-sm': 'padding: 0.375rem 0.75rem; font-size: 0.8125rem; line-height: 1.125rem',
        'btn-lg': 'padding: 0.75rem 1.5rem; font-size: 1rem; line-height: 1.5rem',
        'btn-xl': 'padding: 1rem 2rem; font-size: 1.125rem; line-height: 1.75rem',
        
        // Button states
        'btn-loading': 'position: relative; color: transparent',
        'btn-disabled': 'opacity: 0.5; cursor: not-allowed; pointer-events: none'
    };
    
    // Form components
    const formUtilities = {
        // Form group
        'form-group': 'display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem',
        'form-row': 'display: flex; gap: 1rem; align-items: end',
        
        // Form controls
        'form-control': 'display: block; width: 100%; padding: 0.5rem 0.75rem; font-size: 0.875rem; line-height: 1.5; background-color: var(--df-surface-section); border: 1px solid var(--df-surface-border); border-radius: var(--df-border-radius); transition: border-color 150ms ease, box-shadow 150ms ease',
        'form-select': 'display: block; width: 100%; padding: 0.5rem 2rem 0.5rem 0.75rem; font-size: 0.875rem; line-height: 1.5; background-color: var(--df-surface-section); border: 1px solid var(--df-surface-border); border-radius: var(--df-border-radius); background-image: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 16px 12px',
        
        // Form labels and help text
        'form-label': 'display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--df-text-primary)',
        'form-help': 'font-size: 0.75rem; color: var(--df-text-secondary); margin-top: 0.25rem',
        'form-error': 'font-size: 0.75rem; color: var(--df-danger-500); margin-top: 0.25rem',
        
        // Form validation states
        'form-valid': 'border-color: var(--df-success-500)',
        'form-invalid': 'border-color: var(--df-danger-500)',
        
        // Checkboxes and radios
        'form-check': 'display: flex; align-items: center; gap: 0.5rem',
        'form-check-input': 'width: 1rem; height: 1rem; border: 1px solid var(--df-surface-border); border-radius: 0.25rem'
    };
    
    // Navigation components
    const navUtilities = {
        // Navigation bar
        'navbar': 'display: flex; align-items: center; justify-content: space-between; padding: 1rem; background-color: var(--df-surface-section); border-bottom: 1px solid var(--df-surface-border)',
        'navbar-brand': 'font-size: 1.25rem; font-weight: 600; text-decoration: none; color: var(--df-text-primary)',
        'navbar-nav': 'display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0',
        'navbar-item': 'color: var(--df-text-secondary); text-decoration: none; padding: 0.5rem',
        'navbar-active': 'color: var(--df-primary-500); font-weight: 500',
        
        // Breadcrumbs
        'breadcrumb': 'display: flex; align-items: center; gap: 0.5rem; list-style: none; margin: 0; padding: 0',
        'breadcrumb-item': 'color: var(--df-text-secondary)',
        'breadcrumb-separator': 'color: var(--df-text-secondary); user-select: none',
        
        // Tabs
        'tabs': 'display: flex; border-bottom: 1px solid var(--df-surface-border)',
        'tab': 'padding: 0.75rem 1rem; cursor: pointer; border-bottom: 2px solid transparent; transition: all 150ms ease',
        'tab-active': 'border-bottom-color: var(--df-primary-500); color: var(--df-primary-500); font-weight: 500'
    };
    
    // Badge and chip components
    const badgeUtilities = {
        // Badges
        'badge': 'display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; border-radius: 9999px; line-height: 1',
        'badge-primary': 'background-color: var(--df-primary-500); color: var(--df-primary-invert)',
        'badge-secondary': 'background-color: var(--df-surface-200); color: var(--df-text-primary)',
        'badge-success': 'background-color: var(--df-success-500); color: white',
        'badge-warning': 'background-color: var(--df-warning-500); color: white',
        'badge-danger': 'background-color: var(--df-danger-500); color: white',
        'badge-outline': 'background-color: transparent; border: 1px solid var(--df-primary-500); color: var(--df-primary-500)',
        
        // Badge sizes
        'badge-sm': 'padding: 0.125rem 0.375rem; font-size: 0.6875rem',
        'badge-lg': 'padding: 0.375rem 0.75rem; font-size: 0.875rem',
        
        // Chips (removable badges)
        'chip': 'display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; background-color: var(--df-surface-100); border-radius: 9999px',
        'chip-remove': 'cursor: pointer; opacity: 0.7; transition: opacity 150ms ease'
    };
    
    // Combine all component utilities
    const allComponentUtilities = {
        ...componentUtilities,
        ...cardUtilities,
        ...buttonUtilities,
        ...formUtilities,
        ...navUtilities,
        ...badgeUtilities
    };
    
    // Apply component utilities
    styleClass(
        ['display', 'background-color', 'color', 'border', 'padding', 'margin', 'border-radius', 'box-shadow', 'font-weight', 'font-size', 'line-height', 'transition', 'cursor', 'text-decoration', 'opacity', 'align-items', 'justify-content', 'flex-direction', 'gap', 'width', 'height', 'position'],
        allComponentUtilities,
        root,
        opts,
        {
            responsive: true,
            states: true,
            withTheme: true
        }
    );
};