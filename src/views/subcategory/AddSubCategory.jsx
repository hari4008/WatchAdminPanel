import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import { useSelector } from 'react-redux';

const AddSubCategorys = () => {

  const category = useSelector(state => state.category)
  const allCategory = category.categories

  const initialValues = {
    category_name:'',
    subcategory_name: '',
  }

  const subcategorySchema = Yup.object({
    category_name: Yup.string().min(2).max(50).required('Plaese enter your Category name'),
    subcategory_name: Yup.string().min(2).max(50).required('Plaese enter your SubCategory name')
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: subcategorySchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form submitted with values:', values);
      resetForm();
    },
  });
  return (
    <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">Category Name</CFormLabel>
        <CFormSelect type="text" id="validationDefault04" label="Category" required
          name='category_name'
          // value={values.category_name}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option disabled selected value="">Choose Category...</option>
          {
            allCategory?.map((item) => (
              <option key={item.id} value={item.id}>{item.category_name}</option>
            ))
          }
        </CFormSelect>
        {errors.category_name && touched.category_name ? (
          <p className='form-error text-danger'>{errors.category_name}</p>
        ) : null}
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">SubCategory Name</CFormLabel>
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
      <CCol xs={12}>
        <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit"
          onClick={handleSubmit}>
          Add SubCategory
        </CButton>
      </CCol>
    </CForm>
  );
};

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>SubCategory</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="views\category">{AddSubCategorys()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Validation;
