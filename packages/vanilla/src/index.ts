/**
 * DelvForge Vanilla JavaScript Integration
 * Pure JavaScript utilities for DOM manipulation
 */

import { DelvForge, DelvForgeConfig, cn } from '@delvforge/core';

// Global DelvForge instance
let globalDf: DelvForge;

// Initialize DelvForge
export function initDelvForge(config: Partial<DelvForgeConfig> = {}): DelvForge {
  globalDf = new DelvForge({ ...config, framework: 'vanilla' });
  globalDf.applyFrameworkOptimizations('vanilla');
  
  // Make available globally
  if (typeof window !== 'undefined') {
    (window as any).DelvForge = globalDf;
    (window as any).df = globalDf;
    (window as any).cn = cn;
  }
  
  return globalDf;
}

// Get or create global instance
export function getDelvForge(): DelvForge {
  if (!globalDf) {
    globalDf = initDelvForge();
  }
  return globalDf;
}

// DOM Utilities
export class DelvForgeDOM {
  private df: DelvForge;

  constructor(config: Partial<DelvForgeConfig> = {}) {
    this.df = new DelvForge({ ...config, framework: 'vanilla' });
    this.df.applyFrameworkOptimizations('vanilla');
  }

  // Create element with DelvForge classes
  createElement(
    tag: string, 
    options: {
      df?: string;
      class?: string;
      id?: string;
      attributes?: Record<string, string>;
      text?: string;
      html?: string;
      children?: (HTMLElement | string)[];
    } = {}
  ): HTMLElement {
    const element = document.createElement(tag);
    
    // Add classes
    if (options.df) {
      const classes = options.df.split(' ').map(cls => this.df.className(cls));
      element.classList.add(...classes);
    }
    
    if (options.class) {
      element.classList.add(...options.class.split(' '));
    }
    
    // Set ID
    if (options.id) {
      element.id = options.id;
    }
    
    // Set attributes
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    // Set content
    if (options.text) {
      element.textContent = options.text;
    } else if (options.html) {
      element.innerHTML = options.html;
    }
    
    // Add children
    if (options.children) {
      options.children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }
    
    return element;
  }

  // Query selector with automatic class prefixing
  $(selector: string, context: Document | HTMLElement = document): HTMLElement | null {
    // Convert df-utility syntax to actual class names
    const processedSelector = this.processSelector(selector);
    return context.querySelector(processedSelector);
  }

  // Query all with automatic class prefixing
  $$(selector: string, context: Document | HTMLElement = document): NodeListOf<HTMLElement> {
    const processedSelector = this.processSelector(selector);
    return context.querySelectorAll(processedSelector);
  }

  private processSelector(selector: string): string {
    // Replace .df-utility with actual prefixed class names
    return selector.replace(/\.df-([a-zA-Z0-9-]+)/g, (match, utility) => {
      return `.${this.df.className(utility)}`;
    });
  }

  // Add DelvForge classes to existing element
  addClass(element: HTMLElement, utilities: string): void {
    const classes = utilities.split(' ').map(cls => this.df.className(cls));
    element.classList.add(...classes);
  }

  // Remove DelvForge classes from element
  removeClass(element: HTMLElement, utilities: string): void {
    const classes = utilities.split(' ').map(cls => this.df.className(cls));
    element.classList.remove(...classes);
  }

  // Toggle DelvForge classes
  toggleClass(element: HTMLElement, utilities: string, force?: boolean): void {
    const classes = utilities.split(' ');
    classes.forEach(cls => {
      const className = this.df.className(cls);
      if (force !== undefined) {
        element.classList.toggle(className, force);
      } else {
        element.classList.toggle(className);
      }
    });
  }

  // Check if element has DelvForge class
  hasClass(element: HTMLElement, utility: string): boolean {
    return element.classList.contains(this.df.className(utility));
  }

  // Set CSS custom properties from DelvForge config
  setCSSVariables(element: HTMLElement = document.documentElement): void {
    const colors = this.df.config.colors || {};
    const spacing = this.df.config.spacing || {};
    
    // Set color variables
    Object.entries(colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'object') {
        Object.entries(colorValue).forEach(([shade, value]) => {
          element.style.setProperty(this.df.cssVariable(`${colorName}-${shade}`), value as string);
        });
      } else {
        element.style.setProperty(this.df.cssVariable(colorName), colorValue as string);
      }
    });
    
    // Set spacing variables
    Object.entries(spacing).forEach(([size, value]) => {
      const cssValue = typeof value === 'number' ? `${value}rem` : value;
      element.style.setProperty(this.df.cssVariable(`spacing-${size}`), cssValue as string);
    });
  }

  // Responsive utility checker
  isBreakpoint(breakpoint: string): boolean {
    const bp = this.df.breakpoint(breakpoint);
    if (!bp || typeof window === 'undefined') return false;
    
    return window.matchMedia(`(min-width: ${bp})`).matches;
  }

  // Watch for breakpoint changes
  watchBreakpoint(breakpoint: string, callback: (matches: boolean) => void): () => void {
    const bp = this.df.breakpoint(breakpoint);
    if (!bp || typeof window === 'undefined') {
      return () => {};
    }
    
    const mediaQuery = window.matchMedia(`(min-width: ${bp})`);
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    
    // Call immediately with current state
    callback(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handler);
    
    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', handler);
  }
}

