import app from './app.js';
import connectDatabase from './config/database.js';
import env from './config/env.js';

const startServer = async () => {
  try {
    await connectDatabase();

    const PORT = process.env.PORT || env.port;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
