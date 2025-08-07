/**
 * DelvForge Angular Integration
 * Angular-specific services, directives, and utilities
 */

import { 
  Injectable, 
  Directive, 
  Input, 
  ElementRef, 
  OnInit, 
  OnDestroy, 
  OnChanges,
  SimpleChanges,
  InjectionToken,
  Inject,
  Optional,
  Pipe,
  PipeTransform,
  Component,
  TemplateRef,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { DelvForge, DelvForgeConfig, cn } from '@delvforge/core';

// Injection token for configuration
export const DELVFORGE_CONFIG = new InjectionToken<Partial<DelvForgeConfig>>('DELVFORGE_CONFIG');

// DelvForge Service
@Injectable({
  providedIn: 'root'
})
export class DelvForgeService {
  private df: DelvForge;

  constructor(@Optional() @Inject(DELVFORGE_CONFIG) config: Partial<DelvForgeConfig>) {
    this.df = new DelvForge({ ...config, framework: 'angular' });
    this.df.applyFrameworkOptimizations('angular');
  }

  get instance(): DelvForge {
    return this.df;
  }

  className(utility: string): string {
    return this.df.className(utility);
  }

  cssVariable(variable: string): string {
    return this.df.cssVariable(variable);
  }

  responsive(breakpoint: string, utility: string): string {
    return this.df.responsive(breakpoint, utility);
  }

  state(state: string, utility: string): string {
    return this.df.state(state, utility);
  }

  color(name: string, shade?: string): string | undefined {
    return this.df.color(name, shade);
  }

  spacing(size: string): string | number | undefined {
    return this.df.spacing(size);
  }

  breakpoint(size: string): string | undefined {
    return this.df.breakpoint(size);
  }
}

// Directive for applying DelvForge utilities
@Directive({
  selector: '[dfClass]',
  standalone: true
})
export class DfClassDirective implements OnInit, OnDestroy, OnChanges {
  @Input() dfClass: string = '';
  @Input() dfResponsive: Record<string, string> = {};
  @Input() dfState: Record<string, string> = {};

  private appliedClasses: string[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private dfService: DelvForgeService
  ) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dfClass'] || changes['dfResponsive'] || changes['dfState']) {
      this.updateClasses();
    }
  }

  ngOnDestroy(): void {
    this.removeClasses();
  }

  private updateClasses(): void {
    this.removeClasses();
    
    const classes: string[] = [];
    
    // Add base utility classes
    if (this.dfClass) {
      const utilities = this.dfClass.split(' ').filter(Boolean);
      utilities.forEach(utility => {
        classes.push(this.dfService.className(utility));
      });
    }
    
    // Add responsive classes
    Object.entries(this.dfResponsive).forEach(([breakpoint, utility]) => {
      classes.push(this.dfService.responsive(breakpoint, utility));
    });
    
    // Add state classes
    Object.entries(this.dfState).forEach(([state, utility]) => {
      classes.push(this.dfService.state(state, utility));
    });
    
    this.appliedClasses = classes;
    this.el.nativeElement.classList.add(...classes);
  }

  private removeClasses(): void {
    if (this.appliedClasses.length > 0) {
      this.el.nativeElement.classList.remove(...this.appliedClasses);
      this.appliedClasses = [];
    }
  }
}

// Pipe for class name generation
@Pipe({
  name: 'dfClass',
  standalone: true
})
export class DfClassPipe implements PipeTransform {
  constructor(private dfService: DelvForgeService) {}

  transform(utility: string): string {
    return this.dfService.className(utility);
  }
}

// Pipe for combining class names
@Pipe({
  name: 'cn',
  standalone: true
})
export class CnPipe implements PipeTransform {
  transform(...classes: (string | undefined | null | false)[]): string {
    return cn(...classes);
  }
}

// Responsive pipe
@Pipe({
  name: 'dfResponsive',
  standalone: true
})
export class DfResponsivePipe implements PipeTransform {
  constructor(private dfService: DelvForgeService) {}

  transform(breakpoint: string, utility: string): string {
    return this.dfService.responsive(breakpoint, utility);
  }
}

// Container Component
@Component({
  selector: 'df-container',
  standalone: true,
  template: `<div [class]="containerClasses"><ng-content></ng-content></div>`
})
export class DfContainerComponent implements OnInit {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fluid' = 'xl';
  @Input() center: boolean = true;
  @Input() class: string = '';

  containerClasses: string = '';

  constructor(private dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.containerClasses = cn(
      this.dfService.className('w-full'),
      this.center && this.dfService.className('mx-auto'),
      this.size === 'fluid' 
        ? this.dfService.className('px-4') 
        : this.dfService.className(`container-${this.size}`),
      this.class
    );
  }
}

// Grid Component
@Component({
  selector: 'df-grid',
  standalone: true,
  template: `<div [class]="gridClasses"><ng-content></ng-content></div>`
})
export class DfGridComponent implements OnInit, OnChanges {
  @Input() cols: number | string = 1;
  @Input() gap: number | string = 4;
  @Input() responsive: Record<string, number> = {};
  @Input() class: string = '';

  gridClasses: string = '';

  constructor(private dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    const responsiveClasses = Object.entries(this.responsive)
      .map(([bp, col]) => this.dfService.responsive(bp, `grid-cols-${col}`));

    this.gridClasses = cn(
      this.dfService.className('grid'),
      this.dfService.className(`grid-cols-${this.cols}`),
      this.dfService.className(`gap-${this.gap}`),
      ...responsiveClasses,
      this.class
    );
  }
}

