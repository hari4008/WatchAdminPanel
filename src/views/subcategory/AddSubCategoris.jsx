import React, { useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import { DocsExample } from 'src/components'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { addSubcate, getAllSubCat } from 'src/RTK/Slice/subcateSlice'
import { jwtDecode } from 'jwt-decode'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { addSubcate, getAllSubCat } from 'src/RTK/slice/subcateSlice'
// import { Button } from '@coreui/coreui'
const AddSubCategoris = () => {
    const { subcate } = useSelector(state => state.subcategory)
    console.log("subcate",subcate)
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => subcate, [subcate])
    const [TokenData, setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')));
    const user = TokenData.email;
    console.log("user",user)
    const role = localStorage.getItem('role');
    console.log("subcate -----",subcate.filter((scat) => { return scat.uploadby == user}))
    const data1 = useMemo(() => {
        return role == 'admin' ? subcate : subcate.filter(item => item.uploadby == user);
    }, [subcate, user]);
    console.log("data1",data1)

    const { getTableProps, getTableBodyProps, headerGroups, page, state, setGlobalFilter, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize } = useTable({
        columns,
        data,
    }, useGlobalFilter, usePagination)
    const { globalFilter, pageIndex, pageSize } = state

    const { categories } = useSelector(state => state.category)
    // console.log('categories ', categories);
    const initialValues = {
        category_id: '',
        subcategory_name: '',
        uploadby: TokenData.email
    }
    const subcategorySchema = Yup.object({
        category_id: Yup.string(),
        subcategory_name: Yup.string().min(2).max(50).required('Plaese enter your Sub-Category name')
    });
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: subcategorySchema,
        onSubmit: async (values, { resetForm }) => {
            // console.log('Form submitted with values:', values);
            await dispatch(addSubcate(values))
            // await dispatch(getAllCate())
            dispatch(getAllSubCat())
            resetForm();
        },
    });

    const dispatch = useDispatch();
    return (
        <>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Category</CFormLabel>
                    <CFormSelect type="text" id="validationDefault04" required
                        name='category_id'
                        value={values.category_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option disabled selected value="">Choose Category...</option>
                        {
                            categories?.filter(item => item.uploadby == user)
                                .map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.category_name}
                                    </option>))
                        }
                    </CFormSelect>
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Sub-Category</CFormLabel>
                    <CFormInput type="text" id="validationDefault01" required
                        name='subcategory_name'
                        value={values.subcategory_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.subcategory_name && touched.subcategory_name ? (
                        <p className='form-error text-danger'>{errors.subcategory_name}</p>
                    ) : null}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="validationDefault01">Uploaded by</CFormLabel>
                    <CFormInput type="text" id="validationDefault01" required
                        name='uploadby'
                        value={values.uploadby}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    
                </CCol>
                <CCol xs={12}>
                    <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" className=' mt-3 mb-3'
                        onClick={handleSubmit}>
                        Add Sub-Category
                    </CButton>
                </CCol>
            </CForm>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage </strong> <small>Sub-Category</small>
                        </CCardHeader>
                        <CCardBody >
                            <DocsExample href="forms/validation#browser-defaults">
                                <CFormLabel htmlFor="validationDefault01">Search Sub-Category</CFormLabel>
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
export default AddSubCategoris
