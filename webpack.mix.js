const mix = require('laravel-mix');
const path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');



mix.webpackConfig({
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'resources/js/components'),
            '@pages': path.resolve(__dirname, 'resources/js/pages'),
            '@utils': path.resolve(__dirname, 'resources/js/utils'),
        },
    },
});

mix.options({
    polling: true
});