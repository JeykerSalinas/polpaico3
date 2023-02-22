import express, { urlencoded, json } from "express";
import cors from "cors";
import routes from "./routes/v1/routes.js";
import http from 'http'
import { Server } from "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
dotenv.config();
import {socketIo} from './utils/socket.js'

//SERVER STATEMENTS
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT || 4000;

// ########### HTML MODELO HAY QUE REMOVERLA ###############
app.get("/home",(req,res)=>{
  res.sendFile(__dirname + "/html_test/index.html")
})
// ########################################

// Middlewares
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

//RUN SOCKET
socketIo(io)


// ROUTES
app.use( '/', routes)

server.listen(port, () => console.log(`Puerto ${port}`));
