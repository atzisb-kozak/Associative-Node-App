import dotenv from 'dotenv';

dotenv.config();

const {
	DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  PROD_DB,
  NODE_ENV,
} = process.env;

const dir = NODE_ENV === 'production' ? 'dist' : 'src';

const config = {
	type: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USER,
	password: DB_PASSWORD,
	database: NODE_ENV === 'production' ? PROD_DB : DEV_DB,
	synchronize: NODE_ENV === 'production' ? false : true,
	logging: NODE_ENV === 'production' ? ["error"] : true,
	entities: [`${dir}/database/entity/**/*.{ts,js}`],
	migrations: [`${dir}/database/migration/**/*.{ts,js}`],
	subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`],
	cli: {
		migrationsDir: `${dir}/database/migration`,
		entitiesDir: `${dir}/database/entity`,
		subscribersDir: `${dir}/database/subscriber`,
	},
};

export default config;