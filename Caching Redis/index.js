const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const port = 3000;

let redisClient;
let isRedisReady = false;

async function initRedis() {
  redisClient = redis.createClient({
    url: "redis://localhost:6379",
    socket: {
      reconnectStrategy: false,
    },
  });
  redisClient.on("error", (err) => {
    console.error(`Redis error: ${err}`);
  });
  await redisClient.connect();
  isRedisReady = true;
  console.log("Connected to Redis");
}

app.get("/todos/:todoId", getTodoData);

async function getTodoData(req, res) {
  const { todoId } = req.params;
  let results;
  let isCached = false;
  try {
    const cacheResults = isRedisReady ? await redisClient.get(todoId) : null;
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData(todoId);
      if (isRedisReady) {
        await redisClient.set(todoId, JSON.stringify(results), {
          EX: 60,
        });
      }
    }
    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Data not found");
  }
}

async function fetchApiData(todoId) {
  const apiResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  console.log("Request made to API");
  return apiResponse.data;
}

async function startServer() {
  try {
    await initRedis();
  } catch (err) {
    console.error("Redis is unavailable, starting server without cache.");
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();