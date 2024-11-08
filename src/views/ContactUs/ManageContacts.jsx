import React, { useMemo, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLUMNS } from './columns';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { addContact, getAllContact } from 'src/RTK/Slice/contactSlice';

const ManageContacts = () => {
    const dispatch = useDispatch();
    
    // Fetch contacts when component loads
    useEffect(() => {
        dispatch(getAllContact());
    }, [dispatch]);

    const { contacts } = useSelector(state => state.contact);
    console.log("Contact data",contacts)

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => contacts, [contacts]);
    
    const {
        getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
        nextPage, previousPage, canNextPage, canPreviousPage, pageOptions,
        state, setGlobalFilter, setPageSize
    } = useTable({
        columns,
        data,
    }, useGlobalFilter, usePagination);
    
    const { globalFilter, pageIndex, pageSize } = state;

    const initialValues = {
        name: '',
        email: '',
        mobileNum: '',
        message: ''
    };

    const contactSchema = Yup.object({
        name: Yup.string().min(2).required('Please enter your Name'),
        email: Yup.string().min(2).required('Please enter your email'),
        mobileNum: Yup.number().required('Please enter your Mobile Number'),
        message: Yup.string().min(2).required('Please enter your message')
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(addContact(values));
            resetForm();
        },
    });

    return (
        <>
            <CForm className="row g-3" onSubmit={handleSubmit}>
                {/* Form for adding a contact */}
                {/* Form elements here */}
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Name</CFormLabel>
                    <CFormInput
                        type="text"
                        id="validationDefault01"
                        required
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                        <p className="form-error text-danger">{errors.name}</p>
                    ) : null}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Emails</CFormLabel>
                    <CFormInput
                        type="email"
                        id="validationDefault01"
                        required
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                        <p className="form-error text-danger">{errors.email}</p>
                    ) : null}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Mobile Number</CFormLabel>
                    <CFormInput
                        type="tel"
                        id="validationDefault01"
                        required
                        name="mobileNum"
                        value={values.mobileNum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {errors.mobileNum && touched.mobileNum ? (
                        <p className="form-error text-danger">{errors.mobileNum}</p>
                    ) : null}
                </CCol>
                <CCol md={12}>
                    <CFormLabel htmlFor="validationDefault01">Message</CFormLabel>
                    <CFormInput
                        type="text"
                        id="validationDefault01"
                        required
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.message && touched.message ? (
                        <p className="form-error text-danger">{errors.message}</p>
                    ) : null}
                </CCol>
                <CCol xs={12}>
                    <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none','margin-bottom':'2rem' }} type="submit" className=' mt-3'>
                        Add Contact
                    </CButton>
                </CCol>
            </CForm>

            {/* Table and Pagination */}
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage Contacts</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CFormInput
                                type="text"
                                value={globalFilter || ''}
                                onChange={e => setGlobalFilter(e.target.value)}
                                placeholder="Search Contacts"
                            />
                            <CTable {...getTableProps()} className="mt-3">
                                <CTableHead>
                                    {headerGroups.map(headerGroup => (
                                        <CTableRow {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <CTableHeaderCell {...column.getHeaderProps()}>{column.render('Header')}</CTableHeaderCell>
                                            ))}
                                        </CTableRow>
                                    ))}
                                </CTableHead>
                                <CTableBody {...getTableBodyProps()}>
                                    {page.map(row => {
                                        prepareRow(row);
                                        return (
                                            <CTableRow {...row.getRowProps()}>
                                                {row.cells.map(cell => (
                                                    <CTableDataCell {...cell.getCellProps()}>{cell.render('Cell')}</CTableDataCell>
                                                ))}
                                            </CTableRow>
                                        );
                                    })}
                                </CTableBody>
                            </CTable>
                            <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' ,'margin-right':'1rem' }} onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</CButton>
                            <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' ,'margin-right':'1rem' }} onClick={() => nextPage()} disabled={!canNextPage}>Next</CButton>
                            <span>Page {pageIndex + 1} of {pageOptions.length}</span>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default ManageContacts;