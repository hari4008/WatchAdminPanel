import React, { useMemo } from 'react'
// import { COLUMNS } from '../user/columns'
import { useSelector } from 'react-redux'
import { useGlobalFilter, usePagination, useTable } from 'react-table'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { DocsExample } from 'src/components'
import COLUMNS from './columns'

const ManageUsers = () => {
    const { users } = useSelector((state) => state.user)
    console.log("user is is is ", users)
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => users, [users])
    const { getTableProps, getTableBodyProps, headerGroups, page, state, setGlobalFilter, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize } = useTable({
        columns,
        data,
    }, useGlobalFilter, usePagination)
    const { globalFilter, pageIndex, pageSize } = state


    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage </strong> <small>User</small>
                        </CCardHeader>
                        <CCardBody>
                            <DocsExample href="forms/validation#browser-defaults">
                                <CFormLabel htmlFor="validationDefault01">Search User</CFormLabel>
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
                                            page.map((row) => {
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
                                <CButton className=' mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </CButton>
                                <CButton className=' mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </CButton>
                                <span> page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                                <CFormSelect value={pageSize} size="lg" className="mb-3" aria-label="Large select example" onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}>
                                    {[5, 10, 15].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>show{pageSize}</option>
                                    ))}
                                </CFormSelect>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default ManageUsers
