import RedisStore from "connect-redis";
import redis from "redis";

const redisClient = redis.createClient({
  password: "uQEXisjT18hHgfpvmcpJaGfQ3DHzCrMb",
  socket: {
    host: "redis-16636.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 16636,
  },
});

redisClient.connect().catch(console.error);

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});
