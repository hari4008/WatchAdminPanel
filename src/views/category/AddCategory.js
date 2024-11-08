import React, { useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import { useTable, useGlobalFilter } from 'react-table'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { DocsExample } from 'src/components'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCate } from 'src/RTK/Slice/cateSlice'
import { jwtDecode } from 'jwt-decode';

const ManageProducts = () => {
  const [TokenData, setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')))
  const user = TokenData.email;
  const { categories } = useSelector((state) => state.category)
  const columns = useMemo(() => COLUMNS, [])

  const role = localStorage.getItem('role');

  const data = useMemo(() => {
      return role == 'admin' ? categories : categories.filter((cat) => cat.uploadby == user);
  }, [categories, user]);

  // console.log("data1 -------");
  // console.log("data1",data1);

  // const data = useMemo(() => categories, [categories])
  const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow } = useTable({
    columns,
    data,
  }, useGlobalFilter)
  const dispatch = useDispatch()
  const initialValues = {
    category_name: "",
    uploadby: TokenData.email
  };

  const categorySchema = Yup.object({
    category_name: Yup.string().min(2, 'enter proper category name').max(50).required('Please enter your Category name'),
  });
  const { globalFilter } = state

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: categorySchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log('Form submitted with values:', values);
      dispatch(addCate(values));
      resetForm();
      setSubmitting(false)
    },
  });
  return (
    <>
      <CForm className="row g-3 mb-3" onSubmit={handleSubmit} >
        <CCol md={4}>
          <CFormLabel htmlFor="validationDefault01">Category Name</CFormLabel>
          <CFormInput
            type="text"
            id="validationDefault01"
            required
            name='category_name'
            value={values.category_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.category_name && touched.category_name ? (
            <p className="form-error text-danger">{errors.category_name}</p>
          ) : null}
        </CCol>
        {/* <CCol md={4}>
          <CFormLabel htmlFor="validationDefault01">Category Name</CFormLabel>
          <CFormInput
            type="text"
            id="validationDefault01"
            required
            name='category_name'
            value={values.uploadby}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.category_name && touched.category_name ? (
            <p className="form-error text-danger">{errors.category_name}</p>
          ) : null}
        </CCol> */}
        <CCol xs={12}>
          <CButton color="primary" style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }}  type="submit">
            Add Category
          </CButton>
        </CCol>
      </CForm>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Manage </strong> <small>Category</small>
            </CCardHeader>
            <CCardBody >
              <DocsExample href="forms/validation#browser-defaults">
                <CFormLabel htmlFor="validationDefault01">Search Category</CFormLabel>
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
export default ManageProducts
