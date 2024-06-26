require('dotenv').config();
const express = require("express")
const cors = require("cors");
const app = express();
const router = require("./routes/auth-routes");
const errorMiddleware = require("./middlewares/error-middleware");
const connectDb = require("./utils/db");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Always use this middle ware before express.json or data parsing 
app.use(cors(corsOptions))
//MiddleWare to parse json data
app.use(express.json());

// Mount the Router: 
// To use the router in your main Express app,
//  you can "mount" it at a specific URL prefix
app.use("/worko/user", router);
// MiddleWare to handle errors
app.use(errorMiddleware);


const PORT = 8001;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});