import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useMemo } from 'react'
import { DocsExample } from 'src/components'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { COLUMNS } from './columns';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { addFaq } from 'src/RTK/Slice/faqSlice';

const ManageFaqs = () => {
    const { faqs } = useSelector(state => state.faq);
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => faqs, [faqs])
    const { getTableProps, getTableBodyProps, headerGroups, page, state, setGlobalFilter, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize } = useTable({
        columns,
        data,
    }, useGlobalFilter, usePagination)
    const { globalFilter, pageIndex, pageSize } = state


    const dispatch = useDispatch();

    const initialValues = {
        title: '',
        ques: '',
        ans: ''
    };

    const faqSchema = Yup.object({
        ques: Yup.string().min(2).required('Please enter your Question'),
        ans: Yup.string().min(2).required('Please enter your Answer'),
        title: Yup.string().min(2).required('Please enter title of faq')
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: faqSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log('Form submitted with values:', values);
            dispatch(addFaq(values));
            resetForm();
            setSubmitting(false)
        },
    });

    return (
        <>
            {/* <CRow> */}
            <CForm className="row g-3" onSubmit={handleSubmit} >
                <CCol md={2}>
                    <CFormLabel htmlFor="validationDefault01">Place</CFormLabel>
                    <CFormInput
                        type="text"
                        id="validationDefault01"
                        required
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.title && touched.title ? (
                        <p className="form-error text-danger">{errors.title}</p>
                    ) : null}
                </CCol>
                <CCol md={5}>
                    <CFormLabel htmlFor="validationDefault01">Question</CFormLabel>
                    <CFormInput
                        type="text"
                        id="validationDefault01"
                        required
                        name="ques"
                        value={values.ques}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.ques && touched.ques ? (
                        <p className="form-error text-danger">{errors.ques}</p>
                    ) : null}
                </CCol>
                <CCol md={5}>
                    <CFormLabel htmlFor="validationDefault01">Answer</CFormLabel>
                    <CFormInput
                        type="text"
                        id="validationDefault01"
                        required
                        name="ans"
                        value={values.ans}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {errors.ans && touched.ans ? (
                        <p className="form-error text-danger">{errors.ans}</p>
                    ) : null}
                </CCol>
                <CCol xs={12}>
                    <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" className=' mt-3'>
                        Add Faq
                    </CButton>
                </CCol>
            </CForm>
            <div style={{ marginTop: '20px' }}></div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage </strong> <small>Faqs</small>
                        </CCardHeader>
                        <CCardBody >
                            <DocsExample href="forms/validation#browser-defaults">
                                <CFormLabel htmlFor="validationDefault01">Search Faq</CFormLabel>
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

                                    {/* </CTableFooter> */}
                                </CTable>
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} className=' mr-2' onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </CButton>
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} className=' mr-2' onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </CButton>
                                <span> page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                                <CFormSelect value={pageSize} style={{ marginTop: '20px' }} size="lg" className="mb-3" aria-label="Large select example" onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}>
                                    {[5, 10, 15].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>show {pageSize}</option>
                                    ))}
                                </CFormSelect>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {/* </CRow> */}
        </>
    )
}

export default ManageFaqs
