import 'reflect-metadata';
import app from '@/app.js';
import config from '@/config/config.js';
import { AppDataSource } from '@/config/data-source.js';

AppDataSource.initialize()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port:${config.port}`);
    });
  })
  .catch((error) => console.log(error));
