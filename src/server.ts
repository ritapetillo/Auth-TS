import express from "express";
import mongoose from "mongoose";
import error_handler from "node-error-handler";
import apiRoutes from "./services";
import cors from 'cors'
import passport from 'passport'
import  './services/libs/auth_google'
import cookieParser from 'cookie-parser'
const server = express();
const PORT = process.env.PORT;

const whitelist = ['http://localhost:3000']

//MIDDLEWARES
server.use(express.json());
server.use(passport.initialize())
server.use(cookieParser())
server.use(cors({
  origin:whitelist,
  credentials:true
}));


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
