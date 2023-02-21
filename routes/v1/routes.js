import { Router } from "express";
import * as notification from "../../controllers/notificationControllers.js";

const router = Router();

//Root
router.get("/",(req,res)=> res.status(200).send("Notification APP"))
//Notification
router.post("/notification", notification.notification )

export default router;
