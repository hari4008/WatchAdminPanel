import React, { useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import { useTable, useGlobalFilter } from 'react-table'
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { DocsExample } from 'src/components'



const ManageCategory = () => {
    const [TokenData, setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')))
    const user = TokenData.email;
    const {categories} = useSelector((state) => state.category)
    const columns = useMemo(() => COLUMNS, [])
    const role = localStorage.getItem('role');

    const data1 = useMemo(() => {
        return role == 'admin' ? categories : categories.filter((cat) => cat.uploadby === user);
    }, [categories, user]);

    console.log("data1 -------");
    console.log("data1",data1);

    const data = useMemo(() => categories, [categories])
    const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow } = useTable({
        columns,
        data,
    }, useGlobalFilter)

    const { globalFilter } = state

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage </strong> <small>Category</small>
                        </CCardHeader>
                        <CCardBody style={{ padding: 0 }}>
                            <DocsExample href="forms/validation#browser-defaults">
                                <CFormLabel htmlFor="validationDefault01">Search Product</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    required
                                    name="name"
                                    value={globalFilter || ''}
                                    onChange={e => setGlobalFilter(e.target.value)}
                                />
                                <CTable className='table table-hover mt-3' responsive {...getTableProps()}>
                                    <CTableHead >
                                        {
                                            headerGroups.map((headerGroup) => (
                                                <CTableRow {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column) => (
                                                        <CTableHeaderCell scope='col' {...column.getHeaderProps()} > {column.render('Header')}</CTableHeaderCell>
                                                    ))}
                                                </CTableRow>
                                            ))
                                        }
                                    </CTableHead>
                                    <CTableBody {...getTableBodyProps()}>
                                        {
                                            rows.map((row) => {
                                                prepareRow(row)
                                                return (
                                                    <CTableRow {...row.getRowProps()}>
                                                        {
                                                            row.cells.map((cell) => {
                                                                return (
                                                                    <CTableDataCell {...cell.getCellProps()}> {cell.render('Cell')}</CTableDataCell>
                                                                )
                                                            })
                                                        }
                                                    </CTableRow>
                                                )
                                            })
                                        }
                                    </CTableBody>
                                </CTable>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )

}
export default ManageCategory
