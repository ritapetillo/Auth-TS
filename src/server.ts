import express from "express";
import mongoose from "mongoose";
import error_handler from "node-error-handler";
import apiRoutes from "./services";
import cors from 'cors'
const server = express();
const PORT = process.env.PORT;


//MIDDLEWARES
server.use(express.json());
server.use(cors());


//ROUTES
server.use("/api", apiRoutes);

//ERROR HANDLERSdeclare module 'node-error-handler'
server.use(error_handler({ log: true, debug: true }));

//Connect to DB and server
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    server.listen(PORT, () => {
      console.log("connect to " + PORT);
    })
  );
