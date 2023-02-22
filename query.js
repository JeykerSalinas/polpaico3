// "use strict";
// /** @module write
//  * Writes a data point to InfluxDB using the Javascript client library with Node.js.
//  **/

// import { InfluxDB, Point } from "@influxdata/influxdb-client";

// /** Environment variables **/
// const url = "http://localhost:8086";
// const token =
//   "AaFpqBW3xMBDlUyf3BuME2qqF4f7CDc9_XPTnLNKDp_NrRjVyhOQja4lkh7N7_ts9dbjHiAPK0Kju_I0yt0r8w==";
// const org = "Jeyker Salinas";
// const bucket = "testing";



// TODO: GET DATA INFLUX


// app.get("/test", async (req, res) => {
//   const fluxQuery =
//     'from(bucket:"testing") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")';
//   const fluxObserver = {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       res.send(
//         `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`
//       );
//     },
//     error(error) {
//       console.error(error);
//       console.log("\nFinished ERROR");
//     },
//     complete() {
      
//     },
//   };

//   /** Execute a query and receive line table metadata and rows. */

//   influxDB
//     .getQueryApi(process.env.INFLUX_ORG)
//     .queryRows(fluxQuery, fluxObserver);
// });

// TODO: VERIFY CREATE DATA INFLUX


/** Environment variables **/
// const url = "http://localhost:8086";
// const token =
//   "AaFpqBW3xMBDlUyf3BuME2qqF4f7CDc9_XPTnLNKDp_NrRjVyhOQja4lkh7N7_ts9dbjHiAPK0Kju_I0yt0r8w==";
// const org = "Jeyker Salinas";
// const bucket = "testing";

// /**
//  * Instantiate the InfluxDB client
//  * with a configuration object.
//  **/
// const influxDB = new InfluxDB({ url, token });

/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
// const writeApi = influxDB.getWriteApi(org, bucket);

// /**
//  * Apply default tags to all points.
//  **/
// writeApi.useDefaultTags({ region: "west" });

/**
 * Create a point and write it to the buffer.
 **/
// const point1 = new Point("temperature")
//   .tag("sensor_id", "TLM01")
//   .floatField("value", 24.0);
// console.log(` ${point1}`);

// writeApi.writePoint(point1);

// /**
//  * Flush pending writes and close writeApi.
//  **/
// writeApi.close().then(() => {
//   console.log("WRITE FINISHED");
// });
