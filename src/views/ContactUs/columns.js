import { CTableHeaderCell } from "@coreui/react";
import React from "react";
import { BadgeX } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteContact } from "src/RTK/Slice/contactSlice";
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
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Mobile Number",
        accessor: "mobileNum"
    },
    {
        Header: "Message",
        accessor: "message"
    },
    {
        Header: "Action",
        action: "action",
        Cell: row => {
            const dispatch = useDispatch();
            const handleDelete = (id) => {
                console.log("cate id ", id)
                dispatch(deleteContact(id))
            }
            return (
                <>
                    <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                </>
            )

        }
    }
]