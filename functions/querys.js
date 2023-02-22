import { influxdb } from "../config/db.js";
import { flux } from "@influxdata/influxdb-client";
import moment from "moment";

export const getData = async () => {
  try {
    const queryApi = influxdb.getQueryApi(process.env.INFLUX_ORG);
    const fluxQuery = flux`from(bucket: "${process.env.INFLUX_BUCKET}")
        |> range(start: 0)
        |> filter(fn: (r) => r._measurement == "${process.env.MEASUREMENT}")
        |> last()`;

    let devices = [];

    await new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          devices.push(o);
        },
        error: reject,
        complete() {
          resolve(devices);
        },
      });
    });
    return devices;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getDataExcel = async (date1, date2) => {
  try {
    // TODO:TRABAJAR CON EL FORMATO DE LAS FECHAS
    // const fecha1 = moment(date1, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
    // const fecha2 = moment(date2, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
    const queryApi = influxdb.getQueryApi(process.env.INFLUX_ORG);
    const fluxQuery = flux`from(bucket: "${process.env.INFLUX_BUCKET}")
    |>  range(start: 2023-01-01T00:00:00Z, stop: 2023-02-22T23:59:59Z)
    |> filter(fn: (r) => r._measurement == "${process.env.MEASUREMENT}")`;
    let result = [];
    await new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          result.push(o);
        },
        error: reject,
        complete() {
          resolve(result);
        },
      });
    });
    return result
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
