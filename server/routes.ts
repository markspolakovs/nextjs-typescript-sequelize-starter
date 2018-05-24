import express from "express";

const router = express.Router();

router.get("/foo", (_, res) => {
    res.send("bar");
})

export default router;
