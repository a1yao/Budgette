// PWD: OHArBrKm9qKcuzZc TODO: remove
import express, { Express } from "express";
import mongoose, { mongo } from "mongoose";
import financialRecordModel from "./schema/financialRecord";
import financialRecordRouter  from "./routes/financialRecords";
import cors from "cors";


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://ayao:OHArBrKm9qKcuzZc@budgettecluster.oufue.mongodb.net/";

mongoose.connect(mongoURI).then(() => console.log("Connected to mongoDB")).catch((err) => console.error("Failed to connect to mongoDB"));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})