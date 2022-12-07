require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
const connectDB = require("./db/connect");
const ProductRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3300;
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", ProductRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening to ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
