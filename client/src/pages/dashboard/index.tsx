import { useUser }from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financialRecordForm";
import { FinancialRecordList } from "./financialRecordList";
import "./financialRecord.css";
import { useFinancialRecords } from "../../contexts/financialRecordContext";
import { useMemo } from "react";

/*
GENERAL TODO:
Fix routing for already signed in on dashboard page
No username case on display name "Hey ___!"
Progress bar for budget and display total spent
Fix date to be user frinedly (instead of bunch of numbers)
Option to set budget
Navbar
Make add transaction a pop up instead of present always on screen
make transaction table a scrollable sub window
CSS Styling
*/

export const Dashboard = () => {
    const { user } = useUser();
    const { transactions } = useFinancialRecords();

    const totalSpent = useMemo(() =>  {
        let totalSpent = 0;
        transactions.forEach((transaction) => {
            totalSpent += transaction.amount;
        })

        return totalSpent;
    }, [transactions])

    return (
        <div className="dash-container">
            <h1> Hey {user?.username}! Here are your finances:</h1>
            <FinancialRecordForm />
            <div>
                Total Spent: {totalSpent}
            </div>
            <FinancialRecordList />
        </div>
    );
}