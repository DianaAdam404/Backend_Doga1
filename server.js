import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/autok", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM autok");
        res.status(200).json({
            success: true,
            data: rows,
        });
    } catch (error) {
        console.error("Adatbázis hiba:", error, message);
        res.status(500).json({
            success: false,
            message: "Adatbazis hiba történt autok lekerdezes közben.",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
