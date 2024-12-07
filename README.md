# Node.js Redis Cache with Express

This project demonstrates how to integrate a Redis caching mechanism with an Express.js server. The app fetches TODO items from an external API and caches the results in Redis for optimized performance.

## Features
- **Express.js**: Backend framework for building APIs.
- **Redis**: Used for caching fetched TODO data to improve response time and reduce API calls.
- **Axios**: HTTP client for making API requests to `https://jsonplaceholder.typicode.com`.
- **Dynamic Caching**: Stores results in Redis with a Time-To-Live (TTL) of 24 minutes (1440 seconds).

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Redis](https://redis.io/) (Ensure Redis server is running locally or on a specified host)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Redis server:
    ```bash
    redis-server
    ```

4. Run the application:
    ```bash
    npm start
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. Access the API endpoint to fetch TODO items:
    ```
    GET /todos/:todo
    ```

   Example:
   ```bash
   curl http://localhost:3000/todos/1