// Flex Component
@Component({
  selector: 'df-flex',
  standalone: true,
  template: `<div [class]="flexClasses"><ng-content></ng-content></div>`
})
export class DfFlexComponent implements OnInit, OnChanges {
  @Input() direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'row';
  @Input() justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' = 'start';
  @Input() align: 'start' | 'end' | 'center' | 'baseline' | 'stretch' = 'start';
  @Input() wrap: boolean = false;
  @Input() gap: number | string | undefined;
  @Input() class: string = '';

  flexClasses: string = '';

  constructor(private dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    this.flexClasses = cn(
      this.dfService.className('flex'),
      this.dfService.className(`flex-${this.direction}`),
      this.dfService.className(`justify-${this.justify}`),
      this.dfService.className(`items-${this.align}`),
      this.wrap && this.dfService.className('flex-wrap'),
      this.gap && this.dfService.className(`gap-${this.gap}`),
      this.class
    );
  }
}

// Card Component
@Component({
  selector: 'df-card',
  standalone: true,
  template: `
    <div [class]="cardClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class DfCardComponent implements OnInit, OnChanges {
  @Input() variant: 'default' | 'elevated' | 'outlined' | 'flat' = 'default';
  @Input() padding: number | string = 6;
  @Input() class: string = '';

  cardClasses: string = '';

  constructor(private dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    this.cardClasses = cn(
      this.dfService.className('card'),
      this.variant !== 'default' && this.dfService.className(`card-${this.variant}`),
      this.dfService.className(`p-${this.padding}`),
      this.class
    );
  }
}

// Button Component
@Component({
  selector: 'df-button',
  standalone: true,
  template: `
    <button 
      [class]="buttonClasses" 
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
    >
      <span *ngIf="loading" [class]="dfService.className('animate-spin w-4 h-4 mr-2')">⟳</span>
      <ng-content></ng-content>
    </button>
  `
})
export class DfButtonComponent implements OnInit, OnChanges {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() class: string = '';
  @Input() onClick: any;

  buttonClasses: string = '';

  constructor(public dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    this.buttonClasses = cn(
      this.dfService.className('btn'),
      this.dfService.className(`btn-${this.variant}`),
      this.size !== 'md' && this.dfService.className(`btn-${this.size}`),
      this.fullWidth && this.dfService.className('w-full'),
      this.loading && this.dfService.className('btn-loading'),
      this.class
    );
  }
}

// Text Component
@Component({
  selector: 'df-text',
  standalone: true,
  template: `<ng-container [ngSwitch]="as">
    <h1 *ngSwitchCase="'h1'" [class]="textClasses"><ng-content></ng-content></h1>
    <h2 *ngSwitchCase="'h2'" [class]="textClasses"><ng-content></ng-content></h2>
    <h3 *ngSwitchCase="'h3'" [class]="textClasses"><ng-content></ng-content></h3>
    <h4 *ngSwitchCase="'h4'" [class]="textClasses"><ng-content></ng-content></h4>
    <h5 *ngSwitchCase="'h5'" [class]="textClasses"><ng-content></ng-content></h5>
    <h6 *ngSwitchCase="'h6'" [class]="textClasses"><ng-content></ng-content></h6>
    <span *ngSwitchCase="'span'" [class]="textClasses"><ng-content></ng-content></span>
    <div *ngSwitchCase="'div'" [class]="textClasses"><ng-content></ng-content></div>
    <p *ngSwitchDefault [class]="textClasses"><ng-content></ng-content></p>
  </ng-container>`
})
export class DfTextComponent implements OnInit, OnChanges {
  @Input() as: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'p';
  @Input() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' = 'base';
  @Input() weight: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' = 'normal';
  @Input() color: string | undefined;
  @Input() align: 'left' | 'center' | 'right' | 'justify' | undefined;
  @Input() class: string = '';

  textClasses: string = '';

  constructor(private dfService: DelvForgeService) {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    this.textClasses = cn(
      this.dfService.className(`text-${this.size}`),
      this.weight !== 'normal' && this.dfService.className(`font-${this.weight}`),
      this.color && this.dfService.className(`text-${this.color}`),
      this.align && this.dfService.className(`text-${this.align}`),
      this.class
    );
  }
}

// Module for easier importing
@NgModule({
  imports: [
    DfClassDirective,
    DfClassPipe,
    CnPipe,
    DfResponsivePipe,
    DfContainerComponent,
    DfGridComponent,
    DfFlexComponent,
    DfCardComponent,
    DfButtonComponent,
    DfTextComponent
  ],
  exports: [
    DfClassDirective,
    DfClassPipe,
    CnPipe,
    DfResponsivePipe,
    DfContainerComponent,
    DfGridComponent,
    DfFlexComponent,
    DfCardComponent,
    DfButtonComponent,
    DfTextComponent
  ]
})
export class DelvForgeModule {
  static forRoot(config?: Partial<DelvForgeConfig>): ModuleWithProviders<DelvForgeModule> {
    return {
      ngModule: DelvForgeModule,
      providers: [
        {
          provide: DELVFORGE_CONFIG,
          useValue: config || {}
        },
        DelvForgeService
      ]
    };
  }
}

// Export everything
export { cn, DelvForge, type DelvForgeConfig } from '@delvforge/core';

// Default export
export default DelvForgeModule;