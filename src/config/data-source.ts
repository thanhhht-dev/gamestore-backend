import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '@/models/user.model.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User]
});
