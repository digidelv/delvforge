/**
 * DelvForge Vue Integration
 * Vue 3 specific utilities and components
 */

import { 
  defineComponent, 
  inject, 
  provide, 
  computed, 
  h, 
  App, 
  Plugin,
  InjectionKey,
  ComputedRef
} from 'vue';
import { DelvForge, DelvForgeConfig, cn } from '@delvforge/core';

// Injection key for DelvForge instance
const DelvForgeKey: InjectionKey<DelvForge> = Symbol('delvforge');

// Vue plugin
export const DelvForgePlugin: Plugin = {
  install(app: App, options: Partial<DelvForgeConfig> = {}) {
    const df = new DelvForge({ ...options, framework: 'vue' });
    df.applyFrameworkOptimizations('vue');
    
    app.provide(DelvForgeKey, df);
    
    // Global properties
    app.config.globalProperties.$df = df;
    app.config.globalProperties.$cn = cn;
  }
};

// Composable for using DelvForge
export function useDelvForge(): DelvForge {
  const df = inject(DelvForgeKey);
  if (!df) {
    // Return default instance if no plugin installed
    const instance = new DelvForge({ framework: 'vue' });
    instance.applyFrameworkOptimizations('vue');
    return instance;
  }
  return df;
}

// Utility composable for class names
export function useClassName() {
  const df = useDelvForge();
  
  return {
    cn: (...classes: (string | undefined | null | false)[]) => cn(...classes),
    df: (utility: string) => df.className(utility),
    responsive: (breakpoint: string, utility: string) => df.responsive(breakpoint, utility),
    state: (state: string, utility: string) => df.state(state, utility)
  };
}

// Responsive utilities composable
export function useResponsive() {
  const df = useDelvForge();
  
  const responsive = (classes: Record<string, string>) => {
    return Object.entries(classes)
      .map(([breakpoint, utility]) => 
        breakpoint === 'default' ? df.className(utility) : df.responsive(breakpoint, utility)
      )
      .join(' ');
  };

  return { responsive };
}

// Box component
export const DfBox = defineComponent({
  name: 'DfBox',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    df: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots, attrs }) {
    const { cn } = useClassName();
    
    const classes = computed(() => cn(props.df, attrs.class as string));
    
    return () => h(props.as, { ...attrs, class: classes.value }, slots.default?.());
  }
});

// Container component
export const DfContainer = defineComponent({
  name: 'DfContainer',
  props: {
    size: {
      type: String,
      default: 'xl',
      validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'fluid'].includes(value)
    },
    center: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    const containerClass = computed(() => cn(
      df('w-full'),
      props.center && df('mx-auto'),
      props.size === 'fluid' ? df('px-4') : df(`container-${props.size}`),
      attrs.class as string
    ));

    return () => h('div', { ...attrs, class: containerClass.value }, slots.default?.());
  }
});

// Grid component
export const DfGrid = defineComponent({
  name: 'DfGrid',
  props: {
    cols: {
      type: [Number, String],
      default: 1
    },
    gap: {
      type: [Number, String],
      default: 4
    },
    responsive: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    const gridClasses = computed(() => cn(
      df('grid'),
      df(`grid-cols-${props.cols}`),
      df(`gap-${props.gap}`),
      ...Object.entries(props.responsive).map(([bp, col]) => df(`${bp}:grid-cols-${col}`)),
      attrs.class as string
    ));

    return () => h('div', { ...attrs, class: gridClasses.value }, slots.default?.());
  }
});

// Flex component
export const DfFlex = defineComponent({
  name: 'DfFlex',
  props: {
    direction: {
      type: String,
      default: 'row',
      validator: (value: string) => ['row', 'column', 'row-reverse', 'column-reverse'].includes(value)
    },
    justify: {
      type: String,
      default: 'start',
      validator: (value: string) => ['start', 'end', 'center', 'between', 'around', 'evenly'].includes(value)
    },
    align: {
      type: String,
      default: 'start',
      validator: (value: string) => ['start', 'end', 'center', 'baseline', 'stretch'].includes(value)
    },
    wrap: {
      type: Boolean,
      default: false
    },
    gap: {
      type: [Number, String],
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    const flexClasses = computed(() => cn(
      df('flex'),
      df(`flex-${props.direction}`),
      df(`justify-${props.justify}`),
      df(`items-${props.align}`),
      props.wrap && df('flex-wrap'),
      props.gap && df(`gap-${props.gap}`),
      attrs.class as string
    ));

    return () => h('div', { ...attrs, class: flexClasses.value }, slots.default?.());
  }
});

// Card component
export const DfCard = defineComponent({
  name: 'DfCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'elevated', 'outlined', 'flat'].includes(value)
    },
    padding: {
      type: [Number, String],
      default: 6
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    const cardClasses = computed(() => cn(
      df('card'),
      props.variant !== 'default' && df(`card-${props.variant}`),
      df(`p-${props.padding}`),
      attrs.class as string
    ));

    return () => h('div', { ...attrs, class: cardClasses.value }, slots.default?.());
  }
});

