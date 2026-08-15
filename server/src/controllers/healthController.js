export const getHealthStatus = (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Plastic Business Management API is running.',
    data: {
      status: 'healthy',
    },
  });
};
