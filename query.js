"use strict";
/** @module write
 * Writes a data point to InfluxDB using the Javascript client library with Node.js.
 **/

import { InfluxDB, Point } from "@influxdata/influxdb-client";

/** Environment variables **/
const url = "http://localhost:8086";
const token =
  "AaFpqBW3xMBDlUyf3BuME2qqF4f7CDc9_XPTnLNKDp_NrRjVyhOQja4lkh7N7_ts9dbjHiAPK0Kju_I0yt0r8w==";
const org = "Jeyker Salinas";
const bucket = "testing";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const fluxQuery =
  'from(bucket:"testing") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")';

const fluxObserver = {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row);
    console.log(o);
    console.log(
      `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`
    );
  },
  error(error) {
    console.error(error);
    console.log("\nFinished ERROR");
  },
  complete() {
    console.log("\nFinished SUCCESS");
  },
};

/** Execute a query and receive line table metadata and rows. */
queryApi.queryRows(fluxQuery, fluxObserver);
