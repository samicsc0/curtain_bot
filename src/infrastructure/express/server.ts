import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import v1Router from './v1';
function startServer() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1', v1Router);

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export { startServer };
