const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("ioredis");
const cors = require("cors");

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT,
    REDIS_IP, 
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_IP,
    port: REDIS_PORT,
    legacyMode: true
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB!"))
    .catch((e) => console.log(e));

app.enable("trust proxy");

app.use(cors({}));

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 1800000
    }
}));

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));