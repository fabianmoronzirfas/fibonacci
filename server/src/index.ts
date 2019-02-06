import cors from 'cors';
import express from 'express';
import { Pool, PoolConfig } from 'pg';
import redis, { ClientOpts } from 'redis';
import * as keys from './keys';

// Express setup
const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;
app.use(cors());
app.use(express.json());

// tslint:disable-next-line:forin
// for (const key in keys) {
//   // tslint:disable-next-line:no-console
//   console.log(keys);

// }
// tslint:disable-next-line:no-console
// console.log(process.env);
// PG setup
const pgOpts: PoolConfig = {
  database: keys.pgDatabase,
  host: keys.pgHost,
  password: keys.pgPassword,
  port: typeof keys.pgPort === 'string' ? parseInt(keys.pgPort, 10) : keys.pgPort,
  user: keys.pgUser,
};

const pgClient = new Pool(pgOpts);
pgClient.on('error', () => process.stderr.write('Lost PG connection\n'));

pgClient.on('connect', () => pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((err) => process.stderr.write(`err creating db: ${err}\n`)));

  // .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  // .catch((err) => process.stderr.write(`\n`));

// redis setup
const redisOpts: ClientOpts = {
  host: keys.redisHost,
  port: typeof keys.redisPort === 'string' ? parseInt(keys.redisPort, 10) : keys.redisPort,
  retry_strategy: () => 1000,
};
const redisClient = redis.createClient(redisOpts);
const redisPublisher = redisClient.duplicate();

// Express routes
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values');
  // console.log(values.rows);
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;
  if (parseInt(index, 10) > 40) {
    return res.status(422).send('Index too high');
  }
  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
  res.send({working: true});
  return;
});

app.listen(PORT, () => {
  process.stdout.write(`listening on http://localhost:${PORT}\n`);
});
