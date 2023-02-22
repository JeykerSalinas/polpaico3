import { io } from "../index.js";
import { getData, getDataExcel } from "../functions/querys.js";
import writeXlsxFile from "write-excel-file";
import * as dotenv from "dotenv";
dotenv.config();

export const notification = async (req, res) => {
  try {
    const result = await getData();
    io.sockets.emit("message", {
      result,
    });
    res.status(200).send("Alerta Enviada y Creada");
  } catch (error) {
    console.log(error);
    res.status(404).send("La Alerta no se pudo enviar");
  }
};

export const getDataNotification = async (req, res) => {
  try {
    let { date1, date2 } = req.params;
    let response = await getDataExcel(date1, date2);
    const data_excel = response.map((item) => {
      return {
        result: item.result,
        table: item.table,
        start: item._start.toString(),
        stop: item._stop.toString(),
        time: item._time.toString(),
        value: item._value,
        field: item._field,
        measurement: item._measurement,
        sensorID: item.sensorID,
      };
    });
    const schema = [
      {
        column: "Resultado",
        type: String,
        value: (item) => item.result,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Medicion",
        type: String,
        value: (item) => item.measurement,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Tabla",
        type: Number,
        value: (item) => item.table,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "comienzo",
        type: String,
        value: (item) => item.start,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Finalizado",
        type: String,
        value: (item) => item.stop,
        width: 20,
        fontWeight: "normal",
      },

      {
        column: "Hora ",
        type: String,
        value: (item) => item.time,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Valor",
        type: Number,
        value: (item) => item.value,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Campo",
        type: String,
        value: (item) => item.field,
        width: 20,
        fontWeight: "normal",
      },
      {
        column: "Sensor",
        type: String,
        value: (item) => item.sensorID,
        width: 20,
        fontWeight: "normal",
      },
    ];
    // TODO: REVISAR PORQUE NO LO GENERA
    await writeXlsxFile(data_excel, {
      schema,
      headerStyle: {
        backgroundColor: "#eeeeee",
        fontWeight: "bold",
        fontSize: 10,
        align: "center",
        width: 70,
      },
      filePath: "download/file.xlsx",
    });
    res.status(201).download("download/file.xlsx");
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send("No se pudo obtener la información, intentelo mas tarde");
  }
};
