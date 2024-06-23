import 'dotenv/config';

export default () => ({
  typeorm: {
    type: 'oracle',
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.DATABASE_HOST})(PORT=${process.env.DATABASE_PORT}))(CONNECT_DATA=(SERVICE_NAME=${process.env.DATEBASE_NAME})))`,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/**/**.entity{.ts,.js}'],
    synchronize: false,
  },
});
