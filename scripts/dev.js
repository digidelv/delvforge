const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const delvforge = require('../lib/index.js');

const cssFile = path.join(__dirname, '..', 'src', 'delvforge.css');
const outputFile = path.join(__dirname, '..', 'dist', 'delvforge.css');

// Ensure directories exist
const distDir = path.dirname(outputFile);
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

async function processCSS() {
    try {
        console.log('🔄 Processing DelvForge CSS...');
        
        const css = fs.readFileSync(cssFile, 'utf8');
        
        const result = await postcss([
            delvforge({
                // Development configuration
                features: {
                    containerQueries: true,
                    customProperties: true,
                    modernSelectors: true,
                    advancedGrid: true,
                    fluidTypography: true,
                    logicalProperties: false // Keep disabled for better compatibility during dev
                }
            })
        ]).process(css, { 
            from: cssFile,
            to: outputFile,
            map: { inline: false }
        });
        
        fs.writeFileSync(outputFile, result.css);
        
        if (result.map) {
            fs.writeFileSync(`${outputFile}.map`, result.map.toString());
        }
        
        console.log(`✅ CSS processed successfully (${Math.round(result.css.length / 1024)}KB)`);
        
    } catch (error) {
        console.error('❌ Error processing CSS:', error.message);
        console.error(error.stack);
    }
}

async function watchFiles() {
    console.log('👀 Watching for file changes...\n');
    
    const watchPaths = [
        path.join(__dirname, '..', 'lib'),
        path.join(__dirname, '..', 'src')
    ];
    
    watchPaths.forEach(watchPath => {
        if (fs.existsSync(watchPath)) {
            fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
                if (filename && (filename.endsWith('.js') || filename.endsWith('.css'))) {
                    console.log(`📝 File changed: ${filename}`);
                    processCSS();
                }
            });
            console.log(`🔍 Watching: ${watchPath}`);
        }
    });
}

async function dev() {
    console.log('🚀 Starting DelvForge development server...\n');
    
    // Initial build
    await processCSS();
    
    // Start watching
    await watchFiles();
    
    console.log('\n💡 Tip: Make changes to files in lib/ or src/ to see live updates');
    console.log('   Press Ctrl+C to stop watching\n');
    
    // Keep process alive
    process.on('SIGINT', () => {
        console.log('\n👋 Development server stopped');
        process.exit(0);
    });
}

// Run dev server if called directly
if (require.main === module) {
    dev();
}

module.exports = { dev, processCSS };