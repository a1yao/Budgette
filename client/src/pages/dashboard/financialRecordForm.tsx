import { useState } from "react"
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financialRecordContext";

export const FinancialRecordForm = () => {

    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const {addTransaction} = useFinancialRecords();

    const { user } = useUser();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newTransaction = {
            userId: user?.id ?? "none", // TODO: Might need to change none, might cause complications, "" did not work
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
        }

        addTransaction(newTransaction);
        setDescription("");
        setAmount("");
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Transaction Description: </label>
                    <input type="text" required className="input" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Transaction Amount: </label>
                    <input type="number" required className="input" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <button type="submit" className="button">
                    Add Transaction
                </button>
            </form>
        </div>
    )
}