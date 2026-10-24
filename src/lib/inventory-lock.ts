import Redis from "ioredis";

const RESERVATION_SECONDS = 15 * 60;
let client: Redis | undefined;

function redisClient() {
  const redisUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.STORAGE_URL;
  if (!redisUrl) throw new Error("REDIS_URL must be configured to reserve high-value inventory.");
  client ??= new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: true,
  });
  return client;
}

export async function reserveInventory(itemId: string, reservationToken: string) {
  const result = await redisClient().set(
    `inventory:reservation:${itemId}`,
    reservationToken,
    "EX",
    RESERVATION_SECONDS,
    "NX",
  );
  return result === "OK";
}

export async function releaseInventory(itemId: string, reservationToken: string) {
  const releaseIfOwner = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    end
    return 0
  `;
  return Number(await redisClient().eval(releaseIfOwner, 1, `inventory:reservation:${itemId}`, reservationToken)) === 1;
}

export { RESERVATION_SECONDS };
