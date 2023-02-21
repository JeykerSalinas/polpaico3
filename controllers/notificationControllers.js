import { io } from "../index.js";

export const notification = async (req, res) => {
  try {
    let notification = {
      result: "",
      table: 0,
      _start_: "2018-05-08T20:50:00Z",
      _stop_: "2018-05-08T20:51:00Z",
      _time: "2018-05-08T20:50:00Z",
      region: "east",
      host: "A",
      _value: 15.43,
      _measurement: "cpy",
      _field: "usage_system",
    };
    io.sockets.emit("message", {
      notification,
    });
    res.status(200).send("Alerta Enviada y Creada");
  } catch (error) {
    console.log(error);
    res.status(404).send("La Alerta no se pudo enviar");
  }
};
