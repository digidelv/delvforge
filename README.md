# DelvForge - Universal CSS Utility Framework

<div align="center">
  
  [![npm version](https://badge.fury.io/js/@delvforge%2Fcore.svg)](https://badge.fury.io/js/@delvforge%2Fcore)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

  **Universal CSS Utility Framework for React, Vue, Angular, React Native & Vanilla JS**

  *One framework, multiple platforms. Build consistent, modern interfaces across all your favorite technologies.*

</div>

## 🚀 Quick Start

Choose your framework and get started immediately:

### React
```bash
npm install @delvforge/react
```

```jsx
import { DelvForgeProvider, Container, Button } from '@delvforge/react';
import '@delvforge/core/css';

function App() {
  return (
    <DelvForgeProvider>
      <Container>
        <Button variant="primary">Hello DelvForge!</Button>
      </Container>
    </DelvForgeProvider>
  );
}
```

### Vue 3
```bash
npm install @delvforge/vue
```

```vue
<template>
  <df-container>
    <df-button variant="primary">Hello DelvForge!</df-button>
  </df-container>
</template>

<script setup>
import { createApp } from 'vue'
import DelvForgeVue from '@delvforge/vue'
import '@delvforge/core/css'

const app = createApp(App)
app.use(DelvForgeVue)
</script>
```

### Angular
```bash
npm install @delvforge/angular
```

```typescript
import { DelvForgeModule } from '@delvforge/angular';

@NgModule({
  imports: [DelvForgeModule.forRoot()]
})
export class AppModule { }
```

```html
<df-container>
  <df-button variant="primary">Hello DelvForge!</df-button>
</df-container>
```

### React Native
```bash
npm install @delvforge/react-native
```

```tsx
import { DelvForgeProvider, Container, Button } from '@delvforge/react-native';

function App() {
  return (
    <DelvForgeProvider>
      <Container>
        <Button variant="primary">Hello DelvForge!</Button>
      </Container>
    </DelvForgeProvider>
  );
}
```

### Vanilla JavaScript
```html
<script src="https://unpkg.com/@delvforge/vanilla/dist/index.browser.js"></script>
<link href="https://unpkg.com/@delvforge/core/css" rel="stylesheet">

<script>
const { components } = DelvForgeVanilla;
const button = components.button({
  variant: 'primary',
  text: 'Hello DelvForge!'
});
document.body.appendChild(button);
</script>
```

## 🎯 Why DelvForge?

### Universal Framework Support
- **React** - Full TypeScript support with hooks and components
- **Vue 3** - Composition API with reactive components  
- **Angular** - Services, directives, and standalone components
- **React Native** - Native mobile components with style mapping
- **Vanilla JS** - Pure JavaScript with DOM utilities

### Advanced Features
- **🎨 24-Column Grid System** - More granular than traditional 12-column
- **📱 7-Breakpoint Responsive** - xs, sm, md, lg, xl, 2xl, 3xl
- **🎭 Component Libraries** - Pre-built UI components for each framework
- **⚡ Modern CSS** - Container queries, logical properties, advanced selectors
- **🎨 Extended Colors** - Rich color palettes with opacity variants
- **🧩 Auto-Detection** - Automatically configures for your framework

## 📦 Packages

| Package | Description | Size |
|---------|-------------|------|
| `@delvforge/core` | Framework-agnostic core utilities | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/core) |
| `@delvforge/react` | React components and hooks | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/react) |
| `@delvforge/vue` | Vue 3 components and composables | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/vue) |
| `@delvforge/angular` | Angular services and components | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/angular) |
| `@delvforge/react-native` | React Native components | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/react-native) |
| `@delvforge/vanilla` | Pure JavaScript utilities | ![size](https://img.shields.io/bundlephobia/minzip/@delvforge/vanilla) |

## 🛠️ Framework-Specific Features

### React Features
- **TypeScript-first** with full type safety
- **Custom Hooks** - `useDelvForge()`, `useClassName()`, `useResponsive()`
- **JSX Components** - `<Container>`, `<Grid>`, `<Button>`, `<Card>`
- **Context Provider** for global configuration
- **Responsive Props** with intelligent breakpoint handling

```jsx
import { useClassName, useResponsive } from '@delvforge/react';

function MyComponent() {
  const { cn, df } = useClassName();
  const { responsive } = useResponsive();
  
  return (
    <div className={responsive({
      default: 'text-center',
      md: 'text-left',
      lg: 'text-xl'
    })}>
      Responsive text
    </div>
  );
}
```

### Vue 3 Features
- **Composition API** with reactive composables
- **Global Components** auto-registered with plugin
- **Custom Directive** - `v-df` for dynamic classes
- **Template-friendly** component API
- **Reactive Configuration** with provide/inject

```vue
<template>
  <div v-df="{ 'text-center': isCentered, 'bg-primary-500': isPrimary }">
    Dynamic classes
  </div>
</template>

<script setup>
import { useDelvForge } from '@delvforge/vue'

const { responsive } = useDelvForge()
</script>
```

### Angular Features
- **Dependency Injection** with `DelvForgeService`
- **Standalone Components** compatible with modern Angular
- **Structural Directives** for conditional styling
- **Pipes** for class transformation
- **AOT Compatible** with full optimization support

```typescript
@Component({
  selector: 'app-example',
  template: `
    <div [dfClass]="'text-center'" 
         [dfResponsive]="{ md: 'text-left', lg: 'text-xl' }">
      Angular with DelvForge
    </div>
  `
})
export class ExampleComponent {
  constructor(private df: DelvForgeService) {}
}
```

### React Native Features
- **Style Mapping** - Automatically converts utilities to React Native styles
- **Platform Optimization** - Optimized for mobile performance
- **Native Components** - ScrollView, TouchableOpacity integration
- **Gesture Handling** - Built-in touch and gesture support
- **Safe Area** - Automatic safe area handling

```tsx
import { Box, Text } from '@delvforge/react-native';

function MobileCard() {
  return (
    <Box df="p-4 bg-white rounded-lg shadow-lg">
      <Text df="text-lg font-bold text-gray-900">
        Native Mobile Card
      </Text>
    </Box>
  );
}
```

### Vanilla JavaScript Features
- **DOM Utilities** - Enhanced querySelector with utility class support
- **Component Builders** - Programmatic component creation
- **Event Handling** - Built-in event system
- **No Dependencies** - Pure JavaScript implementation
- **Browser Compatibility** - Works in all modern browsers

```javascript
import { dom, components } from '@delvforge/vanilla';

// Create elements with utilities
const card = dom.createElement('div', {
  df: 'p-6 bg-white rounded-lg shadow-lg',
  children: [
    dom.createElement('h2', { 
      df: 'text-xl font-bold mb-2', 
      text: 'Vanilla JS Card' 
    })
  ]
});

// Or use component builders
const button = components.button({
  variant: 'primary',
  size: 'lg',
  text: 'Click me!',
  onClick: () => console.log('Clicked!')
});
```

## 🎨 Utility System

### Spacing System
```css
/* Margin */
.df-m-4    /* margin: 1rem */
.df-mx-4   /* margin-left: 1rem; margin-right: 1rem */
.df-my-4   /* margin-top: 1rem; margin-bottom: 1rem */

/* Padding */
.df-p-4    /* padding: 1rem */
.df-px-4   /* padding-left: 1rem; padding-right: 1rem */
.df-py-4   /* padding-top: 1rem; padding-bottom: 1rem */
```

### Advanced Grid System
```css
/* 24-column system */
.df-grid-cols-24        /* 24 equal columns */
.df-col-span-6         /* spans 6 columns (25%) */
.df-col-span-8         /* spans 8 columns (33.33%) */
.df-col-span-12        /* spans 12 columns (50%) */

/* Responsive grid */
.md:df-grid-cols-8     /* 8 columns on medium screens */
.lg:df-grid-cols-12    /* 12 columns on large screens */
```

### Color System with Opacity
```css
/* Base colors */
.df-bg-primary-500     /* Primary background */
.df-text-success-600   /* Success text color */

/* Opacity variants */
.df-bg-primary-500/20  /* Primary background with 20% opacity */
.df-text-gray-900/75   /* Gray text with 75% opacity */
```

### Responsive Breakpoints
```css
/* All breakpoints available */
.xs:df-text-center    /* 480px+ */
.sm:df-text-left     /* 640px+ */
.md:df-text-center   /* 768px+ */
.lg:df-text-right    /* 1024px+ */
.xl:df-text-center   /* 1280px+ */
.2xl:df-text-left    /* 1536px+ */
.3xl:df-text-center  /* 1920px+ */
```

## ⚙️ Configuration

### Global Configuration
```typescript
import { configure } from '@delvforge/core';

const df = configure({
  prefix: {
    className: 'df-',
    cssVariable: 'df-'
  },
  colors: {
    brand: {
      500: '#your-brand-color'
    }
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1200px'
  },
  features: {
    containerQueries: true,
    modernSelectors: true,
    logicalProperties: true
  }
});
```

### Framework-Specific Config

**React:**
```jsx
<DelvForgeProvider config={{
  colors: { brand: { 500: '#ff6b35' } }
}}>
  <App />
</DelvForgeProvider>
```

**Vue:**
```javascript
app.use(DelvForgeVue, {
  colors: { brand: { 500: '#ff6b35' } }
});
```

**Angular:**
```typescript
DelvForgeModule.forRoot({
  colors: { brand: { 500: '#ff6b35' } }
})
```

## 🏗️ Component Libraries

Each framework gets a complete component library:

### Universal Components
- **Container** - Responsive container with size variants
- **Grid** - Advanced grid system with 24-column support
- **Flex** - Flexible box layout components
- **Card** - Card components with multiple variants
- **Button** - Button components with states and sizes
- **Text** - Typography components with responsive sizing
- **Form** - Complete form component system

### Framework-Specific Extensions
- **React** - Hooks for responsive design and state management
- **Vue** - Composables for reactive styling and breakpoints
- **Angular** - Services for theme management and responsive queries
- **React Native** - Native mobile components with gesture support
- **Vanilla** - DOM utilities and component builders

## 🔧 Advanced Features

### Container Queries
```css
.@container {
  container-type: inline-size;
}

.@sm:df-text-lg {
  /* Applied when container is >= small size */
}
```

### Modern CSS Features
```css
/* Logical properties (RTL-aware) */
.df-ms-4 { margin-inline-start: 1rem; }
.df-me-4 { margin-inline-end: 1rem; }

/* Fluid typography */
.df-text-fluid-lg {
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
}
```

### Auto-Framework Detection
```typescript
// Automatically detects and configures for your framework
import DelvForge from '@delvforge/core';

const df = new DelvForge(); // Auto-detects React, Vue, Angular, etc.
df.applyFrameworkOptimizations(); // Applies framework-specific optimizations
```

## 📱 Platform-Specific Optimizations

### Web Browsers
- CSS Grid and Flexbox optimization
- Modern selector support
- Container queries where supported
- Progressive enhancement

### React Native
- Style object mapping
- Platform-specific optimizations
- Performance-optimized renders
- Native component integration

### Server-Side Rendering
- Zero-runtime CSS generation
- Framework-agnostic PostCSS plugin
- Build-time optimization
- Critical CSS extraction

## 🤝 Migration Guide

### From Tailwind CSS
```bash
# Replace Tailwind with DelvForge
npm uninstall tailwindcss
npm install @delvforge/react # or your framework
```

Most Tailwind utilities work with DelvForge by adding the `df-` prefix:
```css
/* Tailwind */
.text-center .bg-blue-500

/* DelvForge */  
.df-text-center .df-bg-primary-500
```

### From Bootstrap
DelvForge provides utility-first alternatives to Bootstrap's component classes:
```html
<!-- Bootstrap -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <button class="btn btn-primary">Button</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- DelvForge -->
<df-container>
  <df-grid cols="1" responsive="{ md: 2 }">
    <df-card padding="6">
      <df-button variant="primary">Button</df-button>
    </df-card>
  </df-grid>
</df-container>
```

## 📖 Examples & Templates

- **[React Example](./examples/react-example/)** - Complete React application
- **[Vue Example](./examples/vue-example/)** - Vue 3 with Composition API
- **[Angular Example](./examples/angular-example/)** - Modern Angular application
- **[React Native Example](./examples/react-native-example/)** - Mobile app template
- **[Vanilla Example](./examples/vanilla-example/)** - Pure JavaScript implementation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆚 Comparison

| Feature | DelvForge | Tailwind CSS | Bootstrap | Bulma |
|---------|-----------|-------------|-----------|-------|
| **Framework Support** | React, Vue, Angular, RN, Vanilla | CSS Only | CSS + JS | CSS Only |
| **Grid System** | 24-column | 12-column | 12-column | 12-column |
| **Breakpoints** | 7 breakpoints | 5 breakpoints | 5 breakpoints | 5 breakpoints |
| **Container Queries** | ✅ | ❌ | ❌ | ❌ |
| **Component Library** | ✅ | ❌ | ✅ | ✅ |
| **TypeScript** | Full support | Partial | Partial | ❌ |
| **React Native** | ✅ | ❌ | ❌ | ❌ |
| **Auto-detection** | ✅ | ❌ | ❌ | ❌ |

## 🔗 Links

- **[Official Website](https://delvforge.com)**
- **[Documentation](https://docs.delvforge.com)**
- **[Examples & Playground](https://examples.delvforge.com)**
- **[GitHub Repository](https://github.com/yourcompany/delvforge)**
- **[Discord Community](https://discord.gg/delvforge)**

---

<div align="center">
  <strong>Built with ❤️ for the modern web</strong>
  <br>
  <sub>DelvForge - One Framework, Everywhere</sub>
</div>