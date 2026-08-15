export const notFound = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
};

export const errorHandler = (error, request, response, next) => {
  console.error(error);

  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Something went wrong on the server.',
  });
};
