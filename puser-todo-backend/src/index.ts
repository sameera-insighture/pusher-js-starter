import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./todoRoutes";

const app = express();
dotenv.config({ path: ".env.local" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
