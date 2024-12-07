const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();

const port = 3000;

// Initialize the Redis client
const client = redis.createClient();

client.on('error', (error) => console.error('Redis Client Error', error));
client.on('connect', () => console.log('Connected to Redis!'));

// Connect to Redis
(async () => {
    await client.connect();
})();

// Define the route
app.get('/todos/:todo', async (req, res) => {
    try {
        const todo = req.params.todo;

        // Check the Redis store for the data
        const cachedData = await client.get(todo);
        if (cachedData) {
            return res.status(200).send({
                error: false,
                message: `TODOS for ${todo} from the cache`,
                data: JSON.parse(cachedData),
            });
        }

        // If data is not found in Redis, fetch it from the API
        const todosResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos?q=${todo}`);
        const todos = todosResponse.data;

        // Save the data in Redis with a TTL of 1440 seconds (24 minutes)
        await client.setEx(todo, 1440, JSON.stringify(todos));

        // Return the API response to the client
        return res.status(200).send({
            error: false,
            message: `TODOS for ${todo} from the server`,
            data: todos,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
