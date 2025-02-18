require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connections");
const { checkForAuthentication } = require("./middlewares/authentication");

const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;

connectMongoDB(process.env.MONGO_URL).then(() => console.log("Mongodb Connected."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", staticRoute);
app.use("/api/users", userRouter);

app.use(checkForAuthentication);

let server = null;

if(require.main === module) {
    server = app.listen(PORT, () =>
        console.log(`Server is staring on ${PORT}`)
    );
}

module.exports = {
    app,
    server,
};