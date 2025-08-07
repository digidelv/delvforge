const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const delvforge = require('../lib/index.js');

const buildDir = path.join(__dirname, '..', 'dist');
const cssFile = path.join(__dirname, '..', 'src', 'delvforge.css');

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Build configurations
const buildConfigs = [
    {
        name: 'default',
        output: 'delvforge.css',
        options: {}
    },
    {
        name: 'prefixed',
        output: 'delvforge-prefixed.css',
        options: {
            prefix: {
                className: 'df-',
                cssVariable: 'df-'
            }
        }
    },
    {
        name: 'modern',
        output: 'delvforge-modern.css',
        options: {
            features: {
                containerQueries: true,
                customProperties: true,
                modernSelectors: true,
                advancedGrid: true,
                fluidTypography: true,
                logicalProperties: true
            }
        }
    }
];

async function buildCSS(config) {
    console.log(`🔨 Building ${config.name} configuration...`);
    
    try {
        // Read source CSS file
        const css = fs.readFileSync(cssFile, 'utf8');
        
        // Process with PostCSS and DelvForge plugin
        const result = await postcss([delvforge(config.options)])
            .process(css, { from: cssFile });
        
        // Write output
        const outputPath = path.join(buildDir, config.output);
        fs.writeFileSync(outputPath, result.css);
        
        console.log(`✅ Built ${config.output} (${Math.round(result.css.length / 1024)}KB)`);
        
        // Generate source map
        if (result.map) {
            fs.writeFileSync(`${outputPath}.map`, result.map.toString());
        }
        
        return {
            config: config.name,
            size: result.css.length,
            output: config.output
        };
        
    } catch (error) {
        console.error(`❌ Error building ${config.name}:`, error.message);
        throw error;
    }
}

async function build() {
    console.log('🚀 Starting DelvForge build process...\n');
    
    const startTime = Date.now();
    const results = [];
    
    try {
        // Build all configurations
        for (const config of buildConfigs) {
            const result = await buildCSS(config);
            results.push(result);
        }
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log('\n🎉 Build completed successfully!');
        console.log(`⏱️  Total time: ${duration}s`);
        console.log('\n📊 Build Summary:');
        
        results.forEach(result => {
            console.log(`   ${result.config}: ${result.output} (${Math.round(result.size / 1024)}KB)`);
        });
        
        // Generate build info
        const buildInfo = {
            timestamp: new Date().toISOString(),
            version: require('../package.json').version,
            builds: results
        };
        
        fs.writeFileSync(
            path.join(buildDir, 'build-info.json'), 
            JSON.stringify(buildInfo, null, 2)
        );
        
    } catch (error) {
        console.error('\n💥 Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = build;