const mix = require("laravel-mix");
const path = require("path");
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

mix.js("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css");

mix.webpackConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "resources/js"),
            "@components": path.resolve(__dirname, "resources/js/components"),
            "@pages": path.resolve(__dirname, "resources/js/pages"),
            "@utils": path.resolve(__dirname, "resources/js/utils"),
        },
    },
    ignoreWarnings: [{
            module: /sass-loader/,
            message: /The legacy JS API is deprecated/,
        },
        {
            module: /sass\.dart\.js/,
            message: /Critical dependency: require function is used/,
        },
    ],
});

mix.options({
    polling: true,
    legacyNodePolyfills: false,
    processCssUrls: false,
});

// Source map và thông báo
if (mix.inProduction()) {
    mix.version(); // Đảm bảo băm (cache busting) các file khi production
} else {
    mix.sourceMaps(); // Bật source maps cho môi trường phát triển
}

mix.disableNotifications();