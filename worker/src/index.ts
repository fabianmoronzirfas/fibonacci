import { redisHost, redisPort } from './keys';

import redis, { ClientOpts } from 'redis';
const opts: ClientOpts = {
  host: redisHost,
  port: redisPort === undefined ? 6379 : parseInt(redisPort as string, 10),
  retry_strategy: () => 1000,
};
// tslint:disable-next-line:no-console
// console.log(opts);
const redisClient = redis.createClient(opts);
const sub = redisClient.duplicate();

function fib(index: number): number {
  if (index < 2) {
    return 1;
  }
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  process.stdout.write(`Redis Channel ${channel} => ${message}\n`);
  redisClient.hset('values',
    message, fib(parseInt(message, 10)).toString());
});
sub.subscribe('insert');