// Button component
export const DfButton = defineComponent({
  name: 'DfButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { slots, attrs, emit }) {
    const { cn, df } = useClassName();
    
    const buttonClasses = computed(() => cn(
      df('btn'),
      df(`btn-${props.variant}`),
      props.size !== 'md' && df(`btn-${props.size}`),
      props.fullWidth && df('w-full'),
      props.loading && df('btn-loading'),
      attrs.class as string
    ));

    const handleClick = (event: Event) => {
      if (!props.disabled && !props.loading) {
        emit('click', event);
      }
    };

    return () => h('button', {
      ...attrs,
      class: buttonClasses.value,
      disabled: props.disabled || props.loading,
      onClick: handleClick
    }, [
      props.loading && h('div', { class: df('animate-spin w-4 h-4 mr-2') }, '⟳'),
      slots.default?.()
    ]);
  }
});

// Text component
export const DfText = defineComponent({
  name: 'DfText',
  props: {
    as: {
      type: String,
      default: 'p'
    },
    size: {
      type: String,
      default: 'base',
      validator: (value: string) => ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].includes(value)
    },
    weight: {
      type: String,
      default: 'normal',
      validator: (value: string) => ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'].includes(value)
    },
    color: {
      type: String,
      default: undefined
    },
    align: {
      type: String,
      default: undefined,
      validator: (value: string) => ['left', 'center', 'right', 'justify'].includes(value)
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    const textClasses = computed(() => cn(
      df(`text-${props.size}`),
      props.weight !== 'normal' && df(`font-${props.weight}`),
      props.color && df(`text-${props.color}`),
      props.align && df(`text-${props.align}`),
      attrs.class as string
    ));

    return () => h(props.as, { ...attrs, class: textClasses.value }, slots.default?.());
  }
});

// Form components
export const DfFormGroup = defineComponent({
  name: 'DfFormGroup',
  props: {
    label: {
      type: String,
      default: undefined
    },
    error: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs }) {
    const { cn, df } = useClassName();
    
    return () => h('div', { 
      ...attrs, 
      class: cn(df('form-group'), attrs.class as string) 
    }, [
      props.label && h('label', { class: df('form-label') }, [
        props.label,
        props.required && h('span', { class: df('text-danger-500 ml-1') }, '*')
      ]),
      slots.default?.(),
      props.error && h('div', { class: df('form-error') }, props.error)
    ]);
  }
});

export const DfInput = defineComponent({
  name: 'DfInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const { cn, df } = useClassName();
    
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    return () => h('input', {
      ...attrs,
      class: cn(
        df('form-control'),
        props.error && df('form-invalid'),
        attrs.class as string
      ),
      value: props.modelValue,
      onInput: handleInput
    });
  }
});

// Directive for dynamic classes
export const vDf = {
  mounted(el: HTMLElement, binding: any) {
    const df = new DelvForge({ framework: 'vue' });
    df.applyFrameworkOptimizations('vue');
    
    const classes = typeof binding.value === 'string' 
      ? binding.value.split(' ').map((cls: string) => df.className(cls))
      : Object.entries(binding.value).map(([key, value]) => 
          value ? df.className(key) : null
        ).filter(Boolean);
    
    el.classList.add(...classes);
  },
  
  updated(el: HTMLElement, binding: any) {
    const df = new DelvForge({ framework: 'vue' });
    df.applyFrameworkOptimizations('vue');
    
    // Remove old classes
    if (binding.oldValue) {
      const oldClasses = typeof binding.oldValue === 'string' 
        ? binding.oldValue.split(' ').map((cls: string) => df.className(cls))
        : Object.entries(binding.oldValue).map(([key, value]) => 
            value ? df.className(key) : null
          ).filter(Boolean);
      
      el.classList.remove(...oldClasses);
    }
    
    // Add new classes
    const newClasses = typeof binding.value === 'string' 
      ? binding.value.split(' ').map((cls: string) => df.className(cls))
      : Object.entries(binding.value).map(([key, value]) => 
          value ? df.className(key) : null
        ).filter(Boolean);
    
    el.classList.add(...newClasses);
  }
};

// Global components array for easy registration
export const DelvForgeComponents = [
  DfBox,
  DfContainer,
  DfGrid,
  DfFlex,
  DfCard,
  DfButton,
  DfText,
  DfFormGroup,
  DfInput
];

// Auto-install plugin with global components
export const DelvForgeVue: Plugin = {
  install(app: App, options: Partial<DelvForgeConfig> = {}) {
    // Install core plugin
    app.use(DelvForgePlugin, options);
    
    // Register global components
    DelvForgeComponents.forEach(component => {
      app.component(component.name!, component);
    });
    
    // Register directive
    app.directive('df', vDf);
  }
};

// Export everything
export { 
  cn, 
  DelvForge, 
  type DelvForgeConfig,
  DelvForgePlugin as install
} from '@delvforge/core';

// Default export for convenience
export default DelvForgeVue;