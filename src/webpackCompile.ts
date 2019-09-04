import 'source-map-support/register';
import argvParse from 'yargs-parser';
import webpack from 'webpack';
import * as webpackHelpers from './utils/webpackHelpers';

module.exports = (ctx: any) => {
  const platforms = ['browser', 'android', 'ios'] as const;
  if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
    return Promise.resolve();
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return Promise.resolve();
  }

  const argv = argvParse(ctx.opts.options.argv.join(' '));
  if (argv.livereload || argv.l) {
    return Promise.resolve();
  }

  const customWebpackConfig: webpack.Configuration = webpackHelpers.webpackConfig(
    ctx.opts.projectRoot,
    argv.webpackConfig || argv.w,
  );
  const compiler = webpack(customWebpackConfig);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        }),
      );
      resolve();
    });
  });
};
