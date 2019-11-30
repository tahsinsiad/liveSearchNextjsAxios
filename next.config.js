const withCss = require("@zeit/next-css");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpackConfig = (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
        fs: "empty"
    };
    config.optimization = config.optimization || {};
    config.optimization = {
        ...config.optimization,
        namedModules: true, namedChunks: true, splitChunks: { cacheGroups: { default: false } }
    };
    if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [
            (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                    origExternals[0](context, request, callback);
                } else {
                    callback();
                }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];

        config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
        });
    }
    config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 100000,
                name: "[name].[ext]"
            }
        }
    });
    config.plugins.push(
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /sv/)
    );
    if (config.mode === "production") {
        if (Array.isArray(config.optimization.minimizer)) {
            config.optimization.minimizer.push(
                new OptimizeCSSAssetsPlugin({})
            );
        }
    }
    return config;
};

module.exports = withCss({
    webpack: webpackConfig,
    pageExtensions: ["js"],
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        CDN_BASE_URL: process.env.CDN_BASE_URL
    }
});