import { DataSource } from 'typeorm';
import { Color } from './color/entities/color.entity';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'test',
  entities: [Color],
  migrations: [join(__dirname, 'migrations/*.ts')],
  synchronize: false,
});
