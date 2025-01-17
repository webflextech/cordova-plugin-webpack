"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var webpack_1 = __importDefault(require("webpack"));
var webpackHelpers = __importStar(require("./utils/webpackHelpers"));
module.exports = function (ctx) {
    var platforms = ['browser', 'android', 'ios'];
    if (!platforms.some(function (platform) { return ctx.opts.platforms.includes(platform); })) {
        return Promise.resolve();
    }
    if (!ctx.opts.options || !ctx.opts.options.argv) {
        return Promise.resolve();
    }
    var argv = yargs_parser_1.default(ctx.opts.options.argv.join(' '));
    if (argv.livereload || argv.l) {
        return Promise.resolve();
    }
    var customWebpackConfig = webpackHelpers.webpackConfig(ctx.opts.projectRoot, argv.webpackConfig || argv.w);
    var compiler = webpack_1.default(customWebpackConfig);
    return new Promise(function (resolve, reject) {
        compiler.run(function (err, stats) {
            if (err) {
                reject(err);
                return;
            }
            console.log(stats.toString({
                chunks: false,
                colors: true,
            }));
            resolve();
        });
    });
};
//# sourceMappingURL=webpackCompile.js.map