module.exports = function () {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;

      let errorToApply = err.error || err.message;
      if (typeof errorToApply === 'string') {
        errorToApply = { error: errorToApply };
      }

      ctx.body = errorToApply || 'Internal server error';
      ctx.app.emit('error', err, ctx);
    }
  };
}
