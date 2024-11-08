import React, { useEffect } from 'react'
import * as Yup from 'yup';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { SquarePen } from 'lucide-react';
import { BadgeX, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { addFaq, deleteFaq, getAllFaq } from 'src/RTK/Slice/faqSlice';

const AddFaq = () => {
    const dispatch = useDispatch();

    const initialValues = {
        ques: '',
        ans: ''
    };

    const faqSchema = Yup.object({
        ques: Yup.string().min(2).required('Please enter your Question'),
        ans: Yup.string().min(2).required('Please enter your Answer'),
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

    // const handleDelete = (id) => {
    //   console.log("cate id ",id)
    //   dispatch(deleteFaq(id))
    // }

    const ManageFaq = () => {
        const st = useSelector(state => state.faq)
        // console.log("path ", process.env.REACT_APP_IMG_URL)
        // const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getAllFaq());
        }, [dispatch])
        const faqs = st.faqs;
        console.log("all faq ",faqs)
        const handleDelete = (id) => {
            console.log("cate id ", id)
            dispatch(deleteFaq(id))
        }
        // console.log("PATH ",process.env.REACT_APP_PRO_IMG + )
        return (
            <CTable className='table table-hover' responsive>
                <CTableHead >
                    <CTableRow>
                        <CTableHeaderCell scope="col">Index</CTableHeaderCell>
                        <CTableHeaderCell scope="col" >Question</CTableHeaderCell>
                        <CTableHeaderCell scope="col" >Answer</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Description</CTableHeaderCell> */}
                        {/* <CTableHeaderCell scope="col" >Image</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col" >Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {/* <CTableRow> */}
                    {
                        faqs?.map((faq, index) => {
                            {/* console.log("path",process.env.REACT_APP_PRO_IMG + product?.image[0]) */ }
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                                    <CTableDataCell >{faq?.ques}</CTableDataCell>
                                    <CTableDataCell >{faq?.ans}</CTableDataCell>
                                    {/* <CTableDataCell >{product?.description}</CTableDataCell> */}
                                    {/* <CTableDataCell><img src={process.env.REACT_APP_PRO_IMG + product?.image[0]} alt={product?.name} className='img-thumbnail' height="100px" width="100px" /></CTableDataCell> */}
                                    {/* <CTableDataCell>{product.description}</CTableDataCell> */}
                                    <CTableDataCell>
                                        <div style={{ "display": "flex", "flexDirection": "column" }}>
                                            {/* <Eye color="#1f99e5" strokeWidth={1.5} size={36} /> */}
                                            {/* <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} /> */}
                                            <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => {
                                                handleDelete(faq?.id)
                                            }} />
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                </CTableBody>
            </CTable>
        )
    }
    return (
        <>
            <CForm className="row g-3" onSubmit={handleSubmit} >

                <CRow>
                    <CCol md={6}>
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
                    <CCol md={6}>
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
                </CRow>
                <CCol xs={12}>
                    <CButton color="primary" style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit">
                        Add Faq
                    </CButton>
                </CCol>
            </CForm>
            <div style={{ marginTop: '20px' }}></div>
            <CRow>
                <CCol md={12} >
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage</strong> <small>Faq</small>
                        </CCardHeader>
                        <CCardBody style={{ padding: 0 }}>
                            <DocsExample href="views\faq">
                                {ManageFaq()}
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>

    );
};

export default AddFaq;