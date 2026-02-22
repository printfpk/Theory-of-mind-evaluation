const redisClient = require("../config/redis");

async function getCache(key) {
    try {
        return await redisClient.get(key);
    } catch (error) {
        console.error('Redis Get Error:', error);
        return null;
    }
}

async function setCache(key, value) {
    try {
        await redisClient.set(key, value, {
            EX: 3600 // cache for 1 hour
        });
    } catch (error) {
        console.error('Redis Set Error:', error);
    }
}

module.exports = { getCache, setCache };
