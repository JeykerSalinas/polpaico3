import { getDataExcel } from "../functions/querys.js";
import * as dotenv from "dotenv";
dotenv.config();

export const getDataNotification = async (req, res) => {
  try {
    let { date1, date2 } = req.params;
    let response = await getDataExcel(date1, date2);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send("No se pudo obtener la información, intentelo mas tarde");
  }
};
