import RedisStore from "connect-redis";
import redis from "redis";

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "localhost",
    port: 6379,
  },
});

redisClient
  .connect()
  .catch((err) => console.error("Error connect redis client", err));

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});
