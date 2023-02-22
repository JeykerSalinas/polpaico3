import { Router } from "express";
import * as notification from "../../controllers/notificationControllers.js";

const router = Router();

//Root
router.get("/",(req,res)=> res.status(200).send("Notification APP"))
//Notification
router.get("/notification", notification.notification )
router.get("/search_data", notification.getDataNotification )

export default router;
