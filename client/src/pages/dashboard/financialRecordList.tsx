import { useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financialRecordContext"
import {useTable, Column, CellProps, Row} from "react-table"


interface EditableCellProps extends CellProps<FinancialRecord> {
    updateTransaction: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
} 
const EditableCell: React.FC<EditableCellProps> = ({value: initialValue, row, column, updateTransaction, editable}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const onBlur = () => {
        setIsEditing(false);
        updateTransaction(row.index, column.id, value);
    }
    return <div onClick={() => editable && setIsEditing(true)} style={{cursor: editable? "pointer" : "default"}}>
        {isEditing ? <input value = {value} onChange={(e) => setValue(e.target.value)} autoFocus onBlur={onBlur} style={{width: "100%"}}/> : typeof value == "string" ? (value) : (value.toString())}
    </div>
}

export const FinancialRecordList = () => {
    const {transactions, updateTransaction, deleteTransaction} = useFinancialRecords();

    const updateCellTransaction = (rowIndex: number, columnId: string, value: any) => {
        const id = transactions[rowIndex]._id;
        updateTransaction(id ?? "", {...transactions[rowIndex], [columnId]: value})
    }
    const columns : Array<Column<FinancialRecord>> = useMemo(() => [
        {
            Header: "Description",
            accessor: "description",
            Cell: (props) => (
                <EditableCell {...props} updateTransaction={updateCellTransaction} editable={true}/>
            ),
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => (
                <EditableCell {...props} updateTransaction={updateCellTransaction} editable={true}/>
            ),
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: (props) => (
                <EditableCell {...props} updateTransaction={updateCellTransaction} editable={false}/>
            ),
        },
        {
            Header: "Delete",
            id: "delete",
            Cell: ({row}) => (
                <button onClick={() => deleteTransaction(row.original._id ?? "")} className="button">
                    Delete
                </button>
            ),
        },
    ],
    [transactions]
)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data: transactions})
    return (
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                        prepareRow(row);
                        return (<tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}> {cell.render("Cell")} </td>))}
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>
    )
}