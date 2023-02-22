import cron from "node-cron";
import { getData } from "../functions/querys.js";
import { io } from "../index.js";
import * as dotenv from "dotenv";
dotenv.config();

export const task = () => {
  cron.schedule("*/1 * * * *", async () => {
    let result = { data: [], status: true };
    try {
      result.data = await getData();
      console.log("Alerta Enviada");
    } catch (error) {
      result.status = false;
      console.log(error);
    } finally {
      io.sockets.emit("message", result);
    }
  });
};
