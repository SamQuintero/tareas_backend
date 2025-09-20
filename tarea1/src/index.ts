import express from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();
const port = 3000; 
const app = express();

app.use("/api", routes);




app.listen(port, () => {
    console.log(`api running on port ${port}`);
})
