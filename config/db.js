import { InfluxDB } from "@influxdata/influxdb-client";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.INFLUX_URL
const token = process.env.INFLUX_TOKEN
export const influxdb = new InfluxDB({
  url,
  token,
});

