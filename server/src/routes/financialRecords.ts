import express, {Request, Response} from "express";
import financialRecordModel from "../schema/financialRecord";

const router = express.Router();

router.get("/getAllByUser/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const records = await financialRecordModel.find({userId: userId});
        
        if (records.length == 0) {
            return res.status(404).send("No records found for the user");
        }
        res.status(200).send(records);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new financialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        console.log("HELLO"); 
       
        res.status(200).send(savedRecord);
    }
    catch (error) {
        console.log("here");
        res.status(500).send(error);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await financialRecordModel.findByIdAndUpdate(id, newRecordBody);
        
        if (!record) {
            return res.status(404).send();
        }
        res.status(200).send(record);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await financialRecordModel.findByIdAndDelete(id);
        
        if (!record) {
            return res.status(404).send();
        }
        res.status(200).send(record);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

export default router;
