import React from 'react';
import {
    CButton,
    CCardBody,
    CCardHeader,
    CCard,
    CCol,
    CForm,
    CFormInput,
    CRow,
} from '@coreui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { actions } from 'formik';

const AddBulkProduct = () => {
    const initialValues = {
        csv: null,
    };

    const validationSchema = Yup.object().shape({
        csv: Yup.mixed().required('CSV file is required'),
    });

    const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            formData.append('csv', values.csv);

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadProductCSV`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                resetForm();
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });

    return (
        <CForm className="row g-3 flex justify-center" onSubmit={handleSubmit} encType="multipart/form-data">
            <span>
                <h5> Add Multiple(Bulk) Product Data</h5>
                <p style={{ color: 'red' }}>Note: accept only CSV file format only.</p>
            </span>
            <CRow style={{ marginTop: '10px' }}>
                <CCol md={6} style={{ marginBottom: '6px' }}>
                    <CFormInput
                        type="file"
                        id="validationDefault01"
                        label="Product File"
                        name="csv"
                        placeholder="Enter Product Data CSV File"
                        onChange={(event) => setFieldValue('csv', event.currentTarget.files[0])}
                        accept=".csv"
                        required
                    />
                    {errors.csv && touched.csv && <p className="form-error text-danger">{errors.csv}</p>}
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12} style={{ marginBottom: '6px' }}>
                    <CButton
                        style={{ background: 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', border: 'none' }}
                        type="submit"
                    >
                        Add File
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

const Validation1 = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Bulk</strong> <small>Product</small>
                    </CCardHeader>
                    <CCardBody>{<AddBulkProduct />}</CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Validation1;
