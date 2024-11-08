import { CTableHeaderCell } from "@coreui/react";
import React from "react";
import { BadgeX } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteFaq } from "src/RTK/Slice/faqSlice";
// import { deleteFaq } from "src/RTK/slice/faqSlice";

export const COLUMNS = [
    {
        Header: "Index",
        accessor: "index",
        Cell: row => {
            console.log("row is ", row.row);
            var digit = parseInt(row.row.id) + 1;
            return (
                <CTableHeaderCell scope="row" >{digit}</CTableHeaderCell>
            );
        }
    },
    {
        Header: "Title",
        accessor: "title",
    },
    {
        Header: "Question",
        accessor: "ques",
    },
    {
        Header: "Answer",
        accessor: "ans"
    },
    {
        Header: "Action",
        action: "action",
        Cell: row => {
            const dispatch = useDispatch();
            const handleDelete = (id) => {
                console.log("cate id ", id)
                dispatch(deleteFaq(id))
            }
            return (
                <>

                    <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                </>
            )

        }
    }
]