// Component builders
export class ComponentBuilder {
  private dom: DelvForgeDOM;

  constructor(config: Partial<DelvForgeConfig> = {}) {
    this.dom = new DelvForgeDOM(config);
  }

  // Build a card component
  card(options: {
    variant?: 'default' | 'elevated' | 'outlined' | 'flat';
    padding?: string;
    className?: string;
    children?: (HTMLElement | string)[];
  } = {}): HTMLElement {
    const { variant = 'default', padding = '6', className = '', children = [] } = options;
    
    return this.dom.createElement('div', {
      df: cn(
        'card',
        variant !== 'default' && `card-${variant}`,
        `p-${padding}`
      ),
      class: className,
      children
    });
  }

  // Build a button component
  button(options: {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    text?: string;
    onClick?: (event: Event) => void;
  } = {}): HTMLButtonElement {
    const { 
      variant = 'primary', 
      size = 'md', 
      fullWidth = false, 
      disabled = false,
      className = '',
      text = '',
      onClick
    } = options;
    
    const button = this.dom.createElement('button', {
      df: cn(
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        fullWidth && 'w-full'
      ),
      class: className,
      text,
      attributes: {
        ...(disabled && { disabled: 'true' }),
        type: 'button'
      }
    }) as HTMLButtonElement;
    
    if (onClick) {
      button.addEventListener('click', onClick);
    }
    
    return button;
  }

  // Build a form group
  formGroup(options: {
    label?: string;
    required?: boolean;
    error?: string;
    className?: string;
    children?: (HTMLElement | string)[];
  } = {}): HTMLElement {
    const { label, required = false, error, className = '', children = [] } = options;
    
    const group = this.dom.createElement('div', {
      df: 'form-group',
      class: className
    });
    
    if (label) {
      const labelEl = this.dom.createElement('label', {
        df: 'form-label',
        html: label + (required ? ' <span class="text-danger-500">*</span>' : '')
      });
      group.appendChild(labelEl);
    }
    
    children.forEach(child => {
      if (typeof child === 'string') {
        group.appendChild(document.createTextNode(child));
      } else {
        group.appendChild(child);
      }
    });
    
    if (error) {
      const errorEl = this.dom.createElement('div', {
        df: 'form-error',
        text: error
      });
      group.appendChild(errorEl);
    }
    
    return group;
  }

  // Build an input
  input(options: {
    type?: string;
    placeholder?: string;
    value?: string;
    error?: boolean;
    className?: string;
    attributes?: Record<string, string>;
    onChange?: (event: Event) => void;
  } = {}): HTMLInputElement {
    const { 
      type = 'text', 
      placeholder = '', 
      value = '', 
      error = false,
      className = '',
      attributes = {},
      onChange
    } = options;
    
    const input = this.dom.createElement('input', {
      df: cn('form-control', error && 'form-invalid'),
      class: className,
      attributes: {
        type,
        placeholder,
        value,
        ...attributes
      }
    }) as HTMLInputElement;
    
    if (onChange) {
      input.addEventListener('input', onChange);
    }
    
    return input;
  }

  // Build a grid container
  grid(options: {
    cols?: number | string;
    gap?: number | string;
    responsive?: Record<string, number>;
    className?: string;
    children?: (HTMLElement | string)[];
  } = {}): HTMLElement {
    const { cols = 1, gap = 4, responsive = {}, className = '', children = [] } = options;
    
    const responsiveClasses = Object.entries(responsive)
      .map(([bp, col]) => `${bp}:grid-cols-${col}`)
      .join(' ');
    
    return this.dom.createElement('div', {
      df: cn(
        'grid',
        `grid-cols-${cols}`,
        `gap-${gap}`,
        responsiveClasses
      ),
      class: className,
      children
    });
  }
}

// Auto-initialization for browser environments
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!(window as any).DelvForge) {
        initDelvForge();
      }
    });
  } else {
    // DOM is already ready
    if (!(window as any).DelvForge) {
      initDelvForge();
    }
  }
}

// Create default instances
export const dom = new DelvForgeDOM();
export const components = new ComponentBuilder();

// Utility functions
export function df(utility: string): string {
  return getDelvForge().className(utility);
}

export function responsive(breakpoint: string, utility: string): string {
  return getDelvForge().responsive(breakpoint, utility);
}

export function state(state: string, utility: string): string {
  return getDelvForge().state(state, utility);
}

// Export everything from core
export { cn, DelvForge, type DelvForgeConfig } from '@delvforge/core';

// Default export for script tag usage
const DelvForgeVanilla = {
  init: initDelvForge,
  DelvForge,
  DelvForgeDOM,
  ComponentBuilder,
  dom,
  components,
  cn,
  df,
  responsive,
  state
};

export default DelvForgeVanilla;

// Make available globally for script tag usage
if (typeof window !== 'undefined') {
  (window as any).DelvForgeVanilla = DelvForgeVanilla;
}