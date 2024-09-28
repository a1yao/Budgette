import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
}

interface FinancialRecordsContextType {
    transactions: FinancialRecord[];
    addTransaction: (transaction: FinancialRecord) => void;
    updateTransaction: (id: string, newTransaction: FinancialRecord) => void;
    deleteTransaction: (id: string) => void;
}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined)

export const FinancialRecordsProvider = ({children,}: {children: React.ReactNode;}) => {
    const [ transactions, setTransactions] = useState<FinancialRecord[]>([]);

    const {user} = useUser();
    const fetchTransactions = async () => {
        const response = await fetch(`http://localhost:3000/financial-records/getAllByUser/${user.id}`)

        if (response.ok) {
            const transactions = await response.json();
            console.log(transactions);
            setTransactions(transactions);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, [user]);


    const addTransaction = async (record: FinancialRecord) => {
        const response = await fetch("http://localhost:3000/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                'Content-Type': "application/json",
            },
        })
        try {
            if (response.ok) {
                const newRecord = await response.json()
                setTransactions((prev) => [...prev, newRecord])
            }
        }
        catch (err) {
            // TODO: do error handling
        }
    }

    const updateTransaction = async (id: string, newRecord: FinancialRecord) => {
        const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': "application/json",
            },
        })
        try {
            if (response.ok) {
                const newRecord = await response.json()
                setTransactions((prev) => prev.map((record) => {
                    if (record._id === id) {
                        return newRecord;
                    }
                    else {
                        return record;
                    }
                }))
            }
        }
        catch (err) {
            // TODO: do error handling
        }
    }

    const deleteTransaction = async (id: string ) => {
        const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
            method: "DELETE",
        })
        try {
            if (response.ok) {
                const deletedTransaction = await response.json()
                setTransactions((prev) => prev.filter((transaction) => transaction._id !== deletedTransaction._id))
            }
        }
        catch (err) {
            // TODO: do error handling
        }
    }

    return (
        <FinancialRecordsContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction}}>
            {" "}
            {children}
        </FinancialRecordsContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinancialRecordsContext
    );

    if (!context) {
        throw new Error("No context found");
    }

    return context;
}