import express from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();
const port = 3000; 
const app = express();

app.use("/api", routes);


console.log("API KEY:", process.env.API_KEY);

app.listen(port, () => {
    console.log(`api running on port ${port}`);
})
