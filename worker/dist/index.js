"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("./keys");
const redis_1 = __importDefault(require("redis"));
const opts = {
    host: keys_1.redisHost,
    port: keys_1.redisPort === undefined ? 6379 : parseInt(keys_1.redisPort, 10),
    retry_strategy: () => 1000,
};
// tslint:disable-next-line:no-console
// console.log(opts);
const redisClient = redis_1.default.createClient(opts);
const sub = redisClient.duplicate();
function fib(index) {
    if (index < 2) {
        return 1;
    }
    return fib(index - 1) + fib(index - 2);
}
sub.on('message', (channel, message) => {
    process.stdout.write(`Redis Channel ${channel} => ${message}\n`);
    redisClient.hset('values', message, fib(parseInt(message, 10)).toString());
});
sub.subscribe('insert');
//# sourceMappingURL=index.js.map