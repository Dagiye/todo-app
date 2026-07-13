require('dotenv').config();

const app = require('./app');
const { waitForDatabase } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await waitForDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

startServer();