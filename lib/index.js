const align = require('./src/align');
const animation = require('./src/animation');
const appearance = require('./src/appearance');
const backdrop = require('./src/backdrop');
const background = require('./src/background');
const border = require('./src/border');
const box = require('./src/box');
const color = require('./src/color');
const cursor = require('./src/cursor');
const display = require('./src/display');
const effects = require('./src/effects');
const flex = require('./src/flex');
const font = require('./src/font');
const grid = require('./src/grid');
const height = require('./src/height');
const interactivity = require('./src/interactivity');
const layout = require('./src/layout');
const margin = require('./src/margin');
const padding = require('./src/padding');
const position = require('./src/position');
const sizing = require('./src/sizing');
const spacing = require('./src/spacing');
const text = require('./src/text');
const transform = require('./src/transform');
const transition = require('./src/transition');
const width = require('./src/width');
const zindex = require('./src/zindex');

// DelvForge Enhanced Features
const containers = require('./src/enhanced/containers');
const components = require('./src/enhanced/components');
const advanced = require('./src/enhanced/advanced');
const utilities = require('./src/enhanced/utilities');

// Configuration and Variables
const defaultOptions = require('./src/options');
const variables = require('./src/variables');

module.exports = (opts = {}) => {
    return {
        postcssPlugin: 'postcss-delvforge',
        AtRule: {
            delvforge: (atRule) => {
                const _opts = { ...defaultOptions, ...opts };

                // Enhanced theme processing with inheritance
                Object.values(_opts.themes).forEach((theme) => {
                    theme['colors'] = { ..._opts.colors, ...theme['colors'] };
                    theme['components'] = { ..._opts.components, ...theme['components'] };
                });

                // Core utility modules
                align(atRule, _opts);
                animation(atRule, _opts);
                appearance(atRule, _opts);
                backdrop(atRule, _opts);
                background(atRule, _opts);
                border(atRule, _opts);
                box(atRule, _opts);
                color(atRule, _opts);
                cursor(atRule, _opts);
                display(atRule, _opts);
                effects(atRule, _opts);
                flex(atRule, _opts);
                font(atRule, _opts);
                grid(atRule, _opts);
                height(atRule, _opts);
                interactivity(atRule, _opts);
                layout(atRule, _opts);
                margin(atRule, _opts);
                padding(atRule, _opts);
                position(atRule, _opts);
                sizing(atRule, _opts);
                spacing(atRule, _opts);
                text(atRule, _opts);
                transform(atRule, _opts);
                transition(atRule, _opts);
                width(atRule, _opts);
                zindex(atRule, _opts);

                // Enhanced DelvForge features
                containers(atRule, _opts);
                components(atRule, _opts);
                advanced(atRule, _opts);
                utilities(atRule, _opts);
                
                // Variables and CSS custom properties
                variables(atRule, _opts);

                // Process custom plugins
                (_opts.plugins || []).forEach((plugin = []) => {
                    plugin[0](atRule, _opts, plugin[1]);
                });

                atRule.remove();
            }
        }
    };
};

module.exports.postcss = true;