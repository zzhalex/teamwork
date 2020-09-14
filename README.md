# Teamwork

Teamwork is a REST API backend service

- Create new task, delete task, get task list
- Create user
- Generate token for user
- Decode token to check user basic information

### Tech

Teamwork uses a number of open source projects to work properly:

- node.js - evented I/O for the backend
- Express - fast node.js framework for building REST API
- jsonwebtoken - JWT for express
- sequelize - ORM
- nodemon - restart server if there is any change in the code base
- postgres - databse

### Installation

Teamwork requires [Node.js](https://nodejs.org/) v10 to run.

Install nvm to control version of node.
Install the dependencies and devDependencies and start the server.

```sh
$ cd teamwork
$ nvm use 10
$ npm install
$ npm start
```

Verify the app by navigating to your server address in your preferred browser.

```sh
127.0.0.1:4000
```

### Model

There are 2 models in the Teamwork: User, Task

| Model | Action      |
| ----- | ----------- |
| User  | Create      |
| User  | GetUserById |
| User  | GetAllUsers |
| Task  | Create      |
| Task  | Delete      |
| Task  | GetAllTasks |
| Task  | GetTaskById |

### Token

generateToken()
decodeToken()
