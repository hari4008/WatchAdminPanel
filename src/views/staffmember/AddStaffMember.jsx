import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
import { addStaff } from 'src/RTK/Slice/staffSlice';

const AddStaffMember = () => {
  const dispatch = useDispatch();
  const st = useSelector(state => state.staff);
  console.log("St in staff", st);

  const initialValues = {
    name:"",
    email: "",
    phone:"",
    password: ""
  }
  const staffSchema = Yup.object({
    name: Yup.string().min(2).max(50).required('Please enter your name'),
    email: Yup.string().email().required("Plaese enter your email"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please provide a password'),
    phone: Yup.number().min(10, "Phone number must be 10 digits").required("Please provide your Phone Number")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: staffSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form submitted with values:', values);
      dispatch(addStaff(values));
      resetForm();
    },
  });


  // const [validated, setValidated] = useState(false);
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };
  return (
    <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">Name</CFormLabel>
        <CFormInput type="text" id="validationDefault01" required 
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">Email</CFormLabel>
        <CFormInput type="email" id="validationDefault01" required 
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">Phone</CFormLabel>
        <CFormInput type="tel" id="validationDefault01" required 
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault01">Password</CFormLabel>
        <CFormInput type="password" id="validationDefault01" required 
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </CCol>
      <CCol xs={12}>
        <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit">
          Add StaffMember
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
            <strong>Add</strong> <small>StaffMember</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="views\staffmember">{AddStaffMember()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Validation;
