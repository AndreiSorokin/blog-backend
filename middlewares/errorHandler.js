const errorHandler = (err, req, res, next) => {
   console.error(`Error: ${err.message || 'Unknown error'}`);

   if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => e.message);
      return res.status(400).json({ error: errors });
   }

   const statusCode = err.status || 500;
   res.status(statusCode).json({
      error: {
         message: err.message || 'Internal Server Error',
      },
   });
};

module.exports = errorHandler;